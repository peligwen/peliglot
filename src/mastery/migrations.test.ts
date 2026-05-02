/**
 * Tests for src/mastery/migrations.ts — migrate / migrateWithStatus.
 *
 * Distinct from migration.test.ts (which covers LWW merge semantics on the
 * adapter). This file covers the schema-version migration entrypoint that
 * decodeSnapshot and the file-import path call before handing data downstream.
 */

import { describe, it, expect } from 'vitest';
import { migrate, migrateWithStatus, emptyExport, CURRENT_SCHEMA_VERSION } from './migrations';

describe('migrate (legacy entrypoint)', () => {
  it('passes a current-version snapshot through identity', () => {
    const snapshot = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      cards: { 'spanish-1-foo': { cardId: 'spanish-1-foo' } },
    };
    expect(migrate(snapshot).schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
  });

  it('returns emptyExport on null/undefined/non-object', () => {
    expect(migrate(null)).toEqual(emptyExport());
    expect(migrate(undefined)).toEqual(emptyExport());
    expect(migrate('not an object')).toEqual(emptyExport());
    expect(migrate(42)).toEqual(emptyExport());
  });

  it('returns emptyExport when schemaVersion is missing', () => {
    expect(migrate({ cards: {} })).toEqual(emptyExport());
  });

  it('returns emptyExport on a future-version snapshot (legacy callers see no data)', () => {
    expect(migrate({ schemaVersion: 99, cards: {} })).toEqual(emptyExport());
  });
});

describe('migrateWithStatus', () => {
  it('returns ok for current-version snapshots with valid shape', () => {
    const snapshot = { schemaVersion: CURRENT_SCHEMA_VERSION, cards: {} };
    const result = migrateWithStatus(snapshot);
    expect(result.status).toBe('ok');
    if (result.status === 'ok') {
      expect(result.snapshot).toEqual(snapshot);
    }
  });

  it('flags future-version explicitly with the version found', () => {
    const result = migrateWithStatus({ schemaVersion: 7, cards: {} });
    expect(result.status).toBe('future-version');
    if (result.status === 'future-version') {
      expect(result.foundVersion).toBe(7);
      // Always returns an empty fallback so callers can render safely.
      expect(result.snapshot).toEqual(emptyExport());
    }
  });

  it('flags malformed for non-object', () => {
    expect(migrateWithStatus(null).status).toBe('malformed');
    expect(migrateWithStatus('hi').status).toBe('malformed');
    expect(migrateWithStatus(undefined).status).toBe('malformed');
  });

  it('flags malformed for missing schemaVersion', () => {
    expect(migrateWithStatus({ cards: {} }).status).toBe('malformed');
  });

  it('flags malformed when current-version snapshot has the wrong shape', () => {
    // Missing `cards` field entirely
    expect(migrateWithStatus({ schemaVersion: CURRENT_SCHEMA_VERSION }).status).toBe('malformed');
    // `cards` is not an object
    expect(migrateWithStatus({ schemaVersion: CURRENT_SCHEMA_VERSION, cards: 'oops' }).status).toBe('malformed');
  });

  it('the legacy `migrate` returns the same snapshot as migrateWithStatus.snapshot', () => {
    const inputs: unknown[] = [
      { schemaVersion: 1, cards: {} },
      null,
      { schemaVersion: 99, cards: {} },
      'not an object',
      { cards: {} },
    ];
    for (const input of inputs) {
      expect(migrate(input)).toEqual(migrateWithStatus(input).snapshot);
    }
  });
});
