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
  const [root,_setRoot]=useState("A");
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
    {(selScale===3||selScale===4)&&<div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12,fontSize:12,color:"#555"}}>
      <strong>Modes are major-scale rotations.</strong> C major's notes starting from D = D Dorian. C major starting from G = G Mixolydian. Every mode is just the same notes with a different home base. This single idea unlocks every modal sound — find the parent major key, then move the starting point.
      {selScale===3&&<div style={{marginTop:4}}>D Dorian: <strong>D</strong> E F G A B C D — same notes as C major but D is "home." The natural ♮6 (B) gives Dorian its characteristic brightness over minor.</div>}
      {selScale===4&&<div style={{marginTop:4}}>G Mixolydian: <strong>G</strong> A B C D E F G — same notes as C major but G is "home." The ♭7 (F) gives Mixolydian its bluesy-major character.</div>}
    </div>}
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"#333"}}>All 7 modes of C major (white keys, different starting notes)</div>
      {[{degree:1,name:"Ionian",start:"C",feel:"Major scale. Bright, resolved. The default."},
        {degree:2,name:"Dorian",start:"D",feel:"Minor + ♮6. Jazz, funk, 'So What', Santana."},
        {degree:3,name:"Phrygian",start:"E",feel:"Minor + ♭2. Dark, Spanish, metal. Ominous."},
        {degree:4,name:"Lydian",start:"F",feel:"Major + ♯4. Dreamy, floating. Film scores, Debussy."},
        {degree:5,name:"Mixolydian",start:"G",feel:"Major + ♭7. Bluesy-major. Classic rock, folk."},
        {degree:6,name:"Aeolian",start:"A",feel:"Natural minor scale. Sad, introspective."},
        {degree:7,name:"Locrian",start:"B",feel:"Diminished tonic + ♭2 + ♭5. Unstable, almost unusable as a tonal center."},
      ].map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"baseline",gap:6,padding:"3px 0",borderBottom:i<6?"1px solid #f0eeeb":"none",fontSize:11}}>
        <span style={{fontWeight:800,color:"#888",width:14,flexShrink:0}}>{m.degree}</span>
        <span style={{fontWeight:700,color:"#333",width:80,flexShrink:0}}>{m.name}</span>
        <span style={{color:"#888",width:14,flexShrink:0}}>{m.start}</span>
        <span style={{color:"#555"}}>{m.feel}</span>
      </div>))}
    </div>
  </div>);
}
