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
  | 'ser-vs-estar';

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
  | { kind: 'ser-vs-estar'; sentence: string; context?: string };

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
