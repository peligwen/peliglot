import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide13(){
  const [a,setA]=useState(3);const [b,setB]=useState(4);const c=Math.sqrt(a*a+b*b);
  return(<div>
    <DarkBox title="The Pythagorean theorem = finding the diagonal"><div style={{fontSize:14}}>
      a² + b² = c². If you know two sides of a right triangle, you can find the third. This is the most practically useful theorem in all of math — it's how GPS, construction, and navigation work.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Side a" min={1} max={20} value={a} onChange={setA} color="#C62828" />
      <Slider label="Side b" min={1} max={20} value={b} onChange={setB} color="#1565C0" />
      <div style={{textAlign:"center",fontSize:14,fontFamily:"monospace",color:"#555",marginBottom:8}}>
        <span style={{color:"#C62828"}}>{a}²</span> + <span style={{color:"#1565C0"}}>{b}²</span> = <span style={{color:"#C62828"}}>{a*a}</span> + <span style={{color:"#1565C0"}}>{b*b}</span> = <span style={{fontWeight:800,color:"#2E7D32"}}>{a*a+b*b}</span>
      </div>
      <div style={{textAlign:"center",fontSize:20,fontWeight:800,color:"#2E7D32"}}>c = √{a*a+b*b} = {c.toFixed(2)}</div>
    </div>
    <Insight text="Practical use: need to know the diagonal of a room? A 12×16 ft room has a diagonal of √(144+256) = √400 = 20 ft. That's how much cable you need corner to corner." />
  </div>);
}
