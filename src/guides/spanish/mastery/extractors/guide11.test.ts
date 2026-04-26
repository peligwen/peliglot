import { describe, it, expect } from 'vitest';
import { extract } from './guide11';

describe('guide11 extractor (noun-gender)', () => {
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

  it('(e) cardId follows naming convention spanish-11-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-11-/);
    }
  });

  it('covers at least 12 cards (quiz items baseline)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(12);
  });

  it('guideSlug is "spanish" and guideId is 11 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(11);
    }
  });

  it('all cards have kind "noun-gender"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('noun-gender');
    }
  });

  it('answer is either "el (masculine)" or "la (feminine)"', () => {
    for (const card of cards) {
      expect(['el (masculine)', 'la (feminine)']).toContain(card.answer);
    }
  });

  it('mano is feminine', () => {
    const card = cards.find(c =>
      c.prompt.kind === 'noun-gender' && 'noun' in c.prompt && c.prompt.noun === 'mano'
    );
    expect(card?.answer).toBe('la (feminine)');
  });
});
