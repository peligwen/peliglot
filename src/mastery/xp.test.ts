/**
 * Tests for computeXp formula.
 *
 * Formula recap:
 *   base  = { Again: 1, Hard: 4, Good: 8, Easy: 10 }
 *   mult  = clamp(difficulty / 5, 0.5, 2.0)
 *   xp    = max(1, round(base * mult))
 */

import { describe, it, expect } from 'vitest';
import { computeXp } from './xp';
import { Rating } from './types';

describe('computeXp — difficulty extremes and clamping', () => {
  it('difficulty 0 clamps multiplier to 0.5 — Easy gives 5 (10 × 0.5)', () => {
    expect(computeXp(Rating.Easy, 0)).toBe(5);
  });

  it('difficulty 1 is low — Easy gives 2 (10 × 0.2 → but clamp → 0.5 → 5)', () => {
    // difficulty=1 → mult = clamp(1/5, 0.5, 2.0) = clamp(0.2, 0.5, 2.0) = 0.5
    // Easy base=10, 10*0.5 = 5
    expect(computeXp(Rating.Easy, 1)).toBe(5);
  });

  it('difficulty 2.5 — clamp(0.5, 0.5, 2.0) = 0.5 — Easy gives 5', () => {
    // 2.5/5 = 0.5, exactly at clamp floor
    expect(computeXp(Rating.Easy, 2.5)).toBe(5);
  });

  it('difficulty 5 (average) — multiplier is exactly 1.0 — Good gives exactly 8', () => {
    expect(computeXp(Rating.Good, 5)).toBe(8);
  });

  it('difficulty 10 (maximum) — multiplier clamps to 2.0 — Good gives 16', () => {
    // 10/5 = 2.0, exactly at clamp ceiling
    expect(computeXp(Rating.Good, 10)).toBe(16);
  });

  it('difficulty 20 clamps multiplier to 2.0 — Good gives 16', () => {
    expect(computeXp(Rating.Good, 20)).toBe(16);
  });
});

describe('computeXp — all four ratings at average difficulty (5)', () => {
  it('Again → 1', () => expect(computeXp(Rating.Again, 5)).toBe(1));
  it('Hard  → 4', () => expect(computeXp(Rating.Hard,  5)).toBe(4));
  it('Good  → 8', () => expect(computeXp(Rating.Good,  5)).toBe(8));
  it('Easy  → 10', () => expect(computeXp(Rating.Easy, 5)).toBe(10));
});

describe('computeXp — floor guarantee (minimum 1 XP per review)', () => {
  it('Again on a trivial card (difficulty=0) → 1 (floor applied)', () => {
    // Again base=1, mult=0.5 → 1*0.5 = 0.5 → round(0.5) = 1 (JS rounds to nearest even, but 0.5→1 here)
    // max(1, 1) = 1
    expect(computeXp(Rating.Again, 0)).toBeGreaterThanOrEqual(1);
  });

  it('Again on an extremely easy card → always ≥ 1', () => {
    expect(computeXp(Rating.Again, 2.5)).toBeGreaterThanOrEqual(1);
  });

  it('any rating × any difficulty ≥ 1', () => {
    const ratings = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy];
    const difficulties = [0, 0.1, 1, 2.5, 5, 7.5, 10, 20];
    for (const rating of ratings) {
      for (const diff of difficulties) {
        expect(computeXp(rating, diff)).toBeGreaterThanOrEqual(1);
      }
    }
  });
});

describe('computeXp — hard card with Again', () => {
  it('Again on a hard card (difficulty=10) → small but ≥ 1', () => {
    // base=1, mult=2.0, 1*2.0 = 2 → max(1, 2) = 2
    expect(computeXp(Rating.Again, 10)).toBe(2);
    expect(computeXp(Rating.Again, 10)).toBeGreaterThanOrEqual(1);
  });
});

describe('computeXp — mid-range difficulty', () => {
  it('difficulty 7.5 — multiplier 1.5 — Good gives 12', () => {
    // 8 * 1.5 = 12
    expect(computeXp(Rating.Good, 7.5)).toBe(12);
  });

  it('difficulty 3 — multiplier 0.6 — Hard gives 2 (round(4*0.6)=round(2.4)=2)', () => {
    expect(computeXp(Rating.Hard, 3)).toBe(2);
  });
});
