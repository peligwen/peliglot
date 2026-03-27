import { Card } from '../../../components/Card';
import { Insight as Nota } from '../../../components/Insight';

export function Guide20(){return(<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
    {[{en:"this",es:"este/esta",note:"cerca de mí",color:"#6A1B9A"},{en:"that",es:"ese/esa",note:"lejos de mí",color:"#E65100"},{en:"these",es:"estos/estas",note:"cerca, plural",color:"#6A1B9A"},{en:"those",es:"esos/esas",note:"lejos, plural",color:"#E65100"}].map((d,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"12px",border:`2px solid ${d.color}30`,textAlign:"center"}}>
      <div style={{fontSize:22,fontWeight:800,color:d.color}}>{d.en}</div>
      <div style={{fontSize:12,color:"#888"}}>{d.es}</div>
      <div style={{fontSize:10,color:"#aaa"}}>{d.note}</div>
    </div>))}
  </div>
  <Nota text="¡Más simple que en español — sin concordancia de género! this/that/these/those no cambian por masculino/femenino." />
  <Card color="#6A1B9A" title="Cuantificadores esenciales">
    {[{q:"every + singular",ex:"Every student passed. (Cada estudiante)",color:"#6A1B9A"},
      {q:"each + singular",ex:"Each student has a book. (Cada uno)",color:"#6A1B9A"},
      {q:"all + plural",ex:"All students passed. (Todos)",color:"#1565C0"},
      {q:"another + singular",ex:"another book = otro más",color:"#2E7D32"},
      {q:"other + plural",ex:"other books = otros libros",color:"#2E7D32"},
      {q:"the other",ex:"the other book = el otro (específico)",color:"#E65100"},
      {q:"enough (después del adj.)",ex:"tall enough, enough money",color:"#C62828"},
      {q:"such + sustantivo",ex:"such a beautiful day",color:"#C62828"},
      {q:"so + adjetivo",ex:"so beautiful, so tired",color:"#C62828"},
    ].map((q,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 14px",borderBottom:i<8?"1px solid #f0eeeb":"none",gap:8}}>
      <span style={{background:q.color,color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700,flexShrink:0,minWidth:100}}>{q.q}</span>
      <span style={{fontSize:12,color:"#555"}}>{q.ex}</span>
    </div>))}
  </Card>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 21-23: ADJETIVOS
// ═══════════════════════════════════════════════════════════════
