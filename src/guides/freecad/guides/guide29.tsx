import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide29(){
  const [qual,setQual]=useState(1);
  const btnStyle=(active: boolean)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e74c3c":"1.5px solid #243a52",background:active?"#2a1a1a":"#162a3d",color:active?"#e74c3c":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const qualities=[
    {label:"Low",angDev:"30°",maxEdge:"0.5mm",fileSize:"Smallest",note:"Chunky curved surfaces — visible faceting. Use only for quick test slices.",vc:"#e74c3c"},
    {label:"Standard",angDev:"15°",maxEdge:"0.3mm",fileSize:"Medium",note:"Good for most functional prints. Curves look smooth at normal print resolutions.",vc:"#27ae60"},
    {label:"Fine",angDev:"5°",maxEdge:"0.1mm",fileSize:"Large",note:"Use for visible-surface parts: enclosures, handles, decorative parts. Smooth curves even at close inspection.",vc:"#f39c12"},
    {label:"Very Fine",angDev:"2°",maxEdge:"0.05mm",fileSize:"Very large",note:"Only for tiny, highly detailed parts. File size can be 10–50× Standard — slicers will slow noticeably.",vc:"#8fa3b8"},
  ];
  const q=qualities[qual];
  const steps=[
    "Select Body in model tree",
    "File > Export > choose .stl or .obj",
    "In export dialog: set Surface deviation and Angular deviation",
    "Or use Mesh workbench > Mesh from Shape for more control",
  ];
  return(<div>
    <DarkBox title="STL EXPORT &amp; ORIENTATION"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Export to STL when ready to slice. FreeCAD&apos;s STL dialog has two parameters — <strong style={{color:"#e74c3c"}}>Linear deflection</strong> (max edge length) and <strong style={{color:"#e74c3c"}}>Angular deflection</strong> (degrees). There are no preset names; the labels below are <em>values you&apos;d enter</em> for each quality level.
    </div></DarkBox>
    <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Mesh refinement (values to enter)</div>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {qualities.map((ql,i)=>(<button key={i} onClick={()=>setQual(i)} style={btnStyle(qual===i)}>{ql.label}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:`1px solid ${q.vc}44`,overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"8px 14px",background:q.vc+"22",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#607387"}}>Angular deviation</div><div style={{fontSize:16,fontWeight:800,color:q.vc}}>{q.angDev}</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#607387"}}>Max edge</div><div style={{fontSize:16,fontWeight:800,color:q.vc}}>{q.maxEdge}</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#607387"}}>File size</div><div style={{fontSize:14,fontWeight:700,color:"#8fa3b8"}}>{q.fileSize}</div></div>
      </div>
      <div style={{padding:"10px 14px",fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>{q.note}</div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Export steps</div>
      {steps.map((s,i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56",display:"flex",gap:10}}>
        <span style={{fontSize:12,color:"#e74c3c",fontWeight:700,flexShrink:0}}>{i+1}.</span>
        <span style={{fontSize:13,color:"#e8ecf0"}}>{s}</span>
      </div>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"10px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>
      <strong style={{color:"#e8ecf0"}}>Orientation tip:</strong> before export, orient your model so the face you want on the print bed is horizontal (facing down in FreeCAD&apos;s Z-down world). Many slicers import with the FreeCAD orientation — you can re-orient in the slicer, but setting it correctly in FreeCAD avoids confusion.
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"10px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>
      <strong style={{color:"#e8ecf0"}}>Pick Binary STL, not ASCII</strong> in the export-format dropdown — same geometry, roughly half the file size. Most slicers prefer binary, and you save bandwidth on every download.
    </div>
    <Insight text="For most functional prints, Standard refinement values are fine. Jump to Fine only for visible-curve parts (cases, handles). Very Fine is rarely worth the file-size hit." />
  </div>);
}
