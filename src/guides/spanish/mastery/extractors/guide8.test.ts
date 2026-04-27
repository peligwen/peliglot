import { describe, it, expect } from 'vitest';
import { extract } from './guide8';

describe('guide8 extractor (verb-conjugation-tensed: perfect tenses)', () => {
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

  it('(f) guideSlug is "spanish" and guideId is 8 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(8);
    }
  });

  it('produces 6 present-perfect cards (1 verb × 6 pronouns)', () => {
    const ppCards = cards.filter(c => c.cardId.includes('-pp-'));
    expect(ppCards.length).toBe(6);
  });

  it('produces 6 pluperfect cards (1 verb × 6 pronouns)', () => {
    const plupCards = cards.filter(c => c.cardId.includes('-plup-'));
    expect(plupCards.length).toBe(6);
  });

  it('produces 6 present-perfect-subjunctive cards (1 verb × 6 pronouns)', () => {
    const ppSCards = cards.filter(c => c.cardId.includes('-ppS-'));
    expect(ppSCards.length).toBe(6);
  });

  it('total card count is 18 (3 tenses × 1 verb × 6 pronouns)', () => {
    expect(cards.length).toBe(18);
  });

  it('spot-check: present-perfect yo answer starts with "he"', () => {
    const card = cards.find(c => c.cardId === 'spanish-8-pp-hablar-yo');
    expect(card?.answer).toBe('he hablado');
    expect(card?.answer.startsWith('he')).toBe(true);
  });

  it('spot-check: pluperfect yo answer starts with "había"', () => {
    const card = cards.find(c => c.cardId === 'spanish-8-plup-hablar-yo');
    expect(card?.answer).toBe('había hablado');
    expect(card?.answer.startsWith('había')).toBe(true);
  });

  it('spot-check: present-perfect-subjunctive yo answer starts with "haya"', () => {
    const card = cards.find(c => c.cardId === 'spanish-8-ppS-hablar-yo');
    expect(card?.answer).toBe('haya hablado');
    expect(card?.answer.startsWith('haya')).toBe(true);
  });

  it('all answers include the participle "hablado"', () => {
    for (const card of cards) {
      expect(card.answer).toContain('hablado');
    }
  });

  it('tenses include present-perfect, pluperfect, and present-perfect-subjunctive', () => {
    const tenses = new Set(
      cards.map(c => (c.prompt as { tense: string }).tense)
    );
    expect(tenses.has('present-perfect')).toBe(true);
    expect(tenses.has('pluperfect')).toBe(true);
    expect(tenses.has('present-perfect-subjunctive')).toBe(true);
  });
});
