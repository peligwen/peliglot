/**
 * Extractor — Guide 17: Ser vs Estar (ser-vs-estar cards).
 *
 * Three card sources:
 *
 * 1. serUses (8 entries): sentence from the example → answer "ser"
 * 2. estarUses (8 entries): sentence from the example → answer "estar"
 * 3. shifts (6 entries × 2): each shift produces one ser card and one estar card
 *    using the example sentences (exS / exE).
 *
 * The full example string (Spanish sentence) is passed as `prompt.sentence`.
 * The category (e.g. "Identity / Definition") is passed as `context`.
 * The English translation (after the `—` separator) becomes `context` where
 * available.
 *
 * Total: 8 + 8 + 12 = 28 cards.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { serUses, estarUses, shifts } from '../../guides/data17';

function sentenceSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-záéíóúüñ\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[áéíóúüñ]/g, c =>
      ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n' }[c] ?? c)
    )
    .slice(0, 40);
}

/** Extract just the Spanish portion before the `—` separator. */
function spanishPart(ex: string): string {
  const idx = ex.indexOf(' — ');
  return idx >= 0 ? ex.slice(0, idx).trim() : ex.trim();
}

/** Extract just the English translation after the `—` separator. */
function englishPart(ex: string): string {
  const idx = ex.indexOf(' — ');
  return idx >= 0 ? ex.slice(idx + 3).trim() : '';
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // SER uses
  for (let i = 0; i < serUses.length; i++) {
    const use = serUses[i]!;
    const sentence = spanishPart(use.ex);
    const context = `${use.cat} — ${englishPart(use.ex)}`;
    cards.push({
      cardId: `spanish-17-ser-use-${i}-${sentenceSlug(sentence)}`,
      guideId: 17,
      guideSlug: 'spanish',
      kind: 'ser-vs-estar',
      prompt: { kind: 'ser-vs-estar', sentence, context },
      answer: 'ser',
      speakText: sentence,
    });
  }

  // ESTAR uses
  for (let i = 0; i < estarUses.length; i++) {
    const use = estarUses[i]!;
    const sentence = spanishPart(use.ex);
    const context = `${use.cat} — ${englishPart(use.ex)}`;
    cards.push({
      cardId: `spanish-17-estar-use-${i}-${sentenceSlug(sentence)}`,
      guideId: 17,
      guideSlug: 'spanish',
      kind: 'ser-vs-estar',
      prompt: { kind: 'ser-vs-estar', sentence, context },
      answer: 'estar',
      speakText: sentence,
    });
  }

  // Meaning shifts — two cards per entry (ser example + estar example)
  for (let i = 0; i < shifts.length; i++) {
    const shift = shifts[i]!;

    // Ser example
    cards.push({
      cardId: `spanish-17-shift-${i}-ser`,
      guideId: 17,
      guideSlug: 'spanish',
      kind: 'ser-vs-estar',
      prompt: {
        kind: 'ser-vs-estar',
        sentence: shift.exS,
        context: `${shift.a}: ser = ${shift.s}`,
      },
      answer: 'ser',
      speakText: shift.exS,
    });

    // Estar example
    cards.push({
      cardId: `spanish-17-shift-${i}-estar`,
      guideId: 17,
      guideSlug: 'spanish',
      kind: 'ser-vs-estar',
      prompt: {
        kind: 'ser-vs-estar',
        sentence: shift.exE,
        context: `${shift.a}: estar = ${shift.e}`,
      },
      answer: 'estar',
      speakText: shift.exE,
    });
  }

  return cards;
}
