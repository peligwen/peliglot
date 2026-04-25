import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, FeatureTree } from './_helpers';

export function Guide22(){
  const [treeMode,setTreeMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #9b59b6":"1.5px solid #243a52",background:active?"#1a1a3a":"#162a3d",color:active?"#9b59b6":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const singleTree=[
    {icon:"🎁",label:"Body (Bracket) — Active",highlighted:true,children:[
      {icon:"📄",label:"Origin",children:[]},
      {icon:"✏️",label:"Sketch (Base profile)",children:[]},
      {icon:"⬆️",label:"Pad (10mm)",children:[]},
      {icon:"✏️",label:"Sketch001 (Hole circle)",children:[]},
      {icon:"⬇️",label:"Pocket (Through all)",tip:true,children:[]},
    ]},
  ];
  const multiTree=[
    {icon:"📁",label:"Part (Assembly root)",children:[
      {icon:"🎁",label:"Body (Bracket) — Active",highlighted:true,children:[
        {icon:"✏️",label:"Sketch (Base profile)",children:[]},
        {icon:"⬆️",label:"Pad (10mm)",children:[]},
        {icon:"✏️",label:"Sketch001 (Hole circle)",children:[]},
        {icon:"⬇️",label:"Pocket (Through all)",tip:true,children:[]},
      ]},
      {icon:"🎁",label:"Body001 (Washer)",children:[
        {icon:"✏️",label:"Sketch002",children:[]},
        {icon:"⬆️",label:"Pad001 (2mm)",tip:true,children:[]},
      ]},
    ]},
  ];
  const tips=[
    {key:"Space","action":"Toggle visibility of any tree item (Body, feature, sketch)"},
    {key:"Dbl-click Body","action":"Make that Body active — new features go into it"},
    {key:"Right-click feature","action":"\"Set tip\" — what gets exported to STL"},
  ];
  return(<div>
    <DarkBox title="BODY &amp; PART CONTAINERS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      Every Part Design feature lives inside a <strong style={{color:"#9b59b6"}}>Body</strong>. The Body holds the currently-active &quot;Tip&quot; — the solid you&apos;ll export. Multi-part assemblies use a <strong style={{color:"#9b59b6"}}>Part container</strong> holding multiple Bodies. One Body = one printable part.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      <button onClick={()=>setTreeMode(0)} style={btnStyle(treeMode===0)}>Single body</button>
      <button onClick={()=>setTreeMode(1)} style={btnStyle(treeMode===1)}>Multi-body in Part</button>
    </div>
    <FeatureTree title={treeMode===0?"Single Body — one printable part":"Part container — two printable parts"} nodes={treeMode===0?singleTree:multiTree}/>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Key interactions</div>
      {tips.map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 14px",borderTop:"1px solid #1e3a56"}}>
        <kbd style={{background:"#1e3a56",border:"1px solid #2a4060",borderRadius:5,padding:"2px 8px",fontSize:11,color:"#9b59b6",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"}}>{t.key}</kbd>
        <span style={{fontSize:12,color:"#8fa3b8"}}>{t.action}</span>
      </div>))}
    </div>
    <Insight text="One body = one printable part. If you're modeling an assembly of 3 printable parts, use 3 Bodies inside 1 Part. Each exports to STL independently, and the Part container keeps them aligned." />
  </div>);
}
