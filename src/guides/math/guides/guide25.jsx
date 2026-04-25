import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide25(){return(<div>
  <DarkBox title="Why '99% accurate' doesn't mean what you think"><div style={{fontSize:14}}>
    A disease affects 1 in 1,000 people. A test is 99% accurate. You test positive. What's the probability you actually have it? Most people say 99%. The real answer: <strong style={{color:"#EF9A9A"}}>about 9%</strong>.
  </div></DarkBox>
  <Card color="#6A1B9A" title="The math (Bayes' theorem, intuitively)">
    {[{step:"Start with 10,000 people",desc:"10 actually have the disease (1 in 1,000). 9,990 don't."},
      {step:"Test the 10 who have it",desc:"99% sensitivity → 10 test positive (true positives), 0 missed."},
      {step:"Test the 9,990 who don't",desc:"99% specificity → ~100 test positive BY MISTAKE (false positives)."},
      {step:"Count the positives",desc:"110 total positives. But only 10 actually have the disease."},
      {step:"Your probability",desc:"10 out of 110 = 9.1%. NOT 99%."},
    ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
      <span style={{background:"#6A1B9A",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:11,fontWeight:700}}>{i+1}</span> <span style={{fontWeight:700,color:"#333",marginLeft:6}}>{s.step}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Insight text="This example assumes the test catches 99% of real cases (sensitivity = 99%) AND wrongly flags only 1% of healthy people (specificity = 99%). Real tests usually have different numbers for each — always ask your doctor for both." />
  <Insight text="This is why doctors don't diagnose from a single test. The rarer the condition, the more false positives dominate. Always ask for confirmation testing." />
  <ExpandSection title="The formal Bayes' formula" color="#6A1B9A">
    <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px"}}>
      <div style={{fontSize:11,color:"#555",marginBottom:10}}>The intuitive counting approach above is exactly Bayes' theorem. Here's the algebraic version so you can apply it to new scenarios.</div>
      <div style={{background:"#EDE7F6",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:10,color:"#888",marginBottom:4}}>Conditional probability</div>
        <div style={{fontFamily:"monospace",fontSize:14,fontWeight:800,color:"#6A1B9A"}}>P(A | B) = P(A ∩ B) / P(B)</div>
        <div style={{fontSize:10,color:"#aaa",marginTop:2}}>"Probability of A given B" = how often both happen ÷ how often B happens</div>
      </div>
      <div style={{background:"#EDE7F6",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:10,color:"#888",marginBottom:4}}>Bayes' theorem (full form)</div>
        <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:"#6A1B9A"}}>P(Disease | Positive) =</div>
        <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:"#6A1B9A",marginTop:2,marginLeft:8}}>P(Positive | Disease) × P(Disease)</div>
        <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:"#6A1B9A",marginLeft:8}}>────────────────────────────────</div>
        <div style={{fontFamily:"monospace",fontSize:12,fontWeight:800,color:"#6A1B9A",marginLeft:8}}>P(Positive)</div>
        <div style={{fontSize:10,color:"#aaa",marginTop:4}}>P(Positive) = P(+|Disease)×P(Disease) + P(+|Healthy)×P(Healthy)</div>
      </div>
      <div style={{fontSize:11,color:"#555",marginBottom:4}}>Plugging in our numbers:</div>
      {[
        {label:"P(+|Disease) = sensitivity",val:"0.99"},
        {label:"P(Disease) = prevalence",val:"0.001"},
        {label:"P(+|Healthy) = false positive rate",val:"0.01"},
        {label:"P(Healthy)",val:"0.999"},
        {label:"P(Positive) = (0.99×0.001) + (0.01×0.999)",val:"= 0.00099 + 0.00999 = 0.01098"},
        {label:"P(Disease | Positive)",val:"0.00099 / 0.01098 ≈ 9.0%"},
      ].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto",fontSize:11,padding:"3px 0",borderBottom:i<5?"1px solid #f5f3ef":"none"}}>
        <span style={{color:"#888"}}>{r.label}</span><span style={{fontWeight:700,color:"#6A1B9A"}}>{r.val}</span>
      </div>))}
    </div>
  </ExpandSection>
</div>);}
