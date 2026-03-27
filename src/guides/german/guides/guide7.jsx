import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide7(){
  const datArts=[{g:"Masc",art:"dem / einem"},{g:"Fem",art:"der / einer"},{g:"Neut",art:"dem / einem"},{g:"Plural",art:"den (+n) / —"}];
  const datPreps=[{p:"aus",m:"from/out of"},{p:"bei",m:"at/near"},{p:"mit",m:"with"},{p:"nach",m:"after/to"},{p:"seit",m:"since"},{p:"von",m:"from/of"},{p:"zu",m:"to"}];
  const datVerbs=[{v:"helfen",m:"to help",ex:"Ich helfe dem Mann."},{v:"danken",m:"to thank",ex:"Ich danke dir."},{v:"gefallen",m:"to please",ex:"Das Buch gefällt mir."},{v:"gehören",m:"to belong to",ex:"Das gehört dem Kind."}];
  return(<div>
    <Card color="#E65100" title="Dativ articles" subtitle="Everything changes">
      {datArts.map((a,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:600,color:"#333"}}>{a.g}</span><span style={{fontWeight:700,color:"#E65100"}}>{a.art}</span>
      </div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
      {datPreps.map(x=>(<span key={x.p} style={{padding:"5px 12px",borderRadius:8,background:"#FFF3E0",color:"#E65100",fontSize:13,fontWeight:700,border:"1px solid #FFCC80"}}>{x.p} <span style={{fontWeight:400,color:"#888",fontSize:11}}>({x.m})</span></span>))}
    </div>
    <div style={{fontSize:11,color:"#888",marginBottom:12,textAlign:"center"}}>Mnemonic: <strong>Aus bei mit nach seit von zu</strong> — mit dem Dativ nur so zu!</div>
    <Card color="#E65100" title="Dative verbs" subtitle="The object MUST be dative">
      {datVerbs.map((v,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#E65100"}}>{v.v}</span> <span style={{color:"#888"}}>({v.m})</span><br/>
        <span style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{v.ex}</span>
      </div>))}
    </Card>
    <Insight text="ALL nouns add -n in dative plural (if they don't already end in -n or -s): die Kinder → mit den Kindern, die Häuser → in den Häusern." />
  </div>);
}
