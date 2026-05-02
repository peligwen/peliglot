/**
 * Extractor — accent-discrimination cards.
 *
 * Each card presents ONE word from a minimal pair and asks for its meaning.
 * The canonical distractor pool always includes the partner word's meaning,
 * ensuring the card tests accent discrimination (not random vocabulary).
 *
 * Source: guide2 minPairs — 6 pairs × 2 directions = 12 cards.
 *
 * PromptShape: { kind: 'accent-discrimination', word, questionEnglish,
 *               pairWord, pairMeaning }
 *   word            — the Spanish word displayed (and spoken)
 *   questionEnglish — the English question label (e.g. "What does 'papa' mean?")
 *   pairWord        — the partner word from the minimal pair
 *   pairMeaning     — the partner word's English meaning (required distractor)
 *
 * answer: English meaning of `word`
 * speakText: `word` (so KINDS_AUTO_PLAY_ON_REVEAL speaks it on reveal)
 *
 * cardId convention: `spanish-ad-${word-slug}` (stable — derived from word text)
 *
 * MCQ distractors: the practice surface always includes `pairMeaning` as a
 * distractor (via the PromptShape). The getMcqOptions fallback still fills
 * the remaining slots from other accent-discrimination cards' answers.
 * See renderers.tsx AccentDiscriminationRenderer for the option-building logic.
 *
 * NOTE: 12 cards is a small pool; getMcqOptions will fall back to 2-option MCQ
 * for cards whose partner is the only other available distractor answer. The
 * partner-aware renderer guarantees pedagogically correct 2-option presentation
 * even in that case — testing accent recognition, not broad vocabulary.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { minPairs } from '../../guides/data2';

function wordSlug(w: string): string {
  return w
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20);
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const pair of minPairs) {
    // Card for w1 (unaccented)
    cards.push({
      cardId: `spanish-ad-${wordSlug(pair.w1)}`,
      guideId: 2,
      guideSlug: 'spanish',
      kind: 'accent-discrimination',
      prompt: {
        kind: 'accent-discrimination',
        word: pair.w1,
        questionEnglish: `What does "${pair.w1}" mean?`,
        pairWord: pair.w2,
        pairMeaning: pair.m2,
      },
      answer: pair.m1,
      speakText: pair.w1,
    });

    // Card for w2 (accented)
    cards.push({
      cardId: `spanish-ad-${wordSlug(pair.w2)}`,
      guideId: 2,
      guideSlug: 'spanish',
      kind: 'accent-discrimination',
      prompt: {
        kind: 'accent-discrimination',
        word: pair.w2,
        questionEnglish: `What does "${pair.w2}" mean?`,
        pairWord: pair.w1,
        pairMeaning: pair.m1,
      },
      answer: pair.m2,
      speakText: pair.w2,
    });
  }

  return cards;
}
