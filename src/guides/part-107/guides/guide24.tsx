import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, DataTable, DefList, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const preflight = [
  { t: 'Operating environment assessed', d: 'Local weather, airspace and any flight restrictions, location of persons and property on the surface, other ground hazards (wires, towers, trees).', reg: true },
  { t: 'Everyone briefed', d: 'Operating conditions, emergency and contingency procedures, roles and responsibilities, potential hazards.', reg: true },
  { t: 'Control links checked', d: 'Controller and aircraft linked, telemetry live, signal strength good, failsafe behavior set.', reg: true },
  { t: 'Sufficient power', d: 'Battery charged for the planned flight plus reserve; controller and tablet charged too.', reg: true },
  { t: 'Payload secure', d: 'Anything attached is fastened and does not affect flight characteristics or controllability.', reg: true },
  { t: 'Condition for safe operation', d: 'Airframe, arms, props (cracks, chips, tightness), motors spin free, gimbal clear, no loose fasteners.', reg: true },
  { t: 'Remote ID broadcasting', d: 'Standard RID self-test passes, or the module is on and registered, or you are inside a FRIA.', reg: false },
  { t: 'Firmware and calibration', d: 'Firmware current; compass calibrated away from metal; IMU calibrated per manufacturer.', reg: false },
  { t: 'Home point and RTH altitude', d: 'Home point set at the actual takeoff spot; RTH altitude above the tallest obstacle.', reg: false },
  { t: 'Hover check', d: 'A short hover at eye level: level, steady, no odd sounds, no drift.', reg: false },
];

export function Guide24() {
  const [done, setDone] = useState<boolean[]>(preflight.map(() => false));
  const n = done.filter(Boolean).length;
  return (
    <div>
      <DarkBox title="BATTERIES & MAINTENANCE">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Part 107 does not prescribe a maintenance program. It requires a <strong>preflight inspection</strong> before every flight<Reg cite="49" /> and that the aircraft be in a <strong>condition for safe operation</strong><Reg cite="15" />. The manufacturer fills in the details. The test asks what the preflight must cover and how to treat lithium batteries.
        </div>
      </DarkBox>

      <Panel color={C.orange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.orange, letterSpacing: 1, textTransform: 'uppercase' }}>Preflight checklist</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: n === preflight.length ? C.green : C.muted }}>{n}/{preflight.length}</div>
        </div>
        {preflight.map((p, i) => (
          <button key={p.t} onClick={() => setDone(d => d.map((v, j) => j === i ? !v : v))} aria-pressed={done[i]} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8, width: '100%', textAlign: 'left', padding: '8px 10px', marginBottom: 4, borderRadius: 8, border: `1px solid ${done[i] ? C.green : C.line}`, background: done[i] ? '#E8F5E9' : C.paper, cursor: 'pointer' }}>
            <span style={{ fontSize: 15, color: done[i] ? C.green : C.muted }}>{done[i] ? '☑' : '☐'}</span>
            <span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{p.t}</span>
              {p.reg && <span style={{ fontSize: 9, fontWeight: 800, color: C.orange, border: `1px solid ${C.orange}`, borderRadius: 8, padding: '1px 6px', marginLeft: 6, verticalAlign: 'middle' }}>107.49</span>}
              <span style={{ display: 'block', fontSize: 12, color: '#444', lineHeight: 1.45, marginTop: 2 }}>{p.d}</span>
            </span>
          </button>
        ))}
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Items tagged 107.49 are what the regulation requires; the rest are what a sensible operator adds.</div>
      </Panel>

      <Trap text="'Which is NOT part of the required preflight?' Watch for 'file a flight plan', 'contact the control tower', or 'calibrate the compass'. The regulation lists: environment, briefing, control links, power, payload. Nothing else is mandatory by rule." />

      <DataTable color={C.orange} head={['Lithium-polymer rule', 'Why']} rows={[
        ['Store at about 50–60% (≈3.8 V per cell), cool and dry, in a fire-resistant bag', 'Full and empty both age the cells; a damaged cell can ignite during storage.'],
        ['Never fly a swollen, punctured, or dented pack', 'Gas inside means the chemistry is breaking down; it can go into thermal runaway under load.'],
        ['Let packs cool before charging; charge on a non-flammable surface and stay nearby', 'Charging is when most battery fires start.'],
        ['Expect less capacity in the cold; pre-warm and hover gently for a minute', 'Cold chemistry sags under load. A pack that read 100% can drop to a critical warning in seconds.'],
        ['Land with a reserve (20–30%) rather than at the warning', 'Voltage falls off a cliff at the bottom of the curve.'],
        ['Count cycles and retire packs that puff, heat up, or lose capacity', 'A battery is a consumable with a service life.'],
      ]} />

      <Card color={C.orange} title="Maintenance vocabulary (AC 107-2)">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.orange} items={[
            { term: 'Scheduled', body: 'Done at an interval the manufacturer recommends: hours, cycles, or calendar time. If the manufacturer publishes nothing, develop your own schedule from experience.' },
            { term: 'Unscheduled', body: 'Done when a defect, damage, or abnormal behavior is found: a hard landing, a prop strike, a vibration, an error message.' },
            { term: 'Records', body: 'Not required by Part 107 for a basic operation, but recommended, and often required by a waiver. Log flight time, battery cycles, maintenance, firmware, and anomalies.' },
            { term: 'Post-flight', body: 'Inspect for damage, note anomalies, record time, cool and store batteries. Finds the cracked prop before the next preflight does.' },
            { term: 'Compass / IMU calibration', body: 'Away from steel, vehicles, and reinforced concrete. Calibrating next to a truck bakes the error into the sensor.' },
            { term: 'Firmware', body: 'Keep current, but never update in the field right before a job. Test-fly after any update.' },
          ]} />
        </div>
      </Card>

      <Tip text="The regulation says the RPIC must determine the aircraft is in a condition for safe operation and discontinue the flight if it stops being so. That is a judgment call, and the preflight inspection is what makes it an informed one." />

      <ExamQuiz questions={byTopic('maintenance')} color={C.orange} />
    </div>
  );
}
