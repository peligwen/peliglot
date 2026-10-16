import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Reg, DefList, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

export function Guide27() {
  const [hrs, setHrs] = useState(6);
  const [hung, setHung] = useState(false);
  const legalHours = hrs >= 8;
  const ok = legalHours && !hung;
  return (
    <div>
      <DarkBox title="PHYSIOLOGY & VISION">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The aircraft is unmanned; the pilot is not. Alcohol, drugs, fatigue, dehydration, and stress degrade the only brain in the loop, and the test wants the numbers and the names. Vision gets its own section because seeing a small aircraft against the sky is harder than it sounds, and worse at night.
        </div>
      </DarkBox>

      <KeyNumbers color={C.green} items={[
        { label: 'bottle to throttle', value: '8 hours', note: '§91.17 via §107.27' },
        { label: 'blood alcohol', value: '< 0.04%', note: 'and never “under the influence”' },
        { label: 'dark adaptation', value: '30 min', note: 'undone by one bright light' },
        { label: 'scan sectors', value: '10°', note: 'pause about a second on each' },
      ]} />

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Can I fly?</div>
        <Slider label="Hours since the last drink" value={hrs} min={0} max={16} step={1} onChange={setHrs} color={C.green} format={v => `${v} h`} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={hung} onChange={e => setHung(e.target.checked)} /> Still feel the effects (headache, fog, nausea)
        </label>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: ok ? '#E8F5E9' : '#FFEBEE', border: `1px solid ${ok ? '#C8E6C9' : '#F5C6C6'}`, fontSize: 12.5, color: ok ? '#1B5E20' : '#B71C1C', lineHeight: 1.5 }}>
          {!legalHours ? <><strong>No.</strong> Fewer than 8 hours since consuming alcohol is a violation regardless of how you feel.</> : hung ? <><strong>No.</strong> The 8-hour rule is satisfied, but a hangover is impairment. §107.17 (physical or mental condition) and “under the influence” still apply.</> : <><strong>Legally yes</strong>, provided BAC is under 0.04 and you are not impaired. The 8-hour rule is a floor, not a guarantee.</>}
        </div>
      </Panel>

      <Card color={C.green} title="Chemistry">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Alcohol', body: <>8 hours bottle to throttle; no operating under the influence; BAC under 0.04%. A conviction or a test refusal is grounds for denial up to a year, or suspension/revocation.<Reg cite="27" /></> },
            { term: 'Drugs', body: 'No operation while using any drug that affects the faculties in a way contrary to safety. Over-the-counter antihistamines, sleep aids, and many cold remedies qualify. “May cause drowsiness” means do not fly.' },
            { term: 'Fatigue', body: 'Acute: short-term, fixed by a night’s sleep. Chronic: cumulative over days or weeks, not fixed by one night. Both degrade judgment, and a tired pilot is a poor judge of their own fatigue.' },
            { term: 'Dehydration & heat', body: 'Headache, fatigue, dizziness, poor judgment. Remote pilots stand in the sun for hours. Drink before you are thirsty.' },
            { term: 'Stress', body: 'A little sharpens you; too much narrows attention to one thing (often the wrong one). Chronic stress lowers the baseline. It is the S in IMSAFE for a reason.' },
            { term: 'Hyperventilation', body: 'Rapid breathing under stress blows off carbon dioxide: lightheadedness, tingling, possible fainting. Slow the breathing, talk aloud, or breathe into a bag.' },
          ]} />
        </div>
      </Card>

      <Card color={C.green} title="Vision">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Scanning', body: 'The eye only sees when it is still. Scan in short, regularly spaced sectors of about 10°, pausing roughly a second on each. A continuous sweep sees nothing.' },
            { term: 'Empty-field myopia', body: 'With nothing to focus on (haze, clear sky, darkness) the eyes relax to a focus 10–30 ft away and miss distant aircraft. Refocus on a distant object now and then.' },
            { term: 'Night vision', body: 'The rods around the edge of the retina take about 30 minutes to adapt and are wrecked by one bright light. Keep screens dim, use red light for charts.' },
            { term: 'Off-center viewing', body: 'The center of the retina is nearly blind in the dark. Look 5–10° to the side of a dim object to see it.' },
            { term: 'Autokinesis', body: 'A single stationary light stared at in the dark appears to move. Scan instead of staring; use other references.' },
            { term: 'False horizon', body: 'A sloping cloud bank, a line of ground lights, or a dark shoreline can be mistaken for the horizon.' },
            { term: 'Flicker vertigo', body: 'Light flickering at 4–20 Hz (a strobe, sun through rotor blades) can cause nausea or disorientation.' },
          ]} />
        </div>
      </Card>

      <Trap text="Hyperventilation vs hypoxia: both produce lightheadedness and tingling, but at 400 ft AGL only hyperventilation is realistic. If the question is about breathing too fast, the fix is breathing slower, not oxygen." />
      <Tip text="The best vision tip for sUAS: keep the sun at your back when possible, and when you lose the aircraft against the sky, stop, hold position, and scan rather than flying blind toward where you think it is." />

      <ExamQuiz questions={byTopic('physiology')} color={C.green} />
    </div>
  );
}
