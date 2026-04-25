import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide17(){
  const [monthly,setMonthly]=useState(200);const [rate,setRate]=useState(7);const [years,setYears]=useState(30);
  const r=rate/100/12;const n=years*12;
  const total=monthly*n;
  const future=monthly*(((1+r)**n-1)/r);
  return(<div>
    <DarkBox title="The most important growth pattern for your money"><div style={{fontSize:14}}>
      Exponential growth = <strong style={{color:"#FFE77A"}}>the growth itself grows</strong>. Compound interest earns interest on your interest. It starts slow, then explodes. Time is the key ingredient.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Monthly investment" min={50} max={2000} step={50} value={monthly} onChange={setMonthly} color="#1565C0" unit=""/>
      <Slider label="Annual return" min={1} max={15} step={0.5} value={rate} onChange={setRate} color="#2E7D32" unit="%"/>
      <Slider label="Years" min={1} max={50} value={years} onChange={setYears} color="#E65100" />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>You put in</div><div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>${total.toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Interest earned</div><div style={{fontSize:18,fontWeight:800,color:"#2E7D32"}}>${Math.round(future-total).toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#FFF3E0",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total value</div><div style={{fontSize:18,fontWeight:800,color:"#E65100"}}>${Math.round(future).toLocaleString()}</div></div>
      </div>
    </div>
    <Insight text="The Rule of 72: divide 72 by your interest rate to find how many years to double. At 7%, your money doubles roughly every 72/7 ≈ 10 years. At 10%, every 7.2 years." />
    {(()=>{const r7=0.07/12;const n35=35*12;const n25=45*12;const fv35=monthly*(((1+r7)**n35-1)/r7);const fv25=monthly*(((1+r7)**n25-1)/r7);return(<div style={{background:"#FFF3E0",borderRadius:12,padding:"12px 14px",border:"2px solid #E65100",marginTop:8}}>
      <div style={{fontWeight:700,color:"#E65100",marginBottom:6,fontSize:13}}>What if you started 10 years earlier?</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{padding:"8px",background:"#fff",borderRadius:8,textAlign:"center"}}>
          <div style={{fontSize:10,color:"#888"}}>Start at 35 → retire at 70</div>
          <div style={{fontSize:16,fontWeight:800,color:"#C62828"}}>${Math.round(fv35).toLocaleString()}</div>
          <div style={{fontSize:9,color:"#aaa"}}>35 years of ${monthly}/mo at 7%</div>
        </div>
        <div style={{padding:"8px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}>
          <div style={{fontSize:10,color:"#888"}}>Start at 25 → retire at 70</div>
          <div style={{fontSize:16,fontWeight:800,color:"#2E7D32"}}>${Math.round(fv25).toLocaleString()}</div>
          <div style={{fontSize:9,color:"#aaa"}}>45 years of ${monthly}/mo at 7%</div>
        </div>
      </div>
      <div style={{fontSize:11,color:"#555",marginTop:6,textAlign:"center"}}>Starting 10 years earlier = <strong>{Math.round(fv25/fv35*10)/10}× more money</strong> — same monthly payment, same rate.</div>
    </div>);})()}
  </div>);
}
