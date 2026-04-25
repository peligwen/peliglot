import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide1(){
  const [unitSys,setUnitSys]=useState(0);
  const systems=[
    {label:"Standard (mm/kg/s/deg)",sketch:"Dimensions in mm",weight:"kg",angle:"degrees",note:"What slicers expect. Every dimension you type is millimetres."},
    {label:"Imperial (decimal in/lb)",sketch:"Dimensions in decimal inches",weight:"lb",angle:"degrees",note:"All dims show as inches. Slicers still receive mm in STL — but your sketch labels will say in, which causes constant mental conversion. Avoid."},
  ];
  const sys=systems[unitSys];
  const prefs=[
    {path:"Edit > Preferences > General","setting":"Auto-save every 5 min","value":"ON"},
    {path:"Edit > Preferences > General","setting":"Create backup files (keep ≥ 2)","value":"ON"},
    {path:"Edit > Preferences > Units","setting":"Unit system","value":"Standard (mm)"},
    {path:"Edit > Preferences > Part Design","setting":"Auto refine model","value":"Default ON; toggle OFF if you hit helix/thread/cascading-fillet weirdness after booleans"},
  ];
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  return(<div>
    <DarkBox title="UNITS & SETUP"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      FreeCAD starts with <strong style={{color:"#e67e22"}}>no unit system enforced</strong> until you set it. For 3D printing you must commit to <strong style={{color:"#e67e22"}}>metric mm</strong> immediately — slicers (PrusaSlicer, Cura, Bambu Studio) all assume millimetres. Set this in <strong style={{color:"#f39c12"}}>Edit &gt; Preferences &gt; Units</strong> before drawing anything.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {systems.map((s,i)=>(<button key={i} onClick={()=>setUnitSys(i)} style={btnStyle(unitSys===i)}>{s.label}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:"1px solid #243a52",marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:"#e67e22",marginBottom:6}}>{sys.label}</div>
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 12px",fontSize:12}}>
        <span style={{color:"#607387"}}>Sketch dims:</span><span style={{color:"#e8ecf0"}}>{sys.sketch}</span>
        <span style={{color:"#607387"}}>Mass:</span><span style={{color:"#e8ecf0"}}>{sys.weight}</span>
        <span style={{color:"#607387"}}>Angle:</span><span style={{color:"#e8ecf0"}}>{sys.angle}</span>
      </div>
      <div style={{marginTop:8,fontSize:12,color:unitSys===0?"#27ae60":"#e74c3c",fontWeight:600}}>{sys.note}</div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",marginBottom:14,overflow:"hidden"}}>
      <div style={{padding:"8px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>First-run preferences</div>
      {prefs.map((p,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<prefs.length-1?"1px solid #1e3a56":"none",display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"start"}}>
        <div><div style={{fontSize:11,color:"#8fa3b8",marginBottom:2}}>{p.path}</div><div style={{fontSize:13,color:"#e8ecf0",fontWeight:600}}>{p.setting}</div></div>
        <div style={{fontSize:12,color:"#e67e22",fontWeight:700,textAlign:"right",whiteSpace:"nowrap"}}>{p.value}</div>
      </div>))}
    </div>
    <Insight text="Save (Ctrl+S) before every Pad, Pocket, or sketch close. FreeCAD can crash on complex operations; losing 30 minutes of modeling is the #1 preventable loss." />
  </div>);
}
