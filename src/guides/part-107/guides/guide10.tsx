import { useState } from 'react';
import type { ReactElement } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Panel, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Sym { name: string; meaning: string; icon: ReactElement }

const BLUE = '#1565C0'; const MAG = '#C2185B';

const symbols: Sym[] = [
  { name: 'Towered airport', meaning: 'Blue. Hard-surfaced runways 1,500–8,069 ft are drawn as the runway layout. Control tower in operation at least part-time.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={14} fill="none" stroke={BLUE} strokeWidth={2} /><rect x={12} y={18} width={16} height={4} fill={BLUE} transform="rotate(-30 20 20)" /></svg> },
  { name: 'Non-towered airport', meaning: 'Magenta. Same runway symbology. No control tower; pilots self-announce on the CTAF.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={14} fill="none" stroke={MAG} strokeWidth={2} /><rect x={12} y={18} width={16} height={4} fill={MAG} transform="rotate(20 20 20)" /></svg> },
  { name: 'No hard runway', meaning: 'A plain circle: turf, gravel, or runways under 1,500 ft. Tick marks around the circle mean services (fuel) are available.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={10} fill="none" stroke={MAG} strokeWidth={2} />{[0, 90, 180, 270].map(a => <line key={a} x1={20} y1={6} x2={20} y2={10} stroke={MAG} strokeWidth={2} transform={`rotate(${a} 20 20)`} />)}</svg> },
  { name: 'Rotating beacon', meaning: 'A star on top of the airport symbol. The beacon normally runs from sunset to sunrise; running in daytime means weather is below VFR minimums.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={24} r={10} fill="none" stroke={BLUE} strokeWidth={2} /><polygon points="20,4 22,10 28,10 23,14 25,20 20,16 15,20 17,14 12,10 18,10" fill={BLUE} /></svg> },
  { name: 'Obstacle', meaning: 'A tower symbol. Bold number = top in feet MSL; (parentheses) = height AGL. Over 1,000 ft AGL gets a taller symbol. A lightning-bolt mark = high-intensity strobe. UC = under construction.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><polygon points="20,6 15,34 25,34" fill="none" stroke="#333" strokeWidth={1.5} /><line x1={13} y1={34} x2={27} y2={34} stroke="#333" strokeWidth={1.5} /><text x={28} y={16} fontSize={7} fill="#333" fontWeight={700}>1549</text><text x={28} y={24} fontSize={6} fill="#333">(449)</text></svg> },
  { name: 'Group obstacle', meaning: 'Two tower symbols joined: multiple obstacles close together. The height shown is the tallest.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><polygon points="14,8 10,34 18,34" fill="none" stroke="#333" strokeWidth={1.5} /><polygon points="26,12 22,34 30,34" fill="none" stroke="#333" strokeWidth={1.5} /></svg> },
  { name: 'Maximum Elevation Figure', meaning: 'Big number with a small superscript in each 30-minute quadrangle. 2⁵ = 2,500 ft MSL: the highest terrain or obstacle in the block plus a buffer, rounded up to the next hundred.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><text x={10} y={30} fontSize={22} fill="#333" fontWeight={700}>2</text><text x={24} y={18} fontSize={11} fill="#333" fontWeight={700}>5</text></svg> },
  { name: 'Class D', meaning: 'Dashed blue line around a towered airport. Ceiling in brackets, hundreds of feet MSL: [-27] = 2,700 MSL. The minus sign means “up to but not including” where D sits under B or C.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={15} fill="none" stroke={BLUE} strokeWidth={2} strokeDasharray="4,3" /><text x={20} y={23} fontSize={7} fill={BLUE} textAnchor="middle" fontWeight={700}>[-27]</text></svg> },
  { name: 'Class E to the surface', meaning: 'Dashed magenta line. Authorization required inside it. Often an extension lobe off a Class D circle protecting an instrument approach.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={15} fill="none" stroke={MAG} strokeWidth={2} strokeDasharray="4,3" /></svg> },
  { name: 'Class E at 700 ft', meaning: 'Shaded (vignette) magenta band: Class E begins 700 ft AGL on the inside of the shading. Outside it, 1,200 ft AGL. Either way you are in G at 400 ft.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><defs><radialGradient id="vig"><stop offset="55%" stopColor={MAG} stopOpacity={0} /><stop offset="100%" stopColor={MAG} stopOpacity={0.55} /></radialGradient></defs><circle cx={20} cy={20} r={17} fill="url(#vig)" /></svg> },
  { name: 'Class B / C', meaning: 'Solid blue (B) or solid magenta (C) lines with altitude pairs: 100/SFC, 70/30, 40/12. Top number is the ceiling, bottom the floor, both hundreds of feet MSL.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><circle cx={20} cy={20} r={16} fill="none" stroke={BLUE} strokeWidth={2.5} /><circle cx={20} cy={20} r={8} fill="none" stroke={MAG} strokeWidth={2.5} /></svg> },
  { name: 'Isogonic line', meaning: 'Dashed magenta line labeled with magnetic variation, e.g. 8°W. True to magnetic: add west, subtract east.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><line x1={8} y1={34} x2={32} y2={6} stroke={MAG} strokeWidth={1.5} strokeDasharray="5,3" /><text x={4} y={14} fontSize={7} fill={MAG} fontWeight={700}>8°W</text></svg> },
  { name: 'Victor airway', meaning: 'Light blue line labeled V-123 between VORs. A highway for manned aircraft from 1,200 ft AGL up to 18,000. Expect traffic along it.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><line x1={4} y1={30} x2={36} y2={10} stroke="#64B5F6" strokeWidth={3} /><text x={14} y={30} fontSize={7} fill={BLUE} fontWeight={700}>V-123</text></svg> },
  { name: 'Restricted / Prohibited', meaning: 'Blue hatched boundary labeled R-2501 or P-56. Details (altitudes, times, controlling agency) in the chart margin table.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><defs><pattern id="hb" width={4} height={4} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={4} stroke={BLUE} strokeWidth={1.5} /></pattern></defs><rect x={6} y={6} width={28} height={28} fill="url(#hb)" stroke={BLUE} strokeWidth={1.5} /></svg> },
  { name: 'MOA', meaning: 'Magenta hatched boundary. Military training; not prohibited, but fast traffic at low altitude.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><defs><pattern id="hm" width={4} height={4} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={4} stroke={MAG} strokeWidth={1.5} /></pattern></defs><rect x={6} y={6} width={28} height={28} fill="url(#hm)" stroke={MAG} strokeWidth={1.5} /></svg> },
  { name: 'Military Training Route', meaning: 'Gray line labeled IR or VR plus a number. Four digits = at or below 1,500 ft AGL; three digits = some segment above 1,500 ft.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><line x1={4} y1={28} x2={36} y2={12} stroke="#78909C" strokeWidth={2} /><text x={10} y={34} fontSize={7} fill="#455A64" fontWeight={700}>VR1234</text></svg> },
  { name: 'Parachute jumping', meaning: 'A small parachute symbol. Jumpers and their aircraft pass straight through sUAS altitudes. Details in the Chart Supplement.', icon: <svg viewBox="0 0 40 40" width={40} height={40}><path d="M8 18 Q20 2 32 18 Z" fill="none" stroke={MAG} strokeWidth={1.5} /><line x1={8} y1={18} x2={20} y2={32} stroke={MAG} strokeWidth={1} /><line x1={32} y1={18} x2={20} y2={32} stroke={MAG} strokeWidth={1} /></svg> },
];

interface Tok { t: string; m: string }
const towered: Tok[] = [
  { t: 'CHATTANOOGA (CHA)', m: 'Airport name and identifier. Blue text = towered.' },
  { t: 'CT - 118.3 *', m: 'Control tower frequency 118.3 MHz. The asterisk = part-time tower; hours in the Chart Supplement.' },
  { t: 'ATIS 124.1', m: 'Automatic Terminal Information Service: recorded weather and runway in use on 124.1.' },
  { t: '682', m: 'Field elevation, 682 ft MSL.' },
  { t: 'L', m: 'Runway lighting from sunset to sunrise. *L would mean lighting limitations (see Supplement).' },
  { t: '75', m: 'Longest runway in hundreds of feet: 7,500 ft.' },
  { t: '122.95', m: 'UNICOM frequency.' },
];
const nontowered: Tok[] = [
  { t: 'COLLEGEDALE (FGU)', m: 'Airport name and identifier. Magenta text = non-towered.' },
  { t: 'Ⓒ 122.8', m: 'The circled C marks the CTAF: 122.8 MHz. Monitor it to hear the pattern.' },
  { t: '860', m: 'Field elevation, 860 ft MSL.' },
  { t: '*L', m: 'Lighting available with limitations; the Supplement will say (often pilot-activated).' },
  { t: '51', m: 'Longest runway 5,100 ft.' },
  { t: 'RP 21', m: 'Right-hand traffic pattern for runway 21. Base and final will be on the opposite side from standard.' },
];

export function Guide10() {
  const [open, setOpen] = useState<number | null>(null);
  const [sample, setSample] = useState(0);
  const [tok, setTok] = useState<number | null>(null);
  const toks = sample === 0 ? towered : nontowered;
  return (
    <div>
      <DarkBox title="READING THE SECTIONAL">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          The VFR sectional is a 1:500,000 map revised every 56 days. The test hands you an excerpt from the Testing Supplement and asks what a symbol means, how tall a tower is, or what airspace an airport sits in. The legend below is the vocabulary.
        </div>
      </DarkBox>

      <Panel color={C.blue}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Symbol legend — tap any card</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
          {symbols.map((s, i) => {
            const isOpen = open === i;
            return (
              <button key={s.name} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{ textAlign: 'left', padding: 10, borderRadius: 10, border: `1.5px solid ${isOpen ? C.blue : C.line}`, background: isOpen ? '#E3F2FD' : C.paper, cursor: 'pointer', gridColumn: isOpen ? '1 / -1' : 'auto' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ flexShrink: 0, background: '#fff', borderRadius: 8, border: `1px solid ${C.line}` }}>{s.icon}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{s.name}</div>
                </div>
                {isOpen && <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, marginTop: 8 }}>{s.meaning}</div>}
              </button>
            );
          })}
        </div>
      </Panel>

      <Card color={C.blue} title="Airport data block decoder">
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {['Towered', 'Non-towered'].map((l, i) => (
              <button key={l} onClick={() => { setSample(i); setTok(null); }} style={{ padding: '5px 12px', borderRadius: 8, border: sample === i ? `2px solid ${C.blue}` : `1.5px solid ${C.line}`, background: sample === i ? C.blue : C.paper, color: sample === i ? '#fff' : C.muted, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, fontFamily: 'ui-monospace, Menlo, monospace', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {toks.map((k, i) => (
              <button key={k.t} onClick={() => setTok(tok === i ? null : i)} style={{ fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: sample === 0 ? BLUE : MAG, background: tok === i ? (sample === 0 ? '#E3F2FD' : '#FCE4EC') : 'transparent', border: `1px solid ${tok === i ? (sample === 0 ? BLUE : MAG) : 'transparent'}`, borderRadius: 6, padding: '2px 6px', cursor: 'pointer' }}>{k.t}</button>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: '#333', lineHeight: 1.5, minHeight: 36, padding: '8px 10px', background: C.sand, borderRadius: 8, border: `1px solid ${C.line}` }}>
            {tok === null ? 'Tap any element of the data block to decode it.' : toks[tok].m}
          </div>
        </div>
      </Card>

      <Trap text="Elevation vs runway length: in '682 L 75 122.95' the 682 is feet MSL and the 75 is HUNDREDS of feet (7,500). The test will ask for the runway length and offer 75 ft and 750 ft as distractors." />
      <Tip text="On a test figure, find the airport first, then read outward: is there a dashed blue circle (D)? A dashed magenta one (E surface)? Magenta shading nearby (E at 700)? Then look for the nearest MEF and the tallest obstacle. That sequence answers most chart questions." />

      <ExamQuiz questions={byTopic('sectional')} color={C.blue} />
    </div>
  );
}
