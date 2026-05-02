/**
 * Spanish Practice Surface — /guides/spanish/practice
 *
 * The user-facing spaced-repetition review interface.
 *
 * Architecture:
 * - `Component()` is the lazy-route entry: no args, uses default adapter and cards.
 * - `Practice({ adapter?, getCards? })` is the internal component: accepts injection
 *   for testing without module mocks.
 *
 * Queue logic:
 * - Gets the full card pool from `getCards()` (default: `getAllSpanishCards`).
 * - Builds a shuffled snapshot on session start (when isHydrated first becomes true).
 * - Tracks rated card IDs in a Set; displayed queue = snapshot minus rated.
 * - This keeps order stable within a session: rating card A does not reshuffle B–Z.
 *
 * Advance logic:
 * - Self-rate (letter-sound, word-stress): briefly shows "Next review: …",
 *   then auto-advances. The user has already self-rated so there's no
 *   right/wrong feedback to absorb.
 * - Typed / MCQ: shows match feedback + "Continue" button. The button is
 *   auto-focused, so pressing Enter advances; a global Enter handler also
 *   advances if focus has drifted off the button. No auto-advance — the
 *   user always controls when feedback disappears.
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { ReactElement, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useMastery } from '../../../hooks/useMastery';
import { Rating } from '../../../mastery';
import type { MasteryStorageAdapter, CardState, CardKind, ReviewCard } from '../../../mastery';
import { getAllSpanishCards } from '../mastery/index';
import { speakSpanish } from '../../../utils/speech';
import { checkAnswer, normalizeAnswer } from '../mastery/util';
import type { AnswerMatch } from '../mastery/util';
import { PromptRenderer } from './renderers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPANISH_RED = '#C62828';
const ACCENT_LIGHT = '#ffebee';

// Kinds that have a speaker button on the prompt itself (before reveal).
// Only include kinds where speaking the prompt does NOT leak the answer —
// specifically: the speakText is the Spanish item being tested, not the answer.
// ser-vs-estar and por-vs-para are intentionally omitted: their speakText
// either contains the answer verb (guide17) or substitutes the blank with
// the answer (guide18).
export const KINDS_WITH_PROMPT_SPEAK: ReadonlySet<CardKind> = new Set<CardKind>([
  'letter-sound',
  'idiom-meaning',
  'false-cognate',
  'reflexive-meaning-change',
  'tu-vs-usted',
]);
// Kinds that auto-play speech on reveal (post-reveal, so no answer-leak risk).
// Phase 3 additions: noun-gender, noun-plural, noun-adj-agreement,
// english-to-pronoun, verb-spelling-change, word-stress + gustar-pattern,
// negation-translate, sentence-correction, reciprocal-translate,
// reflexive-daily-routine, number-spell, weather-expression, question-word,
// comparative-irregular.
export const KINDS_AUTO_PLAY_ON_REVEAL: ReadonlySet<CardKind> = new Set<CardKind>([
  'letter-sound',
  'verb-conjugation',
  'verb-conjugation-stem-change',
  'verb-conjugation-tensed',
  'imperative-tu',
  // Phase 3 additions
  'noun-gender',
  'noun-plural',
  'noun-adj-agreement',
  'english-to-pronoun',
  'verb-spelling-change',
  'word-stress',
  'gustar-pattern',
  'negation-translate',
  'sentence-correction',
  'reciprocal-translate',
  'reflexive-daily-routine',
  'number-spell',
  'weather-expression',
  'question-word',
  'comparative-irregular',
  'accent-discrimination',
]);

// Kinds that support typed-answer input as the primary interaction.
// letter-sound and word-stress remain self-rate-only (IPA / rule-based).
export const TYPING_ENABLED_KINDS: ReadonlySet<CardKind> = new Set<CardKind>([
  'verb-conjugation',
  'verb-conjugation-stem-change',
  'noun-gender',
  'noun-plural',
  'noun-adj-agreement',
  'english-to-pronoun',
  'ser-vs-estar',
  // Phase 2c additions
  'verb-spelling-change',
  'verb-conjugation-tensed',
  'gustar-pattern',
  'por-vs-para',
  'verb-prep-pair',
  'question-word',
  'negation-translate',
  'comparative-irregular',
  'number-spell',
  'tu-vs-usted',
  'weather-expression',
  'imperative-tu',
  // Phase 2c.5 additions (PR #21 cleanup)
  'sentence-correction',
  'reflexive-daily-routine',
  'reciprocal-translate',
  // Phase 3 (B.2) additions
  'listening-recall',
]);

// Kinds that present 4-option multiple-choice instead of typed input.
// Reserved for cards where many English phrasings of the same concept are all
// reasonable answers — pinning down acceptableAnswers is brittle.
// MCQ_KINDS and TYPING_ENABLED_KINDS must stay disjoint (asserted in tests).
export const MCQ_KINDS: ReadonlySet<CardKind> = new Set<CardKind>([
  'idiom-meaning',
  'false-cognate',
  'reflexive-meaning-change',
  // Phase 3 (B.2) additions
  'accent-discrimination',
]);

const MCQ_OPTION_COUNT = 4;

// Kinds whose canonical answer is an English meaning (rather than a Spanish
// form). All three are currently also in MCQ_KINDS — kept as a separate set
// for the placeholderFor helper, in case a future English-answer kind is
// added that uses typed input instead.
export const ENGLISH_ANSWER_KINDS: ReadonlySet<CardKind> = new Set<CardKind>([
  'idiom-meaning',
  'false-cognate',
  'reflexive-meaning-change',
]);

export function placeholderFor(kind: CardKind): string {
  return ENGLISH_ANSWER_KINDS.has(kind)
    ? 'Type your answer in English'
    : 'Type your answer in Spanish';
}

// How long (ms) to display the "Next review: …" message before advancing.
// Long-answer kinds give the learner more time to read the canonical answer.
const LONG_ANSWER_KINDS: ReadonlySet<CardKind> = new Set<CardKind>([
  'gustar-pattern',
  'negation-translate',
  'sentence-correction',
  'reciprocal-translate',
  'reflexive-daily-routine',
  'weather-expression',
  'question-word',
  'ser-vs-estar',
  'por-vs-para',
  'idiom-meaning',
]);

export function nextDueDisplayMsForCard(card: ReviewCard): number {
  return LONG_ANSWER_KINDS.has(card.kind) ? 1400 : 800;
}

// ---------------------------------------------------------------------------
// Seeded shuffle — Mulberry32, seeded by local YYYYMMDD date integer
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// `seededShuffle` + `todaySeed` work together to produce a shuffle that is:
//   - Consistent within a session: the same seed is used for the whole day,
//     so the queue order does not change between the "due cards" computation
//     and subsequent re-renders during a session.
//   - Varied day-to-day: the YYYYMMDD integer changes at midnight (local time),
//     giving a fresh order each day without any server involvement.
// Do not replace the seed source with Math.random() — that would reshuffle on
// every hydration and destroy queue stability within a session.
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function todaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// FNV-1a 32-bit hash. Used to derive a stable numeric seed from a cardId so
// MCQ option order is stable for a given card but varies across cards.
function stringHash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ---------------------------------------------------------------------------
// formatRelative — next-due display
// ---------------------------------------------------------------------------

export function formatRelative(dueMs: number): string {
  const diffMs = dueMs - Date.now();
  const diffMin = diffMs / 60_000;
  if (diffMin <= 1) return 'now';
  if (diffMin < 60) return `in ${Math.round(diffMin)} minutes`;
  const diffHours = diffMin / 60;
  if (diffHours < 20) return `in ${Math.round(diffHours)} hours`;
  const diffDays = diffHours / 24;
  if (diffDays < 1.5) return 'tomorrow';
  if (diffDays < 10) return `in ${Math.round(diffDays)} days`;
  const diffWeeks = diffDays / 7;
  return `in ${Math.round(diffWeeks)} weeks`;
}

// ---------------------------------------------------------------------------
// formatNextDue — countdown copy for EmptyState
// ---------------------------------------------------------------------------

export function formatNextDue(nextDueAt: number | null): string {
  if (nextDueAt === null) {
    return 'All caught up. Add more cards by reviewing guides.';
  }
  const diffMs = nextDueAt - Date.now();
  if (diffMs < 60_000) {
    return 'Next review in less than a minute.';
  }
  const totalMinutes = Math.round(diffMs / 60_000);
  if (diffMs < 60 * 60_000) {
    return `Next review in ${totalMinutes} ${totalMinutes === 1 ? 'minute' : 'minutes'}.`;
  }
  if (diffMs < 24 * 60 * 60_000) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const hourStr = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    const minStr = mins > 0 ? ` ${mins} ${mins === 1 ? 'minute' : 'minutes'}` : '';
    return `Next review in ${hourStr}${minStr}.`;
  }
  const due = new Date(nextDueAt);
  return `Next review on ${due.toLocaleDateString()} at ${due.toLocaleTimeString()}.`;
}

// ---------------------------------------------------------------------------
// ProgressBar — inline small bar
// ---------------------------------------------------------------------------

function ProgressBar({
  value,
  max,
  color = SPANISH_RED,
}: {
  value: number;
  max: number;
  color?: string;
}): ReactElement {
  const pct = max === 0 ? 0 : Math.min(1, value / max);
  return (
    <div
      style={{
        width: 60,
        height: 4,
        background: '#e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={`${value} of ${max} reviews today`}
    >
      <div
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          background: color,
          borderRadius: 2,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SpeakerButton — small audio affordance
// ---------------------------------------------------------------------------

function SpeakerButton({
  text,
  label = 'Speak',
  playAudio,
}: {
  text: string;
  label?: string;
  /** Override the default speakSpanish call. Enables mute gating from the
   *  parent. If omitted, falls back to speakSpanish directly. */
  playAudio?: (text: string, onEnd?: () => void) => void;
}): ReactElement {
  const [speaking, setSpeaking] = useState(false);
  return (
    <button
      aria-label={label}
      onClick={() => {
        setSpeaking(true);
        const speak = playAudio ?? speakSpanish;
        speak(text, () => setSpeaking(false));
      }}
      style={{
        background: 'none',
        border: '1.5px solid #ddd',
        borderRadius: 8,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: 16,
        color: speaking ? SPANISH_RED : '#888',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span aria-hidden="true">{speaking ? '🔊' : '🔉'}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// HeaderStrip — always visible: streak, goal progress, due count, back link
// ---------------------------------------------------------------------------

function HeaderStrip({
  streak,
  todaysReviewCount,
  dailyGoal,
  dueCount,
  xpToday,
  muted,
  onToggleMute,
}: {
  streak: number;
  todaysReviewCount: number;
  dailyGoal: number;
  dueCount: number;
  xpToday: number;
  muted: boolean;
  onToggleMute: () => void;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '10px 20px',
        borderBottom: '1px solid #eee',
        background: '#fff',
        fontSize: 13,
        flexWrap: 'wrap',
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <Link
        to="/"
        style={{
          color: '#888',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span aria-hidden="true">{'←'}</span> All collections
      </Link>

      <Link
        to="/guides/spanish"
        style={{
          color: '#888',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span aria-hidden="true">{'←'}</span> Español
      </Link>

      <div style={{ flex: 1 }} />

      {streak > 0 && (
        <div
          aria-label={`${streak}-day streak`}
          style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#555', fontWeight: 600 }}
        >
          <span aria-hidden="true">{'🔥'}</span>
          <span>{streak}</span>
        </div>
      )}

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#555' }}
        aria-label={`${todaysReviewCount} of ${dailyGoal} reviews today`}
      >
        <ProgressBar value={todaysReviewCount} max={dailyGoal} />
        <span>
          {todaysReviewCount}
          <span style={{ color: '#bbb' }}>/{dailyGoal}</span> today
        </span>
      </div>

      <div style={{ color: '#555' }}>
        <span style={{ fontWeight: 600, color: dueCount > 0 ? SPANISH_RED : '#2E7D32' }}>
          {dueCount}
        </span>{' '}
        due
      </div>

      {xpToday > 0 && (
        <div
          aria-label={`${xpToday} XP today`}
          style={{ color: '#7B6F00', fontWeight: 600 }}
        >
          {xpToday} XP
        </div>
      )}

      <button
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        aria-pressed={muted}
        title={muted ? 'Unmute audio' : 'Mute audio'}
        style={{
          background: 'none',
          border: '1px solid #ddd',
          borderRadius: 6,
          padding: '3px 8px',
          cursor: 'pointer',
          fontSize: 14,
          color: muted ? '#bbb' : '#555',
          fontFamily: "system-ui,'Segoe UI',sans-serif",
        }}
      >
        <span aria-hidden="true">{muted ? '🔇' : '🔔'}</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// RatingButtons — used in Show Answer (self-rate) flow only
// ---------------------------------------------------------------------------

const RATINGS: Array<{ rating: Rating; label: string; subLabel: string; color: string; bg: string }> = [
  { rating: Rating.Again, label: 'Again', subLabel: 'Forgot it',      color: '#fff', bg: '#B71C1C' },
  { rating: Rating.Hard,  label: 'Hard',  subLabel: 'Barely got it',  color: '#fff', bg: '#E65100' },
  { rating: Rating.Good,  label: 'Good',  subLabel: 'Got it',         color: '#fff', bg: '#2E7D32' },
  { rating: Rating.Easy,  label: 'Easy',  subLabel: 'Trivial',        color: '#fff', bg: '#1565C0' },
];

function RatingButtons({
  onRate,
}: {
  onRate: (rating: Rating) => void;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 20,
      }}
    >
      {RATINGS.map(({ rating, label, subLabel, color, bg }) => (
        <button
          key={label}
          onClick={() => onRate(rating)}
          style={{
            background: bg,
            color,
            border: 'none',
            borderRadius: 10,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "system-ui,'Segoe UI',sans-serif",
            minWidth: 72,
            transition: 'opacity 0.15s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <span>{label}</span>
          <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.85 }}>{subLabel}</span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

export function EmptyState({
  todaysReviewCount,
  dailyGoal,
  streak,
  nextDueAt,
}: {
  todaysReviewCount: number;
  dailyGoal: number;
  streak: number;
  nextDueAt: number | null;
}): ReactElement {
  const metGoal = todaysReviewCount >= dailyGoal;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        textAlign: 'center',
        gap: 16,
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontSize: 56 }}>{'✓'}</div>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1a1a1a' }}>
        All caught up
      </h2>

      <div style={{ fontSize: 16, color: '#555', maxWidth: 300, lineHeight: 1.6 }}>
        <div>
          <strong>{todaysReviewCount}</strong>
          <span style={{ color: '#999' }}> / {dailyGoal}</span>
          {' '}reviews today
          {metGoal && <span style={{ marginLeft: 6 }}>— nicely done</span>}
        </div>
        {streak > 0 && (
          <div style={{ marginTop: 8 }}>
            {'🔥'} <strong>{streak}</strong>-day streak
          </div>
        )}
      </div>

      <div
        style={{ marginTop: 8, fontSize: 14, color: '#888', lineHeight: 1.6 }}
      >
        No cards are due right now.
        <br />
        {formatNextDue(nextDueAt)}
      </div>

      <Link
        to="/guides/spanish"
        style={{
          marginTop: 12,
          display: 'inline-block',
          background: SPANISH_RED,
          color: '#fff',
          textDecoration: 'none',
          padding: '10px 24px',
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        Back to Spanish guides
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MatchFeedback — shows correct / close / incorrect result under the input
// ---------------------------------------------------------------------------

function MatchFeedback({
  result,
  canonical,
  userAnswer,
}: {
  result: AnswerMatch;
  canonical: string;
  userAnswer: string;
}): ReactElement {
  if (result === 'correct') {
    return (
      <div
        data-testid="answer-feedback"
        style={{
          background: '#e8f5e9',
          border: '1px solid #a5d6a7',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 16,
          fontFamily: "system-ui,'Segoe UI',sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, color: '#2E7D32', marginBottom: 2 }}>
          {'✓'} Correct!{' '}
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800 }}>{canonical}</span>
        </div>
      </div>
    );
  }
  if (result === 'close') {
    return (
      <div
        data-testid="answer-feedback"
        style={{
          background: '#fffde7',
          border: '1px solid #ffe082',
          borderRadius: 10,
          padding: '12px 16px',
          marginBottom: 16,
          fontFamily: "system-ui,'Segoe UI',sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, color: '#7B6F00', marginBottom: 2 }}>
          {'~'} Close — correct:{' '}
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800 }}>{canonical}</span>
        </div>
      </div>
    );
  }
  return (
    <div
      data-testid="answer-feedback"
      style={{
        background: '#ffebee',
        border: '1px solid #ef9a9a',
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 16,
        fontFamily: "system-ui,'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontWeight: 700, color: '#B71C1C', marginBottom: 4 }}>
        {'✗'} Correct answer:{' '}
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800 }}>{canonical}</span>
      </div>
      <div style={{ fontSize: 12, color: '#888' }}>
        You answered: <em>{userAnswer}</em>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardReviewer — shows one card, manages reveal and rating
// ---------------------------------------------------------------------------

interface CardReviewerProps {
  card: ReviewCard;
  /**
   * Rates the card and returns the new CardState (quickly — no advance delay).
   * The caller (CardReviewer) is responsible for showing the next-due message
   * and then calling onAdvance after NEXT_DUE_DISPLAY_MS.
   */
  onRate: (rating: Rating) => Promise<CardState>;
  /** Called after the next-due message has been displayed. Advances the queue. */
  onAdvance: (cardId: string) => void;
  /**
   * Full card pool — only consulted for MCQ kinds, where it provides the
   * distractor source. Defaults to an empty array; MCQ kinds with an empty
   * pool degrade to a single-option ("correct only") card.
   */
  cardPool?: ReadonlyArray<ReviewCard>;
  /**
   * Audio playback callback. Replaces direct speakSpanish calls so the mute
   * toggle in the parent can gate all audio through a single chokepoint.
   * If omitted, falls back to speakSpanish.
   */
  playAudio?: (text: string, onEnd?: () => void) => void;
}

/** Map a typed-answer match result to the appropriate FSRS rating. */
function matchToRating(result: AnswerMatch): Rating {
  if (result === 'correct') return Rating.Good;
  if (result === 'close') return Rating.Hard;
  return Rating.Again;
}

/**
 * Derive acceptable answers to pass to checkAnswer for kinds where the
 * canonical answer is compound (e.g. "el (masculine)"). We allow the
 * article alone and the gender word alone so casual typing still scores.
 */
function deriveAcceptable(card: ReviewCard): string[] {
  const base = card.acceptableAnswers ? [...card.acceptableAnswers] : [];
  if (card.kind === 'noun-gender') {
    // canonical: "el (masculine)" or "la (feminine)"
    const m = card.answer.match(/^(el|la)\s+\((\w+)\)$/);
    if (m) {
      const [, article, gender] = m;
      if (article && !base.includes(article)) base.push(article);
      if (gender && !base.includes(gender)) base.push(gender);
    }
  }
  return base;
}

/**
 * Returns true if an empty typed answer is a valid correct response for this
 * card. This happens when the canonical answer or any acceptable alternate
 * normalises to ''. Used by guide 19's 'none' bucket cards, where the correct
 * concept is "no preposition required" and acceptableAnswers includes ''.
 */
function cardAcceptsEmptyInput(card: ReviewCard): boolean {
  const acceptable = deriveAcceptable(card);
  return [card.answer, ...acceptable].some(a => normalizeAnswer(a) === '');
}

/**
 * Build an MCQ option list for a card: the correct answer plus distractors
 * pulled from other cards of the same kind. Both the distractor pick and the
 * final option order are seeded by `cardId`, so options are stable while a
 * user looks at the card but vary across cards. Distractors are deduped by
 * canonical answer text and exclude the current card's answer.
 *
 * `requiredDistractors` are always included before pool-based picks. This is
 * used for accent-discrimination cards where the minimal-pair partner must
 * always appear as a distractor — regardless of pool size.
 *
 * If the pool is too small to provide `optionCount - 1` unique distractors,
 * returns whatever options it can. No placeholder padding.
 */
export function getMcqOptions(
  card: ReviewCard,
  pool: ReadonlyArray<ReviewCard>,
  optionCount: number,
  requiredDistractors: string[] = [],
): string[] {
  const seen = new Set<string>([card.answer]);
  // Required distractors always included — deduplicated against the answer.
  const forced: string[] = [];
  for (const rd of requiredDistractors) {
    if (!seen.has(rd)) {
      seen.add(rd);
      forced.push(rd);
    }
  }
  const distractors: string[] = [];
  for (const other of pool) {
    if (other.kind !== card.kind) continue;
    if (other.cardId === card.cardId) continue;
    if (seen.has(other.answer)) continue;
    seen.add(other.answer);
    distractors.push(other.answer);
  }
  const seed = stringHash(card.cardId);
  const remainingSlots = optionCount - 1 - forced.length;
  const picked = seededShuffle(distractors, seed).slice(0, Math.max(0, remainingSlots));
  // Use a different seed (any deterministic offset distinct from `seed`) so
  // the final option order isn't just "correct first, then distractors in
  // their picked order" — the second shuffle interleaves them.
  return seededShuffle([card.answer, ...forced, ...picked], seed + 1);
}

function CardReviewer({
  card,
  onRate,
  onAdvance,
  cardPool = [],
  playAudio,
}: CardReviewerProps): ReactElement {
  // For typing-eligible kinds the state machine has an extra phase:
  //   'awaiting-input' → 'shown-answer' → 'rated'
  // For self-rate-only kinds it collapses to:
  //   'awaiting-input' (= not revealed) → 'shown-answer' → 'rated'
  const typingEnabled = TYPING_ENABLED_KINDS.has(card.kind);
  const mcqEnabled = MCQ_KINDS.has(card.kind);
  // True for cards where leaving the input blank is itself a valid correct answer
  // (guide 19 'none' bucket: canonical '∅', acceptableAnswers includes '').
  const acceptsEmpty = cardAcceptsEmptyInput(card);

  // MCQ options — recomputed only when the card changes.
  // For accent-discrimination, the minimal-pair partner meaning is always
  // injected as a required distractor so the core contrast is never absent.
  const mcqOptions = useMemo(() => {
    if (!mcqEnabled) return [];
    const required: string[] =
      card.prompt.kind === 'accent-discrimination' ? [card.prompt.pairMeaning] : [];
    return getMcqOptions(card, cardPool, MCQ_OPTION_COUNT, required);
  }, [mcqEnabled, card, cardPool]);

  type ReviewerState = 'awaiting-input' | 'shown-answer' | 'rated';
  const [reviewerState, setReviewerState] = useState<ReviewerState>('awaiting-input');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [matchResult, setMatchResult] = useState<AnswerMatch | null>(null);
  const [nextDue, setNextDue] = useState<string | null>(null);

  // Refs for auto-focus management
  const inputRef = useRef<HTMLInputElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const firstMcqOptionRef = useRef<HTMLButtonElement>(null);

  // Auto-play speech on reveal for relevant kinds
  const autoPlayedRef = useRef(false);
  // Track mounted state so the advance callback is skipped if the component
  // unmounts during the NEXT_DUE_DISPLAY_MS delay (prevents React unmount warnings).
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Pending advance timeout — cancelled on unmount to prevent state updates
  // after the component is gone.
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reviewerState !== 'shown-answer') return;
    if (!autoPlayedRef.current && KINDS_AUTO_PLAY_ON_REVEAL.has(card.kind)) {
      autoPlayedRef.current = true;
      const speak = playAudio ?? speakSpanish;
      speak(card.speakText ?? card.answer);
    }
  }, [reviewerState, card.kind, card.speakText, card.answer, playAudio]);

  // Auto-focus the text input when a typing-eligible card first appears
  useEffect(() => {
    if (typingEnabled && reviewerState === 'awaiting-input') {
      inputRef.current?.focus();
    }
  }, [typingEnabled, reviewerState]);

  // Auto-focus the first option when an MCQ card first appears, so keyboard
  // users land on something actionable instead of having to Tab through chrome.
  useEffect(() => {
    if (mcqEnabled && reviewerState === 'awaiting-input') {
      firstMcqOptionRef.current?.focus();
    }
  }, [mcqEnabled, reviewerState]);

  // After a typed submit or MCQ option click, focus the Continue button so
  // the user can advance with Enter / Space.
  useEffect(() => {
    if (reviewerState === 'shown-answer' && matchResult !== null) {
      continueButtonRef.current?.focus();
    }
  }, [reviewerState, matchResult]);

  // State resets on card change via `key={card.cardId}` on this component
  // in the Practice parent — full unmount/remount returns useState to
  // initial values, so no manual reset effect is needed here.

  // Shared persistence + optional auto-advance for both rating paths.
  // Calls onRate, shows the next-due message, and (if autoAdvance) schedules
  // the parent advance after NEXT_DUE_DISPLAY_MS. The Continue button can
  // cancel the timer via advanceTimerRef.
  const persistAndMaybeAdvance = useCallback(
    async (rating: Rating, autoAdvance: boolean) => {
      try {
        const newState = await onRate(rating);
        if (!mountedRef.current) return;
        setNextDue(`Next review: ${formatRelative(newState.due)}`);
        if (!autoAdvance) return;
        await new Promise<void>(resolve => {
          advanceTimerRef.current = setTimeout(resolve, nextDueDisplayMsForCard(card));
        });
        if (mountedRef.current) {
          onAdvance(card.cardId);
        }
      } catch {
        // Swallow: parent already handles error propagation
      }
    },
    // card.cardId and card.kind are the only card fields used; card object
    // identity changes on every parent render but its fields don't — using
    // the primitive fields avoids unnecessary callback recreations.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onRate, onAdvance, card.cardId, card.kind],
  );

  // Show Answer (self-rate) 4-button path. Always auto-advances after display.
  const handleRate = useCallback(
    async (r: Rating) => {
      if (reviewerState === 'rated') return; // prevent double-tap
      setReviewerState('rated');
      await persistAndMaybeAdvance(r, true);
    },
    [reviewerState, persistAndMaybeAdvance],
  );

  // Keyboard shortcuts for rating buttons (self-rate path only).
  // 1/a = Again, 2/h = Hard, 3/g = Good, 4/e = Easy.
  // Only active when the answer is shown and no match result (typed path
  // already applied a rating automatically). Skipped when focus is in a
  // text input to avoid intercepting user typing.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (reviewerState !== 'shown-answer') return;
      if (matchResult !== null) return;
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const k = e.key;
      if (k === '1' || k === 'a') void handleRate(Rating.Again);
      else if (k === '2' || k === 'h') void handleRate(Rating.Hard);
      else if (k === '3' || k === 'g') void handleRate(Rating.Good);
      else if (k === '4' || k === 'e') void handleRate(Rating.Easy);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [reviewerState, matchResult, handleRate]);

  // Whether a typed submit or MCQ option click has already been persisted —
  // prevents double-submit on either input path.
  const submittedRef = useRef(false);

  // Typed-answer path. Auto-rates based on match quality:
  //   correct → Good, close → Hard, incorrect → Again
  // UI stays in 'shown-answer' until the user advances via Continue (button
  // click or Enter). Never auto-advances — the previous 800ms flash on
  // correct answers was reading as "no feedback" because users miss it
  // while looking at the keyboard.
  const handleSubmitTyped = useCallback(() => {
    // Allow submit on empty input only if the card explicitly accepts empty
    // (guide 19 'none' bucket). For all other cards, require non-empty input.
    if (!userAnswer.trim() && !acceptsEmpty) return;
    if (submittedRef.current) return; // prevent double-submit
    submittedRef.current = true;

    const acceptable = deriveAcceptable(card);
    const result = checkAnswer(userAnswer, card.answer, acceptable);
    setMatchResult(result);
    setReviewerState('shown-answer');

    void persistAndMaybeAdvance(matchToRating(result), false);
  }, [userAnswer, card, acceptsEmpty, persistAndMaybeAdvance]);

  // MCQ option click handler. Auto-rates: correct → Good, incorrect → Again.
  // Never auto-advances — user always advances via Continue (or Enter).
  const handleMcqSelect = useCallback(
    (option: string) => {
      if (submittedRef.current) return;
      submittedRef.current = true;

      const acceptable = deriveAcceptable(card);
      const isCorrect = option === card.answer || acceptable.includes(option);
      const result: AnswerMatch = isCorrect ? 'correct' : 'incorrect';
      // Record the user's pick so MatchFeedback can show it under the
      // canonical answer (same surface the typed-input path uses).
      setUserAnswer(option);
      setMatchResult(result);
      setReviewerState('shown-answer');

      void persistAndMaybeAdvance(isCorrect ? Rating.Good : Rating.Again, false);
    },
    [card, persistAndMaybeAdvance],
  );

  // Continue handler for the typed-answer / MCQ path: tell the parent to
  // advance to the next card. (Self-rate cards still auto-advance from
  // RatingButtons via persistAndMaybeAdvance.)
  const handleContinue = useCallback(() => {
    onAdvance(card.cardId);
  }, [onAdvance, card.cardId]);

  const handleShowAnswer = useCallback(() => {
    setMatchResult(null); // escape hatch — no typed scoring
    setReviewerState('shown-answer');
  }, []);

  // Enter advances on the typed/MCQ Continue path. The Continue button is
  // auto-focused so Enter naturally fires its onClick; this fallback handles
  // cases where focus drifted (user clicked the speaker, the prompt, etc.).
  // Skipped when focus is on a button/input/textarea so we don't double-fire
  // with the focused element's own handler.
  useEffect(() => {
    if (reviewerState !== 'shown-answer' || matchResult === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      handleContinue();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [reviewerState, matchResult, handleContinue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSubmitTyped();
    },
    [handleSubmitTyped],
  );

  // speakText for the post-reveal speaker — always falls back to the answer
  // so every card has audio on reveal.
  const speakText = card.speakText ?? card.answer;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      {/* Prompt card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #eee',
          padding: '32px 28px',
          marginBottom: 20,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <PromptRenderer
          prompt={card.prompt}
          revealed={reviewerState !== 'awaiting-input'}
          playAudio={playAudio}
        />

        {/* Speaker button on prompt — only for kinds where speaking the prompt
            does not leak the answer, and only when speakText is set.
            Absence of speakText is a config bug for any kind in the set. */}
        {KINDS_WITH_PROMPT_SPEAK.has(card.kind) && card.speakText && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <SpeakerButton
              text={card.speakText}
              label="Speak this prompt"
              playAudio={playAudio}
            />
          </div>
        )}
      </div>

      {/* Awaiting input phase */}
      {reviewerState === 'awaiting-input' && (
        typingEnabled ? (
          /* Typed-answer path */
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', marginBottom: 10 }}>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderFor(card.kind)}
                aria-label={placeholderFor(card.kind)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: 16,
                  borderRadius: 12,
                  border: '2px solid #e0e0e0',
                  fontFamily: 'Georgia, serif',
                  outline: 'none',
                  background: '#fff',
                }}
              />
              <button
                onClick={handleSubmitTyped}
                disabled={!userAnswer.trim() && !acceptsEmpty}
                style={{
                  background: (userAnswer.trim() || acceptsEmpty) ? SPANISH_RED : '#e0e0e0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 20px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: (userAnswer.trim() || acceptsEmpty) ? 'pointer' : 'default',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
                aria-label="Submit answer"
              >
                Submit
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleShowAnswer}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '6px 16px',
                  fontSize: 13,
                  color: '#888',
                  cursor: 'pointer',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                }}
                aria-label="Show answer without typing"
              >
                Show Answer
              </button>
            </div>
          </div>
        ) : mcqEnabled ? (
          /* Multiple-choice path (e.g. idiom-meaning, where many English
             phrasings of the same concept are all reasonable answers) */
          <div role="group" aria-label="Choose the correct meaning">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mcqOptions.map((option, i) => (
                <button
                  key={option}
                  ref={i === 0 ? firstMcqOptionRef : undefined}
                  onClick={() => handleMcqSelect(option)}
                  style={{
                    background: '#fff',
                    color: '#1a1a1a',
                    border: '2px solid #e0e0e0',
                    borderRadius: 12,
                    padding: '14px 20px',
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    textAlign: 'center',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = SPANISH_RED;
                    e.currentTarget.style.background = ACCENT_LIGHT;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.background = '#fff';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <button
                onClick={handleShowAnswer}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '6px 16px',
                  fontSize: 13,
                  color: '#888',
                  cursor: 'pointer',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                }}
                aria-label="Show answer without choosing"
              >
                Show Answer
              </button>
            </div>
          </div>
        ) : (
          /* Self-rate-only path */
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 12,
                color: '#aaa',
                marginBottom: 10,
                fontFamily: "system-ui,'Segoe UI',sans-serif",
              }}
            >
              Rate yourself when ready
            </div>
            <button
              onClick={handleShowAnswer}
              style={{
                background: SPANISH_RED,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 36px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "system-ui,'Segoe UI',sans-serif",
                width: '100%',
                maxWidth: 320,
              }}
            >
              Show Answer
            </button>
          </div>
        )
      )}

      {/* Shown-answer / rated phase */}
      {(reviewerState === 'shown-answer' || reviewerState === 'rated') && (
        <div>
          {/* Typed-answer match feedback (only when submitted via input) */}
          {matchResult !== null && (
            <MatchFeedback
              result={matchResult}
              canonical={card.answer}
              userAnswer={userAnswer}
            />
          )}

          {/* Canonical answer display (always shown on Show Answer; after typing too) */}
          {matchResult === null && (
            <div
              style={{
                background: ACCENT_LIGHT,
                borderRadius: 14,
                padding: '20px 24px',
                marginBottom: 16,
                textAlign: 'center',
                border: `1px solid ${SPANISH_RED}30`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginBottom: 8,
                  fontWeight: 600,
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                }}
              >
                Answer
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: SPANISH_RED,
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1.2,
                }}
              >
                {card.answer}
              </div>
              {card.acceptableAnswers && card.acceptableAnswers.length > 0 && (
                <div
                  style={{
                    fontSize: 13,
                    color: '#888',
                    marginTop: 8,
                    fontStyle: 'italic',
                    fontFamily: "system-ui,'Segoe UI',sans-serif",
                  }}
                >
                  Also: {card.acceptableAnswers.join(', ')}
                </div>
              )}
              <div style={{ marginTop: 12 }}>
                <SpeakerButton text={speakText} label="Speak answer" playAudio={playAudio} />
              </div>
            </div>
          )}

          {/* Speaker for typed-answer path */}
          {matchResult !== null && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <SpeakerButton text={speakText} label="Speak answer" playAudio={playAudio} />
            </div>
          )}

          {/* Next-due preview (shows after rating, before advance) */}
          {nextDue && (
            <div
              data-testid="next-due-message"
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: '#888',
                marginBottom: 8,
                fontFamily: "system-ui,'Segoe UI',sans-serif",
              }}
            >
              {nextDue}
            </div>
          )}

          {/* Typed-answer path: single Continue button (rating was auto-applied on Submit) */}
          {matchResult !== null && reviewerState !== 'rated' && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button
                ref={continueButtonRef}
                onClick={handleContinue}
                style={{
                  background: SPANISH_RED,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '10px 36px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "system-ui,'Segoe UI',sans-serif",
                  minWidth: 120,
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* Show-answer (self-rate) path: 4-button rating UI */}
          {matchResult === null && reviewerState !== 'rated' && (
            <RatingButtons onRate={handleRate} />
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Practice — injectable internal component
// ---------------------------------------------------------------------------

export interface PracticeProps {
  adapter?: MasteryStorageAdapter;
  getCards?: () => ReviewCard[];
}

export function Practice({
  adapter,
  getCards = getAllSpanishCards,
}: PracticeProps): ReactElement {
  const { getCardState, rateCard, streak, todaysReviewCount, dailyGoal, isHydrated, xpToday, nextDueAt } =
    useMastery(adapter);

  // Force a re-render every minute so newly-due cards surface without user action
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // Full card pool (stable across renders unless getCards reference changes)
  const allCards = useMemo(() => getCards(), [getCards]);

  // Session snapshot: built once when hydration completes. Stable for the session.
  // Cards are shuffled with a day seed for variety but consistent within a session.
  // Stored in state (not a ref) so that useMemo for displayQueue can depend on it
  // honestly — the memo re-runs exactly when the snapshot is first set.
  const [sessionSnapshot, setSessionSnapshot] = useState<ReadonlyArray<ReviewCard> | null>(null);

  useEffect(() => {
    if (!isHydrated || sessionSnapshot !== null) return;
    const now = Date.now();
    const due = allCards.filter(card => {
      const state = getCardState(card.cardId);
      return state === undefined || state.due <= now;
    });
    setSessionSnapshot(seededShuffle(due, todaySeed()));
  }, [isHydrated, sessionSnapshot, allCards, getCardState]);

  // Track rated card IDs — the displayed queue = snapshot minus rated
  const [ratedIds, setRatedIds] = useState<ReadonlySet<string>>(new Set());

  const displayQueue = useMemo(
    () => (sessionSnapshot ?? []).filter(c => !ratedIds.has(c.cardId)),
    [sessionSnapshot, ratedIds],
  );

  const currentCard = displayQueue[0];
  const dueCount = displayQueue.length;

  // Rate the current card. Returns the new CardState immediately (no advance delay).
  // CardReviewer is responsible for showing the next-due message, then calling onAdvance.
  const handleRate = useCallback(
    async (r: Rating): Promise<CardState> => {
      if (!currentCard) throw new Error('No card to rate');
      return rateCard(currentCard.cardId, r);
    },
    [currentCard, rateCard],
  );

  // Advance the queue: remove the rated card so the next one shows.
  const handleAdvance = useCallback(
    (cardId: string) => {
      setRatedIds(prev => new Set([...prev, cardId]));
    },
    [],
  );

  // Per-session mute toggle — resets to unmuted when the page is reloaded.
  // All audio calls in CardReviewer are routed through this callback so a
  // single state variable controls the entire audio pipeline.
  const [muted, setMuted] = useState(false);
  const handleToggleMute = useCallback(() => setMuted(m => !m), []);
  const playAudio = useCallback(
    (text: string, onEnd?: () => void) => {
      if (muted) {
        onEnd?.();
        return;
      }
      speakSpanish(text, onEnd);
    },
    [muted],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const containerStyle: CSSProperties = {
    minHeight: '100vh',
    background: '#fafafa',
    fontFamily: "system-ui,'Segoe UI',sans-serif",
  };

  if (!isHydrated) {
    return (
      <div
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: 16,
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <HeaderStrip
        streak={streak.current}
        todaysReviewCount={todaysReviewCount}
        dailyGoal={dailyGoal}
        dueCount={dueCount}
        xpToday={xpToday}
        muted={muted}
        onToggleMute={handleToggleMute}
      />

      <main style={{ padding: '32px 16px 64px', maxWidth: 600, margin: '0 auto' }}>
        {currentCard == null ? (
          <EmptyState
            todaysReviewCount={todaysReviewCount}
            dailyGoal={dailyGoal}
            streak={streak.current}
            nextDueAt={nextDueAt}
          />
        ) : (
          <CardReviewer
            key={currentCard.cardId}
            card={currentCard}
            onRate={handleRate}
            onAdvance={handleAdvance}
            cardPool={allCards}
            playAudio={playAudio}
          />
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component — lazy-route entry point (no props, uses default adapter + cards)
// ---------------------------------------------------------------------------

export function Component(): ReactElement {
  return <Practice />;
}
