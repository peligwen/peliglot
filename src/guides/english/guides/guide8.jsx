import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Chatt } from './_helpers';

export function Guide8(){
  const [mode,setMode]=useState("will");
  const data={will:{label:"WILL",desc:"Espontáneo / predicción / promesa",ex:["I'll help you. (decisión espontánea)","It will rain tomorrow. (predicción)","I'll call you back. (promesa)"],color:"#1565C0"},going:{label:"GOING TO",desc:"Planificado / basado en evidencia",ex:["I'm going to visit my mom. (ya planificado)","Look — it's going to rain. (evidencia visible)"],color:"#2E7D32"},prog:{label:"PRESENTE PROGRESIVO",desc:"Agendado / con boleto",ex:["I'm flying to Atlanta on Friday. (ya tiene boleto)","We're meeting at 3. (ya confirmado)"],color:"#6A1B9A"}};
  const d=data[mode];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.entries(data).map(([k,v])=>(<button key={k} onClick={()=>setMode(k)} style={{flex:1,maxWidth:140,padding:"10px 6px",borderRadius:10,border:mode===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:mode===k?v.color:"#fff",color:mode===k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12,textAlign:"center"}}>{v.label}</button>))}
    </div>
    <Card color={d.color} title={d.label} subtitle={d.desc}>
      {d.ex.map((e,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<d.ex.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555",fontStyle:"italic"}}>{e}</div>))}
    </Card>
    <Chatt text="'Fixin' to' (o 'finna') = a punto de. 'I'm fixin' to go to the store.' ES la marca del futuro sureño — la vas a escuchar constantemente." />
  </div>);
}
