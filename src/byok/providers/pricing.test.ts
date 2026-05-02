/**
 * Tests for src/byok/providers/pricing.ts
 */

import { describe, it, expect } from 'vitest';
import { lookupPricing, computeCostUsd, formatCostUsd, PRICING } from './pricing';

// ---------------------------------------------------------------------------
// lookupPricing
// ---------------------------------------------------------------------------

describe('lookupPricing — exact match', () => {
  it('returns pricing for claude-sonnet-4-6', () => {
    const p = lookupPricing('claude-sonnet-4-6');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(3.00);
    expect(p?.outputPer1M).toBe(15.00);
  });

  it('returns pricing for gpt-4o-mini', () => {
    const p = lookupPricing('gpt-4o-mini');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(0.15);
    expect(p?.outputPer1M).toBe(0.60);
  });

  it('returns pricing for gpt-4o (not confused with gpt-4o-mini)', () => {
    const p = lookupPricing('gpt-4o');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(2.50);
    expect(p?.outputPer1M).toBe(10.00);
  });

  it('returns pricing for claude-haiku-4-5', () => {
    const p = lookupPricing('claude-haiku-4-5');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(0.80);
  });

  it('returns pricing for claude-opus-4-7', () => {
    const p = lookupPricing('claude-opus-4-7');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(15.00);
    expect(p?.outputPer1M).toBe(75.00);
  });

  it('returns pricing for gpt-4.1', () => {
    const p = lookupPricing('gpt-4.1');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(2.00);
    expect(p?.outputPer1M).toBe(8.00);
  });

  it('returns pricing for gpt-4.1-mini', () => {
    const p = lookupPricing('gpt-4.1-mini');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(0.40);
    expect(p?.outputPer1M).toBe(1.60);
  });
});

describe('lookupPricing — prefix match (dated suffixes)', () => {
  it('matches claude-sonnet-4-6 with a date suffix', () => {
    const p = lookupPricing('claude-sonnet-4-6-20250101');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(3.00);
    expect(p?.outputPer1M).toBe(15.00);
  });

  it('matches gpt-4o-mini with a date suffix', () => {
    const p = lookupPricing('gpt-4o-mini-2024-07-18');
    expect(p).not.toBeNull();
    expect(p?.inputPer1M).toBe(0.15);
  });

  it('chooses the longest prefix (gpt-4o-mini over gpt-4o for dated gpt-4o-mini)', () => {
    // gpt-4o-mini-2024-07-18 — both 'gpt-4o' and 'gpt-4o-mini' are prefixes
    // The longer one (gpt-4o-mini) should win
    const p = lookupPricing('gpt-4o-mini-2024-07-18');
    expect(p?.inputPer1M).toBe(0.15); // gpt-4o-mini rate, not gpt-4o rate
  });
});

describe('lookupPricing — miss', () => {
  it('returns null for an unknown model', () => {
    expect(lookupPricing('llama-3.1-70b-instruct')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(lookupPricing('')).toBeNull();
  });

  it('returns null for a partial key that is not a prefix of any table entry', () => {
    expect(lookupPricing('claude')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// computeCostUsd
// ---------------------------------------------------------------------------

describe('computeCostUsd', () => {
  it('computes cost correctly for claude-sonnet-4-6 at realistic usage', () => {
    // 1000 input + 500 output at $3/$15 per 1M
    const pricing = PRICING['claude-sonnet-4-6']!;
    const cost = computeCostUsd({ input: 1000, output: 500 }, pricing);
    // (1000 * 3 / 1_000_000) + (500 * 15 / 1_000_000) = 0.003 + 0.0075 = 0.0105
    expect(cost).toBeCloseTo(0.0105, 6);
  });

  it('computes cost correctly for gpt-4o-mini at realistic usage', () => {
    // 4200 input + 1800 output at $0.15/$0.60 per 1M
    const pricing = PRICING['gpt-4o-mini']!;
    const cost = computeCostUsd({ input: 4200, output: 1800 }, pricing);
    // (4200 * 0.15 / 1_000_000) + (1800 * 0.60 / 1_000_000) = 0.00063 + 0.00108 = 0.00171
    expect(cost).toBeCloseTo(0.00171, 6);
  });

  it('returns 0 for zero-token usage', () => {
    const pricing = PRICING['gpt-4o']!;
    expect(computeCostUsd({ input: 0, output: 0 }, pricing)).toBe(0);
  });

  it('handles large token counts without overflow', () => {
    // 1M input + 1M output for gpt-4o at $2.50/$10
    const pricing = PRICING['gpt-4o']!;
    const cost = computeCostUsd({ input: 1_000_000, output: 1_000_000 }, pricing);
    expect(cost).toBeCloseTo(12.50, 4);
  });
});

// ---------------------------------------------------------------------------
// formatCostUsd
// ---------------------------------------------------------------------------

describe('formatCostUsd', () => {
  it('formats values >= $0.01 to 2 decimal places', () => {
    expect(formatCostUsd(0.03)).toBe('$0.03');
    expect(formatCostUsd(1.5)).toBe('$1.50');
    expect(formatCostUsd(0.01)).toBe('$0.01');
  });

  it('formats values < $0.01 to 4 decimal places', () => {
    expect(formatCostUsd(0.0003)).toBe('$0.0003');
    expect(formatCostUsd(0.00171)).toBe('$0.0017');
  });

  it('formats zero to 4 decimal places', () => {
    expect(formatCostUsd(0)).toBe('$0.0000');
  });
});
