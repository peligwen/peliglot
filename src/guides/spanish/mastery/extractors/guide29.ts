/**
 * Extractor — Guide 29: Subjuntivo Pasado (verb-conjugation-tensed cards).
 *
 * Five verbs × past-subjunctive × 6 pronouns = 30 cards.
 *   hablar, comer, tener, poder, ir/ser
 *
 * The -ra form is canonical; the -se alternate (hablase, comiese, etc.) is
 * recorded in acceptableAnswers — both are equally correct Spanish.
 *
 * Formation: 3pl preterite stem (from data29.ts) + -ra endings.
 * The nosotros form always requires a written accent (habláramos, tuviéramos…).
 * Since the accent falls on the stem's final vowel rather than the ending, we
 * store the full nosotros forms explicitly in data29.ts (nosotrosRa / nosotrosSe).
 *
 * "ir/ser" share identical forms (fuera, fueras…) as they share identical
 * preterite stems (fue-). One entry handles both verbs; cardId uses "ir-ser".
 */

import type { ReviewCard } from '../../../../mastery';
import { verbs, endings, seEndings, pronouns6 } from '../../guides/data29';

/** Nosotros pronoun index in the canonical pronouns6 array */
const NOSOTROS_IDX = 3;

function verbSlug(v: string): string {
  return v.toLowerCase()
    .replace(/\//g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

function pronounSlug(p: string): string {
  return p.toLowerCase()
    .replace(/\//g, '-').replace(/\./g, '').replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const verb of verbs) {
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      // Nosotros uses the full accented form stored in data; all others use stem+ending
      const form = i === NOSOTROS_IDX ? verb.nosotrosRa : verb.stem + endings[i]!;
      const seForm = i === NOSOTROS_IDX ? verb.nosotrosSe : verb.stem + seEndings[i]!;
      cards.push({
        cardId: `spanish-29-pastsubj-${verbSlug(verb.v)}-${pronounSlug(pronoun)}`,
        guideId: 29,
        guideSlug: 'spanish',
        kind: 'verb-conjugation-tensed',
        prompt: {
          kind: 'verb-conjugation-tensed',
          verb: verb.v,
          pronoun,
          tense: 'past-subjunctive',
          meaning: verb.meaning,
        },
        answer: form,
        acceptableAnswers: [seForm],
        speakText: form,
      });
    }
  }

  return cards;
}
