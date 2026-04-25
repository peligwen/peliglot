import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide5(){
  const [tool,setTool]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #f39c12":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#f39c12":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const shortcuts=[
    {key:"G, L",action:"Line (single segment)"},
    {key:"G, M",action:"Polyline (connected chain)"},
    {key:"Esc",action:"Exit current tool"},
    {key:"Delete",action:"Delete selected segment"},
  ];
  return(<div>
    <DarkBox title="LINE TOOLS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Two bread-and-butter tools. <strong style={{color:"#f39c12"}}>Line (G, L)</strong> draws a single segment. <strong style={{color:"#f39c12"}}>Polyline (G, M)</strong> draws a connected chain where each new segment automatically gets a <strong style={{color:"#e67e22"}}>coincident constraint</strong> with the previous endpoint — no manual wiring needed.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {["Single Line","Polyline Chain"].map((t,i)=>(<button key={i} onClick={()=>setTool(i)} style={btnStyle(tool===i)}>{t}</button>))}
    </div>
    {tool===0&&<SketchDiagram
      title="Single Line — one segment, no automatic connections"
      width={320} height={160}
      geometry={[{type:"line",x1:60,y1:80,x2:260,y2:80}]}
      constraints={[]}
      dimensions={[{from:{x:60,y:68},to:{x:260,y:68},value:"200 mm"}]}
    />}
    {tool===1&&<SketchDiagram
      title="Polyline — coincident constraints at every joint (orange dots)"
      width={320} height={200}
      geometry={[
        {type:"line",x1:50,y1:160,x2:110,y2:80},
        {type:"line",x1:110,y1:80,x2:180,y2:140},
        {type:"line",x1:180,y1:140,x2:240,y2:60},
        {type:"line",x1:240,y1:60,x2:290,y2:120},
      ]}
      constraints={[
        {type:"coincident",at:{x:110,y:80}},
        {type:"coincident",at:{x:180,y:140}},
        {type:"coincident",at:{x:240,y:60}},
      ]}
    />}
    <div style={{background:"#162a3d",borderRadius:10,padding:"8px 14px",border:"1px solid #243a52",marginBottom:12,fontSize:11,color:"#8fa3b8",lineHeight:1.5,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:10,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>Diagram legend:</span>
      <span><svg width={14} height={14} style={{verticalAlign:"middle"}}><circle cx={7} cy={7} r={4} fill="#e67e22"/></svg> coincident</span>
      <span><svg width={20} height={14} style={{verticalAlign:"middle"}}><line x1={2} y1={7} x2={18} y2={7} stroke="#8fa3b8" strokeWidth={1.5}/></svg> geometry</span>
      <span><svg width={20} height={14} style={{verticalAlign:"middle"}}><line x1={2} y1={7} x2={18} y2={7} stroke="#f39c12" strokeWidth={1.2} strokeDasharray="3,2"/></svg> dimension</span>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Sketcher shortcuts</div>
      {shortcuts.map((sc,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 14px",borderTop:"1px solid #1e3a56"}}>
        <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:5,padding:"2px 8px",fontSize:11,color:"#f39c12",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"}}>{sc.key}</kbd>
        <span style={{fontSize:12,color:"#8fa3b8"}}>{sc.action}</span>
      </div>))}
    </div>
    <Insight text="Polyline's built-in coincident constraints are a gift. If you draw 4 separate lines hoping they'll meet up, you'll spend the next 5 minutes adding coincident constraints by hand." />
  </div>);
}
