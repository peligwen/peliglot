/**
 * Tests for src/byok/cost-storage.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  readCost,
  addToCost,
  resetCost,
  resetAllCosts,
  getTodayCost,
  getDailyCap,
  setDailyCap,
  clearAllCaps,
  markUnpricedCall,
  getUnpricedModelIds,
  clearAllUnpriced,
  MAX_DAILY_CAP_USD,
} from './cost-storage';

// ---------------------------------------------------------------------------
// Setup — clear cost storage before each test
// ---------------------------------------------------------------------------

const COST_KEYS = [
  'peliglot-byok-cost-anthropic',
  'peliglot-byok-cost-openai',
  'peliglot-byok-cost-openai-compatible',
];

const CAP_KEYS = [
  'peliglot-byok-cap-anthropic',
  'peliglot-byok-cap-openai',
  'peliglot-byok-cap-openai-compatible',
];

const UNPRICED_KEYS = [
  'peliglot-byok-unpriced-anthropic',
  'peliglot-byok-unpriced-openai',
  'peliglot-byok-unpriced-openai-compatible',
];

beforeEach(() => {
  for (const key of [...COST_KEYS, ...CAP_KEYS, ...UNPRICED_KEYS]) {
    localStorage.removeItem(key);
  }
});

// ---------------------------------------------------------------------------
// readCost — initial state
// ---------------------------------------------------------------------------

describe('readCost — initial state', () => {
  it('returns zero state for anthropic when unset', () => {
    const s = readCost('anthropic');
    expect(s.totalInputTokens).toBe(0);
    expect(s.totalOutputTokens).toBe(0);
    expect(s.totalCostUsd).toBe(0);
  });

  it('returns zero state for openai when unset', () => {
    const s = readCost('openai');
    expect(s.totalInputTokens).toBe(0);
    expect(s.totalOutputTokens).toBe(0);
    expect(s.totalCostUsd).toBe(0);
  });

  it('returns zero state for openai-compatible when unset', () => {
    const s = readCost('openai-compatible');
    expect(s.totalInputTokens).toBe(0);
    expect(s.totalOutputTokens).toBe(0);
    expect(s.totalCostUsd).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// addToCost — accumulation
// ---------------------------------------------------------------------------

describe('addToCost — accumulation', () => {
  it('accumulates input tokens for anthropic', () => {
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 });
    addToCost('anthropic', { input: 200, output: 75, costUsd: 0.002 });

    const s = readCost('anthropic');
    expect(s.totalInputTokens).toBe(300);
    expect(s.totalOutputTokens).toBe(125);
    expect(s.totalCostUsd).toBeCloseTo(0.003, 6);
  });

  it('does not affect other providers when accumulating for one', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.005 });

    expect(readCost('openai').totalInputTokens).toBe(0);
    expect(readCost('openai-compatible').totalInputTokens).toBe(0);
  });

  it('tracks cost separately per provider', () => {
    addToCost('anthropic', { input: 1000, output: 500, costUsd: 0.01 });
    addToCost('openai', { input: 2000, output: 1000, costUsd: 0.005 });

    expect(readCost('anthropic').totalInputTokens).toBe(1000);
    expect(readCost('openai').totalInputTokens).toBe(2000);
    expect(readCost('anthropic').totalCostUsd).toBeCloseTo(0.01, 6);
    expect(readCost('openai').totalCostUsd).toBeCloseTo(0.005, 6);
  });

  it('sets lastUpdated to a recent timestamp', () => {
    const before = Date.now();
    addToCost('openai', { input: 10, output: 5, costUsd: 0.0001 });
    const after = Date.now();

    const s = readCost('openai');
    expect(s.lastUpdated).toBeGreaterThanOrEqual(before);
    expect(s.lastUpdated).toBeLessThanOrEqual(after);
  });
});

// ---------------------------------------------------------------------------
// resetCost
// ---------------------------------------------------------------------------

describe('resetCost', () => {
  it('resets a single provider to zero', () => {
    addToCost('anthropic', { input: 500, output: 200, costUsd: 0.01 });
    addToCost('openai', { input: 300, output: 100, costUsd: 0.005 });

    resetCost('anthropic');

    const anthropic = readCost('anthropic');
    expect(anthropic.totalInputTokens).toBe(0);
    expect(anthropic.totalCostUsd).toBe(0);

    // openai unaffected
    const openai = readCost('openai');
    expect(openai.totalInputTokens).toBe(300);
  });

  it('is a no-op when provider has no stored cost', () => {
    expect(() => resetCost('openai-compatible')).not.toThrow();
    expect(readCost('openai-compatible').totalInputTokens).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// resetAllCosts
// ---------------------------------------------------------------------------

describe('resetAllCosts', () => {
  it('resets all providers to zero', () => {
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 });
    addToCost('openai', { input: 200, output: 80, costUsd: 0.002 });
    addToCost('openai-compatible', { input: 300, output: 120, costUsd: 0.003 });

    resetAllCosts();

    expect(readCost('anthropic').totalInputTokens).toBe(0);
    expect(readCost('openai').totalInputTokens).toBe(0);
    expect(readCost('openai-compatible').totalInputTokens).toBe(0);
  });

  it('is a no-op when nothing is stored', () => {
    expect(() => resetAllCosts()).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Malformed JSON cleanup
// ---------------------------------------------------------------------------

describe('readCost — malformed JSON cleanup', () => {
  it('returns zero state for malformed JSON', () => {
    localStorage.setItem('peliglot-byok-cost-anthropic', 'not-valid-json{{{');
    const s = readCost('anthropic');
    expect(s.totalInputTokens).toBe(0);
    expect(s.totalCostUsd).toBe(0);
  });

  it('returns zero state for null JSON value', () => {
    localStorage.setItem('peliglot-byok-cost-openai', 'null');
    expect(readCost('openai').totalInputTokens).toBe(0);
  });

  it('returns zero state when required fields are missing', () => {
    localStorage.setItem(
      'peliglot-byok-cost-anthropic',
      JSON.stringify({ totalInputTokens: 100 }), // missing other fields
    );
    expect(readCost('anthropic').totalInputTokens).toBe(0);
  });

  it('recovers from bad state by overwriting on next addToCost', () => {
    localStorage.setItem('peliglot-byok-cost-openai', 'bad-json');
    // Should not throw
    expect(() => addToCost('openai', { input: 10, output: 5, costUsd: 0.001 })).not.toThrow();
    // After addToCost, state should be the delta (bad state treated as zero)
    const s = readCost('openai');
    expect(s.totalInputTokens).toBe(10);
    expect(s.totalOutputTokens).toBe(5);
  });

  it('migrates from pre-byDate storage shape (no byDate field)', () => {
    localStorage.setItem(
      'peliglot-byok-cost-anthropic',
      JSON.stringify({
        totalInputTokens: 100,
        totalOutputTokens: 50,
        totalCostUsd: 0.5,
        lastUpdated: 0,
      }),
    );
    const state = readCost('anthropic');
    expect(state.totalInputTokens).toBe(100);
    expect(state.totalOutputTokens).toBe(50);
    expect(state.totalCostUsd).toBe(0.5);
    expect(state.byDate).toEqual({});
  });
});

// ---------------------------------------------------------------------------
// Daily buckets — getTodayCost
// ---------------------------------------------------------------------------

describe('getTodayCost', () => {
  it('returns zero bucket when nothing stored', () => {
    const today = getTodayCost('anthropic');
    expect(today.input).toBe(0);
    expect(today.output).toBe(0);
    expect(today.costUsd).toBe(0);
  });

  it('returns today\'s bucket after a single addToCost', () => {
    const now = new Date(2026, 3, 30, 10, 0, 0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 }, now);
    const today = getTodayCost('anthropic', now);
    expect(today.input).toBe(100);
    expect(today.output).toBe(50);
    expect(today.costUsd).toBeCloseTo(0.001, 6);
  });

  it('accumulates within the same day', () => {
    const morning = new Date(2026, 3, 30, 10, 0, 0);
    const afternoon = new Date(2026, 3, 30, 15, 0, 0);
    addToCost('openai', { input: 100, output: 50, costUsd: 0.001 }, morning);
    addToCost('openai', { input: 200, output: 75, costUsd: 0.002 }, afternoon);

    const today = getTodayCost('openai', afternoon);
    expect(today.input).toBe(300);
    expect(today.output).toBe(125);
    expect(today.costUsd).toBeCloseTo(0.003, 6);
  });

  it('starts fresh on a new local day', () => {
    const day1 = new Date(2026, 3, 30, 23, 0, 0);
    const day2 = new Date(2026, 4, 1, 1, 0, 0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 }, day1);

    const today = getTodayCost('anthropic', day2);
    expect(today.input).toBe(0);
    expect(today.costUsd).toBe(0);
  });

  it('preserves cumulative across day boundary', () => {
    const day1 = new Date(2026, 3, 30, 23, 0, 0);
    const day2 = new Date(2026, 4, 1, 1, 0, 0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 }, day1);
    addToCost('anthropic', { input: 200, output: 75, costUsd: 0.002 }, day2);

    const cumulative = readCost('anthropic');
    expect(cumulative.totalInputTokens).toBe(300);
    expect(cumulative.totalCostUsd).toBeCloseTo(0.003, 6);
  });

  it('keeps separate buckets per day in byDate map', () => {
    const day1 = new Date(2026, 3, 28, 12, 0, 0);
    const day2 = new Date(2026, 3, 29, 12, 0, 0);
    const day3 = new Date(2026, 3, 30, 12, 0, 0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 }, day1);
    addToCost('anthropic', { input: 200, output: 75, costUsd: 0.002 }, day2);
    addToCost('anthropic', { input: 300, output: 100, costUsd: 0.003 }, day3);

    const state = readCost('anthropic');
    expect(Object.keys(state.byDate).length).toBe(3);
    expect(state.byDate['2026-04-28']?.input).toBe(100);
    expect(state.byDate['2026-04-29']?.input).toBe(200);
    expect(state.byDate['2026-04-30']?.input).toBe(300);
  });

  it('prunes buckets older than 30 days', () => {
    const longAgo = new Date(2026, 0, 1, 12, 0, 0);
    const today = new Date(2026, 3, 30, 12, 0, 0);
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 }, longAgo);
    addToCost('anthropic', { input: 200, output: 75, costUsd: 0.002 }, today);

    const state = readCost('anthropic');
    // longAgo (Jan 1) is well over 30 days before today (Apr 30) — pruned
    expect(state.byDate['2026-01-01']).toBeUndefined();
    expect(state.byDate['2026-04-30']?.input).toBe(200);
    // Cumulative still reflects both
    expect(state.totalInputTokens).toBe(300);
  });
});

// ---------------------------------------------------------------------------
// Daily cap — getDailyCap / setDailyCap
// ---------------------------------------------------------------------------

describe('daily cap', () => {
  it('returns null when no cap is set', () => {
    expect(getDailyCap('anthropic')).toBeNull();
    expect(getDailyCap('openai')).toBeNull();
  });

  it('persists a positive cap', () => {
    expect(setDailyCap('anthropic', 1.5)).toBe(true);
    expect(getDailyCap('anthropic')).toBeCloseTo(1.5, 6);
  });

  it('clears cap when set to null', () => {
    setDailyCap('anthropic', 2);
    expect(getDailyCap('anthropic')).toBe(2);
    expect(setDailyCap('anthropic', null)).toBe(true);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('rejects zero and negative caps', () => {
    expect(setDailyCap('anthropic', 0)).toBe(false);
    expect(setDailyCap('anthropic', -1)).toBe(false);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('rejects non-finite caps', () => {
    expect(setDailyCap('anthropic', Number.NaN)).toBe(false);
    expect(setDailyCap('anthropic', Number.POSITIVE_INFINITY)).toBe(false);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('rejects caps above MAX_DAILY_CAP_USD', () => {
    expect(setDailyCap('anthropic', MAX_DAILY_CAP_USD + 1)).toBe(false);
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('accepts cap exactly equal to MAX_DAILY_CAP_USD', () => {
    expect(setDailyCap('anthropic', MAX_DAILY_CAP_USD)).toBe(true);
    expect(getDailyCap('anthropic')).toBe(MAX_DAILY_CAP_USD);
  });

  it('treats malformed stored value as no-cap', () => {
    localStorage.setItem('peliglot-byok-cap-anthropic', 'not-a-number');
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('treats stored value above MAX as no-cap (defensive read)', () => {
    localStorage.setItem('peliglot-byok-cap-anthropic', String(MAX_DAILY_CAP_USD + 100));
    expect(getDailyCap('anthropic')).toBeNull();
  });

  it('keeps caps independent per provider', () => {
    setDailyCap('anthropic', 1);
    setDailyCap('openai', 2);
    expect(getDailyCap('anthropic')).toBe(1);
    expect(getDailyCap('openai')).toBe(2);
    expect(getDailyCap('openai-compatible')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// clearAllCaps
// ---------------------------------------------------------------------------

describe('clearAllCaps', () => {
  it('removes all stored caps', () => {
    setDailyCap('anthropic', 1);
    setDailyCap('openai', 2);
    setDailyCap('openai-compatible', 3);

    clearAllCaps();

    expect(getDailyCap('anthropic')).toBeNull();
    expect(getDailyCap('openai')).toBeNull();
    expect(getDailyCap('openai-compatible')).toBeNull();
  });

  it('does not affect cumulative cost data', () => {
    addToCost('anthropic', { input: 100, output: 50, costUsd: 0.001 });
    setDailyCap('anthropic', 1);
    clearAllCaps();
    expect(readCost('anthropic').totalInputTokens).toBe(100);
  });
});

// ---------------------------------------------------------------------------
// Unpriced-model tracking
// ---------------------------------------------------------------------------

describe('unpriced-model tracking', () => {
  it('returns empty list when nothing recorded', () => {
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
    expect(getUnpricedModelIds('openai')).toEqual([]);
  });

  it('records a single unpriced call', () => {
    markUnpricedCall('anthropic', 'claude-future-1');
    expect(getUnpricedModelIds('anthropic')).toEqual(['claude-future-1']);
  });

  it('deduplicates repeat calls to the same model', () => {
    markUnpricedCall('anthropic', 'claude-future-1');
    markUnpricedCall('anthropic', 'claude-future-1');
    markUnpricedCall('anthropic', 'claude-future-1');
    expect(getUnpricedModelIds('anthropic')).toEqual(['claude-future-1']);
  });

  it('appends distinct model IDs in encounter order', () => {
    markUnpricedCall('openai', 'o3-mini');
    markUnpricedCall('openai', 'gpt-4-turbo');
    expect(getUnpricedModelIds('openai')).toEqual(['o3-mini', 'gpt-4-turbo']);
  });

  it('keeps providers separate', () => {
    markUnpricedCall('anthropic', 'foo');
    markUnpricedCall('openai', 'bar');
    expect(getUnpricedModelIds('anthropic')).toEqual(['foo']);
    expect(getUnpricedModelIds('openai')).toEqual(['bar']);
    expect(getUnpricedModelIds('openai-compatible')).toEqual([]);
  });

  it('caps the list size to bound storage', () => {
    for (let i = 0; i < 20; i++) {
      markUnpricedCall('openai-compatible', `model-${i}`);
    }
    const ids = getUnpricedModelIds('openai-compatible');
    expect(ids.length).toBeLessThanOrEqual(8);
    // Most recent should be retained
    expect(ids).toContain('model-19');
  });

  it('ignores empty / whitespace model IDs', () => {
    markUnpricedCall('anthropic', '');
    markUnpricedCall('anthropic', '   ');
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
  });

  it('returns empty when stored value is malformed', () => {
    localStorage.setItem('peliglot-byok-unpriced-anthropic', 'not-an-array');
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
  });

  it('returns empty when stored array contains non-strings', () => {
    localStorage.setItem(
      'peliglot-byok-unpriced-anthropic',
      JSON.stringify(['ok', 42, null]),
    );
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
  });

  it('self-heals: filters out IDs that are now in the pricing table', () => {
    // claude-sonnet-4-6 IS in pricing.ts; mystery-x is not
    markUnpricedCall('anthropic', 'claude-sonnet-4-6');
    markUnpricedCall('anthropic', 'mystery-x');
    // Read filters out the priced model — only mystery-x remains visible
    expect(getUnpricedModelIds('anthropic')).toEqual(['mystery-x']);
  });

  it('clearAllUnpriced wipes records for all providers', () => {
    markUnpricedCall('anthropic', 'a');
    markUnpricedCall('openai', 'b');
    markUnpricedCall('openai-compatible', 'c');
    clearAllUnpriced();
    expect(getUnpricedModelIds('anthropic')).toEqual([]);
    expect(getUnpricedModelIds('openai')).toEqual([]);
    expect(getUnpricedModelIds('openai-compatible')).toEqual([]);
  });
});
