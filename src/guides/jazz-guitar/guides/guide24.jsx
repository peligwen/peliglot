import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide24(){return(<div>
  <DarkBox title="When effects serve the music"><div style={{fontSize:14}}>
    Modern jazz guitar has embraced effects — but the players who use them well are <strong style={{color:"#c4a87a"}}>using effects as compositional tools</strong>, not masks for weak playing. The rule: if you'd sound great without the pedal, the pedal makes you sound even better.
  </div></DarkBox>
  <Card color="#546E7A" title="Modern jazz guitar approaches to effects">
    {[{player:"Bill Frisell",approach:"Delay, reverb, volume pedal, looper. Creates ambient, atmospheric textures. The effects are part of the composition — remove them and the music changes fundamentally.",color:"#c4a87a"},
      {player:"John Scofield",approach:"Slight overdrive/crunch. The Ibanez TS9 or similar, just enough grit to add harmonics. Never clean-clean but never distorted. The 'Sco' sound.",color:"#EF9A9A"},
      {player:"Julian Lage",approach:"Transparent. Tremolo, light reverb. The effects enhance the natural tone without obscuring it. You can still hear every nuance of his touch.",color:"#81C784"},
      {player:"Nels Cline",approach:"Full pedalboard: noise, distortion, octave, synth. Uses effects as an extension of improvisation — the sounds ARE the musical ideas.",color:"#90CAF9"},
      {player:"Kurt Rosenwinkel",approach:"Delay, chorus, slight dirt. The 'KR' sound is heavily processed but always musical. Feedback loops, harmonizer. Effects as part of the instrument.",color:"#CE93D8"},
    ].map((p,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none",borderLeft:`3px solid ${p.color}`}}>
      <span style={{fontWeight:700,color:p.color}}>{p.player}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{p.approach}</span>
    </div>))}
  </Card>
</div>);}
