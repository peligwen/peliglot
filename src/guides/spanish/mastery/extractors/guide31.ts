/**
 * Extractor — Guide 31: Verbos Reflexivos — Meaning Changes (reflexive-meaning-change cards).
 *
 * 5 cards — one per entry in meaningChange.
 * daily-routine verbs and reciprocal section are deferred.
 *
 * cardId convention: `spanish-31-${slugified-reflexive-form}`
 *   e.g. `spanish-31-irse`, `spanish-31-ponerse`
 *
 * prompt: { kind: 'reflexive-meaning-change', reflexive, baseVerb, baseMeaning }
 * answer: the reflexive meaning string
 *
 * acceptableAnswers: when the reflexive meaning contains "/" separating
 * synonyms/alternates, include each part as an acceptable form.
 *
 *   "to leave/go away"       → alternates ["to leave", "to go away"]
 *   "to put on / become"     → alternates ["to put on", "to become"]
 *   "to take away / get along" → alternates ["to take away", "to get along"]
 */

import type { ReviewCard } from '../../../../mastery';
import { meaningChange } from '../../guides/data31';
import { slugifySpanish } from '../util';

/**
 * Split slash-separated alternate meanings. Propagates "to " prefix:
 *   "to leave/go away"     → ["to leave", "to go away"]
 *   "to put on / become"   → ["to put on", "to become"]
 *   "to take away / get along" → ["to take away", "to get along"]
 *   "to resemble"          → undefined (no slash)
 */
function parseAlternates(m: string): string[] | undefined {
  if (!m.includes('/')) return undefined;
  const startsWithTo = m.trimStart().toLowerCase().startsWith('to ');
  const parts = m.split('/').map(p => {
    const trimmed = p.trim();
    if (startsWithTo && !trimmed.toLowerCase().startsWith('to ')) {
      return `to ${trimmed}`;
    }
    return trimmed;
  }).filter(p => p.length > 0);
  return parts.length >= 2 ? parts : undefined;
}

export function extract(): ReviewCard[] {
  return meaningChange.map(mc => {
    const slug = slugifySpanish(mc.refl);
    const alternates = parseAlternates(mc.m2);

    const card: ReviewCard = {
      cardId: `spanish-31-${slug}`,
      guideId: 31,
      guideSlug: 'spanish',
      kind: 'reflexive-meaning-change',
      prompt: {
        kind: 'reflexive-meaning-change',
        reflexive: mc.refl,
        baseVerb: mc.base,
        baseMeaning: mc.m1,
      },
      answer: mc.m2,
      speakText: mc.refl,
    };

    if (alternates) {
      card.acceptableAnswers = alternates;
    }

    return card;
  });
}
