import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider, NumInput } from './_helpers';

export function Guide28(){
  const [principal,setPrincipal]=useState(250000);const [rate,setRate]=useState(6.5);const [years,setYears]=useState(30);
  const r=rate/100/12;const n=years*12;
  const payment=principal*(r*(1+r)**n)/((1+r)**n-1);
  const totalPaid=payment*n;const totalInterest=totalPaid-principal;

  // Build yearly amortization data
  const chartData=[];
  let balance=principal;
  for(let yr=0;yr<=years;yr++){
    chartData.push({yr,balance:Math.max(balance,0)});
    // advance one year
    for(let m=0;m<12&&balance>0;m++){
      const interestM=balance*r;
      const principalM=Math.min(payment-interestM,balance);
      balance-=principalM;
    }
  }
  const W=280;const H=100;
  const toX=(yr)=>4+(yr/years)*(W-8);
  const toY=(v)=>H-4-(v/principal)*(H-8);

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

      {/* Balance-over-time chart */}
      <div style={{marginTop:14}}>
        <div style={{fontSize:11,color:"#888",marginBottom:4,textAlign:"center"}}>Remaining balance over time — notice how slowly it falls at first</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H+20}`} style={{overflow:"visible"}}>
          {/* shaded area under curve */}
          <polyline
            points={chartData.map(d=>`${toX(d.yr)},${toY(d.balance)}`).join(" ")+" "+`${toX(years)},${H-4} 4,${H-4}`}
            fill="#FFCDD2" stroke="none"/>
          {/* balance line */}
          <polyline points={chartData.map(d=>`${toX(d.yr)},${toY(d.balance)}`).join(" ")} fill="none" stroke="#C62828" strokeWidth={1.5}/>
          {/* halfway marker */}
          {(()=>{const midYr=chartData.findIndex(d=>d.balance<=principal/2);if(midYr>0){const mx=toX(midYr);return(<g><line x1={mx} y1={0} x2={mx} y2={H-4} stroke="#aaa" strokeWidth={1} strokeDasharray="3"/><text x={mx+2} y={14} fontSize={8} fill="#888">50% paid off at yr {midYr}</text></g>);}return null;})()}
          {/* axis */}
          <line x1={4} y1={H-4} x2={W-4} y2={H-4} stroke="#ccc" strokeWidth={1}/>
          <text x={4} y={H+14} fontSize={8} fill="#aaa">Year 0</text>
          <text x={W/2} y={H+14} fontSize={8} fill="#aaa" textAnchor="middle">Year {Math.round(years/2)}</text>
          <text x={W-4} y={H+14} fontSize={8} fill="#aaa" textAnchor="end">Year {years}</text>
        </svg>
        <div style={{textAlign:"center",fontSize:10,color:"#888",marginTop:2}}>The curve is shallow at first — most early payments go to interest, not principal</div>
      </div>
    </div>
    <Insight text={`On a $${principal.toLocaleString()} mortgage at ${rate}%, you pay $${Math.round(totalInterest).toLocaleString()} in interest — ${Math.round(totalInterest/principal*100)}% of the original loan amount. That's the true cost of borrowing.`} />
  </div>);
}
