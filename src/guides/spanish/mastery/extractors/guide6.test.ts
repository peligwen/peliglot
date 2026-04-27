import { describe, it, expect } from 'vitest';
import { extract } from './guide6';

describe('guide6 extractor (verb-conjugation-tensed: future + conditional)', () => {
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

  it('(e) all cards have kind "verb-conjugation-tensed"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('verb-conjugation-tensed');
    }
  });

  it('(f) guideSlug is "spanish" and guideId is 6 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(6);
    }
  });

  it('produces 6 future cards (1 verb × 6 pronouns)', () => {
    const futCards = cards.filter(c => c.cardId.includes('-fut-'));
    expect(futCards.length).toBe(6);
  });

  it('produces 6 conditional cards (1 verb × 6 pronouns)', () => {
    const condCards = cards.filter(c => c.cardId.includes('-cond-'));
    expect(condCards.length).toBe(6);
  });

  it('total card count is 12 (2 tenses × 1 verb × 6 pronouns)', () => {
    expect(cards.length).toBe(12);
  });

  it('spot-check: hablar future yo = hablaré', () => {
    const card = cards.find(c => c.cardId === 'spanish-6-fut-hablar-yo');
    expect(card?.answer).toBe('hablaré');
  });

  it('spot-check: hablar conditional nosotros = hablaríamos', () => {
    const card = cards.find(c => c.cardId === 'spanish-6-cond-hablar-nosotros');
    expect(card?.answer).toBe('hablaríamos');
  });

  it('tenses include "future" and "conditional"', () => {
    const tenses = new Set(
      cards.map(c => (c.prompt as { tense: string }).tense)
    );
    expect(tenses.has('future')).toBe(true);
    expect(tenses.has('conditional')).toBe(true);
  });
});
