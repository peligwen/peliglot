/**
 * Tests for getRecommendation.
 *
 * This is a pure function — no mocks, no timers, no adapters.
 */

import { describe, it, expect } from 'vitest';
import { getRecommendation } from './recommendation';

describe('getRecommendation — cold-start', () => {
  it('returns cold-start when cardCount is 0', () => {
    const rec = getRecommendation({ cardCount: 0, dueCount: 0, reviewedToday: 0 });
    expect(rec.kind).toBe('cold-start');
    expect(rec.ctaLabel).toBe('Begin');
    expect(rec.ctaTarget).toBe('/guides/spanish/practice');
    expect(rec.message).toMatch(/start/i);
  });

  it('cold-start takes precedence even when dueCount is non-zero (defensive)', () => {
    const rec = getRecommendation({ cardCount: 0, dueCount: 5, reviewedToday: 3 });
    expect(rec.kind).toBe('cold-start');
  });

  it('cold-start takes precedence even when reviewedToday is non-zero (defensive)', () => {
    const rec = getRecommendation({ cardCount: 0, dueCount: 0, reviewedToday: 99 });
    expect(rec.kind).toBe('cold-start');
  });
});

describe('getRecommendation — has-due', () => {
  it('returns has-due when dueCount > 0', () => {
    const rec = getRecommendation({ cardCount: 10, dueCount: 3, reviewedToday: 0 });
    expect(rec.kind).toBe('has-due');
    expect(rec.ctaLabel).toBe('Practice');
    expect(rec.ctaTarget).toBe('/guides/spanish/practice');
  });

  it('singular "card" when dueCount === 1', () => {
    const rec = getRecommendation({ cardCount: 5, dueCount: 1, reviewedToday: 0 });
    expect(rec.message).toContain('1 card due');
    expect(rec.message).not.toContain('cards');
  });

  it('plural "cards" when dueCount > 1', () => {
    const rec = getRecommendation({ cardCount: 10, dueCount: 7, reviewedToday: 0 });
    expect(rec.message).toContain('7 cards due');
  });

  it('message includes the due count', () => {
    const rec = getRecommendation({ cardCount: 100, dueCount: 42, reviewedToday: 5 });
    expect(rec.message).toContain('42');
  });
});

describe('getRecommendation — caught-up', () => {
  it('returns caught-up when cardCount > 0 and dueCount === 0', () => {
    const rec = getRecommendation({ cardCount: 10, dueCount: 0, reviewedToday: 5 });
    expect(rec.kind).toBe('caught-up');
    expect(rec.ctaTarget).toBe('/guides/spanish/practice');
  });

  it('message includes reviewedToday count when > 0', () => {
    const rec = getRecommendation({ cardCount: 10, dueCount: 0, reviewedToday: 7 });
    expect(rec.message).toContain('7');
  });

  it('reviewedToday === 0 — message is acceptable (no NaN, no awkward "0 reviewed")', () => {
    const rec = getRecommendation({ cardCount: 10, dueCount: 0, reviewedToday: 0 });
    expect(rec.kind).toBe('caught-up');
    // Must not contain NaN or be empty
    expect(rec.message).not.toContain('NaN');
    expect(rec.message.trim().length).toBeGreaterThan(0);
    // The copy should be readable — assert the "All caught up" anchor is present
    expect(rec.message).toContain('All caught up');
  });

  it('ctaLabel is present and non-empty for caught-up', () => {
    const rec = getRecommendation({ cardCount: 5, dueCount: 0, reviewedToday: 0 });
    expect(typeof rec.ctaLabel).toBe('string');
    expect(rec.ctaLabel.trim().length).toBeGreaterThan(0);
  });
});

describe('getRecommendation — purity smoke check', () => {
  it('calling twice with same input returns the same output (referential behavior)', () => {
    const input = { cardCount: 5, dueCount: 2, reviewedToday: 1 };
    const a = getRecommendation(input);
    const b = getRecommendation(input);
    expect(a).toEqual(b);
  });
});
