import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide9(){return(<div>
  <Card color="#00695C" title="Genitiv articles" subtitle="Possession — 'whose'">
    {[{g:"Masculine",art:"des Mannes (+s on noun)"},{g:"Feminine",art:"der Frau"},{g:"Neuter",art:"des Kindes (+s on noun)"},{g:"Plural",art:"der Kinder"}].map((a,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <span style={{fontWeight:600}}>{a.g}</span><span style={{fontWeight:700,color:"#00695C"}}>{a.art}</span>
    </div>))}
  </Card>
  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
    {[{p:"wegen",m:"because of"},{p:"trotz",m:"despite"},{p:"während",m:"during"},{p:"statt",m:"instead of"}].map(x=>(<span key={x.p} style={{padding:"5px 12px",borderRadius:8,background:"#E0F2F1",color:"#00695C",fontSize:13,fontWeight:700,border:"1px solid #B2DFDB"}}>{x.p} <span style={{fontWeight:400,color:"#888",fontSize:11}}>({x.m})</span></span>))}
  </div>
  <DarkBox title="The spoken reality"><div style={{fontSize:13,lineHeight:1.6}}>
    Genitiv is fading in everyday speech. <strong style={{color:"#FFE77A"}}>"Des Mannes Auto"</strong> (formal) → <strong style={{color:"#EF9A9A"}}>"dem Mann sein Auto"</strong> (colloquial). <strong style={{color:"#FFE77A"}}>"Wegen des Wetters"</strong> → <strong style={{color:"#EF9A9A"}}>"Wegen dem Wetter"</strong>.
    <br/><span style={{color:"#aaa",fontSize:12}}>Know genitiv for reading. Use dative in conversation.</span>
  </div></DarkBox>
  <Insight text="'Der Dativ ist dem Genitiv sein Tod' = 'The dative is the genitive's death' — a famous book title that demonstrates the very trend it describes." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 10-14: NOUNS
// ═══════════════════════════════════════════════════════════════
