import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide15(){return(<div>
  <DarkBox title="Multiple rhythmic layers"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Polyrhythm</strong> = two different rhythmic patterns at the same time (3 against 2, 4 against 3). <strong style={{color:"#FFE77A"}}>Odd meters</strong> = time signatures that don't divide evenly (5/4, 7/8).
  </div></DarkBox>
  <Card color="#6A1B9A" title="Common polyrhythms & odd meters">
    {[{name:"3 against 2",desc:"One hand plays 3 even notes while the other plays 2. Found in Afro-Cuban music, West African drumming, jazz.",ex:"'Pass the god-damn but-ter' = 3 over 2"},
      {name:"5/4 time",desc:"5 beats per bar. Feels like 3+2 or 2+3.",ex:"'Take Five' (Dave Brubeck), 'Mission Impossible' theme"},
      {name:"7/8 time",desc:"7 eighth notes per bar. Often felt as 2+2+3 or 3+2+2.",ex:"'Money' (Pink Floyd), much Balkan folk music"},
      {name:"Where they show up",desc:"Prog rock (Tool, Rush), jazz (Brubeck, Mehldau), world music (Afrobeat, Balkan), modern pop/R&B is increasingly using polyrhythmic feels.",ex:""},
    ].map((p,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#6A1B9A"}}>{p.name}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{p.desc}</div>
      {p.ex&&<div style={{fontSize:11,color:"#888",marginTop:2,fontStyle:"italic"}}>{p.ex}</div>}
    </div>))}
  </Card>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 16-21: PROGRESSIONS — WITH PLAYABLE AUDIO
// ═══════════════════════════════════════════════════════════════
