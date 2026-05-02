/**
 * Smoke tests for Phase 2c + Phase 3 new prompt renderers.
 *
 * Each test asserts that PromptRenderer produces a non-null DOM node when
 * given a minimal valid PromptShape for each of the new CardKinds.
 * This catches missing switch cases and renderers that throw on mount.
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PromptRenderer } from './renderers';
import type { PromptShape } from '../../../mastery/cards';

// speakSpanish is called by ListeningRecallRenderer on mount — stub it so
// tests don't attempt Web Speech API calls in jsdom.
vi.mock('../../../utils/speech', () => ({
  speakSpanish: vi.fn(),
}));

// ---------------------------------------------------------------------------
// Minimal valid prompts — one per new Phase 2c kind
// ---------------------------------------------------------------------------

const minimalPrompts: PromptShape[] = [
  // Phase 3 (B.2) additions
  { kind: 'listening-recall', spokenForm: 'cero' },
  { kind: 'accent-discrimination', word: 'papa', questionEnglish: 'What does "papa" mean?', pairWord: 'papá', pairMeaning: 'dad' },
  // Phase 2c kinds
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
  // Phase 2c.5 additions (PR #21 cleanup)
  { kind: 'sentence-correction', wrong: 'Yo soy 25 años' },
  { kind: 'reflexive-daily-routine', english: 'to wake up' },
  { kind: 'reciprocal-translate', english: 'They greet each other.' },
];

describe('Phase 2c + Phase 3 PromptRenderer smoke tests', () => {
  it.each(minimalPrompts)('renders $kind without throwing', (prompt) => {
    const { container } = render(<PromptRenderer prompt={prompt} />);
    expect(container.firstChild).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Phase 3 renderer-specific tests
// ---------------------------------------------------------------------------

describe('Phase 3 PromptRenderer', () => {
  it('listening-recall shows "Spell what you hear" label', () => {
    const { getByText } = render(
      <PromptRenderer prompt={{ kind: 'listening-recall', spokenForm: 'cero', hint: 'Number: 0' }} />,
    );
    expect(getByText(/spell what you hear/i)).not.toBeNull();
  });

  it('listening-recall shows the hint when provided', () => {
    const { getByText } = render(
      <PromptRenderer prompt={{ kind: 'listening-recall', spokenForm: 'veinte', hint: 'Number: 20' }} />,
    );
    expect(getByText('Number: 20')).not.toBeNull();
  });

  it('accent-discrimination shows the word and question', () => {
    const { getByText } = render(
      <PromptRenderer
        prompt={{ kind: 'accent-discrimination', word: 'tú', questionEnglish: 'What does "tú" mean?', pairWord: 'tu', pairMeaning: 'your' }}
      />,
    );
    expect(getByText('tú')).not.toBeNull();
    expect(getByText(/what does "tú" mean/i)).not.toBeNull();
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

  it('renders sentence-correction with explanation hidden before reveal', () => {
    const { container, queryByText } = render(
      <PromptRenderer
        prompt={{ kind: 'sentence-correction', wrong: 'Yo soy 25 años', explanation: 'Use tener for age.' }}
        revealed={false}
      />,
    );
    expect(container.firstChild).not.toBeNull();
    expect(queryByText(/Use tener for age/)).toBeNull();
  });

  it('renders sentence-correction explanation after reveal', () => {
    const { getByText } = render(
      <PromptRenderer
        prompt={{ kind: 'sentence-correction', wrong: 'Yo soy 25 años', explanation: 'Use tener for age.' }}
        revealed={true}
      />,
    );
    expect(getByText(/Use tener for age/)).not.toBeNull();
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
