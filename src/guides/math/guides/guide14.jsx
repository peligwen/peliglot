import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Slider } from './_helpers';

export function Guide14(){
  const [r,setR]=useState(5);
  return(<div>
    <DarkBox title="π = the universal ratio"><div style={{fontSize:14}}>
      Take ANY circle. Divide its circumference by its diameter. You <strong style={{color:"#FFE77A"}}>always get π ≈ 3.14159...</strong> This is true for every circle that has ever existed or ever will. It's a fundamental constant of the universe.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Radius" min={1} max={20} value={r} onChange={setR} color="#E65100" unit=" units"/>
      <div style={{display:"flex",justifyContent:"center",margin:"16px 0"}}>
        <div style={{width:Math.min(r*16,200),height:Math.min(r*16,200),borderRadius:"50%",border:"3px solid #E65100",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>r = {r}</div></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <div style={{padding:"10px",background:"#FFF3E0",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Diameter</div><div style={{fontSize:18,fontWeight:800,color:"#E65100"}}>{r*2}</div></div>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Circumference</div><div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{(2*Math.PI*r).toFixed(1)}</div></div>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Area</div><div style={{fontSize:18,fontWeight:800,color:"#2E7D32"}}>{(Math.PI*r*r).toFixed(1)}</div></div>
      </div>
    </div>
  </div>);
}
