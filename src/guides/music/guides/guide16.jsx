import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, ProgressionPlayer } from './_helpers';

export function Guide16(){
  const [root,setRoot]=useState("C");
  return(<div>
    <DarkBox title="The foundation of Western music"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>I – IV – V</strong> is the most common chord progression in history. Blues, rock, country, folk, gospel — they all live here. It's the musical equivalent of "subject – verb – object."
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {["C","D","E","F","G","A"].map(n=>(<button key={n} onClick={()=>setRoot(n)} style={{padding:"5px 12px",borderRadius:8,border:root===n?"2.5px solid #C62828":"1.5px solid #ddd",background:root===n?"#C62828":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700}}>{n}</button>))}
    </div>
    <ProgressionPlayer root={root} numerals={["1","4","5","1"]} chordTypes={["major","major","major","major"]} color="#C62828" />
    <Insight text="Why it works: I = home/stability. IV = departure/movement. V = tension/wanting to resolve. V → I is the strongest resolution in music. The whole cycle is: rest → movement → tension → rest." />
  </div>);
}
