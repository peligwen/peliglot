import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide14(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #27ae60":"1.5px solid #243a52",background:active?"#0d2419":"#162a3d",color:active?"#27ae60":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const modes=[
    {name:"Dimension",desc:"Extrude N mm in the positive normal direction. Most common. Enter the depth in the dialog.",stability:"Stable",tip:"The standard choice. You control exactly how thick the part is.",tnp:"Safe"},
    {name:"Symmetric",desc:"N/2 mm in each direction from the sketch plane. The sketch sits in the center of the resulting solid.",stability:"Very stable",tip:"Best for parts centered on a datum — no need to adjust origin offset.",tnp:"Very safe — recommended"},
    {name:"Two Dimensions",desc:"Different depths in the positive and negative normal direction. Good for asymmetric extrusions off a midplane.",stability:"Stable",tip:"Use when you need more material on one side than the other.",tnp:"Safe"},
    {name:"Up to First",desc:"Extrude until the solid hits the next face in its path. Stops automatically.",stability:"Fragile",tip:"Convenient for adaptive parts, but if the target face changes, the Pad may fail or change depth unexpectedly.",tnp:"Fragile with TNP changes"},
    {name:"Up to Face",desc:"Extrude until the solid reaches a specific named face. You click the face to pick it.",stability:"Fragile",tip:"More predictable than Up to First, but still tied to a specific face — a TNP-risk reference.",tnp:"Fragile with TNP changes"},
  ];
  const m=modes[mode];
  const sketchGeo=[{type:"line",x1:90,y1:170,x2:230,y2:170},{type:"line",x1:230,y1:170,x2:230,y2:190},{type:"line",x1:230,y1:190,x2:90,y2:190},{type:"line",x1:90,y1:190,x2:90,y2:170}];
  const arrows={
    0:[{type:"line",x1:160,y1:170,x2:160,y2:100}],
    1:[{type:"line",x1:160,y1:180,x2:160,y2:115},{type:"line",x1:160,y1:180,x2:160,y2:245}],
    2:[{type:"line",x1:160,y1:170,x2:160,y2:90},{type:"line",x1:160,y1:190,x2:160,y2:230}],
    3:[{type:"line",x1:160,y1:170,x2:160,y2:70}],
    4:[{type:"line",x1:160,y1:170,x2:160,y2:75},{type:"line",x1:90,y1:75,x2:230,y2:75}],
  };
  const arrowLabels={0:"↑ N mm",1:"↑ N/2  ↓ N/2",2:"↑ more ↓ less",3:"↑ to first face",4:"↑ to named face"};
  return(<div>
    <DarkBox title="PAD — EXTRUDE TO SOLID"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#27ae60"}}>Pad</strong> takes a closed sketch and extrudes it into a solid. Five modes control how far and in which direction. <strong style={{color:"#27ae60"}}>Symmetric</strong> on a centered datum is the most topologically stable option — prefer it by default.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.name}</button>))}
    </div>
    <SketchDiagram
      title={`${m.name}: ${arrowLabels[mode]}`}
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
    <Insight text="Symmetric pad on a centered datum is the cleanest way to model a part — it's topologically stable and matches how you'll mirror features later. Default to it." />
  </div>);
}
