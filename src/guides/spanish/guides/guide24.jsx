import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide24(){
  const pairs=[
    {ctx:"Greeting",inf:"¡Hola! ¿Qué onda?",for:"Buenos días. ¿Cómo está?"},
    {ctx:"Asking name",inf:"¿Cómo te llamas?",for:"¿Cómo se llama usted?"},
    {ctx:"Requesting",inf:"Pásame la sal.",for:"¿Me podría pasar la sal?"},
    {ctx:"Commands",inf:"¡Siéntate!",for:"Siéntese, por favor."},
    {ctx:"Goodbye",inf:"¡Nos vemos!",for:"Fue un placer. Que le vaya bien."},
  ];
  return(<div>
    <DarkBox title="Tú vs Usted"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{background:"#2E7D32",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:20,fontWeight:800}}>TÚ</div><div style={{fontSize:11,opacity:.8}}>Informal</div></div>
      <div style={{background:"#C62828",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:20,fontWeight:800}}>USTED</div><div style={{fontSize:11,opacity:.8}}>Formal</div></div>
    </div></DarkBox>
    {pairs.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6}}>
      <div style={{fontSize:12,fontWeight:700,color:"#37474F",marginBottom:6}}>{p.ctx}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{padding:"6px 10px",borderRadius:6,background:"#E8F5E9",fontSize:12,color:"#1a1a1a"}}><span style={{fontSize:9,color:"#2E7D32",fontWeight:700}}>TÚ</span><br/>{p.inf}</div>
        <div style={{padding:"6px 10px",borderRadius:6,background:"#FFEBEE",fontSize:12,color:"#1a1a1a"}}><span style={{fontSize:9,color:"#C62828",fontWeight:700}}>UD.</span><br/>{p.for}</div>
      </div>
    </div>))}
    <Insight text="🇲🇽 Ustedes for ALL 'you plural'. When in doubt, use usted — the other person will say 'puedes tutearme' if they prefer tú."/>
  </div>);
}
