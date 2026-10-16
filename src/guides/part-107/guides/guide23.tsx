import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, Tip, Trap, Mnemonic, DataTable, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

export function Guide23() {
  const [bank, setBank] = useState(45);
  const [vs, setVs] = useState(40);
  const rad = (bank * Math.PI) / 180;
  const lf = 1 / Math.cos(rad);
  const vsNew = vs * Math.sqrt(lf);
  const lifty = 60 * lf;
  return (
    <div>
      <DarkBox title="LOAD FACTOR & MANEUVERING">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          In a level turn the wings (or rotors) have to hold the aircraft up <em>and</em> pull it around the corner, so they produce more lift than the aircraft weighs. The ratio is the <strong>load factor</strong>, in Gs. It rises slowly at first, then explodes past 60° of bank. Stall speed rises with its square root.
        </div>
      </DarkBox>

      <Panel color={C.orange}>
        <Slider label="Bank angle in a level turn" value={bank} min={0} max={80} step={1} onChange={setBank} color={C.orange} format={v => `${v}°`} />
        <Slider label="Wings-level stall speed (fixed-wing)" value={vs} min={15} max={80} step={1} onChange={setVs} color={C.orange} format={v => `${v} kt`} />
        <svg viewBox="0 0 320 170" width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', background: '#f7fbff', borderRadius: 10, border: `1px solid ${C.line}` }} role="img" aria-label="Banked aircraft with lift vector">
          <defs><marker id="lfhead" markerWidth={6} markerHeight={6} refX={3} refY={3} orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.orange} /></marker><marker id="whead" markerWidth={6} markerHeight={6} refX={3} refY={3} orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#333" /></marker></defs>
          <line x1={20} y1={150} x2={300} y2={150} stroke="#999" strokeDasharray="3,3" />
          <g transform={`rotate(${-bank} 110 110)`}>
            <rect x={60} y={106} width={100} height={8} rx={3} fill="#546E7A" />
            <line x1={110} y1={106} x2={110} y2={Math.max(10, 106 - lifty)} stroke={C.orange} strokeWidth={3} markerEnd="url(#lfhead)" />
          </g>
          <line x1={110} y1={118} x2={110} y2={160} stroke="#333" strokeWidth={2} markerEnd="url(#whead)" />
          <text x={118} y={160} fontSize={9} fill="#333">weight (1 G)</text>
          <text x={200} y={30} fontSize={12} fill={C.orange} fontWeight={800}>lift = {lf.toFixed(2)} × weight</text>
          <text x={200} y={46} fontSize={10} fill="#333">load factor {lf.toFixed(2)} G</text>
          <text x={200} y={62} fontSize={10} fill="#333">stall speed × {Math.sqrt(lf).toFixed(2)}</text>
          <text x={200} y={78} fontSize={10} fill={C.red} fontWeight={700}>stalls at {vsNew.toFixed(0)} kt</text>
        </svg>
        <Caption>Load factor = 1 ÷ cos(bank). At {bank}° the structure carries {lf.toFixed(2)} times the aircraft’s weight. {bank >= 60 ? 'Past 60° the curve goes nearly vertical.' : ''}</Caption>
      </Panel>

      <DataTable color={C.orange} head={['Bank', 'Load factor', 'Stall speed multiplier']} rows={[
        ['0°', '1.00 G', '× 1.00'],
        ['30°', '1.15 G', '× 1.07'],
        ['45°', '1.41 G', '× 1.19'],
        ['60°', '2.00 G', '× 1.41'],
        ['70°', '2.92 G', '× 1.71'],
        ['75°', '3.86 G', '× 1.97'],
      ]} />

      <Mnemonic text="60 degrees = 2 Gs = stall speed up 41%. If you remember one row of the table, remember that one. The test supplement includes a load-factor chart (Figure 2) that says the same thing as a curve." />

      <Card color={C.orange} title="Stalls, for fixed-wing pilots">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          A wing stalls when it exceeds its <strong>critical angle of attack</strong>, not at a particular airspeed. The published stall speed is only true at 1 G. Load the wing up in a steep turn or a sharp pull-up and the critical angle arrives at a much higher speed. That is why a fast, tight turn close to the ground is the classic fixed-wing UA loss-of-control accident.
        </div>
      </Card>

      <Card color={C.orange} title="And for multirotor pilots">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          A quadcopter does not stall, but every abrupt stop, hard bank, and vertical gust is a momentary high load factor that the motors must supply as thrust. At high gross weight or high density altitude a motor can hit 100% and the flight controller runs out of authority: the aircraft tips, drops, or both. Turbulence does the same thing without your help. Weight, density altitude, and aggressiveness multiply together.
        </div>
      </Card>

      <Trap text="Load factor is a ratio (lift ÷ weight), not a weight. '2 Gs' means twice the aircraft's weight, whatever that weight is. A question asking for the load factor at 60° wants '2', not a number of pounds." />
      <Tip text="The manufacturer's limits (max wind, max bank, max speed, max weight) are the Part 107 equivalent of a manned aircraft's V-speeds. The regulation says fly within them; the physics says why." />

      <ExamQuiz questions={byTopic('load-factor')} color={C.orange} />
    </div>
  );
}
