import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide20(){
  const [flips,setFlips]=useState(0);const [heads,setHeads]=useState(0);
  const flip=()=>{const n=100;let h=0;for(let i=0;i<n;i++)if(Math.random()<0.5)h++;setFlips(f=>f+n);setHeads(hd=>hd+h);};
  const reset=()=>{setFlips(0);setHeads(0);};
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
      {flips>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <div style={{padding:"8px",background:"#EDE7F6",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Total flips</div><div style={{fontSize:18,fontWeight:800,color:"#6A1B9A"}}>{flips}</div></div>
        <div style={{padding:"8px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Heads</div><div style={{fontSize:18,fontWeight:800,color:"#1565C0"}}>{heads} ({(heads/flips*100).toFixed(1)}%)</div></div>
        <div style={{padding:"8px",background:"#FFEBEE",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Tails</div><div style={{fontSize:18,fontWeight:800,color:"#C62828"}}>{flips-heads} ({((flips-heads)/flips*100).toFixed(1)}%)</div></div>
      </div>}
      {flips===0&&<div style={{textAlign:"center",fontSize:12,color:"#aaa"}}>Press the button to start flipping</div>}
    </div>
    <Insight text="With few flips, you might get 60% heads. With thousands, it converges toward 50%. This is the Law of Large Numbers — probability is about long-term patterns, not individual events." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 21-26: DATA & STATISTICS
// ═══════════════════════════════════════════════════════════════
