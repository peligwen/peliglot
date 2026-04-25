import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide20(){
  const [size,setSize]=useState(1);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e74c3c":"1.5px solid #243a52",background:active?"#2a1a1a":"#162a3d",color:active?"#e74c3c":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const inserts=[
    {label:"M2",threadDia:"2.0mm",holeDia:"3.2mm",depth:"3.5mm",insertOD:"3.5mm",insertLen:"3.5mm",edgeMin:"2.5mm",note:"Tiny — for electronics enclosures, micro-mechanisms. Common in small RC and drone parts."},
    {label:"M3 (most common)",threadDia:"3.0mm",holeDia:"4.0mm",depth:"4.0mm",insertOD:"4.0mm",insertLen:"4.0mm",edgeMin:"3.0mm",note:"The default for FDM hobby work. Sized for the community-standard \"M3 short\" brass insert (~D5×L5 with knurled body)."},
    {label:"M4",threadDia:"4.0mm",holeDia:"5.6mm",depth:"5.5mm",insertOD:"5.6mm",insertLen:"5.5mm",edgeMin:"3.5mm",note:"Workhorse for structural parts — frames, mounts, anything that takes real load."},
    {label:"M5",threadDia:"5.0mm",holeDia:"6.4mm",depth:"7.0mm",insertOD:"6.4mm",insertLen:"7.0mm",edgeMin:"4.0mm",note:"Larger structural inserts. Less common in pure 3D-printing work; more common where a printed part bolts to non-printed hardware."},
  ];
  const ins=inserts[size];
  return(<div>
    <DarkBox title="HEAT-SET INSERTS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e74c3c"}}>Heat-set inserts</strong> are knurled brass threaded sleeves you press into a printed plastic hole using a soldering iron. They give you real metal threads in printed parts — strong, repeatedly assemblable, vastly better than self-tapping a screw into FDM plastic. The single highest-leverage technique for functional 3D-printed assemblies.
    </div></DarkBox>
    <div style={{fontSize:11,color:"#607387",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6,textAlign:"center"}}>Insert size</div>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {inserts.map((it,i)=>(<button key={i} onClick={()=>setSize(i)} style={btnStyle(size===i)}>{it.label}</button>))}
    </div>
    <div style={{display:"flex",justifyContent:"center",marginBottom:12,gap:14}}>
      {/* top view */}
      <svg width={120} height={120} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        <circle cx={60} cy={60} r={32} fill="none" stroke="#8fa3b8" strokeWidth={1} strokeDasharray="3,2"/>
        <circle cx={60} cy={60} r={26} fill="none" stroke="#e74c3c" strokeWidth={2}/>
        <circle cx={60} cy={60} r={16} fill="none" stroke="#f39c12" strokeWidth={1.5}/>
        <text x={60} y={113} textAnchor="middle" fontSize={9} fill="#8fa3b8">Top view</text>
        <text x={60} y={16} textAnchor="middle" fontSize={9} fill="#e74c3c">hole Ø{ins.holeDia}</text>
        <text x={60} y={64} textAnchor="middle" fontSize={8} fill="#f39c12">M{ins.threadDia.replace('.0mm','')}</text>
      </svg>
      {/* side section */}
      <svg width={140} height={120} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
        {/* plastic body */}
        <rect x={20} y={10} width={100} height={100} fill="none" stroke="#8fa3b8" strokeWidth={1}/>
        {/* hole */}
        <line x1={50} y1={10} x2={50} y2={50} stroke="#e74c3c" strokeWidth={1.5}/>
        <line x1={90} y1={10} x2={90} y2={50} stroke="#e74c3c" strokeWidth={1.5}/>
        <line x1={50} y1={50} x2={90} y2={50} stroke="#e74c3c" strokeWidth={1.5}/>
        {/* knurled insert */}
        <rect x={52} y={12} width={36} height={36} fill="#f39c1233" stroke="#f39c12" strokeWidth={1.5}/>
        {Array.from({length:6},(_,i)=>(<line key={i} x1={52+i*6+3} y1={14} x2={52+i*6+3} y2={46} stroke="#f39c12" strokeWidth={0.5}/>))}
        <text x={70} y={70} textAnchor="middle" fontSize={9} fill="#f39c12" fontWeight={700}>insert</text>
        <text x={70} y={84} textAnchor="middle" fontSize={9} fill="#e74c3c">depth {ins.depth}</text>
        <text x={70} y={118} textAnchor="middle" fontSize={9} fill="#8fa3b8">Section</text>
      </svg>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #e74c3c44",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"8px 14px",background:"#e74c3c22"}}>
        <span style={{fontSize:13,fontWeight:700,color:"#e74c3c"}}>{ins.label} brass insert (community-standard short)</span>
      </div>
      <div style={{padding:"10px 14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 14px",fontSize:12}}>
        <span style={{color:"#607387"}}>Insert OD:</span><span style={{color:"#e8ecf0"}}>{ins.insertOD}</span>
        <span style={{color:"#607387"}}>Insert length:</span><span style={{color:"#e8ecf0"}}>{ins.insertLen}</span>
        <span style={{color:"#607387"}}>Print hole Ø:</span><span style={{color:"#e74c3c",fontWeight:700}}>{ins.holeDia}</span>
        <span style={{color:"#607387"}}>Print hole depth:</span><span style={{color:"#e74c3c",fontWeight:700}}>{ins.depth}</span>
        <span style={{color:"#607387"}}>Min edge distance:</span><span style={{color:"#e8ecf0"}}>{ins.edgeMin} (avoid splitting)</span>
        <span style={{color:"#607387"}}>Final thread:</span><span style={{color:"#e8ecf0"}}>{ins.threadDia} ({ins.label.split(' ')[0]})</span>
      </div>
      <div style={{padding:"8px 14px",borderTop:"1px solid #1e3a56",fontSize:12,color:"#8fa3b8",lineHeight:1.5}}>{ins.note}</div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,border:"1px solid #243a52",overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"7px 14px",background:"#1e3a56",fontSize:10,fontWeight:700,color:"#607387",letterSpacing:1.5,textTransform:"uppercase"}}>Installation</div>
      {[
        ["1.","Print the hole as a Pocket — straight bore, no taper, depth = insert length + 0.5mm slack at the bottom for displaced plastic."],
        ["2.","Set a soldering iron to ~245–260 °C (PLA) or ~280 °C (PETG/ABS). Use a tip approximately the insert&apos;s thread diameter."],
        ["3.","Place the insert flush with the hole, knurled end down. Press straight down with the iron tip in the insert&apos;s thread — let the heat melt plastic, don&apos;t force it."],
        ["4.","Stop when the insert is flush with the surface or 0.1–0.2mm below. Hold for ~2 seconds without pressure so the plastic re-solidifies around it."],
        ["5.","Let it cool for 10 seconds before removing the iron. Done."],
      ].map(([n,desc],i)=>(<div key={i} style={{padding:"7px 14px",borderTop:"1px solid #1e3a56",display:"flex",gap:10}}>
        <span style={{fontSize:12,color:"#e74c3c",fontWeight:700,flexShrink:0}}>{n}</span>
        <span style={{fontSize:12,color:"#e8ecf0",lineHeight:1.5}}>{desc}</span>
      </div>))}
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"10px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:12,color:"#8fa3b8",lineHeight:1.5}}>
      <strong style={{color:"#e8ecf0"}}>When NOT to use:</strong> single-use assembly with no disassembly (just self-tap), parts with walls thinner than insert OD + 1.5mm (will split), or where you can use a captive nut pocket (cheaper, no installation step). Heat-set is for repeatedly-assembled functional parts.
    </div>
    <Insight text="The brass insert is the difference between &quot;hobby print&quot; and &quot;real product.&quot; Print a Ø4.0mm × 4.0mm-deep pocket for an M3, push the insert in with a 250 °C soldering iron, and the printed plastic now holds an M3 cap screw with metal-on-metal thread strength — through dozens of assembly cycles." />
  </div>);
}
