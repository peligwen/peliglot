import { describe, it, expect } from 'vitest';
import { extract } from './guide17';

describe('guide17 extractor (ser-vs-estar)', () => {
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

  it('(e) cardId follows naming convention spanish-17-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-17-/);
    }
  });

  it('produces 28 cards (8 ser + 8 estar + 12 shift)', () => {
    expect(cards.length).toBe(28);
  });

  it('guideSlug is "spanish" and guideId is 17 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(17);
    }
  });

  it('all cards have kind "ser-vs-estar"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('ser-vs-estar');
    }
  });

  it('answer is either "ser" or "estar" for every card', () => {
    for (const card of cards) {
      expect(['ser', 'estar']).toContain(card.answer);
    }
  });

  it('produces 8 ser-use cards and 8 estar-use cards', () => {
    const serUseCards = cards.filter(c => c.cardId.startsWith('spanish-17-ser-use-'));
    const estarUseCards = cards.filter(c => c.cardId.startsWith('spanish-17-estar-use-'));
    expect(serUseCards.length).toBe(8);
    expect(estarUseCards.length).toBe(8);
  });

  it('produces 12 shift cards (6 adjectives × 2)', () => {
    const shiftCards = cards.filter(c => c.cardId.startsWith('spanish-17-shift-'));
    expect(shiftCards.length).toBe(12);
  });
});
