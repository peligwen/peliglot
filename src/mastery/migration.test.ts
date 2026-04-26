/**
 * Migration / LWW merge tests using StubRemoteAdapter.
 *
 * These tests validate the sign-in migration story: local has some card state,
 * remote (cloud) has some card state, `bulkImport` performs per-card LWW merge
 * and returns a `MergeReport` with precise counts.
 *
 * Scenario:
 *   Local adapter has:   X@t=100, Y@t=50
 *   Remote snapshot has: X@t=200, Z@t=10
 *
 *   Expected result after merge into the "local" adapter:
 *     X → remote wins (200 > 100) → accepted
 *     Y → local only, not in remote → unchanged (no action; Y stays as-is)
 *     Z → absent locally → accepted
 *
 *   MergeReport: { accepted: 2, rejected: 0, unchanged: 0 }
 *
 * Note: Y is absent from the remote snapshot, so `bulkImport` never touches it
 * — `bulkImport` only iterates over remote cards. Y remains in the local adapter
 * but contributes 0 to the MergeReport. This is the correct LWW semantics:
 * we merge remote cards into local state; we do not delete local-only cards.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { StubRemoteAdapter } from './adapters/stubRemote';
import type { CardState, MasteryExport } from './types';

function makeCard(cardId: string, updatedAt: number, due?: number): CardState {
  return {
    cardId,
    updatedAt,
    due: due ?? Date.now() + 86400_000,
    stability: 1,
    difficulty: 5,
    reps: 0,
    lapses: 0,
    lastReview: null,
    learningSteps: 0,
    fsrsState: 0,
  };
}

describe('StubRemoteAdapter — per-card LWW merge', () => {
  let local: StubRemoteAdapter;

  beforeEach(() => {
    local = new StubRemoteAdapter();
  });

  it('merges remote snapshot with LWW semantics', async () => {
    // Seed local state: X@100, Y@50
    local.seed('X', makeCard('X', 100));
    local.seed('Y', makeCard('Y',  50));

    // Build remote snapshot: X@200, Z@10
    const remoteSnapshot: MasteryExport = {
      schemaVersion: 1,
      cards: {
        X: makeCard('X', 200),
        Z: makeCard('Z',  10),
      },
    };

    const report = await local.bulkImport(remoteSnapshot);

    // X: remote (200) > local (100) → accepted
    // Z: absent locally → accepted
    // Y: not in remote snapshot → not touched by bulkImport
    expect(report).toEqual({ accepted: 2, rejected: 0, unchanged: 0 });

    // X should now reflect the remote state (updatedAt=200)
    expect((await local.read('X'))?.updatedAt).toBe(200);

    // Y should remain untouched (still @50)
    expect((await local.read('Y'))?.updatedAt).toBe(50);

    // Z should have been added
    expect((await local.read('Z'))?.updatedAt).toBe(10);
  });

  it('rejects remote card when local is newer', async () => {
    local.seed('A', makeCard('A', 500));

    const remote: MasteryExport = {
      schemaVersion: 1,
      cards: { A: makeCard('A', 100) },
    };

    const report = await local.bulkImport(remote);
    expect(report).toEqual({ accepted: 0, rejected: 1, unchanged: 0 });
    // Local state preserved.
    expect((await local.read('A'))?.updatedAt).toBe(500);
  });

  it('marks unchanged when updatedAt is equal on both sides', async () => {
    local.seed('A', makeCard('A', 100));

    const remote: MasteryExport = {
      schemaVersion: 1,
      cards: { A: makeCard('A', 100) },
    };

    const report = await local.bulkImport(remote);
    expect(report).toEqual({ accepted: 0, rejected: 0, unchanged: 1 });
  });

  it('accepts new remote cards absent locally', async () => {
    const remote: MasteryExport = {
      schemaVersion: 1,
      cards: {
        newCard1: makeCard('newCard1', 42),
        newCard2: makeCard('newCard2', 99),
      },
    };

    const report = await local.bulkImport(remote);
    expect(report).toEqual({ accepted: 2, rejected: 0, unchanged: 0 });
    expect(await local.read('newCard1')).not.toBeNull();
    expect(await local.read('newCard2')).not.toBeNull();
  });

  it('correctly counts a mixed scenario: accepted + rejected + unchanged', async () => {
    local.seed('win',      makeCard('win',       50));   // local older → remote wins
    local.seed('lose',     makeCard('lose',     200));   // local newer → remote loses
    local.seed('tie',      makeCard('tie',      100));   // equal → unchanged

    const remote: MasteryExport = {
      schemaVersion: 1,
      cards: {
        win:     makeCard('win',     100),   // remote newer
        lose:    makeCard('lose',     50),   // remote older
        tie:     makeCard('tie',     100),   // equal
        absent:  makeCard('absent',   10),   // new → accepted
      },
    };

    const report = await local.bulkImport(remote);
    expect(report).toEqual({ accepted: 2, rejected: 1, unchanged: 1 });
  });
});
