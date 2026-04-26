import { describe, it, expect } from 'vitest';
import { extract } from './guide12';

describe('guide12 extractor (noun-plural)', () => {
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

  it('(e) cardId follows naming convention spanish-12-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-12-/);
    }
  });

  it('covers at least 19 unique singular forms (12 quiz + 7 rule-only)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(19);
  });

  it('guideSlug is "spanish" and guideId is 12 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(12);
    }
  });

  it('all cards have kind "noun-plural"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('noun-plural');
    }
  });

  it('lápiz → lápices', () => {
    const card = cards.find(c =>
      c.prompt.kind === 'noun-plural' && 'singular' in c.prompt && c.prompt.singular === 'lápiz'
    );
    expect(card?.answer).toBe('lápices');
  });

  it('canción → canciones', () => {
    const card = cards.find(c =>
      c.prompt.kind === 'noun-plural' && 'singular' in c.prompt && c.prompt.singular === 'canción'
    );
    expect(card?.answer).toBe('canciones');
  });
});
