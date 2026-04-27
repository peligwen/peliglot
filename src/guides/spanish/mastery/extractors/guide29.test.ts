import { describe, it, expect } from 'vitest';
import { extract } from './guide29';

describe('guide29 extractor (verb-conjugation-tensed: past subjunctive)', () => {
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

  it('(f) guideSlug is "spanish" and guideId is 29 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(29);
    }
  });

  it('total card count is 30 (5 verbs × 6 pronouns)', () => {
    expect(cards.length).toBe(30);
  });

  it('all cards have tense "past-subjunctive"', () => {
    for (const card of cards) {
      expect((card.prompt as { tense: string }).tense).toBe('past-subjunctive');
    }
  });

  it('all cards have an acceptableAnswers array with one -se alternate', () => {
    for (const card of cards) {
      expect(card.acceptableAnswers).toBeDefined();
      expect(card.acceptableAnswers!.length).toBe(1);
      expect(card.acceptableAnswers![0]!.length).toBeGreaterThan(0);
    }
  });

  it('spot-check: hablar yo = hablara (canonical -ra form)', () => {
    const card = cards.find(c => c.cardId === 'spanish-29-pastsubj-hablar-yo');
    expect(card?.answer).toBe('hablara');
  });

  it('spot-check: hablar yo acceptable = hablase (-se form)', () => {
    const card = cards.find(c => c.cardId === 'spanish-29-pastsubj-hablar-yo');
    expect(card?.acceptableAnswers?.[0]).toBe('hablase');
  });

  it('spot-check: ir/ser yo = fuera', () => {
    const card = cards.find(c => c.cardId === 'spanish-29-pastsubj-ir-ser-yo');
    expect(card?.answer).toBe('fuera');
  });

  it('spot-check: tener nosotros = tuviéramos', () => {
    const card = cards.find(c => c.cardId === 'spanish-29-pastsubj-tener-nosotros');
    expect(card?.answer).toBe('tuviéramos');
  });
});
