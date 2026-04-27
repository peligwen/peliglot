import { describe, it, expect } from 'vitest';
import { extract } from './guide30';

describe('guide30 extractor (imperative-tu: irregular tú commands)', () => {
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

  it('(e) all cards have kind "imperative-tu"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('imperative-tu');
    }
  });

  it('(f) guideSlug is "spanish" and guideId is 30 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(30);
    }
  });

  it('produces 8 affirmative cards', () => {
    const affCards = cards.filter(c => c.cardId.endsWith('-aff'));
    expect(affCards.length).toBe(8);
  });

  it('produces 8 negative cards', () => {
    const negCards = cards.filter(c => c.cardId.endsWith('-neg'));
    expect(negCards.length).toBe(8);
  });

  it('total card count is 16 (8 verbs × 2 polarities)', () => {
    expect(cards.length).toBe(16);
  });

  it('all negative cards have "no " prefix in answer', () => {
    const negCards = cards.filter(c => c.cardId.endsWith('-neg'));
    for (const card of negCards) {
      expect(card.answer.startsWith('no ')).toBe(true);
    }
  });

  it('no affirmative card answer contains "no "', () => {
    const affCards = cards.filter(c => c.cardId.endsWith('-aff'));
    for (const card of affCards) {
      expect(card.answer).not.toContain('no ');
    }
  });

  it('spot-check: decir affirmative = di', () => {
    const card = cards.find(c => c.cardId === 'spanish-30-decir-aff');
    expect(card?.answer).toBe('di');
  });

  it('spot-check: decir negative = no digas (includes "no " prefix)', () => {
    const card = cards.find(c => c.cardId === 'spanish-30-decir-neg');
    expect(card?.answer).toBe('no digas');
    expect(card?.answer.startsWith('no ')).toBe(true);
  });

  it('spot-check: ser affirmative = sé', () => {
    const card = cards.find(c => c.cardId === 'spanish-30-ser-aff');
    expect(card?.answer).toBe('sé');
  });

  it('covers all 8 irregular verbs', () => {
    const verbs = new Set(
      cards.map(c => (c.prompt as { verb: string }).verb)
    );
    for (const v of ['decir', 'hacer', 'ir', 'poner', 'salir', 'ser', 'tener', 'venir']) {
      expect(verbs.has(v)).toBe(true);
    }
  });
});
