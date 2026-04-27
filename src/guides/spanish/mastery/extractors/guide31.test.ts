import { describe, it, expect } from 'vitest';
import { extract } from './guide31';

describe('guide31 extractor (reflexive-meaning-change)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 5', () => {
    expect(cards.length).toBe(5);
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

  it('(e) all cards have kind "reflexive-meaning-change"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('reflexive-meaning-change');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 31 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(31);
    }
  });

  it('(h) spot-check: "irse" → "to leave/go away" with alternates', () => {
    const card = cards.find(c => c.cardId === 'spanish-31-irse');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('to leave/go away');
    expect(card?.acceptableAnswers).toContain('to leave');
    expect(card?.acceptableAnswers).toContain('to go away');
  });

  it('(i) spot-check: "dormirse" → "to fall asleep" (no alternates)', () => {
    const card = cards.find(c => c.cardId === 'spanish-31-dormirse');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('to fall asleep');
    expect(card?.acceptableAnswers).toBeUndefined();
  });

  it('(j) spot-check: "ponerse" → "to put on / become" with alternates', () => {
    const card = cards.find(c => c.cardId === 'spanish-31-ponerse');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('to put on / become');
    expect(card?.acceptableAnswers).toContain('to put on');
    expect(card?.acceptableAnswers).toContain('to become');
  });

  it('(k) every prompt has reflexive, baseVerb, and baseMeaning fields', () => {
    for (const card of cards) {
      const prompt = card.prompt as { reflexive: string; baseVerb: string; baseMeaning: string };
      expect(prompt.reflexive.length).toBeGreaterThan(0);
      expect(prompt.baseVerb.length).toBeGreaterThan(0);
      expect(prompt.baseMeaning.length).toBeGreaterThan(0);
    }
  });
});
