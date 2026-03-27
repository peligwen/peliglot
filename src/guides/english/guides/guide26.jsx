import { Card } from '../../../components/Card';
import { Insight as Nota } from '../../../components/Insight';

export function Guide26(){
  const connectors=[
    {fn:"Causa",cas:"because",form:"since / due to",color:"#C62828"},
    {fn:"Contraste",cas:"but",form:"although / however",color:"#1565C0"},
    {fn:"Resultado",cas:"so",form:"therefore / as a result",color:"#2E7D32"},
    {fn:"Adición",cas:"and / also / too",form:"moreover / furthermore",color:"#6A1B9A"},
    {fn:"Condición",cas:"if",form:"provided that / unless",color:"#E65100"},
  ];
  return(<div>
    <Card color="#1565C0" title="Conectores: Casual ↔ Formal">
      <div style={{display:"grid",gridTemplateColumns:"75px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div>Función</div><div>Casual (hablar)</div><div>Formal (escribir)</div></div>
      {connectors.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"75px 1fr 1fr",padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,fontWeight:700,color:c.color}}>{c.fn}</span>
        <span style={{fontSize:14,fontWeight:700,color:"#333"}}>{c.cas}</span>
        <span style={{fontSize:12,color:"#888"}}>{c.form}</span>
      </div>))}
    </Card>
    <Nota text="Usa los conectores casuales al hablar, los formales al escribir. 'However' en una conversación suena raro. 'But' en un ensayo suena informal." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 27-29: ESTRUCTURA DE ORACIONES
// ═══════════════════════════════════════════════════════════════
