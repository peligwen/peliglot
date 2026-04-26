import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide20(){return(<div>
  <DarkBox title="How phrases end (or fake you out)"><div style={{fontSize:14}}>
    A <strong style={{color:"#FFE77A"}}>cadence</strong> is the chord progression at the end of a musical phrase. It's like punctuation — a period, a comma, or a question mark.
  </div></DarkBox>
  <Card color="#2E7D32" title="The four main cadences">
    {[{name:"Authentic (V → I)",feel:"Period. Full stop. 'The End.' The strongest resolution.",ex:"G → C in C major. The most final-sounding cadence."},
      {name:"Plagal (IV → I)",feel:"'Amen cadence.' Gentle, warm resolution. Used in hymns.",ex:"F → C in C major."},
      {name:"Half cadence (→ V)",feel:"Comma. Pause but not finished. 'To be continued...'",ex:"Ending a phrase on G in C major. Feels incomplete."},
      {name:"Deceptive (V → vi)",feel:"Plot twist! You expect I but get vi instead. Surprise/emotion.",ex:"G → Am in C major. The surprise minor chord."},
    ].map((c,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#2E7D32"}}>{c.name}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{c.feel}</div>
      <div style={{fontSize:11,color:"#888",marginTop:2}}>{c.ex}</div>
    </div>))}
  </Card>
</div>);}
