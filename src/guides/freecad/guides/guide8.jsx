import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide8(){
  const [isConstruction,setIsConstruction]=useState(false);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const rectGeo=[
    {type:"line",x1:80,y1:60,x2:240,y2:60},
    {type:"line",x1:240,y1:60,x2:240,y2:160},
    {type:"line",x1:240,y1:160,x2:80,y2:160},
    {type:"line",x1:80,y1:160,x2:80,y2:60},
  ];
  const centerline={type:"line",x1:160,y1:20,x2:160,y2:200,construction:isConstruction};
  return(<div>
    <DarkBox title="CONSTRUCTION GEOMETRY"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#f39c12"}}>Construction geometry</strong> helps you build a sketch but does NOT become part of the 3D feature. Toggle any element to construction with <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:4,padding:"1px 6px",fontSize:11,color:"#f39c12",fontFamily:"monospace"}}>G, N</kbd> after selecting it. Construction geometry appears <strong style={{color:"#3498db"}}>blue and dashed</strong> in the editor, invisible in the 3D result.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",alignItems:"center"}}>
      <button onClick={()=>setIsConstruction(false)} style={btnStyle(!isConstruction)}>Normal (solid edge)</button>
      <button onClick={()=>setIsConstruction(true)} style={btnStyle(isConstruction)}>Construction (dashed)</button>
    </div>
    <SketchDiagram
      title={isConstruction?"Centerline is construction — ignored by Pad/Pocket":"Centerline is normal — becomes an edge in the 3D result (unwanted!)"}
      width={320} height={220}
      geometry={[...rectGeo,centerline]}
      constraints={[{type:"vertical",at:{x:160,y:110}}]}
      highlights={isConstruction?[]:[4]}
    />
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 16px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>
      {isConstruction
        ?<><strong style={{color:"#27ae60"}}>Correct:</strong> The vertical centerline (dashed) is construction geometry. The Pad operation will use only the solid rectangle, producing a clean block with no internal wall.</>
        :<><strong style={{color:"#e74c3c"}}>Problem:</strong> The centerline is a solid edge. FreeCAD will try to include it in the closed profile, creating an invalid or split sketch that can&apos;t be padded cleanly. Toggle it to construction first (<kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:4,padding:"1px 6px",fontSize:11,color:"#f39c12",fontFamily:"monospace"}}>G, N</kbd>).</>
      }
    </div>
    <Insight text="Use construction lines for centerlines, symmetry axes, and guide lines. Any line that should exist for dimensioning but not become a 3D edge should be construction." />
  </div>);
}
