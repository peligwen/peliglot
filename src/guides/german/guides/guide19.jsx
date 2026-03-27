import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide19(){
  const sep=[{prefix:"an-",ex:"anrufen → Ich rufe dich an.",m:"to call"},{prefix:"auf-",ex:"aufmachen → Ich mache die Tür auf.",m:"to open"},{prefix:"mit-",ex:"mitkommen → Kommst du mit?",m:"to come along"},{prefix:"ein-",ex:"einkaufen → Ich kaufe im Supermarkt ein.",m:"to shop"}];
  const insep=[{prefix:"ver-",ex:"verstehen → Ich verstehe das.",m:"to understand"},{prefix:"be-",ex:"besuchen → Ich besuche dich.",m:"to visit"},{prefix:"er-",ex:"erzählen → Er erzählt eine Geschichte.",m:"to narrate"},{prefix:"ent-",ex:"entschuldigen → Entschuldigen Sie!",m:"to excuse"}];
  return(<div>
    <DarkBox title="Prefixes transform meaning"><div style={{fontSize:14}}>
      stehen = stand · <strong style={{color:"#FFE77A"}}>ver</strong>stehen = understand · <strong style={{color:"#FFE77A"}}>auf</strong>stehen = get up · <strong style={{color:"#FFE77A"}}>be</strong>stehen = pass/exist
    </div></DarkBox>
    <Card color="#1565C0" title="Separable: prefix splits off in main clauses">
      {sep.map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{background:"#1565C0",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:12,fontWeight:700}}>{s.prefix}</span> <span style={{color:"#888",fontSize:12}}>{s.m}</span><br/>
        <span style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{s.ex}</span>
      </div>))}
    </Card>
    <Card color="#C62828" title="Inseparable: never split (no ge- in past participle!)">
      {insep.map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{background:"#C62828",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:12,fontWeight:700}}>{s.prefix}</span> <span style={{color:"#888",fontSize:12}}>{s.m}</span><br/>
        <span style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{s.ex}</span>
      </div>))}
    </Card>
    <Insight text="In subordinate clauses, separable prefixes rejoin: '...weil ich die Tür aufmache.' The prefix goes back to the verb." />
  </div>);
}
