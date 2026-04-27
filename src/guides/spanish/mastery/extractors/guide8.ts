/**
 * Extractor — Guide 8: Tiempos Perfectos (verb-conjugation-tensed cards).
 *
 * Three high-frequency tenses × 6 pronouns = 18 cards.
 *   - present-perfect (pp):             he hablado, has hablado, …
 *   - pluperfect (plup):                había hablado, habías hablado, …
 *   - present-perfect-subjunctive (ppS):haya hablado, hayas hablado, …
 *
 * The low-frequency tenses (futP, condP, plupS) are intentionally deferred.
 * Add them when the guide gains dedicated practice content for those forms.
 *
 * Canonical model verb: hablar (participle: hablado).
 * The prompt asks "conjugate hablar in [tense], [pronoun]".
 * The answer is the full compound form: "<haber form> hablado".
 */

import type { ReviewCard, TensedConjugationTense } from '../../../../mastery';
import { haberForms, pronouns6 } from '../../guides/data8';

const VERB = 'hablar';
const MEANING = 'to speak';
const PARTICIPLE = 'hablado';

function pronounSlug(p: string): string {
  return p.toLowerCase()
    .replace(/\//g, '-').replace(/\./g, '').replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' }[c] ?? c));
}

type HighFreqKey = 'pp' | 'plup' | 'ppS';

const HIGH_FREQ_TENSES: { key: HighFreqKey; tense: TensedConjugationTense }[] = [
  { key: 'pp',   tense: 'present-perfect' },
  { key: 'plup', tense: 'pluperfect' },
  { key: 'ppS',  tense: 'present-perfect-subjunctive' },
];

export function extract(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const { key, tense } of HIGH_FREQ_TENSES) {
    const entry = haberForms[key];
    for (let i = 0; i < pronouns6.length; i++) {
      const pronoun = pronouns6[i]!;
      const haberForm = entry.f[i]!;
      const form = `${haberForm} ${PARTICIPLE}`;
      cards.push({
        cardId: `spanish-8-${key}-${VERB}-${pronounSlug(pronoun)}`,
        guideId: 8,
        guideSlug: 'spanish',
        kind: 'verb-conjugation-tensed',
        prompt: {
          kind: 'verb-conjugation-tensed',
          verb: VERB,
          pronoun,
          tense,
          meaning: MEANING,
        },
        answer: form,
        speakText: form,
      });
    }
  }

  return cards;
}
