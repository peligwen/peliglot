import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide9(){return(<div>
  <DarkBox title="Surrounding target notes before landing"><div style={{fontSize:14}}>
    An enclosure <strong style={{color:"#c4a87a"}}>surrounds a target note</strong> with notes above and below, then lands on it. These micro-ornaments are what make lines sound "jazzy" rather than scalar. Every great jazz solo is full of them.
  </div></DarkBox>
  <Card color="#BF360C" title="Enclosure types">
    {[{type:"Chromatic above + below",pattern:"Target: E → approach: F - Eb - E",desc:"Half step from above, half step from below, land. The most common enclosure."},
      {type:"Diatonic above + chromatic below",pattern:"Target: E → approach: F - D# - E",desc:"Scale tone above, chromatic below. Slightly smoother."},
      {type:"Double chromatic",pattern:"Target: E → approach: F# - F - Eb - E",desc:"Two notes above, one below. More elaborate — adds rhythmic interest."},
      {type:"Arpeggio into enclosure",pattern:"Over Cmaj7: G - B → F - Eb - E",desc:"Outline the chord, then enclose a target. Combines vertical and horizontal."},
    ].map((e,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#EF9A9A"}}>{e.type}</div>
      <div style={{fontSize:13,color:"#ccc",fontFamily:"monospace",margin:"4px 0"}}>{e.pattern}</div>
      <div style={{fontSize:11,color:"#888"}}>{e.desc}</div>
    </div>))}
  </Card>
  <Insight text="The enclosure into the 3rd of the next chord is arguably the most-used melodic device in all of jazz. Over Dm7 → G7 → Cmaj7, enclose the E (3rd of C) approaching the resolution. You'll hear it in every solo." />
</div>);}
