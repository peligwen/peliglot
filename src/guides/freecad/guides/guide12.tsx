import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import type { GeoShape, SketchConstraint, SketchDimension } from './_helpers';
import { Insight, SketchDiagram } from './_helpers';

interface ConstraintState {
  label: string;
  dof: number;
  color: string;
  status: string;
  desc: string;
  geo: GeoShape[];
  cc: SketchConstraint[];
  dims: SketchDimension[];
}

export function Guide12(){
  const [state,setState]=useState(0);
  const btnStyle=(active: boolean)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #3498db":"1.5px solid #243a52",background:active?"#0f2a3d":"#162a3d",color:active?"#3498db":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const states: ConstraintState[]=[
    {label:"Empty (4 DoF)",dof:4,color:"#8fa3b8",status:"Unconstrained",desc:"The rectangle can be dragged anywhere — 4 degrees of freedom remain.",geo:[{type:"line",x1:80,y1:70,x2:240,y2:70},{type:"line",x1:240,y1:70,x2:240,y2:160},{type:"line",x1:240,y1:160,x2:80,y2:160},{type:"line",x1:80,y1:160,x2:80,y2:70}],cc:[],dims:[]},
    {label:"2 constraints (2 DoF)",dof:2,color:"#e67e22",status:"Under-constrained",desc:"Horizontal and vertical constraints lock the shape. It can still translate anywhere in the plane.",geo:[{type:"line",x1:80,y1:70,x2:240,y2:70},{type:"line",x1:240,y1:70,x2:240,y2:160},{type:"line",x1:240,y1:160,x2:80,y2:160},{type:"line",x1:80,y1:160,x2:80,y2:70}],cc:[{type:"horizontal",at:{x:160,y:70}},{type:"horizontal",at:{x:160,y:160}},{type:"vertical",at:{x:80,y:115}},{type:"vertical",at:{x:240,y:115}}],dims:[]},
    {label:"3 constraints (1 DoF)",dof:1,color:"#f39c12",status:"Almost there",desc:"Width dimension added. The rectangle can still translate along one axis.",geo:[{type:"line",x1:80,y1:70,x2:240,y2:70},{type:"line",x1:240,y1:70,x2:240,y2:160},{type:"line",x1:240,y1:160,x2:80,y2:160},{type:"line",x1:80,y1:160,x2:80,y2:70}],cc:[{type:"horizontal",at:{x:160,y:70}},{type:"horizontal",at:{x:160,y:160}},{type:"vertical",at:{x:80,y:115}},{type:"vertical",at:{x:240,y:115}}],dims:[{from:{x:80,y:58},to:{x:240,y:58},value:"160 mm"}]},
    {label:"Fully constrained (0 DoF)",dof:0,color:"#27ae60",status:"Green — fully constrained",desc:"Width, height, and a fixed corner. 0 DoF. The sketch turns green in FreeCAD's status bar.",geo:[{type:"line",x1:80,y1:70,x2:240,y2:70},{type:"line",x1:240,y1:70,x2:240,y2:160},{type:"line",x1:240,y1:160,x2:80,y2:160},{type:"line",x1:80,y1:160,x2:80,y2:70}],cc:[{type:"horizontal",at:{x:160,y:70}},{type:"horizontal",at:{x:160,y:160}},{type:"vertical",at:{x:80,y:115}},{type:"vertical",at:{x:240,y:115}},{type:"fix",at:{x:80,y:160}}],dims:[{from:{x:80,y:58},to:{x:240,y:58},value:"160 mm"},{from:{x:254,y:70},to:{x:254,y:160},value:"90 mm"}]},
  ];
  const s=states[state];
  return(<div>
    <DarkBox title="DEGREES OF FREEDOM"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      The Sketcher status bar shows <strong style={{color:"#3498db"}}>degrees of freedom (DoF)</strong>. Target: <strong style={{color:"#27ae60"}}>0 DoF</strong> — the sketch turns green. Under-constrained (white) = geometry can still move. Over-constrained (red) = conflicting constraints, must resolve.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {states.map((st,i)=>(<button key={i} onClick={()=>setState(i)} style={btnStyle(state===i)}>{st.label}</button>))}
    </div>
    <div style={{display:"flex",justifyContent:"center",marginBottom:8}}>
      <div style={{background:s.color+"22",border:`1.5px solid ${s.color}`,borderRadius:8,padding:"4px 16px",fontSize:12,fontWeight:700,color:s.color}}>DoF: {s.dof} — {s.status}</div>
    </div>
    <SketchDiagram title={s.desc} width={320} height={200} geometry={s.geo} constraints={s.cc} dimensions={s.dims} />
    <Insight text="Drag a vertex in the Sketcher. If anything moves, you're not fully constrained. The green 'Fully constrained sketch' label in the status bar is the only proof — don't trust your eyes." />
  </div>);
}
