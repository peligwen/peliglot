/**
 * Extractor — Guide 24: Tú vs Usted (tu-vs-usted cards).
 *
 * 8 cards — one per scenario.
 *
 * cardId convention: `spanish-24-${index}-${slugified-situation}`
 *   e.g. `spanish-24-0-your-best-friend`
 *
 * prompt: { kind: 'tu-vs-usted', situation, reason? }
 * answer: 'tú' | 'usted'
 *
 * For 'tú' answers, acceptableAnswers includes 'tu' (no accent) since
 * diacritic-stripping handles this at the checkAnswer level, but explicit
 * inclusion is defensive.
 */

import type { ReviewCard } from '../../../../mastery';
import { scenarios } from '../../guides/data24';

function situationSlug(sit: string): string {
  return sit
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30);
}

export function extract(): ReviewCard[] {
  return scenarios.map((scenario, i) => {
    const card: ReviewCard = {
      cardId: `spanish-24-${i}-${situationSlug(scenario.sit)}`,
      guideId: 24,
      guideSlug: 'spanish',
      kind: 'tu-vs-usted',
      prompt: {
        kind: 'tu-vs-usted',
        situation: scenario.sit,
        reason: scenario.why,
      },
      answer: scenario.answer,
    };

    if (scenario.answer === 'tú') {
      card.acceptableAnswers = ['tu'];
    }

    return card;
  });
}
