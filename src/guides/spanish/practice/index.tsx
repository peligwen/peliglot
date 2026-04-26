/**
 * Spanish Practice Surface — /guides/spanish/practice
 *
 * The user-facing spaced-repetition review interface.
 *
 * Architecture:
 * - `Component()` is the lazy-route entry: no args, uses default adapter and cards.
 * - `Practice({ adapter?, getCards? })` is the internal component: accepts injection
 *   for testing without module mocks.
 *
 * Queue logic:
 * - Gets the full card pool from `getCards()` (default: `getAllSpanishCards`).
 * - Builds a shuffled snapshot on session start (when isHydrated first becomes true).
 * - Tracks rated card IDs in a Set; displayed queue = snapshot minus rated.
 * - This keeps order stable within a session: rating card A does not reshuffle B–Z.
 *
 * Advance logic:
 * - After rating, shows "Next review: …" message for 800ms, then advances.
 * - Prevents spoiler-flash of the next card's answer.
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { ReactElement, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useMastery } from '../../../hooks/useMastery';
import { Rating } from '../../../mastery';
import type { MasteryStorageAdapter, CardState } from '../../../mastery';
import type { ReviewCard } from '../../../mastery/cards';
import { getAllSpanishCards } from '../mastery/index';
import { speakSpanish } from '../../../utils/speech';
import { PromptRenderer } from './renderers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPANISH_RED = '#C62828';
const ACCENT_LIGHT = '#ffebee';

// Kinds that have a speaker button on the prompt itself (before reveal)
const KINDS_WITH_PROMPT_SPEAK = new Set<string>(['letter-sound']);
// Kinds that auto-play speech on reveal
const KINDS_AUTO_PLAY_ON_REVEAL = new Set<string>([
  'letter-sound',
  'verb-conjugation',
  'verb-conjugation-stem-change',
]);

// How long (ms) to display the "Next review: …" message before advancing
const NEXT_DUE_DISPLAY_MS = 800;

// ---------------------------------------------------------------------------
// Seeded shuffle — Mulberry32, seeded by local YYYYMMDD date integer
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// `seededShuffle` + `todaySeed` work together to produce a shuffle that is:
//   - Consistent within a session: the same seed is used for the whole day,
//     so the queue order does not change between the "due cards" computation
//     and subsequent re-renders during a session.
//   - Varied day-to-day: the YYYYMMDD integer changes at midnight (local time),
//     giving a fresh order each day without any server involvement.
// Do not replace the seed source with Math.random() — that would reshuffle on
// every hydration and destroy queue stability within a session.
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function todaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ---------------------------------------------------------------------------
// formatRelative — next-due display
// ---------------------------------------------------------------------------

export function formatRelative(dueMs: number): string {
  const diffMs = dueMs - Date.now();
  const diffMin = diffMs / 60_000;
  if (diffMin <= 1) return 'now';
  if (diffMin < 60) return `in ${Math.round(diffMin)} minutes`;
  const diffHours = diffMin / 60;
  if (diffHours < 20) return `in ${Math.round(diffHours)} hours`;
  const diffDays = diffHours / 24;
  if (diffDays < 1.5) return 'tomorrow';
  if (diffDays < 10) return `in ${Math.round(diffDays)} days`;
  const diffWeeks = diffDays / 7;
  return `in ${Math.round(diffWeeks)} weeks`;
}

// ---------------------------------------------------------------------------
// ProgressBar — inline small bar
// ---------------------------------------------------------------------------

function ProgressBar({
  value,
  max,
  color = SPANISH_RED,
}: {
  value: number;
  max: number;
  color?: string;
}): ReactElement {
  const pct = max === 0 ? 0 : Math.min(1, value / max);
  return (
    <div
      style={{
        width: 60,
        height: 4,
        background: '#e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={`${value} of ${max} reviews today`}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          background: color,
          borderRadius: 2,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SpeakerButton — small audio affordance
// ---------------------------------------------------------------------------

function SpeakerButton({ text, label = 'Speak' }: { text: string; label?: string }): ReactElement {
  const [speaking, setSpeaking] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={() => {
        setSpeaking(true);
        speakSpanish(text, () => setSpeaking(false));
      }}
      style={{
        background: 'none',
        border: '1.5px solid #ddd',
        borderRadius: 8,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: 16,
        color: speaking ? SPANISH_RED : '#888',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span aria-hidden="true">{speaking ? '🔊' : '🔉'}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// HeaderStrip — always visible: streak, goal progress, due count, back link
// ---------------------------------------------------------------------------

function HeaderStrip({
  streak,
  todaysReviewCount,
  dailyGoal,
  dueCount,
}: {
  streak: number;
  todaysReviewCount: number;
  dailyGoal: number;
  dueCount: number;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 20px',
        borderBottom: '1px solid #eee',
        background: '#fff',
        fontSize: 13,
        flexWrap: 'wrap',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <Link
        to="/guides/spanish"
        style={{
          color: '#888',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span aria-hidden="true">{'←'}</span> Español
      </Link>

      <div style={{ flex: 1 }} />

      {streak > 0 && (
        <div
          aria-label={`${streak}-day streak`}
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#555', fontWeight: 600 }}
        >
          <span aria-hidden="true">{'🔥'}</span>
          <span>{streak}</span>
        </div>
      )}

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555' }}
        aria-label={`${todaysReviewCount} of ${dailyGoal} reviews today`}
      >
        <ProgressBar value={todaysReviewCount} max={dailyGoal} />
        <span>
          {todaysReviewCount}
          <span style={{ color: '#bbb' }}>/{dailyGoal}</span> today
        </span>
      </div>

      <div style={{ color: '#555' }}>
        <span style={{ fontWeight: 600, color: dueCount > 0 ? SPANISH_RED : '#2E7D32' }}>
          {dueCount}
        </span>{' '}
        due
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// RatingButtons
// ---------------------------------------------------------------------------

const RATINGS: Array<{ rating: Rating; label: string; color: string; bg: string }> = [
  { rating: Rating.Again, label: 'Again', color: '#fff', bg: '#B71C1C' },
  { rating: Rating.Hard, label: 'Hard', color: '#fff', bg: '#E65100' },
  { rating: Rating.Good, label: 'Good', color: '#fff', bg: '#2E7D32' },
  { rating: Rating.Easy, label: 'Easy', color: '#fff', bg: '#1565C0' },
];

function RatingButtons({
  onRate,
}: {
  onRate: (rating: Rating) => void;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
      }}
    >
      {RATINGS.map(({ rating, label, color, bg }) => (
        <button
          key={label}
          onClick={() => onRate(rating)}
          style={{
            background: bg,
            color,
            border: 'none',
            borderRadius: 10,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "system-ui,'Segoe UI',sans-serif",
            minWidth: 72,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

function EmptyState({
  todaysReviewCount,
  dailyGoal,
  streak,
}: {
  todaysReviewCount: number;
  dailyGoal: number;
  streak: number;
}): ReactElement {
  const metGoal = todaysReviewCount >= dailyGoal;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        textAlign: 'center',
        gap: 16,
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontSize: 56 }}>{'✓'}</div>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1a1a1a' }}>
        All caught up
      </h2>

      <div style={{ fontSize: 16, color: '#555', maxWidth: 300, lineHeight: 1.6 }}>
        <div>
          <strong>{todaysReviewCount}</strong>
          <span style={{ color: '#999' }}> / {dailyGoal}</span>
          {' '}reviews today
          {metGoal && <span style={{ marginLeft: 6 }}>— nicely done</span>}
        </div>
        {streak > 0 && (
          <div style={{ marginTop: 8 }}>
            {'🔥'} <strong>{streak}</strong>-day streak
          </div>
        )}
      </div>

      <div
        style={{ marginTop: 8, fontSize: 14, color: '#888', lineHeight: 1.6 }}
      >
        No cards are due right now.
        <br />
        Check back later or review tomorrow.
      </div>

      <Link
        to="/guides/spanish"
        style={{
          marginTop: 12,
          display: 'inline-block',
          background: SPANISH_RED,
          color: '#fff',
          textDecoration: 'none',
          padding: '10px 24px',
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        Back to Spanish guides
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardReviewer — shows one card, manages reveal and rating
// ---------------------------------------------------------------------------

interface CardReviewerProps {
  card: ReviewCard;
  /**
   * Rates the card and returns the new CardState (quickly — no advance delay).
   * The caller (CardReviewer) is responsible for showing the next-due message
   * and then calling onAdvance after NEXT_DUE_DISPLAY_MS.
   */
  onRate: (rating: Rating) => Promise<CardState>;
  /** Called after the next-due message has been displayed. Advances the queue. */
  onAdvance: (cardId: string) => void;
}

function CardReviewer({ card, onRate, onAdvance }: CardReviewerProps): ReactElement {
  const [revealed, setRevealed] = useState(false);
  const [nextDue, setNextDue] = useState<string | null>(null);
  const [rated, setRated] = useState(false);

  // Auto-play speech on reveal for relevant kinds
  const autoPlayedRef = useRef(false);
  // Track mounted state so the advance callback is skipped if the component
  // unmounts during the NEXT_DUE_DISPLAY_MS delay (prevents React unmount warnings).
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Pending advance timeout — cancelled on unmount to prevent state updates
  // after the component is gone.
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!revealed) return;
    if (!autoPlayedRef.current && KINDS_AUTO_PLAY_ON_REVEAL.has(card.kind)) {
      autoPlayedRef.current = true;
      speakSpanish(card.speakText ?? card.answer);
    }
  }, [revealed, card.kind, card.speakText, card.answer]);

  // Reset state when card changes
  useEffect(() => {
    setRevealed(false);
    setNextDue(null);
    setRated(false);
    autoPlayedRef.current = false;
  }, [card.cardId]);

  const handleRate = useCallback(
    async (r: Rating) => {
      if (rated) return; // prevent double-tap
      setRated(true);
      try {
        const newState = await onRate(r);
        if (!mountedRef.current) return;
        // Show the next-due message immediately after rating resolves.
        setNextDue(`Next review: ${formatRelative(newState.due)}`);
        // Wait the display duration, then tell the parent to advance.
        // Store the timer ID so it can be cancelled on unmount.
        await new Promise<void>(resolve => {
          advanceTimerRef.current = setTimeout(resolve, NEXT_DUE_DISPLAY_MS);
        });
        if (mountedRef.current) {
          onAdvance(card.cardId);
        }
      } catch {
        // Swallow: parent already handles error propagation
      }
    },
    [onRate, onAdvance, card.cardId, rated],
  );

  const promptLetter =
    card.prompt.kind === 'letter-sound' ? card.prompt.letter : null;
  const speakText = card.speakText ?? card.answer;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      {/* Prompt card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #eee',
          padding: '32px 28px',
          marginBottom: 20,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <PromptRenderer prompt={card.prompt} />

        {/* Speaker button on prompt for letter-sound kind */}
        {KINDS_WITH_PROMPT_SPEAK.has(card.kind) && promptLetter && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <SpeakerButton text={promptLetter} label="Speak this letter" />
          </div>
        )}
      </div>

      {/* Show Answer / Answer + Rating */}
      {!revealed ? (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setRevealed(true)}
            style={{
              background: SPANISH_RED,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '14px 36px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "system-ui,'Segoe UI',sans-serif",
              width: '100%',
              maxWidth: 320,
            }}
          >
            Show Answer
          </button>
        </div>
      ) : (
        <div>
          {/* Answer display */}
          <div
            style={{
              background: ACCENT_LIGHT,
              borderRadius: 14,
              padding: '20px 24px',
              marginBottom: 16,
              textAlign: 'center',
              border: `1px solid ${SPANISH_RED}30`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                marginBottom: 8,
                fontWeight: 600,
                fontFamily: "system-ui,'Segoe UI',sans-serif",
              }}
            >
              Answer
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: SPANISH_RED,
                fontFamily: 'Georgia, serif',
                lineHeight: 1.2,
              }}
            >
              {card.answer}
            </div>
            {card.acceptableAnswers && card.acceptableAnswers.length > 0 && (
              <div
                style={{
                  fontSize: 13,
                  color: '#888',
                  marginTop: 8,
                  fontStyle: 'italic',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                }}
              >
                Also: {card.acceptableAnswers.join(', ')}
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <SpeakerButton text={speakText} label="Speak answer" />
            </div>
          </div>

          {/* Next-due preview (shows after rating, before advance) */}
          {nextDue && (
            <div
              data-testid="next-due-message"
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: '#888',
                marginBottom: 8,
                fontFamily: "system-ui,'Segoe UI',sans-serif",
              }}
            >
              {nextDue}
            </div>
          )}

          {/* Rating buttons — hidden after rating to prevent double-tap */}
          {!rated && <RatingButtons onRate={handleRate} />}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Practice — injectable internal component
// ---------------------------------------------------------------------------

export interface PracticeProps {
  adapter?: MasteryStorageAdapter;
  getCards?: () => ReviewCard[];
}

export function Practice({
  adapter,
  getCards = getAllSpanishCards,
}: PracticeProps): ReactElement {
  const { getCardState, rateCard, streak, todaysReviewCount, dailyGoal, isHydrated } =
    useMastery(adapter);

  // Force a re-render every minute so newly-due cards surface without user action
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // Full card pool (stable across renders unless getCards reference changes)
  const allCards = useMemo(() => getCards(), [getCards]);

  // Session snapshot: built once when hydration completes. Stable for the session.
  // Cards are shuffled with a day seed for variety but consistent within a session.
  // Stored in state (not a ref) so that useMemo for displayQueue can depend on it
  // honestly — the memo re-runs exactly when the snapshot is first set.
  const [sessionSnapshot, setSessionSnapshot] = useState<ReadonlyArray<ReviewCard> | null>(null);

  useEffect(() => {
    if (!isHydrated || sessionSnapshot !== null) return;
    const now = Date.now();
    const due = allCards.filter(card => {
      const state = getCardState(card.cardId);
      return state === undefined || state.due <= now;
    });
    setSessionSnapshot(seededShuffle(due, todaySeed()));
  }, [isHydrated, sessionSnapshot, allCards, getCardState]);

  // Track rated card IDs — the displayed queue = snapshot minus rated
  const [ratedIds, setRatedIds] = useState<ReadonlySet<string>>(new Set());

  const displayQueue = useMemo(
    () => (sessionSnapshot ?? []).filter(c => !ratedIds.has(c.cardId)),
    [sessionSnapshot, ratedIds],
  );

  const currentCard = displayQueue[0];
  const dueCount = displayQueue.length;

  // Rate the current card. Returns the new CardState immediately (no advance delay).
  // CardReviewer is responsible for showing the next-due message, then calling onAdvance.
  const handleRate = useCallback(
    async (r: Rating): Promise<CardState> => {
      if (!currentCard) throw new Error('No card to rate');
      return rateCard(currentCard.cardId, r);
    },
    [currentCard, rateCard],
  );

  // Advance the queue: remove the rated card so the next one shows.
  const handleAdvance = useCallback(
    (cardId: string) => {
      setRatedIds(prev => new Set([...prev, cardId]));
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const containerStyle: CSSProperties = {
    minHeight: '100vh',
    background: '#fafafa',
    fontFamily: "system-ui,'Segoe UI',sans-serif",
  };

  if (!isHydrated) {
    return (
      <div
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: 16,
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <HeaderStrip
        streak={streak.current}
        todaysReviewCount={todaysReviewCount}
        dailyGoal={dailyGoal}
        dueCount={dueCount}
      />

      <main style={{ padding: '32px 16px 64px', maxWidth: 600, margin: '0 auto' }}>
        {currentCard == null ? (
          <EmptyState
            todaysReviewCount={todaysReviewCount}
            dailyGoal={dailyGoal}
            streak={streak.current}
          />
        ) : (
          <CardReviewer
            key={currentCard.cardId}
            card={currentCard}
            onRate={handleRate}
            onAdvance={handleAdvance}
          />
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component — lazy-route entry point (no props, uses default adapter + cards)
// ---------------------------------------------------------------------------

export function Component(): ReactElement {
  return <Practice />;
}
