import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, SketchDiagram } from './_helpers';

export function Guide10(){
  const [ct,setCt]=useState(0);
  const btnStyle=(active)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #3498db":"1.5px solid #243a52",background:active?"#0f2a3d":"#162a3d",color:active?"#3498db":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const constraints=[
    {name:"Coincident",shortcut:"C",desc:"Two points share the same location — endpoints merge.",geo:[{type:"line",x1:60,y1:100,x2:160,y2:100},{type:"line",x1:160,y1:100,x2:260,y2:150}],cc:[{type:"coincident",at:{x:160,y:100}}]},
    {name:"Horizontal",shortcut:"H",desc:"A line is forced to be perfectly horizontal.",geo:[{type:"line",x1:70,y1:110,x2:250,y2:110}],cc:[{type:"horizontal",at:{x:160,y:110}}]},
    {name:"Vertical",shortcut:"V",desc:"A line is forced to be perfectly vertical.",geo:[{type:"line",x1:160,y1:50,x2:160,y2:170}],cc:[{type:"vertical",at:{x:160,y:110}}]},
    {name:"Parallel",shortcut:"P",desc:"Two lines remain parallel to each other.",geo:[{type:"line",x1:60,y1:80,x2:200,y2:80},{type:"line",x1:80,y1:140,x2:260,y2:140}],cc:[{type:"parallel",at:{x:130,y:80}},{type:"parallel",at:{x:170,y:140}}]},
    {name:"Perpendicular",shortcut:"N",desc:"Two lines meet at a 90-degree angle.",geo:[{type:"line",x1:160,y1:60,x2:160,y2:160},{type:"line",x1:60,y1:160,x2:260,y2:160}],cc:[{type:"perpendicular",at:{x:160,y:160}}]},
    {name:"Tangent",shortcut:"T",desc:"A line and circle (or two curves) meet without a kink.",geo:[{type:"circle",cx:160,cy:90,r:50},{type:"line",x1:60,y1:140,x2:260,y2:140}],cc:[{type:"tangent",at:{x:160,y:140}}]},
    {name:"Equal",shortcut:"E",desc:"Two lines are constrained to the same length.",geo:[{type:"line",x1:60,y1:90,x2:180,y2:90},{type:"line",x1:60,y1:140,x2:180,y2:140}],cc:[{type:"equal",at:{x:120,y:90}},{type:"equal",at:{x:120,y:140}}]},
    {name:"Symmetric",shortcut:"S",desc:"Two points are mirrored across a construction centerline.",geo:[{type:"line",x1:160,y1:30,x2:160,y2:190,construction:true},{type:"point",x:100,y:110},{type:"point",x:220,y:110}],cc:[{type:"symmetric",at:{x:160,y:110}}]},
  ];
  const c=constraints[ct];
  return(<div>
    <DarkBox title="GEOMETRIC CONSTRAINTS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Geometric constraints define <strong style={{color:"#3498db"}}>relationships without numbers</strong> — &quot;this line is horizontal,&quot; &quot;these two are parallel,&quot; &quot;this circle is tangent to that line.&quot; In FreeCAD 1.0 all geometric constraints use <strong style={{color:"#3498db"}}>single-letter shortcuts</strong> (C, H, V, P, N, T, E, S). Geometric first, dimensional last.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {constraints.map((c2,i)=>(<button key={i} onClick={()=>setCt(i)} style={btnStyle(ct===i)}>{c2.name}</button>))}
    </div>
    <SketchDiagram title={`${c.name} — ${c.desc}`} width={320} height={200} geometry={c.geo} constraints={c.cc} />
    <div style={{background:"#162a3d",borderRadius:10,padding:"8px 14px",border:"1px solid #243a52",marginBottom:12,fontSize:11,color:"#8fa3b8",lineHeight:1.5,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:10,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>Glyph legend:</span>
      <span><svg width={14} height={14} style={{verticalAlign:"middle"}}><circle cx={7} cy={7} r={4} fill="#e67e22"/></svg> coincident</span>
      <span><svg width={20} height={14} style={{verticalAlign:"middle"}}><line x1={4} y1={3} x2={16} y2={3} stroke="#e67e22" strokeWidth={1.5}/><line x1={4} y1={11} x2={16} y2={11} stroke="#e67e22" strokeWidth={1.5}/></svg> H/V/parallel/equal/tangent etc. (orange marks)</span>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"10px 14px",border:"1px solid #243a52",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
      <kbd style={{background:"#0f2a3d",border:"1px solid #2a4060",borderRadius:5,padding:"3px 10px",fontSize:13,color:"#3498db",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"}}>{c.shortcut}</kbd>
      <span style={{fontSize:13,color:"#8fa3b8"}}>{c.name}: {c.desc}</span>
    </div>
    <Insight text="Geometric first, dimensional last. Lock the shape's relationships before you lock its size. Otherwise, changing a dimension fights the constraints you haven't added yet." />
  </div>);
}
