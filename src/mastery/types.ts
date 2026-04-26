/**
 * Core types for the Peliglot mastery layer.
 *
 * These types define the shape of all persisted card state. They are designed
 * to be storage-adapter-agnostic: the same `CardState` flows through
 * localStorage today and a Cloudflare D1 adapter in Phase 2d without
 * changing any consuming code.
 *
 * Conflict semantics: last-write-wins per card by `updatedAt` timestamp.
 * This is the correct choice for single-user multi-device sync at this scale.
 * CRDTs would be over-engineering. The `bulkImport` path (used on first sign-in
 * to merge local data with cloud state) enforces LWW on every card independently.
 */

// ---------------------------------------------------------------------------
// Scheduler types
// ---------------------------------------------------------------------------

/** The four learner-facing rating levels exposed to the UI. */
export enum Rating {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

/**
 * Internal scheduling state for a single card.
 * Maps onto FSRS-4.5 state; all Date values stored as ms timestamps so this
 * type serialises cleanly to JSON without conversion at call sites.
 */
export interface SchedulerCard {
  /** Epoch ms timestamp of when this card is next due. */
  due: number;
  /** FSRS stability (days before 90% retrievability). */
  stability: number;
  /** FSRS difficulty [1, 10]. */
  difficulty: number;
  /** Number of successful reviews. */
  reps: number;
  /** Number of times card has lapsed back to relearning. */
  lapses: number;
  /** Epoch ms timestamp of the last review, or null for a new card. */
  lastReview: number | null;
  /** FSRS learning-step counter (internal scheduler state). */
  learningSteps: number;
  /** FSRS card state index (0=New, 1=Learning, 2=Review, 3=Relearning). */
  fsrsState: 0 | 1 | 2 | 3;
}

// ---------------------------------------------------------------------------
// Persisted card state
// ---------------------------------------------------------------------------

/**
 * Full persisted state for a single mastery card.
 * `CardState` extends `SchedulerCard` with identity and audit fields.
 */
export interface CardState extends SchedulerCard {
  /** Stable identifier for this card (e.g. "spanish-guide1-a"). */
  cardId: string;
  /** Epoch ms timestamp of the last write. Used for LWW conflict resolution. */
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// Streak and settings (populated in Phase 2a.2; fields optional now)
// ---------------------------------------------------------------------------

export interface StreakState {
  /** Current streak count in days. */
  current: number;
  /** Longest streak ever recorded. */
  longest: number;
  /** Epoch ms timestamp of the last practice session date (midnight). */
  lastPracticeDay: number | null;
}

// ---------------------------------------------------------------------------
// Bulk export / import shapes
// ---------------------------------------------------------------------------

/**
 * Full snapshot of all mastery state for a single user.
 * Used by `bulkExport` and `bulkImport` on the adapter.
 *
 * `schemaVersion` is bumped whenever `CardState` shape changes incompatibly.
 * The `migrations` entrypoint handles forward-migration of older snapshots.
 * Current version: 1.
 */
export interface MasteryExport {
  schemaVersion: number;
  cards: Record<string, CardState>;
  /** Populated in Phase 2a.2. Present in the type now so the contract is stable. */
  streak?: StreakState;
  settings?: {
    dailyGoal?: number;
  };
}

// ---------------------------------------------------------------------------
// Adapter return types
// ---------------------------------------------------------------------------

/**
 * Result of a single `write` call.
 * - `accepted`: the write was applied (incoming `updatedAt` >= existing).
 * - `dropped`: the existing record was newer; incoming state discarded.
 */
export type WriteResult = { outcome: 'accepted' } | { outcome: 'dropped' };

/**
 * Summary of a `bulkImport` merge operation.
 * - `accepted`: cards where the remote state was newer (or absent locally) and was written.
 * - `rejected`: cards where the local state was already newer; remote discarded.
 * - `unchanged`: cards where `updatedAt` was identical on both sides; no write performed.
 */
export interface MergeReport {
  accepted: number;
  rejected: number;
  unchanged: number;
}
