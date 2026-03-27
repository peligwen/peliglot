import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide14(){return(<div>
  <DarkBox title="Not a mechanical long-short — a spectrum"><div style={{fontSize:14}}>
    Swing is a <strong style={{color:"#c4a87a"}}>feel</strong>, not a ratio. The triplet-based explanation (long-short = 2/3-1/3) is a simplification. Real swing lives on a spectrum from laid-back to on-top, and each player's swing is their fingerprint.
  </div></DarkBox>
  <Card color="#E65100" title="The swing spectrum">
    {[{feel:"Laid-back (behind the beat)",desc:"The second eighth note is late, almost lazy. Creates a heavy, relaxed groove. Dexter Gordon, Grant Green.",color:"#EF9A9A"},
      {feel:"Middle swing",desc:"The 'default' swing feel. Not rushing, not dragging. The ride cymbal's spang-a-lang is the reference. Wes Montgomery.",color:"#c4a87a"},
      {feel:"On-top (ahead of the beat)",desc:"Slight forward push. Creates urgency and excitement. Bebop tempos. Pat Martino, Charlie Parker.",color:"#81C784"},
      {feel:"Even eighths (modern jazz)",desc:"Some modern jazz uses straight eighths with a jazz harmonic vocabulary. Kurt Rosenwinkel, Julian Lage at times.",color:"#90CAF9"},
    ].map((f,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none",borderLeft:`3px solid ${f.color}`}}>
      <span style={{fontWeight:700,color:f.color}}>{f.feel}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{f.desc}</span>
    </div>))}
  </Card>
  <Insight text="Your swing feel is personal. There's no 'correct' ratio. The important thing is consistency — whatever your feel is, it should be intentional and steady. The ride cymbal is your metronome." />
</div>);}
