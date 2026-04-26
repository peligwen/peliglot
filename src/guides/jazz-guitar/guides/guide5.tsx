import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide5(){return(<div>
  <DarkBox title="Voicings built in 4ths instead of 3rds"><div style={{fontSize:14}}>
    Stack fourths and you get voicings that are <strong style={{color:"#c4a87a"}}>harmonically ambiguous</strong> — the same shape can function as multiple chords depending on the bass note and context. This is the McCoy Tyner / Herbie Hancock sound adapted for guitar.
  </div></DarkBox>
  <Card color="#6D4C41" title="Quartal applications">
    {[{name:"So What voicing (D-G-C-F-A)",desc:"The iconic Miles Davis chord. Built in 4ths with a major 3rd on top. Works as Dm11, Fmaj9, Am7sus, and more depending on bass.",color:"#c4a87a"},
      {name:"4th stacks over ii-V-I",desc:"Same quartal shape, moved diatonically through the key. Each position creates a different extension of the underlying chord. Extremely efficient.",color:"#81C784"},
      {name:"Clusters",desc:"Tight voicings with half and whole steps. Modern jazz texture — Kurt Rosenwinkel, Ben Monder territory. Less about 'chords' and more about 'color.'",color:"#90CAF9"},
    ].map((q,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<2?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:q.color}}>{q.name}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{q.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="McCoy Tyner on 'Passion Dance' — quartal piano voicings. Kurt Rosenwinkel's comping on 'Zhivago' — guitar quartal/cluster vocabulary." />
</div>);}
