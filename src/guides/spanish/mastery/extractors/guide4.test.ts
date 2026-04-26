import { describe, it, expect } from 'vitest';
import { extract } from './guide4';

describe('guide4 extractor (verb-conjugation)', () => {
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

  it('(e) cardId follows naming convention spanish-4-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-4-/);
    }
  });

  it('produces 18 regular verb cards (3 verbs × 6 pronouns)', () => {
    const regCards = cards.filter(c => c.cardId.startsWith('spanish-4-reg-'));
    expect(regCards.length).toBe(18);
  });

  it('produces 48 irregular verb cards (8 verbs × 6 pronouns)', () => {
    const irrCards = cards.filter(c => c.cardId.startsWith('spanish-4-irr-'));
    expect(irrCards.length).toBe(48);
  });

  it('total card count is 66', () => {
    expect(cards.length).toBe(66);
  });

  it('guideSlug is "spanish" and guideId is 4 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(4);
    }
  });

  it('all cards have kind "verb-conjugation"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('verb-conjugation');
    }
  });

  it('hablar yo = hablo', () => {
    const card = cards.find(c => c.cardId === 'spanish-4-reg-hablar-yo');
    expect(card?.answer).toBe('hablo');
  });

  it('ser yo = soy', () => {
    const card = cards.find(c => c.cardId === 'spanish-4-irr-ser-yo');
    expect(card?.answer).toBe('soy');
  });
});
