import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide26(){return(<div>
  <DarkBox title="Lead sheets, slashes & hits"><div style={{fontSize:14}}>
    A jazz chart gives you the <strong style={{color:"#c4a87a"}}>minimum information</strong>: melody, chord symbols, and form markings. Everything else — voicings, comping rhythm, arrangement — is up to you. That's the point.
  </div></DarkBox>
  <Card color="#1a1a1a" title="Chart elements">
    {[{elem:"Chord symbols",desc:"Cmaj7, Dm7, G7(#11), Am7b5. You choose the voicing. The chart tells you WHAT, you decide HOW."},
      {elem:"Slash notation",desc:"Rhythm slashes (/ / / /) = comp freely in the given style. No specific rhythm written. You listen and respond."},
      {elem:"Rhythmic hits",desc:"Written rhythmic figures the whole band plays together. Kicks, stops, accents. These are non-negotiable — play them exactly."},
      {elem:"Form markings",desc:"Repeat signs, DS al Coda, Coda symbol, 1st/2nd endings. The roadmap. Misread these and you'll get lost."},
      {elem:"Nashville Number System",desc:"1-5-6-4 instead of C-G-Am-F. Chord function, not specific key. Transpose instantly — just change the 1."},
    ].map((e,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#aaa"}}>{e.elem}</span><br/>
      <span style={{fontSize:12,color:"#888"}}>{e.desc}</span>
    </div>))}
  </Card>
</div>);}
