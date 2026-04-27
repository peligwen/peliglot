import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { spChanges } from './data3';

export function Guide3(){
  const [ac,setAc]=useState("c-qu");
  const ch=spChanges.find(c=>c.id===ac)!;
  return(<div>
    <DarkBox title="Core Principle">
      <div style={{fontSize:14}}>Spanish spelling changes exist to <strong style={{color:"#FFE77A"}}>keep the same sound</strong> when the following vowel changes.</div>
    </DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:5}}>
      {spChanges.slice(0,3).map(c=>(<button key={c.id} onClick={()=>setAc(c.id)} style={{padding:"8px 4px",borderRadius:8,border:ac===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:ac===c.id?c.color:"#fff",color:ac===c.id?"#fff":"#555",cursor:"pointer",fontSize:13,fontWeight:700,textAlign:"center"}}>{c.change}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:16}}>
      {spChanges.slice(3).map(c=>(<button key={c.id} onClick={()=>setAc(c.id)} style={{padding:"8px 4px",borderRadius:8,border:ac===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:ac===c.id?c.color:"#fff",color:ac===c.id?"#fff":"#555",cursor:"pointer",fontSize:13,fontWeight:700,textAlign:"center"}}>{c.change}</button>))}
    </div>
    <Card color={ch.color} title={ch.change} subtitle={ch.rule}>
      {ch.examples.map((ex,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 1fr auto",alignItems:"center",padding:"10px 16px",borderBottom:i<ch.examples.length-1?"1px solid #f5f3ef":"none"}}>
        <div style={{fontSize:13,color:"#999"}}>{ex.inf}</div>
        <div style={{fontSize:17,fontWeight:700,color:ch.color}}>{ex.form}</div>
        <div style={{fontSize:11,color:"#aaa"}}>{ex.t}</div>
      </div>))}
    </Card>
  </div>);
}
