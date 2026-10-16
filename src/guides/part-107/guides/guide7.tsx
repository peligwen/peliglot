import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DefList, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

type Kind = 'waiver' | 'never' | 'auth';
interface Rule { cite: string; name: string; kind: Kind; note: string }

const rules: Rule[] = [
  { cite: '107.25', name: 'Operation from a moving vehicle or aircraft', kind: 'waiver', note: 'Waivable, except no waiver for carrying another person’s property for hire.' },
  { cite: '107.29', name: 'Anti-collision lighting at night / civil twilight', kind: 'waiver', note: 'The lighting requirement can be waived. Night itself no longer needs a waiver.' },
  { cite: '107.31', name: 'Visual line of sight', kind: 'waiver', note: 'The classic BVLOS waiver. Not for carriage of property for hire.' },
  { cite: '107.33', name: 'Visual observer', kind: 'waiver', note: 'Waivable (relevant mainly when paired with a VLOS waiver).' },
  { cite: '107.35', name: 'Multiple aircraft by one pilot', kind: 'waiver', note: 'Drone light shows live here.' },
  { cite: '107.37(a)', name: 'Yielding the right of way', kind: 'waiver', note: 'Waivable in theory; almost never granted.' },
  { cite: '107.39', name: 'Operation over people', kind: 'waiver', note: 'Still the route for aircraft that fit no category.' },
  { cite: '107.41', name: 'Operation in certain airspace', kind: 'auth', note: 'Listed as waivable, but in practice you get an airspace AUTHORIZATION via LAANC or DroneZone, not a waiver.' },
  { cite: '107.51', name: 'Operating limitations (400 ft, 87 kt, 3 SM, clouds)', kind: 'waiver', note: 'Altitude waivers for tower inspection, for example.' },
  { cite: '107.145', name: 'Operations over moving vehicles', kind: 'waiver', note: 'Added with the 2021 rule.' },
  { cite: '107.23', name: 'Careless or reckless operation', kind: 'never', note: 'No one gets a permission slip to be reckless.' },
  { cite: '107.36', name: 'Carriage of hazardous material', kind: 'never', note: 'Never waivable. A favorite test distractor.' },
  { cite: '107.49', name: 'Preflight familiarization and inspection', kind: 'never', note: 'Not on the list.' },
  { cite: '107.19', name: 'RPIC responsibility and authority', kind: 'never', note: 'Someone is always responsible.' },
];

const look: Record<Kind, { label: string; color: string; bg: string }> = {
  waiver: { label: 'Waivable', color: '#1B5E20', bg: '#E8F5E9' },
  never: { label: 'Not waivable', color: '#B71C1C', bg: '#FFEBEE' },
  auth: { label: 'Authorization, not waiver', color: '#0D47A1', bg: '#E3F2FD' },
};

export function Guide7() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div>
      <DarkBox title="WAIVERS — §107.200 & §107.205">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          A <strong>waiver</strong> lets you deviate from a specific operating rule if you can show the FAA the operation will be safe anyway. An <strong>authorization</strong> is permission to enter controlled airspace. The test checks that you know which rules are waivable, where to apply, and that the two instruments are not the same thing.
        </div>
      </DarkBox>

      <Panel color={C.red}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Tap a rule: can it be waived?</div>
        <div style={{ display: 'grid', gap: 5 }}>
          {rules.map((r, i) => {
            const open = sel === i; const lk = look[r.kind];
            return (
              <button key={r.cite} onClick={() => setSel(open ? null : i)} aria-expanded={open} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: 8, border: `1px solid ${open ? lk.color : C.line}`, background: open ? lk.bg : C.paper, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12.5, color: C.ink }}><strong style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: C.muted, marginRight: 6 }}>{r.cite}</strong>{r.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: open ? lk.color : C.muted, border: `1px solid ${open ? lk.color : C.line}`, borderRadius: 10, padding: '2px 8px', whiteSpace: 'nowrap' }}>{open ? lk.label : '?'}</span>
                </div>
                {open && <div style={{ fontSize: 12, color: '#333', marginTop: 6, lineHeight: 1.45 }}>{r.note}</div>}
              </button>
            );
          })}
        </div>
      </Panel>

      <Mnemonic text="Never waivable: hazmat (107.36), careless/reckless (107.23), preflight (107.49). Everything about HOW you fly can be bent with a safety case; WHAT you carry and WHETHER you care cannot." />

      <Card color={C.red} title="How a waiver works">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.red} items={[
            { term: 'Where', body: 'FAA DroneZone. The same portal handles registration, accident reports, and airspace authorizations for airports not covered by LAANC.' },
            { term: 'When', body: 'The FAA asks for at least 90 days. Complex requests (BVLOS, multiple aircraft) can take longer and often come back with questions.' },
            { term: 'What you submit', body: 'A description of the operation and, for each rule you want waived, the mitigations that make it as safe as flying by the rule. Performance-based: the FAA cares about outcomes, not a specific gadget.' },
            { term: 'What you get', body: 'A Certificate of Waiver with special provisions. Those provisions are binding; breaking one is breaking Part 107. Carry the waiver when you fly under it.' },
            { term: 'Authorization vs waiver', body: 'Class B/C/D/E-surface access is an authorization under §107.41 (LAANC in minutes, DroneZone in up to 90 days). It does not change any operating rule; a waiver does not grant airspace access.' },
          ]} />
        </div>
      </Card>

      <Trap text="'Which of the following requires a Part 107 waiver?' Options will include flying in Class D at 300 ft AGL. That needs an authorization, not a waiver. The waiver answer is something like 'operating two aircraft at once' or 'flying beyond visual line of sight.'" />
      <Tip text="Night used to be the most common waiver. Since April 2021 it is routine: anti-collision light visible 3 SM plus current training. If a question is dated by an old 'daylight only' assumption, trust the current rule." />

      <ExamQuiz questions={byTopic('waivers')} color={C.red} />
    </div>
  );
}
