import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, DefList, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

function PressureSystem({ low }: { low: boolean }) {
  const col = low ? C.red : C.blue;
  const arrows = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 220 220" width={200} height={200} style={{ display: 'block', margin: '0 auto' }} role="img" aria-label={low ? 'Low pressure: counterclockwise, inward' : 'High pressure: clockwise, outward'}>
      {[90, 70, 50].map(r => <circle key={r} cx={110} cy={110} r={r} fill="none" stroke={col} strokeOpacity={0.25} strokeDasharray="4,4" />)}
      <circle cx={110} cy={110} r={22} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={2} />
      <text x={110} y={117} textAnchor="middle" fontSize={22} fontWeight={800} fill={col}>{low ? 'L' : 'H'}</text>
      {arrows.map(a => {
        // Tangential arrow with inward/outward bias.
        const rad = (a * Math.PI) / 180; const r = 70;
        const x = 110 + r * Math.cos(rad); const y = 110 + r * Math.sin(rad);
        const tangent = low ? rad - Math.PI / 2 : rad + Math.PI / 2; // ccw vs cw
        const radial = low ? rad + Math.PI : rad; // inward vs outward
        const dx = 16 * Math.cos(tangent) + 7 * Math.cos(radial);
        const dy = 16 * Math.sin(tangent) + 7 * Math.sin(radial);
        return <line key={a} x1={x - dx} y1={y - dy} x2={x + dx} y2={y + dy} stroke={col} strokeWidth={2.5} markerEnd="url(#arrowhead)" />;
      })}
      <defs><marker id="arrowhead" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={col} /></marker></defs>
    </svg>
  );
}

export function Guide15() {
  const [low, setLow] = useState(true);
  const [alt, setAlt] = useState(5000);
  const isaT = 15 - 2 * (alt / 1000);
  const isaP = 29.92 - alt / 1000;
  return (
    <div>
      <DarkBox title="THE ATMOSPHERE & WIND">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          All weather starts with the sun heating the Earth unevenly. Warm air rises and pressure drops; air flows in to replace it; the Earth’s rotation bends the flow. The test asks for the standard numbers, the direction of rotation around highs and lows, and what a temperature inversion does.
        </div>
      </DarkBox>

      <KeyNumbers color={C.teal} items={[
        { label: 'standard pressure', value: '29.92"', note: '1013.2 hPa at sea level' },
        { label: 'standard temp', value: '15°C', note: '59°F at sea level' },
        { label: 'temp lapse', value: '2°C', note: 'per 1,000 ft (3.5°F)' },
        { label: 'pressure lapse', value: '1" Hg', note: 'per 1,000 ft, roughly' },
      ]} />

      <Panel color={C.teal}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 8 }}>
          {['Low pressure', 'High pressure'].map((l, i) => <button key={l} onClick={() => setLow(i === 0)} style={{ padding: '6px 14px', borderRadius: 8, border: (i === 0) === low ? `2px solid ${i === 0 ? C.red : C.blue}` : `1.5px solid ${C.line}`, background: (i === 0) === low ? (i === 0 ? C.red : C.blue) : C.paper, color: (i === 0) === low ? '#fff' : C.muted, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{l}</button>)}
        </div>
        <PressureSystem low={low} />
        <Caption>{low ? 'Low: air spirals COUNTERCLOCKWISE and INWARD, converges, rises, cools, and makes clouds and precipitation.' : 'High: air spirals CLOCKWISE and OUTWARD, descends, warms, and dries. Fair weather, often with an inversion.'} (Northern Hemisphere.)</Caption>
      </Panel>

      <Mnemonic text="Lows are Left-turning (counterclockwise) and Lousy weather. Highs are the other way and usually fair. Both are Northern Hemisphere; the Coriolis force deflects moving air to the RIGHT here." />

      <Panel color={C.teal}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Standard atmosphere calculator</div>
        <Slider label="Altitude" value={alt} min={0} max={18000} step={500} onChange={setAlt} color={C.teal} format={v => `${v.toLocaleString()} ft`} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}><div style={{ fontSize: 11, color: C.muted }}>ISA temperature</div><div style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>{isaT.toFixed(0)}°C</div></div>
          <div style={{ padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}><div style={{ fontSize: 11, color: C.muted }}>ISA pressure (approx.)</div><div style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>{isaP.toFixed(2)}"</div></div>
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>Both are rules of thumb the test uses; the real atmosphere is not linear, but the questions are.</div>
      </Panel>

      <Card color={C.teal} title="Wind, friction, and inversions">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.teal} items={[
            { term: 'Pressure gradient', body: 'Air moves from high to low pressure. The steeper the gradient (isobars close together), the stronger the wind.' },
            { term: 'Coriolis', body: 'The rotation of the Earth deflects moving air to the right in the Northern Hemisphere. Aloft, wind ends up flowing parallel to the isobars.' },
            { term: 'Surface friction', body: 'In roughly the lowest 2,000 ft, friction slows the wind and weakens the Coriolis effect, so surface wind crosses the isobars toward the low. Surface and winds-aloft forecasts differ for this reason.' },
            { term: 'Temperature inversion', body: 'Temperature rises with height instead of falling. Extremely stable: smooth air, but haze, smoke, and fog are trapped beneath it, so visibility is poor. Common on clear, calm nights and under a high. A wind-shear layer can sit at the top.' },
            { term: 'Sea and land breezes', body: 'Land heats and cools faster than water. By day the wind blows from sea to land; at night from land to sea.' },
            { term: 'Convective currents', body: 'Uneven surface heating (dark fields vs. water vs. pavement) produces thermals: bumpy air on sunny afternoons, smoother flying in the morning.' },
          ]} />
        </div>
      </Card>

      <Trap text="'What causes wind?' The answer is pressure differences from uneven heating, not the Earth's rotation. Rotation (Coriolis) steers wind; it does not create it." />
      <Tip text="Inversion questions come in two flavors: 'what is it' (temperature increases with altitude) and 'what does it do' (stable air, smooth, poor visibility). The word 'smooth' paired with 'poor visibility' is the signature." />

      <ExamQuiz questions={byTopic('atmosphere')} color={C.teal} />
    </div>
  );
}
