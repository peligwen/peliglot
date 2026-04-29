/**
 * Tests for src/byok/cost-storage.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { readCost, addToCost, resetCost, resetAllCosts } from './cost-storage';

// ---------------------------------------------------------------------------
// Setup — clear cost storage before each test
// ---------------------------------------------------------------------------

const COST_KEYS = [
  'peliglot-byok-cost-anthropic',
  'peliglot-byok-cost-openai',
  'peliglot-byok-cost-openai-compatible',
];

beforeEach(() => {
  for (const key of COST_KEYS) {
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
});
