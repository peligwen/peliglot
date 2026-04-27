/**
 * Extractor — Guide 21: Negación (negation-translate cards).
 *
 * 8 cards — one per quiz item (English → Spanish negation sentence).
 *
 * cardId convention: `spanish-21-${index}-${slugified-question}`
 *   e.g. `spanish-21-0-i-dont-want-anything`
 *
 * prompt: { kind: 'negation-translate', english }
 * answer: the primary Spanish translation
 *
 * acceptableAnswers: derived from negWords context where the guide explicitly
 * demonstrates multiple valid forms:
 *
 *   "I never eat meat." (Nunca) — guide shows:
 *     "Nunca como carne." (pre-verb, no 'no' needed)
 *     "No como carne nunca." (post-verb, double negative)
 *     → acceptableAnswers: ["No como carne nunca."]
 *
 *   "Neither coffee nor tea." (ni...ni) — guide shows:
 *     "No quiero ni café ni té." (with no before verb)
 *     "Ni sé ni me importa." (starting with ni)
 *     These are different sentences with different meanings so no alternate.
 *
 *   "She hasn't arrived yet." (todavía no) — guide shows:
 *     "Todavía no llega." (todavía no + verb)
 *     "No ha llegado todavía." (reverse order)
 *     → acceptableAnswers: ["No ha llegado todavía."]
 *
 *   "Me neither." (tampoco) — guide shows:
 *     "Yo tampoco." and "No quiero ir tampoco."
 *     The quiz answer is "Yo tampoco." — the second is a different full sentence.
 *
 * All other items have unique unambiguous primary answers.
 */

import type { ReviewCard } from '../../../../mastery';
import { quizItems } from '../../guides/data21';
import { slugifySpanish } from '../util';

function questionSlug(q: string): string {
  return slugifySpanish(q)
    .replace(/[^a-z0-9ñ-]/g, '')
    .slice(0, 30);
}

// Hand-curated alternates derived from negWords examples in the guide
const ALTERNATES: Record<number, string[]> = {
  2: ['No como carne nunca.'],           // "I never eat meat."
  5: ['No ha llegado todavía.'],         // "She hasn't arrived yet."
};

export function extract(): ReviewCard[] {
  return quizItems.map((item, i) => {
    const card: ReviewCard = {
      cardId: `spanish-21-${i}-${questionSlug(item.question)}`,
      guideId: 21,
      guideSlug: 'spanish',
      kind: 'negation-translate',
      prompt: {
        kind: 'negation-translate',
        english: item.question,
      },
      answer: item.answer,
      speakText: item.answer,
    };

    if (ALTERNATES[i]) {
      card.acceptableAnswers = ALTERNATES[i];
    }

    return card;
  });
}
