import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide2(){
  const scenarios=[
    {label:"Bank balance",positive:"$500 in savings",zero:"$0 — broke",negative:"-$200 — you owe the bank",color:"#2E7D32"},
    {label:"Temperature",positive:"30°F above zero",zero:"0°F — the baseline",negative:"-10°F — below zero, very cold",color:"#1565C0"},
    {label:"Elevation",positive:"5,000 ft — mountain",zero:"0 ft — sea level",negative:"-282 ft — Death Valley",color:"#E65100"},
    {label:"Profit/Loss",positive:"+$10K — profit",zero:"$0 — breakeven",negative:"-$5K — loss",color:"#C62828"},
  ];
  return(<div>
    <DarkBox title="The number line extends left"><div style={{fontSize:14}}>
      Negative numbers aren't abstract — they're the <strong style={{color:"#FFE77A"}}>other direction</strong>. Debt, below zero, underground, losses. The number line doesn't stop at zero; it mirrors infinitely to the left.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:12,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16,position:"relative",height:70}}>
      <div style={{position:"absolute",top:20,left:"5%",right:"5%",height:3,background:"linear-gradient(90deg,#C62828,#ccc 50%,#2E7D32)",borderRadius:2}}/>
      {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map(n=>(<div key={n} style={{position:"absolute",left:`${5+(n+5)*8.18}%`,top:12}}>
        <div style={{width:2,height:n===0?24:16,background:n<0?"#C62828":n>0?"#2E7D32":"#1a1a1a",margin:"0 auto"}}/>
        <div style={{fontSize:n===0?14:10,fontWeight:n===0?800:400,color:n<0?"#C62828":n>0?"#2E7D32":"#1a1a1a",textAlign:"center",marginTop:2}}>{n}</div>
      </div>))}
    </div>
    {scenarios.map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:4}}>{s.label}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,fontSize:11}}>
        <div style={{padding:"4px 6px",borderRadius:4,background:"#E8F5E9",color:"#2E7D32",textAlign:"center"}}>{s.positive}</div>
        <div style={{padding:"4px 6px",borderRadius:4,background:"#f5f3ef",color:"#888",textAlign:"center"}}>{s.zero}</div>
        <div style={{padding:"4px 6px",borderRadius:4,background:"#FFEBEE",color:"#C62828",textAlign:"center"}}>{s.negative}</div>
      </div>
    </div>))}
    <Insight text="Why negative × negative = positive? Think of it as reversing direction twice. Face right (+). Turn around (×-1) = face left. Turn around again (×-1) = face right again. Two reversals = back to positive." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: FRACTIONS, DECIMALS & PERCENTAGES — CONVERTER
// ═══════════════════════════════════════════════════════════════
