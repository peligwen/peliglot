import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider, NumInput } from './_helpers';

export function Guide28(){
  const [principal,setPrincipal]=useState(250000);const [rate,setRate]=useState(6.5);const [years,setYears]=useState(30);
  const r=rate/100/12;const n=years*12;
  const payment=principal*(r*(1+r)**n)/((1+r)**n-1);
  const totalPaid=payment*n;const totalInterest=totalPaid-principal;
  return(<div>
    <DarkBox title="How amortization really works"><div style={{fontSize:14}}>
      Most of your early payments go to <strong style={{color:"#EF9A9A"}}>interest</strong>, not principal. It takes years before you're meaningfully paying down the loan. This is how banks make money.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <NumInput label="Loan amount" value={principal} onChange={setPrincipal} unit="$" color="#C62828"/>
      <Slider label="Interest rate" min={1} max={15} step={0.25} value={rate} onChange={setRate} color="#C62828" unit="%"/>
      <Slider label="Term" min={5} max={30} step={5} value={years} onChange={setYears} unit=" years" color="#E65100"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
        <div style={{padding:"10px",background:"#FFEBEE",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Monthly payment</div><div style={{fontSize:20,fontWeight:800,color:"#C62828"}}>${Math.round(payment).toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#FFF3E0",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total interest</div><div style={{fontSize:20,fontWeight:800,color:"#E65100"}}>${Math.round(totalInterest).toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total paid</div><div style={{fontSize:20,fontWeight:800,color:"#1565C0"}}>${Math.round(totalPaid).toLocaleString()}</div></div>
      </div>
    </div>
    <Insight text={`On a $${principal.toLocaleString()} mortgage at ${rate}%, you pay $${Math.round(totalInterest).toLocaleString()} in interest — ${Math.round(totalInterest/principal*100)}% of the original loan amount. That's the true cost of borrowing.`} />
  </div>);
}
