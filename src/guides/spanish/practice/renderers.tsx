/**
 * Per-kind prompt renderers for the Spanish practice surface.
 *
 * Each exported function receives a narrowed PromptShape variant and returns
 * JSX. Discrimination is done in the parent via a switch on `prompt.kind`;
 * no `as` casts are needed here since each function already has the correct
 * narrowed type.
 *
 * The PromptRenderer component at the bottom is the single dispatch entry-point
 * for the practice page.
 */

import type { ReactElement, CSSProperties } from 'react';
import type { PromptShape } from '../../../mastery/cards';

// ---------------------------------------------------------------------------
// Shared style constants
// ---------------------------------------------------------------------------

const LARGE_GLYPH: CSSProperties = {
  fontSize: 72,
  fontWeight: 800,
  lineHeight: 1.1,
  color: '#1a1a1a',
  textAlign: 'center',
  margin: '0 0 8px',
  fontFamily: 'Georgia, serif',
};

const PROMPT_LABEL: CSSProperties = {
  fontSize: 14,
  color: '#888',
  textTransform: 'uppercase' as const,
  letterSpacing: 1.5,
  marginBottom: 8,
  fontWeight: 600,
};

const CONTEXT_TEXT: CSSProperties = {
  fontSize: 14,
  color: '#666',
  marginTop: 8,
  lineHeight: 1.5,
};

const WORD_DISPLAY: CSSProperties = {
  fontSize: 48,
  fontWeight: 700,
  color: '#1a1a1a',
  textAlign: 'center',
  margin: '0 0 8px',
  fontFamily: 'Georgia, serif',
  letterSpacing: 1,
};

// ---------------------------------------------------------------------------
// letter-sound
// ---------------------------------------------------------------------------

export function LetterSoundRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'letter-sound' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>What sound does this letter make?</div>
      <div style={LARGE_GLYPH}>{prompt.letter}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// word-stress
// ---------------------------------------------------------------------------

export function WordStressRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'word-stress' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Where is the stress?</div>
      <div style={WORD_DISPLAY}>{prompt.word}</div>
      <div style={CONTEXT_TEXT}>Which syllable is stressed?</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// verb-conjugation
// ---------------------------------------------------------------------------

export function VerbConjugationRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'verb-conjugation' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Conjugate in present tense</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
        {prompt.verb}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', marginBottom: 16, fontStyle: 'italic' }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5f5f5', borderRadius: 10, padding: '8px 20px' }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#C62828' }}>{prompt.pronoun}</span>
        <span style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// verb-conjugation-stem-change
// ---------------------------------------------------------------------------

export function VerbConjugationStemChangeRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'verb-conjugation-stem-change' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Conjugate (stem-change verb)</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
        {prompt.verb}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', marginBottom: 12, fontStyle: 'italic' }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff3e0', borderRadius: 10, padding: '8px 20px', border: '1px solid #ffcc80', marginBottom: 10 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#E65100' }}>{prompt.pronoun}</span>
        <span style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</span>
      </div>
      <div style={{ fontSize: 12, color: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <span>&#9670;</span>
        <span>Stem may change</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// noun-gender
// ---------------------------------------------------------------------------

export function NounGenderRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'noun-gender' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Masculine or feminine?</div>
      <div style={{ fontSize: 40, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
        {prompt.noun}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', fontStyle: 'italic', marginBottom: 16 }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: '8px 24px', fontSize: 22, fontWeight: 700, color: '#1565C0' }}>el</div>
        <div style={{ background: '#fce4ec', borderRadius: 10, padding: '8px 24px', fontSize: 22, fontWeight: 700, color: '#AD1457' }}>la</div>
      </div>
      <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>Think first, then show the answer</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// noun-plural
// ---------------------------------------------------------------------------

export function NounPluralRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'noun-plural' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Make it plural</div>
      <div style={{ fontSize: 40, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
        {prompt.singular}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', fontStyle: 'italic', marginBottom: 12 }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// noun-adj-agreement
// ---------------------------------------------------------------------------

export function NounAdjAgreementRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'noun-adj-agreement' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Adjective agreement</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a' }}>{prompt.noun}</span>
        <span style={{ fontSize: 18, color: '#bbb' }}>+</span>
        <span style={{ fontSize: 28, fontWeight: 700, color: '#AD1457' }}>{prompt.adjective}</span>
        <span style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</span>
      </div>
      {(prompt.nounMeaning ?? prompt.adjectiveMeaning) && (
        <div style={CONTEXT_TEXT}>
          {prompt.nounMeaning && <span>{prompt.noun} = {prompt.nounMeaning}</span>}
          {prompt.nounMeaning && prompt.adjectiveMeaning && <span style={{ margin: '0 6px', color: '#ccc' }}>·</span>}
          {prompt.adjectiveMeaning && <span>{prompt.adjective} = {prompt.adjectiveMeaning}</span>}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// english-to-pronoun
// ---------------------------------------------------------------------------

export function EnglishToPronounRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'english-to-pronoun' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spanish pronoun?</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 320, margin: '0 auto 8px' }}>
        {prompt.english}
      </div>
      <div style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ser-vs-estar
// ---------------------------------------------------------------------------

export function SerVsEstarRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'ser-vs-estar' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Ser or estar?</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 340, margin: '0 auto 12px', fontStyle: 'italic' }}>
        {prompt.sentence}
      </div>
      {prompt.context && (
        <div style={{ fontSize: 13, color: '#888', maxWidth: 300, margin: '0 auto', lineHeight: 1.5 }}>
          {prompt.context}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#2E7D32' }}>ser</div>
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#1565C0' }}>estar</div>
      </div>
      <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>Think first, then show the answer</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dispatch — single entry-point for the practice page
// ---------------------------------------------------------------------------

export function PromptRenderer({ prompt }: { prompt: PromptShape }): ReactElement {
  switch (prompt.kind) {
    case 'letter-sound':
      return <LetterSoundRenderer prompt={prompt} />;
    case 'word-stress':
      return <WordStressRenderer prompt={prompt} />;
    case 'verb-conjugation':
      return <VerbConjugationRenderer prompt={prompt} />;
    case 'verb-conjugation-stem-change':
      return <VerbConjugationStemChangeRenderer prompt={prompt} />;
    case 'noun-gender':
      return <NounGenderRenderer prompt={prompt} />;
    case 'noun-plural':
      return <NounPluralRenderer prompt={prompt} />;
    case 'noun-adj-agreement':
      return <NounAdjAgreementRenderer prompt={prompt} />;
    case 'english-to-pronoun':
      return <EnglishToPronounRenderer prompt={prompt} />;
    case 'ser-vs-estar':
      return <SerVsEstarRenderer prompt={prompt} />;
  }
}
