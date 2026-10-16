import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, Tabs, DataTable, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Cls { name: string; color: string; where: string; chart: string; auth: string; shape: string }

const classes: Cls[] = [
  { name: 'A', color: '#546E7A', where: '18,000 ft MSL to FL600, everywhere.', chart: 'Not depicted.', auth: 'Irrelevant to sUAS; IFR only.', shape: 'A ceiling band over the whole country.' },
  { name: 'B', color: '#1565C0', where: 'Surface to about 10,000 ft MSL around the busiest airports (ATL, LAX, ORD…). Several tiers, each with its own floor.', chart: 'Solid blue lines. Altitudes as 100/SFC (ceiling 10,000 MSL, floor surface) or 100/30 (floor 3,000 MSL).', auth: 'Required — LAANC or DroneZone.', shape: 'An upside-down wedding cake.' },
  { name: 'C', color: '#AD1457', where: 'Surface to 4,000 ft above the airport in a 5 NM core; a 10 NM shelf from 1,200 ft to 4,000 ft above the airport.', chart: 'Solid magenta lines. 40/SFC in the core, 40/12 on the shelf.', auth: 'Required when the Class C reaches the surface where you are. Under the shelf, at 400 ft AGL, you are below it.', shape: 'A two-tier cake.' },
  { name: 'D', color: '#1976D2', where: 'Surface to about 2,500 ft above the airport, roughly 4 NM radius, at airports with a control tower.', chart: 'Dashed blue line. Ceiling in brackets, hundreds of feet MSL: [-27] = 2,700 MSL.', auth: 'Required while the tower is open. When it closes, the Chart Supplement says whether it becomes E or G.', shape: 'A cylinder.' },
  { name: 'E', color: '#8E24AA', where: 'Controlled airspace that is not A, B, C, or D. Starts at the surface (around some airports), 700 ft AGL (near many airports), 1,200 ft AGL (most places), or 14,500 ft MSL (some mountain areas). Ends at 18,000 ft.', chart: 'Dashed magenta = starts at the surface. Shaded magenta vignette = starts at 700 ft AGL inside the shading. Elsewhere, 1,200 ft AGL. Blue vignette or zipper lines mark other floors.', auth: 'Required ONLY for Class E surface areas (dashed magenta). E at 700 or 1,200 ft is above you.', shape: 'Everything controlled that is left over.' },
  { name: 'G', color: '#2E7D32', where: 'From the surface up to the floor of the overlying Class E: 700 ft, 1,200 ft, or occasionally 14,500 ft MSL.', chart: 'Not drawn; it is the absence of everything else.', auth: 'None. All other Part 107 rules still apply, including not interfering with airport traffic.', shape: 'The ground layer where most sUAS flying happens.' },
];

function Profile({ sel }: { sel: number }) {
  const on = (i: number) => sel === i;
  const dim = (i: number) => (sel === -1 || on(i) ? 1 : 0.35);
  return (
    <svg viewBox="0 0 380 230" width="100%" style={{ maxWidth: 520, display: 'block', margin: '0 auto', background: '#f7fbff', borderRadius: 12, border: `1px solid ${C.line}` }} role="img" aria-label="Side view of airspace classes, not to scale">
      {/* Class A band */}
      <rect x={0} y={8} width={380} height={28} fill="#546E7A" opacity={0.18 * dim(0) + 0.05} />
      <text x={6} y={26} fontSize={10} fill="#37474F" fontWeight={700} opacity={dim(0)}>Class A — 18,000 ft MSL and up</text>
      {/* Class E background */}
      <rect x={0} y={36} width={380} height={146} fill="#8E24AA" opacity={0.08 * dim(4) + 0.02} />
      <text x={6} y={52} fontSize={10} fill="#6A1B9A" fontWeight={700} opacity={dim(4)}>Class E — from 700 / 1,200 ft AGL up to 18,000</text>
      {/* E floor lines */}
      <line x1={0} y1={182} x2={380} y2={182} stroke="#8E24AA" strokeDasharray="2,2" opacity={dim(4)} />
      <text x={100} y={178} fontSize={8} fill="#6A1B9A" opacity={dim(4)}>E floor 1,200 ft AGL</text>
      {/* Class G ground layer */}
      <rect x={0} y={182} width={380} height={26} fill="#2E7D32" opacity={0.12 * dim(5) + 0.03} />
      <text x={6} y={193} fontSize={10} fill="#1B5E20" fontWeight={700} opacity={dim(5)}>Class G</text>
      {/* 400 ft line */}
      <line x1={0} y1={200} x2={380} y2={200} stroke="#2E7D32" strokeWidth={1.2} strokeDasharray="5,3" />
      <text x={100} y={206} fontSize={7.5} fill="#1B5E20" fontWeight={700}>400 ft AGL</text>
      {/* ground */}
      <rect x={0} y={208} width={380} height={22} fill="#D7CCC8" />
      <text x={6} y={223} fontSize={9} fill="#5D4037">ground</text>
      {/* Class B wedding cake */}
      <g opacity={dim(1)}>
        <rect x={20} y={70} width={120} height={40} fill="#1565C0" fillOpacity={0.18} stroke="#1565C0" strokeWidth={1.2} />
        <rect x={45} y={110} width={70} height={45} fill="#1565C0" fillOpacity={0.18} stroke="#1565C0" strokeWidth={1.2} />
        <rect x={66} y={155} width={28} height={53} fill="#1565C0" fillOpacity={0.18} stroke="#1565C0" strokeWidth={1.2} />
        <text x={80} y={64} fontSize={10} fill="#0D47A1" fontWeight={800} textAnchor="middle">Class B</text>
        <text x={80} y={88} fontSize={8} fill="#0D47A1" textAnchor="middle">to 10,000 MSL</text>
      </g>
      {/* Class C */}
      <g opacity={dim(2)}>
        <rect x={160} y={150} width={100} height={32} fill="#AD1457" fillOpacity={0.15} stroke="#AD1457" strokeWidth={1.2} />
        <rect x={190} y={150} width={40} height={58} fill="#AD1457" fillOpacity={0.2} stroke="#AD1457" strokeWidth={1.2} />
        <text x={210} y={144} fontSize={10} fill="#880E4F" fontWeight={800} textAnchor="middle">Class C</text>
        <text x={210} y={196} fontSize={7} fill="#880E4F" textAnchor="middle">5 NM core</text>
        <text x={163} y={165} fontSize={7} fill="#880E4F">shelf</text>
        <text x={163} y={174} fontSize={6} fill="#880E4F">1,200 ft up</text>
      </g>
      {/* Class D */}
      <g opacity={dim(3)}>
        <rect x={300} y={160} width={34} height={48} fill="#1976D2" fillOpacity={0.15} stroke="#1976D2" strokeWidth={1.2} strokeDasharray="4,3" />
        <text x={317} y={154} fontSize={10} fill="#0D47A1" fontWeight={800} textAnchor="middle">Class D</text>
        <text x={317} y={175} fontSize={7} fill="#0D47A1" textAnchor="middle">2,500 ft</text>
      </g>
      {/* E surface area near D */}
      <g opacity={dim(4)}>
        <rect x={334} y={182} width={30} height={26} fill="#8E24AA" fillOpacity={0.15} stroke="#8E24AA" strokeWidth={1} strokeDasharray="3,2" />
        <text x={349} y={194} fontSize={6} fill="#6A1B9A" textAnchor="middle">E sfc</text>
      </g>
    </svg>
  );
}

export function Guide9() {
  const [t, setT] = useState(5);
  const c = classes[t];
  return (
    <div>
      <DarkBox title="AIRSPACE CLASSES">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Six letters, one question underneath all of them: <strong>does this airspace reach down to where I am flying, and if so, do I need permission?</strong> Under Part 107 you need ATC authorization in B, C, D, and Class E surface areas. Nothing else.
        </div>
      </DarkBox>

      <Tabs tabs={classes.map(x => 'Class ' + x.name)} active={t} onChange={setT} color={c.color} />
      <Profile sel={t} />
      <Caption>Side view, not to scale. The green dashed line is your 400-ft world. Notice how much of it is Class G.</Caption>

      <Card color={c.color} title={`Class ${c.name}`}>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 24%) 1fr', gap: '8px 10px', fontSize: 12.5, lineHeight: 1.5, color: '#333' }}>
            <div style={{ fontWeight: 700, color: C.muted }}>Where</div><div>{c.where}</div>
            <div style={{ fontWeight: 700, color: C.muted }}>On the chart</div><div>{c.chart}</div>
            <div style={{ fontWeight: 700, color: C.muted }}>sUAS authorization</div><div style={{ fontWeight: 700, color: c.color }}>{c.auth}</div>
            <div style={{ fontWeight: 700, color: C.muted }}>Shape</div><div>{c.shape}</div>
          </div>
        </div>
      </Card>

      <DataTable color={C.blue} head={['Class', 'Typical vertical limits', 'Chart line', 'sUAS needs']} rows={[
        ['B', 'SFC – 10,000 MSL', 'Solid blue', 'Authorization'],
        ['C', 'SFC – 4,000 above airport (shelf from 1,200)', 'Solid magenta', 'Authorization (where it reaches the surface)'],
        ['D', 'SFC – 2,500 above airport', 'Dashed blue', 'Authorization (tower open)'],
        ['E surface', 'SFC up', 'Dashed magenta', 'Authorization'],
        ['E at 700 / 1,200', '700 or 1,200 AGL up to 18,000', 'Magenta vignette / none', 'Nothing — you are below it'],
        ['G', 'SFC to floor of E', 'None', 'Nothing'],
      ]} />

      <Mnemonic text="Blue is towered, magenta is not. Solid means it starts at the surface, dashed means it starts at the surface too but is smaller (D or E-surface), faded means it starts 700 ft up. If it is faded or invisible, you are in G." />
      <Trap text="'Controlled airspace' and 'needs authorization' are not synonyms. Class E at 1,200 ft AGL is controlled airspace, and a drone at 300 ft under it needs nothing. The test will offer 'all controlled airspace' as a wrong answer." />
      <Tip text="Class C shelves: the 10 NM outer ring starts at 1,200 ft above the airport. At 400 ft AGL you are under the shelf, in Class E or G, and need no Class C authorization. Only the 5 NM core reaches the ground." />

      <ExamQuiz questions={byTopic('airspace-classes')} color={C.blue} />
    </div>
  );
}
