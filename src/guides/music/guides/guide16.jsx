import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, ProgressionPlayer } from './_helpers';

export function Guide16(){
  const [root,setRoot]=useState("C");
  const [useV7,setUseV7]=useState(false);
  return(<div>
    <DarkBox title="The foundation of Western music"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>I – IV – V</strong> is the most common chord progression in history. Blues, rock, country, folk, gospel — they all live here. It's the musical equivalent of "subject – verb – object."
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:8}}>
      {["C","D","E","F","G","A"].map(n=>(<button key={n} onClick={()=>setRoot(n)} style={{padding:"5px 12px",borderRadius:8,border:root===n?"2.5px solid #C62828":"1.5px solid #ddd",background:root===n?"#C62828":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700}}>{n}</button>))}
    </div>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12}}>
      {[{v:false,l:"I – IV – V – I"},{v:true,l:"I – IV – V7 – I"}].map(o=>(<button key={String(o.v)} onClick={()=>setUseV7(o.v)} style={{padding:"5px 14px",borderRadius:8,border:useV7===o.v?"2px solid #C62828":"1.5px solid #ddd",background:useV7===o.v?"#C62828":"#fff",color:useV7===o.v?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:12}}>{o.l}</button>))}
    </div>
    <ProgressionPlayer root={root} numerals={["1","4","5","1"]} chordTypes={["major","major",useV7?"dom7":"major","major"]} color="#C62828" />
    {useV7&&<div style={{fontSize:12,color:"#555",textAlign:"center",marginBottom:8}}>The dominant 7th (V7) adds a b7 that desperately wants to resolve to I — this is the sound of common-practice harmony.</div>}
    <Insight text="Why it works: I = home/stability. IV = departure/movement. V = tension/wanting to resolve. V → I is the strongest resolution in music. The whole cycle is: rest → movement → tension → rest." />
  </div>);
}
