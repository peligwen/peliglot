import { useState } from 'react';
import { ExpandSection } from '../../../components/ExpandSection';
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
    <div style={{background:"#EDE7F6",borderRadius:10,padding:"12px 14px",marginBottom:12,border:"1px solid #D1C4E9"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#4527A0",marginBottom:6}}>Subjuntivo "were" (2ª condicional con "be"):</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        <strong style={{color:"#4527A0"}}>If I WERE you, I would...</strong> — ✅ formal (SIEMPRE correcto)<br/>
        <strong style={{color:"#888"}}>If I WAS you, I would...</strong> — aceptable en conversación informal AmE<br/>
        <span style={{fontSize:11,color:"#888"}}>En escritura formal y en "if I were rich / if he were here" → siempre <strong>were</strong>. La frase fija "If I were you" nunca usa "was" en contextos formales.</span>
      </div>
    </div>
    <ExpandSection title="Avanzado: condicionales mixtas e inversión" color="#880E4F">
      <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #F8BBD0"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#880E4F",marginBottom:6}}>Condicional mixta (pasado → presente):</div>
        <div style={{fontSize:13,color:"#555",marginBottom:10,lineHeight:1.6}}>
          <em>If I had studied medicine (3ª), I would be a doctor now (2ª).</em><br/>
          <span style={{fontSize:11,color:"#888"}}>Antecedente en el pasado, consecuencia en el presente. Muy frecuente en inglés real.</span>
        </div>
        <div style={{fontSize:12,fontWeight:700,color:"#880E4F",marginBottom:6}}>Inversión formal (sin "if"):</div>
        {[{formal:"Had I known, I would have helped.",equiv:"= If I had known, I would have helped."},
          {formal:"Were I you, I would reconsider.",equiv:"= If I were you..."},
          {formal:"Should you need help, call me.",equiv:"= If you should need help..."},
        ].map((r,i)=>(<div key={i} style={{padding:"5px 0",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:13,color:"#880E4F",fontStyle:"italic"}}>{r.formal}</div>
          <div style={{fontSize:11,color:"#888"}}>{r.equiv}</div>
        </div>))}
        <div style={{marginTop:8,fontSize:11,color:"#888"}}>La inversión suena muy formal/literaria. Común en contratos, cartas formales y literatura americana.</div>
      </div>
    </ExpandSection>
  </div>);
}
