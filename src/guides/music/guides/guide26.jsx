import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide26(){return(<div>
  <DarkBox title="Why instruments sound different"><div style={{fontSize:14}}>
    A piano and guitar playing the same C4 produce different <strong style={{color:"#FFE77A"}}>timbres</strong> — the "color" of sound. Same pitch, different character. Timbre comes from <strong style={{color:"#FFE77A"}}>overtones</strong>: extra frequencies vibrating above the fundamental note.
  </div></DarkBox>
  <Card color="#1565C0" title="The vocabulary of describing sound">
    {[{term:"Bright",desc:"Strong high frequencies. Cymbals, electric guitar with treble up, synth leads.",opp:"Dark"},{term:"Warm",desc:"Rich mid-low frequencies, gentle highs. Acoustic guitar, analog synth, tube amp.",opp:"Cold/thin"},
      {term:"Full/thick",desc:"Wide frequency range, multiple layers or harmonics.",opp:"Thin/hollow"},{term:"Dirty/gritty",desc:"Distortion, saturation, intentional 'imperfection.'",opp:"Clean"},
      {term:"Dry",desc:"No reverb or effects. Close, intimate, direct.",opp:"Wet (with reverb/effects)"},
    ].map((t,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,color:"#1565C0"}}>{t.term}</span><span style={{fontSize:11,color:"#aaa"}}>opposite: {t.opp}</span></div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{t.desc}</div>
    </div>))}
  </Card>
</div>);}
