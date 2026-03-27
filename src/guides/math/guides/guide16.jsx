import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide16(){
  const [base,setBase]=useState(40000);const [raise,setRaise]=useState(2000);
  const years=[0,1,2,3,4,5,6,7,8,9,10];
  return(<div>
    <DarkBox title="Constant rate of change"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>y = mx + b</strong>. m = rate (slope). b = starting value (intercept). Every straight-line graph is this formula. Salary with annual raise, rent increasing each year, gas fill-ups over time.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Starting salary" min={20000} max={100000} step={5000} value={base} onChange={setBase} color="#1565C0" unit=""/>
      <Slider label="Annual raise" min={0} max={10000} step={500} value={raise} onChange={setRaise} color="#2E7D32" unit=""/>
      <div style={{display:"flex",gap:2,alignItems:"flex-end",height:100,justifyContent:"center",marginBottom:8}}>
        {years.map(y=>{const val=base+raise*y;const maxVal=base+raise*10;return(
          <div key={y} style={{width:24,background:"#1565C0",borderRadius:"3px 3px 0 0",height:`${(val/maxVal)*100}%`,display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
            <span style={{fontSize:7,color:"#fff",marginTop:2}}>{y}</span>
          </div>
        );})}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
        <span style={{color:"#888"}}>Year 0: <strong style={{color:"#1565C0"}}>${base.toLocaleString()}</strong></span>
        <span style={{color:"#888"}}>Year 10: <strong style={{color:"#2E7D32"}}>${(base+raise*10).toLocaleString()}</strong></span>
      </div>
    </div>
    <Insight text="The formula: Salary in year N = $base + $raise × N. If you start at $40K with $2K annual raises, year 10 = $40K + $2K×10 = $60K. Linear growth adds the same amount each period." />
  </div>);
}
