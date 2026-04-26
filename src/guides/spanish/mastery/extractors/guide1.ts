/**
 * Extractor — Guide 1: El Alfabeto (letter-sound cards).
 *
 * Each letter in the 27-letter RAE alphabet becomes one card:
 *   prompt: the letter glyph
 *   answer: the IPA notation (canonical)
 *   acceptableAnswers: the approximate English description
 *
 * The three digraphs (CH, LL, RR) are included as bonus cards because
 * they represent essential pronunciation pairs even though they are not
 * official alphabet letters since the 2010 RAE Ortografía.
 *
 * Note: the guide's data has `ipa` and `approx` fields, not a single
 * `sound` field. We use `ipa` as the canonical answer and `approx` as
 * an acceptable alternate — this deviation is intentional and noted in
 * the implementation summary.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { letters, digraphs } from '../../guides/data1';

/** Slugify a letter glyph into a safe cardId segment (e.g. "Ñ" → "n-tilde"). */
function letterSlug(l: string): string {
  return l
    .toLowerCase()
    .replace(/ñ/, 'n-tilde')
    .replace(/\s+/g, '-');
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // 27-letter alphabet
  for (const entry of letters) {
    const slug = letterSlug(entry.letter);
    cards.push({
      cardId: `spanish-1-letter-${slug}`,
      guideId: 1,
      guideSlug: 'spanish',
      kind: 'letter-sound',
      prompt: { kind: 'letter-sound', letter: entry.letter },
      answer: entry.ipa,
      acceptableAnswers: [entry.approx],
      speakText: entry.name,
    });
  }

  // Digraphs — not official letters but essential pronunciation pairs
  for (const entry of digraphs) {
    const slug = letterSlug(entry.dg);
    cards.push({
      cardId: `spanish-1-digraph-${slug}`,
      guideId: 1,
      guideSlug: 'spanish',
      kind: 'letter-sound',
      prompt: { kind: 'letter-sound', letter: entry.dg },
      answer: entry.ipa,
      acceptableAnswers: [entry.approx],
      speakText: entry.name,
    });
  }

  return cards;
}
