import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

const pairs=[
  {ctx:"Greeting",inf:"¡Hola! ¿Qué onda?",for:"Buenos días. ¿Cómo está?"},
  {ctx:"Asking name",inf:"¿Cómo te llamas?",for:"¿Cómo se llama usted?"},
  {ctx:"Requesting",inf:"Pásame la sal.",for:"¿Me podría pasar la sal?"},
  {ctx:"Commands",inf:"¡Siéntate!",for:"Siéntese, por favor."},
  {ctx:"Goodbye",inf:"¡Nos vemos!",for:"Fue un placer. Que le vaya bien."},
  {ctx:"Doctor's office",inf:"—",for:"¿Cómo se siente hoy?"},
  {ctx:"Friend's parent",inf:"—",for:"Mucho gusto, señora."},
  {ctx:"Store clerk",inf:"—",for:"Disculpe, ¿cuánto cuesta esto?"},
];

const scenarios=[
  {sit:"Your best friend",answer:"tú",why:"Close personal relationship → always tú."},
  {sit:"A police officer",answer:"usted",why:"Authority figure → usted shows respect."},
  {sit:"Your professor",answer:"usted",why:"Formal setting → usted until they say otherwise."},
  {sit:"A child you just met",answer:"tú",why:"Children are always addressed as tú."},
  {sit:"A job interview",answer:"usted",why:"Professional/formal → usted is expected."},
  {sit:"Your coworker (same age)",answer:"tú",why:"Peers often use tú, but follow their lead."},
  {sit:"An elderly stranger",answer:"usted",why:"Age difference + stranger → usted."},
  {sit:"A waiter at a casual restaurant",answer:"usted",why:"Service context → usted is standard in most countries."},
];

export function Guide24(){
  const [mode,setMode]=useState("learn");
  const [reveal,setReveal]=useState(-1);
  return(<div>
    <DarkBox title="Tú vs Usted"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{background:"#2E7D32",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:20,fontWeight:800}}>TÚ</div><div style={{fontSize:11,opacity:.8}}>Informal — friends, family, kids</div></div>
      <div style={{background:"#C62828",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:20,fontWeight:800}}>USTED</div><div style={{fontSize:11,opacity:.8}}>Formal — strangers, elders, authority</div></div>
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Phrases"},{id:"scenario",label:"🎭 Scenarios"},{id:"region",label:"🌎 Regional"}].map(t=>(<button key={t.id} onClick={()=>{setMode(t.id);setReveal(-1);}} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"&&<div>
      {pairs.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6}}>
        <div style={{fontSize:12,fontWeight:700,color:"#37474F",marginBottom:6}}>{p.ctx}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{padding:"6px 10px",borderRadius:6,background:p.inf==="—"?"#f5f5f5":"#E8F5E9",fontSize:12,color:p.inf==="—"?"#ccc":"#1a1a1a"}}><span style={{fontSize:9,color:"#2E7D32",fontWeight:700}}>TÚ</span><br/>{p.inf}</div>
          <div style={{padding:"6px 10px",borderRadius:6,background:"#FFEBEE",fontSize:12,color:"#1a1a1a"}}><span style={{fontSize:9,color:"#C62828",fontWeight:700}}>UD.</span><br/>{p.for}</div>
        </div>
      </div>))}
    </div>}
    {mode==="scenario"&&<div>
      <div style={{fontSize:12,color:"#888",textAlign:"center",marginBottom:10}}>Tap each scenario to reveal the answer</div>
      {scenarios.map((s,i)=>(<div key={i} onClick={()=>setReveal(reveal===i?-1:i)} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6,cursor:"pointer",transition:"background 0.15s"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>🗣️ {s.sit}</div>
        {reveal===i?<div>
          <div style={{fontSize:16,fontWeight:800,color:s.answer==="tú"?"#2E7D32":"#C62828",marginBottom:4}}>{s.answer==="tú"?"TÚ ✓":"USTED ✓"}</div>
          <div style={{fontSize:12,color:"#666"}}>{s.why}</div>
        </div>:<div style={{fontSize:12,color:"#bbb"}}>Tap to reveal...</div>}
      </div>))}
    </div>}
    {mode==="region"&&<Card color="#37474F" title="Regional Differences">
      {[
        {region:"🇨🇴 Colombia",note:"Usted is used even between close friends and couples in many regions. Don't be surprised!"},
        {region:"🇦🇷 Argentina",note:"Vos replaces tú entirely. Uses its own verb forms: vos tenés, vos sabés."},
        {region:"🇲🇽 Mexico",note:"Ustedes for ALL plural 'you' (no vosotros). Usted is standard with strangers."},
        {region:"🇪🇸 Spain",note:"Tú is used much more freely than in Latin America. Vosotros for informal plural."},
      ].map((r,i,a)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#37474F",marginBottom:2}}>{r.region}</div>
        <div style={{fontSize:12,color:"#555"}}>{r.note}</div>
      </div>))}
    </Card>}
    <Insight text="Grammar tip: tú uses 2nd person verb forms (hablas, tienes). Usted uses 3rd person forms (habla, tiene) — same as él/ella. This is why usted feels more 'distant'."/>
  </div>);
}
