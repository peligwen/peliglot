/**
 * Extractor — Guide 22: Comparativos (comparative-irregular cards).
 *
 * 4 cards — one per entry in the irregs array.
 *
 * cardId convention: `spanish-22-${slugifiedPositive}`
 *   e.g. `spanish-22-bueno`, `spanish-22-grande`
 *
 * prompt: { kind: 'comparative-irregular', positive, meaning }
 *   where `positive` = base adjective and `meaning` = English gloss
 *
 * answer / acceptableAnswers:
 *   - bueno  → answer "mejor"               (no alternates)
 *   - malo   → answer "peor"                (no alternates)
 *   - grande → answer "mayor", acceptableAnswers ["más grande"]
 *   - pequeño → answer "menor", acceptableAnswers ["más pequeño"]
 *
 * The irregular form (mayor/menor) is canonical because that is what the
 * guide emphasises. The periphrastic form is accepted as alternate.
 */

import type { ReviewCard } from '../../../../mastery';
import { slugifySpanish } from '../util';

interface CompCard {
  positive: string;
  meaning: string;
  answer: string;
  alternates?: string[];
}

const CARDS: CompCard[] = [
  { positive: 'bueno',   meaning: 'good',  answer: 'mejor' },
  { positive: 'malo',    meaning: 'bad',   answer: 'peor' },
  { positive: 'grande',  meaning: 'big',   answer: 'mayor',  alternates: ['más grande'] },
  { positive: 'pequeño', meaning: 'small', answer: 'menor',  alternates: ['más pequeño'] },
];

export function extract(): ReviewCard[] {
  return CARDS.map(({ positive, meaning, answer, alternates }) => {
    const card: ReviewCard = {
      cardId: `spanish-22-${slugifySpanish(positive)}`,
      guideId: 22,
      guideSlug: 'spanish',
      kind: 'comparative-irregular',
      prompt: { kind: 'comparative-irregular', positive, meaning },
      answer,
      speakText: answer,
    };
    if (alternates) {
      card.acceptableAnswers = alternates;
    }
    return card;
  });
}
