import { useState, useEffect } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { C, KeyNumbers, Tip, Trap, DataTable, QuestionCard, prepare, Panel } from './_helpers';
import type { PreparedQuestion } from './_helpers';
import { buildExam, EXAM_MINUTES, EXAM_LENGTH, PASS_PERCENT, EXAM_BLUEPRINT, AREA_NAMES } from '../questions';
import type { AcsArea } from '../questions';

type Phase = 'idle' | 'running' | 'done';

function mmss(s: number): string { const m = Math.floor(s / 60); const r = s % 60; return `${m}:${String(r).padStart(2, '0')}`; }

export function Guide33() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [deck, setDeck] = useState<PreparedQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flags, setFlags] = useState<boolean[]>([]);
  const [i, setI] = useState(0);
  const [timed, setTimed] = useState(true);
  const [secs, setSecs] = useState(EXAM_MINUTES * 60);
  const [confirm, setConfirm] = useState(false);
  const [missedOnly, setMissedOnly] = useState(true);

  useEffect(() => {
    if (phase !== 'running' || !timed) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [phase, timed]);
  useEffect(() => { if (phase === 'running' && timed && secs === 0) setPhase('done'); }, [secs, phase, timed]);

  const start = () => {
    const d = buildExam().map(prepare);
    setDeck(d); setAnswers(d.map(() => null)); setFlags(d.map(() => false)); setI(0); setSecs(EXAM_MINUTES * 60); setConfirm(false); setPhase('running');
  };
  const answered = answers.filter(a => a !== null).length;
  const score = deck.reduce((s, q, k) => s + (answers[k] === q.correct ? 1 : 0), 0);
  const passMark = Math.ceil((EXAM_LENGTH * PASS_PERCENT) / 100);
  const passed = score >= passMark;

  if (phase === 'idle') {
    return (
      <div>
        <DarkBox title="PRACTICE EXAM">
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>
            Sixty questions sampled from the whole course in the FAA's area weighting, three choices each, two hours on the clock. No explanations until you submit, just like the real thing. Pass mark is <strong>{PASS_PERCENT}%</strong>: {passMark} correct.
          </div>
        </DarkBox>
        <KeyNumbers color={C.purple} items={[
          { label: 'questions', value: String(EXAM_LENGTH) },
          { label: 'minutes', value: String(EXAM_MINUTES) },
          { label: 'to pass', value: `${passMark}/${EXAM_LENGTH}` },
        ]} />
        <DataTable color={C.purple} head={['Area', 'Questions on this exam', 'FAA weighting']} rows={(Object.keys(EXAM_BLUEPRINT) as AcsArea[]).map(a => [`${a}. ${AREA_NAMES[a]}`, String(EXAM_BLUEPRINT[a]), { I: '15–25%', II: '15–25%', III: '11–16%', IV: '7–11%', V: '35–45%' }[a]])} />
        <Panel color={C.purple}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, marginBottom: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={timed} onChange={e => setTimed(e.target.checked)} /> Run the two-hour timer (recommended at least once)
          </label>
          <button onClick={start} style={{ width: '100%', padding: 14, borderRadius: 10, border: 'none', background: C.purple, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Start the exam</button>
        </Panel>
        <Tip text="Every question in this bank is original, written to the FAA's Airman Certification Standards. The real questions are not public. If you can pass this reliably at 80% or better, you understand the material the test is built from." />
      </div>
    );
  }

  if (phase === 'running') {
    const q = deck[i];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '8px 12px', background: C.paper, border: `1px solid ${C.line}`, borderRadius: 10, marginBottom: 10, position: 'sticky', top: 0, zIndex: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>{answered}/{deck.length} answered · {flags.filter(Boolean).length} flagged</span>
          {timed && <span style={{ fontSize: 16, fontWeight: 800, color: secs < 600 ? C.red : C.purple, fontFamily: 'ui-monospace, Menlo, monospace' }}>{mmss(secs)}</span>}
        </div>
        <QuestionCard pq={q} chosen={answers[i]} onChoose={k => setAnswers(a => a.map((v, j) => j === i ? k : v))} color={C.purple} reveal={false} index={i} total={deck.length} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, marginBottom: 12 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{ padding: 10, borderRadius: 10, border: `1.5px solid ${C.line}`, background: C.paper, color: i === 0 ? '#bbb' : C.ink, fontWeight: 700, fontSize: 13, cursor: i === 0 ? 'default' : 'pointer' }}>← Previous</button>
          <button onClick={() => setFlags(f => f.map((v, j) => j === i ? !v : v))} aria-pressed={flags[i]} style={{ padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${flags[i] ? C.orange : C.line}`, background: flags[i] ? '#FFF3E0' : C.paper, color: flags[i] ? C.orange : C.muted, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{flags[i] ? '⚑ Flagged' : '⚐ Flag'}</button>
          <button onClick={() => setI(Math.min(deck.length - 1, i + 1))} disabled={i === deck.length - 1} style={{ padding: 10, borderRadius: 10, border: 'none', background: i === deck.length - 1 ? '#ddd' : C.purple, color: '#fff', fontWeight: 800, fontSize: 13, cursor: i === deck.length - 1 ? 'default' : 'pointer' }}>Next →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4, marginBottom: 12 }}>
          {deck.map((_, k) => {
            const on = k === i; const done = answers[k] !== null; const fl = flags[k];
            return <button key={k} onClick={() => setI(k)} aria-label={`Question ${k + 1}${done ? ', answered' : ''}${fl ? ', flagged' : ''}`} style={{ aspectRatio: '1', borderRadius: 6, fontSize: 10, fontWeight: 700, border: on ? `2px solid ${C.ink}` : `1px solid ${fl ? C.orange : C.line}`, background: fl ? '#FFF3E0' : done ? '#EDE7F6' : C.paper, color: done ? C.purple : C.muted, cursor: 'pointer' }}>{k + 1}</button>;
          })}
        </div>
        {!confirm ? (
          <button onClick={() => (answered < deck.length ? setConfirm(true) : setPhase('done'))} style={{ width: '100%', padding: 12, borderRadius: 10, border: `2px solid ${C.purple}`, background: C.paper, color: C.purple, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Submit exam</button>
        ) : (
          <div style={{ padding: '10px 12px', borderRadius: 10, background: '#FFF3E0', border: `1px solid ${C.orange}`, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#333', flex: 1 }}>{deck.length - answered} unanswered. Unanswered questions count as wrong; there is no guessing penalty.</span>
            <button onClick={() => setConfirm(false)} style={{ padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${C.line}`, background: C.paper, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Keep going</button>
            <button onClick={() => setPhase('done')} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: C.purple, color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Submit anyway</button>
          </div>
        )}
      </div>
    );
  }

  // done
  const areas = Object.keys(EXAM_BLUEPRINT) as AcsArea[];
  const rows = areas.map(a => {
    const idx = deck.map((q, k) => (q.src.area === a ? k : -1)).filter(k => k >= 0);
    const c = idx.filter(k => answers[k] === deck[k].correct).length;
    const pct = idx.length ? Math.round((c / idx.length) * 100) : 0;
    return [`${a}. ${AREA_NAMES[a]}`, `${c}/${idx.length}`, <span key={a} style={{ fontWeight: 800, color: pct >= 70 ? C.green : C.red }}>{pct}%</span>];
  });
  const list = deck.map((q, k) => ({ q, k })).filter(({ q, k }) => !missedOnly || answers[k] !== q.correct);
  return (
    <div>
      <DarkBox title={passed ? 'PASSED' : 'NOT YET'}>
        <div style={{ fontSize: 40, marginBottom: 4 }}>{passed ? '🏆' : '📖'}</div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{score}/{deck.length} · {Math.round((score / deck.length) * 100)}%</div>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>{passed ? `At or above the ${passMark}-correct pass mark.` : `Below the ${passMark}-correct pass mark. Review the missed questions, then reread the guides for your weakest area.`}{timed && secs === 0 ? ' Time expired.' : timed ? ` Time remaining: ${mmss(secs)}.` : ''}</div>
      </DarkBox>
      <DataTable color={C.purple} head={['Area', 'Correct', 'Score']} rows={rows} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <button onClick={() => setMissedOnly(m => !m)} style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${C.purple}`, background: C.paper, color: C.purple, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{missedOnly ? 'Show all questions' : 'Show missed only'}</button>
        <button onClick={start} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: C.purple, color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>🔄 New exam</button>
        <button onClick={() => setPhase('idle')} style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${C.line}`, background: C.paper, color: C.muted, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Back to start</button>
      </div>
      {list.length === 0 && <Panel color={C.green}><div style={{ fontSize: 13, color: '#1B5E20', fontWeight: 700 }}>Nothing missed. Take it again with the timer on, or go fly.</div></Panel>}
      {list.map(({ q, k }) => (
        <div key={q.src.id}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, margin: '4px 0' }}>Q{k + 1} · Area {q.src.area} {answers[k] === null ? '· unanswered' : ''}</div>
          <QuestionCard pq={q} chosen={answers[k] === null ? (q.correct + 1) % 3 : answers[k]} onChoose={() => undefined} color={C.purple} reveal />
        </div>
      ))}
      <Trap text="A pass here is not a pass there. The real exam uses FAA figures, FAA wording, and an unfamiliar room. Aim for 80%+ on three consecutive practice runs before you book." />
    </div>
  );
}
