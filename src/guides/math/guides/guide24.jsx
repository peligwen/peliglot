import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide24(){return(<div>
  <DarkBox title="THE most important statistical concept"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Correlation</strong> = two things tend to happen together. <strong style={{color:"#EF9A9A"}}>Causation</strong> = one thing CAUSES the other. Ice cream sales and drowning deaths both go up in summer — but ice cream doesn't cause drowning. <strong style={{color:"#FFE77A"}}>Summer heat</strong> causes both.
  </div></DarkBox>
  <Card color="#E65100" title="Spurious correlations that are real data">
    {[{a:"Nicholas Cage movies",b:"swimming pool drownings",c:"Both happen to follow similar random trends"},
      {a:"Organic food sales",b:"autism diagnoses",c:"Both increased over time — as did internet usage, smartphone sales, etc."},
      {a:"Ice cream sales",b:"shark attacks",c:"Both increase in summer. The hidden variable: warm weather drives people to the beach AND to buy ice cream."},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,color:"#333"}}><strong style={{color:"#E65100"}}>{s.a}</strong> <span style={{color:"#ccc"}}>correlates with</span> <strong style={{color:"#E65100"}}>{s.b}</strong></div>
      <div style={{fontSize:11,color:"#888",marginTop:2}}>Why: {s.c}</div>
    </div>))}
  </Card>
  <Insight text="When you see 'X is linked to Y' in a headline, ask: is there a hidden third variable that causes BOTH? Is the sample size big enough? Was this an experiment or just observation? Most correlations aren't causation." />
</div>);}
