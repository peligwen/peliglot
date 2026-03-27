import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { pronouns6, pronounsShort } from './_helpers';

const stemTypes=[
  {id:"e-ie",label:"E → IE",color:"#C62828",model:{verb:"pensar",forms:["pienso","piensas","piensa","pensamos","pensáis","piensan"]},verbs:["pensar","querer","preferir","sentir","cerrar","entender"]},
  {id:"o-ue",label:"O → UE",color:"#1565C0",model:{verb:"poder",forms:["puedo","puedes","puede","podemos","podéis","pueden"]},verbs:["poder","dormir","volver","encontrar","recordar","almorzar"]},
  {id:"e-i",label:"E → I",color:"#2E7D32",model:{verb:"pedir",forms:["pido","pides","pide","pedimos","pedís","piden"]},verbs:["pedir","servir","repetir","seguir","vestirse","reír"]},
  {id:"u-ue",label:"U → UE",color:"#6A1B9A",model:{verb:"jugar",forms:["juego","juegas","juega","jugamos","jugáis","juegan"]},verbs:["jugar"]},
];
const bootPattern=[true,true,true,false,false,true];

export function Guide9(){
  const [ac,setAc]=useState("e-ie");const ch=stemTypes.find(c=>c.id===ac);
  return(<div>
    <DarkBox title="The Boot Pattern"><div style={{fontSize:13,marginBottom:12}}>Changes happen where stress falls on the stem. Nosotros/vosotros stress the ending → no change.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,maxWidth:240,margin:"0 auto"}}>
        {pronounsShort.map((p,i)=>(<div key={i} style={{padding:"8px",borderRadius:6,background:bootPattern[i]?ch.color:"#333",color:bootPattern[i]?"#fff":"#666",fontSize:12,fontWeight:bootPattern[i]?700:400,textAlign:"center"}}>{p}{bootPattern[i]?" ★":""}</div>))}
      </div>
    </DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:16,justifyContent:"center",flexWrap:"wrap"}}>
      {stemTypes.map(c=>(<button key={c.id} onClick={()=>setAc(c.id)} style={{padding:"8px 16px",borderRadius:10,border:ac===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:ac===c.id?c.color:"#fff",color:ac===c.id?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:14}}>{c.label}</button>))}
    </div>
    <Card color={ch.color} title={ch.model.verb} subtitle={ch.label}>
      {pronouns6.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:44,borderBottom:i<5?"1px solid #f0eeeb":"none",borderLeft:bootPattern[i]?`4px solid ${ch.color}`:"4px solid transparent",background:bootPattern[i]?`${ch.color}08`:"transparent"}}>
        <div style={{width:110,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{flex:1,fontSize:17,fontWeight:700,color:bootPattern[i]?ch.color:"#1a1a1a"}}>{ch.model.forms[i]}</div>
        <div style={{padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:700,background:bootPattern[i]?ch.color:"#eee",color:bootPattern[i]?"#fff":"#aaa"}}>{bootPattern[i]?"CHANGES":"regular"}</div>
      </div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>{ch.verbs.map(v=>(<span key={v} style={{padding:"4px 12px",borderRadius:16,background:`${ch.color}12`,color:ch.color,fontSize:12,fontWeight:600,border:`1px solid ${ch.color}25`}}>{v}</span>))}</div>
  </div>);
}
