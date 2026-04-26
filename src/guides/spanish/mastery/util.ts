/**
 * Shared utilities for Spanish mastery extractors and the practice surface.
 *
 * `slugifySpanish` is the common-case slugifier: lowercases, collapses spaces
 * to hyphens, and maps Spanish vowels with diacritics to their ASCII
 * equivalents. It is used in any extractor where card IDs are derived from
 * Spanish noun or adjective text.
 *
 * `normalizeAnswer`, `stripDiacritics`, and `checkAnswer` are used by the
 * typed-answer flow in the practice surface to score user input against the
 * canonical answer and acceptable alternates.
 *
 * Extractors with meaningfully different requirements (guide14 strips ALL
 * non-ASCII; guide17 also handles ñ/ü and caps at 40 chars) keep their own
 * local helpers rather than forcing a one-size-fits-all function that would
 * need to be parametrised anyway.
 */

const DIACRITIC_MAP: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
};

// ---------------------------------------------------------------------------
// Answer-matching utilities (used by the practice surface)
// ---------------------------------------------------------------------------

/**
 * Normalise a typed answer for comparison: trim whitespace, collapse
 * internal runs to a single space, and lowercase.
 */
export function normalizeAnswer(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Strip Unicode combining diacritics (U+0300–U+036F) after NFD decomposition.
 * Used to detect "close" answers that differ only in accent marks.
 */
export function stripDiacritics(input: string): string {
  return input.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Result categories for a typed answer. */
export type AnswerMatch = 'correct' | 'close' | 'incorrect';

/**
 * Compare a typed answer against the canonical answer and any acceptable
 * alternates. Returns:
 *   'correct'   — exact normalised match (case- and whitespace-insensitive)
 *   'close'     — only differs by diacritics from any candidate
 *   'incorrect' — anything else (including empty input)
 */
export function checkAnswer(
  typed: string,
  canonical: string,
  acceptable: readonly string[] = [],
): AnswerMatch {
  const typedN = normalizeAnswer(typed);
  if (typedN === '') return 'incorrect';

  const candidates = [canonical, ...acceptable].map(normalizeAnswer);
  if (candidates.some(c => c === typedN)) return 'correct';

  const typedStripped = stripDiacritics(typedN);
  if (candidates.some(c => stripDiacritics(c) === typedStripped)) return 'close';

  return 'incorrect';
}

/**
 * Convert a Spanish word or short phrase into a slug safe for use in a
 * card ID. Handles the five vowels-with-acute that appear in common Spanish
 * nouns and adjectives.
 *
 * Extra separator characters can be allowed through via the optional
 * `extraChars` regex character class fragment (e.g. `'/'` to allow slashes
 * through as hyphens in guide13 adjective forms like "masc/fem").
 */
export function slugifySpanish(s: string, extraChars?: string): string {
  let result = s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áéíóú]/g, c => DIACRITIC_MAP[c] ?? c);

  if (extraChars) {
    // Replace each specified extra char with a hyphen before stripping unknowns
    result = result.replace(new RegExp(`[${extraChars}]`, 'g'), '-');
  }

  return result;
}
