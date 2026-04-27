import { describe, it, expect } from 'vitest';
import { extract } from './guide20';

describe('guide20 extractor (question-word)', () => {
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

  it('(e) all cards have kind "question-word"', () => {
    for (const card of cards) {
      expect(card.kind).toBe('question-word');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 20 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(20);
    }
  });

  it('(h) every prompt has a non-empty sentence and englishMeaning', () => {
    for (const card of cards) {
      const prompt = card.prompt as { sentence: string; englishMeaning: string };
      expect(prompt.sentence.length).toBeGreaterThan(0);
      expect(prompt.englishMeaning.length).toBeGreaterThan(0);
    }
  });

  it('(i) spot-check: first card → Qué (what do you want to eat)', () => {
    const card = cards[0];
    expect(card?.answer).toBe('Qué');
    const prompt = card?.prompt as { sentence: string };
    expect(prompt.sentence).toContain('___');
  });

  it('(j) spot-check: "Por qué" card has acceptableAnswers with "porque"', () => {
    const card = cards.find(c => c.answer === 'Por qué');
    expect(card).toBeDefined();
    expect(card?.acceptableAnswers).toContain('porque');
    expect(card?.acceptableAnswers).toContain('porqué');
  });

  it('(k) sentence fields do NOT contain parenthetical English text', () => {
    for (const card of cards) {
      const prompt = card.prompt as { sentence: string };
      expect(prompt.sentence).not.toContain('(');
    }
  });
});
