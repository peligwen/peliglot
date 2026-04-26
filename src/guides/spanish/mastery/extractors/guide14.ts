/**
 * Extractor — Guide 14: Pronombres (english-to-pronoun cards).
 *
 * Source: the `types` array — 5 pronoun types × ~6 entries each = ~30 cards.
 *
 * Each card tests: given an English clue and the pronoun type context, what
 * is the Spanish pronoun?
 *
 * Card IDs encode the type prefix to keep same-surface pronouns (me, te,
 * nos, os appear in DO, IO, and Reflexive) globally unique:
 *   spanish-14-{typeId}-{index}
 *
 * The `en` field (English equivalent) serves as the question prompt.
 * The `p` field (Spanish pronoun) is the answer.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { types } from '../../guides/data14';

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const pronounType of types) {
    for (let i = 0; i < pronounType.data.length; i++) {
      const entry = pronounType.data[i]!;
      // Use index in cardId to keep stable IDs (pronouns repeat across types)
      const cardId = `spanish-14-${pronounType.id}-${i}-${slug(entry.p)}`;

      // Build a rich English clue: the English meaning + type context
      const english = `${entry.en} [${pronounType.label}: ${pronounType.desc}]`;

      cards.push({
        cardId,
        guideId: 14,
        guideSlug: 'spanish',
        kind: 'english-to-pronoun',
        prompt: { kind: 'english-to-pronoun', english },
        answer: entry.p,
        speakText: entry.p,
      });
    }
  }

  return cards;
}
