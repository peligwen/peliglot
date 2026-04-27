/**
 * Extractor — Guide 31: Verbos Reflexivos.
 *
 * reflexive-meaning-change: 5 cards — one per entry in meaningChange.
 *   cardId: `spanish-31-${slugified-reflexive-form}`
 *   prompt: { kind: 'reflexive-meaning-change', reflexive, baseVerb, baseMeaning }
 *   answer: the reflexive meaning string
 *
 * reflexive-daily-routine: 6 cards — one per entry in daily.
 *   cardId: `spanish-31-daily-${slugified-reflexive-verb}`
 *   prompt: { kind: 'reflexive-daily-routine', english }
 *   answer: the Spanish reflexive infinitive (v)
 *
 * reciprocal-translate: 3 cards — one per entry in reciprocal.
 *   cardId: `spanish-31-recip-${index}`
 *   prompt: { kind: 'reciprocal-translate', english }
 *   answer: the Spanish reciprocal sentence
 *
 * acceptableAnswers for reflexive-meaning-change: slash-separated meanings
 * split into individual alternates (e.g. "to leave/go away" → ["to leave", "to go away"]).
 */

import type { ReviewCard } from '../../../../mastery';
import { meaningChange, daily, reciprocal } from '../../guides/data31';
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
  const meaningChangeCards: ReviewCard[] = meaningChange.map(mc => {
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

  const dailyCards: ReviewCard[] = daily.map(d => {
    const slug = slugifySpanish(d.v);
    return {
      cardId: `spanish-31-daily-${slug}`,
      guideId: 31,
      guideSlug: 'spanish',
      kind: 'reflexive-daily-routine',
      prompt: {
        kind: 'reflexive-daily-routine',
        english: d.m,
      },
      answer: d.v,
      speakText: d.v,
    };
  });

  const reciprocalCards: ReviewCard[] = reciprocal.map((r, i) => ({
    cardId: `spanish-31-recip-${i}`,
    guideId: 31,
    guideSlug: 'spanish',
    kind: 'reciprocal-translate',
    prompt: {
      kind: 'reciprocal-translate',
      english: r.english,
    },
    answer: r.spanish,
    speakText: r.spanish,
  }));

  return [...meaningChangeCards, ...dailyCards, ...reciprocalCards];
}
