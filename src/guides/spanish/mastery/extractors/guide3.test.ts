import { describe, it, expect } from 'vitest';
import { extract } from './guide3';

describe('guide3 extractor (verb-spelling-change)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is approximately 17 (within ±3)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(14);
    expect(cards.length).toBeLessThanOrEqual(20);
  });

  it('(c) all cardIds are unique within the extractor', () => {
    const ids = cards.map(c => c.cardId);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('(d) prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe(card.kind);
    }
  });

  it('(e) all cards have kind "verb-spelling-change"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('verb-spelling-change');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 3 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(3);
    }
  });

  it('(h) spot-check: buscar c-qu → busqué', () => {
    const card = cards.find(c => c.cardId === 'spanish-3-c-qu-buscar');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('busqué');
  });

  it('(i) spot-check: leer i-y → leyó', () => {
    const card = cards.find(c => c.cardId === 'spanish-3-i-y-leer');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('leyó');
  });

  it('(j) spot-check: seguir gu-g → sigo', () => {
    const card = cards.find(c => c.cardId === 'spanish-3-gu-g-seguir');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('sigo');
  });
});
