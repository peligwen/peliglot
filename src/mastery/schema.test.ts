/**
 * Schema round-trip and migration safety tests.
 *
 * Validates:
 * 1. `bulkExport` / `bulkImport` round-trip preserves shape and schemaVersion.
 * 2. `migrate(null)` and `migrate({garbage: true})` return a fresh empty export.
 * 3. `migrate` is a no-op for a valid v1 snapshot.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageMasteryAdapter } from './adapters/localStorage';
import { migrate, emptyExport, CURRENT_SCHEMA_VERSION } from './migrations';
import type { CardState, MasteryExport } from './types';

function makeCard(cardId: string, updatedAt: number): CardState {
  return {
    cardId,
    updatedAt,
    due: Date.now() + 86400_000,
    stability: 2,
    difficulty: 4.5,
    reps: 3,
    lapses: 0,
    lastReview: Date.now() - 86400_000,
    learningSteps: 0,
    fsrsState: 2,
  };
}

describe('migrate', () => {
  it('returns a fresh empty export for null input', () => {
    const result = migrate(null);
    expect(result).toEqual(emptyExport());
    expect(result.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(Object.keys(result.cards)).toHaveLength(0);
  });

  it('returns a fresh empty export for undefined input', () => {
    const result = migrate(undefined);
    expect(result).toEqual(emptyExport());
  });

  it('returns a fresh empty export for {garbage: true}', () => {
    const result = migrate({ garbage: true });
    expect(result).toEqual(emptyExport());
  });

  it('returns a fresh empty export for a string', () => {
    const result = migrate('not-an-export');
    expect(result).toEqual(emptyExport());
  });

  it('returns a fresh empty export for an array', () => {
    const result = migrate([1, 2, 3]);
    expect(result).toEqual(emptyExport());
  });

  it('returns a fresh empty export when schemaVersion is missing', () => {
    const result = migrate({ cards: {} });
    expect(result).toEqual(emptyExport());
  });

  it('passes through a valid v1 snapshot unchanged', () => {
    const valid: MasteryExport = {
      schemaVersion: 1,
      cards: { c1: makeCard('c1', 100) },
    };
    const result = migrate(valid);
    expect(result.schemaVersion).toBe(1);
    expect(result.cards['c1']?.updatedAt).toBe(100);
  });
});

describe('bulkExport / bulkImport round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('round-trips schemaVersion and card data through export → import', async () => {
    const source = new LocalStorageMasteryAdapter();
    await source.write('c1', makeCard('c1', 100));
    await source.write('c2', makeCard('c2', 200));

    const exported = await source.bulkExport();
    expect(exported.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(Object.keys(exported.cards)).toHaveLength(2);

    // Import into a fresh adapter.
    localStorage.clear();
    const target = new LocalStorageMasteryAdapter();
    const report = await target.bulkImport(exported);

    expect(report.accepted).toBe(2);
    expect(report.rejected).toBe(0);
    expect(report.unchanged).toBe(0);

    const c1 = await target.read('c1');
    expect(c1?.updatedAt).toBe(100);
    expect(c1?.reps).toBe(3);
    expect(c1?.fsrsState).toBe(2);

    const c2 = await target.read('c2');
    expect(c2?.updatedAt).toBe(200);
  });

  it('exported snapshot has schemaVersion preserved after re-import', async () => {
    const adapter = new LocalStorageMasteryAdapter();
    await adapter.write('c1', makeCard('c1', 42));
    const exported = await adapter.bulkExport();

    // Re-import into same adapter (all cards have equal updatedAt → unchanged).
    const report = await adapter.bulkImport(exported);
    expect(report.unchanged).toBe(1);
    expect(report.accepted).toBe(0);

    // Shape still correct after no-op import.
    const reExported = await adapter.bulkExport();
    expect(reExported.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(reExported.cards['c1']?.updatedAt).toBe(42);
  });

  it('optional streak and settings fields survive a round-trip', async () => {
    // Write a snapshot with optional fields directly to localStorage.
    const snapshot: MasteryExport = {
      schemaVersion: 1,
      cards: { c1: makeCard('c1', 10) },
      streak: { current: 5, longest: 10, lastPracticeDay: Date.now() },
      settings: { dailyGoal: 20 },
    };
    localStorage.setItem('peliglot-mastery-v1', JSON.stringify(snapshot));

    const adapter = new LocalStorageMasteryAdapter();
    const exported = await adapter.bulkExport();

    expect(exported.streak?.current).toBe(5);
    expect(exported.streak?.longest).toBe(10);
    expect(exported.settings?.dailyGoal).toBe(20);
  });
});
