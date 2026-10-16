import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, DefList, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

// A fictional UAS Facility Map around a Class D airport. Values are grid ceilings in ft AGL.
const grid: (number | null)[][] = [
  [400, 400, 300, 200, 300, 400],
  [400, 200, 100, 0, 100, 300],
  [300, 100, 0, 0, 0, 200],
  [400, 200, 100, 0, 100, 300],
  [400, 400, 300, 200, 300, 400],
  [null, null, 400, 400, null, null],
];

function cellColor(v: number | null): string {
  if (v === null) return '#E8F5E9';
  if (v === 0) return '#FFCDD2';
  if (v <= 100) return '#FFE0B2';
  if (v <= 300) return '#FFF9C4';
  return '#C8E6C9';
}

export function Guide13() {
  const [cell, setCell] = useState<[number, number]>([1, 2]);
  const [alt, setAlt] = useState(150);
  const v = grid[cell[0]][cell[1]];

  let verdict: { color: string; title: string; body: string };
  if (v === null) verdict = { color: C.green, title: 'Outside controlled airspace', body: 'No grid value: this is Class G at sUAS altitudes. No authorization needed, up to 400 ft AGL. All other rules still apply.' };
  else if (v === 0) verdict = { color: C.red, title: 'Grid ceiling 0 — no automatic approval', body: 'This grid sits on a runway or approach path. You can request further coordination through LAANC (manual ATC review, up to 90 days ahead) or apply through DroneZone, but do not expect a yes without a strong reason.' };
  else if (alt <= v) verdict = { color: C.green, title: `Auto-approved via LAANC up to ${v} ft`, body: `Your ${alt} ft request is at or below the ${v} ft grid ceiling. Submit through a LAANC provider app and the authorization comes back in seconds, valid only for the area, altitude, and window you asked for.` };
  else verdict = { color: C.orange, title: `Further coordination: ${alt} ft is above the ${v} ft ceiling`, body: 'Above the grid value, LAANC can still carry the request, but it goes to the facility for human review. File up to 90 days in advance and have a reason the controller can accept.' };

  return (
    <div>
      <DarkBox title="NOTAMs & LAANC">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Two systems you touch before every flight near an airport: <strong>NOTAMs</strong> tell you what has changed (TFRs, closed runways, unlit towers), and <strong>LAANC</strong> is how you get into Class B, C, D, or E-surface airspace in minutes instead of months.
        </div>
      </DarkBox>

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>UAS Facility Map — tap a grid square</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 3, maxWidth: 360, margin: '0 auto 8px' }}>
          {grid.map((row, r) => row.map((val, c) => {
            const on = cell[0] === r && cell[1] === c;
            return (
              <button key={`${r}-${c}`} onClick={() => setCell([r, c])} aria-pressed={on} aria-label={val === null ? 'Class G' : `grid ceiling ${val} feet`} style={{ aspectRatio: '1', borderRadius: 6, border: on ? `2.5px solid ${C.ink}` : `1px solid ${C.line}`, background: cellColor(val), fontSize: 12, fontWeight: 800, color: val === null ? '#2E7D32' : '#333', cursor: 'pointer' }}>
                {val === null ? 'G' : val}
              </button>
            );
          }))}
        </div>
        <Caption>A fictional map. Grid values are the maximum altitude (ft AGL) ATC will approve automatically. The 0s sit on the runway and its approach paths; G squares are outside the Class D circle.</Caption>
        <Slider label="Altitude you want to request" value={alt} min={0} max={400} step={10} onChange={setAlt} color={C.blue} format={x => `${x} ft AGL`} />
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, borderLeft: `4px solid ${verdict.color}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: verdict.color }}>{verdict.title}</div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 4 }}>{verdict.body}</div>
        </div>
      </Panel>

      <Card color={C.blue} title="LAANC in one paragraph">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Low Altitude Authorization and Notification Capability. The FAA publishes UAS Facility Maps with a grid ceiling over every participating airport. You ask an FAA-approved <strong>UAS Service Supplier</strong> app for a box of airspace, an altitude, and a time window. At or below the grid value the answer is automatic and near-instant. Above it, <strong>further coordination</strong> sends the request to a controller, up to 90 days ahead. Airports without LAANC go through <strong>FAA DroneZone</strong>, which can take up to 90 days. LAANC works for night operations too. An authorization is not a waiver and changes no operating rule.
        </div>
      </Card>

      <Card color={C.blue} title="NOTAMs">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.blue} items={[
            { term: 'FDC NOTAM', body: 'Flight Data Center: regulatory notices. TFRs, changes to instrument procedures, special security instructions. The kind that can make a flight illegal.' },
            { term: 'NOTAM (D)', body: '“Distant”: airport and navaid conditions. Closed runways, unlit obstructions, tower out of service, parachute jumping.' },
            { term: 'Where to look', body: 'The FAA NOTAM Search, Flight Service (1-800-WX-BRIEF), and UAS apps such as B4UFLY or any LAANC provider, which overlay TFRs on a map. ATIS may mention a local TFR but is not a complete source.' },
            { term: 'Not on the chart', body: 'TFRs are too short-lived to print. The sectional shows permanent special use airspace only.' },
          ]} />
        </div>
      </Card>

      <Trap text="'Call the tower' is the wrong answer. Towers do not issue Part 107 authorizations over the phone. LAANC or DroneZone are the only routes. Likewise, a Class G airport needs no authorization at all, though you still may not interfere with its traffic." />
      <Tip text="Grid ceilings are about what ATC will approve, not about where you may fly. A 400 square in a Class D is still Class D; you still need the authorization, it is just automatic." />

      <ExamQuiz questions={byTopic('notam-laanc')} color={C.blue} />
    </div>
  );
}
