/**
 * Extractor — Guide 2: Acentos (word-stress cards).
 *
 * Two card sources:
 *
 * 1. Stress-rule examples: each example word becomes a card.
 *    prompt: the bare word (dots stripped)
 *    answer: "{RuleName} — stress on {syllable}, {accent rule}"
 *    The stressed syllable is identified by its zero-based index `s` and
 *    the word split on `·`.
 *
 * 2. Minimal pairs: each pair produces one card testing the accented form.
 *    prompt: the unaccented word with its plain meaning
 *    answer: the accented form and its meaning
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { stressRules, minPairs } from '../../guides/data2';

/** Strip syllable separator dots and return a safe cardId segment. */
function wordSlug(word: string): string {
  return word
    .replace(/·/g, '')
    .toLowerCase()
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // Stress-rule examples
  for (const rule of stressRules) {
    for (const ex of rule.examples) {
      const bare = ex.word.replace(/·/g, '');
      const syllables = ex.word.split('·');
      const stressedSyl = syllables[ex.s] ?? '';
      const accentNote = ex.a
        ? 'has written accent mark'
        : 'no written accent (follows default rule)';
      const answer = `${rule.name}: stress on "${stressedSyl}" — ${accentNote}`;
      const slug = `${rule.id}-${wordSlug(ex.word)}`;

      cards.push({
        cardId: `spanish-2-stress-${slug}`,
        guideId: 2,
        guideSlug: 'spanish',
        kind: 'word-stress',
        prompt: { kind: 'word-stress', word: bare },
        answer,
        speakText: bare,
      });
    }
  }

  // Minimal pairs — test the accent-bearing word
  for (const pair of minPairs) {
    const slug = wordSlug(pair.w2);
    cards.push({
      cardId: `spanish-2-minpair-${slug}`,
      guideId: 2,
      guideSlug: 'spanish',
      kind: 'word-stress',
      prompt: { kind: 'word-stress', word: `${pair.w1} (${pair.m1}) vs ___ (${pair.m2})` },
      answer: pair.w2,
      acceptableAnswers: [`${pair.w2} — ${pair.m2}`],
      speakText: pair.w2,
    });
  }

  return cards;
}
