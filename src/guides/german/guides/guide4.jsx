import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide4(){
  const groups=[
    {label:"Native words: stress syllable 1",examples:[{w:"ÁR·bei·ten",m:"to work"},{w:"FRÜH·stück",m:"breakfast"},{w:"WÓH·nung",m:"apartment"},{w:"FÉN·ster",m:"window"}],color:"#1a1a1a"},
    {label:"Separable prefixes: prefix gets stress",examples:[{w:"ÁN·ru·fen",m:"to call"},{w:"ÁUF·ste·hen",m:"to get up"},{w:"MÍT·kom·men",m:"to come along"},{w:"ÉIN·kau·fen",m:"to shop"}],color:"#1565C0"},
    {label:"Inseparable prefixes: root gets stress",examples:[{w:"ver·STÉ·hen",m:"to understand"},{w:"er·ZÄ́H·len",m:"to narrate"},{w:"be·SÚ·chen",m:"to visit"},{w:"ent·SCHÚL·di·gen",m:"to excuse"}],color:"#C62828"},
    {label:"Foreign words: keep original stress",examples:[{w:"Stu·DÉNT",m:"student"},{w:"Te·le·FÓN",m:"telephone"},{w:"Re·stau·RÁNT",m:"restaurant"},{w:"U·ni·ver·si·TÄ́T",m:"university"}],color:"#2E7D32"},
  ];
  return(<div>
    {groups.map((g,gi)=>(<Card key={gi} color={g.color} title={g.label}>
      {g.examples.map((e,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<g.examples.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:16,fontWeight:700,color:g.color,fontFamily:"monospace"}}>{e.w}</span>
        <span style={{fontSize:12,color:"#888"}}>{e.m}</span>
      </div>))}
    </Card>))}
    <Insight text="If you see a separable prefix (an-, auf-, mit-, ein-), stress it. If you see be-, ver-, er-, ent-, ge-, stress the ROOT instead. This rule covers most German words." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 5-9: CASES — THE BIG ONE
// ═══════════════════════════════════════════════════════════════
