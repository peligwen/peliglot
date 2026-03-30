import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide21(){
  const [data,_setData]=useState([30,35,40,42,45,50,55,250]);
  const sorted=[...data].sort((a,b)=>a-b);
  const mean=data.reduce((a,b)=>a+b,0)/data.length;
  const mid=Math.floor(sorted.length/2);
  const median=sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
  const freq={};data.forEach(d=>{freq[d]=(freq[d]||0)+1;});const modeVal=Object.entries(freq).sort((a,b)=>b[1]-a[1])[0];
  return(<div>
    <DarkBox title="Three ways to find the 'center' of data"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Mean</strong> = add all, divide by count (the "average"). <strong style={{color:"#FFE77A"}}>Median</strong> = the middle value when sorted. <strong style={{color:"#FFE77A"}}>Mode</strong> = most frequent value. Each tells a different story.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12,justifyContent:"center"}}>
        {data.map((d,i)=>(<span key={i} style={{padding:"4px 10px",borderRadius:6,background:d===250?"#FFEBEE":"#E3F2FD",color:d===250?"#C62828":"#1565C0",fontSize:14,fontWeight:700,border:"1px solid "+(d===250?"#FFCDD2":"#BBDEFB")}}>{d}</span>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <div style={{padding:"10px",background:"#E3F2FD",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Mean (average)</div><div style={{fontSize:20,fontWeight:800,color:"#1565C0"}}>{mean.toFixed(1)}</div><div style={{fontSize:9,color:"#aaa"}}>Pulled up by the outlier!</div></div>
        <div style={{padding:"10px",background:"#E8F5E9",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Median (middle)</div><div style={{fontSize:20,fontWeight:800,color:"#2E7D32"}}>{median}</div><div style={{fontSize:9,color:"#aaa"}}>Not affected by outlier</div></div>
        <div style={{padding:"10px",background:"#EDE7F6",borderRadius:8,textAlign:"center"}}><div style={{fontSize:10,color:"#888"}}>Mode (most frequent)</div><div style={{fontSize:20,fontWeight:800,color:"#6A1B9A"}}>{modeVal?modeVal[0]:"none"}</div><div style={{fontSize:9,color:"#aaa"}}>({modeVal?modeVal[1]:0}× occurrence)</div></div>
      </div>
    </div>
    <Insight text="'Average salary' is almost always misleading because a few very high earners pull the mean way up. Median household income is more honest — it tells you what the person in the MIDDLE earns." />
  </div>);
}
