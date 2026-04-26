import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import type { GeoShape } from './_helpers';
import { Insight, SketchDiagram } from './_helpers';

export function Guide14(){
  const [mode,setMode]=useState(0);
  const [symmetric,setSymmetric]=useState(false);
  const btnStyle=(active: boolean)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #27ae60":"1.5px solid #243a52",background:active?"#0d2419":"#162a3d",color:active?"#27ae60":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const modes=[
    {name:"Dimension",desc:"Extrude N mm in the positive normal direction. Most common. Enter the depth in the dialog.",tip:"The standard choice. You control exactly how thick the part is.",tnp:"Safe"},
    {name:"Through all",desc:"Extrude through the entire body, regardless of thickness. Auto-adjusts if upstream thickness changes.",tip:"Use when the depth is 'all the way' rather than a specific number.",tnp:"Very safe"},
    {name:"Two Dimensions",desc:"Different depths in the positive and negative normal direction. Good for asymmetric extrusions off a midplane.",tip:"Use when you need more material on one side than the other.",tnp:"Safe"},
    {name:"To first",desc:"Extrude until the solid hits the next face in its path. Stops automatically.",tip:"Convenient for adaptive parts, but if the target face changes, the Pad may fail or change depth unexpectedly.",tnp:"Fragile (TNP-risk)"},
    {name:"To last",desc:"Extrude through the body and stop at the last face encountered along the path.",tip:"Useful for plates with stepped thicknesses; new in modern releases.",tnp:"Moderate (TNP-risk)"},
    {name:"Up to face",desc:"Extrude until the solid reaches a specific picked face. You click the face to select.",tip:"Predictable shape but tied to that specific face — TNP-risk if upstream geometry changes.",tnp:"Fragile (TNP-risk)"},
    {name:"Up to shape",desc:"New in FreeCAD 1.0. Extrude until the solid reaches multiple faces of a selected shape — handles compound stop conditions.",tip:"Use when one face isn't enough (e.g. uneven top surface). Replaces clunkier workarounds from 0.21.",tnp:"Moderate (TNP-risk)"},
  ];
  const m=modes[mode];
  const sketchGeo: GeoShape[]=[{type:"line",x1:90,y1:170,x2:230,y2:170},{type:"line",x1:230,y1:170,x2:230,y2:190},{type:"line",x1:230,y1:190,x2:90,y2:190},{type:"line",x1:90,y1:190,x2:90,y2:170}];
  const symArrows: GeoShape[]=[{type:"line",x1:160,y1:180,x2:160,y2:115},{type:"line",x1:160,y1:180,x2:160,y2:245}];
  const arrows: GeoShape[][]=[
    symmetric?symArrows:[{type:"line",x1:160,y1:170,x2:160,y2:100}],
    symmetric?symArrows:[{type:"line",x1:160,y1:170,x2:160,y2:30}],
    [{type:"line",x1:160,y1:170,x2:160,y2:90},{type:"line",x1:160,y1:190,x2:160,y2:230}],
    [{type:"line",x1:160,y1:170,x2:160,y2:70}],
    [{type:"line",x1:160,y1:170,x2:160,y2:55}],
    [{type:"line",x1:160,y1:170,x2:160,y2:75},{type:"line",x1:90,y1:75,x2:230,y2:75}],
    [{type:"line",x1:160,y1:170,x2:160,y2:60},{type:"line",x1:80,y1:60,x2:140,y2:60},{type:"line",x1:180,y1:60,x2:240,y2:60}],
  ];
  const arrowLabels: string[]=[symmetric?"↑ N/2  ↓ N/2":"↑ N mm",symmetric?"↑/↓ all the way":"↑ all the way","↑ more ↓ less","↑ to first face","↑ to last face","↑ to picked face","↑ to multiple faces"];
  const symmetricAllowed=mode===0||mode===1;
  return(<div>
    <DarkBox title="PAD — EXTRUDE TO SOLID"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#27ae60"}}>Pad</strong> takes a closed sketch and extrudes it into a solid. FreeCAD 1.0 has 7 Type modes plus a <strong style={{color:"#27ae60"}}>Symmetric to plane</strong> checkbox that combines with Dimension or Through-all. Pick the mode that matches how the depth is constrained — by a number, by &quot;all the way&quot;, or by a face you can point at.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:8,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.name}</button>))}
    </div>
    <div style={{display:"flex",gap:8,alignItems:"center",justifyContent:"center",marginBottom:12,fontSize:12,color:symmetricAllowed?"#e8ecf0":"#607387"}}>
      <button onClick={()=>symmetricAllowed&&setSymmetric(!symmetric)} disabled={!symmetricAllowed} style={{padding:"4px 10px",borderRadius:6,border:`1.5px solid ${symmetric&&symmetricAllowed?"#27ae60":"#243a52"}`,background:symmetric&&symmetricAllowed?"#0d2419":"#162a3d",color:symmetric&&symmetricAllowed?"#27ae60":"#8fa3b8",cursor:symmetricAllowed?"pointer":"not-allowed",fontWeight:700,fontSize:12}}>
        {symmetric&&symmetricAllowed?"☑":"☐"} Symmetric to plane
      </button>
      <span style={{fontSize:11,fontStyle:"italic"}}>{symmetricAllowed?"checkbox modifier — combines with Dimension or Through-all":"only valid with Dimension or Through-all"}</span>
    </div>
    <SketchDiagram
      title={`${m.name}${symmetric&&symmetricAllowed?" + Symmetric":""}: ${arrowLabels[mode]}`}
      width={320} height={260}
      geometry={[...sketchGeo,...(arrows[mode]||[])]}
      constraints={[]}
    />
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #27ae6044",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:700,color:"#27ae60"}}>{m.name}</span>
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:m.tnp.includes("Safe")?"#27ae6022":"#e74c3c22",color:m.tnp.includes("Safe")?"#27ae60":"#e74c3c",fontWeight:700}}>{m.tnp}</span>
      </div>
      <p style={{fontSize:13,color:"#e8ecf0",lineHeight:1.6,marginBottom:4}}>{m.desc}</p>
      <p style={{fontSize:12,color:"#8fa3b8",fontStyle:"italic"}}>{m.tip}</p>
    </div>
    <Insight text="Symmetric (the checkbox) on a centered datum is the cleanest, TNP-safest approach for parts that need to grow in both directions. For asymmetric parts (where one side is mounted/referenced), don&apos;t force Symmetric — plain Dimension off the appropriate face is clearer and just as stable." />
  </div>);
}
