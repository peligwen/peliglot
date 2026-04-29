/**
 * Tests for encodeSnapshot / decodeSnapshot.
 *
 * CompressionStream / DecompressionStream are available in vitest's jsdom
 * runtime (Node 22 exposes them globally; vitest inherits them). No polyfill
 * needed — confirmed before writing this suite.
 */

import { describe, it, expect } from 'vitest';
import { encodeSnapshot, decodeSnapshot, SnapshotDecodeError } from './snapshot';
import type { MasteryExport, CardState } from '../mastery/types';

// ---------------------------------------------------------------------------
// Test data helpers
// ---------------------------------------------------------------------------

function makeCard(id: string, updatedAt = Date.now()): CardState {
  return {
    cardId: id,
    updatedAt,
    due: updatedAt + 86_400_000,
    stability: 1.5,
    difficulty: 5,
    reps: 2,
    lapses: 0,
    lastReview: updatedAt - 3600_000,
    learningSteps: 0,
    fsrsState: 2,
  };
}

const emptySnapshot: MasteryExport = {
  schemaVersion: 1,
  cards: {},
};

const oneCardSnapshot: MasteryExport = {
  schemaVersion: 1,
  cards: {
    'spanish-1-a': makeCard('spanish-1-a', 1_700_000_000_000),
  },
};

const multiCardSnapshot: MasteryExport = {
  schemaVersion: 1,
  cards: {
    'spanish-1-a': makeCard('spanish-1-a', 1_700_000_000_000),
    'spanish-1-b': makeCard('spanish-1-b', 1_700_000_100_000),
    'spanish-2-hola': makeCard('spanish-2-hola', 1_700_000_200_000),
  },
  streak: {
    current: 5,
    longest: 12,
    lastReviewDate: '2025-04-28',
  },
  xp: {
    allTime: 420,
    today: 32,
    dayKey: '2025-04-28',
  },
  settings: {
    dailyGoal: 10,
  },
};

// ---------------------------------------------------------------------------
// Roundtrip tests
// ---------------------------------------------------------------------------

describe('encodeSnapshot / decodeSnapshot — roundtrip', () => {
  it('empty snapshot roundtrips without data loss', async () => {
    const encoded = await encodeSnapshot(emptySnapshot);
    const decoded = await decodeSnapshot(encoded);

    expect(decoded.schemaVersion).toBe(1);
    expect(decoded.cards).toEqual({});
  });

  it('one-card snapshot roundtrips without data loss', async () => {
    const encoded = await encodeSnapshot(oneCardSnapshot);
    const decoded = await decodeSnapshot(encoded);

    expect(decoded.schemaVersion).toBe(1);
    expect(decoded.cards['spanish-1-a']).toMatchObject({
      cardId: 'spanish-1-a',
      updatedAt: 1_700_000_000_000,
      stability: 1.5,
      difficulty: 5,
      reps: 2,
      fsrsState: 2,
    });
  });

  it('multi-card snapshot with streak/xp/settings roundtrips without data loss', async () => {
    const encoded = await encodeSnapshot(multiCardSnapshot);
    const decoded = await decodeSnapshot(encoded);

    expect(decoded.schemaVersion).toBe(1);
    expect(Object.keys(decoded.cards)).toHaveLength(3);
    expect(decoded.cards['spanish-2-hola']).toMatchObject({
      cardId: 'spanish-2-hola',
      updatedAt: 1_700_000_200_000,
    });
    expect(decoded.streak).toEqual({
      current: 5,
      longest: 12,
      lastReviewDate: '2025-04-28',
    });
    expect(decoded.xp).toEqual({
      allTime: 420,
      today: 32,
      dayKey: '2025-04-28',
    });
    expect(decoded.settings).toEqual({ dailyGoal: 10 });
  });

  it('encoded string contains only base64url-safe characters', async () => {
    const encoded = await encodeSnapshot(multiCardSnapshot);
    // Base64url: A-Z a-z 0-9 - _  (no + / =)
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('encoded string is meaningfully shorter than the raw JSON', async () => {
    const encoded = await encodeSnapshot(multiCardSnapshot);
    const rawJson = JSON.stringify(multiCardSnapshot);
    // Compression + base64url should be shorter for a multi-card payload.
    expect(encoded.length).toBeLessThan(rawJson.length);
  });
});

// ---------------------------------------------------------------------------
// Error cases
// ---------------------------------------------------------------------------

describe('decodeSnapshot — error cases', () => {
  it('throws SnapshotDecodeError on non-base64url input', async () => {
    await expect(decodeSnapshot('not-valid-@@##')).rejects.toBeInstanceOf(SnapshotDecodeError);
  });

  it('throws SnapshotDecodeError with a friendly message on non-base64url', async () => {
    await expect(decodeSnapshot('!!!invalid!!!')).rejects.toThrow(
      /invalid share link/i,
    );
  });

  it('throws SnapshotDecodeError on valid base64url that is not gzip', async () => {
    // Encode some plain text as base64url — valid base64, but not gzip
    const notGzip = btoa('this is definitely not gzip data')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    await expect(decodeSnapshot(notGzip)).rejects.toBeInstanceOf(SnapshotDecodeError);
  });

  it('throws SnapshotDecodeError on bad gzip (truncated compressed bytes)', async () => {
    // Encode a valid snapshot, then truncate the encoded string mid-stream
    const encoded = await encodeSnapshot(oneCardSnapshot);
    const truncated = encoded.slice(0, Math.floor(encoded.length / 2));
    await expect(decodeSnapshot(truncated)).rejects.toBeInstanceOf(SnapshotDecodeError);
  });

  it('throws SnapshotDecodeError with message mentioning link or data on gzip error', async () => {
    const encoded = await encodeSnapshot(oneCardSnapshot);
    const truncated = encoded.slice(0, 10);
    await expect(decodeSnapshot(truncated)).rejects.toThrow(
      /invalid share link/i,
    );
  });

  it('handles bad JSON gracefully (throws SnapshotDecodeError)', async () => {
    // Manually gzip + base64url encode non-JSON text
    const notJson = new TextEncoder().encode('this is not json at all {{{{');
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    // Await write+close to avoid unhandled rejection noise.
    await writer.write(notJson);
    await writer.close();
    const chunks: Uint8Array[] = [];
    const reader = cs.readable.getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value as Uint8Array);
    }
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const compressed = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) { compressed.set(chunk, offset); offset += chunk.length; }
    let binary = '';
    for (let i = 0; i < compressed.length; i++) {
      binary += String.fromCharCode(compressed[i] as number);
    }
    const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    await expect(decodeSnapshot(encoded)).rejects.toBeInstanceOf(SnapshotDecodeError);
    await expect(decodeSnapshot(encoded)).rejects.toThrow(/invalid share link/i);
  });
});
