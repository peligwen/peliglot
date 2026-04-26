import { describe, it, expect } from 'vitest';
import { extract } from './guide1';

describe('guide1 extractor (letter-sound)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) all cardIds are unique within the extractor', () => {
    const ids = cards.map(c => c.cardId);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('(c) prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe(card.kind);
    }
  });

  it('(d) answer is a non-empty string for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(e) cardId follows naming convention spanish-1-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-1-/);
    }
  });

  it('covers all 27 alphabet letters', () => {
    const letterCards = cards.filter(c => c.cardId.startsWith('spanish-1-letter-'));
    expect(letterCards.length).toBe(27);
  });

  it('covers the 3 digraphs', () => {
    const digraphCards = cards.filter(c => c.cardId.startsWith('spanish-1-digraph-'));
    expect(digraphCards.length).toBe(3);
  });

  it('guideSlug is "spanish" and guideId is 1 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(1);
    }
  });

  it('all cards have kind "letter-sound"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('letter-sound');
    }
  });
});
