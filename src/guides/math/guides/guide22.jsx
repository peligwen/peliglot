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
</div>);}
