import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide19(){return(<div>
  <DarkBox title="Patterns that repeat or accumulate"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Arithmetic sequence</strong>: add the same amount each time (2, 5, 8, 11...). <strong style={{color:"#FFE77A"}}>Geometric sequence</strong>: multiply by the same amount each time (2, 6, 18, 54...).
  </div></DarkBox>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#E65100" title="Arithmetic (+3 each time)">
      <div style={{display:"flex",gap:4,padding:"10px 14px",flexWrap:"wrap"}}>
        {[2,5,8,11,14,17,20,23].map(n=>(<span key={n} style={{width:32,height:32,borderRadius:6,background:"#FFF3E0",color:"#E65100",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700}}>{n}</span>))}
      </div>
    </Card>
    <Card color="#6A1B9A" title="Geometric (×3 each time)">
      <div style={{display:"flex",gap:4,padding:"10px 14px",flexWrap:"wrap"}}>
        {[2,6,18,54,162,486].map(n=>(<span key={n} style={{padding:"4px 6px",borderRadius:6,background:"#EDE7F6",color:"#6A1B9A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700}}>{n}</span>))}
      </div>
    </Card>
  </div>
  <Insight text="A sequence is a list of terms in order. A series is what you get when you add them up. Sequence: 2, 5, 8, 11, … Series: 2 + 5 + 8 + 11 + … = total saved over 4 months." />
  <Insight text="Savings plan = arithmetic series (save $500/month for 12 months = $6,000). Investment growth = geometric series (compound returns multiply). Understanding which pattern applies tells you what to expect." />
  <ExpandSection title="Closed-form sum formulas" color="#E65100">
    <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px"}}>
      {[
        {name:"Arithmetic series (n terms)", formula:"Sₙ = n × (a₁ + aₙ) / 2", note:"Average the first and last term, multiply by count. Save $500/mo for 12 mo = 12 × ($500 + $500) / 2 = $6,000."},
        {name:"Finite geometric series", formula:"Sₙ = a × (1 − rⁿ) / (1 − r)", note:"Valid when r ≠ 1. Useful for counting total investment growth over n periods."},
        {name:"Infinite geometric series", formula:"S = a / (1 − r), when |r| < 1", note:"When |r| < 1 the terms shrink to zero and the sum converges. This is also why 0.999… = 1: 0.9 + 0.09 + 0.009 + … = 0.9 / (1 − 0.1) = 1."},
      ].map((f,i)=>(<div key={i} style={{marginBottom:i<2?10:0}}>
        <div style={{fontSize:12,fontWeight:700,color:"#E65100"}}>{f.name}</div>
        <div style={{fontFamily:"monospace",fontSize:14,fontWeight:800,color:"#333",margin:"2px 0 2px 8px"}}>{f.formula}</div>
        <div style={{fontSize:11,color:"#666",marginLeft:8}}>{f.note}</div>
      </div>))}
    </div>
  </ExpandSection>
</div>);}
