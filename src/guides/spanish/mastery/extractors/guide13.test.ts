import { describe, it, expect } from 'vitest';
import { extract } from './guide13';

describe('guide13 extractor (noun-adj-agreement)', () => {
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

  it('(e) cardId follows naming convention spanish-13-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-13-/);
    }
  });

  it('produces 20 cards (5 adjectives × 4 form keys)', () => {
    expect(cards.length).toBe(20);
  });

  it('guideSlug is "spanish" and guideId is 13 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(13);
    }
  });

  it('all cards have kind "noun-adj-agreement"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('noun-adj-agreement');
    }
  });

  it('alto masculine singular = alto', () => {
    const card = cards.find(c => c.cardId === 'spanish-13-alto-ms');
    expect(card?.answer).toBe('alto');
  });

  it('alto feminine plural = altas', () => {
    const card = cards.find(c => c.cardId === 'spanish-13-alto-fp');
    expect(card?.answer).toBe('altas');
  });

  it('grande is the same in masculine and feminine singular', () => {
    const ms = cards.find(c => c.cardId === 'spanish-13-grande-ms');
    const fs = cards.find(c => c.cardId === 'spanish-13-grande-fs');
    expect(ms?.answer).toBe('grande');
    expect(fs?.answer).toBe('grande');
  });
});
