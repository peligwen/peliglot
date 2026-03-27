import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

const consonantChallenges=[
  {sound:"/v/ vs /b/",words:["very ≠ berry","vote ≠ boat","vest ≠ best"],tip:"Para /v/: dientes superiores tocan labio inferior. En español B/V suenan igual — en inglés son DIFERENTES.",color:"#C62828",cat:"labial"},
  {sound:"/ʃ/ (sh)",words:["ship","show","push","she"],tip:"Labios hacia adelante como soplando una vela y di 'shhh'. No existe en español.",color:"#1565C0",cat:"sibilant"},
  {sound:"/dʒ/ (j)",words:["judge","job","gym","age"],tip:"Como 'ch' pero con vibración en la garganta. NO es la J española (/x/ de 'jota').",color:"#2E7D32",cat:"sibilant"},
  {sound:"/z/",words:["zoo","easy","is","has"],tip:"Como /s/ pero CON vibración. Mano en la garganta — debes sentir vibración. La S entre vocales en inglés muchas veces es /z/.",color:"#6A1B9A",cat:"sibilant"},
  {sound:"/θ/ (th sorda)",words:["think","bath","three"],tip:"¡Lengua entre los dientes! Sin vibración. Como la Z de España.",color:"#E65100",cat:"dental"},
  {sound:"/ð/ (th sonora)",words:["the","this","mother"],tip:"¡Lengua entre los dientes CON vibración! Como la D suave del español entre vocales.",color:"#E65100",cat:"dental"},
  {sound:"S + consonante",words:["stop","speak","school","sport"],tip:"¡NO pongas 'e' antes! En español: escuela. En inglés: school. Practica: 'ssssstop'.",color:"#880E4F",cat:"cluster"},
  {sound:"Grupos finales",words:["texts","months","strengths"],tip:"El inglés acumula consonantes al final. No las cortes ni añadas vocales.",color:"#00695C",cat:"cluster"},
];

export function Guide3(){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  const cats=[{id:"all",l:"Todos"},{id:"labial",l:"Labiales"},{id:"sibilant",l:"Sibilantes"},{id:"dental",l:"Dentales (TH)"},{id:"cluster",l:"Grupos"}];
  const filtered=filter==="all"?consonantChallenges:consonantChallenges.filter(c=>c.cat===filter);
  return(<div>
    <DarkBox title="8 desafíos de pronunciación"><div style={{fontSize:13}}>Estos sonidos no existen en español o funcionan diferente. Son los que más delatan el acento. Toca para explorar cada uno.</div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {cats.map(c=>(<button key={c.id} onClick={()=>{setFilter(c.id);setSel(null)}} style={{padding:"5px 10px",borderRadius:16,border:filter===c.id?"2px solid #2E7D32":"1.5px solid #ddd",background:filter===c.id?"#2E7D32":"#fff",color:filter===c.id?"#fff":"#666",fontSize:10,fontWeight:600,cursor:"pointer"}}>{c.l}</button>))}
    </div>
    {filtered.map((c,i)=>{const isSel=sel===i;return(
      <div key={i} onClick={()=>setSel(isSel?null:i)} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:isSel?`2.5px solid ${c.color}`:"1px solid #e0dcd5",marginBottom:8,cursor:"pointer",transition:"all 0.15s"}}>
        <div style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
          <span style={{background:c.color,color:"#fff",padding:"3px 12px",borderRadius:6,fontSize:14,fontWeight:800,fontFamily:"monospace"}}>{c.sound}</span>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",flex:1}}>{c.words.map((w,j)=>(<span key={j} style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{w}{j<c.words.length-1?" ·":""}</span>))}</div>
          <span style={{fontSize:14,color:"#ccc"}}>{isSel?"▲":"▼"}</span>
        </div>
        {isSel&&<div style={{padding:"10px 14px",borderTop:"1px solid #f0eeeb",background:"#FAFAF5",fontSize:12,color:"#555",lineHeight:1.6}}>{c.tip}</div>}
      </div>
    );})}
    <Chatt text="El inglés sureño suaviza consonantes finales: 'didn't' → 'din't', 'last night' → 'las' night'. Normal aquí, pero practica las formas completas para situaciones formales." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 4: ORTOGRAFÍA — PATRONES INTERACTIVOS
// ═══════════════════════════════════════════════════════════════
