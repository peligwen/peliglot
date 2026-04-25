import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide6(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const modes=[
    {label:"Center + Radius",shortcut:"G, C / G, A",desc:"Pick center, drag to set radius. Most direct when you know the center point."},
    {label:"3 Points",shortcut:"G, 3, C / G, 3, A",desc:"Click 3 points on the circumference. Use when you know where the circle passes through, not its center."},
    {label:"Tangent Arc",shortcut:"G, G",desc:"Start from the endpoint of an existing line. FreeCAD auto-applies the tangent constraint — the arc continues smoothly."},
  ];
  const m=modes[mode];
  return(<div>
    <DarkBox title="CIRCLES & ARCS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Three modes for circles, three for arcs. Pick the mode that matches what you already know. <strong style={{color:"#f39c12"}}>Center+radius</strong> is most common. <strong style={{color:"#f39c12"}}>3-point</strong> is best when you know where the curve passes. <strong style={{color:"#f39c12"}}>Tangent arc (G,G)</strong> builds sketch fillets automatically.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.label}</button>))}
    </div>
    {mode===0&&<SketchDiagram
      title="Center + Radius — center dot, then drag"
      width={320} height={200}
      geometry={[
        {type:"circle",cx:160,cy:100,r:55},
        {type:"point",x:160,y:100},
      ]}
      dimensions={[{from:{x:160,y:100},to:{x:215,y:100},value:"R 55"}]}
    />}
    {mode===1&&<SketchDiagram
      title="3-Point Circle — click three points on the circumference"
      width={320} height={200}
      geometry={[
        {type:"circle",cx:160,cy:100,r:55},
        {type:"point",x:160,y:45},
        {type:"point",x:205,y:128},
        {type:"point",x:115,y:128},
      ]}
    />}
    {mode===2&&<SketchDiagram
      title="Tangent Arc (G,G) — arc from line endpoint, tangent built in"
      width={320} height={200}
      geometry={[
        {type:"line",x1:40,y1:130,x2:160,y2:130},
        {type:"arc",cx:160,cy:80,r:50,start:90,end:180},
      ]}
      constraints={[{type:"tangent",at:{x:160,y:130}}]}
    />}
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:"1px solid #243a52",marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:"#f39c12",marginBottom:4}}>{m.label} <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:5,padding:"1px 7px",fontSize:11,color:"#f39c12",fontFamily:"monospace",fontWeight:700}}>{m.shortcut}</kbd></div>
      <div style={{fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>{m.desc}</div>
    </div>
    <Insight text="Tangent arcs from a line endpoint (G, G after drawing a line) are how you build fillets into sketch profiles — constraints already wired up, no manual tangent needed." />
  </div>);
}
