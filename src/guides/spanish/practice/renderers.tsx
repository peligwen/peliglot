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

import { useEffect } from 'react';
import type { ReactElement, CSSProperties } from 'react';
import type { PromptShape, TensedConjugationTense } from '../../../mastery/cards';
import { speakSpanish } from '../../../utils/speech';

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
// Phase 2c renderers
// ---------------------------------------------------------------------------

// Friendly display labels for TensedConjugationTense values.
// Record<TensedConjugationTense, string> is exhaustive — TS will catch missing keys.
const TENSE_LABELS: Record<TensedConjugationTense, string> = {
  'preterite': 'Preterite',
  'imperfect': 'Imperfect',
  'future': 'Future',
  'conditional': 'Conditional',
  'present-perfect': 'Present perfect',
  'pluperfect': 'Pluperfect',
  'present-subjunctive': 'Present subjunctive',
  'past-subjunctive': 'Past subjunctive',
  'present-perfect-subjunctive': 'Present perfect subjunctive',
};

// ---------------------------------------------------------------------------
// verb-spelling-change
// ---------------------------------------------------------------------------

export function VerbSpellingChangeRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'verb-spelling-change' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spelling-change verb — conjugate</div>
      <div style={{ fontSize: 40, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.infinitive}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', marginBottom: 12, fontStyle: 'italic' }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ display: 'inline-block', background: '#fce4ec', border: '1px solid #f48fb1', borderRadius: 10, padding: '6px 18px', fontSize: 14, color: '#880E4F', fontWeight: 600 }}>
        target: {prompt.target}
      </div>
      <div style={{ ...CONTEXT_TEXT, fontSize: 12, marginTop: 10 }}>Spelling may change to preserve pronunciation</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// verb-conjugation-tensed
// ---------------------------------------------------------------------------

export function VerbConjugationTensedRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'verb-conjugation-tensed' }>;
}): ReactElement {
  const tenseLabel = TENSE_LABELS[prompt.tense] ?? prompt.tense;
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Conjugate — {tenseLabel}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
        {prompt.verb}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', marginBottom: 12, fontStyle: 'italic' }}>
          {prompt.meaning}
        </div>
      )}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f3e5f5', borderRadius: 10, padding: '8px 20px', border: '1px solid #ce93d8' }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#6A1B9A' }}>{prompt.pronoun}</span>
        <span style={{ fontSize: 22, color: '#bbb' }}>{'→ ?'}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// gustar-pattern
// ---------------------------------------------------------------------------

export function GustarPatternRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'gustar-pattern' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Translate using <em>{prompt.verb}</em></div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 340, margin: '0 auto 12px' }}>
        {prompt.english}
      </div>
      <div style={CONTEXT_TEXT}>Use the gustar-pattern construction</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// por-vs-para
// ---------------------------------------------------------------------------

export function PorVsParaRenderer({
  prompt,
  revealed = false,
}: {
  prompt: Extract<PromptShape, { kind: 'por-vs-para' }>;
  revealed?: boolean;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Por or para?</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5, maxWidth: 340, margin: '0 auto 16px', fontStyle: 'italic' }}>
        {prompt.sentence}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <div style={{ background: '#e8f5e9', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#2E7D32' }}>por</div>
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#1565C0' }}>para</div>
      </div>
      {revealed && prompt.reason && (
        <div style={{ ...CONTEXT_TEXT, marginTop: 14, fontStyle: 'italic', color: '#555', maxWidth: 320, margin: '14px auto 0' }}>
          Why: {prompt.reason}
        </div>
      )}
      {!revealed && <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>Think first, then show the answer</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// verb-prep-pair
// ---------------------------------------------------------------------------

export function VerbPrepPairRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'verb-prep-pair' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>What preposition?</div>
      <div style={{ fontSize: 40, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.verb}
      </div>
      <div style={{ fontSize: 16, color: '#888', fontStyle: 'italic', marginBottom: 16 }}>
        ({prompt.meaning})
      </div>
      <div style={{ fontSize: 22, color: '#bbb' }}>
        {prompt.verb} ___ + infinitive?
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// question-word
// ---------------------------------------------------------------------------

export function QuestionWordRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'question-word' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Which question word?</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5, maxWidth: 340, margin: '0 auto 8px' }}>
        {prompt.sentence}
      </div>
      <div style={{ fontSize: 14, color: '#888', fontStyle: 'italic', marginBottom: 4 }}>
        {prompt.englishMeaning}
      </div>
      <div style={CONTEXT_TEXT}>Fill in the blank</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// negation-translate
// ---------------------------------------------------------------------------

export function NegationTranslateRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'negation-translate' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Translate (negation)</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 340, margin: '0 auto 12px' }}>
        {prompt.english}
      </div>
      <div style={CONTEXT_TEXT}>Use Spanish double-negative construction</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// comparative-irregular
// ---------------------------------------------------------------------------

export function ComparativeIrregularRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'comparative-irregular' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Comparative form?</div>
      <div style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.positive}
      </div>
      <div style={{ fontSize: 16, color: '#888', fontStyle: 'italic', marginBottom: 16 }}>
        {prompt.meaning}
      </div>
      <div style={{ fontSize: 22, color: '#bbb' }}>{'→ comparative?'}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// number-spell
// ---------------------------------------------------------------------------

export function NumberSpellRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'number-spell' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spell in Spanish</div>
      <div style={{ fontSize: 80, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, fontFamily: 'Georgia, serif', margin: '0 0 12px' }}>
        {prompt.numeric}
      </div>
      <div style={CONTEXT_TEXT}>Write the number in Spanish words</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// tu-vs-usted
// ---------------------------------------------------------------------------

export function TuVsUstedRenderer({
  prompt,
  revealed = false,
}: {
  prompt: Extract<PromptShape, { kind: 'tu-vs-usted' }>;
  revealed?: boolean;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Tú or usted?</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5, maxWidth: 340, margin: '0 auto 16px' }}>
        {prompt.situation}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <div style={{ background: '#e3f2fd', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#1565C0' }}>tú</div>
        <div style={{ background: '#fce4ec', borderRadius: 10, padding: '8px 24px', fontSize: 20, fontWeight: 700, color: '#AD1457' }}>usted</div>
      </div>
      {revealed && prompt.reason && (
        <div style={{ ...CONTEXT_TEXT, marginTop: 14, fontStyle: 'italic', color: '#555', maxWidth: 320, margin: '14px auto 0' }}>
          Why: {prompt.reason}
        </div>
      )}
      {!revealed && <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>Think first, then show the answer</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// false-cognate
// ---------------------------------------------------------------------------

export function FalseCognateRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'false-cognate' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Actual meaning?</div>
      <div style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.spanish}
      </div>
      <div style={{ display: 'inline-block', background: '#fff3e0', border: '1px solid #ffcc80', borderRadius: 8, padding: '4px 14px', fontSize: 13, color: '#E65100', fontWeight: 600, marginBottom: 12 }}>
        False friend: <em>{prompt.falseFriend}</em>
      </div>
      <div style={CONTEXT_TEXT}>What does this Spanish word actually mean?</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// weather-expression
// ---------------------------------------------------------------------------

export function WeatherExpressionRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'weather-expression' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spanish?</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 56 }}>{prompt.icon}</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>{prompt.english}</span>
      </div>
      <div style={CONTEXT_TEXT}>How do you say this weather expression in Spanish?</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// imperative-tu
// ---------------------------------------------------------------------------

export function ImperativeTuRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'imperative-tu' }>;
}): ReactElement {
  const polarityLabel = prompt.polarity === 'negative' ? 'Negative command' : 'Affirmative command';
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Tú command — {polarityLabel}</div>
      <div style={{ fontSize: 40, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.verb}
      </div>
      {prompt.meaning && (
        <div style={{ fontSize: 15, color: '#888', fontStyle: 'italic', marginBottom: 12 }}>
          {prompt.meaning}
        </div>
      )}
      {prompt.polarity === 'negative' && (
        <div style={{ display: 'inline-block', background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: 8, padding: '4px 14px', fontSize: 13, color: '#B71C1C', fontWeight: 600 }}>
          negative — include "no"
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// reflexive-meaning-change
// ---------------------------------------------------------------------------

export function ReflexiveMeaningChangeRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'reflexive-meaning-change' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Reflexive meaning?</div>
      <div style={{ fontSize: 40, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
        {prompt.reflexive}
      </div>
      <div style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
        Base: <strong style={{ color: '#555' }}>{prompt.baseVerb}</strong> = {prompt.baseMeaning}
      </div>
      <div style={{ fontSize: 22, color: '#bbb' }}>→ reflexive meaning in English?</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// idiom-meaning
// ---------------------------------------------------------------------------

export function IdiomMeaningRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'idiom-meaning' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Actual meaning?</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Georgia, serif', lineHeight: 1.3, maxWidth: 340, margin: '0 auto 4px' }}>
        {prompt.idiom}
      </div>
      <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 12 }}>
        (literally: {prompt.literal})
      </div>
      <div style={CONTEXT_TEXT}>What does this idiom actually mean?</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// sentence-correction
// ---------------------------------------------------------------------------

export function SentenceCorrectionRenderer({
  prompt,
  revealed = false,
}: {
  prompt: Extract<PromptShape, { kind: 'sentence-correction' }>;
  revealed?: boolean;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Correct this sentence</div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#B71C1C',
          textDecoration: 'line-through',
          lineHeight: 1.4,
          maxWidth: 360,
          margin: '0 auto 8px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {prompt.wrong}
      </div>
      <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>↑ incorrect — type the corrected version</div>
      {revealed && prompt.explanation && (
        <div
          style={{
            background: '#fff3e0',
            border: '1px solid #ffcc80',
            borderRadius: 10,
            padding: '10px 14px',
            fontSize: 13,
            color: '#E65100',
            lineHeight: 1.5,
            maxWidth: 360,
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          {prompt.explanation}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// reflexive-daily-routine
// ---------------------------------------------------------------------------

export function ReflexiveDailyRoutineRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'reflexive-daily-routine' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spanish reflexive verb?</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 340, margin: '0 auto 12px' }}>
        {prompt.english}
      </div>
      <div style={CONTEXT_TEXT}>Give the Spanish reflexive infinitive</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// reciprocal-translate
// ---------------------------------------------------------------------------

export function ReciprocalTranslateRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'reciprocal-translate' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Translate (reciprocal)</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, maxWidth: 340, margin: '0 auto 12px' }}>
        {prompt.english}
      </div>
      <div style={CONTEXT_TEXT}>Use the reciprocal reflexive pronoun (nos/se)</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// listening-recall
// ---------------------------------------------------------------------------

/**
 * ListeningRecallRenderer auto-plays the spoken form on mount so the learner
 * hears the word when the card appears (audio-first UX).
 *
 * `playAudio` is injected by the practice surface so the mute toggle is
 * respected. Falls back to speakSpanish if not provided.
 */
export function ListeningRecallRenderer({
  prompt,
  playAudio,
}: {
  prompt: Extract<PromptShape, { kind: 'listening-recall' }>;
  playAudio?: (text: string, onEnd?: () => void) => void;
}): ReactElement {
  useEffect(() => {
    const speak = playAudio ?? speakSpanish;
    speak(prompt.spokenForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt.spokenForm]); // playAudio intentionally excluded — see note below
  // NOTE: `playAudio` is excluded from deps because it changes on every render
  // (it's created inside Practice's render). Including it would re-fire on each
  // re-render rather than only when the spoken form changes. The mute state is
  // captured in the closure of `playAudio` at call time, so muting mid-card
  // still takes effect correctly on the next mount.

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>Spell what you hear</div>
      <div
        style={{
          fontSize: 64,
          margin: '8px 0 12px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        role="button"
        tabIndex={0}
        aria-label="Play audio again"
        onClick={() => {
          const speak = playAudio ?? speakSpanish;
          speak(prompt.spokenForm);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            const speak = playAudio ?? speakSpanish;
            speak(prompt.spokenForm);
          }
        }}
      >
        {'🔊'}
      </div>
      {prompt.hint && (
        <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 8 }}>
          {prompt.hint}
        </div>
      )}
      <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>Type the Spanish spelling</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// accent-discrimination
// ---------------------------------------------------------------------------

/**
 * AccentDiscriminationRenderer shows the Spanish word and asks for its meaning.
 * The minimal pair partner is always present as a distractor — this renderer
 * is self-contained and does NOT rely on getMcqOptions for the core contrast.
 *
 * MCQ option order and additional distractors are handled by the practice
 * surface's getMcqOptions (which uses the pool). The pairMeaning from the
 * PromptShape ensures the pedagogically important contrast is always tested.
 */
export function AccentDiscriminationRenderer({
  prompt,
}: {
  prompt: Extract<PromptShape, { kind: 'accent-discrimination' }>;
}): ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={PROMPT_LABEL}>What does this mean?</div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#1a1a1a',
          fontFamily: 'Georgia, serif',
          lineHeight: 1.1,
          margin: '0 0 8px',
        }}
      >
        {prompt.word}
      </div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>
        {prompt.questionEnglish}
      </div>
      <div style={{ ...CONTEXT_TEXT, fontSize: 12 }}>
        Watch for the accent mark — it changes the meaning
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dispatch — single entry-point for the practice page
//
// `revealed` is passed through to the two kinds whose display changes after
// the answer is shown (por-vs-para reason, tu-vs-usted reason).
// `playAudio` is forwarded to ListeningRecallRenderer for auto-play-on-mount
// so the mute toggle is respected.
// ---------------------------------------------------------------------------

export function PromptRenderer({
  prompt,
  revealed = false,
  playAudio,
}: {
  prompt: PromptShape;
  revealed?: boolean;
  /** Audio callback — injected from the practice surface for mute support. */
  playAudio?: (text: string, onEnd?: () => void) => void;
}): ReactElement {
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
    // Phase 2c additions
    case 'verb-spelling-change':
      return <VerbSpellingChangeRenderer prompt={prompt} />;
    case 'verb-conjugation-tensed':
      return <VerbConjugationTensedRenderer prompt={prompt} />;
    case 'gustar-pattern':
      return <GustarPatternRenderer prompt={prompt} />;
    case 'por-vs-para':
      return <PorVsParaRenderer prompt={prompt} revealed={revealed} />;
    case 'verb-prep-pair':
      return <VerbPrepPairRenderer prompt={prompt} />;
    case 'question-word':
      return <QuestionWordRenderer prompt={prompt} />;
    case 'negation-translate':
      return <NegationTranslateRenderer prompt={prompt} />;
    case 'comparative-irregular':
      return <ComparativeIrregularRenderer prompt={prompt} />;
    case 'number-spell':
      return <NumberSpellRenderer prompt={prompt} />;
    case 'tu-vs-usted':
      return <TuVsUstedRenderer prompt={prompt} revealed={revealed} />;
    case 'false-cognate':
      return <FalseCognateRenderer prompt={prompt} />;
    case 'weather-expression':
      return <WeatherExpressionRenderer prompt={prompt} />;
    case 'imperative-tu':
      return <ImperativeTuRenderer prompt={prompt} />;
    case 'reflexive-meaning-change':
      return <ReflexiveMeaningChangeRenderer prompt={prompt} />;
    case 'idiom-meaning':
      return <IdiomMeaningRenderer prompt={prompt} />;
    // Phase 2c.5 additions (PR #21 cleanup)
    case 'sentence-correction':
      return <SentenceCorrectionRenderer prompt={prompt} revealed={revealed} />;
    case 'reflexive-daily-routine':
      return <ReflexiveDailyRoutineRenderer prompt={prompt} />;
    case 'reciprocal-translate':
      return <ReciprocalTranslateRenderer prompt={prompt} />;
    // Phase 3 (B.2) additions
    case 'listening-recall':
      return <ListeningRecallRenderer prompt={prompt} playAudio={playAudio} />;
    case 'accent-discrimination':
      return <AccentDiscriminationRenderer prompt={prompt} />;
  }
}
