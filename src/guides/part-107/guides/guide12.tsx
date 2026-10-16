import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, DefList, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Sua { name: string; code: string; line: string; lineColor: string; hatched: boolean; rule: string; action: string; level: 'no' | 'ask' | 'caution' }

const suas: Sua[] = [
  { name: 'Prohibited area', code: 'P-56', line: 'Blue hatched', lineColor: '#1565C0', hatched: true, rule: 'Flight prohibited for national security or welfare reasons (the White House, Camp David).', action: 'Permission from the using/controlling agency is required and essentially never granted to sUAS.', level: 'no' },
  { name: 'Restricted area', code: 'R-2501', line: 'Blue hatched', lineColor: '#1565C0', hatched: true, rule: 'Contains hazards invisible from the air: artillery, missiles, aerial gunnery. Active at published times or by NOTAM.', action: 'Permission from the using or controlling agency listed in the chart margin.', level: 'ask' },
  { name: 'Warning area', code: 'W-237', line: 'Blue hatched', lineColor: '#1565C0', hatched: true, rule: 'Same hazards as restricted, but over international waters from 3 NM offshore, where the FAA cannot prohibit flight.', action: 'Not prohibited. Treat it like a restricted area in practice.', level: 'caution' },
  { name: 'Military Operations Area', code: 'MOA', line: 'Magenta hatched', lineColor: '#C2185B', hatched: true, rule: 'Separates military training (dogfighting, low-level) from IFR traffic. Fast jets, often below 1,500 ft.', action: 'No permission needed. Exercise extreme caution; call the controlling agency or FSS for activity.', level: 'caution' },
  { name: 'Alert area', code: 'A-220', line: 'Blue hatched', lineColor: '#1565C0', hatched: true, rule: 'High volume of pilot training or unusual aerial activity (parachuting, glider tows).', action: 'No permission needed. Everyone shares see-and-avoid.', level: 'caution' },
  { name: 'Controlled Firing Area', code: 'CFA', line: 'Not charted', lineColor: '#9E9E9E', hatched: false, rule: 'Firing that is suspended the instant a spotter, radar, or lookout sees an aircraft approaching.', action: 'Nothing to do; the burden is on the range. Not shown on charts for that reason.', level: 'caution' },
  { name: 'National Security Area', code: 'NSA', line: 'Dashed magenta', lineColor: '#C2185B', hatched: false, rule: 'Airspace over a sensitive ground facility. Pilots are requested to voluntarily avoid it.', action: 'Avoid. It can become a hard prohibition by NOTAM under 14 CFR 99.7.', level: 'caution' },
  { name: 'Military Training Route', code: 'IR / VR', line: 'Gray line', lineColor: '#78909C', hatched: false, rule: 'Low-level, high-speed routes. 4 digits = all segments at or below 1,500 ft AGL; 3 digits = some part above 1,500 ft.', action: 'Not prohibited. Cross quickly; a jet at 450 knots covers 7.5 NM a minute.', level: 'caution' },
];

const tfrs = [
  { t: 'Stadiums', d: '3 NM radius, up to 3,000 ft AGL, 1 hour before to 1 hour after: MLB, NFL, NCAA Division I football, major motor speedway events, at venues seating 30,000+. A standing FDC NOTAM.', cite: '91.145' },
  { t: 'Disasters and hazards', d: 'Wildfires, chemical spills, hurricane response. Prevents interference with relief aircraft. “If you fly, we can’t.”', cite: '91.137' },
  { t: 'VIP movements', d: 'The President, Vice President, and other dignitaries. Usually 10 and 30 NM rings, announced a day or two ahead. Large and strictly enforced.', cite: '91.141' },
  { t: 'Space operations', d: 'Launch and reentry sites.', cite: '91.143' },
  { t: 'Special security instructions', d: 'The DC SFRA/FRZ and other national-security areas; the legal hook that makes an NSA mandatory.', cite: '99.7' },
];

const levelLook = { no: { label: 'No-go', color: '#B71C1C', bg: '#FFEBEE' }, ask: { label: 'Permission required', color: '#E65100', bg: '#FFF3E0' }, caution: { label: 'Legal, use caution', color: '#1B5E20', bg: '#E8F5E9' } };

function Swatch({ s }: { s: Sua }) {
  const id = 'sw-' + s.code.replace(/\W+/g, '');
  return (
    <svg width={44} height={32} viewBox="0 0 44 32" aria-hidden="true">
      {s.hatched && <defs><pattern id={id} width={4} height={4} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={4} stroke={s.lineColor} strokeWidth={1.5} /></pattern></defs>}
      <rect x={3} y={3} width={38} height={26} fill={s.hatched ? `url(#${id})` : 'none'} stroke={s.lineColor} strokeWidth={1.5} strokeDasharray={s.line.startsWith('Dashed') ? '4,3' : s.line === 'Not charted' ? '1,3' : undefined} />
    </svg>
  );
}

export function Guide12() {
  const [sel, setSel] = useState(1);
  const s = suas[sel]; const lk = levelLook[s.level];
  return (
    <div>
      <DarkBox title="SPECIAL USE AIRSPACE & TFRs">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Special use airspace is where the military and the government reserve the sky. The test wants the chart depiction, whether you need permission, and who you ask. TFRs are the temporary version, published by NOTAM and never printed on the chart.<Reg cite="45" /><Reg cite="47" />
        </div>
      </DarkBox>

      <Panel color={C.blue}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 6, marginBottom: 10 }}>
          {suas.map((x, i) => (
            <button key={x.code} onClick={() => setSel(i)} aria-pressed={sel === i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 8px', borderRadius: 8, border: sel === i ? `2px solid ${C.blue}` : `1.5px solid ${C.line}`, background: sel === i ? '#E3F2FD' : C.paper, cursor: 'pointer', textAlign: 'left' }}>
              <Swatch s={x} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{x.name}</span>
            </button>
          ))}
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: lk.bg, border: `1px solid ${lk.color}33` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>{s.name} <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: C.muted, fontWeight: 600, fontSize: 12 }}>{s.code}</span></div>
            <span style={{ fontSize: 10, fontWeight: 800, color: lk.color, border: `1px solid ${lk.color}`, borderRadius: 10, padding: '2px 8px' }}>{lk.label}</span>
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Chart: {s.line}</div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 6 }}>{s.rule}</div>
          <div style={{ fontSize: 12.5, color: lk.color, fontWeight: 600, lineHeight: 1.5, marginTop: 6 }}>{s.action}</div>
        </div>
      </Panel>

      <Trap text="MOAs are the trick: they look scary on the chart but require no permission. Restricted areas look identical to prohibited areas (blue hatching) but can be entered with the controlling agency's permission when inactive. Read the label, not the hatching." />

      <Card color={C.blue} title="Temporary Flight Restrictions">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.blue} items={tfrs.map(t => ({ term: t.t, body: <>{t.d}<Reg part={t.cite.startsWith('99') ? 99 : 91} cite={t.cite.split('.')[1]} /></> }))} />
        </div>
      </Card>

      <Card color={C.blue} title="Washington, DC and other fixed restrictions">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 8px' }}><strong>DC FRZ</strong> (Flight Restricted Zone): roughly 15 NM around Reagan National. No sUAS without specific FAA authorization. <strong>DC SFRA</strong> (Special Flight Rules Area): the 30 NM ring; Part 107 flight is possible with normal airspace authorizations and extra conditions.</p>
          <p style={{ margin: 0 }}><strong>National Parks:</strong> the National Park Service bans launching, landing, or operating from park land. The airspace above is still FAA airspace; the ground is not yours to use. Many state parks, cities, and stadium operators have similar land-use rules.</p>
        </div>
      </Card>

      <Tip text="Where to find the details: the sectional margin has a table of every P, R, W, A, and MOA on the chart with altitudes, times of use, and the controlling agency. TFRs live only in NOTAMs; check them the morning of every flight." />

      <ExamQuiz questions={byTopic('sua')} color={C.blue} />
    </div>
  );
}
