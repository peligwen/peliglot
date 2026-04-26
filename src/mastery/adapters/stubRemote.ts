/**
 * In-memory stub implementation of `MasteryStorageAdapter`.
 *
 * Used in tests to validate the per-card LWW merge semantics that will run
 * on first sign-in in Phase 2d. This is the proof that the migration story is
 * real, not aspirational: Phase 2d only needs to write a network-backed
 * adapter against the same interface — no other code changes.
 *
 * Not intended for production use. Has no persistence; state is lost when
 * the instance is garbage-collected.
 */

import type { MasteryStorageAdapter, WriteResult, MergeReport } from '../adapter';
import type { CardState, MasteryExport } from '../types';
import { CURRENT_SCHEMA_VERSION } from '../migrations';

export class StubRemoteAdapter implements MasteryStorageAdapter {
  private cards: Map<string, CardState> = new Map();

  /** Seed the adapter with initial card state for test setup. */
  seed(cardId: string, state: CardState): void {
    this.cards.set(cardId, state);
  }

  /** Directly read the in-memory state (test helper; bypasses async). */
  peek(cardId: string): CardState | undefined {
    return this.cards.get(cardId);
  }

  // ---------------------------------------------------------------------------
  // MasteryStorageAdapter implementation
  // ---------------------------------------------------------------------------

  async read(cardId: string): Promise<CardState | null> {
    return this.cards.get(cardId) ?? null;
  }

  async write(cardId: string, state: CardState): Promise<WriteResult> {
    const existing = this.cards.get(cardId);

    if (existing !== undefined && existing.updatedAt > state.updatedAt) {
      return { outcome: 'dropped' };
    }

    this.cards.set(cardId, state);
    return { outcome: 'accepted' };
  }

  async listDue(now: number): Promise<Array<{ cardId: string; state: CardState }>> {
    const due: Array<{ cardId: string; state: CardState }> = [];
    for (const [cardId, state] of this.cards) {
      if (state.due <= now) {
        due.push({ cardId, state });
      }
    }
    return due;
  }

  async bulkExport(): Promise<MasteryExport> {
    const cards: Record<string, CardState> = {};
    for (const [cardId, state] of this.cards) {
      cards[cardId] = state;
    }
    return { schemaVersion: CURRENT_SCHEMA_VERSION, cards };
  }

  async bulkImport(incoming: MasteryExport): Promise<MergeReport> {
    let accepted = 0;
    let rejected = 0;
    let unchanged = 0;

    for (const [cardId, remoteState] of Object.entries(incoming.cards)) {
      const localState = this.cards.get(cardId);

      if (localState === undefined) {
        this.cards.set(cardId, remoteState);
        accepted += 1;
      } else if (remoteState.updatedAt > localState.updatedAt) {
        this.cards.set(cardId, remoteState);
        accepted += 1;
      } else if (remoteState.updatedAt < localState.updatedAt) {
        rejected += 1;
      } else {
        unchanged += 1;
      }
    }

    return { accepted, rejected, unchanged };
  }
}
