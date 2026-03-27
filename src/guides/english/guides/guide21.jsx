import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

export function Guide21(){
  const order=["Opinión","Tamaño","Edad","Forma","Color","Origen","Material","Propósito"];
  const colors=["#C62828","#E65100","#6A1B9A","#00695C","#1565C0","#880E4F","#2E7D32","#4527A0"];
  return(<div>
    <DarkBox title="La regla que nadie te explica"><div style={{fontSize:13}}>Los nativos <strong style={{color:"#FFE77A"}}>sienten</strong> el orden correcto pero no lo pueden explicar. "A lovely little old rectangular green French silver whittling knife" — en ESE orden exacto.</div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:16}}>
      {order.map((o,i)=>(<span key={o} style={{padding:"5px 10px",borderRadius:16,background:`${colors[i]}15`,color:colors[i],fontSize:11,fontWeight:700,border:`1px solid ${colors[i]}30`}}>{i+1}. {o}</span>))}
    </div>
    <Card color="#2E7D32" title="Ejemplos">
      {[{correct:"a nice big house",wrong:"a big nice house",rule:"opinión → tamaño"},{correct:"a beautiful old Italian painting",wrong:"an old beautiful Italian painting",rule:"opinión → edad → origen"},{correct:"a small round wooden table",wrong:"a wooden round small table",rule:"tamaño → forma → material"}].map((e,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{color:"#2E7D32",fontWeight:700}}>✅ {e.correct}</span><br/>
        <span style={{color:"#C62828",fontSize:12}}>❌ {e.wrong}</span> <span style={{color:"#aaa",fontSize:11}}>({e.rule})</span>
      </div>))}
    </Card>
    <Nota text="¡Los adjetivos ingleses NO cambian por género ni número! 'A tall man, a tall woman, tall people' — siempre solo 'tall'. ¡Alivio enorme vs español!" />
  </div>);
}
