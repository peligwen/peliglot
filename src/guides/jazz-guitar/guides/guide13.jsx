import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide13(){return(<div>
  <DarkBox title="Narrative over noodling"><div style={{fontSize:14}}>
    A <strong style={{color:"#c4a87a"}}>motif</strong> is a short melodic idea. <strong style={{color:"#c4a87a"}}>Development</strong> means transforming it: repeat it at different pitches, change the rhythm, invert it, fragment it. This creates a coherent solo with a story arc instead of a string of unrelated licks.
  </div></DarkBox>
  <Card color="#4527A0" title="Development techniques">
    {[{tech:"Repetition with variation",desc:"Play the motif, then repeat it slightly changed — new pitch, added note, different ending. The brain loves almost-predictable patterns."},
      {tech:"Sequence (transposition)",desc:"Move the same shape to a different scale degree: play it from C, then from D, then from E. Creates forward motion through the harmony."},
      {tech:"Rhythmic displacement",desc:"Keep the pitches the same but start the motif on a different beat. A 4-note pattern starting on beat 1, then beat 2, then the 'and' of 3."},
      {tech:"Fragmentation",desc:"Take the first 2 notes of a 5-note motif and develop just those. Zoom into a piece of the idea."},
      {tech:"Inversion",desc:"Flip the motif upside down. If it went up a 3rd then down a 2nd, invert to down a 3rd then up a 2nd."},
    ].map((t,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#CE93D8"}}>{t.tech}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{t.desc}</span>
    </div>))}
  </Card>
  <Ref name="Study" text="Sonny Rollins 'St. Thomas' solo — the textbook motivic development masterclass. Wes Montgomery's soloing builds ideas across chorus after chorus." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 14-17: RHYTHM
// ═══════════════════════════════════════════════════════════════
