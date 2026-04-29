/**
 * Extractor — listening-recall cards.
 *
 * listening-recall cards present a Spanish word/phrase purely as audio.
 * The learner hears the spoken form and types the Spanish spelling.
 *
 * Three data sources:
 *   guide23 numbers:   28 cardinal numbers (0–1,000,000)
 *   guide23 ordinals:  10 ordinal numbers (1º–10º)
 *   guide27 weather:   14 weather expressions
 *   guide11 nouns:     12 noun-gender quiz nouns (spelling recall)
 *
 * Total: 64 cards.
 *
 * cardId convention:
 *   `spanish-lr-numbers-${n}`    — cardinal number
 *   `spanish-lr-ordinals-${ord}` — ordinal symbol slug
 *   `spanish-lr-weather-${slug}` — weather expression slug
 *   `spanish-lr-noun-${slug}`    — noun slug
 *
 * prompt: { kind: 'listening-recall', spokenForm, hint? }
 * answer: Spanish spelling
 * speakText = spokenForm (the spoken utterance; needed for auto-play on mount)
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { numbers, ordinals } from '../../guides/data23';
import { weatherExpr } from '../../guides/data27';
import { quizItems } from '../../guides/data11';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30);
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // Cardinal numbers (0–1,000,000)
  for (const entry of numbers) {
    cards.push({
      cardId: `spanish-lr-numbers-${entry.n}`,
      guideId: 23,
      guideSlug: 'spanish',
      kind: 'listening-recall',
      prompt: {
        kind: 'listening-recall',
        spokenForm: entry.sp,
        hint: `Number: ${entry.n}`,
      },
      answer: entry.sp,
      speakText: entry.sp,
    });
  }

  // Ordinal numbers (1º–10º)
  for (const entry of ordinals) {
    // ordinals use "primero/a" slash form — canonical answer includes both forms;
    // acceptableAnswers include the masculine and feminine forms separately.
    // e.g. "primero/a" → masculine "primero", feminine "primera"
    const masculine = entry.sp.split('/')[0]!; // "primero"
    const feminine = entry.sp.replace(/o\/a$/, 'a'); // "primera"
    cards.push({
      cardId: `spanish-lr-ordinals-${slugify(entry.ord)}`,
      guideId: 23,
      guideSlug: 'spanish',
      kind: 'listening-recall',
      prompt: {
        kind: 'listening-recall',
        spokenForm: masculine,
        hint: `Ordinal: ${entry.ord}`,
      },
      answer: entry.sp,
      acceptableAnswers: [masculine, feminine],
      speakText: masculine,
    });
  }

  // Weather expressions
  for (const entry of weatherExpr) {
    cards.push({
      cardId: `spanish-lr-weather-${slugify(entry.expr)}`,
      guideId: 27,
      guideSlug: 'spanish',
      kind: 'listening-recall',
      prompt: {
        kind: 'listening-recall',
        spokenForm: entry.expr,
        hint: `Weather: ${entry.eng}`,
      },
      answer: entry.expr,
      speakText: entry.expr,
    });
  }

  // Noun spelling recall from guide 11 quiz items
  for (const item of quizItems) {
    cards.push({
      cardId: `spanish-lr-noun-${slugify(item.noun)}`,
      guideId: 11,
      guideSlug: 'spanish',
      kind: 'listening-recall',
      prompt: {
        kind: 'listening-recall',
        spokenForm: item.noun,
        hint: 'Spell the noun you hear',
      },
      answer: item.noun,
      speakText: item.noun,
    });
  }

  return cards;
}
