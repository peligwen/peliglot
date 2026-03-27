import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { ProgressionPlayer } from './_helpers';

export function Guide18(){
  const [root,setRoot]=useState("A");
  const [prog,setProg]=useState(0);
  const progs=[
    {name:"i – iv – v",nums:["1","4","5"],types:["minor","minor","minor"],desc:"Natural minor feel. Dark but not dramatic."},
    {name:"i – VI – III – VII",nums:["1","6","3","7"],types:["minor","major","major","major"],desc:"Epic minor progression. Common in rock ballads and film scores."},
    {name:"i – iv – VII – III",nums:["1","4","7","3"],types:["minor","minor","major","major"],desc:"Andalusian cadence feel. Flamenco, goth, Middle Eastern influenced."},
  ];
  const p=progs[prog];
  return(<div>
    <DarkBox title="When songs go dark"><div style={{fontSize:14}}>Minor key progressions use the <strong style={{color:"#FFE77A"}}>natural minor scale</strong> chords. The i (minor tonic) is "home" — everything orbits around that darker center.</div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center"}}>
      {progs.map((pr,i)=>(<button key={i} onClick={()=>setProg(i)} style={{padding:"6px 12px",borderRadius:8,border:prog===i?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:prog===i?"#6A1B9A":"#fff",color:prog===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{pr.name}</button>))}
    </div>
    <ProgressionPlayer root={root} numerals={p.nums} chordTypes={p.types} color="#6A1B9A" />
    <div style={{fontSize:12,color:"#555",textAlign:"center",marginBottom:12}}>{p.desc}</div>
  </div>);
}
