/**
 * Smoke tests for Phase 2c new prompt renderers.
 *
 * Each test asserts that PromptRenderer produces a non-null DOM node when
 * given a minimal valid PromptShape for each of the 15 new CardKinds.
 * This catches missing switch cases and renderers that throw on mount.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PromptRenderer } from './renderers';
import type { PromptShape } from '../../../mastery/cards';

// ---------------------------------------------------------------------------
// Minimal valid prompts — one per new Phase 2c kind
// ---------------------------------------------------------------------------

const minimalPrompts: PromptShape[] = [
  { kind: 'verb-spelling-change', infinitive: 'buscar', target: 'preterite yo' },
  { kind: 'verb-conjugation-tensed', verb: 'hablar', pronoun: 'yo', tense: 'preterite' },
  { kind: 'gustar-pattern', english: 'I like tacos.', verb: 'gustar' },
  { kind: 'por-vs-para', sentence: 'Compré flores ___ ti.' },
  { kind: 'verb-prep-pair', verb: 'empezar', meaning: 'to begin' },
  { kind: 'question-word', sentence: '___ es tu nombre?', englishMeaning: 'What is your name?' },
  { kind: 'negation-translate', english: "I don't know anything." },
  { kind: 'comparative-irregular', positive: 'bueno', meaning: 'good' },
  { kind: 'number-spell', numeric: '47' },
  { kind: 'tu-vs-usted', situation: 'Talking to your professor.' },
  { kind: 'false-cognate', spanish: 'embarazada', falseFriend: 'embarrassed' },
  { kind: 'weather-expression', english: "It's hot.", icon: '☀️' },
  { kind: 'imperative-tu', verb: 'hablar', polarity: 'affirmative' },
  { kind: 'reflexive-meaning-change', reflexive: 'irse', baseVerb: 'ir', baseMeaning: 'to go' },
  { kind: 'idiom-meaning', idiom: 'meter la pata', literal: 'to put the leg in' },
];

describe('Phase 2c PromptRenderer smoke tests', () => {
  it.each(minimalPrompts)('renders $kind without throwing', (prompt) => {
    const { container } = render(<PromptRenderer prompt={prompt} />);
    expect(container.firstChild).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Optional field smoke tests — verify optional fields don't break rendering
// ---------------------------------------------------------------------------

describe('Phase 2c PromptRenderer — optional fields', () => {
  it('renders verb-spelling-change with meaning', () => {
    const { container } = render(
      <PromptRenderer
        prompt={{ kind: 'verb-spelling-change', infinitive: 'buscar', target: 'preterite yo', meaning: 'to search' }}
      />,
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('renders verb-conjugation-tensed with meaning', () => {
    const { container } = render(
      <PromptRenderer
        prompt={{ kind: 'verb-conjugation-tensed', verb: 'ser', pronoun: 'ellos', tense: 'imperfect', meaning: 'to be' }}
      />,
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('renders por-vs-para with reason (hidden before reveal)', () => {
    const { container, queryByText } = render(
      <PromptRenderer
        prompt={{ kind: 'por-vs-para', sentence: 'Gracias ___ todo.', reason: 'expressing gratitude' }}
        revealed={false}
      />,
    );
    expect(container.firstChild).not.toBeNull();
    expect(queryByText(/expressing gratitude/)).toBeNull();
  });

  it('renders por-vs-para reason after reveal', () => {
    const { getByText } = render(
      <PromptRenderer
        prompt={{ kind: 'por-vs-para', sentence: 'Gracias ___ todo.', reason: 'expressing gratitude' }}
        revealed={true}
      />,
    );
    expect(getByText(/expressing gratitude/)).not.toBeNull();
  });

  it('renders tu-vs-usted with reason (hidden before reveal)', () => {
    const { container, queryByText } = render(
      <PromptRenderer
        prompt={{ kind: 'tu-vs-usted', situation: 'Talking to your boss.', reason: 'formal context' }}
        revealed={false}
      />,
    );
    expect(container.firstChild).not.toBeNull();
    expect(queryByText(/formal context/)).toBeNull();
  });

  it('renders tu-vs-usted reason after reveal', () => {
    const { getByText } = render(
      <PromptRenderer
        prompt={{ kind: 'tu-vs-usted', situation: 'Talking to your boss.', reason: 'formal context' }}
        revealed={true}
      />,
    );
    expect(getByText(/formal context/)).not.toBeNull();
  });

  it('renders imperative-tu negative polarity with meaning', () => {
    const { container } = render(
      <PromptRenderer
        prompt={{ kind: 'imperative-tu', verb: 'decir', polarity: 'negative', meaning: 'to say' }}
      />,
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('renders all TensedConjugationTense values without throwing', () => {
    const tenses = [
      'preterite', 'imperfect', 'future', 'conditional',
      'present-perfect', 'pluperfect', 'present-subjunctive',
      'past-subjunctive', 'present-perfect-subjunctive',
    ] as const;
    for (const tense of tenses) {
      const { container } = render(
        <PromptRenderer
          prompt={{ kind: 'verb-conjugation-tensed', verb: 'hablar', pronoun: 'tú', tense }}
        />,
      );
      expect(container.firstChild).not.toBeNull();
    }
  });
});
