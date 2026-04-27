/**
 * Extractor — Guide 27: El Tiempo — Weather (weather-expression cards).
 *
 * 14 cards — one per entry in weatherExpr.
 *
 * cardId convention: `spanish-27-${slugified-expression}`
 *   e.g. `spanish-27-hace-calor`, `spanish-27-hay-niebla`
 *
 * prompt: { kind: 'weather-expression', english, icon }
 *   where english = the English meaning (e.g. "It's hot")
 *   and icon = the emoji for that expression
 *
 * answer: the Spanish expression (e.g. "Hace calor")
 *
 * Total: 14 cards.
 */

import type { ReviewCard } from '../../../../mastery';
import { weatherExpr } from '../../guides/data27';
import { slugifySpanish } from '../util';

export function extract(): ReviewCard[] {
  return weatherExpr.map(w => ({
    cardId: `spanish-27-${slugifySpanish(w.expr, ' ')}`,
    guideId: 27,
    guideSlug: 'spanish',
    kind: 'weather-expression' as const,
    prompt: {
      kind: 'weather-expression' as const,
      english: w.eng,
      icon: w.icon,
    },
    answer: w.expr,
    speakText: w.expr,
  }));
}
