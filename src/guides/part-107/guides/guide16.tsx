import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, Tabs, DataTable, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const families = [
  { name: 'Low', range: 'Surface to about 6,500 ft', members: 'Stratus, stratocumulus, nimbostratus', note: 'Stratus = flat gray layer, drizzle, poor visibility, stable air. Nimbostratus = the steady-rain layer. These are the clouds that sit on your 400-ft ceiling.' },
  { name: 'Middle', range: 'About 6,500 to 20,000 ft', members: 'Altostratus, altocumulus', note: '“Alto-” prefix. Altostratus thickening from the west often means a warm front is coming. Standing lenticular altocumulus = mountain wave turbulence.' },
  { name: 'High', range: 'Above 20,000 ft', members: 'Cirrus, cirrostratus, cirrocumulus', note: '“Cirro-” prefix. Made of ice crystals. Cirrus is the first sign of an approaching warm front, often a day ahead.' },
  { name: 'Vertical', range: 'Bases low, tops anywhere', members: 'Cumulus, towering cumulus, cumulonimbus', note: 'Unstable air. Fair-weather cumulus means bumpy afternoon air; towering cumulus is a thunderstorm being born; cumulonimbus is the thunderstorm.' },
];

export function Guide16() {
  const [fam, setFam] = useState(0);
  const [f, setF] = useState(true);
  const [t, setT] = useState(80);
  const [dp, setDp] = useState(62);
  const spread = Math.max(0, t - dp);
  const base = f ? (spread / 4.4) * 1000 : (spread / 2.5) * 1000;
  return (
    <div>
      <DarkBox title="STABILITY, MOISTURE & CLOUDS">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Two questions decide most weather: <strong>how much moisture is in the air</strong> (dew point) and <strong>what happens to a parcel of air when something lifts it</strong> (stability). Stable air gives you smooth, gray, low-visibility days. Unstable air gives you bumps, showers, and a clear horizon.
        </div>
      </DarkBox>

      <DataTable color={C.teal} head={['', 'Stable air', 'Unstable air']} boldCol={0} rows={[
        ['Clouds', 'Stratiform (layered)', 'Cumuliform (puffy, towering)'],
        ['Precipitation', 'Steady, continuous', 'Showery, intermittent'],
        ['Turbulence', 'Smooth', 'Rough'],
        ['Visibility', 'Poor (haze, smoke, fog trapped)', 'Good (mixing clears the air)'],
        ['Lapse rate', 'Small, or an inversion', 'Large'],
        ['Typical setup', 'Warm front, high pressure, night', 'Cold front, afternoon heating, low pressure'],
      ]} />

      <Mnemonic text="Stable = Stratus, Steady rain, Smooth, but Smoggy. Unstable = everything else: cumulus, showers, bumps, and you can see for miles." />

      <Panel color={C.teal}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Cloud base estimator</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {['°F', '°C'].map((u, i) => <button key={u} onClick={() => { const toF = i === 0; if (toF !== f) { setF(toF); setT(toF ? Math.round(t * 9 / 5 + 32) : Math.round((t - 32) * 5 / 9)); setDp(toF ? Math.round(dp * 9 / 5 + 32) : Math.round((dp - 32) * 5 / 9)); } }} style={{ padding: '4px 12px', borderRadius: 8, border: (i === 0) === f ? `2px solid ${C.teal}` : `1.5px solid ${C.line}`, background: (i === 0) === f ? C.teal : C.paper, color: (i === 0) === f ? '#fff' : C.muted, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{u}</button>)}
        </div>
        <Slider label="Surface temperature" value={t} min={f ? 0 : -18} max={f ? 110 : 43} step={1} onChange={v => { setT(v); if (dp > v) setDp(v); }} color={C.teal} format={v => `${v}°${f ? 'F' : 'C'}`} />
        <Slider label="Dew point" value={dp} min={f ? 0 : -18} max={t} step={1} onChange={setDp} color={C.teal} format={v => `${v}°${f ? 'F' : 'C'}`} />
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}` }}>
          <div style={{ fontSize: 12, color: C.muted }}>Spread {spread}° ÷ {f ? '4.4' : '2.5'} × 1,000 =</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.teal }}>{spread === 0 ? 'At the surface: fog' : `~${(Math.round(base / 100) * 100).toLocaleString()} ft AGL`}</div>
          <div style={{ fontSize: 12, color: '#444', marginTop: 4, lineHeight: 1.5 }}>{spread <= 3 ? 'A spread this small means saturation is close. Expect fog or very low cloud, especially overnight.' : spread < 8 ? 'Low cloud bases. Remember you need to stay 500 ft below the base.' : 'Comfortably high bases for sUAS purposes.'} The rule assumes rising air cools about 4.4°F (2.5°C) per 1,000 ft faster than its dew point drops, which is why the two meet at that height.</div>
        </div>
      </Panel>

      <Trap text="'Dew point' is a temperature, not a percentage. When a question says the temperature and dew point are equal, the answer involves saturation: fog, mist, or low cloud, and 100% relative humidity." />

      <Tabs tabs={families.map(x => x.name)} active={fam} onChange={setFam} color={C.teal} />
      <Card color={C.teal} title={`${families[fam].name} clouds — ${families[fam].range}`}>
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: C.teal, marginBottom: 4 }}>{families[fam].members}</div>
          {families[fam].note}
        </div>
      </Card>

      <Card color={C.teal} title="How clouds form">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Air is cooled to its dew point and the vapor condenses onto tiny particles (condensation nuclei). The cooling comes from <strong>lifting</strong>: convection (surface heating), orographic lifting (terrain), frontal lifting (one airmass riding over another), or convergence (winds piling into a low). Whether the cloud grows upward into a thunderstorm or spreads out into a sheet depends on the stability of the air around it.
        </div>
      </Card>

      <Tip text="Cloud names are built from parts: 'cirro' high, 'alto' middle, 'strato' layered, 'cumulo' heaped, 'nimbo' raining. 'Nimbostratus' is a raining layer; 'cumulonimbus' is a raining heap. That is the whole vocabulary." />

      <ExamQuiz questions={byTopic('clouds')} color={C.teal} />
    </div>
  );
}
