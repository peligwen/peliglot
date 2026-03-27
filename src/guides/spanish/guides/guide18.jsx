import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';

export function Guide18(){
  const [sec,setSec]=useState("para");
  const paraU=["🎯 Purpose/Goal — Estudio para aprender.","🎁 Recipient — Es para ti.","✈️ Destination — Salgo para México.","📅 Deadline — Es para el lunes.","⚖️ Comparison — Para niño, cocina bien.","💼 Employment — Trabajo para Google."];
  const porU=["🔥 Cause/Reason — Lo hizo por amor.","⏱ Duration — Estudié por dos horas.","💱 Exchange — Lo compré por $50.","🚶 Through — Camino por el parque.","📞 Means — Hablamos por teléfono.","🤝 On behalf of — Firmé por mi jefe.","📊 Per/Rate — Tres veces por semana."];
  return(<div>
    <DarkBox title="Visual Metaphor"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{background:"#00695C",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:22}}>→ 🎯</div><div style={{fontWeight:800,marginTop:4}}>PARA</div><div style={{fontSize:11,opacity:.8}}>Toward a destination/purpose</div></div>
      <div style={{background:"#AD1457",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:22}}>↻ 🔄</div><div style={{fontWeight:800,marginTop:4}}>POR</div><div style={{fontSize:11,opacity:.8}}>Through — cause, exchange, passage</div></div>
    </div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"para",c:"#00695C"},{k:"por",c:"#AD1457"}].map(s=>(<button key={s.k} onClick={()=>setSec(s.k)} style={{flex:1,maxWidth:200,padding:"12px",borderRadius:10,border:sec===s.k?`2.5px solid ${s.c}`:"1.5px solid #ddd",background:sec===s.k?s.c:"#fff",color:sec===s.k?"#fff":"#666",cursor:"pointer",fontSize:16,fontWeight:800}}>{s.k.toUpperCase()}</button>))}
    </div>
    <Card color={sec==="para"?"#00695C":"#AD1457"} title={sec.toUpperCase()+" Uses"}>
      {(sec==="para"?paraU:porU).map((u,i,a)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555"}}>{u}</div>))}
    </Card>
  </div>);
}
