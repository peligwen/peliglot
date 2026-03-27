import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide11(){return(<div>
  <DarkBox title="Beyond triads and 7ths"><div style={{fontSize:14}}>
    Keep stacking thirds above the 7th: the <strong style={{color:"#FFE77A"}}>9th</strong> (= 2nd up an octave), <strong style={{color:"#FFE77A"}}>11th</strong> (= 4th), <strong style={{color:"#FFE77A"}}>13th</strong> (= 6th). These add color without changing the chord's fundamental character.
  </div></DarkBox>
  <Card color="#880E4F" title="Extensions & what they add">
    {[{ext:"9th",interval:"2nd up an octave",feel:"Brightness, soul, R&B. Hendrix chord = 7#9.",ex:"Cmaj9, Dm9, G9"},
      {ext:"11th",interval:"4th up an octave",feel:"Open, suspended quality. Common in funk.",ex:"Cm11, G11, Fmaj#11"},
      {ext:"13th",interval:"6th up an octave",feel:"Full, rich, warm. The 'complete' jazz chord.",ex:"C13, Dm13, G13"},
      {ext:"add9",interval:"Just add the 9th (no 7th)",feel:"Brighter than a triad, simpler than a 9th chord.",ex:"Cadd9, Gadd9, Eadd9"},
      {ext:"Altered (7#9, 7b9, 7#11)",interval:"Sharped/flatted extensions on dominant",feel:"Dissonant, colorful. The 'outside' sound of jazz.",ex:"G7#9, G7b9, G7#11"},
    ].map((e,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
        <span style={{background:"#880E4F",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:12,fontWeight:800}}>{e.ext}</span>
        <span style={{fontSize:11,color:"#888"}}>{e.interval}</span>
      </div>
      <div style={{fontSize:12,color:"#555"}}>{e.feel}</div>
      <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{e.ex}</div>
    </div>))}
  </Card>
  <Insight text="You don't need extensions to write great songs. Most pop uses triads and 7ths. Extensions are spices — a little goes a long way. Add a 9th when a triad sounds too plain." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 12-15: RHYTHM
// ═══════════════════════════════════════════════════════════════
