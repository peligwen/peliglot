import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide17(){return(<div>
  <DarkBox title="Playing without a fixed tempo"><div style={{fontSize:14}}>
    Rubato is expressive time — <strong style={{color:"#c4a87a"}}>stretching and compressing</strong> the pulse intentionally. Ballad intros, unaccompanied passages, and duo settings all require this skill. It's not "out of time" — it's "in YOUR time."
  </div></DarkBox>
  <Card color="#FF8F00" title="Rubato skills">
    {[{skill:"Ballad intro",desc:"Solo guitar intro before the band enters. Establish the melody, suggest the harmony, set the emotional tone. Can be free or loosely in tempo. End on V7 to cue the band."},
      {skill:"Stretching phrase endings",desc:"Hold the last note of a phrase slightly longer than expected before starting the next. Creates breath and drama. The silence IS the music."},
      {skill:"Accelerating/decelerating",desc:"Gradually speeding up into a climactic passage, then pulling back. The tempo itself becomes an expressive tool."},
      {skill:"Free improvisation",desc:"No predetermined tempo or form. Requires deep listening — you must hear what the music needs moment to moment. The ultimate form of musical conversation."},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#FFB74D"}}>{s.skill}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{s.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="Joe Pass 'Virtuoso' — solo guitar rubato mastery. Bill Evans' trio for rubato within a group context. Keith Jarrett's 'Köln Concert' for extended rubato solo performance." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 18-21: ii-V-I LABORATORY
// ═══════════════════════════════════════════════════════════════
