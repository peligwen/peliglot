/**
 * Extractor — Guide 19: Verbos + Preposiciones (verb-prep-pair cards).
 *
 * One card per verb entry across 5 preposition buckets:
 *   a: 5 verbs, de: 6 verbs, en: 4 verbs, con: 4 verbs, none: 4 verbs = 23 cards
 *
 * cardId convention: `spanish-19-${verb-slug}`
 *   e.g. `spanish-19-empezar-a`, `spanish-19-buscar`
 *
 * prompt: { kind: 'verb-prep-pair', verb, meaning }
 *   where `verb` = the bare verb (without preposition in the name field)
 *   and `meaning` = the English meaning string
 *
 * answer: the preposition letter ('a', 'de', 'en', 'con') or '∅' for 'none' bucket.
 *
 * For the 'none' bucket, acceptableAnswers includes empty string and common
 * alternates since the concept is "no preposition needed". The canonical
 * answer is '∅' (U+2205 EMPTY SET) so the aggregator `answer.length > 0`
 * invariant is satisfied.
 */

import type { ReviewCard } from '../../../../mastery';
import { groups } from '../../guides/data19';
import { slugifySpanish } from '../util';

type BucketKey = keyof typeof groups;

const BUCKET_ANSWER: Record<BucketKey, string> = {
  a: 'a',
  de: 'de',
  en: 'en',
  con: 'con',
  none: '∅',
};

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const [bucket, group] of Object.entries(groups) as [BucketKey, (typeof groups)[BucketKey]][]) {
    const answer = BUCKET_ANSWER[bucket];
    const isNone = bucket === 'none';

    for (const entry of group.verbs) {
      // For the verb slug, map spaces to hyphens (e.g. "empezar a" → "empezar-a")
      const slug = slugifySpanish(entry.v);
      const cardId = `spanish-19-${slug}`;

      const card: ReviewCard = {
        cardId,
        guideId: 19,
        guideSlug: 'spanish',
        kind: 'verb-prep-pair',
        prompt: {
          kind: 'verb-prep-pair',
          verb: entry.v,
          meaning: entry.m,
        },
        answer,
        speakText: entry.v,
      };

      if (isNone) {
        card.acceptableAnswers = ['', '-', 'ninguna', 'none'];
      }

      cards.push(card);
    }
  }

  return cards;
}
