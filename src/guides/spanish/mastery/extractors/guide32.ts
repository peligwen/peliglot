/**
 * Extractor — Guide 32: Expresiones Idiomáticas (idiom-meaning cards).
 *
 * 22 cards across three groups:
 *   tener: 10 entries
 *   dar:    6 entries
 *   hacer:  6 entries
 *
 * cardId convention: `spanish-32-${slugified-sp}`
 *   e.g. `spanish-32-tener-hambre`, `spanish-32-darse-cuenta-de`
 *
 * prompt: { kind: 'idiom-meaning', idiom, literal }
 *   where idiom = the Spanish idiomatic expression (sp)
 *   and literal = the word-for-word translation (lit)
 *
 * answer: the English meaning (en)
 *
 * Total: 22 cards.
 */

import type { ReviewCard } from '../../../../mastery';
import { groups } from '../../guides/data32';
import { slugifySpanish } from '../util';

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const [, group] of Object.entries(groups)) {
    for (const item of group.items) {
      cards.push({
        cardId: `spanish-32-${slugifySpanish(item.sp, ' .')}`,
        guideId: 32,
        guideSlug: 'spanish',
        kind: 'idiom-meaning' as const,
        prompt: {
          kind: 'idiom-meaning' as const,
          idiom: item.sp,
          literal: item.lit,
        },
        answer: item.en,
        speakText: item.sp,
      });
    }
  }

  return cards;
}
