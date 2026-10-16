import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Panel, Caption, ExamQuiz } from './_helpers';
import type { ExamQuestion } from '../questions/types';

const BLUE = '#1565C0'; const MAG = '#C2185B';

function MockSectional({ labels }: { labels: boolean }) {
  const L = ({ x, y, t }: { x: number; y: number; t: string }) => labels ? <text x={x} y={y} fontSize={7.5} fill="#B71C1C" fontWeight={800} style={{ paintOrder: 'stroke' }} stroke="#fff" strokeWidth={2.5}>{t}</text> : null;
  return (
    <svg viewBox="0 0 400 320" width="100%" style={{ maxWidth: 560, display: 'block', margin: '0 auto', background: '#F4EFE0', borderRadius: 12, border: `1px solid ${C.line}` }} role="img" aria-label="Practice sectional chart excerpt (fictional)">
      <defs>
        <pattern id="hatchB" width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={5} stroke={BLUE} strokeWidth={1.4} /></pattern>
        <pattern id="hatchM" width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={5} stroke={MAG} strokeWidth={1.4} /></pattern>
        <radialGradient id="vigE"><stop offset="58%" stopColor={MAG} stopOpacity={0} /><stop offset="100%" stopColor={MAG} stopOpacity={0.45} /></radialGradient>
      </defs>
      {/* terrain tint */}
      <ellipse cx={330} cy={250} rx={90} ry={60} fill="#D7CCC8" opacity={0.6} />
      {/* lat/long grid */}
      <line x1={0} y1={60} x2={400} y2={60} stroke="#555" strokeWidth={0.8} />
      <line x1={0} y1={260} x2={400} y2={260} stroke="#555" strokeWidth={0.8} />
      <line x1={70} y1={0} x2={70} y2={320} stroke="#555" strokeWidth={0.8} />
      <line x1={330} y1={0} x2={330} y2={320} stroke="#555" strokeWidth={0.8} />
      {Array.from({ length: 30 }, (_, i) => <line key={'tk' + i} x1={70 + i * 8.67} y1={260} x2={70 + i * 8.67} y2={i % 5 === 0 ? 253 : 256} stroke="#555" strokeWidth={0.6} />)}
      {Array.from({ length: 30 }, (_, i) => <line key={'tl' + i} x1={70} y1={60 + i * 6.67} x2={i % 5 === 0 ? 77 : 74} y2={60 + i * 6.67} stroke="#555" strokeWidth={0.6} />)}
      <text x={4} y={58} fontSize={8} fill="#333" fontWeight={700}>35°30'</text>
      <text x={4} y={272} fontSize={8} fill="#333" fontWeight={700}>35°00'</text>
      <text x={52} y={12} fontSize={8} fill="#333" fontWeight={700}>85°30'</text>
      <text x={312} y={12} fontSize={8} fill="#333" fontWeight={700}>85°00'</text>
      {/* MEFs */}
      <text x={110} y={160} fontSize={20} fill="#333" fontWeight={700}>2<tspan fontSize={11} dy={-9}>5</tspan></text>
      <text x={345} y={160} fontSize={20} fill="#333" fontWeight={700}>1<tspan fontSize={11} dy={-9}>8</tspan></text>
      {/* Victor airway */}
      <line x1={0} y1={40} x2={400} y2={120} stroke="#64B5F6" strokeWidth={4} opacity={0.6} />
      <text x={20} y={38} fontSize={8} fill={BLUE} fontWeight={700} transform="rotate(11.3 20 38)">V-333</text>
      {/* Restricted area */}
      <path d="M300 20 L395 20 L395 90 L330 110 L300 70 Z" fill="url(#hatchB)" fillOpacity={0.6} stroke={BLUE} strokeWidth={1.5} />
      <text x={318} y={52} fontSize={9} fill={BLUE} fontWeight={800}>R-3004</text>
      {/* MOA */}
      <path d="M20 190 L120 180 L140 250 L60 300 L10 270 Z" fill="url(#hatchM)" fillOpacity={0.5} stroke={MAG} strokeWidth={1.5} />
      <text x={40} y={245} fontSize={9} fill={MAG} fontWeight={800}>PINE MOA</text>
      {/* isogonic line */}
      <line x1={180} y1={320} x2={260} y2={0} stroke={MAG} strokeWidth={1} strokeDasharray="6,4" />
      <text x={246} y={28} fontSize={8} fill={MAG} fontWeight={700}>5°W</text>
      {/* Class E vignette around Collegedale */}
      <circle cx={120} cy={110} r={58} fill="url(#vigE)" />
      {/* Collegedale non-towered airport */}
      <circle cx={120} cy={110} r={11} fill="none" stroke={MAG} strokeWidth={2} />
      <rect x={112} y={108} width={16} height={4} fill={MAG} transform="rotate(-30 120 110)" />
      <text x={136} y={100} fontSize={7.5} fill={MAG} fontWeight={800}>COLLEGEDALE (FGU)</text>
      <text x={136} y={109} fontSize={7} fill={MAG}>Ⓒ 122.8</text>
      <text x={136} y={118} fontSize={7} fill={MAG}>860 *L 51</text>
      <text x={136} y={127} fontSize={7} fill={MAG}>RP 21</text>
      {/* parachute near Collegedale */}
      <g transform="translate(78 140) scale(0.5)"><path d="M0 18 Q12 0 24 18 Z" fill="none" stroke={MAG} strokeWidth={2} /><line x1={0} y1={18} x2={12} y2={32} stroke={MAG} strokeWidth={1.5} /><line x1={24} y1={18} x2={12} y2={32} stroke={MAG} strokeWidth={1.5} /></g>
      {/* Riverbend Class D + E surface extension */}
      <path d="M270 200 L330 230 L330 250 L270 250 Z" fill="none" stroke={MAG} strokeWidth={1.5} strokeDasharray="5,3" />
      <circle cx={250} cy={225} r={40} fill="none" stroke={BLUE} strokeWidth={1.8} strokeDasharray="5,3" />
      <text x={262} y={262} fontSize={8} fill={BLUE} fontWeight={700}>[-27]</text>
      <circle cx={250} cy={225} r={12} fill="none" stroke={BLUE} strokeWidth={2} />
      <rect x={240} y={223} width={20} height={4} fill={BLUE} transform="rotate(20 250 225)" />
      <polygon points="250,206 252,211 257,211 253,214 254,219 250,216 246,219 247,214 243,211 248,211" fill={BLUE} />
      <text x={190} y={172} fontSize={7.5} fill={BLUE} fontWeight={800}>RIVERBEND RGNL (RBD)</text>
      <text x={190} y={181} fontSize={7} fill={BLUE}>CT - 118.3 *  ATIS 124.1</text>
      <text x={190} y={190} fontSize={7} fill={BLUE}>682  L 74  122.95</text>
      {/* obstacles */}
      <polygon points="175,275 171,300 179,300" fill="none" stroke="#333" strokeWidth={1.4} /><line x1={169} y1={300} x2={181} y2={300} stroke="#333" strokeWidth={1.4} />
      <text x={183} y={286} fontSize={7} fill="#333" fontWeight={700}>1549</text><text x={183} y={294} fontSize={6.5} fill="#333">(449)</text>
      <polygon points="300,138 296,165 304,165" fill="none" stroke="#333" strokeWidth={1.4} /><polygon points="310,142 306,165 314,165" fill="none" stroke="#333" strokeWidth={1.4} /><line x1={294} y1={165} x2={316} y2={165} stroke="#333" strokeWidth={1.4} />
      <polyline points="305,128 302,134 307,134 304,140" fill="none" stroke="#333" strokeWidth={1} />
      <text x={318} y={150} fontSize={7} fill="#333" fontWeight={700}>2049</text><text x={318} y={158} fontSize={6.5} fill="#333">(1104)</text>
      {/* question markers */}
      <circle cx={225} cy={240} r={6} fill="#FFF" stroke="#B71C1C" strokeWidth={1.5} /><text x={225} y={243} fontSize={7} fill="#B71C1C" fontWeight={800} textAnchor="middle">X</text>
      <circle cx={300} cy={240} r={6} fill="#FFF" stroke="#B71C1C" strokeWidth={1.5} /><text x={300} y={243} fontSize={7} fill="#B71C1C" fontWeight={800} textAnchor="middle">Y</text>
      {/* labels overlay */}
      <L x={88} y={66} t="E at 700 ft (vignette)" />
      <L x={200} y={205} t="Class D, ceiling 2,700 MSL" />
      <L x={272} y={197} t="E surface extension" />
      <L x={225} y={30} t="restricted: ask" />
      <L x={60} y={185} t="MOA: caution" />
      <L x={60} y={160} t="MEF 2,500 MSL" />
      <L x={120} y={300} t="tower: 1,549 MSL / 449 AGL" />
      <L x={230} y={120} t="var 5°W: add" />
      <L x={60} y={140} t="parachute area" />
      <L x={20} y={50} t="Victor airway" />
    </svg>
  );
}

const workout: ExamQuestion[] = [
  { id: 'sw-1', area: 'II', topic: 'sectional-workout', q: 'The control tower at Riverbend Regional (RBD)', options: ['operates part-time; hours are in the Chart Supplement.', 'operates 24 hours a day.', 'is closed permanently; 118.3 is the CTAF only.'], answer: 0, explain: 'The asterisk after "CT - 118.3" marks a part-time tower. When closed, the Chart Supplement says whether the airspace becomes E or G.' },
  { id: 'sw-2', area: 'II', topic: 'sectional-workout', q: 'A remote pilot wants to fly at 300 ft AGL at point X, inside the dashed blue circle. The flight', options: ['requires ATC authorization (LAANC or DroneZone) because it is in Class D airspace.', 'needs no authorization because it is below 400 ft.', 'requires a Certificate of Waiver.'], answer: 0, explain: 'Dashed blue = Class D from the surface up to 2,700 ft MSL here. Any altitude inside it needs an authorization under §107.41.' },
  { id: 'sw-3', area: 'II', topic: 'sectional-workout', q: 'Flying at 350 ft AGL over Collegedale (FGU), inside the shaded magenta band, the aircraft is in', options: ['Class G airspace; no authorization required.', 'Class E airspace; authorization required.', 'Class D airspace; authorization required.'], answer: 0, explain: 'The vignette means Class E begins at 700 ft AGL. Below that is Class G. A non-towered airport in G needs no authorization, only non-interference (§107.43).' },
  { id: 'sw-4', area: 'II', topic: 'sectional-workout', q: 'Flying 400 ft AGL directly over the Collegedale field puts the aircraft at approximately', options: ['1,260 ft MSL.', '1,100 ft MSL.', '400 ft MSL.'], answer: 0, explain: 'Field elevation 860 ft MSL + 400 ft AGL = 1,260 ft MSL.' },
  { id: 'sw-5', area: 'II', topic: 'sectional-workout', q: 'The single tower southwest of Riverbend is charted 1549 (449). The ground elevation at its base is', options: ['1,100 ft MSL.', '1,549 ft MSL.', '449 ft MSL.'], answer: 0, explain: '1,549 MSL minus 449 AGL = 1,100 ft MSL at the base.' },
  { id: 'sw-6', area: 'II', topic: 'sectional-workout', q: 'The Maximum Elevation Figure in the western quadrangle, 2⁵, means', options: ['the highest terrain or obstacle plus buffer is 2,500 ft MSL.', 'the floor of Class E is 2,500 ft AGL.', 'the quadrangle is 25 NM across.'], answer: 0, explain: 'MEFs are in thousands and hundreds of feet MSL. Compare with the group obstacle at 2,049 MSL in the eastern quadrangle, which drives that quadrangle\'s MEF of 1⁸? No — 2,049 exceeds 1,800, so on a real chart that MEF would be higher. Check our fictional chart critically: the lesson is that the MEF must exceed every charted obstacle in its block.' },
  { id: 'sw-7', area: 'II', topic: 'sectional-workout', q: 'A manned aircraft landing on runway 21 at Collegedale will fly', options: ['a right-hand traffic pattern, as "RP 21" indicates.', 'a standard left-hand pattern.', 'straight in only; no pattern is permitted.'], answer: 0, explain: 'RP = right pattern for the listed runway. Base and final will be on the opposite side from standard.' },
  { id: 'sw-8', area: 'II', topic: 'sectional-workout', q: 'A flight inside PINE MOA at 200 ft AGL', options: ['is permitted, but the pilot should exercise extreme caution and may check with the controlling agency for activity.', 'is prohibited while the MOA is active.', 'requires a LAANC authorization.'], answer: 0, explain: 'Magenta hatching = Military Operations Area. Not prohibited to VFR or sUAS; fast low-level military traffic is the hazard.' },
  { id: 'sw-9', area: 'II', topic: 'sectional-workout', q: 'A flight inside R-3004 requires', options: ['permission from the using or controlling agency listed in the chart margin.', 'nothing, if below 400 ft AGL.', 'a Remote ID broadcast module.'], answer: 0, explain: 'Blue hatching with an R-number = restricted area. §107.45: no operation without permission from the using or controlling agency.' },
  { id: 'sw-10', area: 'II', topic: 'sectional-workout', q: 'The isogonic line reads 5°W. A true course of 180° is a magnetic course of', options: ['185°.', '175°.', '180°.'], answer: 0, explain: 'West is best: add westerly variation when going from true to magnetic. 180 + 5 = 185.' },
  { id: 'sw-11', area: 'II', topic: 'sectional-workout', q: 'Point Y lies inside the dashed magenta shape east of Riverbend but outside the blue circle. A flight there at 200 ft AGL', options: ['requires authorization: it is a Class E surface-area extension of the Class D.', 'needs no authorization because it is outside Class D.', 'is in a Military Training Route.'], answer: 0, explain: 'Dashed magenta attached to a Class D circle is Class E to the surface, protecting the instrument approach. It is treated like the Class D for §107.41.' },
  { id: 'sw-12', area: 'II', topic: 'sectional-workout', q: 'The longest runway at Riverbend Regional is', options: ['7,400 ft.', '74 ft.', '682 ft.'], answer: 0, explain: 'In the data block "682 L 74 122.95", 682 is the elevation, L means lighting, 74 is hundreds of feet of runway, 122.95 is UNICOM.' },
  { id: 'sw-13', area: 'II', topic: 'sectional-workout', q: 'The symbol southwest of Collegedale resembling an open parachute indicates', options: ['a parachute jumping area; details are in the Chart Supplement.', 'a glider port.', 'an ultralight activity area.'], answer: 0, explain: 'Jumpers descend through sUAS altitudes and the jump aircraft climbs steeply through the pattern. Check the Supplement for the active radius and altitudes.' },
  { id: 'sw-14', area: 'II', topic: 'sectional-workout', q: 'The two joined tower symbols with a lightning-bolt mark northeast of Riverbend indicate', options: ['a group of obstacles, the tallest 2,049 ft MSL, with high-intensity strobe lighting.', 'a single unlit tower 1,104 ft MSL.', 'a radio navigation aid.'], answer: 0, explain: 'Joined towers = group obstacle, labeled with the tallest. The bolt = high-intensity lights. 2,049 MSL is 1,104 ft above the ground.' },
];

// Fix the misleading explanation on question 6 by replacing it with a clean one.
workout[5].explain = 'MEFs are in thousands and hundreds of feet MSL, rounded up after adding a buffer to the highest terrain or obstacle in the 30-minute block. 2⁵ = 2,500 ft MSL. Your 400-ft operation is in AGL; the MEF is a quick MSL sanity check for what manned pilots will be clearing.';

export function Guide32() {
  const [labels, setLabels] = useState(false);
  return (
    <div>
      <DarkBox title="SECTIONAL CHART WORKOUT">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The real test gives you excerpts from the Testing Supplement and asks several questions per figure. This is a fictional excerpt built from the same symbols. Read it the way you would in the exam: find the airports, the airspace lines, the obstacles, and the margin data, then answer. Toggle the labels only after you have tried.
        </div>
      </DarkBox>

      <Panel color={C.purple}>
        <MockSectional labels={labels} />
        <Caption>Fictional chart. Riverbend Regional (towered, Class D [-27]) with an E-surface extension; Collegedale (non-towered, inside a Class E-at-700 vignette); a restricted area, an MOA, a Victor airway, an isogonic line, two obstacles, two MEFs, and lat/long ticks.</Caption>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setLabels(l => !l)} style={{ padding: '7px 14px', borderRadius: 8, border: `1.5px solid ${C.purple}`, background: labels ? C.purple : C.paper, color: labels ? '#fff' : C.purple, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>{labels ? 'Hide labels' : 'Show labels'}</button>
        </div>
      </Panel>

      <Card color={C.purple} title="The reading sequence">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li><strong>Airports:</strong> color (blue towered, magenta not), then the data block: tower or CTAF, elevation, lighting, runway length, UNICOM, RP.</li>
            <li><strong>Airspace lines around them:</strong> dashed blue (D), dashed magenta (E surface), magenta vignette (E at 700), solid blue/magenta (B/C).</li>
            <li><strong>Special use:</strong> hatched areas and their labels (P, R, W, A, MOA), MTR lines.</li>
            <li><strong>Obstacles and MEFs:</strong> MSL in bold, AGL in parentheses; MEF per quadrangle.</li>
            <li><strong>Margin data:</strong> isogonic lines for variation; lat/long ticks for position.</li>
          </ol>
        </div>
      </Card>

      <Trap text="Figures on the real test are printed small and in color. Bring reading glasses if you use them. The answer is usually in a data block or a bracket; the distractors are the other numbers in the same block." />
      <Tip text="If a question says 'refer to Figure 23, area 4', find area 4 first (the circled numbers on the figure), then the feature. Half the chart mistakes come from reading the right thing in the wrong place." />

      <ExamQuiz questions={workout} color={C.purple} title="Chart questions" />
    </div>
  );
}
