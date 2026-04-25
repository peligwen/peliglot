import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide20(){
  const [flips,setFlips]=useState(0);const [heads,setHeads]=useState(0);
  // Store how many batches of 100 landed in each "heads" bucket (0-100, grouped by 5)
  const [hist,setHist]=useState(()=>new Array(21).fill(0));// buckets: 0-4,5-9,...,100
  const flip=()=>{
    const n=100;let h=0;for(let i=0;i<n;i++)if(Math.random()<0.5)h++;
    setFlips(f=>f+n);setHeads(hd=>hd+h);
    setHist(prev=>{const next=[...prev];next[Math.floor(h/5)]++;return next;});
  };
  const reset=()=>{setFlips(0);setHeads(0);setHist(new Array(21).fill(0));};
  const maxBin=Math.max(1,...hist);
  const batches=hist.reduce((a,b)=>a+b,0);

  // Combinatorics helpers
  const fact=n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;};
  const perm=(n,r)=>fact(n)/fact(n-r);
  const comb=(n,r)=>fact(n)/(fact(r)*fact(n-r));

  return(<div>
    <DarkBox title="How likely is it?"><div style={{fontSize:14}}>
      Probability = a number between <strong style={{color:"#FFE77A"}}>0 (impossible)</strong> and <strong style={{color:"#FFE77A"}}>1 (certain)</strong>. A fair coin is 0.5. Roll a 6 on a die: 1/6 ≈ 0.167. Probability is the language of uncertainty.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{textAlign:"center",marginBottom:8,fontSize:14,fontWeight:700,color:"#6A1B9A"}}>Coin Flip Simulator</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:12}}>
        <button onClick={flip} style={{padding:"8px 20px",borderRadius:8,background:"#6A1B9A",color:"#fff",border:"none",cursor:"pointer",fontWeight:700}}>Flip 100 coins</button>
        <button onClick={reset} style={{padding:"8px 20px",borderRadius:8,background:"#eee",color:"#666",border:"none",cursor:"pointer",fontWeight:700}}>Reset</button>
      </div>
      {flips>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{padding:"8px",background:"#EDE7F6",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total flips</div><div style={{fontSize:18,fontWeight:800,color:"#6A1B9A"}}>{flips}</div></div>
        <div style={{padding:"8px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Heads</div><div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{heads} ({(heads/flips*100).toFixed(1)}%)</div></div>
        <div style={{padding:"8px",background:"#FFEBEE",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Tails</div><div style={{fontSize:18,fontWeight:800,color:"#C62828"}}>{flips-heads} ({((flips-heads)/flips*100).toFixed(1)}%)</div></div>
      </div>}
      {flips===0&&<div style={{textAlign:"center",fontSize:12,color:"#aaa",marginBottom:12}}>Press the button to start flipping</div>}
      {batches>0&&(<div>
        <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:6,textAlign:"center"}}>Distribution of heads across {batches} batch{batches>1?"es":""} of 100 flips</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:1,height:80,padding:"0 4px",justifyContent:"center"}}>
          {hist.map((count,i)=>{const pct=count/maxBin*100;const mid=i*5+2;const isCenter=mid>=40&&mid<=60;return(
            <div key={i} title={`${i*5}-${i*5+4} heads: ${count} batch${count!==1?"es":""}`}
              style={{flex:1,maxWidth:22,height:`${Math.max(pct,count>0?4:0)}%`,background:isCenter?"#6A1B9A":"#C5B3E6",borderRadius:"2px 2px 0 0",transition:"height 0.2s",minHeight:count>0?3:0}}/>
          );})}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#aaa",marginTop:2,padding:"0 4px"}}>
          <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
        </div>
        <div style={{textAlign:"center",fontSize:10,color:"#888",marginTop:2}}>Number of heads per batch — notice the bell shape forming around 50</div>
      </div>)}
    </div>
    <Insight text="With few flips, you might get 60% heads. With thousands, it converges toward 50%. This is the Law of Large Numbers — probability is about long-term patterns, not individual events." />
    <Insight text="The histogram shows the Central Limit Theorem in action: flip enough batches and the distribution of results forms a bell curve centered at 50. This works for almost any random process." />
    <ExpandSection title="How to count outcomes: factorials, permutations & combinations" color="#6A1B9A">
      <div style={{background:"#fff",borderRadius:10,border:"1px solid #e0dcd5",padding:"12px 14px"}}>
        <div style={{fontSize:11,color:"#555",marginBottom:10}}>Probability requires knowing how many ways something CAN happen (favorable) and how many ways it COULD happen (total). That's counting.</div>
        {[{name:"Factorial  n!",formula:"n! = n × (n−1) × … × 1",desc:"Ways to arrange n things in a row.",ex:`5! = 5×4×3×2×1 = ${fact(5)} ways to seat 5 people at a table`},
          {name:"Permutations  nPr",formula:"nPr = n! / (n−r)!",desc:"Ways to choose r items from n where order matters.",ex:`10P3 = ${perm(10,3).toLocaleString()} — 3-digit codes from 10 digits, no repeats`},
          {name:"Combinations  nCr",formula:"nCr = n! / (r! × (n−r)!)",desc:"Ways to choose r items from n where order doesn't matter.",ex:`52C5 = ${comb(52,5).toLocaleString()} — possible 5-card poker hands`},
        ].map((r,i)=>(<div key={i} style={{marginBottom:i<2?10:0,paddingBottom:i<2?10:0,borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
          <div style={{fontWeight:700,fontSize:13,color:"#6A1B9A"}}>{r.name}</div>
          <div style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#333",margin:"2px 0 2px 8px"}}>{r.formula}</div>
          <div style={{fontSize:11,color:"#888",marginLeft:8}}>{r.desc}</div>
          <div style={{fontSize:11,color:"#2E7D32",marginLeft:8,fontStyle:"italic"}}>{r.ex}</div>
        </div>))}
        <div style={{background:"#EDE7F6",borderRadius:8,padding:"8px 10px",marginTop:10}}>
          <div style={{fontWeight:700,fontSize:11,color:"#6A1B9A",marginBottom:4}}>Why lottery odds are terrible</div>
          <div style={{fontSize:11,color:"#555"}}>MegaMillions: pick 5 from 70, then 1 from 25. Total combinations = C(70,5) × 25 = {comb(70,5).toLocaleString()} × 25 = {(comb(70,5)*25).toLocaleString()}. That's 1 in 302 million.</div>
        </div>
      </div>
    </ExpandSection>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 21-26: DATA & STATISTICS
// ═══════════════════════════════════════════════════════════════
