import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, ProgressionPlayer } from './_helpers';

export function Guide17(){
  const [root,setRoot]=useState("C");
  return(<div>
    <DarkBox title="The pop progression"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>I – V – vi – IV</strong> (and its rotations) appears in hundreds of hits. The vi chord (the relative minor) is the emotional pivot — it introduces just enough sadness to make the return to IV and I feel satisfying.
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {["C","D","E","F","G","A"].map(n=>(<button key={n} onClick={()=>setRoot(n)} style={{padding:"5px 12px",borderRadius:8,border:root===n?"2.5px solid #1565C0":"1.5px solid #ddd",background:root===n?"#1565C0":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700}}>{n}</button>))}
    </div>
    <ProgressionPlayer root={root} numerals={["1","5","6","4"]} chordTypes={["major","major","minor","major"]} color="#1565C0" />
    <Insight text="This progression is so common it has its own comedy video ('4 Chords' by Axis of Awesome). Don't see that as a limitation — it shows that the emotional arc of this progression is deeply satisfying to human ears." />
  </div>);
}
