import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

const spellingPatterns=[
  {pattern:"-tion",sound:"/ʃən/",examples:["nation","education","information","situation"],color:"#6A1B9A"},
  {pattern:"-ight",sound:"/aɪt/",examples:["night","light","fight","right","might"],color:"#C62828"},
  {pattern:"-ough",sound:"¡7 sonidos!",examples:["through /uː/","though /oʊ/","thought /ɔː/","tough /ʌf/","cough /ɒf/","bough /aʊ/"],color:"#E65100"},
  {pattern:"-ness",sound:"/nəs/",examples:["happiness","darkness","kindness","sadness"],color:"#2E7D32"},
  {pattern:"-ful",sound:"/fəl/",examples:["beautiful","wonderful","careful","useful"],color:"#1565C0"},
  {pattern:"kn-",sound:"/n/ (k muda)",examples:["know","knee","knife","knock","knit"],color:"#880E4F"},
  {pattern:"wr-",sound:"/r/ (w muda)",examples:["write","wrong","wrist","wrap","wreck"],color:"#00695C"},
];

export function Guide4(){
  const [sel,setSel]=useState(null);
  return(<div>
    <DarkBox title="¿Por qué es tan caótica?"><div style={{fontSize:13,lineHeight:1.6}}>
      El inglés tomó del latín, francés, alemán, griego — y <strong style={{color:"#EF9A9A"}}>conservó la ortografía original</strong> mientras la pronunciación evolucionaba. Pero hay patrones que SÍ funcionan.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(90px,1fr))",gap:6,marginBottom:16}}>
      {spellingPatterns.map((p,i)=>{const isSel=sel===i;return(
        <button key={i} onClick={()=>setSel(isSel?null:i)} style={{padding:"10px 6px",borderRadius:10,border:isSel?`2.5px solid ${p.color}`:"1.5px solid #e0dcd5",background:isSel?p.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
          <div style={{fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{p.pattern}</div>
          <div style={{fontSize:10,opacity:.7,marginTop:2}}>{p.sound}</div>
        </button>
      );})}
    </div>
    {sel!==null&&(()=>{const p=spellingPatterns[sel];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${p.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:p.color,padding:"12px 16px",color:"#fff"}}><span style={{fontSize:18,fontWeight:800,fontFamily:"monospace"}}>{p.pattern}</span> <span style={{opacity:.7,marginLeft:8}}>= {p.sound}</span></div>
        <div style={{padding:"10px 16px",display:"flex",flexWrap:"wrap",gap:6}}>
          {p.examples.map((e,j)=>(<span key={j} style={{padding:"5px 12px",borderRadius:8,background:`${p.color}10`,color:p.color,fontSize:13,fontWeight:600,border:`1px solid ${p.color}25`}}>{e}</span>))}
        </div>
      </div>
    );})()}
    <Nota text="No existe una regla confiable para toda la ortografía inglesa. Pero estos patrones cubren miles de palabras. Memoriza los patrones, no las excepciones." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 5: ACENTO Y RITMO — PARES INTERACTIVOS
// ═══════════════════════════════════════════════════════════════
