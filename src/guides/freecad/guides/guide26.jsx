import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide26(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e74c3c":"1.5px solid #243a52",background:active?"#2a1a1a":"#162a3d",color:active?"#e74c3c":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const modes=[
    {label:"STEP (solid import)",color:"#27ae60",status:"Workable",
      steps:["File > Import > .step or .stp","Result: a non-parametric Part solid in the tree","To use in Part Design: wrap in a Body, or use as a SubShapeBinder source","Edges and faces are preserved as clean B-rep geometry"],
      note:"STEP is the right format for vendor-supplied mechanical parts — motor mounts, bearings, brackets. The solid arrives clean and can be used as a reference or boolean partner."},
    {label:"Mesh (STL/OBJ)",color:"#e74c3c",status:"Painful",
      steps:["File > Import > .stl — result is a Mesh object, not a solid","Mesh workbench > Mesh tools > Evaluate & Repair to clean any defects","Mesh > Mesh to Shape (optional: Refine shape from mesh — lossy)","Part > Convert to solid — often fails on complex/organic geometry"],
      note:"High-poly or organic meshes frequently fail conversion. Even when it succeeds, the result is a faceted solid with thousands of tiny triangular faces — unusable for further Part Design features."},
  ];
  const m=modes[mode];
  return(<div>
    <DarkBox title="STEP &amp; MESH IMPORT"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Two completely different import workflows. <strong style={{color:"#27ae60"}}>STEP</strong> preserves solid geometry — proper parametric-ish exchange format. <strong style={{color:"#e74c3c"}}>STL/mesh</strong> is a tessellated surface — conversion to solid is lossy, slow, and often fails.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.label}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:`1px solid ${m.color}44`,overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"8px 14px",background:m.color+"22",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:13,fontWeight:700,color:m.color}}>{m.label}</span>
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:m.color+"22",color:m.color,fontWeight:700}}>{m.status}</span>
      </div>
      {m.steps.map((s,i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56",display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:12,color:m.color,fontWeight:700,flexShrink:0}}>{i+1}.</span>
        <span style={{fontSize:13,color:"#e8ecf0"}}>{s}</span>
      </div>))}
      <div style={{padding:"10px 14px",borderTop:"1px solid #1e3a56",fontSize:12,color:"#8fa3b8",lineHeight:1.5}}>{m.note}</div>
    </div>
    <Insight text="If the vendor offers STEP, take STEP. For Thingiverse/Printables downloads that are only STL, expect mesh-to-solid conversion to fail on anything organic. Re-modeling from scratch is often faster than repairing a broken conversion." />
  </div>);
}
