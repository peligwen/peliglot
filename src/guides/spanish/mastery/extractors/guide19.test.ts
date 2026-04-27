import { describe, it, expect } from 'vitest';
import { extract } from './guide19';

describe('guide19 extractor (verb-prep-pair)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is approximately 23 (within ±3)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(20);
    expect(cards.length).toBeLessThanOrEqual(26);
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

  it('(e) all cards have kind "verb-prep-pair"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('verb-prep-pair');
    }
  });

  it('(f) answer is non-empty for every card (∅ for none bucket)', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 19 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(19);
    }
  });

  it('(h) answers are one of: a, de, en, con, ∅', () => {
    const validAnswers = new Set(['a', 'de', 'en', 'con', '∅']);
    for (const card of cards) {
      expect(validAnswers.has(card.answer)).toBe(true);
    }
  });

  it('(i) spot-check: "empezar a" → answer "a"', () => {
    const card = cards.find(c => c.cardId === 'spanish-19-empezar-a');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('a');
  });

  it('(j) spot-check: "soñar con" → answer "con"', () => {
    const card = cards.find(c => c.cardId === 'spanish-19-soñar-con');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('con');
  });

  it('(k) spot-check: "buscar" (none bucket) → answer "∅" with acceptableAnswers', () => {
    const card = cards.find(c => c.cardId === 'spanish-19-buscar');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('∅');
    expect(card?.acceptableAnswers).toContain('');
    expect(card?.acceptableAnswers).toContain('-');
    expect(card?.acceptableAnswers).toContain('ninguna');
  });

  it('(l) all none-bucket cards have acceptableAnswers', () => {
    const noneCards = cards.filter(c => c.answer === '∅');
    for (const card of noneCards) {
      expect(card.acceptableAnswers).toBeDefined();
      expect(card.acceptableAnswers!.length).toBeGreaterThan(0);
    }
  });
});
