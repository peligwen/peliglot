import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, Fretboard } from './_helpers';

// CAGED system: five major-triad shapes that tile the entire fretboard.
// Each shape is named after the open-chord position it resembles.
// Open-string semitone reference: string 6(E2)=4, 5(A2)=9, 4(D3)=2, 3(G3)=7, 2(B3)=11, 1(E4)=4
// All fret positions verified: note = (open_semitone + fret) % 12

const SHAPES = [
  {
    name:"C shape",
    rootString:"String 5",
    desc:"Root on string 5. The open-position C chord moves up the neck.",
    // C major in 3rd position area: R@s5f3=C, 3rd@s4f5=G(5th)... Actually C shape:
    // C shape has root on string 5. At position C (open): s5f0=A wait no, open C shape has C on string 5 fret 3.
    // Let's show the C shape at the C position (3rd fret) for C major:
    // C: s5f3=(9+3)%12=0=C, E: s4f2=(2+2)%12=4=E, G: s3f0=G(open), C: s2f1=(11+1)%12=0=C, E: s1f0=E(open)
    // For display we'll use the upper 4 strings in mid-neck
    dots:[{string:5,fret:3,label:"C"},{string:4,fret:2,label:"E"},{string:3,fret:0,label:"G"},{string:2,fret:1,label:"C"}],
    sf:0,
    color:"#C62828",
    connects:"Connects to A shape going up the neck."
  },
  {
    name:"A shape",
    rootString:"String 5",
    desc:"Root on string 5. The barre-chord A shape. Moves anywhere with a barre or with fingers.",
    // A shape for C major: C is on string 5 fret 3 (same root as C shape above, but different fingering)
    // Actually A shape has root on string 5 at fret 3 for C.
    // A-shape barre at fret 3: s6f3=(4+3)%12=7=G(no), wait barre covers all 6 strings.
    // A-shape chord (like open A = x02220): for C major at fret 3:
    // s5f3=C, s4f5=G, s3f5=C, s2f5=E, s1f3=G... let me verify:
    // s4f5=(2+5)=7=G ✓, s3f5=(7+5)=0=C ✓, s2f5=(11+5)=4=E ✓, s1f3=(4+3)=7=G ✓
    dots:[{string:5,fret:3,label:"C"},{string:4,fret:5,label:"G"},{string:3,fret:5,label:"C"},{string:2,fret:5,label:"E"},{string:1,fret:3,label:"G"}],
    sf:2,
    color:"#1565C0",
    connects:"Connects to G shape going up the neck."
  },
  {
    name:"G shape",
    rootString:"Strings 6 & 1",
    desc:"Root on strings 6 and 1. The open-G chord spread across four inner strings — roots on the outer strings.",
    // G shape for C major at 5th-position area:
    // s6f8=(4+8)%12=0=C ✓, s5f7=(9+7)%12=4=E ✓, s4f5=(2+5)%12=7=G ✓,
    // s3f5=(7+5)%12=0=C ✓, s2f5=(11+5)%12=4=E ✓, s1f8=(4+8)%12=0=C ✓
    dots:[{string:6,fret:8,label:"C"},{string:5,fret:7,label:"E"},{string:4,fret:5,label:"G"},{string:3,fret:5,label:"C"},{string:2,fret:5,label:"E"},{string:1,fret:8,label:"C"}],
    sf:4,
    color:"#2E7D32",
    connects:"Connects to E shape going up the neck."
  },
  {
    name:"E shape",
    rootString:"String 6",
    desc:"Root on string 6. The barre-chord E shape — the most widely used moveable shape in all of guitar.",
    // E shape for C major barre at fret 8:
    // s6f8=(4+8)%12=0=C ✓, s5f10=(9+10)%12=7=G ✓, s4f10=(2+10)%12=0=C ✓,
    // s3f9=(7+9)%12=4=E ✓, s2f8=(11+8)%12=7=G ✓, s1f8=(4+8)%12=0=C ✓
    dots:[{string:6,fret:8,label:"C"},{string:5,fret:10,label:"G"},{string:4,fret:10,label:"C"},{string:3,fret:9,label:"E"},{string:2,fret:8,label:"G"},{string:1,fret:8,label:"C"}],
    sf:7,
    color:"#E65100",
    connects:"Connects to D shape going up the neck."
  },
  {
    name:"D shape",
    rootString:"String 4",
    desc:"Root on string 4. The open-position D chord pattern — the least intuitive but essential for completing the system.",
    // D shape for C major at 10th position:
    // s4f10=(2+10)%12=0=C ✓, s3f12=(7+12)%12=7=G ✓,
    // s2f13=(11+13)%12=0=C ✓, s1f12=(4+12)%12=4=E ✓
    dots:[{string:4,fret:10,label:"C"},{string:3,fret:12,label:"G"},{string:2,fret:13,label:"C"},{string:1,fret:12,label:"E"}],
    sf:9,
    color:"#6A1B9A",
    connects:"Connects back to C shape going up the neck."
  },
];

export function Guide31(){
  const [sel,setSel]=useState(0);
  const s=SHAPES[sel];
  return(<div>
    <DarkBox title="Five shapes, one fretboard"><div style={{fontSize:14,lineHeight:1.6}}>
      The <strong style={{color:"#c4a87a"}}>CAGED system</strong> divides the guitar neck into five repeating major-triad shapes, each named for the open chord it resembles: C, A, G, E, D. Every chord, arpeggio, and scale pattern on the guitar can be anchored to one of these five shapes — and they connect seamlessly up the neck.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:12,flexWrap:"wrap"}}>
      {SHAPES.map((sh,i)=>(<button key={i} onClick={()=>setSel(i)} style={{padding:"6px 16px",borderRadius:8,border:sel===i?`2px solid ${sh.color}`:"1.5px solid #444",background:sel===i?"#2a2218":"#1e1e1e",color:sel===i?sh.color:"#888",cursor:"pointer",fontWeight:800,fontSize:14}}>{sh.name.split(' ')[0]}</button>))}
    </div>
    <div style={{background:"#2a2218",borderRadius:12,padding:"12px 16px",border:`2px solid ${s.color}`,marginBottom:12}}>
      <div style={{fontSize:16,fontWeight:800,color:s.color,marginBottom:4}}>{s.name} — C major</div>
      <div style={{fontSize:12,color:"#bbb",marginBottom:8}}>{s.desc}</div>
      <Fretboard frets={5} startFret={s.sf} dots={s.dots} highlightColor={s.color}/>
      <div style={{fontSize:11,color:"#888",textAlign:"center"}}>{s.connects}</div>
    </div>
    <Card color="#c4a87a" title="Why CAGED matters for jazz">
      {[{point:"Arpeggios overlay the shapes",detail:"Every maj7, m7, and dom7 arpeggio fits inside a CAGED shape. Learn each chord tone within the shape and you have 5 arpeggio positions for every chord."},
        {point:"Drop-2 voicings live within shapes",detail:"The drop-2 voicings in Guide 2 are each anchored to a CAGED shape. Knowing the shape tells you where to find nearby voice-leading alternatives."},
        {point:"One shape, 12 roots",detail:"Each CAGED shape moves chromatically up the neck. E-shape at fret 8 = C major. Fret 10 = D major. Fret 5 = A major. One shape, infinite keys."},
        {point:"Connection points",detail:"The five shapes connect in the CAGED order: C→A→G→E→D→C. Each shape's 'top' overlaps with the next shape's 'bottom.' The whole neck is covered with no gaps."},
      ].map((p,i)=>(<div key={i} style={{padding:"9px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
        <div style={{fontWeight:700,color:"#c4a87a",fontSize:13}}>{p.point}</div>
        <div style={{fontSize:11,color:"#888",marginTop:3}}>{p.detail}</div>
      </div>))}
    </Card>
    <Insight text="Start with the E shape and A shape — they're the most practical for barre-chord comping. Map your drop-2 voicings (Guide 2) onto each shape's position. Then connect two adjacent shapes and you can navigate any chord for two octaves without shifting." />
  </div>);
}
