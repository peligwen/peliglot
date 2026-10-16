import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, DataTable, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Sc { q: string; ok: boolean; why: string }
const scenarios: Sc[] = [
  { q: 'The RPIC glances at the controller screen for ten seconds while the VO keeps the aircraft in sight.', ok: true, why: '§107.31(b): VLOS may be exercised by the RPIC and the person on the controls, or by a VO. The VO is covering.' },
  { q: 'The VO uses binoculars to keep the aircraft in sight at long range.', ok: false, why: 'Vision must be unaided except for corrective lenses. Binoculars kill peripheral scanning.' },
  { q: 'An uncertificated camera operator flies the aircraft while the RPIC stands beside them, ready to take the controls.', ok: true, why: '§107.12(a)(2): direct supervision, with the RPIC able to take immediate control.' },
  { q: 'With a VO watching, the RPIC flies the aircraft two miles away behind a ridge.', ok: false, why: 'A VO does not create a BVLOS permission. Someone must still see the aircraft unaided. That takes a §107.31 waiver.' },
  { q: 'The VO stands 200 yards away and communicates with the RPIC by handheld radio.', ok: true, why: '§107.33(a): effective communication at all times, by any means that works in real time.' },
  { q: 'The VO also runs the gimbal and composes shots on a second screen.', ok: false, why: 'Legal in the narrowest sense, but the VO’s duty under §107.33(c) is to scan and keep the aircraft in sight. A VO looking at a screen is not observing. Give the job to someone else.' },
  { q: 'One RPIC supervises two uncertificated pilots each flying their own aircraft at the same time.', ok: false, why: 'The RPIC would be responsible for two aircraft at once, which §107.35 prohibits without a waiver.' },
  { q: 'A 15-year-old serves as the VO.', ok: true, why: 'No age or certificate requirement for a VO, only the vision, communication, and briefing requirements (and no disqualifying condition under §107.17).' },
];

export function Guide25() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <DarkBox title="CREW ROLES & CRM">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Three roles can exist on a Part 107 flight: the <strong>remote pilot in command</strong>, the <strong>person manipulating the controls</strong> (often the same person), and the optional <strong>visual observer</strong>. The rule assigns each a job, and the test probes the edges: who needs a certificate, who may look away, what a VO can and cannot substitute for.
        </div>
      </DarkBox>

      <DataTable color={C.green} head={['Role', 'Needs a certificate?', 'Must', 'May']} rows={[
        ['Remote pilot in command', 'Yes', 'Be designated before flight; final authority and responsibility; able to see the aircraft (or use a VO); take immediate control from anyone else flying.', 'Delegate the sticks under direct supervision.'],
        ['Person manipulating the controls', 'No, if under direct supervision of the RPIC', 'See the aircraft unaided (or rely on the VO); hand control back on demand.', 'Be a trainee, a camera operator, a client having a go.'],
        ['Visual observer', 'No', 'See the aircraft unaided; communicate with the RPIC at all times; scan the airspace and report hazards; be briefed.', 'Let the RPIC glance at screens. Not fly BVLOS.'],
      ]} />

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Legal or not? Tap to check</div>
        {scenarios.map((s, i) => {
          const on = open === i;
          return (
            <button key={i} onClick={() => setOpen(on ? null : i)} aria-expanded={on} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 10px', marginBottom: 5, borderRadius: 8, border: `1px solid ${on ? (s.ok ? C.green : C.red) : C.line}`, background: on ? (s.ok ? '#E8F5E9' : '#FFEBEE') : C.paper, cursor: 'pointer' }}>
              <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{s.q}</div>
              {on && <div style={{ fontSize: 12.5, marginTop: 6, lineHeight: 1.45, color: s.ok ? '#1B5E20' : '#B71C1C' }}><strong>{s.ok ? 'Legal.' : 'Not legal (or not wise).'}</strong> {s.why}</div>}
            </button>
          );
        })}
      </Panel>

      <Card color={C.green} title="The briefing, §107.49(a)(2)">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Before flight the RPIC ensures everyone directly participating knows: the <strong>operating conditions</strong>, the <strong>emergency procedures</strong>, the <strong>contingency procedures</strong>, each person’s <strong>roles and responsibilities</strong>, and the <strong>potential hazards</strong>. Two minutes, every time, even with the same crew.<Reg cite="49" />
        </div>
      </Card>

      <Card color={C.green} title="Crew resource management">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          CRM is using <strong>all available resources</strong> to get the job done safely: the people (VO, client, bystanders who know the site), the hardware (telemetry, obstacle sensors, a scanner on the CTAF), and the information (weather, NOTAMs, the chart). Its failure modes are task saturation, fixation on one screen, and silence: a VO who sees a helicopter and assumes the pilot saw it too. The single-pilot version is called SRM, and it is mostly about building the pauses in yourself.
        </div>
      </Card>

      <Trap text="'Direct supervision' means the RPIC can take control IMMEDIATELY. Standing next to the pilot: yes. Watching a video feed from the office: no. The test phrases it as 'the RPIC must have the ability to immediately take direct control of the small unmanned aircraft.'" />
      <Tip text="A VO is optional, but once you use one, their obligations become real regulatory requirements. Brief them properly: where to stand, what to watch, how to speak up, and the words you will use if they need you to land now." />

      <ExamQuiz questions={byTopic('crew')} color={C.green} />
    </div>
  );
}
