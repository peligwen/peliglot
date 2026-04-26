import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import type { GeoShape, SketchConstraint } from './_helpers';
import { Insight, SketchDiagram } from './_helpers';

export function Guide7(){
  const [shape,setShape]=useState(0);
  const [sides,setSides]=useState(6);
  const btnStyle=(active: boolean)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const sideOpts=[3,4,5,6,8];
  function polyGeo(n: number, cx: number, cy: number, r: number): GeoShape[] {
    const pts=Array.from({length:n},(_,i)=>{const a=(2*Math.PI*i/n)-(Math.PI/2);return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};});
    return pts.map((p,i)=>({type:"line" as const,x1:p.x,y1:p.y,x2:pts[(i+1)%n].x,y2:pts[(i+1)%n].y}));
  }
  const cornerRectGeo: GeoShape[]=[{type:"line",x1:80,y1:60,x2:240,y2:60},{type:"line",x1:240,y1:60,x2:240,y2:150},{type:"line",x1:240,y1:150,x2:80,y2:150},{type:"line",x1:80,y1:150,x2:80,y2:60}];
  const centeredRectGeo: GeoShape[]=[{type:"line",x1:80,y1:55,x2:240,y2:55},{type:"line",x1:240,y1:55,x2:240,y2:155},{type:"line",x1:240,y1:155,x2:80,y2:155},{type:"line",x1:80,y1:155,x2:80,y2:55},{type:"line",x1:160,y1:20,x2:160,y2:190,construction:true}];
  return(<div>
    <DarkBox title="RECTS & POLYGONS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Rectangle is the most common shape. <strong style={{color:"#f39c12"}}>Corner rectangle (G, R)</strong> is the default — click two corners. <strong style={{color:"#f39c12"}}>Centered rectangle (G, V)</strong> draws from center with built-in symmetry — perfect for parts you want mirrored. <strong style={{color:"#f39c12"}}>Polygon (G, P, R)</strong> for nuts, gears, and symmetric parts.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {["Corner Rect","Centered Rect","Polygon"].map((t,i)=>(<button key={i} onClick={()=>setShape(i)} style={btnStyle(shape===i)}>{t}</button>))}
    </div>
    {shape===2&&<div style={{display:"flex",gap:6,marginBottom:10,justifyContent:"center"}}>
      {sideOpts.map(n=>(<button key={n} onClick={()=>setSides(n)} style={{...btnStyle(sides===n),padding:"4px 10px",fontSize:12}}>{n} sides</button>))}
    </div>}
    {shape===0&&<SketchDiagram title="Corner Rectangle (G, R) — click two opposite corners" width={320} height={200} geometry={cornerRectGeo} constraints={[{type:"horizontal",at:{x:160,y:60}},{type:"horizontal",at:{x:160,y:150}},{type:"vertical",at:{x:80,y:105}},{type:"vertical",at:{x:240,y:105}}] as SketchConstraint[]} />}
    {shape===1&&<SketchDiagram title="Centered Rectangle (G, V) — symmetry constraint built in" width={320} height={200} geometry={centeredRectGeo} constraints={[{type:"symmetric",at:{x:160,y:105}}] as SketchConstraint[]} />}
    {shape===2&&<SketchDiagram title={`Regular ${sides}-gon (G, P, R) — dialog asks for side count`} width={320} height={200} geometry={polyGeo(sides,160,105,65)} constraints={[{type:"fix",at:{x:160,y:105}}] as SketchConstraint[]} />}
    <Insight text="Always use centered rectangle when you want the part mirrored about the origin. The symmetry is free; adding it later costs two constraints and a lot of re-dimensioning." />
  </div>);
}
