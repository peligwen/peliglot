import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

// 2025 single-filer brackets — IRS Rev. Proc. 2024-40
// https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025
// Note: this calculator shows federal income tax only; standard deduction is NOT subtracted.
// "Taxable income" means income after deductions. Check IRS.gov for the latest year's brackets.
export function Guide29(){
  const brackets=[{min:0,max:11925,rate:10},{min:11925,max:48475,rate:12},{min:48475,max:103350,rate:22},{min:103350,max:197300,rate:24},{min:197300,max:250525,rate:32},{min:250525,max:626350,rate:35},{min:626350,max:Infinity,rate:37}];
  const [income,setIncome]=useState(75000);
  let tax=0;let remaining=income;
  const breakdown=brackets.map(b=>{const taxable=Math.min(Math.max(remaining,0),b.max-b.min);const t=taxable*b.rate/100;tax+=t;remaining-=taxable;return{...b,taxable,tax:t};}).filter(b=>b.taxable>0);
  const effective=income>0?(tax/income*100):0;
  return(<div>
    <DarkBox title="Why 'moving into a higher bracket' isn't bad"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Marginal tax</strong> = only the income IN that bracket gets taxed at that rate. Making $100K doesn't mean ALL $100K is taxed at 22%. The first ~$11K is taxed at 10%, the next ~$35K at 12%, etc.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Taxable income" min={10000} max={500000} step={5000} value={income} onChange={setIncome} color="#2E7D32" unit=""/>
      {breakdown.map((b,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr 80px",padding:"5px 0",borderBottom:i<breakdown.length-1?"1px solid #f0eeeb":"none",alignItems:"center",fontSize:12}}>
        <span style={{fontWeight:800,color:"#2E7D32"}}>{b.rate}%</span>
        <div style={{background:"#E8F5E9",borderRadius:4,height:16,position:"relative",overflow:"hidden"}}><div style={{background:"#2E7D32",height:"100%",width:`${(b.taxable/income)*100}%`,borderRadius:4}}/></div>
        <span style={{textAlign:"right",color:"#555"}}>${Math.round(b.tax).toLocaleString()}</span>
      </div>))}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total tax</div><div style={{fontSize:20,fontWeight:800,color:"#2E7D32"}}>${Math.round(tax).toLocaleString()}</div></div>
        <div style={{padding:"10px",background:"#FFF3E0",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Effective rate</div><div style={{fontSize:20,fontWeight:800,color:"#E65100"}}>{effective.toFixed(1)}%</div></div>
      </div>
    </div>
    <Insight text="Your effective rate is ALWAYS lower than your marginal bracket. At $75K income, your marginal rate is 22% but your effective rate is only ~15%. The brackets protect you." />
    <div style={{fontSize:10,color:"#aaa",textAlign:"center",marginTop:4}}>2025 single filers · Federal income tax only · Taxable income (after deductions) · Rev. Proc. 2024-40 · Verify current brackets at IRS.gov before filing.</div>
  </div>);
}
