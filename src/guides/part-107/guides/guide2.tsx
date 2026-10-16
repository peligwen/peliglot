import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Reg, DefList, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

function regime(lb: number): { title: string; color: string; body: string } {
  if (lb >= 55) return { title: 'Not a small UAS', color: C.red, body: 'At 55 lb or more on takeoff the aircraft is outside Part 107 entirely. It needs an exemption under 49 U.S.C. 44807 and registration under Part 47 (the N-number system used by manned aircraft).' };
  if (lb >= 0.55) return { title: 'Part 48 registration', color: C.green, body: 'Register online at FAADroneZone: $5 per aircraft, valid 3 years. Mark the number on an external surface. This is the normal case for almost every commercial drone.' };
  return { title: 'Under 0.55 lb — still register under Part 107', color: C.orange, body: 'The 250 g exemption only exists for recreational flying under the 44809 exception. Fly this aircraft for any Part 107 purpose and it must be registered like any other.' };
}

export function Guide2() {
  const [lb, setLb] = useState(2.5);
  const r = regime(lb);
  return (
    <div>
      <DarkBox title="REGISTRATION & MARKING">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Every aircraft flown under Part 107 is registered with the FAA, full stop. The weight thresholds the test asks about decide <em>which</em> registration system applies and whether the aircraft is a “small unmanned aircraft” at all.
        </div>
      </DarkBox>

      <KeyNumbers color={C.red} items={[
        { label: 'per aircraft', value: '$5', note: 'FAADroneZone, Part 48' },
        { label: 'valid for', value: '3 years', note: 'then renew' },
        { label: 'to register', value: 'age 13', note: 'younger: parent registers' },
        { label: 'small UA limit', value: '< 55 lb', note: 'on takeoff, everything attached' },
      ]} />

      <Panel color={C.red}>
        <Slider label="Takeoff weight (everything attached)" value={lb} min={0.1} max={70} step={0.1} onChange={setLb} color={C.red} format={v => `${v.toFixed(1)} lb (${Math.round(v * 453.6)} g)`} />
        <div style={{ position: 'relative', height: 10, borderRadius: 5, background: `linear-gradient(90deg, ${C.orange} 0 0.8%, ${C.green} 0.8% 78.5%, ${C.red} 78.5% 100%)`, marginBottom: 10 }}>
          <div style={{ position: 'absolute', left: `${((lb - 0.1) / 69.9) * 100}%`, top: -4, width: 4, height: 18, background: C.ink, borderRadius: 2, transform: 'translateX(-2px)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, marginBottom: 10 }}><span>0.55 lb</span><span>55 lb</span></div>
        <div style={{ padding: '10px 12px', borderRadius: 10, background: C.sand, border: `1px solid ${C.line}`, borderLeft: `4px solid ${r.color}` }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: r.color }}>{r.title}</div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 4 }}>{r.body}</div>
        </div>
      </Panel>

      <Trap text="The FAA loves this one: 'A 0.4 lb drone is flown for a paid shoot. Must it be registered?' Yes. The 0.55 lb exemption is recreational-only. Under Part 107 there is no weight floor." />

      <Card color={C.red} title="What the test expects you to know">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.red} items={[
            { term: 'Part 48', body: <>Online registration for small UA between 0.55 and 55 lb (and any Part 107 aircraft under 0.55 lb). The registrant must be a U.S. citizen or permanent resident; others receive a “recognition of ownership” instead.<Reg part={48} cite="100" /></> },
            { term: 'Part 47', body: 'The traditional paper registration with an N-number. Required for aircraft 55 lb and over, or if the owner prefers it. Not what the test means by “registered small UA.”' },
            { term: 'Marking', body: 'The registration number goes on an external surface, legible, visible on close inspection. Engraving, a label, or permanent marker all count. It must not be hidden inside a battery bay.' },
            { term: 'Carry it', body: 'Proof of registration must be available during operation, on paper or on a screen. Expect to show it alongside your certificate on a ramp check.' },
            { term: 'Part 107 applies to', body: <>Any civil small UA flight that is not purely recreational under the 44809 exception. Doing it for free does not make it recreational; the purpose does.<Reg cite="1" /></> },
            { term: 'Small unmanned aircraft', body: <>An unmanned aircraft weighing less than 55 pounds on takeoff, including everything that is on board or otherwise attached.<Reg cite="3" /></> },
          ]} />
        </div>
      </Card>

      <Tip text="Register under Part 107 (not as a recreational flyer) at FAADroneZone and the system gives each aircraft its own number. Recreational registration is one number per person, which is not valid for Part 107 flights." />

      <ExamQuiz questions={byTopic('registration')} color={C.red} />
    </div>
  );
}
