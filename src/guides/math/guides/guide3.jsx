import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide3(){
  const [num,setNum]=useState(3);
  const [den,setDen]=useState(4);
  const dec=num/den;const pct=dec*100;
  return(<div>
    <DarkBox title="Three languages for the same idea"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>¾</strong> and <strong style={{color:"#FFE77A"}}>0.75</strong> and <strong style={{color:"#FFE77A"}}>75%</strong> are the same number written three ways. Fractions divide, decimals place, percentages compare to 100.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{display:"flex",gap:12,alignItems:"center",justifyContent:"center",marginBottom:12}}>
        <div style={{textAlign:"center"}}>
          <input type="number" value={num} onChange={e=>setNum(Number(e.target.value)||0)} style={{width:50,fontSize:20,fontWeight:800,textAlign:"center",border:"none",borderBottom:"3px solid #1565C0",outline:"none",color:"#1565C0"}}/>
          <div style={{height:3,background:"#1a1a1a",margin:"4px 0"}}/>
          <input type="number" value={den} onChange={e=>setDen(Math.max(1,Number(e.target.value)||1))} style={{width:50,fontSize:20,fontWeight:800,textAlign:"center",border:"none",borderBottom:"3px solid #C62828",outline:"none",color:"#C62828"}}/>
        </div>
        <span style={{fontSize:24,color:"#ccc"}}>=</span>
        <div style={{textAlign:"center",padding:"10px 20px",background:"#E3F2FD",borderRadius:10}}>
          <div style={{fontSize:24,fontWeight:800,color:"#1565C0"}}>{dec===Infinity?"∞":isNaN(dec)?"?":dec.toFixed(dec%1===0?0:4).replace(/0+$/,"").replace(/\.$/,"")}</div>
          <div style={{fontSize:10,color:"#888"}}>decimal</div>
        </div>
        <span style={{fontSize:24,color:"#ccc"}}>=</span>
        <div style={{textAlign:"center",padding:"10px 20px",background:"#E8F5E9",borderRadius:10}}>
          <div style={{fontSize:24,fontWeight:800,color:"#2E7D32"}}>{isNaN(pct)?"?":pct.toFixed(pct%1===0?0:2)}%</div>
          <div style={{fontSize:10,color:"#888"}}>percent</div>
        </div>
      </div>
      {/* Visual fraction */}
      <div style={{display:"flex",gap:2,justifyContent:"center",height:32}}>
        {Array.from({length:Math.min(den,20)}).map((_,i)=>(<div key={i} style={{flex:1,maxWidth:30,background:i<num?"#1565C0":"#eee",borderRadius:3,border:"1px solid #ddd"}}/>))}
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#888",marginTop:6}}>{num} out of {den} parts filled</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
      {[{frac:"1/2",dec:"0.5",pct:"50%"},{frac:"1/3",dec:"0.333...",pct:"33.3%"},{frac:"1/4",dec:"0.25",pct:"25%"},{frac:"1/5",dec:"0.2",pct:"20%"},{frac:"3/4",dec:"0.75",pct:"75%"},{frac:"1/10",dec:"0.1",pct:"10%"}].map(c=>(<div key={c.frac} style={{background:"#fff",borderRadius:8,padding:"8px",border:"1px solid #e0dcd5",textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#1565C0"}}>{c.frac}</div>
        <div style={{fontSize:11,color:"#555"}}>{c.dec} = {c.pct}</div>
      </div>))}
    </div>
    <Insight text="Quick mental math: to find 15% of something, find 10% (move the decimal left) then add half of that. 15% of $80: 10% = $8, half = $4, total = $12." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: RATIOS & PROPORTIONS — RECIPE SCALER
// ═══════════════════════════════════════════════════════════════
