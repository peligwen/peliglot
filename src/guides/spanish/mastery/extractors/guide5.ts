/**
 * Extractor — Guide 5: Pretérito vs Imperfecto (verb-conjugation-tensed cards).
 *
 * Two tenses × 3 model verbs × 6 pronouns = 36 cards.
 *   - preterite:  hablar, comer, vivir
 *   - imperfect:  hablar, comer, vivir
 *
 * Answers are stem + ending from pretData / impData in data5.ts.
 */

import type { ReviewCard, TensedConjugationTense } from '../../../../mastery';
import { pretData, impData, pronouns6 } from '../../guides/data5';

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

  const tenses: { tense: TensedConjugationTense; data: typeof pretData; label: string }[] = [
    { tense: 'preterite', data: pretData, label: 'pret' },
    { tense: 'imperfect', data: impData,  label: 'imp' },
  ];

  for (const { tense, data, label } of tenses) {
    for (const entry of Object.values(data)) {
      for (let i = 0; i < pronouns6.length; i++) {
        const pronoun = pronouns6[i]!;
        const form = entry.stem + entry.endings[i]!;
        cards.push({
          cardId: `spanish-5-${label}-${verbSlug(entry.verb)}-${pronounSlug(pronoun)}`,
          guideId: 5,
          guideSlug: 'spanish',
          kind: 'verb-conjugation-tensed',
          prompt: {
            kind: 'verb-conjugation-tensed',
            verb: entry.verb,
            pronoun,
            tense,
            meaning: entry.meaning,
          },
          answer: form,
          speakText: form,
        });
      }
    }
  }

  return cards;
}
