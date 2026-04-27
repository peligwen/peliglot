import { describe, it, expect } from 'vitest';
import { extract } from './guide24';

describe('guide24 extractor (tu-vs-usted)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 8', () => {
    expect(cards.length).toBe(8);
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

  it('(e) all cards have kind "tu-vs-usted"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('tu-vs-usted');
    }
  });

  it('(f) answer is either "tú" or "usted" for every card', () => {
    const valid = new Set(['tú', 'usted']);
    for (const card of cards) {
      expect(valid.has(card.answer)).toBe(true);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 24 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(24);
    }
  });

  it('(h) tú answers include "tu" (no accent) as acceptableAnswer', () => {
    const tuCards = cards.filter(c => c.answer === 'tú');
    for (const card of tuCards) {
      expect(card.acceptableAnswers).toContain('tu');
    }
  });

  it('(i) spot-check: "Your best friend" → tú', () => {
    const card = cards.find(c => c.cardId === 'spanish-24-0-your-best-friend');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('tú');
  });

  it('(j) spot-check: "A police officer" → usted', () => {
    const card = cards.find(c => c.cardId === 'spanish-24-1-a-police-officer');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('usted');
  });

  it('(k) all prompts have a non-empty situation field', () => {
    for (const card of cards) {
      const prompt = card.prompt as { situation: string };
      expect(prompt.situation.length).toBeGreaterThan(0);
    }
  });
});
