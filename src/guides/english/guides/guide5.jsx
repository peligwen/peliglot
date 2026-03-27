import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Trampa, Chatt } from './_helpers';

const stressPairs=[
  {w1:"REcord",m1:"sustantivo (registro)",w2:"reCORD",m2:"verbo (grabar)",color:"#E65100"},
  {w1:"PREsent",m1:"sustantivo (regalo)",w2:"preSENT",m2:"verbo (presentar)",color:"#1565C0"},
  {w1:"OBject",m1:"sustantivo (objeto)",w2:"obJECT",m2:"verbo (objetar)",color:"#2E7D32"},
  {w1:"PERmit",m1:"sustantivo (permiso)",w2:"perMIT",m2:"verbo (permitir)",color:"#6A1B9A"},
  {w1:"CONtract",m1:"sustantivo (contrato)",w2:"conTRACT",m2:"verbo (contratar)",color:"#C62828"},
  {w1:"PROduce",m1:"sustantivo (productos)",w2:"proDUCE",m2:"verbo (producir)",color:"#880E4F"},
];

export function Guide5(){
  const [selPair,setSelPair]=useState(null);
  return(<div>
    <DarkBox title="Inglés = ritmo acentual"><div style={{fontSize:13,lineHeight:1.6}}>
      El español da el mismo tiempo a cada sílaba. El inglés <strong style={{color:"#FFE77A"}}>se apresura en las sin acento</strong> y se demora en las acentuadas. El acento puede cambiar el significado de una palabra.
    </div></DarkBox>
    <Card color="#E65100" title="El acento cambia el significado" subtitle="Toca para comparar">
      {stressPairs.map((p,i)=>(<div key={i} onClick={()=>setSelPair(selPair===i?null:i)} style={{padding:"10px 16px",borderBottom:i<stressPairs.length-1?"1px solid #f0eeeb":"none",cursor:"pointer",background:selPair===i?"#FFF5F0":"transparent",transition:"background 0.15s"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center"}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:p.color}}>{p.w1}</div></div>
          <div style={{width:30,height:30,borderRadius:"50%",background:p.color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,margin:"0 8px"}}>vs</div>
          <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:p.color}}>{p.w2}</div></div>
        </div>
        {selPair===i&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
          <div style={{padding:"6px 8px",borderRadius:6,background:"#FFF8E7",textAlign:"center",fontSize:11,color:"#8B6914"}}>{p.m1}</div>
          <div style={{padding:"6px 8px",borderRadius:6,background:"#E3F2FD",textAlign:"center",fontSize:11,color:"#1565C0"}}>{p.m2}</div>
        </div>}
      </div>))}
    </Card>
    <Trampa text="Dar la misma duración a cada sílaba como en español. 'Banana' suena como 'buh-NA-nuh' — la primera y última sílaba se reducen a schwa /ə/." />
    <Chatt text="El 'Southern drawl' estira vocales: 'well' → 'we-ull', 'can't' → 'cay-unt'. No es habla perezosa — es la música del dialecto local." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 6: PRESENT SIMPLE — CON REGLAS DO/DOES
// ═══════════════════════════════════════════════════════════════
