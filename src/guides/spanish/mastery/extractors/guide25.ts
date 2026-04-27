/**
 * Extractor — Guide 25: Trampas — False Cognates + Grammar Traps.
 *
 * false-cognate cards: 15 — one per entry in falseCogs.
 * sentence-correction cards: 7 — one per entry in grammarTraps.
 *
 * cardId conventions:
 *   false-cognate: `spanish-25-${slugified-spanish-word}`
 *     e.g. `spanish-25-embarazada`, `spanish-25-exito`
 *   sentence-correction: `spanish-25-trap-${slug}`
 *     slug derived from the `wrong` sentence so IDs don't collide with false-cognate IDs
 *
 * false-cognate prompt: { kind: 'false-cognate', spanish, falseFriend }
 *   answer: the actual Spanish meaning string from the `a` field
 *   acceptableAnswers: slash-separated synonyms split into individual forms
 *
 * sentence-correction prompt: { kind: 'sentence-correction', wrong, explanation }
 *   answer: the corrected sentence (`correct` field from GrammarTrap)
 *   explanation is shown in the renderer after reveal
 */

import type { ReviewCard } from '../../../../mastery';
import { falseCogs, grammarTraps } from '../../guides/data25';
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

/**
 * Derive a slug from a sentence for use in a cardId. Takes the first 30 chars
 * of the slugified text (spaces→hyphens, lowercase, drop punctuation).
 */
function sentenceSlug(s: string): string {
  return slugifySpanish(s)
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 30)
    .replace(/-+$/, '');
}

export function extract(): ReviewCard[] {
  const falseCogCards: ReviewCard[] = falseCogs.map(cog => {
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

  const grammarTrapCards: ReviewCard[] = grammarTraps.map(trap => {
    const slug = sentenceSlug(trap.wrong);

    return {
      cardId: `spanish-25-trap-${slug}`,
      guideId: 25,
      guideSlug: 'spanish',
      kind: 'sentence-correction',
      prompt: {
        kind: 'sentence-correction',
        wrong: trap.wrong,
        explanation: trap.note,
      },
      answer: trap.correct,
      speakText: trap.correct,
    };
  });

  return [...falseCogCards, ...grammarTrapCards];
}
