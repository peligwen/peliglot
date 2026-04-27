import { describe, it, expect } from 'vitest';
import { extract } from './guide10';

describe('guide10 extractor (verb-conjugation-tensed: irregular verbs)', () => {
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

  it('(f) guideSlug is "spanish" and guideId is 10 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(10);
    }
  });

  it('produces 48 preterite cards (8 verbs × 6 pronouns)', () => {
    const pretCards = cards.filter(c => c.cardId.includes('-pret-'));
    expect(pretCards.length).toBe(48);
  });

  it('produces 48 imperfect cards (8 verbs × 6 pronouns)', () => {
    const impCards = cards.filter(c => c.cardId.includes('-imp-'));
    expect(impCards.length).toBe(48);
  });

  it('total card count is 96 (2 tenses × 8 verbs × 6 pronouns)', () => {
    // Note: present-indicative is excluded because TensedConjugationTense does not
    // have a 'present-indicative' member; guide4 covers present-tense verb-conjugation.
    expect(cards.length).toBe(96);
  });

  it('spot-check: ser preterite yo = fui', () => {
    const card = cards.find(c => c.cardId === 'spanish-10-pret-ser-yo');
    expect(card?.answer).toBe('fui');
  });

  it('spot-check: ir imperfect nosotros = íbamos', () => {
    const card = cards.find(c => c.cardId === 'spanish-10-imp-ir-nosotros');
    expect(card?.answer).toBe('íbamos');
  });

  it('spot-check: hacer preterite él/ella/Ud. = hizo', () => {
    const card = cards.find(c => c.cardId === 'spanish-10-pret-hacer-el-ella-ud');
    expect(card?.answer).toBe('hizo');
  });

  it('covers all 8 irregular verbs', () => {
    const verbs = new Set(
      cards.map(c => (c.prompt as { verb: string }).verb)
    );
    for (const v of ['ser', 'estar', 'ir', 'tener', 'hacer', 'poder', 'saber', 'decir']) {
      expect(verbs.has(v)).toBe(true);
    }
  });
});
