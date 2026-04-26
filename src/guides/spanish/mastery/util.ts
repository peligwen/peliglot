/**
 * Shared utilities for Spanish mastery extractors.
 *
 * `slugifySpanish` is the common-case slugifier: lowercases, collapses spaces
 * to hyphens, and maps Spanish vowels with diacritics to their ASCII
 * equivalents. It is used in any extractor where card IDs are derived from
 * Spanish noun or adjective text.
 *
 * Extractors with meaningfully different requirements (guide14 strips ALL
 * non-ASCII; guide17 also handles ñ/ü and caps at 40 chars) keep their own
 * local helpers rather than forcing a one-size-fits-all function that would
 * need to be parametrised anyway.
 */

const DIACRITIC_MAP: Record<string, string> = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
};

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
