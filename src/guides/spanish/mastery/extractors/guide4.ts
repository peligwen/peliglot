/**
 * Extractor — Guide 4: Presente Indicativo (verb-conjugation cards).
 *
 * Two card sources:
 *
 * 1. Regular conjugations: 3 verbs (hablar, comer, vivir) × 6 pronouns = 18 cards.
 *    The conjugated form is stem + ending from presentData.
 *
 * 2. Irregular verbs: 8 verbs × 6 pronouns = 48 cards.
 *    Forms are stored directly in `irregulars[].forms`.
 *
 * Total: 66 cards.
 */

import type { ReviewCard } from '../../../../mastery/cards';
import { presentData, irregulars, pronouns6 } from '../../guides/data4';

/** Slugify a verb name for use in cardId. */
function verbSlug(verb: string): string {
  return verb
    .toLowerCase()
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

/** Slugify a pronoun for use in cardId. */
function pronounSlug(p: string): string {
  return p
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  // Regular -ar / -er / -ir verbs
  for (const [, entry] of Object.entries(presentData)) {
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const form = entry.stem + entry.endings[i]!;
      cards.push({
        cardId: `spanish-4-reg-${verbSlug(entry.verb)}-${pronounSlug(pronoun)}`,
        guideId: 4,
        guideSlug: 'spanish',
        kind: 'verb-conjugation',
        prompt: { kind: 'verb-conjugation', verb: entry.verb, pronoun, meaning: entry.meaning },
        answer: form,
        speakText: form,
      });
    }
  }

  // Irregular verbs
  for (const irr of irregulars) {
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const form = irr.forms[i]!;
      cards.push({
        cardId: `spanish-4-irr-${verbSlug(irr.v)}-${pronounSlug(pronoun)}`,
        guideId: 4,
        guideSlug: 'spanish',
        kind: 'verb-conjugation',
        prompt: { kind: 'verb-conjugation', verb: irr.v, pronoun, meaning: irr.m },
        answer: form,
        speakText: form,
      });
    }
  }

  return cards;
}
