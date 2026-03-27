import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide31(){return(<div>
  <DarkBox title="The power of back-of-envelope math"><div style={{fontSize:14}}>
    A <strong style={{color:"#FFE77A"}}>Fermi estimate</strong> breaks impossible-seeming questions into smaller pieces you CAN estimate. You don't need the exact answer — being within 10× is often good enough.
  </div></DarkBox>
  <Card color="#1565C0" title="Example: How many piano tuners in Chicago?">
    {[{step:"Population of Chicago",est:"~3 million people"},
      {step:"People per household",est:"~2.5 → ~1.2M households"},
      {step:"% with pianos",est:"~5% → ~60,000 pianos"},
      {step:"Tunings per year",est:"~1-2 → ~90,000 tunings/year"},
      {step:"Tunings per tuner per day",est:"~4 → ~1,000 per tuner/year"},
      {step:"Piano tuners needed",est:"90,000 / 1,000 = ~90 tuners"},
    ].map((s,i)=>(<div key={i} style={{padding:"6px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
      <span style={{fontSize:12,fontWeight:700,color:"#1565C0"}}>{s.step}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{s.est}</span>
    </div>))}
  </Card>
  <Insight text="The real answer is about 80-100. Fermi estimates don't give exact numbers — they give you the right ORDER OF MAGNITUDE, which is often all you need to make a decision." />
</div>);}
