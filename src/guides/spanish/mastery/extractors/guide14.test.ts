import { describe, it, expect } from 'vitest';
import { extract } from './guide14';

describe('guide14 extractor (english-to-pronoun)', () => {
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

  it('(e) cardId follows naming convention spanish-14-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-14-/);
    }
  });

  it('produces 30 cards (5 types × 6 entries)', () => {
    expect(cards.length).toBe(30);
  });

  it('guideSlug is "spanish" and guideId is 14 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(14);
    }
  });

  it('all cards have kind "english-to-pronoun"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('english-to-pronoun');
    }
  });

  it('produces cards for all 5 pronoun types', () => {
    const types = ['sub', 'do', 'io', 'ref', 'prep'];
    for (const t of types) {
      const typeCards = cards.filter(c => c.cardId.startsWith(`spanish-14-${t}-`));
      expect(typeCards.length).toBeGreaterThan(0);
    }
  });

  it('same surface pronoun (me) has unique cardIds across types', () => {
    const meCards = cards.filter(c => c.answer === 'me');
    const meIds = meCards.map(c => c.cardId);
    const unique = new Set(meIds);
    expect(unique.size).toBe(meIds.length);
  });
});
