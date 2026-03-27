import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

const vowelSounds=[
  {ipa:"/iː/",word:"sheep",es:"Como la 'i' española pero más larga",cat:"close",color:"#1565C0"},
  {ipa:"/ɪ/",word:"ship",es:"Más corta y relajada que /iː/. ¡No existe en español!",cat:"close",color:"#1565C0"},
  {ipa:"/uː/",word:"fool",es:"Como la 'u' española pero más larga",cat:"close",color:"#6A1B9A"},
  {ipa:"/ʊ/",word:"full",es:"Más corta y relajada que /uː/. ¡No existe en español!",cat:"close",color:"#6A1B9A"},
  {ipa:"/eɪ/",word:"cake",es:"Diptongo — empieza en 'e' y se desliza a 'i'",cat:"mid",color:"#2E7D32"},
  {ipa:"/ɛ/",word:"bed",es:"Parecida a la 'e' española pero más abierta",cat:"mid",color:"#2E7D32"},
  {ipa:"/oʊ/",word:"note",es:"Diptongo — empieza en 'o' y se desliza a 'u'",cat:"mid",color:"#00695C"},
  {ipa:"/ɔː/",word:"call",es:"'O' muy abierta y larga",cat:"mid",color:"#00695C"},
  {ipa:"/æ/",word:"cat",es:"Entre 'a' y 'e' — abre mucho la boca. ¡No existe en español!",cat:"open",color:"#C62828"},
  {ipa:"/ʌ/",word:"cup",es:"Como una 'a' corta y relajada. ¡No existe en español!",cat:"open",color:"#C62828"},
  {ipa:"/ɑː/",word:"car",es:"'A' larga y profunda, de la garganta",cat:"open",color:"#C62828"},
  {ipa:"/ə/",word:"about",es:"SCHWA — el sonido más común del inglés. Una 'a' débil, perezosa. ¡No existe en español!",cat:"schwa",color:"#E65100"},
];

export function Guide2(){
  const [selCat,setSelCat]=useState("all");
  const [selV,setSelV]=useState(null);
  const cats=[{id:"all",l:"Todos (12)"},{id:"close",l:"Cerradas"},{id:"mid",l:"Medias"},{id:"open",l:"Abiertas"},{id:"schwa",l:"Schwa ə"}];
  const filtered=selCat==="all"?vowelSounds:vowelSounds.filter(v=>v.cat===selCat);
  return(<div>
    <DarkBox title="Español: 5 vocales. Inglés: ~15."><div style={{fontSize:14,lineHeight:1.6}}>
      El sonido más común del inglés es <strong style={{color:"#FFE77A"}}>schwa /ə/</strong> — una vocal débil que <strong style={{color:"#EF9A9A"}}>no existe en español</strong>. Aparece en casi toda palabra de más de una sílaba.
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
          <div><div style={{color:"#fff",fontSize:16,fontWeight:700}}>{v.word}</div></div>
        </div>
        <div style={{padding:"12px 16px",fontSize:13,color:"#555",lineHeight:1.5}}>{v.es}</div>
      </div>
    );})()}
    <Chatt text="En Chattanooga, 'pen' y 'pin' suenan idénticos (ambos como 'pin'). Igual con 'ten/tin'. Si alguien dice 'ink pen', está aclarando porque los sonidos se fusionan aquí." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 3: CONSONANTES DIFÍCILES — TOCA PARA EXPLORAR
// ═══════════════════════════════════════════════════════════════
