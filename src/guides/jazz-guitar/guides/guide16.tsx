import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide16(){return(<div>
  <DarkBox title="Playing 3 in the space of 4"><div style={{fontSize:14}}>
    Take a 3-note pattern and play it in 4/4 time. The pattern starts on beat 1, then beat 4, then beat 3, then beat 2... it cycles through the barline, creating the illusion of a <strong style={{color:"#c4a87a"}}>metric shift</strong> while the band stays in 4/4.
  </div></DarkBox>
  <Card color="#F57C00" title="Displacement techniques">
    {[{tech:"3-note groupings over 4/4",desc:"A 3-note arpeggio or pattern played as continuous eighths. The accents shift: beat 1, 'and' of 2, beat 4, 'and' of 1... creates a hypnotic 'against the grain' effect."},
      {tech:"Lick displacement",desc:"Take a 4-beat lick. Now start it on the 'and' of 4 (one eighth note earlier). Same pitches, completely different rhythmic feel. The relationship to the chord changes shifts."},
      {tech:"Hemiola",desc:"Implying 3/4 over 4/4 by accenting every 3 beats. 12 beats = 4 bars of 3/4 = 3 bars of 4/4. The two meters realign every 12 beats. Creates massive tension."},
    ].map((t,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#FFB74D"}}>{t.tech}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{t.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="Wes Montgomery's soloing — master of rhythmic displacement (especially octave solos). Pat Metheny's 'Question and Answer' for metric superimposition." />
</div>);}
