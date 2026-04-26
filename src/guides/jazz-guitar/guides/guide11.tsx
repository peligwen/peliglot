import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide11(){return(<div>
  <DarkBox title="Using 'wrong' notes intentionally"><div style={{fontSize:14}}>
    <strong style={{color:"#c4a87a"}}>Sideslipping</strong> = shifting a pattern up or down a half step temporarily, then resolving back. <strong style={{color:"#c4a87a"}}>Chromatic passing tones</strong> connect diatonic notes with tension. The key: you must know what "inside" sounds like to effectively go "outside."
  </div></DarkBox>
  <Card color="#AD1457" title="Chromatic techniques">
    {[{tech:"Chromatic passing tones",desc:"Fill gaps between scale tones: C-C#-D-D#-E over Cmaj7. The chromatics resolve to chord tones, creating forward motion.",color:"#EF9A9A"},
      {tech:"Sideslipping",desc:"Take a pattern (e.g., Dm7 arpeggio), move it up a half step (Ebm7), then resolve back to Dm7. The momentary 'wrong' key creates delicious tension.",color:"#CE93D8"},
      {tech:"Chromatic enclosure of entire shapes",desc:"Approach a chord tone pattern from a half step above or below, then resolve. Like an enclosure but for whole phrases, not single notes.",color:"#90CAF9"},
      {tech:"Getting back 'inside'",desc:"The resolution is everything. Land on a strong chord tone on a strong beat after going outside. The contrast between tension and resolution IS the point.",color:"#81C784"},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none",borderLeft:`3px solid ${t.color}`}}>
      <span style={{fontWeight:700,color:t.color}}>{t.tech}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{t.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="John Scofield — master of controlled outside playing. Pat Martino's 'El Hombre' for chromatic lines that always resolve. Ben Monder for extreme outside vocabulary." />
</div>);}
