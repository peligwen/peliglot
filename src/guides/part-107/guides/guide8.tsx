import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Reg, DefList, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

export function Guide8() {
  const [injury, setInjury] = useState(false);
  const [loc, setLoc] = useState(false);
  const [other, setOther] = useState(300);
  const [ua, setUa] = useState(1200);

  const must = injury || loc || other > 500;
  const reasons: string[] = [];
  if (injury) reasons.push('serious injury to a person');
  if (loc) reasons.push('loss of consciousness');
  if (other > 500) reasons.push(`$${other.toLocaleString()} damage to property other than the aircraft (over the $500 threshold)`);

  return (
    <div>
      <DarkBox title="ACCIDENTS, EMERGENCIES & REPORTING">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Three sections do the work here: <strong>107.9</strong> says when you must report, <strong>107.21</strong> says what you may do in an emergency, and <strong>107.19</strong> says whose fault it is (yours). The reporting thresholds are tested with scenarios, so practice the arithmetic.
        </div>
      </DarkBox>

      <KeyNumbers color={C.red} items={[
        { label: 'to report', value: '10 days', note: 'calendar days, to the FAA' },
        { label: 'property threshold', value: '$500', note: 'other than the UA; repair cost or fair market value, whichever is lower' },
        { label: 'injury trigger', value: 'Serious', note: 'AIS level 3+, or ANY loss of consciousness' },
      ]} />

      <Panel color={C.red}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Do I have to report this?</div>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 6, cursor: 'pointer' }}>
          <input type="checkbox" checked={injury} onChange={e => setInjury(e.target.checked)} /> Someone suffered a serious injury (needed hospitalization, broke a bone, etc.)
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={loc} onChange={e => setLoc(e.target.checked)} /> Someone lost consciousness, even briefly
        </label>
        <Slider label="Damage to property OTHER than the drone" value={other} min={0} max={3000} step={50} onChange={setOther} color={C.red} format={v => `$${v.toLocaleString()}`} />
        <Slider label="Damage to the drone itself" value={ua} min={0} max={5000} step={100} onChange={setUa} color={C.red} format={v => `$${v.toLocaleString()}`} />
        <div style={{ padding: '10px 12px', borderRadius: 10, background: must ? '#FFEBEE' : '#E8F5E9', border: `1px solid ${must ? '#F5C6C6' : '#C8E6C9'}`, fontSize: 12.5, lineHeight: 1.5, color: must ? '#B71C1C' : '#1B5E20' }}>
          {must ? (
            <><strong>Report required within 10 calendar days</strong> because of {reasons.join('; ')}. Submit via DroneZone or to the nearest FSDO.</>
          ) : (
            <><strong>No §107.9 report required.</strong> Damage to the aircraft itself never counts, and the other property damage is at or under $500. Log it anyway.</>
          )}
        </div>
      </Panel>

      <Trap text="Drone damage is a distractor every time. A $3,000 drone totaled against a $200 fence is NOT reportable. A $200 drone that scratches a $600 car IS. The threshold is measured on the other party's property, using the lower of repair cost or fair market value." />

      <Card color={C.red} title="What goes in the report">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          RPIC name and certificate number · aircraft registration number · location, date, and time · names of persons injured and the extent · property damaged and the extent · a description of what happened.<Reg cite="9" />
        </div>
      </Card>

      <Card color={C.red} title="Emergencies, authority, and the honest-mistake system">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.red} items={[
            { term: 'In-flight emergency', body: <>The RPIC may deviate from any rule in Part 107 to the extent necessary to meet the emergency. A written report is required only if the FAA asks for one.<Reg cite="21" /></> },
            { term: 'RPIC authority', body: <>Directly responsible for, and the final authority as to, the operation. Must ensure the aircraft poses no undue hazard to people, aircraft, or property in the event of a loss of control for any reason.<Reg cite="19" /></> },
            { term: 'NASA ASRS', body: 'The Aviation Safety Reporting System. Voluntary and confidential. File within 10 days of an inadvertent violation and the FAA will not impose a civil penalty (the violation still goes on record), provided it was not deliberate or criminal, did not involve an accident, and you have no violation in the previous five years.' },
            { term: 'NTSB (49 CFR 830)', body: 'A separate, immediate notification duty to the NTSB applies when a UAS operation causes death or serious injury (or substantial damage to an aircraft of 300 lb or more). For sUAS, the injury cases are what matter.' },
            { term: 'Falsification', body: <>A fraudulent statement on any application, report, or record is grounds for denial, suspension, or revocation.<Reg cite="5" /></> },
            { term: 'Inspection', body: <>On request, make the certificate, registration, and any required documents or records available, and allow the FAA to inspect or test the aircraft.<Reg cite="7" /></> },
          ]} />
        </div>
      </Card>

      <Tip text="Two different 10-day clocks: the 107.9 accident report (mandatory, to the FAA) and the NASA ASRS form (voluntary, to NASA). You can and sometimes should file both." />

      <ExamQuiz questions={byTopic('accidents')} color={C.red} />
    </div>
  );
}
