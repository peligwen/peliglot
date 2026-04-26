import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Slider } from './_helpers';

export function Guide11(){
  const [l,setL]=useState(8);const [w,setW]=useState(5);
  return(<div>
    <DarkBox title="How much space (area) vs how much fence (perimeter)"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Area</strong> = the surface inside a shape (square units). <strong style={{color:"#FFE77A"}}>Perimeter</strong> = the distance around the edge (linear units). Same shape, different questions.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Length" min={1} max={20} value={l} onChange={setL} color="#C62828" unit=" ft"/>
      <Slider label="Width" min={1} max={20} value={w} onChange={setW} color="#1565C0" unit=" ft"/>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
        <div style={{width:Math.min(l*20,300),height:Math.min(w*20,200),background:"#E3F2FD",border:"3px solid #1565C0",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#1565C0"}}>{l*w} ft²</span>
          <span style={{position:"absolute",bottom:-18,fontSize:11,color:"#C62828"}}>{l} ft</span>
          <span style={{position:"absolute",right:-30,fontSize:11,color:"#1565C0",transform:"rotate(90deg)"}}>{w} ft</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:20}}>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Area</div><div style={{fontSize:20,fontWeight:800,color:"#1565C0"}}>{l*w} ft²</div><div style={{fontSize:10,color:"#888"}}>{l} × {w}</div></div>
        <div style={{padding:"10px",background:"#FFEBEE",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Perimeter</div><div style={{fontSize:20,fontWeight:800,color:"#C62828"}}>{2*(l+w)} ft</div><div style={{fontSize:10,color:"#888"}}>2({l}+{w})</div></div>
      </div>
    </div>
    <Card color="#2E7D32" title="Common area formulas">
      {[{shape:"Rectangle",formula:"l × w",note:"Length times width"},{shape:"Triangle",formula:"½ × b × h",note:"Half of base times height"},{shape:"Circle",formula:"π × r²",note:"Pi times radius squared"}].map((f,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontWeight:600,color:"#333"}}>{f.shape}</span>
        <span style={{fontWeight:800,color:"#2E7D32",fontFamily:"monospace"}}>{f.formula}</span>
        <span style={{fontSize:11,color:"#888"}}>{f.note}</span>
      </div>))}
    </Card>
  </div>);
}
