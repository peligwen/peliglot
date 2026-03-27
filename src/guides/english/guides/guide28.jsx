import { Card } from '../../../components/Card';

export function Guide28(){return(<div>
  <Card color="#6A1B9A" title="Retroceso de tiempo verbal (Reported Speech)">
    {[{direct:"'I am tired'",reported:"She said she WAS tired.",rule:"Presente → Pasado"},
      {direct:"'I will go'",reported:"He said he WOULD go.",rule:"Will → Would"},
      {direct:"'I went'",reported:"She said she HAD gone.",rule:"Pasado → Past Perfect"},
      {direct:"'I can help'",reported:"He said he COULD help.",rule:"Can → Could"},
    ].map((r,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 30px 1fr",alignItems:"center",gap:4}}>
        <span style={{fontSize:13,color:"#888",textAlign:"right"}}>{r.direct}</span>
        <span style={{fontSize:14,color:"#ccc",textAlign:"center"}}>→</span>
        <span style={{fontSize:13,fontWeight:700,color:"#6A1B9A"}}>{r.reported}</span>
      </div>
      <div style={{fontSize:10,color:"#aaa",marginTop:2,textAlign:"center"}}>{r.rule}</div>
    </div>))}
  </Card>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#C62828",marginBottom:4}}>Preguntas reportadas</div>
      <div style={{fontSize:12,color:"#555"}}>'Where do you live?'<br/>→ He asked where I <strong>lived</strong>.<br/><span style={{fontSize:11,color:"#888"}}>¡Orden de afirmación, NO de pregunta!</span></div>
    </div>
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#2E7D32",marginBottom:4}}>Mandatos reportados</div>
      <div style={{fontSize:12,color:"#555"}}>'Sit down'<br/>→ She told me <strong>to sit down</strong>.<br/>'Don't touch' → told me <strong>not to touch</strong>.</div>
    </div>
  </div>
</div>);}
