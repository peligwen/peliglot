import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { NumInput } from './_helpers';

export function Guide9(){
  const [dist,setDist]=useState(150);const [rate,setRate]=useState(60);
  const [l,setL]=useState(10);const [w,setW]=useState(12);
  const [c,setC]=useState(20);
  return(<div>
    <DarkBox title="Formulas are reusable equations someone already solved"><div style={{fontSize:14}}>
      You don't need to derive them — just <strong style={{color:"#FFE77A"}}>plug in your numbers</strong>. Every formula is a tool waiting for your specific inputs.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"14px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:"#E65100",marginBottom:8}}>Distance = Rate × Time</div>
      <div style={{display:"flex",gap:8}}><NumInput label="Distance" value={dist} onChange={setDist} unit="miles" color="#E65100"/><NumInput label="Speed" value={rate} onChange={setRate} unit="mph" color="#E65100"/></div>
      <div style={{fontSize:16,fontWeight:700,color:"#E65100",textAlign:"center",padding:"8px",background:"#FFF3E0",borderRadius:8,marginTop:8}}>Time = {(dist/rate).toFixed(1)} hours ({Math.round(dist/rate*60)} min)</div>
    </div>
    <div style={{background:"#fff",borderRadius:14,padding:"14px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:8}}>Area = Length × Width</div>
      <div style={{display:"flex",gap:8}}><NumInput label="Length" value={l} onChange={setL} unit="ft" color="#1565C0"/><NumInput label="Width" value={w} onChange={setW} unit="ft" color="#1565C0"/></div>
      <div style={{fontSize:16,fontWeight:700,color:"#1565C0",textAlign:"center",padding:"8px",background:"#E3F2FD",borderRadius:8,marginTop:8}}>Area = {l*w} sq ft</div>
    </div>
    <div style={{background:"#fff",borderRadius:14,padding:"14px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:"#C62828",marginBottom:8}}>°F ↔ °C</div>
      <NumInput label="°Celsius" value={c} onChange={setC} color="#C62828"/>
      <div style={{fontSize:16,fontWeight:700,color:"#C62828",textAlign:"center",padding:"8px",background:"#FFEBEE",borderRadius:8,marginTop:4}}>{c}°C = {((c*9/5)+32).toFixed(1)}°F</div>
    </div>
  </div>);
}
