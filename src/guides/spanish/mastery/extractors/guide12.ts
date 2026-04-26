/**
 * Extractor — Guide 12: Pluralización (noun-plural cards).
 *
 * Two card sources:
 *
 * 1. Quiz items: 12 singular → plural pairs.
 * 2. Additional pairs from pluralRules examples not already in quizItems.
 *
 * We deduplicate by singular form to avoid duplicate cards.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { quizItems, pluralRules } from '../../guides/data12';

function wordSlug(word: string): string {
  // Strip articles if present (e.g. "el lunes" → "el-lunes")
  return word
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];
  const seen = new Set<string>();

  // Quiz items (primary source)
  for (const item of quizItems) {
    const slug = wordSlug(item.singular);
    const id = `spanish-12-${slug}`;
    if (seen.has(id)) continue;
    seen.add(id);

    cards.push({
      cardId: id,
      guideId: 12,
      guideSlug: 'spanish',
      kind: 'noun-plural',
      prompt: { kind: 'noun-plural', singular: item.singular },
      answer: item.answer,
      speakText: item.answer,
    });
  }

  // Additional pairs from rules that aren't already covered
  for (const rule of pluralRules) {
    for (const ex of rule.ex) {
      const slug = wordSlug(ex.s);
      const id = `spanish-12-${slug}`;
      if (seen.has(id)) continue;
      seen.add(id);

      cards.push({
        cardId: id,
        guideId: 12,
        guideSlug: 'spanish',
        kind: 'noun-plural',
        prompt: { kind: 'noun-plural', singular: ex.s },
        answer: ex.p,
        speakText: ex.p,
      });
    }
  }

  return cards;
}
