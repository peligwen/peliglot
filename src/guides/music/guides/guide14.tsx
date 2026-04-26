import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide14(){return(<div>
  <DarkBox title="Accenting the 'off' beats"><div style={{fontSize:14}}>
    Regular rhythm: <strong style={{color:"#FFE77A"}}>1</strong>-2-<strong style={{color:"#FFE77A"}}>3</strong>-4. Syncopation: 1-<strong style={{color:"#EF9A9A"}}>2</strong>-3-<strong style={{color:"#EF9A9A"}}>4</strong> (or the 'ands'). This is what makes funk, reggae, hip-hop, and Latin music feel different from a march.
  </div></DarkBox>
  <Card color="#C62828" title="Where the groove lives">
    {[{genre:"Funk",accent:"Heavy on beats 2 & 4 + the 'e' and 'a' (16th note subdivisions)",feel:"Makes you want to move. James Brown, Parliament."},{genre:"Reggae",accent:"Guitar/keys hit on beats 2 & 4 (the 'skank'), bass on 1",feel:"Laid-back, bouncy. Bob Marley."},{genre:"Hip-Hop",accent:"Snare on 2 & 4, hi-hat patterns create swing on 8ths/16ths",feel:"Head-nodding groove."},{genre:"Latin (Clave)",accent:"Specific 3-2 or 2-3 pattern across 2 bars",feel:"The rhythmic DNA of salsa, son, samba."},
    ].map((g,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <span style={{background:"#C62828",color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:12,fontWeight:800}}>{g.genre}</span>
      <div style={{fontSize:12,color:"#555",marginTop:4}}>{g.accent}</div>
      <div style={{fontSize:11,color:"#888",marginTop:2}}>{g.feel}</div>
    </div>))}
  </Card>
  <Insight text="The difference between playing notes and making music is often about where you place the emphasis. Play the SAME notes with different accents and it becomes a completely different genre." />
</div>);}
