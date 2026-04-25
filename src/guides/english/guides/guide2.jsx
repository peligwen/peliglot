import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { speakEnglish } from '../../../utils/speech';
import { Chatt } from './_helpers';

const vowelSounds=[
  {ipa:"/i/",word:"sheep",es:"Como la 'i' española. Cerrada y tensa.",cat:"close",color:"#1565C0"},
  {ipa:"/ɪ/",word:"ship",es:"Más corta y relajada que /i/. ¡No existe en español!",cat:"close",color:"#1565C0"},
  {ipa:"/u/",word:"fool",es:"Como la 'u' española. Cerrada y tensa.",cat:"close",color:"#6A1B9A"},
  {ipa:"/ʊ/",word:"full",es:"Más corta y relajada que /u/. ¡No existe en español!",cat:"close",color:"#6A1B9A"},
  {ipa:"/eɪ/",word:"cake",es:"Diptongo — empieza en 'e' y se DESLIZA a 'i'. El deslizamiento es esencial: no digas una 'e' pura.",cat:"diphthong",color:"#2E7D32"},
  {ipa:"/oʊ/",word:"note",es:"Diptongo — empieza en 'o' y se DESLIZA a 'u'. No digas una 'o' pura.",cat:"diphthong",color:"#00695C"},
  {ipa:"/aɪ/",word:"time",es:"Diptongo — empieza en 'a' y sube a 'i'. Como 'ai' en español: baile, aire.",cat:"diphthong",color:"#880E4F"},
  {ipa:"/aʊ/",word:"cow",es:"Diptongo — empieza en 'a' y sube a 'u'. Como 'au' en español: pausa.",cat:"diphthong",color:"#4527A0"},
  {ipa:"/ɔɪ/",word:"boy",es:"Diptongo — empieza en 'o abierta' y sube a 'i'. Como 'oi' en español: hoy.",cat:"diphthong",color:"#00838F"},
  {ipa:"/ɛ/",word:"bed",es:"Parecida a la 'e' española pero más abierta",cat:"mid",color:"#2E7D32"},
  {ipa:"/ɔ/",word:"call",es:"'O' muy abierta. En Chattanooga puede sonar igual que /ɑ/ (fusión cot-caught).",cat:"mid",color:"#00695C"},
  {ipa:"/æ/",word:"cat",es:"Entre 'a' y 'e' — abre mucho la boca. ¡No existe en español!",cat:"open",color:"#C62828"},
  {ipa:"/ʌ/",word:"cup",es:"Como una 'a' corta y relajada. ¡No existe en español!",cat:"open",color:"#C62828"},
  {ipa:"/ɑ/",word:"car",es:"'A' profunda, de la garganta. En AmE sin la R coloreada.",cat:"open",color:"#C62828"},
  {ipa:"/ɝ/",word:"bird",es:"Vocal rótica: la 'R' americana le da color a toda la vocal. 'bird, her, work' — ¡No existe en español!",cat:"rhotic",color:"#E65100"},
  {ipa:"/ə/",word:"about",es:"SCHWA — el sonido más común del inglés. Una vocal débil, perezosa. ¡No existe en español!",cat:"schwa",color:"#E65100"},
];

export function Guide2(){
  const [selCat,setSelCat]=useState("all");
  const [selV,setSelV]=useState(null);
  const cats=[{id:"all",l:"Todos (16)"},{id:"close",l:"Cerradas"},{id:"diphthong",l:"Diptongos"},{id:"mid",l:"Medias"},{id:"open",l:"Abiertas"},{id:"rhotic",l:"Rótica /ɝ/"},{id:"schwa",l:"Schwa ə"}];
  const filtered=selCat==="all"?vowelSounds:vowelSounds.filter(v=>v.cat===selCat);
  return(<div>
    <DarkBox title="Español: 5 vocales. Inglés: ~16."><div style={{fontSize:14,lineHeight:1.6}}>
      El sonido más común del inglés es <strong style={{color:"#FFE77A"}}>schwa /ə/</strong> — una vocal débil que <strong style={{color:"#EF9A9A"}}>no existe en español</strong>. Aparece en casi toda palabra de más de una sílaba. El total varía por dialecto: ~15–16 en inglés americano general (GenAm).
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {cats.map(c=>(<button key={c.id} onClick={()=>{setSelCat(c.id);setSelV(null)}} style={{padding:"5px 12px",borderRadius:16,border:selCat===c.id?"2px solid #C62828":"1.5px solid #ddd",background:selCat===c.id?"#C62828":"#fff",color:selCat===c.id?"#fff":"#666",fontSize:11,fontWeight:600,cursor:"pointer"}}>{c.l}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(90px,1fr))",gap:6,marginBottom:14}}>
      {filtered.map((v,i)=>{const isSel=selV===i;return(
        <button key={i} onClick={()=>setSelV(isSel?null:i)} style={{padding:"10px 6px",borderRadius:10,border:isSel?`2.5px solid ${v.color}`:"1.5px solid #e0dcd5",background:isSel?v.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center",transition:"all 0.15s",transform:isSel?"scale(1.05)":"scale(1)"}}>
          <div style={{fontSize:16,fontFamily:"monospace",fontWeight:800}}>{v.ipa}</div>
          <div style={{fontSize:12,fontStyle:"italic",opacity:.8,marginTop:2}}>{v.word}</div>
        </button>
      );})}
    </div>
    {selV!==null&&(()=>{const v=filtered[selV];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${v.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:v.color,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:32,fontWeight:800,color:"#FFE77A",fontFamily:"monospace"}}>{v.ipa}</div>
          <div>
            <div style={{color:"#fff",fontSize:16,fontWeight:700}}>{v.word}</div>
          </div>
          <button onClick={()=>speakEnglish(v.word)} style={{marginLeft:"auto",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",color:"#fff",fontSize:12}}>🔊</button>
        </div>
        <div style={{padding:"12px 16px",fontSize:13,color:"#555",lineHeight:1.5}}>{v.es}</div>
      </div>
    );})()}
    <Chatt text="En Chattanooga: 'pen' y 'pin' suenan idénticos (fusión pen-pin). Además, muchos hablantes jóvenes no distinguen /ɑ/ y /ɔ/ — 'cot' y 'caught' suenan igual. Si oyes un solo sonido entre esas dos vocales, no te preocupes — la fusión cot-caught está muy extendida en Tennessee." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 3: CONSONANTES DIFÍCILES — TOCA PARA EXPLORAR
// ═══════════════════════════════════════════════════════════════
