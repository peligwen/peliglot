import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide24(){return(<div>
  <DarkBox title="What makes a melody memorable"><div style={{fontSize:14}}>
    A <strong style={{color:"#FFE77A"}}>hook</strong> is the part that sticks in your head. A <strong style={{color:"#FFE77A"}}>motif</strong> is a short melodic idea that recurs throughout a piece. The best hooks ARE simple motifs — short, rhythmically distinctive, and repeated with variation.
  </div></DarkBox>
  <Card color="#E65100" title="Hook principles">
    {[{principle:"Repetition with variation",desc:"State an idea, then repeat it slightly changed. The brain loves patterns it can almost predict."},
      {principle:"Rhythmic identity",desc:"The RHYTHM of a hook is often more memorable than the pitches. Try clapping 'We Will Rock You' — recognizable without any notes."},
      {principle:"Call and response",desc:"A phrase that 'asks' followed by one that 'answers.' Creates conversational flow."},
      {principle:"Range constraint",desc:"Most great hooks span less than an octave. Singability = memorability."},
      {principle:"Tension placement",desc:"Place the hook's highest note or most dissonant interval on an emotionally important word or beat."},
    ].map((p,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
      <span style={{fontWeight:700,color:"#E65100"}}>{p.principle}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{p.desc}</span>
    </div>))}
  </Card>
</div>);}
