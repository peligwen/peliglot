import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, FeatureTree } from './_helpers';

export function Guide25(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #9b59b6":"1.5px solid #243a52",background:active?"#1a1a3a":"#162a3d",color:active?"#9b59b6":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const modes=[
    {label:"External Geometry (avoid)",color:"#e74c3c",desc:"In Sketcher, click 'External Geometry' then pick an edge/vertex on another body. Blue reference lines appear in your sketch. These lines are tied to the original edge by its topological name — which can change when upstream features are edited (classic TNP). Result: your sketch turns red, feature fails, painful debugging.",status:"Fragile"},
    {label:"ShapeBinder (recommended)",color:"#27ae60",desc:"In Part Design, use 'Model > Helpers > SubShapeBinder' to copy referenced geometry into the current body as a persistent sub-shape. The binder holds a stable copy that survives upstream edits far better than raw External Geometry. One extra step at creation; saves hours later.",status:"Stable"},
  ];
  const m=modes[mode];
  const binderTree=[
    {icon:"🎁",label:"Body (Target)",highlighted:true,children:[
      {icon:"🔗",label:"SubShapeBinder (from Body001)",highlighted:false,children:[]},
      {icon:"✏️",label:"Sketch (uses binder as reference)",children:[]},
      {icon:"⬆️",label:"Pad",children:[]},
    ]},
    {icon:"🎁",label:"Body001 (Source)",children:[
      {icon:"✏️",label:"Sketch002",children:[]},
      {icon:"⬆️",label:"Pad001 ← referenced",children:[]},
    ]},
  ];
  return(<div>
    <DarkBox title="SHAPEBINDERS &amp; EXTERNAL GEO"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      When a sketch in one body needs to reference geometry from another body, you have two options: <strong style={{color:"#e74c3c"}}>External Geometry</strong> (fragile, breaks easily) and <strong style={{color:"#27ae60"}}>ShapeBinder</strong> (stable, the right answer for any serious model).
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.label}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:`1px solid ${m.color}44`,marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <span style={{fontSize:13,fontWeight:700,color:m.color}}>{m.label}</span>
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:m.color+"22",color:m.color,fontWeight:700}}>{m.status}</span>
      </div>
      <div style={{fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>{m.desc}</div>
    </div>
    {mode===1&&<FeatureTree title="ShapeBinder in model tree" nodes={binderTree}/>}
    <Insight text="Any time you'd use External Geometry across bodies, use a ShapeBinder instead. It's an extra step at creation but saves hours when you inevitably edit upstream features." />
  </div>);
}
