import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, DefList, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const attitudes = [
  { name: 'Anti-authority', thought: '“Don’t tell me. Those rules are for other people.”', antidote: 'Follow the rules. They are usually right.' },
  { name: 'Impulsivity', thought: '“Do it quickly!”', antidote: 'Not so fast. Think first.' },
  { name: 'Invulnerability', thought: '“It won’t happen to me.”', antidote: 'It could happen to me.' },
  { name: 'Macho', thought: '“I can do it. Watch this.”', antidote: 'Taking chances is foolish.' },
  { name: 'Resignation', thought: '“What’s the use?”', antidote: 'I’m not helpless. I can make a difference.' },
];

const prompts = [
  { text: 'The client is paying by the hour and the wind is 5 kt over your limit. “It’s only a little over; I’ve flown worse.”', a: 3 },
  { text: 'The LAANC request came back denied. “The tower never looks anyway, and I’ll only be up five minutes.”', a: 0 },
  { text: 'The battery warning chirps mid-shot. “Fine, I’ll just whip it back home at full speed.”', a: 1 },
  { text: 'A helicopter has been working the ridge all morning. “They’ll see me. Drones don’t actually hit helicopters.”', a: 2 },
  { text: 'The compass keeps throwing errors at this site. “Nothing I can do about it. Let’s just fly and hope.”', a: 4 },
];

const likelihood = ['Improbable', 'Remote', 'Occasional', 'Probable'];
const severity = ['Negligible', 'Marginal', 'Critical', 'Catastrophic'];

function riskColor(l: number, s: number): string {
  const v = l + s;
  if (v >= 5) return '#EF9A9A';
  if (v >= 3) return '#FFE082';
  return '#C8E6C9';
}

export function Guide26() {
  const [pi, setPi] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [cell, setCell] = useState<[number, number]>([2, 2]);
  const p = prompts[pi];
  return (
    <div>
      <DarkBox title="AERONAUTICAL DECISION-MAKING">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          ADM is a systematic way of deciding, built so that stress, pressure, and ego do not decide for you. The test asks for the acronyms by letter and, above all, for the <strong>five hazardous attitudes and their antidotes</strong>. Expect at least two questions on those alone.
        </div>
      </DarkBox>

      <DataTable color={C.green} head={['Attitude', 'The thought', 'The antidote']} rows={attitudes.map(a => [a.name, a.thought, a.antidote])} />

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Name that attitude</div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, fontSize: 13, color: C.ink, lineHeight: 1.5, marginBottom: 10, fontStyle: 'italic' }}>{p.text}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 6, marginBottom: 10 }}>
          {attitudes.map((a, i) => {
            const chosen = pick === i; const correct = p.a === i;
            let bg: string = C.paper, border = `1.5px solid ${C.line}`, col: string = C.muted;
            if (pick !== null) { if (correct) { bg = '#E8F5E9'; border = `2px solid ${C.green}`; col = '#1B5E20'; } else if (chosen) { bg = '#FFEBEE'; border = `2px solid ${C.red}`; col = '#B71C1C'; } }
            return <button key={a.name} onClick={() => pick === null && setPick(i)} style={{ padding: '8px 6px', borderRadius: 8, border, background: bg, color: col, fontWeight: 700, fontSize: 12, cursor: pick === null ? 'pointer' : 'default' }}>{a.name}</button>;
          })}
        </div>
        {pick !== null && (
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginBottom: 10 }}>
            <strong style={{ color: pick === p.a ? '#1B5E20' : '#B71C1C' }}>{pick === p.a ? 'Yes: ' : `That is ${attitudes[p.a].name.toLowerCase()}. `}</strong>Antidote: <em>“{attitudes[p.a].antidote}”</em>
          </div>
        )}
        <button onClick={() => { setPi((pi + 1) % prompts.length); setPick(null); }} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: C.green, color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Next scenario →</button>
      </Panel>

      <Mnemonic text="AIIMR, like a rifle aimed badly: Anti-authority, Impulsivity, Invulnerability, Macho, Resignation. Each antidote is a one-line comeback you say to yourself out loud." />

      <Card color={C.green} title="The acronyms">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'DECIDE', body: 'Detect that a change has occurred. Estimate its significance. Choose a desirable outcome. Identify actions that get you there. Do the best one. Evaluate the effect, then loop.' },
            { term: 'PAVE', body: 'The four risk sources: Pilot, Aircraft, enVironment, External pressures. Run it during planning.' },
            { term: 'IMSAFE', body: 'The pilot’s self-check: Illness, Medication, Stress, Alcohol, Fatigue, Emotion (or Eating).' },
            { term: '3P', body: 'Perceive the hazards, Process their risk, Perform the mitigation. Then perceive again.' },
            { term: 'Risk', body: 'Likelihood × severity. Managed by identifying hazards, assessing their risk, and mitigating until the residual risk is acceptable.' },
            { term: 'Situational awareness', body: 'An accurate picture of everything affecting the flight, now and a few minutes ahead. Lost through fixation, distraction, and task overload.' },
            { term: 'External pressures', body: 'The client, the deadline, the sunset, the money already spent. The antidote is personal minimums set in advance, when you are calm.' },
          ]} />
        </div>
      </Card>

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Risk assessment matrix — tap a cell</div>
        <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(4, 1fr)', gap: 3, fontSize: 10 }}>
          <div />
          {severity.map(s => <div key={s} style={{ textAlign: 'center', fontWeight: 700, color: C.muted }}>{s}</div>)}
          {likelihood.slice().reverse().map((l, ri) => {
            const li = 3 - ri;
            return [
              <div key={l} style={{ fontWeight: 700, color: C.muted, display: 'flex', alignItems: 'center' }}>{l}</div>,
              ...severity.map((_, si) => <button key={`${li}-${si}`} onClick={() => setCell([li, si])} aria-pressed={cell[0] === li && cell[1] === si} style={{ height: 32, borderRadius: 6, border: cell[0] === li && cell[1] === si ? `2.5px solid ${C.ink}` : `1px solid ${C.line}`, background: riskColor(li, si), cursor: 'pointer' }} />),
            ];
          })}
        </div>
        <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 10 }}>
          <strong>{likelihood[cell[0]]} × {severity[cell[1]]}:</strong> {cell[0] + cell[1] >= 5 ? 'unacceptable as planned. Mitigate until it moves out of the red, or do not fly.' : cell[0] + cell[1] >= 3 ? 'acceptable with mitigation. Decide what reduces the likelihood or the severity, and do it before launch.' : 'acceptable. Note it and monitor.'}
        </div>
      </Panel>

      <Trap text="The antidote questions use the FAA's exact wording. 'Follow the rules. They are usually right.' is anti-authority. 'Not so fast. Think first.' is impulsivity. 'Taking chances is foolish.' is macho. Learn the five sentences verbatim." />
      <Tip text="Hazardous attitudes are not personality types; they are moments. Every pilot has all five on a bad day. The skill is noticing the sentence in your head and answering it." />

      <ExamQuiz questions={byTopic('adm')} color={C.green} />
    </div>
  );
}
