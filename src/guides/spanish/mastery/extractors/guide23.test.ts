import { describe, it, expect } from 'vitest';
import { extract } from './guide23';

describe('guide23 extractor (number-spell)', () => {
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

  it('(e) cardId follows naming convention spanish-23-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-23-/);
    }
  });

  it('produces exactly 38 cards (28 cardinals + 10 ordinals)', () => {
    expect(cards.length).toBe(38);
  });

  it('produces 28 cardinal cards', () => {
    const cardinals = cards.filter(c => c.cardId.startsWith('spanish-23-num-'));
    expect(cardinals.length).toBe(28);
  });

  it('produces 10 ordinal cards', () => {
    const ordinals = cards.filter(c => c.cardId.startsWith('spanish-23-ord-'));
    expect(ordinals.length).toBe(10);
  });

  it('all cards have kind "number-spell"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('number-spell');
    }
  });

  it('guideSlug is "spanish" and guideId is 23 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(23);
    }
  });

  it('cero = "cero"', () => {
    const card = cards.find(c => c.cardId === 'spanish-23-num-0');
    expect(card?.answer).toBe('cero');
  });

  it('un millón card answer is "un millón"', () => {
    const card = cards.find(c => c.cardId === 'spanish-23-num-1000000');
    expect(card?.answer).toBe('un millón');
  });

  it('first ordinal (1º) = "primero/a"', () => {
    const card = cards.find(c => c.cardId === 'spanish-23-ord-0');
    expect(card?.answer).toBe('primero/a');
    if (card?.prompt.kind === 'number-spell') {
      expect(card.prompt.numeric).toBe('1º');
    }
  });

  it('seventh ordinal (7º) = "séptimo/a"', () => {
    const card = cards.find(c => c.cardId === 'spanish-23-ord-6');
    expect(card?.answer).toBe('séptimo/a');
  });
});
