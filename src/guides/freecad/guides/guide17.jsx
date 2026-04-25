import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide17(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const infos=[
    {label:"Loft (profile to profile)",caption:"Circle Ø20 → Circle Ø10 lofted over 40mm",note:"Profiles must be closed and on separate sketches on different parallel planes. Loft interpolates a smooth solid between them."},
    {label:"Additive Pipe (along a path)",caption:"Circle cross-section swept along a spine curve",note:"Profile is a separate closed sketch at the spine's start. Spine is a separate path sketch (lines, splines, arcs). The profile sweeps along the spine's entire length."},
  ];
  const info=infos[mode];
  return(<div>
    <DarkBox title="LOFT &amp; ADDITIVE PIPE"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e67e22"}}>Loft</strong> interpolates between two or more profiles on different planes — great for organic handles, morphing adapters, bottle-to-spout transitions. <strong style={{color:"#e67e22"}}>Additive Pipe</strong> sweeps a profile along a spine path — great for cable channels, tubing, curved pipes.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {infos.map((inf,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{inf.label}</button>))}
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>{info.caption}</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        {mode===0&&<svg width={320} height={200} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* bottom profile: larger circle */}
          <ellipse cx={160} cy={165} rx={40} ry={12} fill="none" stroke="#3498db" strokeWidth={1.5}/>
          <text x={160} y={152} textAnchor="middle" fontSize={10} fill="#3498db">Ø20</text>
          {/* top profile: smaller circle */}
          <ellipse cx={160} cy={55} rx={20} ry={7} fill="none" stroke="#27ae60" strokeWidth={1.5}/>
          <text x={160} y={42} textAnchor="middle" fontSize={10} fill="#27ae60">Ø10</text>
          {/* loft side lines */}
          <line x1={120} y1={165} x2={140} y2={55} stroke="#8fa3b8" strokeWidth={1} strokeDasharray="4,3"/>
          <line x1={200} y1={165} x2={180} y2={55} stroke="#8fa3b8" strokeWidth={1} strokeDasharray="4,3"/>
          {/* dimension */}
          <line x1={220} y1={55} x2={220} y2={165} stroke="#f39c12" strokeWidth={0.8} strokeDasharray="3,3"/>
          <text x={230} y={115} fontSize={10} fill="#f39c12">40mm</text>
        </svg>}
        {mode===1&&<svg width={320} height={200} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* spine path */}
          <path d="M50,170 C80,100 180,130 270,60" fill="none" stroke="#8fa3b8" strokeWidth={1.5} strokeDasharray="5,3"/>
          <text x={50} y={185} fontSize={10} fill="#8fa3b8">Spine</text>
          {/* circle profile at start */}
          <ellipse cx={50} cy={170} rx={12} ry={12} fill="none" stroke="#3498db" strokeWidth={1.5}/>
          <text x={30} y={148} fontSize={10} fill="#3498db">Profile</text>
          {/* tube outline along path (simplified) */}
          <path d="M50,158 C80,88 180,118 270,48" fill="none" stroke="#27ae60" strokeWidth={1} strokeDasharray="4,3"/>
          <path d="M50,182 C80,112 180,142 270,72" fill="none" stroke="#27ae60" strokeWidth={1} strokeDasharray="4,3"/>
          <text x={185} y={50} fontSize={10} fill="#27ae60">Tube result</text>
        </svg>}
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>
      {info.note}
    </div>
    <Insight text="For 3D printing handle grips or organic spouts, Loft beats trying to fillet blocky geometry. Build two profiles 10–20mm apart, loft, done — prints smoothly with minimal supports if oriented right." />
  </div>);
}
