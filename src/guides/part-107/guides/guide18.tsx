import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, Tabs, DefList, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const stages = [
  { name: 'Cumulus', what: 'Updrafts only, all the way up. The cloud builds rapidly (15 minutes or so). No precipitation reaches the ground yet.', cue: 'A tower of cumulus growing visibly while you watch. Land now; you have maybe 15 minutes.' },
  { name: 'Mature', what: 'Begins when precipitation starts falling from the base. Updrafts and downdrafts side by side: the most violent stage. Heavy rain, hail, lightning, gust fronts, wind shear, microbursts.', cue: 'Rain shafts, an anvil top, a sudden cold gusty wind arriving ahead of the rain (the gust front).' },
  { name: 'Dissipating', what: 'Downdrafts dominate. Rain tapers, the cloud top spreads into an anvil and frays. Still capable of lightning and strong outflow.', cue: 'The anvil drifting downwind, the base lifting, rain easing. Still not safe to launch into.' },
];

function StageSketch({ i }: { i: number }) {
  const up = (x: number, y: number, k: string) => <g key={k}><line x1={x} y1={y + 18} x2={x} y2={y} stroke="#C62828" strokeWidth={2} /><polygon points={`${x - 4},${y + 4} ${x},${y - 2} ${x + 4},${y + 4}`} fill="#C62828" /></g>;
  const dn = (x: number, y: number, k: string) => <g key={k}><line x1={x} y1={y} x2={x} y2={y + 18} stroke="#1565C0" strokeWidth={2} /><polygon points={`${x - 4},${y + 14} ${x},${y + 20} ${x + 4},${y + 14}`} fill="#1565C0" /></g>;
  return (
    <svg viewBox="0 0 320 150" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', background: '#f7fbff', borderRadius: 10, border: `1px solid ${C.line}` }} role="img" aria-label={`${stages[i].name} stage of a thunderstorm`}>
      <rect x={0} y={132} width={320} height={18} fill="#D7CCC8" />
      {i === 0 && <><ellipse cx={160} cy={95} rx={40} ry={30} fill="#CFD8DC" /><ellipse cx={160} cy={62} rx={30} ry={24} fill="#ECEFF1" /><ellipse cx={160} cy={42} rx={18} ry={14} fill="#FAFAFA" />{[140, 160, 180].map((x, k) => up(x, 95, 'u' + k))}<text x={20} y={30} fontSize={10} fill="#333">updrafts only</text><text x={20} y={44} fontSize={10} fill="#333">no rain at the surface</text></>}
      {i === 1 && <><path d="M110 120 Q100 70 130 55 Q130 20 170 25 Q210 10 220 45 Q260 40 250 70 Q255 110 220 118 Z" fill="#B0BEC5" /><rect x={200} y={18} width={90} height={14} rx={6} fill="#CFD8DC" />{[130, 150].map((x, k) => up(x, 80, 'u' + k))}{[185, 205].map((x, k) => dn(x, 75, 'd' + k))}{[180, 195, 210, 225].map((x, k) => <line key={'r' + k} x1={x} y1={118} x2={x - 6} y2={132} stroke="#1565C0" strokeWidth={1.5} />)}<polyline points="160,60 150,85 162,85 148,110" fill="none" stroke="#FBC02D" strokeWidth={2} /><text x={14} y={30} fontSize={10} fill="#333">up AND down drafts</text><text x={14} y={44} fontSize={10} fill="#333">rain begins at the surface</text><text x={14} y={58} fontSize={10} fill="#333">hail, lightning, shear</text></>}
      {i === 2 && <><path d="M120 120 Q110 90 140 80 Q150 60 180 65 Q215 55 220 85 Q240 100 215 118 Z" fill="#CFD8DC" opacity={0.8} /><rect x={150} y={30} width={150} height={12} rx={6} fill="#CFD8DC" opacity={0.7} />{[150, 170, 190].map((x, k) => dn(x, 85, 'd' + k))}{[160, 180].map((x, k) => <line key={'r' + k} x1={x} y1={120} x2={x - 5} y2={132} stroke="#90CAF9" strokeWidth={1.2} />)}<text x={14} y={30} fontSize={10} fill="#333">downdrafts dominate</text><text x={14} y={44} fontSize={10} fill="#333">anvil spreads, rain eases</text></>}
    </svg>
  );
}

export function Guide18() {
  const [st, setSt] = useState(1);
  return (
    <div>
      <DarkBox title="THUNDERSTORMS, SHEAR & ICING">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          A thunderstorm needs three things and goes through three stages. Around and under it are the hazards that end small-aircraft flights: wind shear, microbursts, hail, and turbulence. The icing and wake-turbulence questions live here too.
        </div>
      </DarkBox>

      <KeyNumbers color={C.teal} items={[
        { label: 'ingredients', value: '3', note: 'moisture, unstable air, lifting action' },
        { label: 'stages', value: '3', note: 'cumulus, mature, dissipating' },
        { label: 'avoid by', value: '20 NM', note: 'for severe storms; hail travels' },
        { label: 'microburst', value: '6,000 fpm', note: 'downdraft; 1–2 NM across; ~15 min' },
      ]} />

      <Tabs tabs={stages.map(s => s.name)} active={st} onChange={setSt} color={C.teal} />
      <StageSketch i={st} />
      <Caption>{stages[st].what}</Caption>
      <Card color={C.teal} title={`${stages[st].name} stage — what you would see`}>
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>{stages[st].cue}</div>
      </Card>

      <Mnemonic text="The mature stage starts when RAIN REACHES THE GROUND. That single fact answers the most common thunderstorm question. Cumulus = up only. Mature = up and down. Dissipating = down only." />

      <Card color={C.teal} title="Kinds of storms and their hazards">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.teal} items={[
            { term: 'Airmass (single cell)', body: 'Afternoon heating. Short-lived, local, relatively predictable. Still a thunderstorm.' },
            { term: 'Squall line', body: 'A non-frontal, narrow band of active storms, often 50–300 miles ahead of a cold front. The most severe weather on the list; too long to go around.' },
            { term: 'Embedded', body: 'Hidden inside stratiform cloud, typically with warm or occluded fronts. You cannot see it coming.' },
            { term: 'Wind shear', body: 'A sudden change in wind speed or direction over a short distance. Found near thunderstorms, fronts, temperature inversions, and strong surface winds. Low-level shear is the dangerous kind because there is no room to recover.' },
            { term: 'Microburst', body: 'A concentrated downdraft that hits the ground and spreads out. Up to 6,000 ft/min down, 1–2 NM wide, about 15 minutes. A small aircraft can be driven into the ground.' },
            { term: 'Hail', body: 'Can fall from clear air up to 20 miles from the storm, carried out under the anvil.' },
            { term: 'Lightning', body: 'Present in every thunderstorm by definition. Also a danger to the person holding a metal-antenna controller in an open field.' },
          ]} />
        </div>
      </Card>

      <Card color={C.teal} title="Turbulence you will actually meet at 400 ft">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.teal} items={[
            { term: 'Mechanical', body: 'Wind breaking around buildings, trees, and terrain into rotors and eddies on the downwind side. Grows with wind speed and obstacle size. The number-one turbulence source for an sUAS.' },
            { term: 'Convective', body: 'Thermals from uneven surface heating on sunny afternoons. Bumpy but usually manageable; worse over pavement and dark fields.' },
            { term: 'Wake turbulence', body: 'Wingtip vortices behind manned aircraft, strongest when the aircraft is heavy, slow, and clean (gear and flaps up). Vortices sink below the flight path and drift with the wind. Helicopters make their own. Stay out of approach and departure paths.' },
            { term: 'Mountain wave', body: 'Lenticular clouds mark it; rotor turbulence beneath can reach the ground on the lee side.' },
          ]} />
        </div>
      </Card>

      <Card color={C.teal} title="Icing and frost">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Structural icing needs <strong>visible moisture and a temperature at or below freezing</strong>, both at once. On a small aircraft, ice on the propellers changes their shape, cutting thrust and adding vibration. <strong>Frost</strong> forms on clear, calm nights when the surface cools below the dew point and below freezing. It must be removed before flight: even a thin, rough coating disrupts airflow enough to stall a fixed-wing or unbalance a prop. Clear ice (large supercooled drops, cumuliform cloud) is worst; rime ice (small drops, stratiform cloud) is milky and brittle.
        </div>
      </Card>

      <Trap text="'Which stage has the most severe weather?' Mature. 'Which stage begins with precipitation at the surface?' Mature. 'Which stage is updrafts only?' Cumulus. Three questions, two answers." />
      <Tip text="For an sUAS the practical number is not 20 NM but 20 minutes: if you can hear thunder, the storm is within about 10 miles and the gust front can arrive before the rain. Land, pack, leave." />

      <ExamQuiz questions={byTopic('thunderstorms')} color={C.teal} />
    </div>
  );
}
