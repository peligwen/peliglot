import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide10(){
  const [input,setInput]=useState(5);
  const [rule,setRule]=useState(0);
  const rules=[{name:"Double + 1",fn:x=>2*x+1,formula:"f(x) = 2x + 1"},{name:"Square",fn:x=>x*x,formula:"f(x) = x²"},{name:"Half - 3",fn:x=>x/2-3,formula:"f(x) = x/2 - 3"}];
  const r=rules[rule];
  return(<div>
    <DarkBox title="A machine: input → rule → output"><div style={{fontSize:14}}>
      A function takes a number in, applies a rule, and gives a number out. <strong style={{color:"#FFE77A"}}>Every function is just a rule.</strong> f(x) = 2x + 1 means "double it and add one."
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center"}}>
      {rules.map((rl,i)=>(<button key={i} onClick={()=>setRule(i)} style={{padding:"6px 14px",borderRadius:8,border:rule===i?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:rule===i?"#6A1B9A":"#fff",color:rule===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{rl.name}</button>))}
    </div>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"2px solid #6A1B9A",marginBottom:16}}>
      <div style={{textAlign:"center",fontFamily:"monospace",fontSize:16,fontWeight:700,color:"#6A1B9A",marginBottom:12}}>{r.formula}</div>
      <Slider label="Input (x)" min={-10} max={10} value={input} onChange={setInput} color="#6A1B9A" />
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr auto 1fr",gap:8,alignItems:"center",textAlign:"center"}}>
        <div style={{padding:"10px",background:"#EDE7F6",borderRadius:10}}><div style={{fontSize:10,color:"#888"}}>Input</div><div style={{fontSize:24,fontWeight:800,color:"#6A1B9A"}}>{input}</div></div>
        <div style={{fontSize:20,color:"#ccc"}}>→</div>
        <div style={{padding:"10px",background:"#f5f3ef",borderRadius:10}}><div style={{fontSize:10,color:"#888"}}>Rule</div><div style={{fontSize:14,fontWeight:700,color:"#555"}}>{r.name}</div></div>
        <div style={{fontSize:20,color:"#ccc"}}>→</div>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:10}}><div style={{fontSize:10,color:"#888"}}>Output</div><div style={{fontSize:24,fontWeight:800,color:"#2E7D32"}}>{r.fn(input)}</div></div>
      </div>
    </div>
    <Insight text="Spreadsheet formulas are functions. =A1*2+1 takes cell A1 as input, doubles it, adds 1. Every formula in Excel/Sheets is a function. You've been using them all along." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 11-15: SHAPES (with live calculations)
// ═══════════════════════════════════════════════════════════════
