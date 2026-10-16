import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Reg, Tabs, DataTable, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const ways = [
  { name: 'Standard Remote ID', what: 'Built into the aircraft by the manufacturer. Broadcasts from takeoff to shutdown. Self-tests before flight; if the test fails you may not take off, and if it stops broadcasting in flight you land as soon as practicable.', limits: 'No extra operating limits. This is the only option that reports the live control-station position, so it is what BVLOS waivers assume.', cite: '110' },
  { name: 'Broadcast module', what: 'A small add-on transmitter for aircraft built without Remote ID. You register the module’s serial number with the aircraft.', limits: 'The aircraft must stay within visual line of sight of the RPIC at all times. The module reports the takeoff location instead of where the pilot is now.', cite: '115' },
  { name: 'FRIA', what: 'An FAA-Recognized Identification Area: a geographic site, applied for by a community-based organization or an educational institution, where aircraft without Remote ID may fly.', limits: 'Must stay inside the FRIA boundary and within VLOS. Does not satisfy the Remote ID condition for sustained flight over open-air assemblies.', cite: '205' },
];

export function Guide6() {
  const [t, setT] = useState(0);
  const w = ways[t];
  return (
    <div>
      <DarkBox title="REMOTE ID — 14 CFR PART 89">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Remote ID is a digital license plate: a radio broadcast anyone nearby can pick up with a phone. It became mandatory for operators in September 2023. Because every Part 107 aircraft must be registered, every Part 107 aircraft must comply.
        </div>
      </DarkBox>

      <Tabs tabs={ways.map(x => x.name)} active={t} onChange={setT} color={C.red} />
      <Panel color={C.red}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.red, marginBottom: 6 }}>{w.name}<Reg part={89} cite={w.cite} /></div>
        <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.55, marginBottom: 8 }}>{w.what}</div>
        <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.55, padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}><strong>Limits:</strong> {w.limits}</div>
      </Panel>

      <DataTable color={C.red} head={['Message element', 'Standard RID', 'Broadcast module']} boldCol={0} rows={[
        ['Aircraft identity (serial number or session ID)', 'Yes', 'Module serial number'],
        ['Aircraft latitude, longitude, geometric altitude', 'Yes', 'Yes'],
        ['Aircraft velocity', 'Yes', 'Yes'],
        ['Control station latitude, longitude, altitude', 'Yes (live)', 'No — takeoff location instead'],
        ['Time mark', 'Yes', 'Yes'],
        ['Emergency status', 'Yes', 'No'],
        ['VLOS required by the rule itself', 'No', 'Yes'],
      ]} />

      <Card color={C.red} title="Who sees what">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          The broadcast is unencrypted Bluetooth or Wi-Fi. Anyone with a receiver app sees the aircraft’s identifier, position, altitude, and the control-station or takeoff point. Only the FAA can match the serial number to the registration record, which is what law enforcement requests when a drone is a problem.
        </div>
      </Card>

      <Card color={C.red} title="Dates the test might mention">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px' }}>
            <strong>Sept 16, 2022</strong><span>Manufacturers must build Remote ID into new aircraft.</span>
            <strong>Sept 16, 2023</strong><span>Operators must comply (the FAA used enforcement discretion until March 16, 2024).</span>
          </div>
        </div>
      </Card>

      <Trap text="Registration and Remote ID are two different things. Registering an aircraft does not make it broadcast anything. A question that offers 'register the aircraft' as a way to comply with Part 89 is a distractor." />
      <Tip text="Broadcast-module aircraft cannot use a BVLOS waiver; the module rule itself demands VLOS. If a waiver is in your future, buy standard Remote ID." />

      <ExamQuiz questions={byTopic('remote-id')} color={C.red} />
    </div>
  );
}
