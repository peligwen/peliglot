import { describe, it, expect } from 'vitest';
import { extract } from './guide22';

describe('guide22 extractor (comparative-irregular)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 4', () => {
    expect(cards.length).toBe(4);
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

  it('(e) all cards have kind "comparative-irregular"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('comparative-irregular');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 22 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(22);
    }
  });

  it('(h) spot-check: bueno → mejor (no alternates)', () => {
    const card = cards.find(c => c.cardId === 'spanish-22-bueno');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('mejor');
    expect(card?.acceptableAnswers).toBeUndefined();
  });

  it('(i) spot-check: malo → peor (no alternates)', () => {
    const card = cards.find(c => c.cardId === 'spanish-22-malo');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('peor');
    expect(card?.acceptableAnswers).toBeUndefined();
  });

  it('(j) spot-check: grande → mayor with "más grande" as alternate', () => {
    const card = cards.find(c => c.cardId === 'spanish-22-grande');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('mayor');
    expect(card?.acceptableAnswers).toContain('más grande');
  });

  it('(k) spot-check: pequeño → menor with "más pequeño" as alternate', () => {
    const card = cards.find(c => c.cardId === 'spanish-22-pequeño');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('menor');
    expect(card?.acceptableAnswers).toContain('más pequeño');
  });
});
