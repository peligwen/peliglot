import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import type { GeoShape } from './_helpers';
import { Insight, SketchDiagram } from './_helpers';

export function Guide15(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active: boolean)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #27ae60":"1.5px solid #243a52",background:active?"#0d2419":"#162a3d",color:active?"#27ae60":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const modes=[
    {name:"Dimension",desc:"Cut N mm deep into the solid. Depth is a hard number you enter.",tnp:"Safe",tip:"Use only when the cut depth is a real design requirement — not just 'the current thickness.'"},
    {name:"Through All",desc:"Cut completely through the solid in the normal direction. Doesn't care how thick the part is.",tnp:"Very safe — recommended for holes",tip:"The single best choice for bolt holes, vents, and any cut that should penetrate the part. Future-proof."},
    {name:"Symmetric",desc:"Cut N/2 each direction from the sketch plane. Good for slots centered in a part.",tnp:"Safe",tip:"Use for slots or channels that run through the middle of a symmetric body."},
    {name:"To first",desc:"Cut until the pocket hits the first face in its path.",tnp:"Fragile",tip:"Same caveat as the Pad equivalent — the target face can move."},
    {name:"Up to face",desc:"Cut until the pocket reaches a specific picked face.",tnp:"Fragile",tip:"More targeted than To first, but still a TNP-risk face reference."},
  ];
  const m=modes[mode];
  const blockGeo: GeoShape[]=[
    {type:"line",x1:60,y1:80,x2:260,y2:80},
    {type:"line",x1:260,y1:80,x2:260,y2:180},
    {type:"line",x1:260,y1:180,x2:60,y2:180},
    {type:"line",x1:60,y1:180,x2:60,y2:80},
    {type:"line",x1:120,y1:80,x2:200,y2:80},
  ];
  const cutDepths: GeoShape[][]=[
    [{type:"line",x1:120,y1:80,x2:120,y2:130},{type:"line",x1:120,y1:130,x2:200,y2:130},{type:"line",x1:200,y1:130,x2:200,y2:80}],
    [{type:"line",x1:120,y1:80,x2:120,y2:180},{type:"line",x1:200,y1:80,x2:200,y2:180}],
    [{type:"line",x1:120,y1:55,x2:120,y2:205},{type:"line",x1:200,y1:55,x2:200,y2:205},{type:"line",x1:120,y1:205,x2:200,y2:205},{type:"line",x1:120,y1:55,x2:200,y2:55}],
    [{type:"line",x1:120,y1:80,x2:120,y2:160},{type:"line",x1:120,y1:160,x2:200,y2:160},{type:"line",x1:200,y1:160,x2:200,y2:80}],
    [{type:"line",x1:120,y1:80,x2:120,y2:155},{type:"line",x1:120,y1:155,x2:200,y2:155},{type:"line",x1:200,y1:155,x2:200,y2:80}],
  ];
  const cutLabels: string[]=["N mm deep","Through all — full depth","N/2 each side of plane","To first face","To picked face"];
  return(<div>
    <DarkBox title="POCKET — SUBTRACT FROM SOLID"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#27ae60"}}>Pocket</strong> is the inverse of Pad — it subtracts a sketched profile from the solid. Modes mirror Pad, with <strong style={{color:"#27ae60"}}>Through All</strong> as the killer option for any cut that should fully penetrate the part.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.name}</button>))}
    </div>
    <SketchDiagram
      title={`${m.name}: ${cutLabels[mode]}`}
      width={320} height={220}
      geometry={[...blockGeo,...(cutDepths[mode]||[])]}
      highlights={mode===1?[4,5,6]:mode===0?[5,6,7]:[]}
    />
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #27ae6044",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:700,color:"#27ae60"}}>{m.name}</span>
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:m.tnp.includes("safe")||m.tnp==="Safe"?"#27ae6022":"#e74c3c22",color:m.tnp.includes("safe")||m.tnp==="Safe"?"#27ae60":"#e74c3c",fontWeight:700}}>{m.tnp}</span>
      </div>
      <p style={{fontSize:13,color:"#e8ecf0",lineHeight:1.6,marginBottom:4}}>{m.desc}</p>
      <p style={{fontSize:12,color:"#8fa3b8",fontStyle:"italic"}}>{m.tip}</p>
    </div>
    <Insight text="Pocket through-all is the single most TNP-safe cut. If the hole SHOULD go through, tell FreeCAD so — don't type in a depth that matches the current thickness. Future-you will change the thickness and forget." />
  </div>);
}
