/**
 * XP formula for mastery reviews.
 *
 * Philosophy: reward consistency on hard cards without letting easy-card farming
 * inflate numbers. The difficulty multiplier caps both directions — trivial cards
 * still award XP (via the floor), hard cards cap at 2×.
 *
 * Formula:
 *   base  = { Again: 1, Hard: 4, Good: 8, Easy: 10 }
 *   mult  = clamp(difficulty / 5, 0.5, 2.0)
 *   xp    = max(1, round(base * mult))
 *
 * FSRS difficulty is nominally 1–10 with 5 as average. At average difficulty
 * the multiplier is exactly 1×, so ratings award their base values directly.
 */

import { Rating } from './types';

export { Rating };

// ---------------------------------------------------------------------------
// Base XP per rating (before difficulty multiplier)
// ---------------------------------------------------------------------------

const BASE_XP: Record<Rating, number> = {
  [Rating.Again]: 1,
  [Rating.Hard]: 4,
  [Rating.Good]: 8,
  [Rating.Easy]: 10,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compute XP awarded for a single review.
 *
 * @param rating     - The learner's self-assessed rating for this review.
 * @param difficulty - FSRS difficulty of the card AT REVIEW TIME (before the
 *                     scheduler updates it). For brand-new cards, pass
 *                     `createCard().difficulty`.
 * @returns          Integer XP, minimum 1.
 */
export function computeXp(rating: Rating, difficulty: number): number {
  const base = BASE_XP[rating];
  const multiplier = Math.max(0.5, Math.min(2.0, difficulty / 5));
  return Math.max(1, Math.round(base * multiplier));
}
