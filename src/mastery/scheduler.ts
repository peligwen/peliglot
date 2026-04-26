/**
 * FSRS scheduler wrapper — project-internal interface over ts-fsrs 5.3.2.
 *
 * Decision: ts-fsrs chosen over a hand-rolled implementation.
 * Rationale: ts-fsrs 5.3.2's raw ESM module is 59 KB unminified; after
 * Vite's minification and tree-shaking it contributes ~17 KB gzipped to the
 * mastery chunk. The Spanish guide chunk remains at its pre-mastery baseline
 * of 345 KB (82 KB gzipped) because guide files never import this module
 * directly — the scheduler only reaches the browser when the Practice route
 * (added in Phase 2a.4) is loaded. Hand-rolling FSRS-4.5 correctly (stability
 * decay, difficulty update, step-based early-learning transitions) carries real
 * correctness risk for no meaningful bundle benefit. The ts-fsrs wrapper is
 * reversible: the rest of the codebase imports only from this file, never from
 * ts-fsrs directly.
 */

import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating as TsFsrsRating,
  type Card as TsFsrsCard,
  type RecordLog,
  type Grade,
} from 'ts-fsrs';
import { Rating, type SchedulerCard } from './types';

// Re-export Rating so callers import from this module only.
export { Rating } from './types';
export type { SchedulerCard } from './types';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const params = generatorParameters();
const scheduler = fsrs(params);

/**
 * Convert a project `SchedulerCard` to the ts-fsrs `Card` shape.
 * ts-fsrs uses snake_case and `Date` objects; we use camelCase and epoch ms.
 */
function toTsFsrsCard(card: SchedulerCard): TsFsrsCard {
  return {
    due: new Date(card.due),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: 0,          // deprecated in ts-fsrs; set to 0
    scheduled_days: 0,        // recomputed on repeat()
    learning_steps: card.learningSteps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.fsrsState,
    last_review: card.lastReview !== null ? new Date(card.lastReview) : undefined,
  };
}

/**
 * Convert a ts-fsrs `Card` back to a project `SchedulerCard`.
 * The `due` field on a freshly-rated card is the next scheduled date.
 */
function fromTsFsrsCard(card: TsFsrsCard): Omit<SchedulerCard, 'cardId'> {
  return {
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    lastReview: card.last_review ? card.last_review.getTime() : null,
    learningSteps: card.learning_steps,
    fsrsState: card.state as 0 | 1 | 2 | 3,
  };
}

/** Map our 4-value `Rating` enum to ts-fsrs's `Grade` type (excludes Manual). */
function toTsFsrsGrade(rating: Rating): Grade {
  switch (rating) {
    case Rating.Again: return TsFsrsRating.Again;
    case Rating.Hard:  return TsFsrsRating.Hard;
    case Rating.Good:  return TsFsrsRating.Good;
    case Rating.Easy:  return TsFsrsRating.Easy;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create a brand-new card with default FSRS scheduling state.
 * The returned card is due immediately (now) so it surfaces in the first
 * practice session.
 */
export function createCard(): SchedulerCard {
  const raw = createEmptyCard();
  return {
    due: raw.due.getTime(),
    stability: raw.stability,
    difficulty: raw.difficulty,
    reps: raw.reps,
    lapses: raw.lapses,
    lastReview: raw.last_review ? raw.last_review.getTime() : null,
    learningSteps: raw.learning_steps,
    fsrsState: raw.state as 0 | 1 | 2 | 3,
  };
}

/**
 * Rate a card and return a new, immutable card with updated scheduling state.
 *
 * @param card  - The current card to rate.
 * @param rating - Learner's self-assessed rating (Again | Hard | Good | Easy).
 * @param now   - Current time as an epoch ms timestamp.
 * @returns     A new `SchedulerCard`; the original is not mutated.
 */
export function rateCard(
  card: SchedulerCard,
  rating: Rating,
  now: number,
): SchedulerCard {
  const tsFsrsCard = toTsFsrsCard(card);
  const tsFsrsGrade = toTsFsrsGrade(rating);
  const result: RecordLog = scheduler.repeat(tsFsrsCard, new Date(now));
  const ratedItem = result[tsFsrsGrade];
  const updated = fromTsFsrsCard(ratedItem.card);
  return { ...card, ...updated };
}
