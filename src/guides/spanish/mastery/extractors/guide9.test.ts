import { describe, it, expect } from 'vitest';
import { extract } from './guide9';

describe('guide9 extractor (verb-conjugation-stem-change)', () => {
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

  it('(e) cardId follows naming convention spanish-9-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-9-/);
    }
  });

  it('produces 24 cards (4 model verbs × 6 pronouns)', () => {
    expect(cards.length).toBe(24);
  });

  it('guideSlug is "spanish" and guideId is 9 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(9);
    }
  });

  it('all cards have kind "verb-conjugation-stem-change"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('verb-conjugation-stem-change');
    }
  });

  it('pensar yo = pienso', () => {
    const card = cards.find(c => c.cardId === 'spanish-9-pensar-yo');
    expect(card?.answer).toBe('pienso');
  });

  it('jugar yo = juego', () => {
    const card = cards.find(c => c.cardId === 'spanish-9-jugar-yo');
    expect(card?.answer).toBe('juego');
  });

  it('poder nosotros = podemos (no stem change)', () => {
    const card = cards.find(c => c.cardId === 'spanish-9-poder-nosotros');
    expect(card?.answer).toBe('podemos');
  });
});
