import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Ref } from './_helpers';

export function Guide15(){return(<div>
  <DarkBox title="The conversation between guitar and drums"><div style={{fontSize:14}}>
    Comping rhythms are about <strong style={{color:"#c4a87a"}}>when you DON'T play</strong> as much as when you do. Listen to the drummer's ride pattern and hi-hat, and fill the gaps. Comping is conversational — you're responding, not monologuing.
  </div></DarkBox>
  <Card color="#EF6C00" title="Comping rhythm vocabulary">
    {[{name:"Freddie Green four-to-the-bar",desc:"Quarter notes on every beat. Quiet, steady, foundational. Works in big band and swing contexts. Harder than it sounds — the evenness is the challenge.",color:"#c4a87a"},
      {name:"Charleston rhythm",desc:"Dotted quarter + eighth (hit on 1, hit on the 'and' of 2). The fundamental syncopated comping rhythm. Endless variations.",color:"#EF9A9A"},
      {name:"The 'catch' (anticipation)",desc:"Placing chords on the 'and' before the beat instead of on the beat. Creates forward momentum. The #1 most-used comping device.",color:"#81C784"},
      {name:"Rhythmic hits with the band",desc:"Following a written or implied rhythmic figure — kicks, stops, hits. Requires reading and listening simultaneously.",color:"#90CAF9"},
      {name:"Laying out (the most important move)",desc:"Not playing. Leaving space for the soloist, the bass, the drums. The hardest thing for guitarists to learn. When in doubt, stop.",color:"#CE93D8"},
    ].map((r,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none",borderLeft:`3px solid ${r.color}`}}>
      <span style={{fontWeight:700,color:r.color}}>{r.name}</span><br/>
      <span style={{fontSize:12,color:"#999"}}>{r.desc}</span>
    </div>))}
  </Card>
  <Ref name="Listen" text="Jim Hall comping behind Sonny Rollins on 'The Bridge' — textbook responsive comping. Listen to how much space he leaves." />
</div>);}
