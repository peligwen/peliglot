import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide22(){return(<div>
  <Card color="#00695C" title="Präteritum — the written/narrative past">
    {[{type:"Regular: stem + -te + endings",ex:"machen: machte, machtest, machte, machten, machtet, machten"},
      {type:"Irregular: stem change (no -te)",ex:"gehen→ging · kommen→kam · sehen→sah · schreiben→schrieb\nsprechen→sprach · nehmen→nahm · essen→aß · fahren→fuhr"},
    ].map((r,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i===0?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#00695C"}}>{r.type}</div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic",whiteSpace:"pre-line"}}>{r.ex}</div>
    </div>))}
  </Card>
  <DarkBox title="When to use which"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
    <strong style={{color:"#FFE77A"}}>Speaking:</strong> use Perfekt — Ich habe das gemacht.<br/>
    <strong style={{color:"#FFE77A"}}>Writing:</strong> use Präteritum — Ich machte das.<br/>
    <strong style={{color:"#EF9A9A"}}>Always Präteritum</strong> (even in speech) for: sein (war), haben (hatte), and all modals (konnte, musste, wollte...).
  </div></DarkBox>
</div>);}
