import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playSequence } from '../../../utils/audio';
import { Piano, buildScale } from './_helpers';

export function Guide29(){
  const scales=[
    {name:"Major Pentatonic",steps:[2,2,3,2,3],feel:"Happy, open, folk. Remove the 4th and 7th from major.",color:"#C62828"},
    {name:"Minor Pentatonic",steps:[3,2,2,3,2],feel:"Bluesy, rock. The foundation of improvisation for guitarists.",color:"#1565C0"},
    {name:"Blues Scale",steps:[3,2,1,1,3,2],feel:"Minor pentatonic + the 'blue note' (b5). Gritty, soulful.",color:"#6A1B9A"},
    {name:"Dorian Mode",steps:[2,1,2,2,2,1,2],feel:"Minor but with a bright 6th. Jazz, funk, Santana.",color:"#2E7D32"},
    {name:"Mixolydian Mode",steps:[2,2,1,2,2,1,2],feel:"Major but with a flat 7th. Bluesy-major, classic rock, folk.",color:"#E65100"},
  ];
  const [selScale,setSelScale]=useState(0);
  const [root,setRoot]=useState("A");
  const sc=scales[selScale];
  const notes=buildScale(root,sc.steps);
  return(<div>
    <DarkBox title="Different palettes for different moods"><div style={{fontSize:14}}>
      Major and minor are just two of many possible <strong style={{color:"#FFE77A"}}>scales/modes</strong>. Each creates a different emotional palette. These are the ones you'll encounter most.
    </div></DarkBox>
    <div style={{display:"flex",gap:4,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {scales.map((s,i)=>(<button key={i} onClick={()=>{setSelScale(i);playSequence(buildScale(root,s.steps).map(n=>n+"4"),180);}} style={{padding:"5px 10px",borderRadius:8,border:selScale===i?`2.5px solid ${s.color}`:"1.5px solid #ddd",background:selScale===i?s.color:"#fff",color:selScale===i?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:11}}>{s.name}</button>))}
    </div>
    <Piano keys={15} highlighted={notes} highlightColor={sc.color} labels={Object.fromEntries(notes.map((n,i)=>[n,String(i+1)]))} />
    <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:`2px solid ${sc.color}`,marginBottom:12}}>
      <div style={{fontSize:15,fontWeight:800,color:sc.color}}>{root} {sc.name}</div>
      <div style={{fontSize:12,color:"#555",marginTop:4}}>{sc.feel}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>{notes.slice(0,-1).map((n,i)=>(<span key={i} style={{padding:"3px 10px",borderRadius:6,background:`${sc.color}15`,color:sc.color,fontSize:13,fontWeight:700,border:`1px solid ${sc.color}25`}}>{n}</span>))}</div>
    </div>
  </div>);
}
