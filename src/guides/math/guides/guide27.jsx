import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Slider, NumInput } from './_helpers';

export function Guide27(){
  const [initial,setInitial]=useState(1000);const [monthly,setMonthly]=useState(200);const [rate,setRate]=useState(7);const [years,setYears]=useState(30);
  const r=rate/100/12;const n=years*12;
  const fvInitial=initial*(1+r)**n;
  const fvMonthly=monthly*(((1+r)**n-1)/r);
  const total=fvInitial+fvMonthly;const contributed=initial+monthly*n;
  return(<div>
    <DarkBox title="Time × money × patience"><div style={{fontSize:14}}>
      Compound interest is <strong style={{color:"#FFE77A"}}>interest earning interest</strong>. The earlier you start, the more time does the work for you. The difference between starting at 25 vs 35 is enormous.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <NumInput label="Start with" value={initial} onChange={setInitial} unit="$" color="#1565C0"/>
      <Slider label="Monthly contribution" min={0} max={2000} step={50} value={monthly} onChange={setMonthly} color="#1565C0" unit=""/>
      <Slider label="Annual return" min={1} max={15} step={0.5} value={rate} onChange={setRate} color="#2E7D32" unit="%"/>
      <Slider label="Years" min={1} max={50} value={years} onChange={setYears} color="#E65100" />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>You contribute</div><div style={{fontSize:20,fontWeight:800,color:"#1565C0"}}>${contributed.toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Interest earns</div><div style={{fontSize:20,fontWeight:800,color:"#2E7D32"}}>${Math.round(total-contributed).toLocaleString()}</div></div>
      </div>
      <div style={{padding:"12px",background:"#FFF3E0",borderRadius:8,textAlign:"center",marginTop:8}}><div style={{fontSize:10,color:"#888"}}>Total after {years} years</div><div style={{fontSize:26,fontWeight:800,color:"#E65100"}}>${Math.round(total).toLocaleString()}</div></div>
    </div>
  </div>);
}
