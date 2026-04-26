import { describe, it, expect } from 'vitest';
import type { CardKind } from '../../../mastery/cards';
import { getAllSpanishCards } from './index';

describe('getAllSpanishCards aggregator', () => {
  const cards = getAllSpanishCards();

  it('returns at least 100 cards', () => {
    expect(cards.length).toBeGreaterThanOrEqual(100);
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

  it('covers all 9 expected guide IDs', () => {
    const guideIds = new Set(cards.map(c => c.guideId));
    for (const id of [1, 2, 4, 9, 11, 12, 13, 14, 17]) {
      expect(guideIds.has(id)).toBe(true);
    }
  });

  it('covers all 9 expected card kinds', () => {
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
    ];
    for (const kind of expectedKinds) {
      expect(kinds.has(kind)).toBe(true);
    }
  });
});
