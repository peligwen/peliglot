import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide21(){return(<div>
  <DarkBox title="The past tense for conversation"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>haben/sein</strong> (conjugated, position 2) + <strong style={{color:"#FFE77A"}}>past participle</strong> (at the END)
  </div></DarkBox>
  <Card color="#6A1B9A" title="Past participle formation">
    {[{type:"Regular: ge- + stem + -t",ex:"machen → gemacht · kaufen → gekauft · spielen → gespielt",color:"#6A1B9A"},
      {type:"Irregular: ge- + stem change + -en",ex:"gehen → gegangen · schreiben → geschrieben · trinken → getrunken",color:"#C62828"},
      {type:"No ge- prefix for:",ex:"Inseparable verbs: besucht, verstanden · -ieren verbs: studiert, telefoniert",color:"#E65100"},
      {type:"Separable: ge- goes between",ex:"aufgemacht · angefangen · eingeladen · mitgebracht",color:"#1565C0"},
    ].map((r,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.type}</div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{r.ex}</div>
    </div>))}
  </Card>
  <Insight text="Use sein (not haben) for: movement verbs (gehen, kommen, fahren, fliegen) and change-of-state verbs (werden, sterben, aufwachen). Most other verbs use haben." />
</div>);}
