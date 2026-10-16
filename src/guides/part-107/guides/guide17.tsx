import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, Tabs, DataTable, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const fogs = [
  { name: 'Radiation fog', emoji: '🌙', when: 'Clear, calm night; moist air; land cools by radiating heat away.', where: 'Low ground, valleys, over land. Burns off after sunrise.', key: 'Needs CLEAR skies and LIGHT wind.' },
  { name: 'Advection fog', emoji: '🌊', when: 'Warm, moist air moves horizontally over a cooler surface.', where: 'Coasts, especially where warm air crosses cold water. Can persist for days.', key: 'Needs WIND (up to about 15 kt). Moves in.' },
  { name: 'Upslope fog', emoji: '⛰️', when: 'Moist, stable air is pushed up rising terrain and cools adiabatically.', where: 'Windward slopes; the east side of the Rockies in an easterly wind.', key: 'Needs wind blowing UP the slope. Stops when the wind does.' },
  { name: 'Steam fog', emoji: '♨️', when: 'Cold, dry air moves over much warmer water; moisture evaporates and recondenses.', where: 'Lakes and rivers on cold mornings. “Sea smoke.”', key: 'Can be turbulent and cause icing on a cold airframe.' },
  { name: 'Precipitation fog', emoji: '🌧️', when: 'Warm rain falls through cool air near the surface, evaporating and saturating it.', where: 'Ahead of warm fronts; under nimbostratus.', key: 'Also called frontal fog.' },
  { name: 'Ice fog', emoji: '❄️', when: 'Very cold air (around −25°F / −32°C and below); vapor sublimates directly into ice crystals.', where: 'Arctic and sub-Arctic; Alaska in winter.', key: 'Same conditions as radiation fog, but frozen.' },
];

interface Front { name: string; color: string; speed: string; clouds: string; precip: string; vis: string; wind: string; pressure: string; temp: string }
const fronts: Front[] = [
  { name: 'Cold front', color: '#1565C0', speed: 'Fast (20–35 kt), steep slope', clouds: 'Cumulus, towering cumulus, cumulonimbus; narrow band', precip: 'Showers, thunderstorms, possibly hail; brief and violent', vis: 'Poor in showers, then rapidly improving', wind: 'Veers sharply (e.g., SW to NW); gusty', pressure: 'Falls ahead, rises quickly behind', temp: 'Drops sharply after passage' },
  { name: 'Warm front', color: '#C62828', speed: 'Slow (10–25 kt), shallow slope', clouds: 'Cirrus first, then cirrostratus, altostratus, nimbostratus, stratus; hundreds of miles ahead', precip: 'Steady, continuous rain or drizzle; snow in winter', vis: 'Poor for a long time; fog common', wind: 'Veers gradually (e.g., SE to SW)', pressure: 'Falls steadily ahead, levels off', temp: 'Rises after passage' },
  { name: 'Stationary front', color: '#6A1B9A', speed: 'Little or no movement', clouds: 'Mixed; often stratiform with embedded cells', precip: 'Can persist for days in one area', vis: 'Variable', wind: 'Roughly parallel to the front, opposite directions on each side', pressure: 'Little change', temp: 'Little change' },
  { name: 'Occluded front', color: '#546E7A', speed: 'A cold front has caught the warm front', clouds: 'Both kinds: layered clouds with embedded thunderstorms', precip: 'Mixed; can be the worst of both', vis: 'Poor', wind: 'Shifts, often sharply', pressure: 'Falls then rises', temp: 'Depends on which cold airmass is colder (cold vs warm occlusion)' },
];

function FrontSketch({ i }: { i: number }) {
  const f = fronts[i];
  return (
    <svg viewBox="0 0 320 120" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', background: '#f7fbff', borderRadius: 10, border: `1px solid ${C.line}` }} role="img" aria-label={`Cross-section of a ${f.name}`}>
      <rect x={0} y={100} width={320} height={20} fill="#D7CCC8" />
      {i === 0 && <><path d="M190 100 L150 40 L150 100 Z" fill="#90CAF9" opacity={0.5} /><path d="M20 100 L150 100 L150 40 Q120 10 90 50 Q60 20 20 60 Z" fill="#BBDEFB" opacity={0.6} /><path d="M160 30 Q185 0 210 30 Q230 10 240 40 L240 60 Q200 70 160 60 Z" fill="#78909C" opacity={0.7} /><text x={70} y={85} fontSize={10} fill="#0D47A1" fontWeight={700}>cold air</text><text x={240} y={85} fontSize={10} fill="#B71C1C" fontWeight={700}>warm air</text><text x={170} y={22} fontSize={9} fill="#333">CB, showers</text><text x={120} y={115} fontSize={8} fill="#333">moves → fast, steep</text></>}
      {i === 1 && <><path d="M20 100 L300 100 L300 30 Q200 60 20 95 Z" fill="#FFCDD2" opacity={0.5} /><path d="M20 100 L20 70 Q150 85 300 55" fill="none" stroke="#C62828" strokeWidth={1.5} /><rect x={60} y={40} width={200} height={14} fill="#90A4AE" opacity={0.5} /><rect x={120} y={25} width={160} height={10} fill="#B0BEC5" opacity={0.5} /><text x={40} y={85} fontSize={10} fill="#0D47A1" fontWeight={700}>cold air</text><text x={240} y={90} fontSize={10} fill="#B71C1C" fontWeight={700}>warm air</text><text x={70} y={37} fontSize={9} fill="#333">stratus, steady rain, fog</text><text x={110} y={115} fontSize={8} fill="#333">← moves slowly, shallow slope</text></>}
      {i === 2 && <><path d="M20 100 L160 100 L160 30 Q100 50 20 90 Z" fill="#BBDEFB" opacity={0.6} /><path d="M160 100 L300 100 L300 30 Q230 50 160 30 Z" fill="#FFCDD2" opacity={0.5} /><rect x={90} y={35} width={140} height={14} fill="#90A4AE" opacity={0.5} /><text x={50} y={85} fontSize={10} fill="#0D47A1" fontWeight={700}>cold air</text><text x={230} y={85} fontSize={10} fill="#B71C1C" fontWeight={700}>warm air</text><text x={110} y={115} fontSize={8} fill="#333">neither side advancing</text></>}
      {i === 3 && <><path d="M20 100 L140 100 L140 50 Q80 60 20 90 Z" fill="#BBDEFB" opacity={0.7} /><path d="M140 100 L300 100 L300 50 Q220 60 140 50 Z" fill="#B3E5FC" opacity={0.6} /><path d="M100 50 Q160 10 220 50 Z" fill="#FFCDD2" opacity={0.7} /><text x={40} y={85} fontSize={10} fill="#0D47A1" fontWeight={700}>cold air</text><text x={230} y={85} fontSize={10} fill="#0277BD" fontWeight={700}>cool air</text><text x={135} y={35} fontSize={9} fill="#B71C1C" fontWeight={700}>warm air lifted off the ground</text></>}
    </svg>
  );
}

export function Guide17() {
  const [fog, setFog] = useState<number | null>(null);
  const [fr, setFr] = useState(0);
  const f = fronts[fr];
  return (
    <div>
      <DarkBox title="FOG & FRONTS">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Fog is a cloud at the surface, and the test wants to know <strong>what made it</strong>. A front is the boundary between two airmasses, and the test wants to know <strong>what weather rides with it</strong> and <strong>how you can tell it just passed</strong>.
        </div>
      </DarkBox>

      <Panel color={C.teal}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.teal, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Six fogs — tap one</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
          {fogs.map((x, i) => {
            const on = fog === i;
            return (
              <button key={x.name} onClick={() => setFog(on ? null : i)} aria-expanded={on} style={{ textAlign: 'left', padding: 10, borderRadius: 10, border: `1.5px solid ${on ? C.teal : C.line}`, background: on ? '#E0F2F1' : C.paper, cursor: 'pointer', gridColumn: on ? '1 / -1' : 'auto' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.ink }}>{x.emoji} {x.name}</div>
                {on && (
                  <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 6 }}>
                    <div><strong>Forms when:</strong> {x.when}</div>
                    <div><strong>Where:</strong> {x.where}</div>
                    <div style={{ color: C.teal, fontWeight: 700, marginTop: 4 }}>{x.key}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Panel>

      <Trap text="Radiation fog vs advection fog is the classic pair. Radiation: calm, clear night, over land, gone by mid-morning. Advection: needs wind, moves in from the water, can last all day. If the question mentions wind or a coastline, it is advection." />

      <Tabs tabs={fronts.map(x => x.name)} active={fr} onChange={setFr} color={f.color} />
      <FrontSketch i={fr} />
      <Caption>Cross-section, not to scale. Cold air is dense and wedges under; warm air is light and rides over.</Caption>
      <DataTable color={f.color} head={[f.name, '']} boldCol={0} rows={[
        ['Speed and slope', f.speed],
        ['Clouds', f.clouds],
        ['Precipitation', f.precip],
        ['Visibility', f.vis],
        ['Wind', f.wind],
        ['Pressure', f.pressure],
        ['Temperature', f.temp],
      ]} />

      <Mnemonic text="Cold fronts are Cumulus and Chaos: fast, steep, violent, brief. Warm fronts are Wide and Weepy: slow, shallow, layered, drizzly, foggy, for hours." />

      <Card color={C.teal} title="How you know a front went through">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          The one thing that <strong>always</strong> changes is <strong>wind direction</strong>. Usually also: temperature, dew point, pressure (falling ahead, rising behind), and the character of the clouds. A front can pass dry; it cannot pass without a wind shift.
        </div>
      </Card>

      <Tip text="On a surface analysis chart: blue triangles = cold front (pointing the way it moves), red half-circles = warm front, alternating on opposite sides = stationary, purple with both = occluded." />

      <ExamQuiz questions={byTopic('fog-fronts')} color={C.teal} />
    </div>
  );
}
