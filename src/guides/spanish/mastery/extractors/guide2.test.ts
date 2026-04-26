import { describe, it, expect } from 'vitest';
import { extract } from './guide2';

describe('guide2 extractor (word-stress)', () => {
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

  it('(e) cardId follows naming convention spanish-2-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-2-/);
    }
  });

  it('produces stress-rule example cards (3 rules × 4 examples = 12)', () => {
    const stressCards = cards.filter(c => c.cardId.startsWith('spanish-2-stress-'));
    expect(stressCards.length).toBe(12);
  });

  it('produces minimal pair cards (6 pairs)', () => {
    const minPairCards = cards.filter(c => c.cardId.startsWith('spanish-2-minpair-'));
    expect(minPairCards.length).toBe(6);
  });

  it('guideSlug is "spanish" and guideId is 2 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(2);
    }
  });

  it('all cards have kind "word-stress"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('word-stress');
    }
  });
});
