import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide8(){return(<div>
  <DarkBox title="The answer is a range, not a single number"><div style={{fontSize:14}}>
    "I need <strong style={{color:"#FFE77A"}}>at least</strong> $500" → x ≥ 500. The answer isn't one number — it's every number from 500 upward. Inequalities describe <strong style={{color:"#FFE77A"}}>conditions</strong>, not exact values.
  </div></DarkBox>
  <Card color="#2E7D32" title="Inequality symbols">
    {[{sym:">",name:"Greater than",ex:"x > 5 means x can be 6, 7, 100, but NOT 5"},
      {sym:"<",name:"Less than",ex:"x < 10 means x can be 9, 0, -3, but NOT 10"},
      {sym:"≥",name:"Greater than or equal to",ex:"x ≥ 18 means you must be 18 OR older"},
      {sym:"≤",name:"Less than or equal to",ex:"x ≤ 100 means up to and including 100"},
    ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:28,fontWeight:800,color:"#2E7D32",fontFamily:"monospace",minWidth:36,textAlign:"center"}}>{s.sym}</span>
      <div><span style={{fontWeight:700,color:"#333"}}>{s.name}</span><br/><span style={{fontSize:12,color:"#888"}}>{s.ex}</span></div>
    </div>))}
  </Card>
  <Insight text="Real-world inequalities: speed limits (v ≤ 65), minimum wage (pay ≥ $7.25), credit scores (score ≥ 700 for best rates), cooking temperatures (internal temp ≥ 165°F for chicken)." />
</div>);}
