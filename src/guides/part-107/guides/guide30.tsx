import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, DefList, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Sc { name: string; icon: string; signs: string; doThis: string; not: string }
const scenarios: Sc[] = [
  { name: 'Lost link', icon: '📶', signs: 'Telemetry freezes, video drops, “disconnected” warning.', doThis: 'Know before takeoff what the failsafe does (RTH, hover, land) and at what altitude. Raise the antenna, move to regain line of sight, watch for the aircraft to climb to RTH altitude and come home.', not: 'Do not power off the controller to “reset” it; that is just a second lost link.' },
  { name: 'Flyaway', icon: '🏃', signs: 'The aircraft ignores inputs and departs on its own heading.', doThis: 'Try the failsafe switch, try regaining control in a different mode, note heading, altitude, and last position, warn anyone in its path. Afterward: locate it, and report under §107.9 if it causes injury or qualifying damage.', not: 'Do not chase it in a car with the controller; you will lose both.' },
  { name: 'Low battery far from home', icon: '🔋', signs: 'Critical battery warning with the aircraft well out.', doThis: 'Land now at the nearest safe spot you can see. A field a hundred yards away beats a parking lot a mile away.', not: 'Do not sprint home at full speed or climb to “glide”: both draw more current and the pack dies sooner.' },
  { name: 'GPS loss', icon: '🛰️', signs: 'Mode changes to ATTI/manual; the aircraft drifts with the wind in a “hover.”', doThis: 'Fly it by hand. Small, deliberate inputs; keep it upwind of obstacles; land as soon as practical. Practice this on a calm day so the first time is not for real.', not: 'Do not rely on RTH; without GPS it may not know where home is.' },
  { name: 'Compass error', icon: '🧭', signs: 'Toilet-bowl circling in hover, heading drift, calibration warnings near steel or rebar.', doThis: 'Land, move away from the metal (vehicles, roofs, bridges), recalibrate, hover-check before continuing.', not: 'Do not calibrate on the truck tailgate.' },
  { name: 'Manned aircraft inbound', icon: '🚁', signs: 'A helicopter or airplane appears low and heading your way.', doThis: 'Descend immediately, land if you can, and keep it in sight. Yield the right of way. Tell the VO or crew.', not: 'Do not climb or hold and assume they see you. They almost certainly do not.' },
  { name: 'Battery fire', icon: '🔥', signs: 'Hissing, swelling, smoke, or flame from a pack, often minutes after a crash.', doThis: 'Get people clear. Let it burn on bare ground or in sand or a metal container; water can cool surrounding material. Watch a damaged pack for an hour before transporting it.', not: 'Do not put a crashed pack back in the case with the others, and do not carry one in a closed car.' },
  { name: 'Loss of control over people', icon: '⚠️', signs: 'The aircraft is coming down and there are people below.', doThis: 'Use whatever authority remains to steer it away from people, even into something hard. If needed, kill the motors over a clear area. People first, aircraft last.', not: 'Do not wait for the failsafe to decide.' },
];

export function Guide30() {
  const [sel, setSel] = useState(0);
  const [rth, setRth] = useState(120);
  const obstacles = [{ name: 'trees', h: 70 }, { name: 'power line', h: 95 }, { name: 'cell tower', h: 180 }, { name: 'barn', h: 40 }];
  const tallest = Math.max(...obstacles.map(o => o.h));
  const s = scenarios[sel];
  return (
    <div>
      <DarkBox title="EMERGENCIES & LOST LINK">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          In an emergency the RPIC may deviate from any rule as far as the emergency requires<Reg cite="21" />, and must have made sure before takeoff that a loss of control would not endanger anyone<Reg cite="19" />. The test pairs those sections with practical questions: what to do when the link drops, the battery dies, or a helicopter shows up.
        </div>
      </DarkBox>

      <Panel color={C.green}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {scenarios.map((x, i) => <button key={x.name} onClick={() => setSel(i)} aria-pressed={sel === i} style={{ padding: '5px 10px', borderRadius: 8, border: sel === i ? `2px solid ${C.green}` : `1.5px solid ${C.line}`, background: sel === i ? C.green : C.paper, color: sel === i ? '#fff' : C.muted, fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>{x.icon} {x.name}</button>)}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, marginBottom: 4 }}>{s.icon} {s.name}</div>
        <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}><strong>Signs:</strong> {s.signs}</div>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#E8F5E9', border: '1px solid #C8E6C9', fontSize: 12.5, color: '#1B5E20', lineHeight: 1.5, marginBottom: 6 }}><strong>Do:</strong> {s.doThis}</div>
        <div style={{ padding: '8px 10px', borderRadius: 8, background: '#FFEBEE', border: '1px solid #F5C6C6', fontSize: 12.5, color: '#B71C1C', lineHeight: 1.5 }}><strong>Don’t:</strong> {s.not}</div>
      </Panel>

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Set the return-to-home altitude</div>
        <Slider label="RTH altitude" value={rth} min={30} max={400} step={10} onChange={setRth} color={C.green} format={v => `${v} ft AGL`} />
        <svg viewBox="0 0 320 130" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', background: '#f7fbff', borderRadius: 10, border: `1px solid ${C.line}` }} role="img" aria-label="Return-to-home path over obstacles">
          <rect x={0} y={110} width={320} height={20} fill="#D7CCC8" />
          {obstacles.map((o, i) => { const x = 60 + i * 60; const h = o.h * 0.45; return <g key={o.name}><rect x={x - 8} y={110 - h} width={16} height={h} fill={o.h > rth ? '#EF9A9A' : '#B0BEC5'} /><text x={x} y={124} fontSize={7} fill="#333" textAnchor="middle">{o.name}</text><text x={x} y={106 - h} fontSize={7} fill="#333" textAnchor="middle">{o.h}</text></g>; })}
          <line x1={20} y1={110 - rth * 0.45} x2={300} y2={110 - rth * 0.45} stroke={rth > tallest ? C.green : C.red} strokeWidth={2} strokeDasharray="6,3" />
          <text x={300} y={106 - rth * 0.45} fontSize={8} fill={rth > tallest ? C.green : C.red} textAnchor="end" fontWeight={700}>RTH {rth} ft</text>
          <text x={20} y={118} fontSize={8} fill="#333">home</text><text x={290} y={118} fontSize={8} fill="#333">aircraft</text>
        </svg>
        <Caption>{rth > tallest ? <>Clears the tallest obstacle ({tallest} ft). <strong style={{ color: C.green }}>Good.</strong></> : <><strong style={{ color: C.red }}>Below the {tallest}-ft obstacle.</strong> A lost-link RTH would fly straight into it. Set RTH above the tallest thing between any point of the flight and home, with margin.</>}</Caption>
      </Panel>

      <Card color={C.green} title="Interference and where it comes from">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Control link', body: 'Most sUAS use 2.4 or 5.8 GHz, shared with Wi-Fi. Dense urban areas, buildings between you and the aircraft, and high-voltage lines degrade it. Keep line of sight, orient antennas as the manual says, watch the signal bars.' },
            { term: 'GPS', body: 'Blocked under bridges and between tall buildings; jammed near some facilities. Fewer satellites means position-hold degrades or drops out.' },
            { term: 'Compass', body: 'Steel structures, rebar, vehicles, and magnets (speakers, tool belts) distort it. Symptoms: circling hover, curved flight, calibration warnings.' },
            { term: 'Geofencing', body: 'Manufacturer software that limits flight near airports and TFRs. Helpful, but not a substitute for checking airspace yourself; it can be wrong in both directions.' },
          ]} />
        </div>
      </Card>

      <Trap text="Low-battery questions: the answer is always 'land immediately at the nearest safe location', never 'return to the launch point'. Manned-aircraft questions: the answer is always 'descend/land and yield', never 'climb' or 'hold'." />
      <Tip text="Write your failsafe settings on the preflight card: lost-link action, RTH altitude, low-battery action. Brief them to the crew. The emergency plan you can recite is the one you will execute." />

      <ExamQuiz questions={byTopic('emergencies')} color={C.green} />
    </div>
  );
}
