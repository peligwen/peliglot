import { describe, it, expect } from 'vitest';
import { extract } from './guide28';

describe('guide28 extractor (verb-conjugation-tensed: present subjunctive)', () => {
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

  it('(f) guideSlug is "spanish" and guideId is 28 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(28);
    }
  });

  it('total card count is 18 (3 verbs × 6 pronouns)', () => {
    expect(cards.length).toBe(18);
  });

  it('all cards have tense "present-subjunctive"', () => {
    for (const card of cards) {
      expect((card.prompt as { tense: string }).tense).toBe('present-subjunctive');
    }
  });

  it('spot-check: hablar present-subjunctive yo = hable', () => {
    const card = cards.find(c => c.cardId === 'spanish-28-ps-hablar-yo');
    expect(card?.answer).toBe('hable');
  });

  it('spot-check: comer present-subjunctive yo = coma (opposite vowel)', () => {
    const card = cards.find(c => c.cardId === 'spanish-28-ps-comer-yo');
    expect(card?.answer).toBe('coma');
  });

  it('covers hablar, comer, vivir', () => {
    const verbs = new Set(cards.map(c => (c.prompt as { verb: string }).verb));
    expect(verbs.has('hablar')).toBe(true);
    expect(verbs.has('comer')).toBe(true);
    expect(verbs.has('vivir')).toBe(true);
  });
});
