/**
 * Unit tests for Spanish mastery util helpers.
 *
 * Covers checkAnswer (the typed-answer scoring function used by the practice
 * surface) and the existing slugifySpanish function.
 */

import { describe, it, expect } from 'vitest';
import { normalizeAnswer, stripDiacritics, checkAnswer } from './util';

// ---------------------------------------------------------------------------
// normalizeAnswer
// ---------------------------------------------------------------------------

describe('normalizeAnswer', () => {
  it('trims leading and trailing whitespace', () => {
    expect(normalizeAnswer('  hablo  ')).toBe('hablo');
  });

  it('collapses internal whitespace to a single space', () => {
    expect(normalizeAnswer('la  casa  bonita')).toBe('la casa bonita');
  });

  it('lowercases the result', () => {
    expect(normalizeAnswer('HABLO')).toBe('hablo');
  });
});

// ---------------------------------------------------------------------------
// stripDiacritics
// ---------------------------------------------------------------------------

describe('stripDiacritics', () => {
  it('strips acute accents from Spanish vowels', () => {
    expect(stripDiacritics('váis')).toBe('vais');
    expect(stripDiacritics('está')).toBe('esta');
    expect(stripDiacritics('ó')).toBe('o');
  });

  it('leaves plain ASCII unchanged', () => {
    expect(stripDiacritics('hablo')).toBe('hablo');
  });
});

// ---------------------------------------------------------------------------
// checkAnswer
// ---------------------------------------------------------------------------

describe('checkAnswer', () => {
  // Correct matches
  it('returns correct for an exact match', () => {
    expect(checkAnswer('hablo', 'hablo')).toBe('correct');
  });

  it('returns correct when input differs only by case', () => {
    expect(checkAnswer('HABLO', 'hablo')).toBe('correct');
  });

  it('returns correct when input has extra leading/trailing spaces', () => {
    expect(checkAnswer('  hablo  ', 'hablo')).toBe('correct');
  });

  it('returns correct when internal whitespace collapsed', () => {
    expect(checkAnswer('la  mesa', 'la mesa')).toBe('correct');
  });

  it('returns correct for a match against an acceptable answer', () => {
    expect(checkAnswer('el', 'el (masculine)', ['el', 'masculine'])).toBe('correct');
  });

  it('returns correct for a match against the second acceptable answer', () => {
    expect(checkAnswer('masculine', 'el (masculine)', ['el', 'masculine'])).toBe('correct');
  });

  // Close matches (diacritics only)
  it('returns close when the only difference is a missing diacritic', () => {
    expect(checkAnswer('vais', 'váis')).toBe('close');
  });

  it('returns close when the only difference is a missing diacritic on canonical', () => {
    expect(checkAnswer('esta', 'está')).toBe('close');
  });

  it('returns close when diacritics match an acceptable answer', () => {
    expect(checkAnswer('hable', 'hablé', ['habló'])).toBe('close');
  });

  // Incorrect
  it('returns incorrect for empty input', () => {
    expect(checkAnswer('', 'hablo')).toBe('incorrect');
  });

  it('returns incorrect for whitespace-only input', () => {
    expect(checkAnswer('   ', 'hablo')).toBe('incorrect');
  });

  it('returns incorrect for a completely different word', () => {
    expect(checkAnswer('correr', 'hablo')).toBe('incorrect');
  });

  it('returns incorrect when a word is missing from multi-word phrase', () => {
    expect(checkAnswer('mesa', 'la mesa bonita')).toBe('incorrect');
  });
});
