import { describe, it, expect } from 'vitest';
import { extract } from './guide18';

describe('guide18 extractor (por-vs-para)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is approximately 10 (within ±3)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(7);
    expect(cards.length).toBeLessThanOrEqual(13);
  });

  it('(c) all cardIds are unique within the extractor', () => {
    const ids = cards.map(c => c.cardId);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('(d) prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe(card.kind);
    }
  });

  it('(e) all cards have kind "por-vs-para"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('por-vs-para');
    }
  });

  it('(f) answer is either "por" or "para" for every card', () => {
    const valid = new Set(['por', 'para']);
    for (const card of cards) {
      expect(valid.has(card.answer)).toBe(true);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 18 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(18);
    }
  });

  it('(h) has both "por" and "para" answers in the set', () => {
    const answers = new Set(cards.map(c => c.answer));
    expect(answers.has('por')).toBe(true);
    expect(answers.has('para')).toBe(true);
  });

  it('(i) spot-check: first card (estudio...aprender) → para (purpose)', () => {
    const card = cards[0];
    expect(card).toBeDefined();
    expect(card?.answer).toBe('para');
    expect(card?.cardId).toMatch(/^spanish-18-0-/);
  });

  it('(j) spot-check: reason field is populated from quiz why field', () => {
    const card = cards[0];
    expect(card).toBeDefined();
    const prompt = card!.prompt as { reason?: string };
    expect(prompt.reason).toBeTruthy();
  });
});
