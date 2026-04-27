/**
 * Pure recommendation function for the mastery layer.
 *
 * Zero React imports. Zero adapter imports. Zero clock reads.
 * The caller supplies all inputs; this function is a pure transformation.
 *
 * Consumed by Phase 2b.2 UI components (LandingPage widget, etc.).
 * Do NOT import react, any adapter, or Date.now() here.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RecommendationKind = 'cold-start' | 'has-due' | 'caught-up';

export interface Recommendation {
  kind: RecommendationKind;
  /** Short, understated copy — fits in a single sentence. */
  message: string;
  /** Button/link label for the primary call to action. */
  ctaLabel: string;
  /** Route path the primary CTA navigates to. */
  ctaTarget: string;
  /** Optional quieter secondary affordance. */
  secondary?: { label: string; target: string };
}

export interface RecommendationInput {
  /** Total enrolled cards — from getAllSpanishCards() count or similar. */
  cardCount: number;
  /** Cards due now — filtered from useMastery dueCards. */
  dueCount: number;
  /** Count of cards reviewed in the current local day. */
  reviewedToday: number;
}

// ---------------------------------------------------------------------------
// Constant
// ---------------------------------------------------------------------------

const PRACTICE_PATH = '/guides/spanish/practice';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Derive a Recommendation from the current mastery snapshot.
 *
 * Priority order (cold-start guards against nonsense state where other counts
 * might be non-zero due to stale data):
 *   1. cardCount === 0  → cold-start (no cards enrolled yet)
 *   2. dueCount > 0     → has-due   (work to do now)
 *   3. else             → caught-up (all done for today)
 *
 * Caught-up CTA decision: we intentionally use a quiet label ("Review extras")
 * rather than a prominent "Practice" — there's nothing due, so we don't want
 * to over-sell urgency. The primary ctaLabel/ctaTarget are still populated
 * (they're non-optional on the type) so callers can render a button
 * unconditionally. No `secondary` is emitted for caught-up; one affordance
 * is enough when the learner is already on track.
 */
export function getRecommendation(input: RecommendationInput): Recommendation {
  const { cardCount, dueCount, reviewedToday } = input;

  // 1. Cold start — takes precedence even if other counts are non-zero
  //    (defensive guard: stale dueCount data should not produce a confusing CTA
  //    when there are actually no enrolled cards).
  if (cardCount === 0) {
    return {
      kind: 'cold-start',
      message: 'Start practicing the alphabet',
      ctaLabel: 'Begin',
      ctaTarget: PRACTICE_PATH,
    };
  }

  // 2. Due cards exist — show how many
  if (dueCount > 0) {
    const cardWord = dueCount === 1 ? 'card' : 'cards';
    return {
      kind: 'has-due',
      message: `Practice now: ${dueCount} ${cardWord} due`,
      ctaLabel: 'Practice',
      ctaTarget: PRACTICE_PATH,
    };
  }

  // 3. Caught up
  const reviewed = reviewedToday > 0
    ? `${reviewedToday} reviewed today`
    : 'Nothing due right now';
  return {
    kind: 'caught-up',
    message: `All caught up. ${reviewed}`,
    ctaLabel: 'Review extras',
    ctaTarget: PRACTICE_PATH,
  };
}
