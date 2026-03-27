import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide13(){
  const weakNouns=["der Junge (boy)","der Herr (Mr.)","der Mensch (person)","der Student","der Name","der Nachbar (neighbor)","der Kollege","der Kunde (customer)"];
  return(<div>
    <Card color="#E65100" title="N-Deklination pattern" subtitle="Add -(e)n in ALL cases except Nom. singular">
      <div style={{display:"grid",gridTemplateColumns:"100px 1fr",padding:"6px 14px",fontSize:11,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div>Case</div><div>der Student</div></div>
      {[{c:"Nominativ",f:"der Student"},{c:"Akkusativ",f:"den Studenten"},{c:"Dativ",f:"dem Studenten"},{c:"Genitiv",f:"des Studenten"},{c:"Plural",f:"die Studenten"}].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"100px 1fr",padding:"6px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,color:"#888"}}>{r.c}</span>
        <span style={{fontSize:14,fontWeight:i===0?400:700,color:i===0?"#555":"#E65100"}}>{r.f}</span>
      </div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
      {weakNouns.map(n=>(<span key={n} style={{padding:"4px 10px",borderRadius:8,background:"#FFF3E0",color:"#E65100",fontSize:12,fontWeight:600,border:"1px solid #FFCC80"}}>{n}</span>))}
    </div>
    <Insight text="Small group but very common words. If you see a masculine noun ending in -e (Junge, Kollege, Name), it's probably weak." />
  </div>);
}
