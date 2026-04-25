import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide16(){
  const [axis,setAxis]=useState(0);
  const [angle,setAngle]=useState(3);
  const axes=["X","Y","Z","Sketch line"];
  const angles=[90,180,270,360];
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const ang=angles[angle];
  const axisLabel=axes[axis];
  const cx=80;const profileX=120;
  const sweepR=ang>=180?70:50;
  const sweepEnd=(ang/360)*2*Math.PI;
  const se=sweepEnd;
  const ex2=cx+sweepR*Math.cos(se);const ey2=110+sweepR*Math.sin(se);
  return(<div>
    <DarkBox title="REVOLUTION &amp; GROOVE"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e67e22"}}>Revolution</strong> spins a 2D profile around an axis to create round parts — bottles, turned spindles, cylindrical fittings. <strong style={{color:"#e67e22"}}>Groove</strong> is the subtractive version: carves a revolved cut out of solid. The workflow is identical; Revolution adds material, Groove removes it.
    </div></DarkBox>
    <div style={{marginBottom:8}}>
      <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Axis</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
        {axes.map((a,i)=>(<button key={i} onClick={()=>setAxis(i)} style={btnStyle(axis===i)}>{a}</button>))}
      </div>
      <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Sweep angle</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
        {angles.map((a,i)=>(<button key={i} onClick={()=>setAngle(i)} style={btnStyle(angle===i)}>{a}°</button>))}
      </div>
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>Side view — axis: {axisLabel}, sweep: {ang}°</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width={320} height={220} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* axis line */}
          <line x1={cx} y1={30} x2={cx} y2={190} stroke="#e67e22" strokeWidth={1.5} strokeDasharray="6,4"/>
          <text x={cx-12} y={22} fontSize={10} fill="#e67e22" fontWeight={700}>{axisLabel}</text>
          {/* profile */}
          <line x1={profileX} y1={60} x2={profileX+60} y2={60} stroke="#8fa3b8" strokeWidth={1.5}/>
          <line x1={profileX+60} y1={60} x2={profileX+60} y2={160} stroke="#8fa3b8" strokeWidth={1.5}/>
          <line x1={profileX+60} y1={160} x2={profileX} y2={160} stroke="#8fa3b8" strokeWidth={1.5}/>
          <line x1={profileX} y1={160} x2={profileX} y2={60} stroke="#8fa3b8" strokeWidth={1.5}/>
          {/* sweep arc indicator */}
          <path d={`M${cx+sweepR},110 A${sweepR},${sweepR} 0 ${ang>180?1:0},1 ${ex2},${ey2}`} fill="none" stroke="#f39c12" strokeWidth={1.5} strokeDasharray="5,3"/>
          <text x={cx+sweepR+4} y={108} fontSize={10} fill="#f39c12" fontWeight={700}>{ang}°</text>
          <text x={profileX+8} y={115} fontSize={11} fill="#e8ecf0">Profile</text>
        </svg>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>
      <strong style={{color:"#e67e22"}}>Important:</strong> The profile <strong>must</strong> be entirely on one side of the axis — it cannot cross it. If it does, FreeCAD refuses with the error <em style={{color:"#e74c3c"}}>&quot;BRep_API: command not done&quot;</em> (or &quot;profile is across the axis of revolution&quot; in newer 1.0 builds). Add a <strong style={{color:"#f39c12"}}>construction line</strong> in the sketch itself to represent the axis, or reference an external axis (X/Y/Z of the body, or a Datum Line).
    </div>
    <Insight text="Revolutions inherit the sketch plane's normal as the default axis. Build the profile on XZ and revolve around Z, and the part stands up the Z-axis automatically — ready to export and print without re-orienting in the slicer." />
  </div>);
}
