import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide18(){
  const [size,setSize]=useState(0);
  const [htype,setHtype]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const sizes=["M3","M4","M5","M6"];
  const htypes=["Clearance","Tap","Counterbore","Countersunk"];
  const data=[
    {screw:"M3",clearance:3.2,tap:2.5,cbDia:6.5,cbDepth:3.5,csDia:6.0,csAngle:90},
    {screw:"M4",clearance:4.3,tap:3.3,cbDia:8.0,cbDepth:4.6,csDia:8.0,csAngle:90},
    {screw:"M5",clearance:5.3,tap:4.2,cbDia:10.0,cbDepth:5.7,csDia:9.5,csAngle:90},
    {screw:"M6",clearance:6.4,tap:5.0,cbDia:11.0,cbDepth:6.8,csDia:11.5,csAngle:90},
  ];
  const d=data[size];
  const activeDia=htype===0?d.clearance:htype===1?d.tap:htype===2?d.cbDia:d.csDia;
  const holeR=activeDia*4;
  return(<div>
    <DarkBox title="HOLE FEATURE"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      The <strong style={{color:"#e67e22"}}>Hole feature</strong> is parametric screw holes. It knows about metric (M3, M4, M5…) and imperial threads, clearance vs. tap diameters, counterbores, and countersinks. <strong style={{color:"#e67e22"}}>Prefer this over &quot;pocket a circle&quot;</strong> — it encodes the intent and the correct diameter for each use case.
    </div></DarkBox>
    <div style={{marginBottom:8}}>
      <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Screw size</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12}}>
        {sizes.map((s,i)=>(<button key={i} onClick={()=>setSize(i)} style={btnStyle(size===i)}>{s}</button>))}
      </div>
      <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Hole type</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:12}}>
        {htypes.map((h,i)=>(<button key={i} onClick={()=>setHtype(i)} style={btnStyle(htype===i)}>{h}</button>))}
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"center",marginBottom:16,gap:16}}>
      {/* top view */}
      <svg width={120} height={120} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        <circle cx={60} cy={60} r={30} fill="none" stroke="#8fa3b8" strokeWidth={1.5} strokeDasharray="4,3"/>
        <circle cx={60} cy={60} r={holeR>28?28:holeR} fill="none" stroke="#e67e22" strokeWidth={1.5}/>
        <text x={60} y={113} textAnchor="middle" fontSize={9} fill="#8fa3b8">Top view</text>
        <text x={60} y={16} textAnchor="middle" fontSize={9} fill="#e67e22">Ø{activeDia.toFixed(1)}</text>
      </svg>
      {/* side section */}
      <svg width={120} height={120} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        <rect x={20} y={10} width={80} height={100} fill="none" stroke="#8fa3b8" strokeWidth={1}/>
        {htype===0&&<>
          <line x1={45} y1={10} x2={45} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={75} y1={10} x2={75} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
        </>}
        {htype===1&&<>
          <line x1={48} y1={10} x2={48} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={72} y1={10} x2={72} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
        </>}
        {htype===2&&<>
          <line x1={40} y1={10} x2={40} y2={40} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={80} y1={10} x2={80} y2={40} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={40} y1={40} x2={48} y2={40} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={72} y1={40} x2={80} y2={40} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={48} y1={40} x2={48} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={72} y1={40} x2={72} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <text x={60} y={35} textAnchor="middle" fontSize={8} fill="#f39c12">CB</text>
        </>}
        {htype===3&&<>
          <line x1={38} y1={10} x2={52} y2={36} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={82} y1={10} x2={68} y2={36} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={52} y1={36} x2={52} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <line x1={68} y1={36} x2={68} y2={110} stroke="#e67e22" strokeWidth={1.5}/>
          <text x={60} y={28} textAnchor="middle" fontSize={8} fill="#f39c12">CS</text>
        </>}
        <text x={60} y={118} textAnchor="middle" fontSize={9} fill="#8fa3b8">Section</text>
      </svg>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
        <span>Size</span><span>Clearance</span><span>Tap drill</span><span>Counterbore</span>
      </div>
      {data.map((row,i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",background:i===size?"#1a2f47":"transparent"}}>
        <span style={{fontSize:13,fontWeight:700,color:i===size?"#e67e22":"#e8ecf0"}}>{row.screw}</span>
        <span style={{fontSize:12,color:"#e8ecf0"}}>{row.clearance} mm</span>
        <span style={{fontSize:12,color:"#e8ecf0"}}>{row.tap} mm</span>
        <span style={{fontSize:12,color:"#e8ecf0"}}>Ø{row.cbDia}/{row.cbDepth}mm</span>
      </div>))}
    </div>
    <div style={{background:"#1a2f47",borderRadius:10,border:"1px solid #2a4060",padding:"10px 14px",marginBottom:14,fontSize:12,color:"#e8ecf0",lineHeight:1.5}}>
      <strong style={{color:"#e67e22"}}>Heat-set inserts (M3 brass):</strong> design a Ø4.0&nbsp;mm hole × 4.0&nbsp;mm deep, then push the insert in with a soldering iron at ~260&nbsp;°C. Sized for the common community-standard M3×D5xL5 brass insert; verify with your specific brand. Far more reliable than self-tapping into FDM plastic.
    </div>
    <Insight text="For 3D-printed parts that'll hold a real metric screw directly, add 0.1–0.3 mm to the clearance diameter (FDM shrinks holes). For repeated assembly/disassembly, use heat-set inserts instead — printer tolerance matters more than ISO spec." />
  </div>);
}
