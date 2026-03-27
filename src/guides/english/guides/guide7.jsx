import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

const irregulars=[
  {b:"go",p:"went",pp:"gone",es:"ir",grp:"unique"},{b:"come",p:"came",pp:"come",es:"venir",grp:"unique"},
  {b:"see",p:"saw",pp:"seen",es:"ver",grp:"vowel"},{b:"take",p:"took",pp:"taken",es:"tomar",grp:"vowel"},
  {b:"give",p:"gave",pp:"given",es:"dar",grp:"vowel"},{b:"make",p:"made",pp:"made",es:"hacer",grp:"same"},
  {b:"get",p:"got",pp:"gotten",es:"obtener",grp:"vowel"},{b:"know",p:"knew",pp:"known",es:"saber",grp:"vowel"},
  {b:"think",p:"thought",pp:"thought",es:"pensar",grp:"same"},{b:"say",p:"said",pp:"said",es:"decir",grp:"same"},
  {b:"eat",p:"ate",pp:"eaten",es:"comer",grp:"vowel"},{b:"drink",p:"drank",pp:"drunk",es:"beber",grp:"vowel"},
  {b:"write",p:"wrote",pp:"written",es:"escribir",grp:"vowel"},{b:"buy",p:"bought",pp:"bought",es:"comprar",grp:"same"},
  {b:"bring",p:"brought",pp:"brought",es:"traer",grp:"same"},{b:"teach",p:"taught",pp:"taught",es:"enseñar",grp:"same"},
  {b:"tell",p:"told",pp:"told",es:"contar",grp:"same"},{b:"find",p:"found",pp:"found",es:"encontrar",grp:"same"},
  {b:"run",p:"ran",pp:"run",es:"correr",grp:"vowel"},{b:"read",p:"read",pp:"read",es:"leer",grp:"same"},
  {b:"put",p:"put",pp:"put",es:"poner",grp:"nochange"},{b:"cut",p:"cut",pp:"cut",es:"cortar",grp:"nochange"},
  {b:"let",p:"let",pp:"let",es:"dejar",grp:"nochange"},{b:"hit",p:"hit",pp:"hit",es:"golpear",grp:"nochange"},
];

export function Guide7(){
  const [filter,setFilter]=useState("all");
  const [hovered,setHovered]=useState(null);
  const grps=[{id:"all",l:"Todos (24)"},{id:"vowel",l:"Cambia vocal"},{id:"same",l:"Past = PP"},{id:"nochange",l:"Sin cambio"},{id:"unique",l:"Únicos"}];
  const filtered=filter==="all"?irregulars:irregulars.filter(v=>v.grp===filter);
  const col={all:"#C62828",vowel:"#1565C0",same:"#2E7D32",nochange:"#6A1B9A",unique:"#E65100"}[filter];
  return(<div>
    <DarkBox title="Tres pronunciaciones de -ed regular"><div style={{fontSize:14}}>
      <span style={{color:"#FFE77A"}}>/t/</span> consonante sorda: work<strong>ed</strong>, stopp<strong>ed</strong> · 
      <span style={{color:"#90CAF9"}}>/d/</span> consonante sonora: play<strong>ed</strong>, open<strong>ed</strong> · 
      <span style={{color:"#EF9A9A"}}>/ɪd/</span> después de t/d: want<strong>ed</strong>, need<strong>ed</strong>
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {grps.map(g=>(<button key={g.id} onClick={()=>setFilter(g.id)} style={{padding:"5px 10px",borderRadius:16,border:filter===g.id?`2px solid ${col}`:"1.5px solid #ddd",background:filter===g.id?col:"#fff",color:filter===g.id?"#fff":"#666",fontSize:10,fontWeight:600,cursor:"pointer"}}>{g.l}</button>))}
    </div>
    <Card color={col} title={`Verbos irregulares: ${filtered.length}`} subtitle="Base → Pasado → Participio">
      <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr 1fr",padding:"6px 14px",fontSize:9,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>Español</div><div>Base</div><div>Past</div><div>Past Part.</div>
      </div>
      {filtered.map((v,i)=>(<div key={i}
        onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
        style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr 1fr",padding:"5px 14px",borderBottom:i<filtered.length-1?"1px solid #f0eeeb":"none",fontSize:12,background:hovered===i?"#FAFAF5":"transparent",transition:"background 0.1s"}}>
        <span style={{color:"#888",fontSize:10,fontStyle:"italic"}}>{v.es}</span>
        <span style={{color:"#555"}}>{v.b}</span>
        <span style={{fontWeight:700,color:col}}>{v.p}</span>
        <span style={{fontWeight:700,color:"#6A1B9A"}}>{v.pp}</span>
      </div>))}
    </Card>
    <Chatt text="Modales dobles: 'I might could help you' = Tal vez pueda ayudarte. 'Used to could' = Antes podía. Gramaticalmente sureños, no errores." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 8-13: VERBOS (INTERACTIVOS)
// ═══════════════════════════════════════════════════════════════
