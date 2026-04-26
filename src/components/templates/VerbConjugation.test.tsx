import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VerbConjugation } from './VerbConjugation';

const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos'];
const stem = 'habl';
const endings = ['o', 'as', 'a', 'amos', 'áis', 'an'];

describe('VerbConjugation — full Card mode', () => {
  it('renders the verb infinitive as the Card title', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={endings}
        verb="hablar"
        meaning="to speak"
        color="#D84315"
      />
    );
    expect(screen.getByText('hablar')).toBeInTheDocument();
  });

  it('renders the meaning as subtitle', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={endings}
        verb="hablar"
        meaning="to speak"
        color="#D84315"
      />
    );
    expect(screen.getByText('to speak')).toBeInTheDocument();
  });

  it('renders all pronouns', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={endings}
        verb="hablar"
        meaning="to speak"
        color="#D84315"
      />
    );
    pronouns.forEach(p => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });

  it('renders all endings', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={endings}
        verb="hablar"
        meaning="to speak"
        color="#D84315"
      />
    );
    endings.forEach(e => {
      expect(screen.getByText(e)).toBeInTheDocument();
    });
  });

  it('renders the stem for each row', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={endings}
        verb="hablar"
        meaning="to speak"
        color="#D84315"
      />
    );
    // Stem appears once per pronoun row
    const stemEls = screen.getAllByText('habl');
    expect(stemEls.length).toBe(pronouns.length);
  });
});

describe('VerbConjugation — compact mode', () => {
  it('renders the title instead of verb+meaning in compact mode', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={['é', 'aste', 'ó', 'amos', 'asteis', 'aron']}
        title="Pretérito"
        color="#B71C1C"
        compact
      />
    );
    expect(screen.getByText('Pretérito')).toBeInTheDocument();
  });

  it('renders all pronouns in compact mode', () => {
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={['é', 'aste', 'ó', 'amos', 'asteis', 'aron']}
        title="Pretérito"
        color="#B71C1C"
        compact
      />
    );
    pronouns.forEach(p => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });

  it('renders all preterite endings in compact mode', () => {
    const pretEndings = ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'];
    render(
      <VerbConjugation
        pronouns={pronouns}
        stem={stem}
        endings={pretEndings}
        title="Pretérito"
        color="#B71C1C"
        compact
      />
    );
    pretEndings.forEach(e => {
      expect(screen.getByText(e)).toBeInTheDocument();
    });
  });
});
