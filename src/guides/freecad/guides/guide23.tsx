import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide23(){
  const [mode,setMode]=useState(0);
  const btnStyle=(active: boolean)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #9b59b6":"1.5px solid #243a52",background:active?"#1a1a3a":"#162a3d",color:active?"#9b59b6":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:12});
  const modes=[
    {label:"Offset from XY",caption:"Datum 20mm above XY plane",desc:"Most common. Part Design &gt; Datum Plane, select XY, enter offset distance. The new plane floats above the origin at the exact distance.",geo:"offset"},
    {label:"Angled to Face",caption:"Datum at 30° to a base face",desc:"Select a face, add an angle offset. The datum tilts relative to that face. Good for slanted features without tilting your sketch.",geo:"angled"},
    {label:"3-point",caption:"Datum through 3 picked vertices",desc:"Select 3 points/vertices anywhere on the model. The datum is the plane that passes through all three. Flexible for oddly-oriented surfaces.",geo:"threepoint"},
    {label:"On face",caption:"Datum coplanar with a picked face",desc:"The datum is coincident with an existing face. Functionally similar to sketching on the face, but the datum is a stable reference that won't follow if the face changes identity.",geo:"onface"},
  ];
  const m=modes[mode];
  return(<div>
    <DarkBox title="DATUM PLANES & AXES"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#9b59b6"}}>Datums</strong> are reference geometry — planes, axes, points — that don&apos;t become part of the solid but give you stable places to sketch and reference. <strong style={{color:"#e67e22"}}>Always prefer datums over raw faces</strong> for any sketch you&apos;ll reference from later features.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {modes.map((mo,i)=>(<button key={i} onClick={()=>setMode(i)} style={btnStyle(mode===i)}>{mo.label}</button>))}
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>{m.caption}</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width={320} height={180} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {/* base box */}
          <rect x={80} y={100} width={160} height={50} fill="none" stroke="#8fa3b8" strokeWidth={1.5}/>
          {m.geo==="offset"&&<>
            <line x1={70} y1={60} x2={250} y2={60} stroke="#9b59b6" strokeWidth={2} strokeDasharray="8,4"/>
            <line x1={160} y1={60} x2={160} y2={100} stroke="#f39c12" strokeWidth={0.8} strokeDasharray="3,3"/>
            <text x={260} y={64} fontSize={10} fill="#9b59b6" fontWeight={700}>Datum</text>
            <text x={168} y={84} fontSize={10} fill="#f39c12">20mm</text>
          </>}
          {m.geo==="angled"&&<>
            <line x1={80} y1={100} x2={250} y2={65} stroke="#9b59b6" strokeWidth={2} strokeDasharray="8,4"/>
            <text x={255} y={64} fontSize={10} fill="#9b59b6" fontWeight={700}>Datum</text>
            <path d="M100,100 A22,22 0 0,0 108,80" fill="none" stroke="#f39c12" strokeWidth={1}/>
            <text x={112} y={92} fontSize={10} fill="#f39c12">30°</text>
          </>}
          {m.geo==="threepoint"&&<>
            <circle cx={80} cy={100} r={4} fill="#e67e22"/>
            <circle cx={240} cy={100} r={4} fill="#e67e22"/>
            <circle cx={160} cy={60} r={4} fill="#e67e22"/>
            <polygon points="80,100 240,100 160,60" fill="rgba(155,89,182,0.15)" stroke="#9b59b6" strokeWidth={2} strokeDasharray="6,3"/>
            <text x={260} y={64} fontSize={10} fill="#9b59b6" fontWeight={700}>Datum</text>
            <text x={158} y={48} fontSize={9} fill="#e67e22">p3</text>
          </>}
          {m.geo==="onface"&&<>
            <line x1={78} y1={100} x2={242} y2={100} stroke="#9b59b6" strokeWidth={2.5}/>
            <text x={252} y={104} fontSize={10} fill="#9b59b6" fontWeight={700}>Datum</text>
            <text x={160} y={86} textAnchor="middle" fontSize={9} fill="#607387">coincident with face</text>
          </>}
        </svg>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#8fa3b8",lineHeight:1.6}}>
      {m.desc} Datum Plane creation: <strong style={{color:"#e8ecf0"}}>Model &gt; Datum Plane</strong> or the toolbar. Same menu for Datum Line (axis) and Datum Point.
    </div>
    <Insight text="Sketching on a datum plane = your sketch never breaks when upstream features change. Sketching on a face = you're at the mercy of Toponaming. For any sketch you'll reference from later features, use a datum." />
  </div>);
}
