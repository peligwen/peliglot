import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide12(){
  const [l,setL]=useState(10);const [w,setW]=useState(8);const [h,setH]=useState(6);
  return(<div>
    <DarkBox title="How much it holds (volume) vs how much wrapping (surface area)"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Volume</strong> = 3D space inside (cubic units). <strong style={{color:"#FFE77A"}}>Surface area</strong> = total outside area. Volume = how much water it holds. Surface area = how much paint to cover it.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Length" min={1} max={20} value={l} onChange={setL} color="#1565C0" unit=" ft"/>
      <Slider label="Width" min={1} max={20} value={w} onChange={setW} color="#2E7D32" unit=" ft"/>
      <Slider label="Height" min={1} max={20} value={h} onChange={setH} color="#E65100" unit=" ft"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{padding:"12px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Volume</div><div style={{fontSize:22,fontWeight:800,color:"#1565C0"}}>{(l*w*h).toLocaleString()} ft³</div><div style={{fontSize:10,color:"#888"}}>{l} × {w} × {h}</div></div>
        <div style={{padding:"12px",background:"#FFF3E0",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Surface Area</div><div style={{fontSize:22,fontWeight:800,color:"#E65100"}}>{(2*(l*w+l*h+w*h)).toLocaleString()} ft²</div><div style={{fontSize:10,color:"#888"}}>2(lw+lh+wh)</div></div>
      </div>
    </div>
    <Insight text="To find how much soil for a garden bed: Volume = length × width × depth. A 4×8 ft bed that's 1 ft deep = 32 cubic feet of soil. Most bags are 1-2 cubic feet." />
  </div>);
}
