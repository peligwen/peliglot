/**
 * useMastery — React hook for all spaced-repetition state.
 *
 * This is the ONLY hook (and the ONLY non-test file outside `src/mastery/`)
 * that imports the adapter. No component or guide imports the adapter directly.
 * This guarantees that the Phase 2d cloud-swap is a single-file change:
 * update `defaultMasteryAdapter` in `src/mastery/index.ts` and done.
 *
 * Architecture:
 * - Hydrates from `adapter.bulkExport()` on mount into an in-memory cache.
 * - All mutations are write-through: update cache + persist via adapter atomically.
 * - If `adapter` reference changes across renders, re-hydrates completely.
 * - All mutators await the hydration promise before proceeding, so a call
 *   immediately after mount cannot race with the initial bulk read.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  createCard,
  rateCard as schedulerRateCard,
  Rating,
  defaultMasteryAdapter,
  computeXp,
} from '../mastery';
import type { MasteryStorageAdapter, CardState, StreakState, XpState, MasteryExport, MergeReport } from '../mastery';

export type { Rating };

// ---------------------------------------------------------------------------
// Local-date helpers (DST-safe)
// ---------------------------------------------------------------------------

/**
 * Format a Date as a local-time YYYY-MM-DD string.
 * Using string operations avoids DST pitfalls that arise when doing epoch-ms
 * arithmetic across DST boundaries (a "day" can be 23h or 25h).
 */
function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Add `n` calendar days to a YYYY-MM-DD string using symbolic (DST-safe)
 * date arithmetic. Returns the resulting YYYY-MM-DD string.
 */
function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, (m as number) - 1, d as number);
  date.setDate(date.getDate() + n);
  return toLocalDateString(date);
}

// ---------------------------------------------------------------------------
// Streak update logic (pure function — easy to unit-test in isolation)
// ---------------------------------------------------------------------------

/**
 * Compute the new streak given the current streak state and today's date string.
 *
 * Rules:
 * - Same day: only todaysReviewCount changes; streak untouched.
 * - +1 day:  streak.current += 1; update lastReviewDate.
 * - +2 days: one-day grace — streak preserved (not incremented), lastReviewDate advances.
 * - 3+ days or null: reset current to 1; update lastReviewDate.
 * - In all non-same-day cases, update longest = max(longest, current).
 */
function computeNewStreak(streak: StreakState, today: string): StreakState {
  const { lastReviewDate } = streak;

  if (lastReviewDate === null) {
    // First ever review.
    return { current: 1, longest: Math.max(1, streak.longest), lastReviewDate: today };
  }

  if (today === lastReviewDate) {
    // Same day — nothing changes.
    return streak;
  }

  const nextDay = addDays(lastReviewDate, 1);
  const dayAfterNext = addDays(lastReviewDate, 2);

  if (today === nextDay) {
    // Consecutive day — increment.
    const current = streak.current + 1;
    return { current, longest: Math.max(current, streak.longest), lastReviewDate: today };
  }

  if (today === dayAfterNext) {
    // One-day grace — preserve current, advance date, update longest.
    return {
      current: streak.current,
      longest: Math.max(streak.current, streak.longest),
      lastReviewDate: today,
    };
  }

  // Gap of 3+ days — reset.
  return { current: 1, longest: Math.max(1, streak.longest), lastReviewDate: today };
}

// ---------------------------------------------------------------------------
// Public return type
// ---------------------------------------------------------------------------

export interface UseMasteryReturn {
  /**
   * Synchronous read from in-memory cache. Returns `undefined` before
   * hydration completes or if the card has never been rated.
   */
  getCardState: (cardId: string) => CardState | undefined;

  /**
   * Rate a card and persist the new scheduling state.
   * Creates the card from scratch if it has never been reviewed.
   */
  rateCard: (cardId: string, rating: Rating) => Promise<CardState>;

  /**
   * Cards whose `due` timestamp is ≤ now. Refreshed when the cache changes.
   */
  dueCards: Array<{ cardId: string; state: CardState }>;

  /**
   * Unix ms timestamp of the earliest future-due card across the full cache.
   * `null` if there are no future-scheduled cards (empty cache, or all cards
   * are already overdue). Used by EmptyState and any future "next review"
   * affordance. Computed via useMemo — same cache dep as dueCards.
   */
  nextDueAt: number | null;

  /** Current streak state. Defaults to zeros / null before any reviews. */
  streak: StreakState;

  /** Number of cards whose `lastReview` falls on today's local-time date. */
  todaysReviewCount: number;

  /** Daily review goal. Defaults to 5. */
  dailyGoal: number;

  /** Set the daily goal (clamped to >= 1) and persist it. */
  setDailyGoal: (n: number) => Promise<void>;

  /** False until the initial `bulkExport` resolves. */
  isHydrated: boolean;

  /**
   * XP earned today (local date). Resets to 0 at midnight.
   * Initialized from persisted XpState on hydration with day-rollover
   * detection — so opening the app on a new day immediately shows 0.
   */
  xpToday: number;

  /**
   * Monotonic all-time XP total. Never decreases.
   */
  xpAllTime: number;

  /**
   * Export the full mastery snapshot from the adapter.
   * Awaits hydration before reading so callers always get the latest state.
   */
  exportSnapshot: () => Promise<MasteryExport>;

  /**
   * Import a snapshot into the adapter using per-card LWW merge semantics.
   * After import, the hook re-hydrates in-memory state (cache, streak, xp,
   * dailyGoal) so the UI reflects the new state without a remount.
   * Returns the MergeReport from the adapter.
   */
  importSnapshot: (snapshot: MasteryExport) => Promise<MergeReport>;
}

// ---------------------------------------------------------------------------
// Default values
// ---------------------------------------------------------------------------

const DEFAULT_DAILY_GOAL = 5;

const DEFAULT_STREAK: StreakState = {
  current: 0,
  longest: 0,
  lastReviewDate: null,
};

const DEFAULT_XP: XpState = {
  allTime: 0,
  today: 0,
  dayKey: null,
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useMastery(
  adapter: MasteryStorageAdapter = defaultMasteryAdapter,
): UseMasteryReturn {
  // In-memory card cache: cardId → CardState
  const [cache, setCache] = useState<Map<string, CardState>>(new Map());
  const [streak, setStreak] = useState<StreakState>(DEFAULT_STREAK);
  const [dailyGoal, setDailyGoalState] = useState<number>(DEFAULT_DAILY_GOAL);
  const [xp, setXp] = useState<XpState>(DEFAULT_XP);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Store the hydration promise so mutators can await it before writing,
  // preventing races when a caller fires rateCard before mount resolves.
  const hydrationPromiseRef = useRef<Promise<void>>(Promise.resolve());

  // ---------------------------------------------------------------------------
  // Private hydration helper — factored out so both the mount effect and
  // importSnapshot can call the same logic.
  // ---------------------------------------------------------------------------

  const hydrate = useCallback(async (a: MasteryStorageAdapter): Promise<void> => {
    setIsHydrated(false);
    setCache(new Map());
    setStreak(DEFAULT_STREAK);
    setDailyGoalState(DEFAULT_DAILY_GOAL);
    setXp(DEFAULT_XP);

    const snapshot = await a.bulkExport();

    const newCache = new Map<string, CardState>(
      Object.entries(snapshot.cards),
    );

    setCache(newCache);
    setStreak(snapshot.streak ?? DEFAULT_STREAK);
    setDailyGoalState(snapshot.settings?.dailyGoal ?? DEFAULT_DAILY_GOAL);

    // Restore XP with day-rollover detection.
    // If the stored dayKey is from a previous day, reset xpToday to 0.
    // This ensures that opening the app on a new day immediately reflects
    // the correct today-count without requiring a rateCard call.
    const storedXp = snapshot.xp ?? { ...DEFAULT_XP };
    const todayKey = toLocalDateString(new Date());
    let hydratedXp: XpState;
    if (storedXp.dayKey !== null && storedXp.dayKey !== todayKey) {
      // Day rolled over since last persisted XP — reset today count.
      hydratedXp = { allTime: storedXp.allTime, today: 0, dayKey: todayKey };
      // Persist the rollover so future hydrations start clean.
      await a.writeMeta({ xp: hydratedXp });
    } else {
      hydratedXp = storedXp;
    }
    setXp(hydratedXp);

    setIsHydrated(true);
  }, []); // state setters are stable references — empty deps is correct

  // Re-hydrate whenever the adapter reference changes (e.g. swapped in tests).
  useEffect(() => {
    const hydrationPromise = hydrate(adapter);
    hydrationPromiseRef.current = hydrationPromise;
    // We don't return a cleanup that cancels the promise — React StrictMode
    // double-fires effects, but the state setters after an unmounted component
    // are no-ops in React 18.
  }, [adapter, hydrate]);

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  const now = Date.now();

  const dueCards = useMemo<Array<{ cardId: string; state: CardState }>>(() => {
    const result: Array<{ cardId: string; state: CardState }> = [];
    for (const [cardId, state] of cache) {
      if (state.due <= now) {
        result.push({ cardId, state });
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]); // `now` is intentionally excluded: we don't want per-ms rerenders

  const nextDueAt = useMemo<number | null>(() => {
    const snapshotNow = Date.now();
    let min: number | null = null;
    for (const state of cache.values()) {
      if (state.due > snapshotNow) {
        if (min === null || state.due < min) {
          min = state.due;
        }
      }
    }
    return min;
  }, [cache]);

  const todaysReviewCount = useMemo<number>(() => {
    const today = toLocalDateString(new Date());
    let count = 0;
    for (const state of cache.values()) {
      if (
        state.lastReview !== null &&
        toLocalDateString(new Date(state.lastReview)) === today
      ) {
        count += 1;
      }
    }
    return count;
  }, [cache]);

  // ---------------------------------------------------------------------------
  // Mutators
  // ---------------------------------------------------------------------------

  const getCardState = useCallback(
    (cardId: string): CardState | undefined => cache.get(cardId),
    [cache],
  );

  const rateCard = useCallback(
    async (cardId: string, rating: Rating): Promise<CardState> => {
      await hydrationPromiseRef.current;

      const reviewTime = Date.now();
      const today = toLocalDateString(new Date(reviewTime));

      // Fetch or create the current scheduler state.
      const existing = cache.get(cardId);
      const baseCard = existing ?? createCard();

      // Capture difficulty BEFORE the scheduler updates the card.
      const difficultyAtReview = baseCard.difficulty;

      // Run the FSRS scheduler.
      const scheduled = schedulerRateCard(baseCard, rating, reviewTime);

      const newState: CardState = {
        ...scheduled,
        cardId,
        updatedAt: reviewTime,
      };

      // Persist to adapter.
      await adapter.write(cardId, newState);

      // Update streak.
      const newStreak = computeNewStreak(streak, today);

      // Compute XP with day-rollover detection (in-session midnight crossing).
      // If the session has crossed midnight since the last review, reset today.
      const xpEarned = computeXp(rating, difficultyAtReview);
      const rolledOver = xp.dayKey !== null && xp.dayKey !== today;
      const newXp: XpState = {
        allTime: xp.allTime + xpEarned,
        today: rolledOver ? xpEarned : xp.today + xpEarned,
        dayKey: today,
      };

      // Persist streak + XP in a single writeMeta call.
      await adapter.writeMeta({ streak: newStreak, xp: newXp });

      // Write-through: update local cache, streak, and XP.
      setCache(prev => {
        const next = new Map(prev);
        next.set(cardId, newState);
        return next;
      });
      setStreak(newStreak);
      setXp(newXp);

      return newState;
    },
    // streak and xp must be in deps so computeNewStreak and XP accumulation see latest values.
    [adapter, cache, streak, xp],
  );

  const setDailyGoal = useCallback(
    async (n: number): Promise<void> => {
      await hydrationPromiseRef.current;
      const clamped = Math.max(1, n);
      await adapter.writeMeta({ settings: { dailyGoal: clamped } });
      setDailyGoalState(clamped);
    },
    [adapter],
  );

  const exportSnapshot = useCallback(
    async (): Promise<MasteryExport> => {
      await hydrationPromiseRef.current;
      return adapter.bulkExport();
    },
    [adapter],
  );

  const importSnapshot = useCallback(
    async (snapshot: MasteryExport): Promise<MergeReport> => {
      await hydrationPromiseRef.current;
      const report = await adapter.bulkImport(snapshot);
      // Re-hydrate in-memory state so the UI reflects the post-import state
      // without requiring a remount. Assign the new promise so subsequent
      // callers (e.g. rateCard) await the post-import hydration, not the
      // stale mount-time promise.
      const rehydratePromise = hydrate(adapter);
      hydrationPromiseRef.current = rehydratePromise;
      await rehydratePromise;
      return report;
    },
    [adapter, hydrate],
  );

  return {
    getCardState,
    rateCard,
    dueCards,
    nextDueAt,
    streak,
    todaysReviewCount,
    dailyGoal,
    setDailyGoal,
    isHydrated,
    xpToday: xp.today,
    xpAllTime: xp.allTime,
    exportSnapshot,
    importSnapshot,
  };
}
