import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';

export function Guide20(){
  const modals=[
    {m:"können",en:"can/able to",ex:"Ich kann schwimmen.",conj:"kann, kannst, kann, können, könnt, können",color:"#1565C0"},
    {m:"müssen",en:"must/have to",ex:"Du musst arbeiten.",conj:"muss, musst, muss, müssen, müsst, müssen",color:"#C62828"},
    {m:"dürfen",en:"may/allowed to",ex:"Darf ich fragen?",conj:"darf, darfst, darf, dürfen, dürft, dürfen",color:"#2E7D32"},
    {m:"sollen",en:"should/supposed to",ex:"Du sollst nicht stehlen.",conj:"soll, sollst, soll, sollen, sollt, sollen",color:"#E65100"},
    {m:"wollen",en:"want to",ex:"Ich will schlafen.",conj:"will, willst, will, wollen, wollt, wollen",color:"#6A1B9A"},
    {m:"möchten",en:"would like",ex:"Ich möchte ein Bier.",conj:"möchte, möchtest, möchte, möchten, möchtet, möchten",color:"#880E4F"},
  ];
  const [sel,setSel]=useState(null);
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:14}}>
      {modals.map((m,i)=>{const isSel=sel===i;return(
        <button key={i} onClick={()=>setSel(isSel?null:i)} style={{padding:"10px 4px",borderRadius:10,border:isSel?`2.5px solid ${m.color}`:"1.5px solid #ddd",background:isSel?m.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:800}}>{m.m}</div>
          <div style={{fontSize:10,opacity:.7}}>{m.en}</div>
        </button>
      );})}
    </div>
    {sel!==null&&(()=>{const m=modals[sel];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${m.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:m.color,padding:"12px 16px",color:"#fff",display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:18,fontWeight:800}}>{m.m}</span><span style={{opacity:.7}}>{m.en}</span>
        </div>
        <div style={{padding:"10px 16px"}}>
          <div style={{fontSize:14,color:"#555",fontStyle:"italic",marginBottom:6}}>{m.ex}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:"monospace"}}>{m.conj}</div>
        </div>
      </div>
    );})()}
    <DarkBox title="The verb bracket (Satzklammer)"><div style={{fontSize:13}}>
      Modal at position 2, infinitive at the <strong style={{color:"#FFE77A"}}>END</strong>:<br/>
      Ich <strong style={{color:"#FFE77A"}}>kann</strong> heute nicht <strong style={{color:"#FFE77A"}}>kommen</strong>.<br/>
      <span style={{color:"#aaa",fontSize:11}}>Everything gets sandwiched between the two verb parts.</span>
    </div></DarkBox>
  </div>);
}
