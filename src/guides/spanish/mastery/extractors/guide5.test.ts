import { describe, it, expect } from 'vitest';
import { extract } from './guide5';

describe('guide5 extractor (verb-conjugation-tensed: preterite + imperfect)', () => {
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

  it('(f) guideSlug is "spanish" and guideId is 5 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(5);
    }
  });

  it('produces 18 preterite cards (3 verbs × 6 pronouns)', () => {
    const pretCards = cards.filter(c => c.cardId.includes('-pret-'));
    expect(pretCards.length).toBe(18);
  });

  it('produces 18 imperfect cards (3 verbs × 6 pronouns)', () => {
    const impCards = cards.filter(c => c.cardId.includes('-imp-'));
    expect(impCards.length).toBe(18);
  });

  it('total card count is 36 (2 tenses × 3 verbs × 6 pronouns)', () => {
    expect(cards.length).toBe(36);
  });

  it('spot-check: hablar preterite yo = hablé', () => {
    const card = cards.find(c => c.cardId === 'spanish-5-pret-hablar-yo');
    expect(card?.answer).toBe('hablé');
  });

  it('spot-check: comer imperfect él/ella/Ud. = comía', () => {
    const card = cards.find(c => c.cardId === 'spanish-5-imp-comer-el-ella-ud');
    expect(card?.answer).toBe('comía');
  });

  it('tenses include "preterite" and "imperfect"', () => {
    const tenses = new Set(
      cards.map(c => (c.prompt as { tense: string }).tense)
    );
    expect(tenses.has('preterite')).toBe(true);
    expect(tenses.has('imperfect')).toBe(true);
  });
});
