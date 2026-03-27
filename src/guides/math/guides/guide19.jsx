import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

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
  <Insight text="Savings plan = arithmetic series (save $500/month for 12 months = $6,000). Investment growth = geometric series (compound returns multiply). Understanding which pattern applies tells you what to expect." />
</div>);}
