import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide4(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active: boolean)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const modes=[
    {label:"Datum Plane",color:"#27ae60",caption:"Stable — always works",desc:"Sketch lives on the XY, XZ, or YZ origin plane (or a custom datum plane you create). These references never move, never break. Even if you reshape every feature above and below this sketch, the plane stays exactly where it is.",advice:"Use for any sketch you plan to reference from a later feature."},
    {label:"Face",color:"#e67e22",caption:"Convenient, but fragile",desc:"Sketch attaches to an existing face of the model. FreeCAD 1.0's topological naming improvements make this much more reliable than older versions — but the face can still change shape or disappear if upstream features are reordered. Best for quick, terminal sketches.",advice:"FreeCAD 1.0 made this safer, but still prefer datums for sketches other features will reference."},
  ];
  const m=modes[mode];
  return(<div>
    <DarkBox title="SKETCH PLANE CHOICE"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Every 3D feature starts from a <strong style={{color:"#f39c12"}}>2D sketch on a plane</strong>. You have two choices: sketch on a <strong style={{color:"#27ae60"}}>datum plane</strong> (XY/XZ/YZ or a custom datum) — stable and always safe — or sketch on a <strong style={{color:"#e67e22"}}>face of existing geometry</strong> — convenient but historically fragile due to the <strong style={{color:"#e67e22"}}>Topological Naming Problem</strong> (TNP).
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.label}</button>))}
    </div>
    <SketchDiagram
      title={`${m.label} — ${m.caption}`}
      width={320} height={200}
      geometry={mode===0?[
        {type:"line",x1:40,y1:140,x2:280,y2:140,construction:true},
        {type:"line",x1:90,y1:60,x2:230,y2:60},
        {type:"line",x1:230,y1:60,x2:230,y2:140},
        {type:"line",x1:230,y1:140,x2:90,y2:140},
        {type:"line",x1:90,y1:140,x2:90,y2:60},
      ]:[
        {type:"line",x1:70,y1:100,x2:250,y2:100},
        {type:"line",x1:250,y1:100,x2:250,y2:140},
        {type:"line",x1:250,y1:140,x2:70,y2:140},
        {type:"line",x1:70,y1:140,x2:70,y2:100},
        {type:"line",x1:100,y1:60,x2:220,y2:60},
        {type:"line",x1:220,y1:60,x2:220,y2:100},
        {type:"line",x1:100,y1:100,x2:100,y2:60},
      ]}
      constraints={mode===0?[
        {type:"fix",at:{x:90,y:140}},
      ]:[
        {type:"coincident",at:{x:100,y:100}},
        {type:"coincident",at:{x:220,y:100}},
      ]}
    />
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:`1px solid ${m.color}44`,marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:m.color,marginBottom:6}}>{m.label}</div>
      <p style={{fontSize:13,color:"#e8ecf0",lineHeight:1.6,marginBottom:6}}>{m.desc}</p>
      <div style={{fontSize:12,color:"#8fa3b8",fontStyle:"italic"}}>{m.advice}</div>
    </div>
    <Insight text="If you think you'll reference this sketch from a later feature, sketch on a datum plane. The one extra click at creation saves hours of repair later." />
  </div>);
}
