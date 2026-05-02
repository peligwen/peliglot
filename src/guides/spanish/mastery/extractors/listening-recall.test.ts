import { describe, it, expect } from 'vitest';
import { extract } from './listening-recall';

describe('listening-recall extractor', () => {
  const cards = extract();

  it('returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('all cardIds are unique', () => {
    const ids = cards.map(c => c.cardId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe('listening-recall');
      expect(card.kind).toBe('listening-recall');
    }
  });

  it('answer is a non-empty string for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('speakText is set for every card', () => {
    for (const card of cards) {
      expect(card.speakText).toBeTruthy();
    }
  });

  it('produces exactly 64 cards (28 cardinals + 10 ordinals + 14 weather + 12 nouns)', () => {
    expect(cards.length).toBe(64);
  });

  it('cardinal number 0 → "cero"', () => {
    const card = cards.find(c => c.cardId === 'spanish-lr-numbers-0');
    expect(card?.answer).toBe('cero');
  });

  it('cardinal number 1000000 → "un millón"', () => {
    const card = cards.find(c => c.cardId === 'spanish-lr-numbers-1000000');
    expect(card?.answer).toBe('un millón');
  });

  it('weather "Hace calor" card has speakText = "Hace calor"', () => {
    const card = cards.find(c => c.cardId === 'spanish-lr-weather-hace-calor');
    expect(card?.speakText).toBe('Hace calor');
    expect(card?.answer).toBe('Hace calor');
  });

  it('noun "libro" recall card exists', () => {
    const card = cards.find(c => c.cardId === 'spanish-lr-noun-libro');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('libro');
  });

  it('guideSlug is "spanish" for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
    }
  });

  it('prompt includes a hint for all cards', () => {
    for (const card of cards) {
      if (card.prompt.kind === 'listening-recall') {
        expect(card.prompt.hint).toBeTruthy();
      }
    }
  });
});
