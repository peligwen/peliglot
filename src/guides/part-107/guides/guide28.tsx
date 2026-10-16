import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, DefList, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

const legs = ['Upwind / departure', 'Crosswind', 'Downwind', 'Base', 'Final'];

export function Guide28() {
  const [windFrom, setWindFrom] = useState(320);
  const [right, setRight] = useState(false);
  const [leg, setLeg] = useState(2);
  const rwy = ((Math.round(windFrom / 10) + 35) % 36) + 1; // 1..36
  const recip = ((rwy + 17) % 36) + 1;
  const hdg = rwy * 10;
  // Pattern drawn for a runway aligned with landing heading pointing "up" (north on screen), then rotated.
  const side = right ? 1 : -1; // downwind on the left for left traffic (as seen flying the landing heading)
  const pts = {
    upwind: { x: 0, y: -90 }, crosswind: { x: side * 50, y: -110 }, downwind: { x: side * 100, y: 0 }, base: { x: side * 50, y: 110 }, final: { x: 0, y: 90 },
  };
  const legPts = [pts.upwind, pts.crosswind, pts.downwind, pts.base, pts.final];
  return (
    <div>
      <DarkBox title="AIRPORT OPERATIONS">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          You will fly near airports. The test wants you to read runway numbers, predict where manned traffic is, interpret wind indicators and beacons, and know the markings. All of it serves one rule: <strong>do not interfere with airport operations or traffic patterns</strong>, and yield to everything.
        </div>
      </DarkBox>

      <Panel color={C.green}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.green, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Which runway, which pattern?</div>
        <Slider label="Wind is FROM (magnetic)" value={windFrom} min={0} max={359} step={5} onChange={setWindFrom} color={C.green} format={v => `${String(v).padStart(3, '0')}°`} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, marginBottom: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={right} onChange={e => setRight(e.target.checked)} /> Right-hand pattern published for this runway (“RP”)
        </label>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {legs.map((l, i) => <button key={l} onClick={() => setLeg(i)} style={{ padding: '4px 9px', borderRadius: 8, border: leg === i ? `2px solid ${C.green}` : `1.5px solid ${C.line}`, background: leg === i ? C.green : C.paper, color: leg === i ? '#fff' : C.muted, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{l}</button>)}
        </div>
        <svg viewBox="-150 -150 300 300" width="100%" style={{ maxWidth: 340, display: 'block', margin: '0 auto', background: '#f1f8e9', borderRadius: 12, border: `1px solid ${C.line}` }} role="img" aria-label={`Traffic pattern for runway ${rwy}`}>
          <g transform={`rotate(${hdg})`}>
            {/* runway: landing direction points "up" in this frame */}
            <rect x={-7} y={-60} width={14} height={120} fill="#546E7A" />
            <text x={0} y={52} fontSize={9} fill="#fff" textAnchor="middle" fontWeight={700} transform="rotate(0)">{rwy}</text>
            <text x={0} y={-45} fontSize={9} fill="#fff" textAnchor="middle" fontWeight={700} transform="rotate(180 0 -48)">{recip}</text>
            <polyline points={`${pts.final.x},${pts.final.y + 30} ${pts.final.x},${pts.final.y} ${pts.base.x},${pts.base.y} ${pts.downwind.x},${pts.downwind.y} ${pts.crosswind.x},${pts.crosswind.y} ${pts.upwind.x},${pts.upwind.y}`} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="6,4" />
            <polyline points={`${pts.base.x},${pts.base.y} ${pts.downwind.x},${pts.downwind.y}`} fill="none" stroke={C.green} strokeWidth={2} />
            <circle cx={legPts[leg].x} cy={legPts[leg].y} r={7} fill={C.red} stroke="#fff" strokeWidth={2} />
            {/* wind arrow: blows toward -y (down the runway in the landing direction) */}
            <g transform="translate(0 -135)"><line x1={0} y1={-10} x2={0} y2={14} stroke="#0D47A1" strokeWidth={2.5} /><polygon points="-5,10 0,18 5,10" fill="#0D47A1" /></g>
          </g>
          <text x={-140} y={-132} fontSize={10} fill="#333" fontWeight={700}>N ↑</text>
          <text x={60} y={140} fontSize={9} fill="#0D47A1" fontWeight={700}>blue = wind</text>
        </svg>
        <Caption>Land on <strong>Runway {rwy}</strong> (heading about {String(hdg).padStart(3, '0')}°, into the wind). Aircraft on the <strong>{legs[leg].toLowerCase()}</strong> leg are {leg === 4 ? 'descending through your altitude toward the threshold.' : leg === 3 ? 'turning and descending, about to line up with the runway.' : leg === 2 ? 'at pattern altitude (about 1,000 ft AGL) flying opposite the landing direction.' : leg === 1 ? 'climbing and turning after takeoff.' : 'climbing out straight ahead, low and fast.'} {right ? 'Right-hand pattern: all turns to the right.' : 'Standard left-hand pattern: all turns to the left.'}</Caption>
      </Panel>

      <Mnemonic text="Runway number = magnetic heading ÷ 10, rounded. Runway 27 points west (270°); its other end is Runway 9. Wind from 320: land on 32. Into the wind, always." />

      <Card color={C.green} title="Wind indicators and the segmented circle">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Windsock', body: 'Streams downwind. Aircraft land in the opposite direction, i.e. toward the big end. Sock pointing southeast = wind from the northwest = land on 32.' },
            { term: 'Tetrahedron', body: 'The small (pointed) end points into the wind; aircraft land in the direction it points.' },
            { term: 'Wind tee', body: 'Shaped like an airplane seen from above; aircraft land in the direction the “airplane” would fly.' },
            { term: 'Segmented circle', body: 'A ring of markers around the wind indicator. L-shaped traffic pattern indicators on it show the direction of turns for each runway. No circle, no indicators: assume left traffic.' },
          ]} />
        </div>
      </Card>

      <DataTable color={C.green} head={['Beacon colors', 'Means']} rows={[
        ['White / green', 'Lighted civilian land airport'],
        ['White / yellow', 'Lighted water airport'],
        ['Green / yellow / white', 'Lighted heliport'],
        ['Two quick white, then green', 'Military airport'],
        ['Beacon on in daytime (B/C/D/E-surface)', 'Weather below VFR minimums: ceiling under 1,000 ft or visibility under 3 SM'],
      ]} />

      <Card color={C.green} title="Markings and lights worth recognizing">
        <div style={{ padding: '12px 14px 0' }}>
          <DefList color={C.green} items={[
            { term: 'Displaced threshold', body: 'White arrows pointing to a thick bar. The pavement before it is for taxi and takeoff, not landing. Approaching aircraft are still descending over it.' },
            { term: 'Closed runway', body: 'A large yellow X at each end.' },
            { term: 'Hold-short lines', body: 'Two solid plus two dashed yellow lines across a taxiway. Hold on the solid side; the dashed side faces the runway.' },
            { term: 'Runway lights', body: 'Edge lights white; threshold green from the approach side, end red; taxiway edges blue, taxiway centerline green.' },
            { term: 'PAPI / VASI', body: 'Glide-path lights. Two red, two white = on path. All white = high. All red = low. A manned aircraft on a 3° path is at 400 ft about 1.3 NM from the runway.' },
            { term: 'Helicopters', body: 'Approach and depart from any direction, often below 400 ft, with heavy rotor wash. Hospitals and police helipads are airports in miniature.' },
          ]} />
        </div>
      </Card>

      <Trap text="Near a non-towered airport in Class G you need no authorization, and the old 'notify within 5 miles' rule is gone. What remains is §107.43: do not interfere with operations or the traffic pattern. Monitor the CTAF and stay out of the approach and departure paths." />
      <Tip text="Pattern geometry is a prediction tool. If you know the active runway and the pattern direction, you know which side of the field the low aircraft will be on and which corner they will descend through. Set up on the other side." />

      <ExamQuiz questions={byTopic('airport-ops')} color={C.green} />
    </div>
  );
}
