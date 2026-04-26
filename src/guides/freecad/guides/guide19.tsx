import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide19(){
  const [r,setR]=useState(2.0);
  const [isFillet,setIsFillet]=useState(true);
  const btnStyle=(active: boolean)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const px=80;const py=80;const bx=240;const by=180;
  const sc=r*8;
  return(<div>
    <DarkBox title="FILLET &amp; CHAMFER"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e67e22"}}>Fillet</strong> rounds an edge; <strong style={{color:"#e67e22"}}>Chamfer</strong> bevels it. For 3D printing, <strong style={{color:"#f39c12"}}>chamfers print better</strong> than fillets on internal-corner and vertical-to-horizontal transitions — they produce no overhangs requiring support.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      <button onClick={()=>setIsFillet(true)} style={btnStyle(isFillet)}>Fillet (round)</button>
      <button onClick={()=>setIsFillet(false)} style={btnStyle(!isFillet)}>Chamfer (bevel)</button>
    </div>
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:12,color:"#8fa3b8"}}>Radius / size:</span>
        <span style={{fontSize:14,fontWeight:700,color:"#f39c12"}}>{r.toFixed(1)} mm</span>
      </div>
      <input type="range" min={0.5} max={5.0} step={0.5} value={r} onChange={e=>setR(+e.target.value)} style={{width:"100%",accentColor:"#f39c12",cursor:"pointer"}}/>
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>{isFillet?"Fillet":"Chamfer"} — {r.toFixed(1)} mm</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width={320} height={220} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* box body */}
          <line x1={px} y1={py} x2={bx} y2={py} stroke="#8fa3b8" strokeWidth={1.5}/>
          <line x1={px} y1={py} x2={px} y2={by} stroke="#8fa3b8" strokeWidth={1.5}/>
          <line x1={px} y1={by} x2={bx} y2={by} stroke="#8fa3b8" strokeWidth={1.5}/>
          {/* corner treatment */}
          {isFillet?<>
            <line x1={bx} y1={py} x2={bx} y2={by-sc} stroke="#8fa3b8" strokeWidth={1.5}/>
            <path d={`M${bx-sc},${by} A${sc},${sc} 0 0,0 ${bx},${by-sc}`} fill="none" stroke="#e67e22" strokeWidth={2}/>
            <line x1={px} y1={by} x2={bx-sc} y2={by} stroke="#8fa3b8" strokeWidth={1.5}/>
          </>:<>
            <line x1={bx} y1={py} x2={bx} y2={by-sc} stroke="#8fa3b8" strokeWidth={1.5}/>
            <line x1={bx} y1={by-sc} x2={bx-sc} y2={by} stroke="#e67e22" strokeWidth={2}/>
          </>}
          <text x={bx-sc+4} y={by-sc/2} fontSize={10} fill="#e67e22" fontWeight={700}>{r.toFixed(1)}mm</text>
        </svg>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.6}}>
      <strong style={{color:"#f39c12"}}>Variable-radius fillet:</strong> pick an edge, then specify different radii at each vertex. Useful for organic tapers. Apply fillets <strong style={{color:"#e67e22"}}>late in the feature tree</strong> — every fillet adds faces; every face adds TNP risk. A broken fillet cascades through later features.
    </div>
    <Insight text="Chamfer the overhanging edges of downward-facing features (bolt holes, counterbores) at 45°. They print without supports. Fillet the exterior edges where appearance matters. Use chamfer for functionality; fillet for aesthetics." />
  </div>);
}
