import { describe, it, expect } from 'vitest';
import type { CardKind } from '../../../mastery/cards';
import { getAllSpanishCards, SPANISH_CARD_COUNT } from './index';

describe('getAllSpanishCards aggregator', () => {
  const cards = getAllSpanishCards();

  // Phase 2a extractors (guides 1,2,4,9,11,12,13,14,17): ~215 cards
  // Phase 2c.2 extractors (guides 5,6,8,10,28,29,30):
  //   guide5: 36, guide6: 12, guide8: 18, guide10: 96, guide28: 18, guide29: 30, guide30: 16 = 226 cards
  // Phase 2c.3 extractors (guides 3,18,19,20,21,22,24,25,31): ~98 cards
  //   guide3: 17, guide18: 10, guide19: 23, guide20: 8, guide21: 8, guide22: 4, guide24: 8, guide25: 15, guide31: 5
  // Phase 2c.4 extractors (guides 16,23,27,32): ~84 cards
  //   guide16: 10, guide23: 38, guide27: 14, guide32: 22
  // Phase 2c.5 (PR #21 cleanup): guide25 +7 (grammarTraps), guide31 +9 (daily+reciprocal) = 16 new cards
  // Expected total: ~678 cards. Tolerance band: >= 660 to allow minor future data changes.
  it('returns at least 660 cards (Phase 2a + 2c.2 + 2c.3 + 2c.4 + 2c.5)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(660);
  });

  it('SPANISH_CARD_COUNT constant matches getAllSpanishCards().length', () => {
    expect(cards.length).toBe(SPANISH_CARD_COUNT);
  });

  it('all cardIds are globally unique across all extractors', () => {
    const ids = cards.map(c => c.cardId);
    const unique = new Set(ids);
    if (unique.size !== ids.length) {
      // Find and report the duplicates for debugging
      const seen = new Set<string>();
      const dupes: string[] = [];
      for (const id of ids) {
        if (seen.has(id)) dupes.push(id);
        seen.add(id);
      }
      throw new Error(`Duplicate cardIds found: ${dupes.join(', ')}`);
    }
    expect(unique.size).toBe(ids.length);
  });

  it('every card has prompt.kind === card.kind', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe(card.kind);
    }
  });

  it('every card has a non-empty answer', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('all cards belong to guideSlug "spanish"', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
    }
  });

  it('covers all 29 expected guide IDs (Phase 2a + 2c.2 + 2c.3 + 2c.4)', () => {
    const guideIds = new Set(cards.map(c => c.guideId));
    for (const id of [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32]) {
      expect(guideIds.has(id)).toBe(true);
    }
  });

  it('covers all 27 expected card kinds (Phase 2a + 2c.2 + 2c.3 + 2c.4 + 2c.5)', () => {
    const kinds = new Set(cards.map(c => c.kind));
    const expectedKinds: CardKind[] = [
      // Phase 2a
      'letter-sound',
      'word-stress',
      'verb-conjugation',
      'verb-conjugation-stem-change',
      'noun-gender',
      'noun-plural',
      'noun-adj-agreement',
      'english-to-pronoun',
      'ser-vs-estar',
      // Phase 2c.2
      'verb-conjugation-tensed',
      'imperative-tu',
      // Phase 2c.3
      'verb-spelling-change',
      'por-vs-para',
      'verb-prep-pair',
      'question-word',
      'negation-translate',
      'comparative-irregular',
      'tu-vs-usted',
      'false-cognate',
      'reflexive-meaning-change',
      // Phase 2c.4
      'gustar-pattern',
      'number-spell',
      'weather-expression',
      'idiom-meaning',
      // Phase 2c.5 (PR #21 cleanup)
      'sentence-correction',
      'reflexive-daily-routine',
      'reciprocal-translate',
    ];
    for (const kind of expectedKinds) {
      expect(kinds.has(kind)).toBe(true);
    }
  });
});
