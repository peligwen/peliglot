import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide20(){
  const [deg,setDeg]=useState(1);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const angles=[0,1,2,3,5];
  const taper=Math.tan(deg*Math.PI/180)*80;
  return(<div>
    <DarkBox title="DRAFT"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e67e22"}}>Draft</strong> adds a taper angle to a face. Essential for injection molding (parts release from the mold). For 3D printing it&apos;s niche but useful — a small draft on vertical walls can reduce &quot;elephant&apos;s foot&quot; visibility at the print bed, and it future-proofs a part for eventual tooling.
    </div></DarkBox>
    <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Draft angle</div>
    <div style={{display:"flex",gap:6,marginBottom:16,justifyContent:"center"}}>
      {angles.map((a,i)=>(<button key={i} onClick={()=>setDeg(a)} style={btnStyle(deg===a)}>{a}°</button>))}
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>
        {deg===0?"No draft — vertical wall":deg<=2?"Subtle taper ("+deg+"°) — barely visible":"Obvious taper ("+deg+"°) — visible difference"}
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width={320} height={200} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* neutral plane bottom */}
          <line x1={60} y1={170} x2={260} y2={170} stroke="#607387" strokeWidth={1} strokeDasharray="5,3"/>
          <text x={40} y={175} fontSize={9} fill="#607387">Neutral</text>
          {/* drafted block */}
          <polygon points={`${100+taper},${90} ${220-taper},${90} 220,170 100,170`} fill="none" stroke="#e67e22" strokeWidth={2}/>
          {/* undrafted reference ghost */}
          <line x1={100} y1={90} x2={100} y2={170} stroke="#607387" strokeWidth={1} strokeDasharray="4,3"/>
          <line x1={220} y1={90} x2={220} y2={170} stroke="#607387" strokeWidth={1} strokeDasharray="4,3"/>
          {/* angle indicator */}
          {deg>0&&<>
            <path d={`M100,130 A20,20 0 0,1 ${100+taper*0.6},${130-12}`} fill="none" stroke="#f39c12" strokeWidth={1}/>
            <text x={80} y={125} fontSize={10} fill="#f39c12" fontWeight={700}>{deg}°</text>
          </>}
          <text x={160} y={40} textAnchor="middle" fontSize={11} fill="#e8ecf0">Draft = {deg}°</text>
        </svg>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.6}}>
      Draft needs a <strong style={{color:"#e8ecf0"}}>neutral plane</strong> (the reference face that doesn&apos;t move) and an angle direction. Positive angle grows outward; negative shrinks. For 3D printing, a chamfer on the first layer (bottom edge) solves elephant&apos;s foot better than a full-face draft for most cases.
    </div>
    <Insight text="If you're designing a part for both 3D printing AND a future injection-molded version, add 1° draft early. Costs nothing on FDM; saves a redesign when you move to tooling." />
  </div>);
}
