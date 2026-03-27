import { useState } from 'react';
import { Card } from '../../../components/Card';

export function Guide15(){
  const p=[{en:"I",nom:"ich",akk:"mich",dat:"mir"},{en:"you (inf)",nom:"du",akk:"dich",dat:"dir"},{en:"he",nom:"er",akk:"ihn",dat:"ihm"},{en:"she",nom:"sie",akk:"sie",dat:"ihr"},{en:"it",nom:"es",akk:"es",dat:"ihm"},{en:"we",nom:"wir",akk:"uns",dat:"uns"},{en:"you (pl)",nom:"ihr",akk:"euch",dat:"euch"},{en:"they",nom:"sie",akk:"sie",dat:"ihnen"},{en:"you (formal)",nom:"Sie",akk:"Sie",dat:"Ihnen"}];
  const [hlCol,setHlCol]=useState(null);
  const cols=["#1565C0","#C62828","#E65100"];
  const labels=["Nominativ","Akkusativ","Dativ"];
  return(<div>
    <div style={{display:"flex",gap:4,marginBottom:12,justifyContent:"center"}}>
      {labels.map((l,i)=>(<button key={i} onClick={()=>setHlCol(hlCol===i?null:i)} style={{padding:"5px 12px",borderRadius:16,border:hlCol===i?`2px solid ${cols[i]}`:"1.5px solid #ddd",background:hlCol===i?cols[i]:"#fff",color:hlCol===i?"#fff":"#666",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>))}
    </div>
    <Card color="#C62828" title="Personal pronouns" subtitle="Tap columns to highlight">
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div>{labels.map((l,i)=>(<div key={i} style={{textAlign:"center",color:hlCol===i?cols[i]:"#999",borderBottom:hlCol===i?`3px solid ${cols[i]}`:"3px solid transparent",transition:"all 0.15s"}}>{l}</div>))}
      </div>
      {p.map((x,j)=>(<div key={j} style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr",padding:"5px 14px",borderBottom:j<p.length-1?"1px solid #f0eeeb":"none",fontSize:13}}>
        <span style={{color:"#888",fontSize:11}}>{x.en}</span>
        {[x.nom,x.akk,x.dat].map((v,i)=>(<span key={i} style={{textAlign:"center",fontWeight:hlCol===i?800:600,color:hlCol===i?cols[i]:"#333",background:hlCol===i?`${cols[i]}10`:"transparent",borderRadius:4,transition:"all 0.15s"}}>{v}</span>))}
      </div>))}
    </Card>
  </div>);
}
