import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, Reg, DefList, Slider, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

function Verdict({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', borderRadius: 8, background: ok ? '#E8F5E9' : '#FFEBEE', border: `1px solid ${ok ? '#C8E6C9' : '#F5C6C6'}`, fontSize: 12.5, color: ok ? '#1B5E20' : '#B71C1C', fontWeight: 600, marginBottom: 12 }}>
      <span>{ok ? '✅' : '❌'}</span><span>{text}</span>
    </div>
  );
}

export function Guide4() {
  const [alt, setAlt] = useState(350);
  const [near, setNear] = useState(false);
  const [structure, setStructure] = useState(600);
  const [mph, setMph] = useState(60);
  const [vis, setVis] = useState(5);
  const [below, setBelow] = useState(600);
  const [horiz, setHoriz] = useState(2500);

  const altLimit = near ? structure + 400 : 400;
  const altOk = alt <= altLimit;
  const kts = Math.round(mph * 0.869);
  const spdOk = mph <= 100;
  const visOk = vis >= 3;
  const cloudOk = below >= 500 && horiz >= 2000;

  return (
    <div>
      <DarkBox title="OPERATING LIMITATIONS — §107.51">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Four numbers from one section of the rule show up on nearly every test. Move the sliders and watch which combinations are legal; the trap is always in the units or the reference point.
        </div>
      </DarkBox>

      <KeyNumbers color={C.red} items={[
        { label: 'max altitude', value: '400 ft AGL', note: 'or 400 ft above a structure when within 400 ft of it' },
        { label: 'max groundspeed', value: '87 kt', note: '= 100 mph' },
        { label: 'min visibility', value: '3 SM', note: 'from the control station' },
        { label: 'cloud clearance', value: '500 / 2,000', note: '500 ft below, 2,000 ft horizontal' },
      ]} />

      <Panel color={C.red}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Altitude</div>
        <Slider label="Planned altitude" value={alt} min={0} max={1500} step={10} onChange={setAlt} color={C.red} format={v => `${v} ft AGL`} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={near} onChange={e => setNear(e.target.checked)} /> Within a 400-ft radius of a structure
        </label>
        {near && <Slider label="Structure height" value={structure} min={100} max={1500} step={50} onChange={setStructure} color={C.red} format={v => `${v} ft AGL`} />}
        <Verdict ok={altOk} text={altOk ? `Legal: limit here is ${altLimit} ft AGL.` : `Too high: limit here is ${altLimit} ft AGL${near ? ' (structure top + 400)' : ''}.`} />

        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Speed</div>
        <Slider label="Groundspeed" value={mph} min={0} max={130} step={1} onChange={setMph} color={C.red} format={v => `${v} mph ≈ ${Math.round(v * 0.869)} kt`} />
        <Verdict ok={spdOk} text={spdOk ? `Legal: ${kts} knots is under the 87-knot limit.` : `Over the limit: 87 kt = 100 mph.`} />

        <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Visibility & clouds</div>
        <Slider label="Visibility from the control station" value={vis} min={0} max={10} step={0.5} onChange={setVis} color={C.red} format={v => `${v} SM`} />
        <Verdict ok={visOk} text={visOk ? 'Legal: at least 3 statute miles.' : 'Below the 3 SM minimum. Note: measured at the control station, not at the aircraft.'} />
        <Slider label="Distance below the cloud base" value={below} min={0} max={1500} step={50} onChange={setBelow} color={C.red} format={v => `${v} ft`} />
        <Slider label="Horizontal distance from clouds" value={horiz} min={0} max={4000} step={100} onChange={setHoriz} color={C.red} format={v => `${v.toLocaleString()} ft`} />
        <Verdict ok={cloudOk} text={cloudOk ? 'Legal: 500 ft below and 2,000 ft horizontal.' : 'Too close: need 500 ft below AND 2,000 ft horizontally.'} />
      </Panel>

      <Mnemonic text="400 up, 87 fast, 3 miles out, 5-and-20 from the clouds. Say it until it is boring." />
      <Trap text="Units. The speed limit is 87 KNOTS, which equals 100 MPH. A distractor will offer '87 mph' or '100 knots'. Visibility is in STATUTE miles. Altitude is AGL, never MSL." />

      <Card color={C.red} title="The rest of Subpart B, in one table">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.red} items={[
            { term: 'VLOS', body: <>RPIC and person on the controls must see the aircraft unaided (corrective lenses excepted) through the whole flight, or a VO does it for them. FPV goggles alone do not count.<Reg cite="31" /></> },
            { term: 'Visual observer', body: <>Optional. Must communicate with the RPIC at all times, see the aircraft unaided, and scan for hazards. Not required to hold a certificate.<Reg cite="33" /></> },
            { term: 'Moving vehicles', body: <>Never from a moving aircraft. From a moving car or boat only over sparsely populated areas and never carrying someone else’s property for hire.<Reg cite="25" /></> },
            { term: 'One at a time', body: <>One person, one aircraft. Swarms need a waiver.<Reg cite="35" /></> },
            { term: 'Hazmat', body: <>No carriage of hazardous materials. Not waivable.<Reg cite="36" /></> },
            { term: 'Right of way', body: <>Yield to every aircraft, airborne vehicle, and launch/reentry vehicle. Never pass over, under, or ahead unless well clear.<Reg cite="37" /></> },
            { term: 'Careless / reckless', body: <>No careless or reckless operation; no dropping objects that create an undue hazard. Dropping something safely is allowed.<Reg cite="23" /></> },
            { term: 'Property for hire', body: 'Permitted within a single state (intrastate) when everything else in Part 107 is met. Interstate carriage requires Part 135.' },
          ]} />
        </div>
      </Card>

      <Tip text="The structure exception is a radius, not a cylinder you can roam. Step more than 400 ft laterally from the tower and your ceiling snaps back to 400 ft AGL. The test writes this as 'within a 400-foot radius of a structure.'" />

      <ExamQuiz questions={byTopic('limits')} color={C.red} />
    </div>
  );
}
