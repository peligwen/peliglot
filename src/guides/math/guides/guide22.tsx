import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide22(){return(<div>
  <DarkBox title="How spread out is the data?"><div style={{fontSize:14}}>
    Two classes can have the same average test score but very different <strong style={{color:"#FFE77A"}}>spreads</strong>. In one class everyone scored 75-85. In the other, scores ranged from 30-100. The spread tells you how consistent the data is.
  </div></DarkBox>
  <Card color="#1565C0" title="The bell curve (normal distribution)">
    {[{range:"Within 1 standard deviation",pct:"68%",desc:"Most data falls here. The 'typical' range."},
      {range:"Within 2 standard deviations",pct:"95%",desc:"Almost everything. This is what 'normal' means statistically."},
      {range:"Within 3 standard deviations",pct:"99.7%",desc:"Virtually all data. Anything beyond 3 SD is extremely rare."},
    ].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 60px 1fr",padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none",alignItems:"center"}}>
      <span style={{fontSize:13,fontWeight:600,color:"#333"}}>{r.range}</span>
      <span style={{fontSize:18,fontWeight:800,color:"#1565C0",textAlign:"center"}}>{r.pct}</span>
      <span style={{fontSize:11,color:"#888"}}>{r.desc}</span>
    </div>))}
  </Card>
  <Insight text="IQ scores: mean=100, SD=15. 'Within 2 SD' = 70-130, which covers 95% of people. A score of 145 is 3 SD above the mean — that's the top 0.15%. Standard deviation tells you HOW unusual something is." />
  <div style={{background:"#fff",borderRadius:12,border:"1px solid #e0dcd5",padding:"12px 14px",marginTop:8}}>
    <div style={{fontWeight:700,color:"#1565C0",fontSize:13,marginBottom:6}}>How to compute standard deviation</div>
    <div style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#333",marginBottom:6}}>σ = √( Σ(xᵢ − x̄)² / n )</div>
    <div style={{fontSize:11,color:"#555",marginBottom:8}}>Step by step with test scores [70, 75, 80, 85, 90]:</div>
    {[
      {step:"Mean (x̄)", val:"(70+75+80+85+90)/5 = 80"},
      {step:"Deviations from mean", val:"−10, −5, 0, +5, +10"},
      {step:"Squared deviations", val:"100, 25, 0, 25, 100"},
      {step:"Average squared deviation", val:"(100+25+0+25+100)/5 = 50"},
      {step:"σ = √50", val:"≈ 7.07"},
    ].map((s,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"140px 1fr",fontSize:11,padding:"3px 0",borderBottom:i<4?"1px solid #f5f3ef":"none"}}>
      <span style={{color:"#888"}}>{s.step}</span><span style={{fontWeight:600,color:"#1565C0"}}>{s.val}</span>
    </div>))}
  </div>
</div>);}
