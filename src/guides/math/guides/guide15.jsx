import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide15(){
  const [px,setPx]=useState(3);const [py,setPy]=useState(4);
  const W=260;const H=260;const O=130;const S=20;// canvas width/height, origin pixel, scale
  const toSvg=(x,y)=>({cx:O+x*S,cy:O-y*S});
  const pt=toSvg(px,py);
  const ref=toSvg(1,2);
  const dist=Math.sqrt((px-1)**2+(py-2)**2);
  const mx=(px+1)/2;const my=(py+2)/2;
  const slope=px!==1?(py-2)/(px-1):null;
  return(<div>
    <DarkBox title="Every point has an address"><div style={{fontSize:14}}>
      The <strong style={{color:"#FFE77A"}}>coordinate plane</strong> is a map where every location has an (x, y) address. X = horizontal position. Y = vertical. (3, 5) means "go right 3, up 5." It's how GPS, game graphics, and data visualization work.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{textAlign:"center",fontSize:12,color:"#888",marginBottom:8}}>Drag the sliders to move point P — watch the formulas update live</div>
      <div style={{display:"flex",gap:16,justifyContent:"center",alignItems:"flex-start"}}>
        <svg width={W} height={H} style={{border:"1px solid #e0dcd5",borderRadius:8,flexShrink:0}}>
          {/* grid */}
          {[-6,-4,-2,0,2,4,6].map(i=>(
            <g key={i}>
              <line x1={O+i*S} y1={10} x2={O+i*S} y2={H-10} stroke="#f0eeeb" strokeWidth={1}/>
              <line x1={10} y1={O+i*S} x2={W-10} y2={O+i*S} stroke="#f0eeeb" strokeWidth={1}/>
            </g>
          ))}
          {/* axes */}
          <line x1={10} y1={O} x2={W-10} y2={O} stroke="#ccc" strokeWidth={1.5}/>
          <line x1={O} y1={10} x2={O} y2={H-10} stroke="#ccc" strokeWidth={1.5}/>
          {/* axis labels */}
          {[-5,-4,-3,-2,-1,1,2,3,4,5].map(i=>(
            <text key={i} x={O+i*S} y={O+14} fontSize={8} fill="#aaa" textAnchor="middle">{i}</text>
          ))}
          {/* ref point A(1,2) */}
          <circle cx={ref.cx} cy={ref.cy} r={4} fill="#1565C0"/>
          <text x={ref.cx+6} y={ref.cy-4} fontSize={9} fill="#1565C0" fontWeight="bold">A(1,2)</text>
          {/* line from A to P */}
          <line x1={ref.cx} y1={ref.cy} x2={pt.cx} y2={pt.cy} stroke="#6A1B9A" strokeWidth={1.5} strokeDasharray="4"/>
          {/* midpoint */}
          <circle cx={O+mx*S} cy={O-my*S} r={3} fill="#2E7D32"/>
          {/* point P */}
          <circle cx={pt.cx} cy={pt.cy} r={6} fill="#6A1B9A"/>
          <text x={pt.cx+8} y={pt.cy-6} fontSize={9} fill="#6A1B9A" fontWeight="bold">P({px},{py})</text>
        </svg>
        <div style={{fontSize:12,minWidth:120}}>
          <div style={{marginBottom:8}}>
            <label style={{fontSize:11,color:"#888",display:"block"}}>P.x = {px}</label>
            <input type="range" min={-5} max={5} value={px} onChange={e=>setPx(Number(e.target.value))} style={{width:"100%",accentColor:"#6A1B9A"}}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:"#888",display:"block"}}>P.y = {py}</label>
            <input type="range" min={-5} max={5} value={py} onChange={e=>setPy(Number(e.target.value))} style={{width:"100%",accentColor:"#6A1B9A"}}/>
          </div>
          <div style={{padding:"6px 8px",background:"#EDE7F6",borderRadius:6,marginBottom:6}}>
            <div style={{fontSize:10,color:"#888"}}>Distance A→P</div>
            <div style={{fontWeight:800,color:"#6A1B9A"}}>{dist.toFixed(2)}</div>
            <div style={{fontSize:9,color:"#aaa"}}>√((Δx)²+(Δy)²)</div>
          </div>
          <div style={{padding:"6px 8px",background:"#E8F5E9",borderRadius:6,marginBottom:6}}>
            <div style={{fontSize:10,color:"#888"}}>Midpoint</div>
            <div style={{fontWeight:800,color:"#2E7D32"}}>({mx.toFixed(1)}, {my.toFixed(1)})</div>
          </div>
          <div style={{padding:"6px 8px",background:"#FFF3E0",borderRadius:6}}>
            <div style={{fontSize:10,color:"#888"}}>Slope A→P</div>
            <div style={{fontWeight:800,color:"#E65100"}}>{slope===null?"∞":slope===0?"0":slope.toFixed(2)}</div>
            <div style={{fontSize:9,color:"#aaa"}}>{slope!==null&&slope<0?"going down ↘":"slope ≥ 0"}</div>
          </div>
        </div>
      </div>
    </div>
    <Card color="#6A1B9A" title="Key concepts">
      {[{concept:"Slope = steepness = rise/run",desc:"How much y changes per unit of x. Slope of 2 means 'up 2 for every 1 to the right.' Negative slope = reading left-to-right, the line goes downhill (depreciation, debt paydown, temperature cooling)."},
        {concept:"Distance = Pythagorean theorem",desc:"Distance between (1,2) and (4,6) = √((4-1)²+(6-2)²) = √(9+16) = √25 = 5. Same formula as the triangle diagonal."},
        {concept:"Midpoint = average the coordinates",desc:"Midpoint of (2,4) and (8,10) = ((2+8)/2, (4+10)/2) = (5, 7). Just average the x's and average the y's."},
      ].map((c,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#6A1B9A"}}>{c.concept}</div>
        <div style={{fontSize:12,color:"#555",marginTop:2}}>{c.desc}</div>
      </div>))}
    </Card>
    <Insight text="Slope is everywhere: a road grade of 6% means 6 ft of rise per 100 ft of run (slope = 0.06). A roof pitch of 4/12 means 4 inches up per 12 inches across (slope = 0.33)." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 16-20: GROWTH & PROBABILITY
// ═══════════════════════════════════════════════════════════════
