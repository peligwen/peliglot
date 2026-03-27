import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide1(){
  const [zoom,setZoom]=useState(0);
  const ranges=[[0,10,1],[0,1,0.1],[0,0.1,0.01],[0,0.01,0.001]];
  const [lo,hi,step]=ranges[zoom];
  const ticks=[];for(let i=lo;i<=hi;i=Math.round((i+step)*1000)/1000)ticks.push(i);
  return(<div>
    <DarkBox title="Numbers are addresses on an infinite line"><div style={{fontSize:14,lineHeight:1.6}}>
      Every number has a <strong style={{color:"#FFE77A"}}>position</strong>. Between any two numbers, there are <strong style={{color:"#FFE77A"}}>infinitely more</strong>. Zoom in and the line never runs out of detail.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:12,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
        {["0-10","0-1","0-0.1","0-0.01"].map((l,i)=>(<button key={i} onClick={()=>setZoom(i)} style={{padding:"5px 12px",borderRadius:8,border:zoom===i?"2.5px solid #1565C0":"1.5px solid #ddd",background:zoom===i?"#1565C0":"#fff",color:zoom===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{l}</button>))}
      </div>
      <div style={{position:"relative",height:60,marginBottom:8}}>
        <div style={{position:"absolute",top:20,left:0,right:0,height:3,background:"#1565C0",borderRadius:2}}/>
        {ticks.map((t,i)=>(<div key={i} style={{position:"absolute",left:`${((t-lo)/(hi-lo))*100}%`,top:12}}>
          <div style={{width:2,height:18,background:"#1565C0",margin:"0 auto"}}/>
          <div style={{fontSize:9,color:"#888",textAlign:"center",marginTop:2,transform:"translateX(-50%)",whiteSpace:"nowrap"}}>{t}</div>
        </div>))}
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#aaa"}}>Zoom level {zoom+1}/4 — between any two ticks, there are infinitely more numbers</div>
    </div>
    <Card color="#1565C0" title="Place value — each position is ×10">
      {[{pos:"Thousands",val:"1,000",mult:"×10³"},{pos:"Hundreds",val:"100",mult:"×10²"},{pos:"Tens",val:"10",mult:"×10¹"},{pos:"Ones",val:"1",mult:"×10⁰"},{pos:"Tenths",val:"0.1",mult:"×10⁻¹"},{pos:"Hundredths",val:"0.01",mult:"×10⁻²"}].map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"100px 60px 1fr",padding:"6px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:700,color:"#1565C0"}}>{p.pos}</span>
        <span style={{fontSize:13,color:"#555"}}>{p.val}</span>
        <span style={{fontSize:12,color:"#aaa",fontFamily:"monospace"}}>{p.mult}</span>
      </div>))}
    </Card>
    <Insight text="Decimals aren't a different kind of number — they're just addresses between the whole numbers. 3.7 lives between 3 and 4, closer to 4. That's it." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: NEGATIVE NUMBERS
// ═══════════════════════════════════════════════════════════════
