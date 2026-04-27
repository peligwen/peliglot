import { describe, it, expect } from 'vitest';
import { extract } from './guide32';

describe('guide32 extractor (idiom-meaning)', () => {
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

  it('(e) cardId follows naming convention spanish-32-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-32-/);
    }
  });

  it('produces exactly 22 cards (tener=10 + dar=6 + hacer=6)', () => {
    expect(cards.length).toBe(22);
  });

  it('all cards have kind "idiom-meaning"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('idiom-meaning');
    }
  });

  it('guideSlug is "spanish" and guideId is 32 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(32);
    }
  });

  it('all prompts include both idiom and literal fields', () => {
    for (const card of cards) {
      if (card.prompt.kind === 'idiom-meaning') {
        expect(card.prompt.idiom.length).toBeGreaterThan(0);
        expect(card.prompt.literal.length).toBeGreaterThan(0);
      }
    }
  });

  it('"tener hambre" → "to be hungry"', () => {
    const card = cards.find(c => c.cardId === 'spanish-32-tener-hambre');
    expect(card?.answer).toBe('to be hungry');
    if (card?.prompt.kind === 'idiom-meaning') {
      expect(card.prompt.literal).toBe('to have hunger');
    }
  });

  it('"dar un paseo" → "to take a walk"', () => {
    const card = cards.find(c => c.cardId === 'spanish-32-dar-un-paseo');
    expect(card?.answer).toBe('to take a walk');
  });

  it('"hacer falta" → "to be needed"', () => {
    const card = cards.find(c => c.cardId === 'spanish-32-hacer-falta');
    expect(card?.answer).toBe('to be needed');
  });
});
