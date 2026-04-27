/**
 * Extractor — Guide 30: Imperativo (imperative-tu cards).
 *
 * Eight irregular tú-command verbs × 2 polarities = 16 cards.
 *   Verbs: decir, hacer, ir, poner, salir, ser, tener, venir
 *   Polarities: affirmative (cmd), negative (neg, includes "no" prefix)
 *
 * Affirmative answer: just the command form (e.g. "di")
 * Negative answer: full negative command including "no" (e.g. "no digas")
 *
 * CardId convention: spanish-30-{verb}-{aff|neg}
 */

import type { ReviewCard } from '../../../../mastery';
import { irregTu } from '../../guides/data30';

function verbSlug(v: string): string {
  return v.toLowerCase().replace(/[áéíóú]/g, c =>
    ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c)
  );
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const entry of irregTu) {
    // Affirmative card
    cards.push({
      cardId: `spanish-30-${verbSlug(entry.v)}-aff`,
      guideId: 30,
      guideSlug: 'spanish',
      kind: 'imperative-tu',
      prompt: {
        kind: 'imperative-tu',
        verb: entry.v,
        polarity: 'affirmative',
      },
      answer: entry.cmd,
      speakText: entry.cmd,
    });

    // Negative card — answer includes the "no" prefix as stored in data30
    cards.push({
      cardId: `spanish-30-${verbSlug(entry.v)}-neg`,
      guideId: 30,
      guideSlug: 'spanish',
      kind: 'imperative-tu',
      prompt: {
        kind: 'imperative-tu',
        verb: entry.v,
        polarity: 'negative',
      },
      answer: entry.neg,
      speakText: entry.neg,
    });
  }

  return cards;
}
