import { describe, it, expect } from 'vitest';
import { extract } from './guide16';

describe('guide16 extractor (gustar-pattern)', () => {
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

  it('(e) cardId follows naming convention spanish-16-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-16-/);
    }
  });

  it('produces exactly 10 cards (one per quiz item)', () => {
    expect(cards.length).toBe(10);
  });

  it('all cards have kind "gustar-pattern"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('gustar-pattern');
    }
  });

  it('guideSlug is "spanish" and guideId is 16 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(16);
    }
  });

  it('parses english and verb correctly from question format', () => {
    const firstCard = cards[0]!;
    expect(firstCard.prompt.kind).toBe('gustar-pattern');
    if (firstCard.prompt.kind === 'gustar-pattern') {
      expect(firstCard.prompt.english).toBe('I like tacos.');
      expect(firstCard.prompt.verb).toBe('gustar');
    }
  });

  it('first card answer is the Spanish gustar sentence', () => {
    expect(cards[0]!.answer).toBe('Me gustan los tacos.');
  });

  it('doler card has correct english and answer', () => {
    const dolerCard = cards[1]!;
    if (dolerCard.prompt.kind === 'gustar-pattern') {
      expect(dolerCard.prompt.verb).toBe('doler');
      expect(dolerCard.prompt.english).toBe('My head hurts.');
    }
    expect(dolerCard.answer).toBe('Me duele la cabeza.');
  });
});
