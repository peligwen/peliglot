/**
 * Extractor — Guide 16: Verbos como Gustar (gustar-pattern cards).
 *
 * 10 cards — one per quiz item in quizItems.
 *
 * The question string encodes both the English sentence and the verb hint:
 *   "I like tacos. (gustar)"
 * Parsing: split on " (" to extract english and verb separately.
 *
 * cardId convention: `spanish-16-${index}`
 *
 * prompt: { kind: 'gustar-pattern', english, verb }
 *   where english = the English sentence (without the verb hint)
 *   and verb = the gustar-class verb (e.g. "gustar", "doler")
 *
 * answer: canonical Spanish sentence
 *
 * Total: 10 cards.
 */

import type { ReviewCard } from '../../../../mastery';
import { quizItems } from '../../guides/data16';

/**
 * Parse "I like tacos. (gustar)" into { english: "I like tacos.", verb: "gustar" }.
 * Falls back to the full question string if the pattern doesn't match.
 */
function parseQuestion(q: string): { english: string; verb: string } {
  const match = q.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { english: match[1]!.trim(), verb: match[2]!.trim() };
  }
  return { english: q, verb: 'gustar' };
}

export function extract(): ReviewCard[] {
  return quizItems.map((item, i) => {
    const { english, verb } = parseQuestion(item.question);
    return {
      cardId: `spanish-16-${i}`,
      guideId: 16,
      guideSlug: 'spanish',
      kind: 'gustar-pattern' as const,
      prompt: {
        kind: 'gustar-pattern' as const,
        english,
        verb,
      },
      answer: item.answer,
      speakText: item.answer,
    };
  });
}
