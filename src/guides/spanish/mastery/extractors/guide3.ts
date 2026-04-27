/**
 * Extractor — Guide 3: Cambios Ortográficos (verb-spelling-change cards).
 *
 * One card per example in spChanges:
 *   - 6 patterns × variable examples = 17 cards total
 *   - c-qu: 3, g-gu: 3, z-c: 3, g-j: 3, gu-g: 2, i-y: 3
 *
 * cardId convention: `spanish-3-${pattern.id}-${example.inf}`
 *   e.g. `spanish-3-c-qu-buscar`
 *
 * prompt: { kind: 'verb-spelling-change', infinitive, target, meaning? }
 *   where `target` = the tense/person label (e.g. "Preterite yo")
 * answer: the conjugated form (e.g. "busqué")
 */

import type { ReviewCard } from '../../../../mastery';
import { spChanges } from '../../guides/data3';

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const pattern of spChanges) {
    for (const ex of pattern.examples) {
      cards.push({
        cardId: `spanish-3-${pattern.id}-${ex.inf}`,
        guideId: 3,
        guideSlug: 'spanish',
        kind: 'verb-spelling-change',
        prompt: {
          kind: 'verb-spelling-change',
          infinitive: ex.inf,
          target: ex.t,
        },
        answer: ex.form,
        speakText: ex.form,
      });
    }
  }

  return cards;
}
