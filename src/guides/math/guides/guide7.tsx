import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Slider } from './_helpers';

export function Guide7(){
  const [x,setX]=useState(5);
  return(<div>
    <DarkBox title="The balance scale"><div style={{fontSize:14}}>
      An equation is a <strong style={{color:"#FFE77A"}}>balanced scale</strong>. Whatever you do to one side, you must do to the other. This one rule solves every equation.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{textAlign:"center",fontSize:16,fontWeight:700,color:"#C62828",marginBottom:8,fontFamily:"monospace"}}>2x + 3 = {2*x+3}</div>
      <Slider label="x =" min={-10} max={20} value={x} onChange={setX} color="#C62828" />
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center"}}>
        <div style={{textAlign:"center",padding:"12px",background:Math.abs(2*x+3-13)<0.1?"#E8F5E9":"#FFF3E0",borderRadius:10,border:"1px solid #ddd"}}>
          <div style={{fontSize:11,color:"#888"}}>Left side</div>
          <div style={{fontSize:24,fontWeight:800,color:"#C62828"}}>{2*x+3}</div>
          <div style={{fontSize:11,color:"#888"}}>2({x}) + 3</div>
        </div>
        <div style={{fontSize:24,color:Math.abs(2*x+3-13)<0.1?"#2E7D32":"#ccc"}}>{Math.abs(2*x+3-13)<0.1?"=":"≠"}</div>
        <div style={{textAlign:"center",padding:"12px",background:Math.abs(2*x+3-13)<0.1?"#E8F5E9":"#E3F2FD",borderRadius:10,border:"1px solid #ddd"}}>
          <div style={{fontSize:11,color:"#888"}}>Right side</div>
          <div style={{fontSize:24,fontWeight:800,color:"#1565C0"}}>13</div>
        </div>
      </div>
      {Math.abs(2*x+3-13)<0.1&&<div style={{textAlign:"center",marginTop:8,fontSize:14,fontWeight:700,color:"#2E7D32"}}>✅ Balanced! x = {x}</div>}
    </div>
    <Card color="#C62828" title="Solving step by step">
      {[{step:"Start:",eq:"2x + 3 = 13"},{step:"Subtract 3 from both sides:",eq:"2x = 10"},{step:"Divide both sides by 2:",eq:"x = 5"}].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,color:"#888"}}>{s.step}</span><br/>
        <span style={{fontSize:18,fontWeight:700,color:"#C62828",fontFamily:"monospace"}}>{s.eq}</span>
      </div>))}
    </Card>
  </div>);
}
