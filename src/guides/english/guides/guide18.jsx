import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Trampa } from './_helpers';

export function Guide18(){
  const prns=[
    {sub:"I",obj:"me",ref:"myself",pos:"my/mine",es:"yo/me/mi"},
    {sub:"you",obj:"you",ref:"yourself",pos:"your/yours",es:"tú/te/tu"},
    {sub:"he",obj:"him",ref:"himself",pos:"his",es:"él/lo/su"},
    {sub:"she",obj:"her",ref:"herself",pos:"her/hers",es:"ella/la/su"},
    {sub:"it",obj:"it",ref:"itself",pos:"its",es:"ello/lo/su"},
    {sub:"we",obj:"us",ref:"ourselves",pos:"our/ours",es:"nos./nos"},
    {sub:"they",obj:"them",ref:"themselves",pos:"their/theirs",es:"ellos/los"},
  ];
  const [hlCol,setHlCol]=useState(null);
  const cols=["#1565C0","#C62828","#6A1B9A","#2E7D32"];
  const labels=["Sujeto","Objeto","Reflexivo","Posesivo"];
  return(<div>
    <div style={{display:"flex",gap:4,marginBottom:12,justifyContent:"center"}}>
      {labels.map((l,i)=>(<button key={i} onClick={()=>setHlCol(hlCol===i?null:i)} style={{padding:"5px 10px",borderRadius:16,border:hlCol===i?`2px solid ${cols[i]}`:"1.5px solid #ddd",background:hlCol===i?cols[i]:"#fff",color:hlCol===i?"#fff":"#666",fontSize:10,fontWeight:600,cursor:"pointer"}}>{l}</button>))}
    </div>
    <Card color="#1565C0" title="Pronombres en inglés" subtitle="Toca columnas para resaltar">
      <div style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"6px 10px",fontSize:9,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>ES</div>{labels.map((l,i)=>(<div key={i} style={{textAlign:"center",color:hlCol===i?cols[i]:"#999",borderBottom:hlCol===i?`3px solid ${cols[i]}`:"3px solid transparent",transition:"all 0.15s"}}>{l}</div>))}
      </div>
      {prns.map((p,j)=>(<div key={j} style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"5px 10px",borderBottom:j<prns.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{color:"#aaa",fontSize:9}}>{p.es}</span>
        {[p.sub,p.obj,p.ref,p.pos].map((v,i)=>(<span key={i} style={{textAlign:"center",fontWeight:hlCol===i?800:600,color:hlCol===i?cols[i]:"#333",background:hlCol===i?`${cols[i]}10`:"transparent",borderRadius:4,transition:"all 0.15s"}}>{v}</span>))}
      </div>))}
    </Card>
    <Trampa text="El inglés SIEMPRE necesita sujeto. ❌ 'Is raining.' → ✅ 'IT is raining.' ❌ 'Are many people.' → ✅ 'THERE are many people.' En español se omite — en inglés nunca." />
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:4}}>'They' como singular (género desconocido/no binario)</div>
      <div style={{fontSize:12,color:"#555"}}>Someone left <strong>their</strong> bag. · If anyone calls, tell <strong>them</strong> I'm busy.<br/><span style={{fontSize:11,color:"#888"}}>Esto es inglés moderno estándar, no un error.</span></div>
    </div>
  </div>);
}
