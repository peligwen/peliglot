import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

const passiveTenses=[
  {tense:"Presente simple",form:"is/are + V3",ex:"The house is cleaned every week.",color:"#1565C0"},
  {tense:"Pasado simple",form:"was/were + V3",ex:"The bridge was built in 1890.",color:"#C62828"},
  {tense:"Futuro",form:"will be + V3",ex:"The road will be repaired.",color:"#2E7D32"},
  {tense:"Present Perfect",form:"has/have been + V3",ex:"The form has been submitted.",color:"#6A1B9A"},
  {tense:"Presente continuo",form:"is/are being + V3",ex:"The road is being repaired.",color:"#E65100"},
  {tense:"Pasado continuo",form:"was/were being + V3",ex:"The house was being painted.",color:"#880E4F"},
  {tense:"Modal",form:"modal + be + V3",ex:"This must be done by Friday.",color:"#00695C"},
  {tense:"Past Perfect",form:"had been + V3",ex:"It had been fixed before I arrived.",color:"#00838F"},
];

export function Guide12(){
  const [selT,setSelT]=useState<number|null>(null);
  return(<div>
  <DarkBox title="Formación: be + participio pasado"><div style={{fontSize:13}}>
    Pasiva = énfasis en la <strong style={{color:"#FFE77A"}}>acción o resultado</strong>, no en el agente. Funciona en TODOS los tiempos verbales.
  </div></DarkBox>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:5,marginBottom:12}}>
    {passiveTenses.map((t,i)=>{const isSel=selT===i;return(
      <button key={i} onClick={()=>setSelT(isSel?null:i)} style={{padding:"8px 6px",borderRadius:10,border:isSel?`2.5px solid ${t.color}`:"1.5px solid #e0dcd5",background:isSel?t.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center",fontSize:10,fontWeight:700}}>
        {t.tense}
      </button>
    );})}
  </div>
  {selT!==null&&(()=>{const t=passiveTenses[selT];return(
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:`2px solid ${t.color}`,marginBottom:12,animation:"fadeIn 0.2s ease"}}>
      <div style={{background:t.color,padding:"10px 16px",color:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:800}}>{t.tense}</span>
        <span style={{opacity:.8,fontFamily:"monospace",fontSize:11}}>{t.form}</span>
      </div>
      <div style={{padding:"10px 16px",fontSize:14,color:"#555",fontStyle:"italic"}}>{t.ex}</div>
    </div>
  );})()}
  <Card color="#00838F" title="Pasiva con 'get' (informal)" subtitle="Muy usada en conversación">
    {[{en:"He got fired.",es:"Lo despidieron."},{en:"She got promoted.",es:"La ascendieron."},{en:"We got invited.",es:"Nos invitaron."},{en:"It got stolen.",es:"Lo robaron."}].map((e,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<3?"1px solid #f0eeeb":"none",fontSize:13}}><span style={{fontWeight:700,color:"#00838F",fontStyle:"italic"}}>{e.en}</span><span style={{color:"#888"}}>{e.es}</span></div>))}
  </Card>
  <Nota text="No abuses de la pasiva. ❌ 'The dinner was eaten by us.' ✅ 'We ate dinner.' Usa activa cuando el actor es conocido." />
</div>);}
