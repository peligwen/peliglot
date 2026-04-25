import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide1(){
  const [zoom,setZoom]=useState(0);
  const ranges=[[0,10,1],[0,1,0.1],[0,0.1,0.01],[0,0.01,0.001]];
  const [lo,hi,step]=ranges[zoom];
  const ticks=[];for(let i=lo;i<=hi;i=Math.round((i+step)*1000)/1000)ticks.push(i);
  return(<div>
    <DarkBox title="Numbers are addresses on an infinite line"><div style={{fontSize:14,lineHeight:1.6}}>
      Every number has a <strong style={{color:"#FFE77A"}}>position</strong>. Between any two numbers, there are <strong style={{color:"#FFE77A"}}>infinitely more</strong>. Zoom in and the line never runs out of detail. Between any two integers there are infinitely many fractions — and even more irrationals like √2 and π.
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
    <ExpandSection title="Scientific notation — writing very large and very small numbers" color="#1565C0">
      <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px",marginBottom:8}}>
        <div style={{fontSize:12,color:"#555",marginBottom:8}}>Scientific notation writes any number as <strong>a × 10ⁿ</strong> where <strong>1 ≤ a &lt; 10</strong> (the mantissa) and n is an integer. This keeps the math tractable for numbers too big or small to write out.</div>
        {[{ex:"Distance from Earth to Sun",num:"150,000,000,000 m",sci:"1.5 × 10¹¹ m",note:"Move the decimal 11 places left"},
          {ex:"Atom radius (hydrogen)",num:"0.000 000 000 053 m",sci:"5.3 × 10⁻¹¹ m",note:"Move the decimal 11 places right"},
          {ex:"U.S. GDP (2025 est.)",num:"$29,000,000,000,000",sci:"$2.9 × 10¹³",note:"Move the decimal 13 places left"},
          {ex:"Avogadro's number",num:"602,000,000,000,000,000,000,000",sci:"6.02 × 10²³",note:"Atoms per mole of substance"},
        ].map((r,i)=>(<div key={i} style={{marginBottom:8,paddingBottom:8,borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1565C0"}}>{r.ex}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.num}</div>
          <div style={{fontSize:13,fontWeight:800,color:"#333",fontFamily:"monospace"}}>= {r.sci}</div>
          <div style={{fontSize:10,color:"#aaa"}}>{r.note}</div>
        </div>))}
      </div>
      <div style={{background:"#E3F2FD",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
        <div style={{fontWeight:700,fontSize:12,color:"#1565C0",marginBottom:6}}>Computing in scientific notation</div>
        {[{op:"Multiply",rule:"Multiply the mantissas, add the exponents",ex:"(2.0 × 10³) × (3.0 × 10⁴) = 6.0 × 10⁷"},
          {op:"Divide",rule:"Divide the mantissas, subtract the exponents",ex:"(6.0 × 10⁸) ÷ (2.0 × 10³) = 3.0 × 10⁵"},
          {op:"Mantissa precision",rule:"Keep significant figures consistent — don't write 1.000000 × 10³ when your measurement is only ±50",ex:"Earth-Sun distance = 1.5 × 10¹¹ m (2 sig figs from measurement)"},
        ].map((r,i)=>(<div key={i} style={{marginBottom:6}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1565C0"}}>{r.op}</div>
          <div style={{fontSize:11,color:"#555"}}>{r.rule}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:"monospace",marginTop:1}}>{r.ex}</div>
        </div>))}
      </div>
    </ExpandSection>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: NEGATIVE NUMBERS
// ═══════════════════════════════════════════════════════════════
