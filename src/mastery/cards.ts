/**
 * ReviewCard types — the content-side of the mastery layer.
 *
 * Each card kind has a narrowed PromptShape so the practice UI can
 * discriminate on `prompt.kind` and render the appropriate widget.
 * `card.kind === card.prompt.kind` is enforced by the type system.
 *
 * These types are intentionally separate from the scheduling-state types
 * in `types.ts`. A `ReviewCard` describes *what* to ask; a `CardState`
 * describes *when* to ask it next and how well the learner knows it.
 */

// ---------------------------------------------------------------------------
// Card kinds
// ---------------------------------------------------------------------------

export type CardKind =
  | 'letter-sound'
  | 'word-stress'
  | 'verb-conjugation'
  | 'verb-conjugation-stem-change'
  | 'noun-gender'
  | 'noun-plural'
  | 'noun-adj-agreement'
  | 'english-to-pronoun'
  | 'ser-vs-estar'
  // Phase 2c additions
  | 'verb-spelling-change'
  | 'verb-conjugation-tensed'
  | 'gustar-pattern'
  | 'por-vs-para'
  | 'verb-prep-pair'
  | 'question-word'
  | 'negation-translate'
  | 'comparative-irregular'
  | 'number-spell'
  | 'tu-vs-usted'
  | 'false-cognate'
  | 'weather-expression'
  | 'imperative-tu'
  | 'reflexive-meaning-change'
  | 'idiom-meaning'
  // Phase 2c.5 additions (PR #21 cleanup)
  | 'sentence-correction'
  | 'reflexive-daily-routine'
  | 'reciprocal-translate'
  // Phase 3 (B.2) additions
  | 'listening-recall'
  | 'accent-discrimination';

// ---------------------------------------------------------------------------
// Phase 2c: Tense key union for verb-conjugation-tensed
// ---------------------------------------------------------------------------

export type TensedConjugationTense =
  | 'preterite'
  | 'imperfect'
  | 'future'
  | 'conditional'
  | 'present-perfect'
  | 'pluperfect'
  | 'present-subjunctive'
  | 'past-subjunctive'
  | 'present-perfect-subjunctive';

// ---------------------------------------------------------------------------
// Prompt shapes — one per kind, discriminated on `kind`
// ---------------------------------------------------------------------------

export type PromptShape =
  | { kind: 'letter-sound'; letter: string }
  | { kind: 'word-stress'; word: string }
  | { kind: 'verb-conjugation'; verb: string; pronoun: string; meaning?: string }
  | { kind: 'verb-conjugation-stem-change'; verb: string; pronoun: string; meaning?: string }
  | { kind: 'noun-gender'; noun: string; meaning?: string }
  | { kind: 'noun-plural'; singular: string; meaning?: string }
  | { kind: 'noun-adj-agreement'; noun: string; adjective: string; nounMeaning?: string; adjectiveMeaning?: string }
  | { kind: 'english-to-pronoun'; english: string }
  | { kind: 'ser-vs-estar'; sentence: string; context?: string }
  // Phase 2c additions
  | { kind: 'verb-spelling-change'; infinitive: string; target: string; meaning?: string }
  | { kind: 'verb-conjugation-tensed'; verb: string; pronoun: string; tense: TensedConjugationTense; meaning?: string }
  | { kind: 'gustar-pattern'; english: string; verb: string }
  | { kind: 'por-vs-para'; sentence: string; reason?: string }
  | { kind: 'verb-prep-pair'; verb: string; meaning: string }
  | { kind: 'question-word'; sentence: string; englishMeaning: string }
  | { kind: 'negation-translate'; english: string }
  | { kind: 'comparative-irregular'; positive: string; meaning: string }
  | { kind: 'number-spell'; numeric: string }
  | { kind: 'tu-vs-usted'; situation: string; reason?: string }
  | { kind: 'false-cognate'; spanish: string; falseFriend: string }
  | { kind: 'weather-expression'; english: string; icon: string }
  | { kind: 'imperative-tu'; verb: string; polarity: 'affirmative' | 'negative'; meaning?: string }
  | { kind: 'reflexive-meaning-change'; reflexive: string; baseVerb: string; baseMeaning: string }
  | { kind: 'idiom-meaning'; idiom: string; literal: string }
  // Phase 2c.5 additions (PR #21 cleanup)
  | { kind: 'sentence-correction'; wrong: string; explanation?: string }
  | { kind: 'reflexive-daily-routine'; english: string }
  | { kind: 'reciprocal-translate'; english: string }
  // Phase 3 (B.2) additions
  | { kind: 'listening-recall'; spokenForm: string; hint?: string }
  | { kind: 'accent-discrimination'; word: string; questionEnglish: string; pairWord: string; pairMeaning: string };

// ---------------------------------------------------------------------------
// ReviewCard — combines content (prompt/answer) with identity fields
// ---------------------------------------------------------------------------

export interface ReviewCard {
  /** Stable, unique across all guides — format: `${guideSlug}-${guideId}-${descriptor}` */
  cardId: string;
  /** Guide number (matches guidesMeta id) for grouping and filtering. */
  guideId: number;
  /** Collection slug, e.g. "spanish". */
  guideSlug: string;
  /** Discriminator — must match `prompt.kind`. */
  kind: CardKind;
  /** Prompt shape narrowed to match `kind`. */
  prompt: PromptShape;
  /** Canonical correct answer string shown to the learner. */
  answer: string;
  /** Optional alternate forms accepted as correct. */
  acceptableAnswers?: string[];
  /** Text passed to the language's speak function (e.g. speakSpanish). */
  speakText?: string;
}
