/**
 * Extractor — Guide 18: Por vs Para (por-vs-para cards).
 *
 * 10 cards — one per quiz item in the quizItems array.
 *
 * cardId convention: `spanish-18-${index}-${slugified-sentence}`
 *   where the sentence slug is the Spanish sentence before the blank,
 *   lowercased and trimmed to ≤30 chars.
 *
 * prompt: { kind: 'por-vs-para', sentence, reason? }
 *   where `sentence` = the Spanish sentence with ___ for the blank
 *   and `reason` = the usage category label (e.g. "purpose/goal")
 *
 * answer: 'por' | 'para'
 */

import type { ReviewCard } from '../../../../mastery';
import { quizItems } from '../../guides/data18';
import { slugifySpanish } from '../util';

function sentenceSlug(s: string): string {
  return slugifySpanish(s)
    .replace(/[^a-z0-9ñ-]/g, '')
    .slice(0, 30);
}

export function extract(): ReviewCard[] {
  return quizItems.map((item, i) => ({
    cardId: `spanish-18-${i}-${sentenceSlug(item.sentence)}`,
    guideId: 18,
    guideSlug: 'spanish',
    kind: 'por-vs-para' as const,
    prompt: {
      kind: 'por-vs-para' as const,
      sentence: item.sentence,
      reason: item.why,
    },
    answer: item.answer,
    speakText: item.sentence.replace('___', item.answer),
  }));
}
