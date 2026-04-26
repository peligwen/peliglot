import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide10(){return(<div>
  <DarkBox title="The vocabulary inside ALL jazz"><div style={{fontSize:14}}>
    Even the most "out" jazz players use blues vocabulary. The minor pentatonic over dominant chords, the b5 blue note, bending into notes, the "cry" intervals — this language <strong style={{color:"#c4a87a"}}>permeates everything</strong> from bebop to fusion.
  </div></DarkBox>
  <Card color="#1565C0" title="Blues elements in jazz context">
    {[{elem:"Minor pentatonic over dominant",desc:"C minor pentatonic over C7 — the b3 (Eb) against the natural 3 (E) creates the fundamental 'blues rub.' This tension is the soul of the sound.",color:"#EF9A9A"},
      {elem:"Major/minor pentatonic blend",desc:"Mixing C major pentatonic (C-D-E-G-A) with C minor pentatonic (C-Eb-F-G-Bb). The ambiguity between major and minor 3rd IS the blues.",color:"#81C784"},
      {elem:"The blue note (b5)",desc:"Add Gb to C minor pentatonic: C-Eb-F-Gb-G-Bb. That Gb→G resolution is pure blues tension. Works over any chord in a blues.",color:"#90CAF9"},
      {elem:"Bending into chord tones",desc:"Bending from the b3 up to the 3, or from the b7 up toward the root. Physical expression of the blues — can't be notated, must be felt.",color:"#CE93D8"},
    ].map((b,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none",borderLeft:`3px solid ${b.color}`}}>
      <span style={{fontWeight:700,color:b.color}}>{b.elem}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{b.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="Grant Green — blues dripping from every note. Wes Montgomery's solo on 'D-Natural Blues.' Pat Metheny's 'Question and Answer' — even Metheny uses this language." />
</div>);}
