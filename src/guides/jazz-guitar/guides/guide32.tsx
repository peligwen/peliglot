import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { playSequence } from '../../../utils/audio';
import { Insight, playBtnStyle } from './_helpers';
import { chordToneArray } from '../../../utils/chord';

// 12-bar jazz blues in F. The most fundamental form in jazz.
// Standard jazz blues has ii-V's into the IV, a diminished passing chord in bar 6,
// and a I-VI-ii-V turnaround at the end.

const BASIC_BLUES = [
  {bar:1,chord:"F7",role:"I7",desc:"Tonic dominant — blues always starts here"},
  {bar:2,chord:"Bb7",role:"IV7",desc:""},
  {bar:3,chord:"F7",role:"I7",desc:""},
  {bar:4,chord:"Cm7",role:"ii of IV",sub:"F7",desc:"→ F7: ii-V into the IV chord"},
  {bar:5,chord:"Bb7",role:"IV7",desc:"The IV change — the classic blues 'turnaround' moment"},
  {bar:6,chord:"Bdim7",role:"#IVdim7",desc:"Chromatic passing chord between IV and I"},
  {bar:7,chord:"F7",role:"I7",desc:""},
  {bar:8,chord:"D7",role:"VI7",desc:"Secondary dominant → sets up Gm7"},
  {bar:9,chord:"Gm7",role:"ii7",desc:"ii of IV — the 'last four' begins"},
  {bar:10,chord:"C7",role:"V7",desc:"The dominant — maximum tension"},
  {bar:11,chord:"F7",role:"I7",desc:""},
  {bar:12,chord:"C7",role:"V7",sub:"Gm7",desc:"Turnaround: Gm7-C7 takes you back to the top"},
];

const VARIANTS = [
  {
    name:"Standard Jazz Blues",
    form:["F7","Bb7","F7","Cm7-F7","Bb7","Bdim7","F7","D7","Gm7","C7","F7","Gm7-C7"],
    desc:"The full form with ii-V into IV (bars 3-4), passing diminished (bar 6), and VI7→ii-V turnaround (bars 8-10).",
    color:"#c4a87a"
  },
  {
    name:"Simple Blues",
    form:["F7","Bb7","F7","F7","Bb7","Bb7","F7","F7","C7","Bb7","F7","C7"],
    desc:"The I7-IV7-V7 skeleton. Country blues, early jazz. All dominant 7ths, no ii-V substitutions.",
    color:"#81C784"
  },
  {
    name:"Bird Blues",
    form:["Fmaj7","Em7b5-A7","Dm7-Db7","Cm7-F7","Bb7","Bbm7-Eb7","Am7-D7","Abm7-Db7","Gm7","C7","F7-D7","Gm7-C7"],
    desc:"Charlie Parker's 'Blues for Alice' model. Chromatic descending ii-V's from I through bVI7. Advanced.",
    color:"#EF9A9A"
  },
];

export function Guide32(){
  const [selVariant,setSelVariant]=useState(0);
  const [highlighted,setHighlighted]=useState<number | null>(null);
  const v=VARIANTS[selVariant];

  // Build audio for bars 1-4 of standard blues as demo
  function playBluesTonics(){
    const tones=[
      chordToneArray("F7",{octave:3}),
      chordToneArray("Bb7",{octave:3}),
      chordToneArray("F7",{octave:3}),
      chordToneArray("C7",{octave:3}),
    ];
    playSequence(tones,800);
  }

  return(<div>
    <DarkBox title="The foundation of jazz form"><div style={{fontSize:14,lineHeight:1.6}}>
      The <strong style={{color:"#c4a87a"}}>12-bar jazz blues</strong> is the single most important form to master. It's the proving ground for every technique in this collection — voice leading, bebop scales, arpeggios, pentatonics, and ii-V-I all come together here. Know this form cold.
    </div></DarkBox>

    <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:12,flexWrap:"wrap"}}>
      {VARIANTS.map((vv,i)=>(<button key={i} onClick={()=>setSelVariant(i)} style={{padding:"5px 12px",borderRadius:8,border:selVariant===i?`2px solid ${vv.color}`:"1.5px solid #444",background:selVariant===i?"#2a2218":"#1e1e1e",color:selVariant===i?vv.color:"#888",cursor:"pointer",fontWeight:700,fontSize:11}}>{vv.name}</button>))}
    </div>

    <div style={{background:"#1a1a1a",borderRadius:12,padding:"12px 16px",border:`2px solid ${v.color}`,marginBottom:12}}>
      <div style={{fontSize:13,fontWeight:700,color:v.color,marginBottom:6}}>{v.name} — in F</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3,marginBottom:8}}>
        {v.form.map((ch,i)=>(<div key={i} style={{background:"#2a2218",borderRadius:6,padding:"6px 4px",textAlign:"center",border:`1px solid ${v.color}30`}}>
          <div style={{fontSize:8,color:"#666",marginBottom:2}}>Bar {i+1}</div>
          <div style={{fontSize:10,fontWeight:700,color:v.color,lineHeight:1.2}}>{ch}</div>
        </div>))}
      </div>
      <div style={{fontSize:11,color:"#888"}}>{v.desc}</div>
    </div>

    {selVariant===0&&(<>
      <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:12}}>
        <button onClick={playBluesTonics} style={playBtnStyle}>▶ Play first 4 bars (dominant 7ths)</button>
      </div>
      <Card color="#c4a87a" title="Standard jazz blues — bar by bar (tap any bar)">
        {BASIC_BLUES.map((b,i)=>(<div key={i} onClick={()=>setHighlighted(highlighted===i?null:i)} style={{padding:"8px 14px",borderBottom:i<11?"1px solid #333":"none",cursor:"pointer",background:highlighted===i?"#2a2218":"transparent"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,color:"#c4a87a",fontSize:12}}>Bar {b.bar}: <strong style={{color:"#fff"}}>{b.chord}</strong></span>
            <span style={{fontSize:10,color:"#666"}}>{b.role}</span>
          </div>
          {b.sub&&<div style={{fontSize:10,color:"#888",marginTop:2}}>often: {b.chord} + {b.sub}</div>}
          {highlighted===i&&b.desc&&<div style={{fontSize:11,color:"#aaa",marginTop:4,paddingTop:4,borderTop:"1px solid #333"}}>{b.desc}</div>}
        </div>))}
      </Card>
    </>)}

    <Card color="#81C784" title="Blues vocabulary pointers">
      {[{title:"Bar 4: the ii-V into IV",detail:"Cm7-F7 in bar 4 creates a mini ii-V that lands on Bb7 in bar 5 — the IV chord arrival feels earned instead of blunt. This is the most important substitution in the form."},
        {title:"Bar 6: the passing diminished",detail:"Bdim7 connects Bb7 (bar 5) to F7 (bar 7) chromatically. Bdim7 shares notes with G7b9 (G-B-D-F → Bdim7 = B-D-F-Ab). It's a V7b9 in disguise."},
        {title:"Bar 8: VI7 (D7) as secondary dominant",detail:"D7 targets Gm7 in bar 9. V/ii: D7→Gm7 is a ii-V in G minor. This is the same secondary-dominant substitution from the turnaround concept."},
        {title:"Minor blues",detail:"Replace all dominant 7ths with m7s for i-iv: Fm7-Bbm7-Fm7-Fm7 / Bbm7-Bbm7-Fm7-Fm7 / Cm7-Bbm7-Fm7-Cm7. Dark, modal texture — standard in soul and fusion."},
      ].map((p,i)=>(<div key={i} style={{padding:"9px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
        <div style={{fontWeight:700,color:"#81C784",fontSize:12}}>{p.title}</div>
        <div style={{fontSize:11,color:"#888",marginTop:3}}>{p.detail}</div>
      </div>))}
    </Card>
    <Insight text="Practice the blues in all 12 keys — especially F, Bb, Eb, Ab (the flat keys common in jazz). Use the cycle of 4ths. Play the head (the blues melody/lick), comp behind it, then solo. A musician who can play blues fluently in 12 keys can play 80% of the standard repertoire." />
  </div>);
}
