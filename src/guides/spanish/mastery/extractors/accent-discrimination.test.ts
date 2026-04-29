import { describe, it, expect } from 'vitest';
import { extract } from './accent-discrimination';

describe('accent-discrimination extractor', () => {
  const cards = extract();

  it('returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('all cardIds are unique', () => {
    const ids = cards.map(c => c.cardId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe('accent-discrimination');
      expect(card.kind).toBe('accent-discrimination');
    }
  });

  it('answer is a non-empty string for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('speakText equals the Spanish word being tested', () => {
    for (const card of cards) {
      if (card.prompt.kind === 'accent-discrimination') {
        expect(card.speakText).toBe(card.prompt.word);
      }
    }
  });

  it('produces exactly 12 cards (6 pairs × 2 directions)', () => {
    expect(cards.length).toBe(12);
  });

  it('all cardIds follow naming convention spanish-ad-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-ad-/);
    }
  });

  it('guideSlug is "spanish" and guideId is 2 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(2);
    }
  });

  it('"papa" card → answer "potato", pairWord "papá", pairMeaning "dad"', () => {
    const card = cards.find(c => c.cardId === 'spanish-ad-papa');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('potato');
    if (card?.prompt.kind === 'accent-discrimination') {
      expect(card.prompt.pairWord).toBe('papá');
      expect(card.prompt.pairMeaning).toBe('dad');
    }
  });

  it('"papá" card → answer "dad", pairWord "papa", pairMeaning "potato"', () => {
    const card = cards.find(c => c.cardId === 'spanish-ad-pap');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('dad');
    if (card?.prompt.kind === 'accent-discrimination') {
      expect(card.prompt.pairWord).toBe('papa');
      expect(card.prompt.pairMeaning).toBe('potato');
    }
  });

  it('each card has a pairMeaning that differs from its answer (minimal pair contrast)', () => {
    for (const card of cards) {
      if (card.prompt.kind === 'accent-discrimination') {
        expect(card.prompt.pairMeaning).not.toBe(card.answer);
      }
    }
  });
});
