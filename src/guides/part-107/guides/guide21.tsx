import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, DataTable, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

export function Guide21() {
  const [elev, setElev] = useState(1200);
  const [altim, setAltim] = useState(29.92);
  const [oat, setOat] = useState(30);
  const pa = elev + (29.92 - altim) * 1000;
  const isa = 15 - 2 * (pa / 1000);
  const da = pa + 120 * (oat - isa);
  const hoverPct = Math.min(100, Math.max(0, 55 + (da / 1000) * 3.2));
  return (
    <div>
      <DarkBox title="DENSITY ALTITUDE">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Your aircraft does not care what the altimeter says. It cares how many air molecules the propellers can grab. <strong>Density altitude</strong> is the altitude in the standard atmosphere that has the same air density as the air you are actually in. High, hot, humid, or low pressure all push it up, and performance goes down with it.
        </div>
      </DarkBox>

      <KeyNumbers color={C.teal} items={[
        { label: 'pressure altitude', value: 'PA', note: 'elevation + (29.92 − altimeter) × 1,000' },
        { label: 'ISA temp at PA', value: '15 − 2°/1k', note: '°C, standard lapse' },
        { label: 'density altitude', value: 'PA + 120×ΔT', note: 'ΔT = actual − ISA, in °C' },
      ]} />

      <Panel color={C.teal}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Density altitude calculator</div>
        <Slider label="Field elevation" value={elev} min={0} max={9000} step={100} onChange={setElev} color={C.teal} format={v => `${v.toLocaleString()} ft MSL`} />
        <Slider label="Altimeter setting" value={altim} min={28.5} max={31} step={0.01} onChange={setAltim} color={C.teal} format={v => `${v.toFixed(2)}" Hg`} />
        <Slider label="Outside air temperature" value={oat} min={-20} max={45} step={1} onChange={setOat} color={C.teal} format={v => `${v}°C (${Math.round(v * 9 / 5 + 32)}°F)`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
          <div style={{ padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}><div style={{ fontSize: 11, color: C.muted }}>Pressure altitude</div><div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{Math.round(pa).toLocaleString()} ft</div></div>
          <div style={{ padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}><div style={{ fontSize: 11, color: C.muted }}>ISA temp there</div><div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{isa.toFixed(1)}°C</div></div>
          <div style={{ padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.teal}` }}><div style={{ fontSize: 11, color: C.muted }}>Density altitude</div><div style={{ fontSize: 17, fontWeight: 800, color: C.teal }}>{Math.round(da / 10) * 10 > 0 ? (Math.round(da / 10) * 10).toLocaleString() : Math.round(da / 10) * 10} ft</div></div>
        </div>
        <div style={{ fontSize: 12, color: C.ink, fontWeight: 700, marginBottom: 4 }}>Illustrative hover throttle for a loaded multirotor</div>
        <div style={{ height: 14, borderRadius: 7, background: '#f0eeeb', overflow: 'hidden', marginBottom: 4 }}>
          <div style={{ width: `${hoverPct}%`, height: '100%', background: hoverPct > 85 ? C.red : hoverPct > 70 ? C.orange : C.green, transition: 'width 0.2s' }} />
        </div>
        <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>{hoverPct > 85 ? 'Almost no throttle left to climb or arrest a descent. Flight time short, control marginal.' : hoverPct > 70 ? 'Noticeably reduced climb and endurance. Lighten the payload.' : 'Comfortable margin.'} Not a real aircraft model; the point is the direction and the size of the effect.</div>
      </Panel>

      <Mnemonic text="High, Hot, Humid = High density altitude = Hard to fly. Low pressure counts as 'high' too, since the altimeter setting below 29.92 raises pressure altitude." />

      <DataTable color={C.teal} head={['Factor', 'Raises DA when', 'Why']} rows={[
        ['Elevation', 'Higher', 'Less air above you, so less pressure, so fewer molecules.'],
        ['Temperature', 'Hotter than ISA', 'Warm air expands; molecules spread out.'],
        ['Pressure', 'Altimeter below 29.92', 'Low pressure = less air stacked above the surface.'],
        ['Humidity', 'More humid', 'Water vapor molecules are lighter than N₂ and O₂. Smaller effect, same direction.'],
      ]} />

      <Card color={C.teal} title="What high density altitude does to a small aircraft">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Less lift from wings and rotors, less thrust from propellers, and (for gas engines) less power. Fixed-wing: longer takeoff roll, lower climb rate, higher true airspeed at the same indicated speed. Multirotor: higher hover throttle, more current, shorter flight time, less payload, and less margin to catch a sink in a gust. The manufacturer’s maximum service ceiling is in density altitude whether they say so or not.
        </div>
      </Card>

      <Trap text="Pressure altitude questions give you a field elevation and an altimeter setting. Every 0.01 inch below 29.92 adds 10 ft; above 29.92 subtracts. Field 1,000 ft at 29.42 = 1,500 ft PA. Then density altitude adds about 120 ft per degree C above standard." />
      <Tip text="The test supplement has a density altitude chart (Figure 8 in most editions). You enter with outside air temperature on the bottom axis, go up to the pressure-altitude diagonal, and read density altitude on the left. The formula here gets you within a few hundred feet, which is enough to pick the right answer." />

      <ExamQuiz questions={byTopic('density-altitude')} color={C.teal} />
    </div>
  );
}
