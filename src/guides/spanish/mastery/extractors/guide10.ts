/**
 * Extractor — Guide 10: Irregulares (verb-conjugation-tensed cards).
 *
 * Eight irregular verbs × 2 tenses × 6 pronouns = 96 cards.
 *   Verbs: ser, estar, ir, tener, hacer, poder, saber, decir
 *   Tenses: preterite, imperfect
 *
 * Present-indicative forms are NOT included here — TensedConjugationTense
 * does not have a 'present-indicative' member. Present-tense forms for these
 * same 8 verbs are already emitted as `verb-conjugation` cards from guide4.
 *
 * "future" and "subjunctive" forms from the data are also deferred.
 * Future irregular forms will be covered when a dedicated extractor is added.
 * Subjunctive forms for these verbs are partially covered by guide28/29.
 *
 * Note: guide4 emits `verb-conjugation` (present indicative) cards for the
 * same 8 verbs. These cards use `verb-conjugation-tensed` + different
 * tenses/cardId prefix, so there is no collision. Anki treats them as
 * distinct cards, which is correct.
 */

import type { ReviewCard, TensedConjugationTense } from '../../../../mastery';
import { irregVerbs, pronouns6 } from '../../guides/data10';

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

const TENSES: { dataKey: 'preterite' | 'imperfect'; tense: TensedConjugationTense; label: string }[] = [
  { dataKey: 'preterite', tense: 'preterite', label: 'pret' },
  { dataKey: 'imperfect', tense: 'imperfect', label: 'imp' },
];

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const { dataKey, tense, label } of TENSES) {
    for (const [verbName, entry] of Object.entries(irregVerbs)) {
      const forms = entry[dataKey];
      for (let i = 0; i < pronouns6.length; i++) {
        const pronoun = pronouns6[i]!;
        const form = forms[i]!;
        cards.push({
          cardId: `spanish-10-${label}-${verbSlug(verbName)}-${pronounSlug(pronoun)}`,
          guideId: 10,
          guideSlug: 'spanish',
          kind: 'verb-conjugation-tensed',
          prompt: {
            kind: 'verb-conjugation-tensed',
            verb: verbName,
            pronoun,
            tense,
            meaning: entry.m,
          },
          answer: form,
          speakText: form,
        });
      }
    }
  }

  return cards;
}
