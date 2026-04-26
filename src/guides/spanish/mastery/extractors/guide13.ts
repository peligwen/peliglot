/**
 * Extractor — Guide 13: Adjetivos (noun-adj-agreement cards).
 *
 * Source: the `adjs` array paired with `nouns`.
 * For each of the 4 form keys (ms, fs, mp, fp) × 5 adjectives = 20 cards.
 *
 * Each card tests: given a noun form and adjective (base), what is the
 * agreed adjective form?
 *
 * The `shifts` data (meaning shifts by placement) uses a different concept
 * (placement altering meaning, not form agreement) and does not fit the
 * `noun-adj-agreement` card kind — it is intentionally excluded.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { adjs, nouns } from '../../guides/data13';
import type { FormKey } from '../../guides/data13';
import { slugifySpanish } from '../util';

const formKeys: FormKey[] = ['ms', 'fs', 'mp', 'fp'];

// Guide13 adjective base forms may contain "/" (e.g. "masc/fem") — pass it
// through as an extra separator so it becomes a hyphen in the slug.
function slug(s: string): string {
  return slugifySpanish(s, '/');
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const key of formKeys) {
    const nounForm = nouns[key];
    for (const adj of adjs) {
      const agreedForm = adj.forms[key];
      const cardId = `spanish-13-${slug(adj.base)}-${key}`;

      cards.push({
        cardId,
        guideId: 13,
        guideSlug: 'spanish',
        kind: 'noun-adj-agreement',
        prompt: {
          kind: 'noun-adj-agreement',
          noun: nounForm,
          adjective: adj.base,
          nounMeaning: undefined,
          adjectiveMeaning: adj.en,
        },
        answer: agreedForm,
        speakText: `${nounForm} ${agreedForm}`,
      });
    }
  }

  return cards;
}
