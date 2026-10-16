import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const zones = [
  { name: 'Eastern', std: 5, dst: 4 },
  { name: 'Central', std: 6, dst: 5 },
  { name: 'Mountain', std: 7, dst: 6 },
  { name: 'Pacific', std: 8, dst: 7 },
  { name: 'Alaska', std: 9, dst: 8 },
  { name: 'Hawaii', std: 10, dst: 10 },
];

function pad(n: number): string { return String(n).padStart(2, '0'); }

export function Guide11() {
  const [zone, setZone] = useState(0);
  const [dst, setDst] = useState(true);
  const [local, setLocal] = useState('14:30');
  const [elev, setElev] = useState(1223);
  const [agl, setAgl] = useState(400);
  const [tc, setTc] = useState(90);
  const [varDeg, setVarDeg] = useState(8);
  const [east, setEast] = useState(false);

  const off = dst ? zones[zone].dst : zones[zone].std;
  const [hh, mm] = local.split(':').map(Number);
  const zMin = ((hh * 60 + mm) + off * 60) % (24 * 60);
  const zulu = `${pad(Math.floor(zMin / 60))}${pad(zMin % 60)}Z`;
  const nextDay = hh * 60 + mm + off * 60 >= 24 * 60;
  const mc = ((east ? tc - varDeg : tc + varDeg) + 360) % 360;

  return (
    <div>
      <DarkBox title="COORDINATES, ALTITUDES, AND ZULU">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Three kinds of arithmetic hide in the airspace questions: reading a position, converting between AGL and MSL, and converting local time to UTC. None is hard. All are easy to get backwards under time pressure.
        </div>
      </DarkBox>

      <Card color={C.blue} title="Latitude and longitude">
        <div style={{ padding: '12px 14px' }}>
          <svg viewBox="0 0 320 170" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10 }} role="img" aria-label="Chart grid showing a point at 35 degrees 02 minutes north, 85 degrees 12 minutes west">
            <line x1={30} y1={40} x2={300} y2={40} stroke="#333" strokeWidth={1} />
            <line x1={30} y1={140} x2={300} y2={140} stroke="#333" strokeWidth={1} />
            <line x1={60} y1={20} x2={60} y2={160} stroke="#333" strokeWidth={1} />
            <line x1={240} y1={20} x2={240} y2={160} stroke="#333" strokeWidth={1} />
            {Array.from({ length: 29 }, (_, i) => <line key={'t' + i} x1={60 + i * 6.2} y1={140} x2={60 + i * 6.2} y2={i % 5 === 0 ? 132 : 136} stroke="#333" strokeWidth={0.8} />)}
            {Array.from({ length: 29 }, (_, i) => <line key={'u' + i} x1={60} y1={40 + i * 3.45} x2={i % 5 === 0 ? 68 : 64} y2={40 + i * 3.45} stroke="#333" strokeWidth={0.8} />)}
            <text x={14} y={44} fontSize={9} fill="#333" fontWeight={700}>35°30'</text>
            <text x={14} y={144} fontSize={9} fill="#333" fontWeight={700}>35°00'</text>
            <text x={48} y={14} fontSize={9} fill="#333" fontWeight={700}>85°30'</text>
            <text x={226} y={14} fontSize={9} fill="#333" fontWeight={700}>85°00'</text>
            <circle cx={134.4} cy={133.1} r={4} fill={C.red} />
            <text x={142} y={128} fontSize={9} fill={C.red} fontWeight={700}>35°02'N  085°12'W</text>
            <text x={160} y={160} fontSize={8} fill={C.muted}>each tick = 1 minute; longitude grows to the LEFT (west)</text>
          </svg>
          <Caption>Latitude is read on the vertical scale (north increases upward). Longitude is read on the horizontal scale and increases westward, so 85°12' is to the left of 85°00'.</Caption>
          <DataTable color={C.blue} head={['Fact', 'Use']} rows={[
            ['1° = 60 minutes', 'Chart lines every 30’, ticks every 1’'],
            ['1 minute of latitude = 1 NM', 'Latitude ticks are a distance scale'],
            ['1 NM = 1.15 SM = 6,076 ft', 'Visibility is in SM; airspace radii in NM'],
            ['Written as 35°02’N 085°12’W', 'Degrees, minutes, hemisphere'],
          ]} />
        </div>
      </Card>

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Local time → Zulu</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {zones.map((z, i) => <button key={z.name} onClick={() => setZone(i)} style={{ padding: '5px 10px', borderRadius: 8, border: zone === i ? `2px solid ${C.blue}` : `1.5px solid ${C.line}`, background: zone === i ? C.blue : C.paper, color: zone === i ? '#fff' : C.muted, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{z.name}</button>)}
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12.5, cursor: 'pointer' }}><input type="checkbox" checked={dst} onChange={e => setDst(e.target.checked)} /> Daylight saving time</label>
          <label style={{ fontSize: 12.5, display: 'flex', gap: 6, alignItems: 'center' }}>Local time <input type="time" value={local} onChange={e => setLocal(e.target.value || '00:00')} style={{ padding: '4px 8px', borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13 }} /></label>
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 12, color: C.muted }}>{zones[zone].name} {dst ? 'Daylight' : 'Standard'} Time is UTC−{off}. Add {off} hours.</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.blue }}>{zulu}{nextDay ? <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}> (next day)</span> : null}</div>
        </div>
      </Panel>

      <Mnemonic text="EST +5, CST +6, MST +7, PST +8. Daylight time: one less. UTC never changes; only your offset does. To go from Zulu to local, subtract." />

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>AGL ↔ MSL</div>
        <Slider label="Ground elevation at your site" value={elev} min={0} max={8000} step={1} onChange={setElev} color={C.blue} format={v => `${v.toLocaleString()} ft MSL`} />
        <Slider label="Height above the ground" value={agl} min={0} max={400} step={10} onChange={setAgl} color={C.blue} format={v => `${v} ft AGL`} />
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, fontSize: 13, color: '#333', lineHeight: 1.5 }}>
          Your aircraft is at <strong style={{ color: C.blue }}>{(elev + agl).toLocaleString()} ft MSL</strong>. Chart obstacles and airspace ceilings are in MSL; your Part 107 limit is in AGL. Convert before comparing: a tower charted at {(elev + 449).toLocaleString()} (449) would top out {agl > 449 ? 'below' : 'above'} you.
        </div>
      </Panel>

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Magnetic variation</div>
        <Slider label="True course" value={tc} min={0} max={359} step={1} onChange={setTc} color={C.blue} format={v => `${pad(v).padStart(3, '0')}° true`} />
        <Slider label="Variation from the isogonic line" value={varDeg} min={0} max={20} step={1} onChange={setVarDeg} color={C.blue} format={v => `${v}° ${east ? 'E' : 'W'}`} />
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {['West', 'East'].map((d, i) => <button key={d} onClick={() => setEast(i === 1)} style={{ padding: '5px 12px', borderRadius: 8, border: (i === 1) === east ? `2px solid ${C.blue}` : `1.5px solid ${C.line}`, background: (i === 1) === east ? C.blue : C.paper, color: (i === 1) === east ? '#fff' : C.muted, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{d}</button>)}
        </div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, fontSize: 13, color: '#333' }}>
          Magnetic course: <strong style={{ color: C.blue }}>{String(mc).padStart(3, '0')}°</strong> — {east ? 'East is least: subtract.' : 'West is best: add.'}
        </div>
      </Panel>

      <Trap text="Chart obstacle heights come in pairs: 1549 (449). The question 'how tall is the tower' wants the AGL figure in parentheses. The question 'what altitude is the top' wants the MSL figure. Read which one is being asked." />
      <Tip text="Test figures include a 'time of day' line in some weather questions. Everything aviation is in Zulu: METAR time stamps, TAF validity, NOTAM effective times, LAANC windows. Decide your offset once at the start of the test and write it on the scratch paper." />

      <ExamQuiz questions={byTopic('chart-math')} color={C.blue} />
    </div>
  );
}
