import { describe, it, expect } from 'vitest';
import { extract } from './guide31';

describe('guide31 extractor (reflexive-meaning-change + reflexive-daily-routine + reciprocal-translate)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 14 (5 meaning-change + 6 daily-routine + 3 reciprocal)', () => {
    expect(cards.length).toBe(14);
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

  it('(e) cards have expected kinds', () => {
    const meaningChangeCards = cards.filter(c => c.kind === 'reflexive-meaning-change');
    const dailyCards = cards.filter(c => c.kind === 'reflexive-daily-routine');
    const reciprocalCards = cards.filter(c => c.kind === 'reciprocal-translate');
    expect(meaningChangeCards.length).toBe(5);
    expect(dailyCards.length).toBe(6);
    expect(reciprocalCards.length).toBe(3);
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

  it('(k) every reflexive-meaning-change prompt has reflexive, baseVerb, and baseMeaning fields', () => {
    const mcCards = cards.filter(c => c.kind === 'reflexive-meaning-change');
    for (const card of mcCards) {
      const prompt = card.prompt as { reflexive: string; baseVerb: string; baseMeaning: string };
      expect(prompt.reflexive.length).toBeGreaterThan(0);
      expect(prompt.baseVerb.length).toBeGreaterThan(0);
      expect(prompt.baseMeaning.length).toBeGreaterThan(0);
    }
  });

  it('(l) spot-check: daily "to wake up" → "despertarse"', () => {
    const card = cards.find(c => c.kind === 'reflexive-daily-routine' && c.cardId === 'spanish-31-daily-despertarse');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('despertarse');
    const prompt = card?.prompt as { english: string };
    expect(prompt.english).toBe('to wake up');
  });

  it('(m) daily cardIds use "daily-" prefix', () => {
    const dailyCards = cards.filter(c => c.kind === 'reflexive-daily-routine');
    for (const card of dailyCards) {
      expect(card.cardId).toMatch(/^spanish-31-daily-/);
    }
  });

  it('(n) spot-check: reciprocal "They talk to each other every day." → "Se hablan todos los días."', () => {
    const card = cards.find(c => c.kind === 'reciprocal-translate' && c.cardId === 'spanish-31-recip-0');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('Se hablan todos los días.');
  });

  it('(o) reciprocal cardIds use "recip-" prefix', () => {
    const recipCards = cards.filter(c => c.kind === 'reciprocal-translate');
    for (const card of recipCards) {
      expect(card.cardId).toMatch(/^spanish-31-recip-/);
    }
  });
});
