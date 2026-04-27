/**
 * Extractor — Guide 28: Subjuntivo Presente (verb-conjugation-tensed cards).
 *
 * Three model verbs (hablar, comer, vivir) × present-subjunctive × 6 pronouns
 * = 18 cards.
 *
 * Formula: "opposite vowel" — -AR → -E endings; -ER/-IR → -A endings.
 * Answers are stem + ending from subjData in data28.ts.
 */

import type { ReviewCard } from '../../../../mastery';
import { subjData, pronouns6 } from '../../guides/data28';

function verbSlug(verb: string): string {
  return verb.toLowerCase().replace(/[áéíóú]/g, c =>
    ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c)
  );
}

function pronounSlug(p: string): string {
  return p.toLowerCase()
    .replace(/\//g, '-').replace(/\./g, '').replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const entry of Object.values(subjData)) {
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const form = entry.stem + entry.endings[i]!;
      cards.push({
        cardId: `spanish-28-ps-${verbSlug(entry.verb)}-${pronounSlug(pronoun)}`,
        guideId: 28,
        guideSlug: 'spanish',
        kind: 'verb-conjugation-tensed',
        prompt: {
          kind: 'verb-conjugation-tensed',
          verb: entry.verb,
          pronoun,
          tense: 'present-subjunctive',
          meaning: entry.meaning,
        },
        answer: form,
        speakText: form,
      });
    }
  }

  return cards;
}
