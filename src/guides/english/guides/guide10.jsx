import { useState } from 'react';
import { Chatt } from './_helpers';

export function Guide10(){
  const modals=[
    {m:"can",es:"poder",uses:"capacidad, permiso",ex:"I can swim. Can I sit here?",color:"#1565C0"},
    {m:"could",es:"podría",uses:"pasado, cortesía, posibilidad",ex:"Could you help me? It could rain.",color:"#1565C0"},
    {m:"will",es:"-ré (futuro)",uses:"futuro, voluntad, promesa",ex:"I'll help. I'll be there.",color:"#2E7D32"},
    {m:"would",es:"-ría (cond.)",uses:"condicional, cortesía",ex:"Would you like tea? I would go if...",color:"#2E7D32"},
    {m:"should",es:"debería",uses:"consejo, expectativa",ex:"You should study.",color:"#E65100"},
    {m:"must",es:"deber",uses:"obligación, certeza",ex:"You must wear a seatbelt.",color:"#C62828"},
    {m:"may/might",es:"puede que",uses:"permiso formal, posibilidad",ex:"May I come in? It might rain.",color:"#6A1B9A"},
  ];
  const [sel,setSel]=useState(null);
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px,1fr))",gap:6,marginBottom:14}}>
      {modals.map((m,i)=>{const isSel=sel===i;return(
        <button key={i} onClick={()=>setSel(isSel?null:i)} style={{padding:"10px 6px",borderRadius:10,border:isSel?`2.5px solid ${m.color}`:"1.5px solid #e0dcd5",background:isSel?m.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
          <div style={{fontSize:16,fontWeight:800}}>{m.m}</div>
          <div style={{fontSize:10,opacity:.7}}>≈ {m.es}</div>
        </button>
      );})}
    </div>
    {sel!==null&&(()=>{const m=modals[sel];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${m.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:m.color,padding:"12px 16px",color:"#fff",display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:18,fontWeight:800}}>{m.m}</span><span style={{opacity:.7}}>{m.uses}</span>
        </div>
        <div style={{padding:"12px 16px"}}>
          <div style={{fontSize:14,color:"#555",fontStyle:"italic",marginBottom:6}}>{m.ex}</div>
          <div style={{background:"#FFF8E7",borderRadius:6,padding:"6px 10px",fontSize:12,color:"#8B6914"}}>En español ≈ <strong>{m.es}</strong></div>
        </div>
      </div>
    );})()}
    <Chatt text="Modales dobles — marca de Chattanooga: 'might could' (tal vez pueda), 'might should' (tal vez debería). El inglés estándar solo permite UNO. El sureño los acumula." />
  </div>);
}
