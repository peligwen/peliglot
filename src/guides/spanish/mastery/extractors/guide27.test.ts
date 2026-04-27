import { describe, it, expect } from 'vitest';
import { extract } from './guide27';

describe('guide27 extractor (weather-expression)', () => {
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

  it('(e) cardId follows naming convention spanish-27-...', () => {
    for (const card of cards) {
      expect(card.cardId).toMatch(/^spanish-27-/);
    }
  });

  it('produces exactly 14 cards (one per weather expression)', () => {
    expect(cards.length).toBe(14);
  });

  it('all cards have kind "weather-expression"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('weather-expression');
    }
  });

  it('guideSlug is "spanish" and guideId is 27 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(27);
    }
  });

  it('all prompts include an icon field', () => {
    for (const card of cards) {
      if (card.prompt.kind === 'weather-expression') {
        expect(card.prompt.icon.length).toBeGreaterThan(0);
      }
    }
  });

  it('"It\'s hot" → "Hace calor"', () => {
    const card = cards.find(c => c.answer === 'Hace calor');
    expect(card).toBeDefined();
    if (card?.prompt.kind === 'weather-expression') {
      expect(card.prompt.english).toBe("It's hot");
    }
  });

  it('"It\'s raining" → "Está lloviendo"', () => {
    const card = cards.find(c => c.answer === 'Está lloviendo');
    expect(card).toBeDefined();
    if (card?.prompt.kind === 'weather-expression') {
      expect(card.prompt.english).toBe("It's raining");
    }
  });

  it('"There\'s fog" → "Hay niebla"', () => {
    const card = cards.find(c => c.answer === 'Hay niebla');
    expect(card).toBeDefined();
    if (card?.prompt.kind === 'weather-expression') {
      expect(card.prompt.english).toBe("There's fog");
    }
  });
});
