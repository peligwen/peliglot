import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide21(){
  const negWords=[{w:"no",m:"not",ex:"No hablo francés."},{w:"nunca/jamás",m:"never",ex:"Nunca como carne."},{w:"nada",m:"nothing",ex:"No quiero nada."},{w:"nadie",m:"nobody",ex:"No conozco a nadie."},{w:"tampoco",m:"neither",ex:"Yo tampoco."},{w:"ni...ni",m:"neither...nor",ex:"No quiero ni café ni té."},{w:"ya no",m:"not anymore",ex:"Ya no vivo ahí."},{w:"todavía no",m:"not yet",ex:"Todavía no llega."}];
  return(<div>
    <DarkBox title="Core Rule"><div style={{fontSize:14}}>Put <strong style={{color:"#EF9A9A"}}>no</strong> directly before the conjugated verb. Object pronouns go between: <em>No lo quiero.</em></div></DarkBox>
    {negWords.map((n,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:15,fontWeight:800,color:"#C62828"}}>{n.w}</span>
        <span style={{fontSize:12,color:"#999"}}>{n.m}</span>
      </div>
      <div style={{fontSize:13,color:"#555",fontStyle:"italic",marginTop:4}}>{n.ex}</div>
    </div>))}
    <Insight text="Double negatives are CORRECT in Spanish! 'No tengo nada' = I don't have anything. They reinforce, not cancel."/>
  </div>);
}
