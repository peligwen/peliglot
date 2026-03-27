import { useState } from 'react';
import { Trampa } from './_helpers';

export function Guide11(){
  const conds=[
    {n:"Cero",rule:"If + presente, presente",ex:"If you heat water, it boils.",es:"Si calientas agua, hierve.",use:"Verdad general",color:"#2E7D32"},
    {n:"Primera",rule:"If + presente, will + base",ex:"If it rains, I will stay home.",es:"Si llueve, me quedaré en casa.",use:"Futuro probable",color:"#1565C0"},
    {n:"Segunda",rule:"If + pasado, would + base",ex:"If I had money, I would travel.",es:"Si tuviera dinero, viajaría.",use:"Hipotético presente",color:"#6A1B9A"},
    {n:"Tercera",rule:"If + past perfect, would have + pp",ex:"If I had studied, I would have passed.",es:"Si hubiera estudiado, habría pasado.",use:"Irreal pasado",color:"#C62828"},
  ];
  const [sel,setSel]=useState(null);
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:14}}>
      {conds.map((c,i)=>{const isSel=sel===i;return(
        <button key={i} onClick={()=>setSel(isSel?null:i)} style={{padding:"10px 4px",borderRadius:10,border:isSel?`2.5px solid ${c.color}`:"1.5px solid #e0dcd5",background:isSel?c.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:800}}>{c.n}</div>
          <div style={{fontSize:9,opacity:.7}}>{c.use}</div>
        </button>
      );})}
    </div>
    {sel!==null&&(()=>{const c=conds[sel];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${c.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:c.color,padding:"12px 16px",color:"#fff"}}><span style={{fontWeight:800}}>{c.n} condicional</span> — <span style={{opacity:.8,fontFamily:"monospace",fontSize:12}}>{c.rule}</span></div>
        <div style={{padding:"12px 16px"}}>
          <div style={{fontSize:15,fontWeight:600,color:"#333",fontStyle:"italic",marginBottom:4}}>{c.ex}</div>
          <div style={{fontSize:13,color:"#888"}}>{c.es}</div>
        </div>
      </div>
    );})()}
    <Trampa text="❌ If I WOULD have money... ¡NO 'would' en la cláusula con 'if'! ✅ If I HAD money... Este es el error #1 de hispanohablantes con condicionales." />
  </div>);
}
