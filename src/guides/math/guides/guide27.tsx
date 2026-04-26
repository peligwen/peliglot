import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider, NumInput } from './_helpers';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide27(){
  const [initial,setInitial]=useState(1000);const [monthly,setMonthly]=useState(200);const [rate,setRate]=useState(7);const [years,setYears]=useState(30);
  const r=rate/100/12;const n=years*12;
  const fvInitial=initial*(1+r)**n;
  const fvMonthly=monthly*(((1+r)**n-1)/r);
  const total=fvInitial+fvMonthly;const contributed=initial+monthly*n;

  // Build a time series for the chart (one point per year)
  const chartData=[];
  for(let yr=0;yr<=years;yr++){
    const ni=yr*12;
    const bal=initial*(1+r)**ni+monthly*(((1+r)**ni-1)/r);
    const cont=initial+monthly*ni;
    chartData.push({yr,bal,cont});
  }
  const maxBal=chartData[chartData.length-1].bal;
  const W=280;const H=100;
  const toX=(yr: number)=>4+(yr/years)*(W-8);
  const toY=(v: number)=>H-4-(v/maxBal)*(H-8);

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

      {/* Balance-over-time chart */}
      <div style={{marginTop:14}}>
        <div style={{fontSize:11,color:"#888",marginBottom:4,textAlign:"center"}}>Balance over time — notice the exponential curve</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H+20}`} style={{overflow:"visible"}}>
          {/* contributed area */}
          <polyline
            points={chartData.map(d=>`${toX(d.yr)},${toY(d.cont)}`).join(" ")+" "+`${toX(years)},${H-4} 4,${H-4}`}
            fill="#BBDEFB" stroke="none"/>
          {/* total balance area */}
          <polyline
            points={chartData.map(d=>`${toX(d.yr)},${toY(d.bal)}`).join(" ")+" "+`${toX(years)},${H-4} 4,${H-4}`}
            fill="#C8E6C9" stroke="none"/>
          {/* balance line */}
          <polyline points={chartData.map(d=>`${toX(d.yr)},${toY(d.bal)}`).join(" ")} fill="none" stroke="#2E7D32" strokeWidth={1.5}/>
          {/* contribution line */}
          <polyline points={chartData.map(d=>`${toX(d.yr)},${toY(d.cont)}`).join(" ")} fill="none" stroke="#1565C0" strokeWidth={1} strokeDasharray="4"/>
          {/* axis */}
          <line x1={4} y1={H-4} x2={W-4} y2={H-4} stroke="#ccc" strokeWidth={1}/>
          <text x={4} y={H+14} fontSize={8} fill="#aaa">Year 0</text>
          <text x={W/2} y={H+14} fontSize={8} fill="#aaa" textAnchor="middle">Year {Math.round(years/2)}</text>
          <text x={W-4} y={H+14} fontSize={8} fill="#aaa" textAnchor="end">Year {years}</text>
        </svg>
        <div style={{display:"flex",gap:12,justifyContent:"center",fontSize:10,color:"#888",marginTop:2}}>
          <span><span style={{display:"inline-block",width:12,height:6,background:"#C8E6C9",border:"1px solid #2E7D32",marginRight:3,verticalAlign:"middle"}}/>Total balance</span>
          <span><span style={{display:"inline-block",width:12,height:0,borderTop:"2px dashed #1565C0",marginRight:3,verticalAlign:"middle"}}/>Amount contributed</span>
        </div>
        <div style={{textAlign:"center",fontSize:10,color:"#888",marginTop:2}}>Green gap = interest earned — it gets bigger exponentially over time</div>
      </div>
    </div>
    <ExpandSection title="Inflation & real vs. nominal returns" color="#1565C0">
      <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px"}}>
        <div style={{fontSize:11,color:"#555",marginBottom:10}}>The calculator above shows <strong>nominal</strong> dollars — the number on the account statement. But inflation erodes purchasing power every year. $243,000 in 30 years is worth far less than $243,000 today.</div>
        <div style={{background:"#E3F2FD",borderRadius:8,padding:"8px 10px",marginBottom:8}}>
          <div style={{fontWeight:700,fontSize:12,color:"#1565C0",marginBottom:4}}>Real return formula</div>
          <div style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#333"}}>Real rate ≈ Nominal rate − Inflation rate</div>
          <div style={{fontSize:10,color:"#aaa",marginTop:2}}>(Precise version: Real = (1+nominal)/(1+inflation) − 1)</div>
        </div>
        {[{scenario:"7% nominal, 3% inflation → 4% real return",note:"Your purchasing power grows at about 4% per year."},
          {scenario:"5% nominal, 6% inflation → −1% real return",note:"You're losing purchasing power even though the account grows."},
          {scenario:"$50,000 in 1990 ≈ $112,000 in 2025",note:"The CPI roughly doubled 1990-2025. So '$50K' means very different things in different eras."},
        ].map((r,i)=>(<div key={i} style={{marginBottom:i<2?6:0,paddingBottom:i<2?6:0,borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1565C0"}}>{r.scenario}</div>
          <div style={{fontSize:11,color:"#888"}}>{r.note}</div>
        </div>))}
        <div style={{background:"#FFF3E0",borderRadius:8,padding:"8px 10px",marginTop:8}}>
          <div style={{fontWeight:700,fontSize:11,color:"#E65100",marginBottom:2}}>Rule of 72 for inflation</div>
          <div style={{fontSize:11,color:"#555"}}>At 3% inflation, prices double every 72÷3 = 24 years. A $5 coffee today will cost ~$10 when your kids are in college.</div>
        </div>
      </div>
    </ExpandSection>
    <Insight text="Always compare investments in REAL (inflation-adjusted) terms. A savings account at 4.5% sounds good until you realize inflation is 4%. Your real return is only 0.5% — barely treading water." />
  </div>);
}
