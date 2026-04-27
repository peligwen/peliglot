/**
 * Extractor — Guide 25: Trampas — False Cognates (false-cognate cards).
 *
 * 15 cards — one per entry in falseCogs.
 * grammarTraps are deferred (Phase 2c.4 or later).
 *
 * cardId convention: `spanish-25-${slugified-spanish-word}`
 *   e.g. `spanish-25-embarazada`, `spanish-25-exito`
 *
 * prompt: { kind: 'false-cognate', spanish, falseFriend }
 *   where `spanish` = the Spanish word and `falseFriend` = what English
 *   speakers wrongly think it means
 *
 * answer: the actual Spanish meaning string from the `a` field
 *
 * acceptableAnswers: when `a` contains "/" separating synonyms, each part
 * becomes an acceptable alternate.
 *
 * Examples:
 *   "to bother/annoy"       → answer "to bother/annoy", alternates ["to bother", "to annoy"]
 *   "to carry out / accomplish" → answer that, alternates ["to carry out", "to accomplish"]
 *   "to tolerate / bear"    → answer that, alternates ["to tolerate", "to bear"]
 *   "to insert / put in"    → answer that, alternates ["to insert", "to put in"]
 *   "worried / concerned"   → answer that, alternates ["worried", "concerned"]
 */

import type { ReviewCard } from '../../../../mastery';
import { falseCogs } from '../../guides/data25';
import { slugifySpanish } from '../util';

/**
 * If the answer contains "/" (slash-separated synonyms), return them as
 * an array of trimmed alternate forms. Otherwise return undefined.
 *
 * Handles "to verb/verb" patterns by propagating "to " prefix to all parts:
 *   "to bother/annoy"     → ["to bother", "to annoy"]
 *   "to carry out / accomplish" → ["to carry out", "to accomplish"]
 *   "worried / concerned" → ["worried", "concerned"]
 */
function parseAlternates(a: string): string[] | undefined {
  if (!a.includes('/')) return undefined;
  const startsWithTo = a.trimStart().toLowerCase().startsWith('to ');
  const parts = a.split('/').map(p => {
    const trimmed = p.trim();
    // Propagate "to " prefix if the overall string starts with "to" and this
    // part doesn't (e.g. the second/third slot in "to bother/annoy")
    if (startsWithTo && !trimmed.toLowerCase().startsWith('to ')) {
      return `to ${trimmed}`;
    }
    return trimmed;
  }).filter(p => p.length > 0);
  return parts.length >= 2 ? parts : undefined;
}

export function extract(): ReviewCard[] {
  return falseCogs.map(cog => {
    const slug = slugifySpanish(cog.s, '');
    const alternates = parseAlternates(cog.a);

    const card: ReviewCard = {
      cardId: `spanish-25-${slug}`,
      guideId: 25,
      guideSlug: 'spanish',
      kind: 'false-cognate',
      prompt: {
        kind: 'false-cognate',
        spanish: cog.s,
        falseFriend: cog.l,
      },
      answer: cog.a,
      speakText: cog.s,
    };

    if (alternates) {
      card.acceptableAnswers = alternates;
    }

    return card;
  });
}
