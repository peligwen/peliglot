/**
 * Extractor — Guide 9: Cambios de Raíz / Boot Verbs
 * (verb-conjugation-stem-change cards).
 *
 * The guide displays one model verb per stem-change pattern. Only the model
 * verbs have full conjugation tables — the sibling verbs list (e.g. pensar,
 * querer, preferir…) is not conjugated in the data. We produce cards only
 * for the 4 model verbs × 6 pronouns = 24 cards.
 *
 * The boot pattern [true, true, true, false, false, true] indicates which
 * pronoun positions undergo the stem change. We record this in `speakText`
 * and use the stored `forms` array directly.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { stemTypes, pronouns6 } from '../../guides/data9';

/** Slugify a verb for use in cardId. */
function verbSlug(verb: string): string {
  return verb
    .toLowerCase()
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

/** Slugify a pronoun for use in cardId. */
function pronounSlug(p: string): string {
  return p
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const stemType of stemTypes) {
    const { verb, forms } = stemType.model;
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const form = forms[i]!;
      cards.push({
        cardId: `spanish-9-${verbSlug(verb)}-${pronounSlug(pronoun)}`,
        guideId: 9,
        guideSlug: 'spanish',
        kind: 'verb-conjugation-stem-change',
        prompt: {
          kind: 'verb-conjugation-stem-change',
          verb,
          pronoun,
          meaning: stemType.label,
        },
        answer: form,
        speakText: form,
      });
    }
  }

  return cards;
}
