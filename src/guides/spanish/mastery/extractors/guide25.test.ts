import { describe, it, expect } from 'vitest';
import { extract } from './guide25';

describe('guide25 extractor (false-cognate)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 15', () => {
    expect(cards.length).toBe(15);
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

  it('(e) all cards have kind "false-cognate"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('false-cognate');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 25 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(25);
    }
  });

  it('(h) spot-check: "embarazada" → "pregnant"', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-embarazada');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('pregnant');
    expect((card?.prompt as { falseFriend: string }).falseFriend).toBe('embarrassed');
  });

  it('(i) spot-check: "molestar" → "to bother/annoy" with alternates', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-molestar');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('to bother/annoy');
    expect(card?.acceptableAnswers).toContain('to bother');
    expect(card?.acceptableAnswers).toContain('to annoy');
  });

  it('(j) spot-check: "realizar" → has alternates for slash-separated meaning', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-realizar');
    expect(card).toBeDefined();
    expect(card?.acceptableAnswers).toBeDefined();
    expect(card?.acceptableAnswers!.length).toBeGreaterThan(0);
  });

  it('(k) spot-check: "éxito" → "success"', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-exito');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('success');
  });

  it('(l) every prompt has non-empty spanish and falseFriend fields', () => {
    for (const card of cards) {
      const prompt = card.prompt as { spanish: string; falseFriend: string };
      expect(prompt.spanish.length).toBeGreaterThan(0);
      expect(prompt.falseFriend.length).toBeGreaterThan(0);
    }
  });
});
