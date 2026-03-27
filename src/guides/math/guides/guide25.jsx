import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide25(){return(<div>
  <DarkBox title="Why '99% accurate' doesn't mean what you think"><div style={{fontSize:14}}>
    A disease affects 1 in 1,000 people. A test is 99% accurate. You test positive. What's the probability you actually have it? Most people say 99%. The real answer: <strong style={{color:"#EF9A9A"}}>about 9%</strong>.
  </div></DarkBox>
  <Card color="#6A1B9A" title="The math (Bayes' theorem, intuitively)">
    {[{step:"Start with 10,000 people",desc:"10 actually have the disease (1 in 1,000). 9,990 don't."},
      {step:"Test the 10 who have it",desc:"99% accuracy → 10 test positive (true positives), 0 missed."},
      {step:"Test the 9,990 who don't",desc:"99% accuracy → 100 test positive BY MISTAKE (false positives)."},
      {step:"Count the positives",desc:"110 total positives. But only 10 actually have the disease."},
      {step:"Your probability",desc:"10 out of 110 = 9.1%. NOT 99%."},
    ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
      <span style={{background:"#6A1B9A",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:11,fontWeight:700}}>{i+1}</span> <span style={{fontWeight:700,color:"#333",marginLeft:6}}>{s.step}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Insight text="This is why doctors don't diagnose from a single test. The rarer the condition, the more false positives dominate. Always ask for confirmation testing." />
</div>);}
