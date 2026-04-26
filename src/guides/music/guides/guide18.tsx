import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, ProgressionPlayer } from './_helpers';

export function Guide18(){
  const [prog,setProg]=useState(0);
  // All progressions in A minor. Explicit chord symbols avoid the sharp-only
  // ALL_NOTES bug for ♭VII/♭VI/♭III scale degrees.
  const progs=[
    {name:"i – iv – v",chords:[{label:"Am",symbol:"Am"},{label:"Dm",symbol:"Dm"},{label:"Em",symbol:"Em"}],
      desc:"Natural minor feel. The v chord here is a minor v — dark and unresolved. In real songs the V is usually major (harmonic minor) for a stronger cadence."},
    {name:"i – ♭VI – ♭III – ♭VII",chords:[{label:"Am",symbol:"Am"},{label:"F",symbol:"F"},{label:"C",symbol:"C"},{label:"G",symbol:"G"}],
      desc:"Epic minor progression (Aeolian loop). Common in rock ballads and film scores — 'Stairway to Heaven', 'Nothing Else Matters'."},
    {name:"i – ♭VII – ♭VI – V",chords:[{label:"Am",symbol:"Am"},{label:"G",symbol:"G"},{label:"F",symbol:"F"},{label:"E",symbol:"E"}],
      desc:"The true Andalusian cadence. Descending bass line A–G–F–E. The major V (E major) gives it the Phrygian-inflected flamenco sound. Core to flamenco, goth, and Middle Eastern-influenced music."},
  ];
  const p=progs[prog];
  return(<div>
    <DarkBox title="When songs go dark"><div style={{fontSize:14}}>Minor key progressions use the <strong style={{color:"#FFE77A"}}>natural minor scale</strong> chords. The i (minor tonic) is "home" — everything orbits around that darker center.</div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {progs.map((pr,i)=>(<button key={i} onClick={()=>setProg(i)} style={{padding:"6px 12px",borderRadius:8,border:prog===i?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:prog===i?"#6A1B9A":"#fff",color:prog===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{pr.name}</button>))}
    </div>
    <ProgressionPlayer chords={p.chords} color="#6A1B9A" />
    <div style={{fontSize:12,color:"#555",textAlign:"center",marginBottom:12}}>{p.desc}</div>
    <Card color="#6A1B9A" title="Borrowed chords — parallel minor">
      {[{label:"♭VII in a major key (e.g. G in C major)",desc:"The ♭VII is borrowed from the parallel minor scale (C minor's ♭VII = B♭). It's everywhere in rock: 'Hey Jude' (B♭–F–C), 'Sweet Home Alabama' (D–C–G)."},
        {label:"♭VI in a major key (e.g. A♭ in C major)",desc:"Also borrowed from parallel minor. Creates a dramatic, cinematic shift. Very common in film music and ballads — contrast against the bright I chord is stark."},
        {label:"iv in a major key (e.g. Fm in C major)",desc:"Minor iv over a major tonic. The pulled-down ♭3 is instantly emotional. I–IV–iv–I is a classic 'sad turnaround' used in gospel and soul."},
      ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#6A1B9A"}}>{s.label}</span>
        <div style={{fontSize:12,color:"#555",marginTop:2}}>{s.desc}</div>
      </div>))}
    </Card>
    <Insight text="The Andalusian cadence (i–♭VII–♭VI–V) gets its haunting flamenco character from the descending bass line and the raised leading tone in the final V chord. That half-step from E to F is the 'Spanish sound.'" />
  </div>);
}
