import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, buildScale, MAJOR_STEPS } from './_helpers';

const circleOfFifths=[
  {key:"C",sharps:0,flats:0,rel:"Am"},{key:"G",sharps:1,flats:0,rel:"Em"},{key:"D",sharps:2,flats:0,rel:"Bm"},
  {key:"A",sharps:3,flats:0,rel:"F#m"},{key:"E",sharps:4,flats:0,rel:"C#m"},{key:"B",sharps:5,flats:0,rel:"G#m"},
  {key:"F#",sharps:6,flats:0,rel:"D#m"},{key:"Db",sharps:0,flats:5,rel:"Bbm"},{key:"Ab",sharps:0,flats:4,rel:"Fm"},
  {key:"Eb",sharps:0,flats:3,rel:"Cm"},{key:"Bb",sharps:0,flats:2,rel:"Gm"},{key:"F",sharps:0,flats:1,rel:"Dm"},
];

export function Guide5(){
  const [selKey,setSelKey]=useState(0);
  const k=circleOfFifths[selKey];
  return(<div>
    <DarkBox title="Which sharps/flats belong to which key"><div style={{fontSize:14}}>
      The <strong style={{color:"#FFE77A"}}>Circle of Fifths</strong> is your map. Each step clockwise adds a sharp. Each step counter-clockwise adds a flat. It's a reference tool, not something to memorize.
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:16}}>
      {circleOfFifths.map((ck,i)=>(<button key={i} onClick={()=>setSelKey(i)} style={{width:42,height:42,borderRadius:"50%",border:selKey===i?"2.5px solid #2E7D32":"1.5px solid #ddd",background:selKey===i?"#2E7D32":"#fff",color:selKey===i?"#fff":"#333",cursor:"pointer",fontSize:12,fontWeight:800}}>{ck.key}</button>))}
    </div>
    <div style={{background:"#fff",borderRadius:14,padding:"14px 18px",border:"2px solid #2E7D32",marginBottom:16}}>
      <div style={{fontSize:20,fontWeight:800,color:"#2E7D32"}}>{k.key} major / {k.rel}</div>
      <div style={{fontSize:14,color:"#555",marginTop:4}}>
        {k.sharps>0?`${k.sharps} sharp${k.sharps>1?"s":""}`:k.flats>0?`${k.flats} flat${k.flats>1?"s":""}`:("No sharps or flats")}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
        {buildScale(k.key.replace("b","").replace("#",""),MAJOR_STEPS).slice(0,7).map((n,i)=>(<span key={i} style={{padding:"4px 10px",borderRadius:6,background:"#E8F5E9",color:"#2E7D32",fontSize:13,fontWeight:700,border:"1px solid #C8E6C9"}}>{n}</span>))}
      </div>
    </div>
    <Insight text="To find the key of a song: look at the sharps/flats it uses, find that key on the circle. Or simpler — what chord does the song feel like it 'comes home' to? That's probably the key." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 6: HOW CHORDS ARE BUILT
// ═══════════════════════════════════════════════════════════════
