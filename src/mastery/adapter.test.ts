import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageMasteryAdapter } from './adapters/localStorage';
import type { CardState } from './types';

// ---------------------------------------------------------------------------
// Helper: build a minimal CardState for tests
// ---------------------------------------------------------------------------
function makeCard(cardId: string, updatedAt: number, due: number): CardState {
  return {
    cardId,
    updatedAt,
    due,
    stability: 1,
    difficulty: 5,
    reps: 0,
    lapses: 0,
    lastReview: null,
    learningSteps: 0,
    fsrsState: 0,
  };
}

describe('LocalStorageMasteryAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // read / write basics
  // -------------------------------------------------------------------------
  it('read returns null for an unknown cardId', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    expect(await adapter.read('unknown')).toBeNull();
  });

  it('write and read round-trip correctly', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    const state = makeCard('c1', 100, Date.now());
    await adapter.write('c1', state);
    const result = await adapter.read('c1');
    expect(result).toEqual(state);
  });

  // -------------------------------------------------------------------------
  // Last-write-wins conflict resolution
  // -------------------------------------------------------------------------
  it('LWW: write with newer updatedAt overwrites older record', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    const cardA = makeCard('x', 100, Date.now() - 1000);
    const cardB = makeCard('x', 200, Date.now() + 1000);

    await adapter.write('x', cardA);
    const result1 = await adapter.write('x', cardB);
    expect(result1.outcome).toBe('accepted');

    const stored = await adapter.read('x');
    expect(stored?.updatedAt).toBe(200);
  });

  it('LWW: write with older updatedAt is dropped', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    const cardA = makeCard('x', 100, Date.now());
    const cardB = makeCard('x',  50, Date.now());

    await adapter.write('x', cardA);
    const result = await adapter.write('x', cardB);
    expect(result.outcome).toBe('dropped');

    const stored = await adapter.read('x');
    expect(stored?.updatedAt).toBe(100);
  });

  it('LWW: write at the same updatedAt is accepted (idempotent)', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    const card = makeCard('x', 100, Date.now());
    await adapter.write('x', card);
    const result = await adapter.write('x', card);
    expect(result.outcome).toBe('accepted');
  });

  // -------------------------------------------------------------------------
  // listDue
  // -------------------------------------------------------------------------
  it('listDue returns only cards whose due <= now', async () => {
    const now = Date.now();
    const adapter = new LocalStorageMasteryAdapter();

    const pastCard  = makeCard('past',   100, now - 1000);
    const exactCard = makeCard('exact',  200, now);
    const futureCard = makeCard('future', 300, now + 1000);

    await adapter.write('past',   pastCard);
    await adapter.write('exact',  exactCard);
    await adapter.write('future', futureCard);

    const due = await adapter.listDue(now);
    const dueIds = due.map(d => d.cardId).sort();
    expect(dueIds).toEqual(['exact', 'past']);
  });

  it('listDue returns empty array when no cards are due', async () => {
    const now = Date.now();
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.write('f1', makeCard('f1', 1, now + 9999));
    await adapter.write('f2', makeCard('f2', 2, now + 9999));
    expect(await adapter.listDue(now)).toHaveLength(0);
  });

  // -------------------------------------------------------------------------
  // Persistence across instances
  // -------------------------------------------------------------------------
  it('state persists to localStorage and is read back on new instance', async () => {
    const adapter1 = new LocalStorageMasteryAdapter();
    const card = makeCard('persist-me', 42, Date.now());
    await adapter1.write('persist-me', card);

    const adapter2 = new LocalStorageMasteryAdapter();
    const result = await adapter2.read('persist-me');
    expect(result?.updatedAt).toBe(42);
  });

  // -------------------------------------------------------------------------
  // Graceful degradation when localStorage throws
  // -------------------------------------------------------------------------
  it('degrades gracefully when localStorage.getItem throws', async () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: storage access denied');
    });
    // Should not throw; falls back to empty in-memory snapshot.
    const adapter = new LocalStorageMasteryAdapter();
    expect(await adapter.read('anything')).toBeNull();
  });

  it('swallows write errors when localStorage.setItem throws', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const card = makeCard('c1', 99, Date.now());
    // Should not throw; in-memory snapshot is updated even if persist fails.
    const result = await adapter.write('c1', card);
    expect(result.outcome).toBe('accepted');
    // In-memory read still works.
    expect(await adapter.read('c1')).toEqual(card);
  });

  // -------------------------------------------------------------------------
  // bulkExport returns a deep copy
  // -------------------------------------------------------------------------
  it('bulkExport returns a copy — external mutation does not affect adapter', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.write('c1', makeCard('c1', 1, Date.now()));
    const exported = await adapter.bulkExport();
    // Mutate the export.
    exported.cards['injected'] = makeCard('injected', 999, Date.now());
    // Adapter should not be affected.
    const after = await adapter.bulkExport();
    expect(Object.keys(after.cards)).not.toContain('injected');
  });

  // -------------------------------------------------------------------------
  // writeMeta — partial merge of streak and settings
  // -------------------------------------------------------------------------
  it('writeMeta persists streak and streak survives across instances', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.writeMeta({
      streak: { current: 3, longest: 7, lastReviewDate: '2026-04-25' },
    });

    const exported = await adapter.bulkExport();
    expect(exported.streak?.current).toBe(3);
    expect(exported.streak?.longest).toBe(7);
    expect(exported.streak?.lastReviewDate).toBe('2026-04-25');

    // New instance reads it back from localStorage.
    const adapter2 = new LocalStorageMasteryAdapter();
    const exported2 = await adapter2.bulkExport();
    expect(exported2.streak?.current).toBe(3);
    expect(exported2.streak?.lastReviewDate).toBe('2026-04-25');
  });

  it('writeMeta persists dailyGoal', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.writeMeta({ settings: { dailyGoal: 10 } });

    const exported = await adapter.bulkExport();
    expect(exported.settings?.dailyGoal).toBe(10);
  });

  it('writeMeta({ streak }) does not clobber existing dailyGoal', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.writeMeta({ settings: { dailyGoal: 15 } });
    await adapter.writeMeta({
      streak: { current: 2, longest: 5, lastReviewDate: '2026-04-26' },
    });

    const exported = await adapter.bulkExport();
    // Both fields survive.
    expect(exported.settings?.dailyGoal).toBe(15);
    expect(exported.streak?.current).toBe(2);
  });

  it('writeMeta({ settings }) does not clobber existing streak', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.writeMeta({
      streak: { current: 4, longest: 8, lastReviewDate: '2026-04-24' },
    });
    await adapter.writeMeta({ settings: { dailyGoal: 7 } });

    const exported = await adapter.bulkExport();
    expect(exported.streak?.current).toBe(4);
    expect(exported.settings?.dailyGoal).toBe(7);
  });
});
