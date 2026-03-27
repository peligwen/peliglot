import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide22(){
  const [mode,setMode]=useState("comp");
  const compTypes=[
    {id:"more",label:"MÁS...QUE",formula:"más + adj + que",color:"#C62828",
      examples:[{es:"Ella es más alta que yo.",en:"She is taller than me."},{es:"Este libro es más interesante que ese.",en:"This book is more interesting than that one."}]},
    {id:"less",label:"MENOS...QUE",formula:"menos + adj + que",color:"#1565C0",
      examples:[{es:"Es menos caro que el otro.",en:"It's less expensive than the other."},{es:"Hoy estoy menos cansado que ayer.",en:"Today I'm less tired than yesterday."}]},
    {id:"equal",label:"TAN...COMO",formula:"tan + adj + como",color:"#2E7D32",
      examples:[{es:"Soy tan alto como mi papá.",en:"I'm as tall as my dad."},{es:"Es tan difícil como pensaba.",en:"It's as difficult as I thought."}]},
  ];
  const [compSel,setCompSel]=useState("more");
  const comp=compTypes.find(c=>c.id===compSel);
  const irregs=[{reg:"bueno",comp:"mejor",sup:"el/la mejor",en:"good → better → best"},{reg:"malo",comp:"peor",sup:"el/la peor",en:"bad → worse → worst"},{reg:"grande",comp:"mayor",sup:"el/la mayor",en:"old → older → oldest (age)"},{reg:"pequeño",comp:"menor",sup:"el/la menor",en:"young → younger → youngest (age)"}];
  return(<div>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"comp",l:"Comparatives"},{k:"super",l:"Superlatives"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:180,padding:"10px",borderRadius:10,border:mode===m.k?"2.5px solid #C62828":"1.5px solid #ddd",background:mode===m.k?"#C62828":"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{m.l}</button>))}
    </div>
    {mode==="comp"&&(<div>
      <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
        {compTypes.map(c=>(<button key={c.id} onClick={()=>setCompSel(c.id)} style={{padding:"8px 14px",borderRadius:8,border:compSel===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:compSel===c.id?c.color:"#fff",color:compSel===c.id?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{c.label}</button>))}
      </div>
      <div style={{background:"#FAFAF5",borderRadius:12,padding:"14px",textAlign:"center",border:"1px solid #eee",marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,color:comp.color,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Formula</div>
        <div style={{fontSize:18,fontWeight:800,color:comp.color}}>{comp.formula}</div>
      </div>
      <Card color={comp.color} title={comp.label} subtitle="examples">
        {comp.examples.map((ex,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<comp.examples.length-1?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:15,fontWeight:700}}>{ex.es}</div>
          <div style={{fontSize:12,color:"#888"}}>{ex.en}</div>
        </div>))}
      </Card>
      {compSel==="equal"&&<Insight text="For nouns instead of adjectives, use tanto/a/os/as + noun + como. 'Tanto' must agree: Tengo tantos amigos como tú."/>}
    </div>)}
    {mode==="super"&&(<div>
      <DarkBox title="Superlative Formula"><div style={{fontSize:14}}>
        <strong style={{color:"#FFE77A"}}>el/la/los/las</strong> + más/menos + adj + <strong style={{color:"#FFE77A"}}>de</strong><br/>
        <span style={{color:"#aaa",fontSize:12}}>Use DE (not "en") for "in" — Es el más alto <u>de</u> la clase.</span>
      </div></DarkBox>
      <Card color="#C62828" title="Examples">
        <div style={{padding:"10px 16px",borderBottom:"1px solid #f0eeeb"}}><div style={{fontSize:15,fontWeight:700}}>Es el más alto de la clase.</div><div style={{fontSize:12,color:"#888"}}>He's the tallest in the class.</div></div>
        <div style={{padding:"10px 16px"}}><div style={{fontSize:15,fontWeight:700}}>Es la película menos aburrida del año.</div><div style={{fontSize:12,color:"#888"}}>It's the least boring movie of the year.</div></div>
      </Card>
    </div>)}
    <Card color="#1a1a1a" title="Irregulars — Never Say 'Más Bueno'">
      {irregs.map((ir,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"75px 65px 85px 1fr",alignItems:"center",padding:"8px 16px",borderBottom:i<irregs.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{color:"#999"}}>{ir.reg}</span>
        <span style={{fontWeight:700,color:"#C62828"}}>{ir.comp}</span>
        <span style={{fontWeight:700,color:"#6A1B9A"}}>{ir.sup}</span>
        <span style={{color:"#aaa",fontSize:10}}>{ir.en}</span>
      </div>))}
    </Card>
  </div>);
}
