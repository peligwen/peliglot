import { useState } from 'react';
import type { ReactNode, ReactElement, CSSProperties } from 'react';
import { Insight as BaseInsight } from '../../../components/Insight';
import type { ExamQuestion } from '../questions/types';
import { decode, ceilingOf, KIND_COLORS } from '../wx/decode';
import type { TokenKind } from '../wx/decode';

// ── Palette ───────────────────────────────────────────────────────────────
// One accent per category; guides reach for these instead of inventing hex.
export const C = {
  slate: '#37474F',
  red: '#C62828',
  blue: '#1565C0',
  teal: '#00838F',
  orange: '#EF6C00',
  green: '#2E7D32',
  purple: '#6A1B9A',
  ink: '#1a1a1a',
  muted: '#6E6E6E',
  line: '#e0dcd5',
  paper: '#fff',
  sand: '#FDFBF7',
} as const;

// ── Callouts ──────────────────────────────────────────────────────────────

/** Study tip. Plane emoji so it reads as aviation at a glance. */
export function Tip({ text }: { text: string }): ReactElement {
  return <BaseInsight text={text} emoji={'✈️'} />;
}

/** A known exam trap: the distractor the FAA likes to use. */
export function Trap({ text }: { text: string }): ReactElement {
  return <BaseInsight text={text} emoji={'⚠️'} bg="#FFEBEE" border="#F5C6C6" color="#B71C1C" />;
}

/** A mnemonic or memory hook. */
export function Mnemonic({ text }: { text: string }): ReactElement {
  return <BaseInsight text={text} emoji={'🧠'} bg="#F3E5F5" border="#E1BEE7" color="#6A1B9A" />;
}

/** Regulation citation chip, e.g. <Reg cite="107.51" /> → "14 CFR § 107.51". */
export function Reg({ cite, part = 107 }: { cite: string; part?: number }): ReactElement {
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: C.muted, background: '#f0eeeb', border: `1px solid ${C.line}`, borderRadius: 6, padding: '1px 7px', marginLeft: 6, whiteSpace: 'nowrap', fontFamily: 'ui-monospace, Menlo, monospace' }}>
      14 CFR {'§'} {part}.{cite}
    </span>
  );
}

// ── Layout helpers ────────────────────────────────────────────────────────

export function btnStyle(active: boolean, color: string): CSSProperties {
  return {
    padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13,
    border: active ? `2px solid ${color}` : `1.5px solid ${C.line}`,
    background: active ? color : C.paper,
    color: active ? '#fff' : C.muted,
  };
}

export interface TabsProps {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
  color: string;
}

export function Tabs({ tabs, active, onChange, color }: TabsProps): ReactElement {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 6, marginBottom: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
      {tabs.map((t, i) => (
        <button key={t} role="tab" aria-selected={active === i} onClick={() => onChange(i)} style={btnStyle(active === i, color)}>{t}</button>
      ))}
    </div>
  );
}

export interface KeyNumber { label: string; value: string; note?: string }

/** Grid of the numbers the test loves. */
export function KeyNumbers({ items, color }: { items: KeyNumber[]; color: string }): ReactElement {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8, marginBottom: 14 }}>
      {items.map(k => (
        <div key={k.label} style={{ background: C.paper, border: `1px solid ${C.line}`, borderTop: `3px solid ${color}`, borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1.1 }}>{k.value}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, marginTop: 4 }}>{k.label}</div>
          {k.note && <div style={{ fontSize: 11, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{k.note}</div>}
        </div>
      ))}
    </div>
  );
}

export interface DataTableProps {
  head: string[];
  rows: ReactNode[][];
  color: string;
  /** Column index to render bold (default 0). Pass -1 for none. */
  boldCol?: number;
}

export function DataTable({ head, rows, color, boldCol = 0 }: DataTableProps): ReactElement {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 14, border: `1px solid ${C.line}`, borderRadius: 10, background: C.paper }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {head.map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 10px', background: color, color: '#fff', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? C.sand : C.paper }}>
              {r.map((cell, j) => <td key={j} style={{ padding: '7px 10px', borderTop: `1px solid ${C.line}`, verticalAlign: 'top', lineHeight: 1.4, fontWeight: j === boldCol ? 700 : 400, color: j === boldCol ? C.ink : '#333' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A labelled definition row list: term on the left, body on the right. */
export function DefList({ items, color }: { items: { term: string; body: ReactNode }[]; color: string }): ReactElement {
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 10, marginBottom: 14, overflow: 'hidden' }}>
      {items.map((it, i) => (
        <div key={it.term} style={{ display: 'grid', gridTemplateColumns: 'minmax(96px, 30%) 1fr', gap: 10, padding: '8px 12px', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color }}>{it.term}</div>
          <div style={{ fontSize: 12, color: '#333', lineHeight: 1.45 }}>{it.body}</div>
        </div>
      ))}
    </div>
  );
}

/** Monospace block for METARs, TAFs, radio calls, chart text. */
export function Mono({ children, color = C.ink }: { children: ReactNode; color?: string }): ReactElement {
  return (
    <pre style={{ background: '#1a1a1a', color: '#e8e8e8', borderRadius: 10, padding: '12px 14px', fontSize: 12.5, lineHeight: 1.6, overflowX: 'auto', margin: '0 0 12px 0', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', borderLeft: `4px solid ${color}`, whiteSpace: 'pre-wrap' }}>
      {children}
    </pre>
  );
}

/** Slider with label and formatted value. */
export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  color: string;
}

export function Slider({ label, value, min, max, step = 1, onChange, format, color }: SliderProps): ReactElement {
  const id = 'sl-' + label.replace(/\W+/g, '-').toLowerCase();
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 2 }}>
        <label htmlFor={id} style={{ fontWeight: 700, color: C.ink }}>{label}</label>
        <span style={{ fontWeight: 800, color }}>{format ? format(value) : String(value)}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: color }} />
    </div>
  );
}

// ── Exam questions ────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface PreparedQuestion {
  src: ExamQuestion;
  /** Option text in display order. */
  options: string[];
  /** Index into `options` of the correct answer after shuffling. */
  correct: number;
}

export function prepare(q: ExamQuestion): PreparedQuestion {
  const idx = shuffle([0, 1, 2]);
  const options = idx.map(i => q.options[i]);
  return { src: q, options, correct: idx.indexOf(q.answer) };
}

const LETTERS = ['A', 'B', 'C'];

export interface QuestionCardProps {
  pq: PreparedQuestion;
  chosen: number | null;
  onChoose: (i: number) => void;
  color: string;
  /** Show the explanation after a choice (true for study mode; false while an exam is in progress). */
  reveal: boolean;
  index?: number;
  total?: number;
}

/** One exam-style question: stem, optional figure, A/B/C options, explanation. */
export function QuestionCard({ pq, chosen, onChoose, color, reveal, index, total }: QuestionCardProps): ReactElement {
  const answered = chosen !== null;
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
      {index !== undefined && total !== undefined && (
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Question {index + 1} of {total}</div>
      )}
      {pq.src.figure && <Mono color={color}>{pq.src.figure}</Mono>}
      <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, lineHeight: 1.5, marginBottom: 10 }}>{pq.src.q}</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {pq.options.map((opt, i) => {
          const isCorrect = i === pq.correct;
          const isChosen = i === chosen;
          let bg: string = C.paper, border = `1.5px solid ${C.line}`, col = '#333';
          if (answered && reveal) {
            if (isCorrect) { bg = '#E8F5E9'; border = '2px solid #2E7D32'; col = '#1B5E20'; }
            else if (isChosen) { bg = '#FFEBEE'; border = '2px solid #C62828'; col = '#B71C1C'; }
            else { col = '#aaa'; }
          } else if (isChosen) {
            bg = '#E3F2FD'; border = `2px solid ${color}`; col = color;
          }
          return (
            <button key={i} onClick={() => onChoose(i)} disabled={answered && reveal} aria-pressed={isChosen} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', padding: '10px 12px', borderRadius: 10, border, background: bg, color: col, fontSize: 13, lineHeight: 1.4, cursor: answered && reveal ? 'default' : 'pointer' }}>
              <span style={{ fontWeight: 800, minWidth: 18 }}>{LETTERS[i]}.</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && reveal && (
        <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 10, background: chosen === pq.correct ? '#E8F5E9' : '#FFF8E7', border: `1px solid ${chosen === pq.correct ? '#C8E6C9' : '#F0E4C4'}`, fontSize: 12.5, color: '#333', lineHeight: 1.5 }}>
          <strong style={{ color: chosen === pq.correct ? '#1B5E20' : '#8B6914' }}>{chosen === pq.correct ? 'Correct. ' : `Not quite — the answer is ${LETTERS[pq.correct]}. `}</strong>
          {pq.src.explain}
        </div>
      )}
    </div>
  );
}

export interface ExamQuizProps {
  questions: ExamQuestion[];
  color: string;
  title?: string;
}

/**
 * Per-guide mini quiz in FAA format. Questions shuffle on mount and on retry.
 * Explanations show immediately — this is study mode, not the exam.
 */
export function ExamQuiz({ questions, color, title = 'Check yourself' }: ExamQuizProps): ReactElement {
  const [deck, setDeck] = useState<PreparedQuestion[]>(() => shuffle(questions).map(prepare));
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { setDeck(shuffle(questions).map(prepare)); setI(0); setChosen(null); setScore(0); setDone(false); };
  const choose = (k: number) => {
    if (chosen !== null) return;
    setChosen(k);
    if (k === deck[i].correct) setScore(s => s + 1);
  };
  const next = () => {
    if (i + 1 >= deck.length) setDone(true);
    else { setI(i + 1); setChosen(null); }
  };

  if (deck.length === 0) return <></>;

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: 1.5, textTransform: 'uppercase' }}>{title}</span>
        <span style={{ flex: 1, height: 1, background: C.line }} />
        <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>FAA format: 3 choices</span>
      </div>
      {!done ? (
        <>
          <QuestionCard pq={deck[i]} chosen={chosen} onChoose={choose} color={color} reveal index={i} total={deck.length} />
          {chosen !== null && (
            <button onClick={next} style={{ width: '100%', padding: 12, borderRadius: 10, border: 'none', background: color, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
              {i + 1 >= deck.length ? 'See score →' : 'Next →'}
            </button>
          )}
        </>
      ) : (
        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ fontSize: 30, marginBottom: 4 }}>{score / deck.length >= 0.7 ? '✅' : '📖'}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.ink }}>{score}/{deck.length}</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>
            {score / deck.length >= 0.7 ? 'Above the 70% pass line for this topic.' : 'Below 70% — reread the guide, then try again.'}
          </div>
          <button onClick={reset} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: color, color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>{'🔄'} Try again</button>
        </div>
      )}
    </div>
  );
}

// ── METAR / TAF decoder widget ────────────────────────────────────────────

export interface WxDecoderProps {
  samples: { label: string; raw: string }[];
  mode: 'metar' | 'taf';
  color: string;
}

export function WxDecoder({ samples, mode, color }: WxDecoderProps): ReactElement {
  const [si, setSi] = useState(0);
  const [raw, setRaw] = useState(samples[0].raw);
  const [sel, setSel] = useState<number | null>(null);
  const tokens = decode(raw, mode);
  const ceiling = mode === 'metar' ? ceilingOf(tokens) : null;
  return (
    <Panel color={color}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {samples.map((s, i) => (
          <button key={s.label} onClick={() => { setSi(i); setRaw(s.raw); setSel(null); }} style={btnStyle(si === i, color)}>{s.label}</button>
        ))}
      </div>
      <textarea aria-label={`${mode.toUpperCase()} text`} value={raw} onChange={e => { setRaw(e.target.value.toUpperCase()); setSel(null); setSi(-1); }} rows={mode === 'taf' ? 5 : 2} spellCheck={false} style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 12.5, padding: 10, borderRadius: 10, border: `1.5px solid ${C.line}`, resize: 'vertical', marginBottom: 8 }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
        {tokens.map((t, i) => {
          const col = KIND_COLORS[t.kind]; const on = sel === i;
          return (
            <button key={i} onClick={() => setSel(on ? null : i)} aria-pressed={on} style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 12.5, fontWeight: 700, padding: '3px 7px', borderRadius: 6, border: `1.5px solid ${col}`, background: on ? col : C.paper, color: on ? '#fff' : col, cursor: 'pointer', opacity: t.kind === 'other' ? 0.6 : 1 }}>{t.text}</button>
          );
        })}
      </div>
      <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, fontSize: 12.5, color: '#333', lineHeight: 1.5, minHeight: 40 }}>
        {sel === null ? (
          <>Tap any group to decode it.{ceiling !== null && <> <strong>Ceiling: {ceiling.toLocaleString()} ft AGL</strong> (lowest broken, overcast, or vertical-visibility layer).</>}{mode === 'metar' && ceiling === null && tokens.some(t => t.kind === 'sky') && <> <strong>No ceiling</strong> (no broken or overcast layer).</>}</>
        ) : (
          <><strong style={{ color: KIND_COLORS[tokens[sel].kind], fontFamily: 'ui-monospace, Menlo, monospace' }}>{tokens[sel].text}</strong> — {tokens[sel].meaning}</>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {(['station', 'time', 'wind', 'vis', 'wx', 'sky', 'temp', 'alt', ...(mode === 'taf' ? ['change'] : ['rmk'])] as TokenKind[]).map(k => (
          <span key={k} style={{ fontSize: 10, fontWeight: 700, color: KIND_COLORS[k], display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: KIND_COLORS[k], display: 'inline-block' }} />{k}</span>
        ))}
      </div>
    </Panel>
  );
}

// ── Small shared SVG bits ─────────────────────────────────────────────────

/** Section label used above diagrams. */
export function Caption({ children }: { children: ReactNode }): ReactElement {
  return <div style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 4, marginBottom: 14, lineHeight: 1.4 }}>{children}</div>;
}

/** A plain white panel for interactive widgets. */
export function Panel({ children, color }: { children: ReactNode; color?: string }): ReactElement {
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderLeft: color ? `4px solid ${color}` : `1px solid ${C.line}`, borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
      {children}
    </div>
  );
}
