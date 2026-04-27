import { describe, it, expect } from 'vitest';
import { extract } from './guide21';

describe('guide21 extractor (negation-translate)', () => {
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

  it('(e) all cards have kind "negation-translate"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('negation-translate');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 21 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(21);
    }
  });

  it('(h) spot-check: "I don\'t want anything." → "No quiero nada."', () => {
    const card = cards[0];
    expect(card?.answer).toBe('No quiero nada.');
    const prompt = card?.prompt as { english: string };
    expect(prompt.english).toBe("I don't want anything.");
  });

  it('(i) spot-check: "I never eat meat." → "Nunca como carne." with alternate', () => {
    const card = cards[2];
    expect(card?.answer).toBe('Nunca como carne.');
    expect(card?.acceptableAnswers).toContain('No como carne nunca.');
  });

  it('(j) spot-check: "She hasn\'t arrived yet." → "Todavía no llega." with alternate', () => {
    const card = cards[5];
    expect(card?.answer).toBe('Todavía no llega.');
    expect(card?.acceptableAnswers).toContain('No ha llegado todavía.');
  });

  it('(k) "I don\'t speak French." → "No hablo francés."', () => {
    const card = cards[7];
    expect(card?.answer).toBe('No hablo francés.');
  });

  it('(l) spot-check: "Nobody called." → "Nadie llamó." with alternate "No llamó nadie."', () => {
    const card = cards[1];
    expect(card?.answer).toBe('Nadie llamó.');
    expect(card?.acceptableAnswers).toContain('No llamó nadie.');
  });
});
