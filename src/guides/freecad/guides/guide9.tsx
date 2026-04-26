import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import type { GeoShape, SketchConstraint } from './_helpers';
import { Insight, SketchDiagram } from './_helpers';

interface SketchTool {
  name: string;
  shortcut: string;
  desc: string;
  geo: GeoShape[];
  after?: GeoShape[];
  constraints?: SketchConstraint[];
  caption: string;
}

export function Guide9(){
  const [tool,setTool]=useState(0);
  const btnStyle=(active: boolean)=>({padding:"5px 12px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const tools: SketchTool[]=[
    {name:"Trim",shortcut:"G, T",desc:"Click a segment to remove it at intersections. Best for cleaning up overlapping or crossed lines.",
     geo:[{type:"line",x1:60,y1:110,x2:260,y2:110},{type:"line",x1:160,y1:40,x2:160,y2:180}],
     after:[{type:"line",x1:60,y1:110,x2:160,y2:110},{type:"line",x1:160,y1:40,x2:160,y2:110}],
     caption:"Trimmed: right segment and bottom segment removed at intersection"},
    {name:"Extend",shortcut:"G, Q",desc:"Click a segment's endpoint to extend it to meet another element.",
     geo:[{type:"line",x1:80,y1:110,x2:160,y2:110},{type:"line",x1:160,y1:50,x2:250,y2:170}],
     caption:"Extend short horizontal to meet the diagonal"},
    {name:"Split",shortcut:"G, Z",desc:"Click a point on a segment to split it into two segments joined at that point.",
     geo:[{type:"line",x1:60,y1:110,x2:260,y2:110}],
     constraints:[{type:"coincident",at:{x:160,y:110}}],
     caption:"One line split into two at midpoint — each segment is now independent"},
    {name:"Fillet",shortcut:"G, F, F",desc:"Click a corner where two lines meet to replace it with a tangent arc.",
     geo:[{type:"line",x1:80,y1:160,x2:160,y2:160},{type:"line",x1:160,y1:60,x2:160,y2:160},{type:"arc",cx:160,cy:130,r:30,start:180,end:270}],
     caption:"Corner replaced with a tangent arc — tangent constraints applied automatically"},
    {name:"Offset",shortcut:"Sketcher menu",desc:"Creates an offset copy of selected geometry at a specified distance. Great for wall-thickness outlines.",
     geo:[{type:"line",x1:100,y1:70,x2:220,y2:70},{type:"line",x1:220,y1:70,x2:220,y2:150},{type:"line",x1:220,y1:150,x2:100,y2:150},{type:"line",x1:100,y1:150,x2:100,y2:70},{type:"line",x1:75,y1:45,x2:245,y2:45},{type:"line",x1:245,y1:45,x2:245,y2:175},{type:"line",x1:245,y1:175,x2:75,y2:175},{type:"line",x1:75,y1:175,x2:75,y2:45}],
     caption:"Offset: outer rectangle is offset copy of inner — constant wall thickness"},
  ];
  const t=tools[tool];
  return(<div>
    <DarkBox title="SKETCH EDITING TOOLS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      After drawing comes cleaning up. <strong style={{color:"#f39c12"}}>Trim (G, T)</strong> and <strong style={{color:"#f39c12"}}>Extend (G, Q)</strong> are the most-used. Fillet builds sketch-level rounded corners so you don&apos;t need to add a Part Design fillet feature later.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {tools.map((to,i)=>(<button key={i} onClick={()=>setTool(i)} style={btnStyle(tool===i)}>{to.name}</button>))}
    </div>
    <SketchDiagram title={t.caption} width={320} height={200} geometry={t.geo} constraints={t.constraints||[]} />
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:"1px solid #243a52",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <span style={{fontSize:13,fontWeight:700,color:"#f39c12"}}>{t.name}</span>
        <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:5,padding:"2px 8px",fontSize:11,color:"#f39c12",fontFamily:"monospace",fontWeight:700}}>{t.shortcut}</kbd>
      </div>
      <div style={{fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>{t.desc}</div>
    </div>
    <Insight text="Trim (G, T) is the tool you reach for when you've drawn a profile with overlapping lines — just click the bits that shouldn't be there. Faster than deleting and redrawing." />
  </div>);
}
