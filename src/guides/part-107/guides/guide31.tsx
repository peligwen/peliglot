import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, Reg, DefList, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

function toMin(t: string): number { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function fmt(m: number): string { const mm = ((m % 1440) + 1440) % 1440; const h = Math.floor(mm / 60); const mi = mm % 60; const ap = h >= 12 ? 'PM' : 'AM'; const h12 = h % 12 === 0 ? 12 : h % 12; return `${h12}:${String(mi).padStart(2, '0')} ${ap}`; }

export function Guide31() {
  const [rise, setRise] = useState('06:45');
  const [set, setSet] = useState('19:30');
  const [t, setT] = useState(20 * 60);
  const r = toMin(rise); const s = toMin(set);
  const mct = r - 30; const ect = s + 30;
  let status: { label: string; color: string; body: string };
  if (t >= r && t < s) status = { label: 'Day', color: C.green, body: 'No anti-collision lighting required by rule (though a strobe never hurts).' };
  else if ((t >= mct && t < r) || (t >= s && t < ect)) status = { label: 'Civil twilight', color: C.orange, body: 'Anti-collision lighting visible for 3 SM is required. The sky is bright; your gray aircraft is not.' };
  else status = { label: 'Night', color: '#283593', body: 'Anti-collision lighting visible for 3 SM is required, and you must have completed the updated initial test or recurrent training. No waiver needed since April 2021.' };
  const pct = (m: number) => `${(m / 1440) * 100}%`;
  return (
    <div>
      <DarkBox title="NIGHT OPERATIONS — §107.29">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Night flying became routine in April 2021. Two conditions: an <strong>anti-collision light visible for at least 3 statute miles</strong> with a flash rate sufficient to avoid collision, and <strong>current training</strong> that covers night operations. The light is also required during <strong>civil twilight</strong>, which the rule defines with a clock, not a sky.
        </div>
      </DarkBox>

      <KeyNumbers color={C.green} items={[
        { label: 'light visible', value: '3 SM', note: 'anti-collision, flashing' },
        { label: 'morning twilight', value: '−30 min', note: 'before official sunrise' },
        { label: 'evening twilight', value: '+30 min', note: 'after official sunset' },
        { label: 'Alaska', value: 'Air Almanac', note: 'different definition' },
      ]} />

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Twilight clock</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
          <label style={{ fontSize: 12.5, display: 'flex', gap: 6, alignItems: 'center' }}>Sunrise <input type="time" value={rise} onChange={e => setRise(e.target.value || '06:45')} style={{ padding: '4px 8px', borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13 }} /></label>
          <label style={{ fontSize: 12.5, display: 'flex', gap: 6, alignItems: 'center' }}>Sunset <input type="time" value={set} onChange={e => setSet(e.target.value || '19:30')} style={{ padding: '4px 8px', borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13 }} /></label>
        </div>
        <div style={{ position: 'relative', height: 26, borderRadius: 8, overflow: 'hidden', background: '#283593', marginBottom: 4 }}>
          <div style={{ position: 'absolute', left: pct(mct), width: pct(30), top: 0, bottom: 0, background: C.orange }} />
          <div style={{ position: 'absolute', left: pct(r), width: pct(s - r), top: 0, bottom: 0, background: '#FFF59D' }} />
          <div style={{ position: 'absolute', left: pct(s), width: pct(30), top: 0, bottom: 0, background: C.orange }} />
          <div style={{ position: 'absolute', left: pct(t), top: 0, bottom: 0, width: 3, background: C.ink, transform: 'translateX(-1px)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, marginBottom: 8 }}><span>midnight</span><span>noon</span><span>midnight</span></div>
        <Slider label="Time of flight" value={t} min={0} max={1439} step={5} onChange={setT} color={C.green} format={fmt} />
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, borderLeft: `4px solid ${status.color}` }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: status.color }}>{status.label}</div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 4 }}>{status.body}</div>
        </div>
        <Caption>Morning civil twilight {fmt(mct)}–{fmt(r)} · day {fmt(r)}–{fmt(s)} · evening civil twilight {fmt(s)}–{fmt(ect)} · night otherwise. (Outside Alaska.)</Caption>
      </Panel>

      <Mnemonic text="Civil twilight = sunrise minus 30, sunset plus 30. Light required in twilight AND at night. Training required for night. Nothing required for day." />

      <Card color={C.green} title="The rule in pieces">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Night', body: <>Operate only with an anti-collision light visible for at least 3 SM with a flash rate sufficient to avoid a collision, and after completing an initial test or recurrent training that includes night operations.<Reg cite="29" /></> },
            { term: 'Civil twilight', body: 'Same lighting requirement. Defined (outside Alaska) as the 30 minutes before official sunrise and the 30 minutes after official sunset. In Alaska, per the Air Almanac.' },
            { term: 'Dimming', body: 'The RPIC may reduce the light’s intensity if operating conditions make that safer (glare, night vision) but may not turn it off.' },
            { term: 'Lighting is waivable', body: 'The anti-collision light requirement itself is on the §107.205 list; night operation no longer is, because it is no longer prohibited.' },
            { term: 'Built-in LEDs', body: 'The small position lights on most consumer drones are not visible at 3 miles. A dedicated strobe (usually white, sometimes red/green/white) is the normal fix.' },
          ]} />
        </div>
      </Card>

      <Card color={C.green} title="Flying it well at night">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          Survey the site in daylight: wires, poles, and trees vanish after dark. Give your eyes 30 minutes to adapt and keep screens dim. Use off-center viewing to find the strobe, and scan rather than stare so autokinesis does not make it wander. Distance and altitude are hard to judge; fly a more conservative envelope than you would by day. Obstacle-avoidance sensors that rely on cameras degrade or shut off. And remember the VO still needs to see the aircraft unaided: a strobe that the RPIC can see is the whole point.
        </div>
      </Card>

      <Trap text="'What is required to operate at night?' is NOT 'a waiver' anymore. The correct answer combines lighting (3 SM) and training. A question that lists 'daylight only' as a Part 107 restriction is describing the pre-2021 rule." />
      <Tip text="Official sunrise and sunset come from the U.S. Naval Observatory tables (or any app that uses them). The 30 minutes is fixed by rule; actual darkness varies with latitude, weather, and terrain, which is why the rule uses a clock." />

      <ExamQuiz questions={byTopic('night')} color={C.green} />
    </div>
  );
}
