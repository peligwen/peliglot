import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide21(){
  const [tab,setTab]=useState(0);
  const btnStyle=(active)=>({padding:"6px 14px",borderRadius:8,border:active?"2px solid #e67e22":"1.5px solid #243a52",background:active?"#1a2f47":"#162a3d",color:active?"#e67e22":"#8fa3b8",cursor:"pointer",fontWeight:700,fontSize:13});
  const tabs=["Linear","Polar","Mirror"];
  const descriptions=[
    {caption:"4 copies, spacing 15mm along X axis",desc:"Linear Pattern duplicates a feature N times along one or two direction vectors. Set count and spacing. The source feature updates → all copies update."},
    {caption:"6 copies, 60° apart (360° total)",desc:"Polar Pattern duplicates a feature around an axis. Set count and total angle (usually 360°). Perfect for bolt-hole circles, vent holes, spokes."},
    {caption:"Original + mirror copy across YZ plane",desc:"Mirror Feature reflects one or more features across a plane (datum or face). One copy, perfectly symmetric — change the source, the mirror follows."},
  ];
  const linearDots=[[60,110],[120,110],[180,110],[240,110]];
  const polarR=65;const polarCx=160;const polarCy=110;
  const polarDots=Array.from({length:6},(_, i)=>{const a=i*(Math.PI/3);return[polarCx+polarR*Math.cos(a),polarCy+polarR*Math.sin(a)];});
  return(<div>
    <DarkBox title="LINEAR, POLAR &amp; MIRROR PATTERNS"><div style={{fontSize:14,lineHeight:1.6,color:"#e8ecf0"}}>
      <strong style={{color:"#e67e22"}}>Pattern features</strong> duplicate one or more features parametrically. These three types cover 95% of pattern needs. You&apos;re patterning the <strong style={{color:"#f39c12"}}>feature itself</strong> (Pocket, Hole, Pad) — not copying the sketch.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      {tabs.map((t,i)=>(<button key={i} onClick={()=>setTab(i)} style={btnStyle(tab===i)}>{t}</button>))}
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#8fa3b8",marginBottom:6,textAlign:"center"}}>{descriptions[tab].caption}</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <svg width={320} height={200} style={{background:"#0f1e2d",borderRadius:10,border:"1px solid #243a52"}}>
          {tab===0&&<>
            {linearDots.map(([x,y],i)=>(<g key={i}>
              <circle cx={x} cy={y} r={12} fill="none" stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1.5}/>
              <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1}/>
              <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1}/>
            </g>))}
            <line x1={60} y1={140} x2={240} y2={140} stroke="#f39c12" strokeWidth={0.8} strokeDasharray="3,3"/>
            <text x={150} y={155} textAnchor="middle" fontSize={10} fill="#f39c12">3× 15mm = 45mm</text>
            <text x={60} y={85} textAnchor="middle" fontSize={10} fill="#e67e22">Source</text>
            <text x={180} y={85} textAnchor="middle" fontSize={10} fill="#27ae60">Copies</text>
          </>}
          {tab===1&&<>
            <circle cx={polarCx} cy={polarCy} r={polarR} fill="none" stroke="#243a52" strokeWidth={1} strokeDasharray="4,3"/>
            {polarDots.map(([x,y],i)=>(<g key={i}>
              <circle cx={x} cy={y} r={10} fill="none" stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1.5}/>
              <line x1={x} y1={y-3} x2={x} y2={y+3} stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1}/>
              <line x1={x-3} y1={y} x2={x+3} y2={y} stroke={i===0?"#e67e22":"#27ae60"} strokeWidth={1}/>
            </g>))}
            <circle cx={polarCx} cy={polarCy} r={3} fill="#607387"/>
            <text x={polarCx} y={polarCy+20} textAnchor="middle" fontSize={10} fill="#607387">axis</text>
            <text x={polarCx-90} y={polarCy-80} fontSize={10} fill="#e67e22">Source</text>
          </>}
          {tab===2&&<>
            <line x1={160} y1={20} x2={160} y2={190} stroke="#3498db" strokeWidth={1.5} strokeDasharray="6,4"/>
            <text x={168} y={32} fontSize={9} fill="#3498db">Mirror plane</text>
            <rect x={70} y={70} width={60} height={60} rx={4} fill="none" stroke="#e67e22" strokeWidth={2}/>
            <rect x={190} y={70} width={60} height={60} rx={4} fill="none" stroke="#27ae60" strokeWidth={2} strokeDasharray="4,3"/>
            <text x={100} y={150} textAnchor="middle" fontSize={10} fill="#e67e22">Original</text>
            <text x={220} y={150} textAnchor="middle" fontSize={10} fill="#27ae60">Mirror</text>
          </>}
        </svg>
      </div>
    </div>
    <div style={{background:"#162a3d",borderRadius:10,padding:"12px 14px",border:"1px solid #243a52",marginBottom:14,fontSize:13,color:"#e8ecf0",lineHeight:1.6}}>
      {descriptions[tab].desc}
    </div>
    <Insight text="For bolt-hole circles (flanges, mounting plates), polar pattern a single Hole feature around the Z axis. Changing the hole size updates every position. Don't copy-paste sketches." />
  </div>);
}
