import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Trampa } from './_helpers';

export function Guide27(){return(<div>
  <DarkBox title="Adjetivos ANTES del sustantivo"><div style={{fontSize:14}}>
    <span style={{color:"#81C784"}}>✅ a <strong style={{color:"#FFE77A"}}>red</strong> car</span> · <span style={{color:"#EF9A9A"}}>❌ a car red</span><br/>
    <span style={{color:"#81C784"}}>✅ the <strong style={{color:"#FFE77A"}}>old</strong> house</span> · <span style={{color:"#EF9A9A"}}>❌ the house old</span><br/>
    <span style={{color:"#aaa",fontSize:12}}>¡Al revés del español!</span>
  </div></DarkBox>
  <Card color="#C62828" title="⚠ Preguntas con DO/DOES/DID" subtitle="¡Obligatorio!">
    {[{type:"Afirmación",ex:"You like coffee.",col:"#2E7D32"},{type:"Pregunta",ex:"DO you like coffee? (NO 'Like you coffee?')",col:"#C62828"},{type:"Negación",ex:"I DON'T like coffee. (NO 'I not like coffee.')",col:"#C62828"},{type:"Pasado",ex:"DID you go? (NO 'Went you?')",col:"#C62828"}].map((r,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${r.col}`}}>
      <span style={{fontSize:11,fontWeight:700,color:r.col}}>{r.type}:</span> <span style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{r.ex}</span>
    </div>))}
  </Card>
  <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
    <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:4}}>Tag questions (muletillas):</div>
    <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
      You're from Mexico, <strong style={{color:"#6A1B9A"}}>aren't you?</strong> (¿verdad?)<br/>
      She speaks English, <strong style={{color:"#6A1B9A"}}>doesn't she?</strong><br/>
      <span style={{fontSize:11,color:"#888"}}>Oración positiva → tag negativo (y viceversa)</span>
    </div>
  </div>
  <Trampa text="Formar preguntas es la trampa #1. En español inviertes o subes la entonación. En inglés NECESITAS do/does/did. Siempre." />
</div>);}
