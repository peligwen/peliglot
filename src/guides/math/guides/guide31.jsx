import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

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
  <Insight text="Estimates of the real count range from 50 to 200+ depending on how you define 'active tuner.' That spread doesn't matter — Fermi estimates don't give exact numbers, they give you the right ORDER OF MAGNITUDE. Being within 10× is often all you need to make a decision." />
  <ExpandSection title="Try another: How many gallons of gas does the U.S. burn per day?" color="#1565C0">
    <Card color="#2E7D32" title="U.S. daily gasoline consumption">
      {[{step:"U.S. population",est:"~340 million people"},
        {step:"Adults who drive",est:"~60% → ~200 million drivers"},
        {step:"Miles driven per day per driver",est:"~30 miles (mix of commuters and non-drivers)"},
        {step:"Miles per gallon",est:"~25 mpg (average car)"},
        {step:"Gallons per driver per day",est:"30 ÷ 25 = 1.2 gallons"},
        {step:"Total daily consumption",est:"200M × 1.2 = ~240 million gallons/day"},
      ].map((s,i)=>(<div key={i} style={{padding:"6px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#2E7D32"}}>{s.step}</span><br/>
        <span style={{fontSize:12,color:"#555"}}>{s.est}</span>
      </div>))}
    </Card>
    <Insight text="The EIA reports ~360 million gallons/day (2023). Our estimate of ~240M is within 2× — right order of magnitude! The same decompose-and-multiply technique works on any big question." />
  </ExpandSection>
</div>);}
