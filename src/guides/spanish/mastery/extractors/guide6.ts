/**
 * Extractor — Guide 6: Futuro y Condicional (verb-conjugation-tensed cards).
 *
 * Two tenses × 1 model verb (hablar) × 6 pronouns = 12 cards.
 *   - future:      hablaré, hablarás, hablará, hablaremos, hablaréis, hablarán
 *   - conditional: hablaría, hablarías, hablaría, hablaríamos, hablaríais, hablarían
 *
 * Both tenses attach endings to the full infinitive "hablar" (no stem drop).
 */

import type { ReviewCard, TensedConjugationTense } from '../../../../mastery';
import { futEndings, condEndings, pronouns6 } from '../../guides/data6';

const VERB = 'hablar';
const MEANING = 'to speak';
/** The full infinitive is the stem for both future and conditional */
const STEM = 'hablar';

function pronounSlug(p: string): string {
  return p.toLowerCase()
    .replace(/\//g, '-').replace(/\./g, '').replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  const tenses: { tense: TensedConjugationTense; endings: string[]; label: string }[] = [
    { tense: 'future',      endings: futEndings,  label: 'fut' },
    { tense: 'conditional', endings: condEndings, label: 'cond' },
  ];

  for (const { tense, endings, label } of tenses) {
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const form = STEM + endings[i]!;
      cards.push({
        cardId: `spanish-6-${label}-${VERB}-${pronounSlug(pronoun)}`,
        guideId: 6,
        guideSlug: 'spanish',
        kind: 'verb-conjugation-tensed',
        prompt: {
          kind: 'verb-conjugation-tensed',
          verb: VERB,
          pronoun,
          tense,
          meaning: MEANING,
        },
        answer: form,
        speakText: form,
      });
    }
  }

  return cards;
}
