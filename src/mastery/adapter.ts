/**
 * MasteryStorageAdapter — the single persistence boundary for all mastery state.
 *
 * All methods are async (return Promises) even when backed by synchronous
 * storage such as localStorage. This is a deliberate upfront cost: making the
 * interface async-from-day-one means the Phase 2d cloud-adapter swap is one
 * file (a new implementation), not a hunt across every callsite.
 *
 * Conflict semantics: last-write-wins per card by `updatedAt` timestamp.
 * Each card carries its own `updatedAt`; the adapter enforces LWW on every
 * `write` and `bulkImport` call independently. See `WriteResult` and
 * `MergeReport` in types.ts for the return shapes.
 *
 * Phase 2d contract: to swap localStorage for a remote backend, implement
 * this interface in a new file (e.g. `adapters/cloudflare.ts`) and pass it
 * to `useMastery`. No other file in the codebase needs to change.
 */

import type {
  CardState,
  MasteryExport,
  MergeReport,
  WriteResult,
} from './types';

export type { CardState, MasteryExport, MergeReport, WriteResult };

/**
 * The adapter interface every storage backend must satisfy.
 * No component or hook reads/writes storage directly — they go through this.
 */
export interface MasteryStorageAdapter {
  /**
   * Read the current state for a single card.
   * Returns `null` if the card has never been written.
   */
  read(cardId: string): Promise<CardState | null>;

  /**
   * Write state for a single card with last-write-wins conflict resolution.
   *
   * If the existing record has an `updatedAt` strictly greater than
   * `state.updatedAt`, the write is dropped and `{ outcome: 'dropped' }` is
   * returned. Otherwise the write is applied and `{ outcome: 'accepted' }` is
   * returned. Equal timestamps are treated as accepted (idempotent re-write).
   */
  write(cardId: string, state: CardState): Promise<WriteResult>;

  /**
   * Return all cards whose `due` timestamp is ≤ `now`.
   * Used by the practice queue to surface review work.
   */
  listDue(now: number): Promise<Array<{ cardId: string; state: CardState }>>;

  /**
   * Export the full snapshot for sync or backup.
   * The returned `MasteryExport` is a deep copy — mutations do not affect
   * the adapter's internal state.
   */
  bulkExport(): Promise<MasteryExport>;

  /**
   * Merge an incoming snapshot into the adapter's current state using
   * per-card last-write-wins semantics.
   *
   * For each card in `snapshot.cards`:
   *   - If absent locally, write it → counts as `accepted`.
   *   - If remote `updatedAt` > local `updatedAt`, overwrite → `accepted`.
   *   - If remote `updatedAt` < local `updatedAt`, discard → `rejected`.
   *   - If `updatedAt` is equal on both sides, skip → `unchanged`.
   *
   * Returns a `MergeReport` with counts for each outcome bucket.
   */
  bulkImport(snapshot: MasteryExport): Promise<MergeReport>;
}
