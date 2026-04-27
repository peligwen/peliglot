import { describe, it, expect } from 'vitest';
import type { CardKind } from '../../../mastery/cards';
import { getAllSpanishCards } from './index';

describe('getAllSpanishCards aggregator', () => {
  const cards = getAllSpanishCards();

  // Phase 2a extractors (guides 1,2,4,9,11,12,13,14,17): ~215 cards
  // Phase 2c.2 extractors (guides 5,6,8,10,28,29,30):
  //   guide5: 36, guide6: 12, guide8: 18, guide10: 96, guide28: 18, guide29: 30, guide30: 16 = 226 cards
  // Expected total: ~441 cards. Tolerance band: >= 400 to allow minor future data changes.
  it('returns at least 400 cards (Phase 2a ~215 + Phase 2c.2 ~226)', () => {
    expect(cards.length).toBeGreaterThanOrEqual(400);
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

  it('covers all 16 expected guide IDs (Phase 2a + Phase 2c.2)', () => {
    const guideIds = new Set(cards.map(c => c.guideId));
    for (const id of [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 17, 28, 29, 30]) {
      expect(guideIds.has(id)).toBe(true);
    }
  });

  it('covers all 11 expected card kinds (Phase 2a + Phase 2c.2)', () => {
    const kinds = new Set(cards.map(c => c.kind));
    const expectedKinds: CardKind[] = [
      'letter-sound',
      'word-stress',
      'verb-conjugation',
      'verb-conjugation-stem-change',
      'noun-gender',
      'noun-plural',
      'noun-adj-agreement',
      'english-to-pronoun',
      'ser-vs-estar',
      // Phase 2c.2 additions
      'verb-conjugation-tensed',
      'imperative-tu',
    ];
    for (const kind of expectedKinds) {
      expect(kinds.has(kind)).toBe(true);
    }
  });
});
