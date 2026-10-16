import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { C, KeyNumbers, Tip, Trap, Mnemonic, DataTable, Slider, Panel, Caption, ExamQuiz } from './_helpers';
import { byTopic } from '../questions';

interface Item { name: string; w: number; arm: number }

const FWD = 5.5; const AFT = 7.0; // manufacturer CG envelope, inches from datum (fictional)

export function Guide22() {
  const [items, setItems] = useState<Item[]>([
    { name: 'Airframe', w: 3.0, arm: 6.2 },
    { name: 'Battery', w: 1.4, arm: 7.4 },
    { name: 'Camera / gimbal', w: 0.8, arm: 4.0 },
    { name: 'Extra payload', w: 0.0, arm: 8.5 },
  ]);
  const set = (i: number, k: 'w' | 'arm', v: number) => setItems(it => it.map((x, j) => j === i ? { ...x, [k]: v } : x));
  const tw = items.reduce((s, x) => s + x.w, 0);
  const tm = items.reduce((s, x) => s + x.w * x.arm, 0);
  const cg = tw > 0 ? tm / tw : 0;
  const inLimits = cg >= FWD && cg <= AFT;
  const x = (inch: number) => 30 + inch * 26; // svg px per inch
  return (
    <div>
      <DarkBox title="WEIGHT, BALANCE & CENTER OF GRAVITY">
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Every object on the aircraft has a weight and a distance from a reference line (the <strong>arm</strong>). Weight times arm is a <strong>moment</strong>. Add the moments, divide by the total weight, and you have the <strong>center of gravity</strong>. The test gives you two or three items and asks for the CG, or asks what happens when the CG is out of limits.
        </div>
      </DarkBox>

      <KeyNumbers color={C.orange} items={[
        { label: 'moment', value: 'W × arm', note: 'lb-in (or any weight × distance)' },
        { label: 'center of gravity', value: 'Σ moment ÷ Σ W', note: 'measured from the datum' },
        { label: 'datum', value: 'reference', note: 'an imaginary line the manufacturer picks' },
      ]} />

      <Panel color={C.orange}>
        <div style={{ fontSize: 12, fontWeight: 800, color: C.orange, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>CG calculator (fictional quadcopter, inches from the nose datum)</div>
        {items.map((it, i) => (
          <div key={it.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px', padding: '6px 0', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
            <div style={{ gridColumn: '1 / -1', fontSize: 12.5, fontWeight: 800, color: C.ink }}>{it.name} <span style={{ color: C.muted, fontWeight: 600 }}>moment {(it.w * it.arm).toFixed(1)} lb-in</span></div>
            <Slider label="Weight" value={it.w} min={0} max={4} step={0.1} onChange={v => set(i, 'w', v)} color={C.orange} format={v => `${v.toFixed(1)} lb`} />
            <Slider label="Arm" value={it.arm} min={0} max={10} step={0.1} onChange={v => set(i, 'arm', v)} color={C.orange} format={v => `${v.toFixed(1)} in`} />
          </div>
        ))}
        <svg viewBox="0 0 320 70" width="100%" style={{ maxWidth: 420, display: 'block', margin: '8px auto 0' }} role="img" aria-label="Balance beam showing CG position against limits">
          <line x1={30} y1={40} x2={290} y2={40} stroke="#333" strokeWidth={2} />
          <rect x={x(FWD)} y={30} width={x(AFT) - x(FWD)} height={20} fill="#C8E6C9" stroke="#2E7D32" />
          <text x={(x(FWD) + x(AFT)) / 2} y={64} fontSize={9} fill="#2E7D32" textAnchor="middle">CG limits {FWD}–{AFT} in</text>
          <line x1={30} y1={20} x2={30} y2={58} stroke="#333" strokeDasharray="3,2" /><text x={30} y={14} fontSize={9} fill="#333" textAnchor="middle">datum</text>
          {[2, 4, 6, 8, 10].map(i => <g key={i}><line x1={x(i)} y1={40} x2={x(i)} y2={46} stroke="#333" /><text x={x(i)} y={56} fontSize={8} fill="#666" textAnchor="middle">{i}</text></g>)}
          <polygon points={`${x(Math.min(10, Math.max(0, cg)))},40 ${x(Math.min(10, Math.max(0, cg))) - 8},22 ${x(Math.min(10, Math.max(0, cg))) + 8},22`} fill={inLimits ? C.green : C.red} />
        </svg>
        <Caption>Total weight {tw.toFixed(1)} lb · total moment {tm.toFixed(1)} lb-in · <strong style={{ color: inLimits ? C.green : C.red }}>CG {cg.toFixed(2)} in {inLimits ? '(within limits)' : cg < FWD ? '(too far forward)' : '(too far aft)'}</strong></Caption>
      </Panel>

      <Mnemonic text="Worked example: 3 lb at 4 in and 1 lb at 12 in. Moments 12 + 12 = 24. Weight 4. CG = 24 ÷ 4 = 6 in. The test's numbers are always this friendly." />

      <DataTable color={C.orange} head={['CG position', 'Fixed-wing effect', 'Multirotor effect']} rows={[
        ['Forward of limit', 'Nose-heavy, very stable, higher stall speed, more drag, may lack elevator authority to flare.', 'Front motors work harder; nose-down drift in hover; reduced endurance.'],
        ['Within limits', 'Designed handling and stall behavior.', 'All motors share the load evenly; best endurance and control margin.'],
        ['Aft of limit', 'Unstable, pitches up, lower stall speed, but recovery from a stall or spin may be impossible. The dangerous one.', 'Rear motors saturate first; the aircraft can flip in an aggressive stop or a gust.'],
      ]} />

      <Card color={C.orange} title="Weight, the other half">
        <div style={{ padding: '12px 14px', fontSize: 13, color: '#333', lineHeight: 1.6 }}>
          More weight means more lift needed, so more power, more current, and less flight time. For a fixed-wing it also means a higher stall speed and a longer takeoff. For any aircraft it means every G of load factor is more absolute load on the structure. The manufacturer’s maximum takeoff weight includes payload and is almost always far below the regulatory 55 lb.
        </div>
      </Card>

      <Trap text="'Which CG condition is most dangerous?' Aft. A forward CG is annoying and inefficient; an aft CG can be unrecoverable. The test contrasts them directly." />
      <Tip text="Mount payloads as close to the aircraft's designed CG as possible and re-check hover behavior after any change. A drone that drifts in a calm hover is telling you about its balance." />

      <ExamQuiz questions={byTopic('weight-balance')} color={C.orange} />
    </div>
  );
}
