import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { Slider } from './_helpers';

export function Guide4(){
  const [servings,setServings]=useState(4);
  const base=4;const mult=servings/base;
  const recipe=[{ing:"Flour",amt:2,unit:"cups"},{ing:"Sugar",amt:1,unit:"cup"},{ing:"Eggs",amt:3,unit:""},{ing:"Butter",amt:0.5,unit:"cup"},{ing:"Milk",amt:1,unit:"cup"},{ing:"Vanilla",amt:2,unit:"tsp"}];
  return(<div>
    <DarkBox title="Ratios keep relationships constant"><div style={{fontSize:14}}>
      A ratio says: "for every X of this, you need Y of that." Scale up or down and the <strong style={{color:"#FFE77A"}}>relationship stays the same</strong>. Recipes, maps, exchange rates, unit pricing — all ratios.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <Slider label="Servings" min={1} max={16} value={servings} onChange={setServings} color="#E65100" />
      <div style={{fontSize:12,color:"#888",textAlign:"center",marginBottom:8}}>Base recipe: {base} servings · Multiplier: ×{mult.toFixed(2)}</div>
      {recipe.map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<recipe.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:13,color:"#555"}}>{r.ing}</span>
        <span style={{fontSize:14,fontWeight:700,color:"#E65100"}}>{(r.amt*mult)%1===0?(r.amt*mult):(r.amt*mult).toFixed(2)} {r.unit}</span>
      </div>))}
    </div>
    <Insight text="Unit pricing is a ratio: $4.99 for 16 oz vs $6.99 for 24 oz. Divide price by size: $0.31/oz vs $0.29/oz. The bigger one is cheaper per unit. Ratios help you compare anything." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 5: ORDER OF OPERATIONS
// ═══════════════════════════════════════════════════════════════
