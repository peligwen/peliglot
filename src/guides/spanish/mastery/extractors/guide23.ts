/**
 * Extractor — Guide 23: Números y Fechas (number-spell cards).
 *
 * Two card sources:
 *   - numbers: 28 cardinal entries (0–1,000,000) → prompt: numeric label
 *   - ordinals: 10 ordinal entries (1º–10º) → prompt: ordinal symbol
 *
 * cardId convention:
 *   cardinals: `spanish-23-num-${n}` (where n is the numeric value)
 *   ordinals:  `spanish-23-ord-${i}` (where i is 0-based index)
 *
 * prompt: { kind: 'number-spell', numeric }
 *   where numeric = the string shown to the learner ("0", "100", "1º", etc.)
 *
 * answer: Spanish spelling of the number/ordinal
 *
 * Total: 28 + 10 = 38 cards.
 */

import type { ReviewCard } from '../../../../mastery';
import { numbers, ordinals } from '../../guides/data23';

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // Cardinal numbers
  for (const nm of numbers) {
    cards.push({
      cardId: `spanish-23-num-${nm.n}`,
      guideId: 23,
      guideSlug: 'spanish',
      kind: 'number-spell' as const,
      prompt: {
        kind: 'number-spell' as const,
        numeric: nm.n.toLocaleString('en-US'),
      },
      answer: nm.sp,
      speakText: nm.sp,
    });
  }

  // Ordinal numbers
  for (let i = 0; i < ordinals.length; i++) {
    const ord = ordinals[i]!;
    cards.push({
      cardId: `spanish-23-ord-${i}`,
      guideId: 23,
      guideSlug: 'spanish',
      kind: 'number-spell' as const,
      prompt: {
        kind: 'number-spell' as const,
        numeric: ord.ord,
      },
      answer: ord.sp,
      speakText: ord.sp,
    });
  }

  return cards;
}
