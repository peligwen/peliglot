/**
 * Extractor — Guide 11: Género (noun-gender cards).
 *
 * Two card sources:
 *
 * 1. Quiz items: each item is already a (noun, article) pair.
 *    prompt: noun (bare word)
 *    answer: "el (masculine)" or "la (feminine)"
 *
 * 2. Exception words from gender rules: nouns listed as exceptions (the
 *    "tricky" ones like "la mano", "el día") deserve their own cards.
 *    We deduplicate against the quiz items to avoid overlap.
 *
 * Card IDs are based on the noun text to remain stable if order changes.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { quizItems, genderRules } from '../../guides/data11';
import { slugifySpanish } from '../util';

function nounSlug(noun: string): string {
  return slugifySpanish(noun);
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];
  const seen = new Set<string>();

  // Quiz items (primary source)
  for (const item of quizItems) {
    const slug = nounSlug(item.noun);
    const id = `spanish-11-${slug}`;
    if (seen.has(id)) continue;
    seen.add(id);

    cards.push({
      cardId: id,
      guideId: 11,
      guideSlug: 'spanish',
      kind: 'noun-gender',
      prompt: { kind: 'noun-gender', noun: item.noun },
      answer: item.answer,
      speakText: item.noun,
    });
  }

  // Exception words from rules — these are the genuinely tricky nouns
  for (const rule of genderRules) {
    const gender = rule.g === 'M' ? 'masculine' : 'feminine';
    const article = rule.g === 'M' ? 'el' : 'la';
    for (const exc of rule.exc) {
      // Exception entries are formatted as "el/la/los/las noun" — strip the article
      const bare = exc.replace(/^(el|la|los|las)\s+/, '');
      const slug = nounSlug(bare);
      const id = `spanish-11-exc-${slug}`;
      if (seen.has(id)) continue;
      seen.add(id);

      cards.push({
        cardId: id,
        guideId: 11,
        guideSlug: 'spanish',
        kind: 'noun-gender',
        prompt: { kind: 'noun-gender', noun: bare },
        answer: `${article} (${gender})`,
        speakText: bare,
      });
    }
  }

  return cards;
}
