import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide13(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #3498db":"1.5px solid #243a52",background:active?"#0f2a3d":"#162a3d",color:active?"#3498db":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  return(<div>
    <DarkBox title="SYMMETRY & MIRROR"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      When a part is symmetric (most are), build <strong style={{color:"#3498db"}}>half and let FreeCAD mirror it</strong>. Add a construction centerline, then use the <strong style={{color:"#3498db"}}>Symmetric constraint (K, S)</strong> to lock two points across the axis. Half the geometry, half the constraints, half the breakage risk.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {["Manual (two separate rects)","Symmetric constraint"].map((t,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{t}</button>))}
    </div>
    {mode===0&&<SketchDiagram
      title="Manual mirror — two rectangles, each needing full constraints"
      width={320} height={200}
      geometry={[
        {type:"line",x1:40,y1:70,x2:140,y2:70},
        {type:"line",x1:140,y1:70,x2:140,y2:150},
        {type:"line",x1:140,y1:150,x2:40,y2:150},
        {type:"line",x1:40,y1:150,x2:40,y2:70},
        {type:"line",x1:180,y1:70,x2:280,y2:70},
        {type:"line",x1:280,y1:70,x2:280,y2:150},
        {type:"line",x1:280,y1:150,x2:180,y2:150},
        {type:"line",x1:180,y1:150,x2:180,y2:70},
      ]}
      constraints={[
        {type:"horizontal",at:{x:90,y:70}},{type:"horizontal",at:{x:90,y:150}},
        {type:"horizontal",at:{x:230,y:70}},{type:"horizontal",at:{x:230,y:150}},
        {type:"fix",at:{x:40,y:150}},{type:"fix",at:{x:180,y:150}},
      ]}
    />}
    {mode===1&&<SketchDiagram
      title="Symmetric constraint — one rect + construction centerline, right side auto-mirrors"
      width={320} height={200}
      geometry={[
        {type:"line",x1:160,y1:20,x2:160,y2:190,construction:true},
        {type:"line",x1:60,y1:70,x2:160,y2:70},
        {type:"line",x1:160,y1:70,x2:160,y2:150},
        {type:"line",x1:160,y1:150,x2:60,y2:150},
        {type:"line",x1:60,y1:150,x2:60,y2:70},
        {type:"line",x1:160,y1:70,x2:260,y2:70},
        {type:"line",x1:260,y1:70,x2:260,y2:150},
        {type:"line",x1:260,y1:150,x2:160,y2:150},
      ]}
      constraints={[
        {type:"vertical",at:{x:160,y:110}},
        {type:"symmetric",at:{x:160,y:70}},
        {type:"symmetric",at:{x:160,y:150}},
        {type:"fix",at:{x:160,y:150}},
      ]}
    />}
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.6}}>
      {mode===0
        ?"Manual approach: each rectangle needs its own full set of constraints — position, width, height, alignment between them. 4× the work, and any alignment error breaks the symmetry silently."
        :"Symmetric constraint (K, S): select two points and a line. FreeCAD keeps them mirrored about that line automatically. Change the left rectangle; the right updates instantly."}
    </div>
    <Insight text="Draw half of a symmetric part. Add one construction centerline. Use symmetric constraints to mirror across it. You've just deleted half the work of modeling — and symmetric parts print stronger." />
  </div>);
}
