import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide11(){
  const [width,setWidth]=useState(40);
  const shortcuts=[
    {key:"D",action:"Dimension (contextual: distance, radius, angle…)"},
    {key:"K, D",action:"Distance — point-to-point / length (legacy)"},
    {key:"L",action:"Horizontal distance"},
    {key:"I",action:"Vertical distance"},
    {key:"K, R",action:"Radius"},
    {key:"K, O",action:"Diameter"},
    {key:"K, A",action:"Angle"},
    {key:"K, L",action:"Lock (fix X and Y of a point)"},
  ];
  const rx=160-width*1.5;const rx2=160+width*1.5;
  const ry1=80;const ry2=160;
  return(<div>
    <DarkBox title="DIMENSIONAL CONSTRAINTS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Dimensional constraints add <strong style={{color:"#3498db"}}>numbers to the sketch</strong> — distance, radius, diameter, angle. Each accepts an <strong style={{color:"#f39c12"}}>expression</strong> like <code style={{color:"#f39c12",background:"#1e3a56",borderRadius:4,padding:"1px 6px",fontSize:12}}>= Spreadsheet.width / 2</code> to drive multiple dimensions from one source.
    </div></DarkBox>
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontSize:12,color:"#8fa3b8"}}>Live width dimension:</span>
        <span style={{fontSize:14,fontWeight:700,color:"#f39c12"}}>{width} mm</span>
      </div>
      <input type="range" min={10} max={80} value={width} onChange={e=>setWidth(+e.target.value)}
        style={{width:"100%",accentColor:"#f39c12",cursor:"pointer"}} />
    </div>
    <SketchDiagram
      title={`Width = ${width} mm — drag slider to update`}
      width={320} height={220}
      geometry={[
        {type:"line",x1:rx,y1:ry1,x2:rx2,y2:ry1},
        {type:"line",x1:rx2,y1:ry1,x2:rx2,y2:ry2},
        {type:"line",x1:rx2,y1:ry2,x2:rx,y2:ry2},
        {type:"line",x1:rx,y1:ry2,x2:rx,y2:ry1},
      ]}
      constraints={[
        {type:"horizontal",at:{x:160,y:ry1}},
        {type:"vertical",at:{x:rx,y:120}},
        {type:"fix",at:{x:rx,y:ry2}},
      ]}
      dimensions={[
        {from:{x:rx,y:ry1-14},to:{x:rx2,y:ry1-14},value:`${width} mm`},
        {from:{x:rx2+14,y:ry1},to:{x:rx2+14,y:ry2},value:"80 mm"},
      ]}
    />
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Dimension shortcuts (FreeCAD 1.0)</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
        {shortcuts.map((sc,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderTop:"1px solid #1e3a56",borderRight:i%2===0?"1px solid #1e3a56":"none"}}>
          <kbd style={{background:"#0f2a3d",border:"1px solid #2a4060",borderRadius:4,padding:"2px 7px",fontSize:11,color:"#3498db",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"}}>{sc.key}</kbd>
          <span style={{fontSize:11,color:"#8fa3b8"}}>{sc.action}</span>
        </div>))}
      </div>
    </div>
    <Insight text="Use D (Dimension) by default in FreeCAD 1.0 — it picks the right kind of constraint (distance, radius, angle) based on what you select. K, D is the legacy point-to-point distance tool; reach for it only when you want that specific behavior." />
  </div>);
}
