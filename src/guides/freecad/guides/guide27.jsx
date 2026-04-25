import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide27(){
  const [wallIdx,setWallIdx]=useState(2);
  const btnStyle=(active)=>({padding:"5px 11px",borderRadius:8,border:active?"2px solid #e74c3c":"1.5px solid #243a52",background:active?"#2a1a1a":"#162a3d",color:active?"#e74c3c":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const walls=[
    {mm:0.4,perims:1,label:"0.4mm",verdict:"Fragile — single pass, avoid for functional parts",vc:"#e74c3c"},
    {mm:0.8,perims:2,label:"0.8mm",verdict:"Minimum for functional prints (2 perimeters, 0.4mm nozzle)",vc:"#e67e22"},
    {mm:1.2,perims:3,label:"1.2mm",verdict:"Robust standard minimum — 3 perimeters",vc:"#f39c12"},
    {mm:1.6,perims:4,label:"1.6mm",verdict:"Structural parts — 4 perimeters",vc:"#27ae60"},
    {mm:2.0,perims:5,label:"2.0mm",verdict:"Strong — 5 perimeters",vc:"#27ae60"},
    {mm:3.0,perims:7,label:"3.0mm+",verdict:"Fully perimetered — no infill needed for strength",vc:"#27ae60"},
  ];
  const w=walls[wallIdx];
  const wallPx=Math.max(8,w.mm*20);
  return(<div>
    <DarkBox title="WALLS &amp; OVERHANGS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      FDM has two physical limits that shape every design: <strong style={{color:"#e74c3c"}}>minimum wall thickness</strong> and <strong style={{color:"#e74c3c"}}>maximum overhang angle</strong>. Ignore either and your prints will fail, delaminate, or need excessive supports.
    </div></DarkBox>
    <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Wall thickness</div>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {walls.map((wl,i)=>(<button key={i} onClick={()=>setWallIdx(i)} style={btnStyle(wallIdx===i)}>{wl.label}</button>))}
    </div>
    <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
      <svg width={320} height={120} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        <rect x={140-wallPx/2} y={20} width={wallPx} height={80} fill={w.vc+"33"} stroke={w.vc} strokeWidth={2}/>
        <text x={160} y={108} textAnchor="middle" fontSize={11} fill={w.vc} fontWeight={700}>{w.mm}mm — {w.perims} perimeter{w.perims>1?"s":""}</text>
        {Array.from({length:w.perims},(_, pi)=>(<line key={pi} x1={140-wallPx/2+(pi+0.5)*(wallPx/w.perims)} y1={22} x2={140-wallPx/2+(pi+0.5)*(wallPx/w.perims)} y2={98} stroke={w.vc} strokeWidth={0.5} strokeDasharray="3,3"/>))}
      </svg>
    </div>
    <div style={{background:w.vc+"22",borderRadius:8,padding:"8px 14px",border:`1px solid ${w.vc}44`,marginBottom:14,fontSize:13,color:w.vc,fontWeight:600,textAlign:"center"}}>{w.verdict}</div>
    <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Overhang rule</div>
    <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
      <svg width={320} height={130} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        {/* base vertical wall */}
        <line x1={100} y1={20} x2={100} y2={110} stroke="#8fa3b8" strokeWidth={2}/>
        {/* 45° ok overhang */}
        <line x1={100} y1={60} x2={160} y2={30} stroke="#27ae60" strokeWidth={2}/>
        <text x={168} y={28} fontSize={10} fill="#27ae60">45° — OK</text>
        {/* steep bad overhang */}
        <line x1={100} y1={80} x2={180} y2={70} stroke="#e74c3c" strokeWidth={2}/>
        <text x={185} y={74} fontSize={10} fill="#e74c3c">60° — needs support</text>
        {/* angle label */}
        <path d="M100,60 A20,20 0 0,0 114,48" fill="none" stroke="#27ae60" strokeWidth={1}/>
        <text x={100} y={115} fontSize={9} fill="#607387">vertical wall</text>
      </svg>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Supportless design moves</div>
      {[["45° chamfers","Replace downward-facing overhangs with 45° chamfers"],["Teardrop holes","Use teardrop profile for horizontal holes — bottom 45° point, top semicircle"],["Orient flat faces down","Put the flattest, largest face on the build plate — stable and support-free"],].map(([name,desc],i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#e74c3c"}}>{name}: </span><span style={{fontSize:12,color:"#8fa3b8"}}>{desc}</span>
      </div>))}
    </div>
    <Insight text="Design to 0.8mm as an absolute minimum wall thickness; aim for 1.2mm as the default. Avoid features that would require unsupported overhangs beyond 45° — redesign with chamfers or reorientation before printing." />
  </div>);
}
