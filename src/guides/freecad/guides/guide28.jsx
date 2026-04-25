import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide28(){
  const [fit,setFit]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e74c3c":"1.5px solid #243a52",background:active?"#2a1a1a":"#162a3d",color:active?"#e74c3c":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const fits=[
    {label:"Press fit (interference)",color:"#e74c3c",holeDia:"2.9mm",shaftDia:"3.0mm",holeAdj:"−0.1mm",shaftAdj:"nominal",desc:"Hole smaller than shaft — push-in friction fit. Use for bearing races, press-in inserts, captive axles. Remove with a press or tap; not intended for repeated disassembly."},
    {label:"Slip fit (gentle)",color:"#f39c12",holeDia:"3.2mm",shaftDia:"3.0mm",holeAdj:"+0.2mm",shaftAdj:"nominal",desc:"Hole nominally larger than shaft — can move with light force. The go-to for moving parts, joints, hinges. Accounts for FDM hole shrinkage."},
    {label:"Loose fit (free)",color:"#27ae60",holeDia:"3.4mm",shaftDia:"3.0mm",holeAdj:"+0.4mm",shaftAdj:"nominal",desc:"Free movement, no binding under any reasonable misalignment. Use for shafts that need to rotate or slide freely, or for any assembly you need to take apart easily."},
  ];
  const f=fits[fit];
  const extras=[
    ["Snap-fit joint gap","0.15–0.25mm per mating face — enough to engage, enough to flex without cracking"],
    ["M3 hex nut pocket","5.5mm across flats + 0.3mm = 5.8mm, depth = nut height (2.4mm) + 0.3mm"],
    ["M4 hex nut pocket","7.0mm across flats + 0.3mm = 7.3mm, depth = nut height (3.2mm) + 0.3mm"],
    ["FDM hole shrinkage","Typical FDM with 0.4mm nozzle: holes shrink 0.1–0.3mm from nominal"],
  ];
  return(<div>
    <DarkBox title="TOLERANCES &amp; CLEARANCE"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      3D-printed holes <strong style={{color:"#e74c3c"}}>shrink</strong> (0.1–0.3mm typical for FDM). Shafts and pegs grow by similar amounts. Design with <strong style={{color:"#e67e22"}}>fit classes</strong> in mind — interference, slip, or loose — rather than relying on nominal dimensions.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {fits.map((fi,i)=>(<button key={i} onClick={()=>setFit(i)} style={btnStyle(fit===i)}>{fi.label}</button>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:`1px solid ${f.color}44`,marginBottom:14,overflow:"hidden"}}>
      <div style={{padding:"8px 14px",background:f.color+"22",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:13,fontWeight:700,color:f.color}}>{f.label}</span>
        <span style={{fontSize:12,color:"#8fa3b8"}}>— for Ø3.0 shaft</span>
      </div>
      <div style={{padding:"10px 14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px"}}>
        <div style={{background:"#1e3a56",borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
          <div style={{fontSize:10,color:"#607387",marginBottom:4}}>Hole diameter</div>
          <div style={{fontSize:18,fontWeight:800,color:f.color}}>{f.holeDia}</div>
          <div style={{fontSize:11,color:"#8fa3b8",marginTop:2}}>{f.holeAdj}</div>
        </div>
        <div style={{background:"#1e3a56",borderRadius:8,padding:"8px 12px",textAlign:"center"}}>
          <div style={{fontSize:10,color:"#607387",marginBottom:4}}>Shaft diameter</div>
          <div style={{fontSize:18,fontWeight:800,color:"#8fa3b8"}}>{f.shaftDia}</div>
          <div style={{fontSize:11,color:"#8fa3b8",marginTop:2}}>{f.shaftAdj}</div>
        </div>
      </div>
      <div style={{padding:"8px 14px",borderTop:"1px solid #1e3a56",fontSize:13,color:"#8fa3b8",lineHeight:1.5}}>{f.desc}</div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Common FDM tolerances</div>
      {extras.map(([name,val],i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#e74c3c"}}>{name}: </span><span style={{fontSize:12,color:"#8fa3b8"}}>{val}</span>
      </div>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"10px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:12,color:"#8fa3b8",lineHeight:1.5}}>
      <strong style={{color:"#e8ecf0"}}>Hole orientation matters:</strong> the numbers above assume <em>vertical-axis holes</em> — printed wall-by-wall, perimeter rings stacked. Holes with a <em>horizontal axis</em> (printed layer-by-layer) deform less in diameter but more in roundness (they sag at the top). For horizontal holes, increase clearance by another +0.1 mm or reorient the part if the hole is critical.
    </div>
    <Insight text="Calibrate tolerances for YOUR printer with a test print — search 'XYZ calibration cube' or 'tolerance test print' on Printables for a one-evening calibration. Every FDM setup is different (nozzle, cooling, slicer, filament); one calibration print saves dozens of failed assemblies." />
  </div>);
}
