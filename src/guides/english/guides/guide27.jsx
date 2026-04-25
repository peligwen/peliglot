import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { ExpandSection } from '../../../components/ExpandSection';
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
  <Card color="#6A1B9A" title="Preguntas Wh- (qué/quién/dónde/cuándo/por qué/cómo)">
    <div style={{padding:"8px 16px",borderBottom:"1px solid #f0eeeb"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:4}}>Objeto Wh- (con do-support, con inversión):</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7,fontStyle:"italic"}}>
        What <strong style={{color:"#6A1B9A"}}>did</strong> you eat? · Where <strong style={{color:"#6A1B9A"}}>do</strong> you live? · How <strong style={{color:"#6A1B9A"}}>does</strong> she drive?
      </div>
      <div style={{fontSize:11,color:"#888"}}>Wh- + auxiliar + sujeto + verbo base</div>
    </div>
    <div style={{padding:"8px 16px"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#C62828",marginBottom:4}}>Sujeto Wh- (sin do-support, sin inversión):</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7,fontStyle:"italic"}}>
        <strong style={{color:"#C62828"}}>Who</strong> ate the cake? · <strong style={{color:"#C62828"}}>What</strong> happened?
      </div>
      <div style={{fontSize:11,color:"#888"}}>Wh- va directo al verbo — ❌ 'Who did eat the cake?' (error muy común)</div>
    </div>
  </Card>
  <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
    <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:6}}>Tag questions (muletillas) — regla completa:</div>
    <div style={{fontSize:13,color:"#555",lineHeight:1.8}}>
      You<strong style={{color:"#6A1B9A"}}>'re</strong> from Mexico, <strong style={{color:"#6A1B9A"}}>aren't</strong> you? <span style={{fontSize:11,color:"#888"}}>(mismo auxiliar: are)</span><br/>
      She <strong style={{color:"#6A1B9A"}}>speaks</strong> English, <strong style={{color:"#6A1B9A"}}>doesn't</strong> she? <span style={{fontSize:11,color:"#888"}}>(sin auxiliar → do/does/did)</span><br/>
      He <strong style={{color:"#6A1B9A"}}>can</strong> drive, <strong style={{color:"#6A1B9A"}}>can't</strong> he? <span style={{fontSize:11,color:"#888"}}>(mismo modal: can)</span><br/>
      I <strong style={{color:"#6A1B9A"}}>am</strong> right, <strong style={{color:"#6A1B9A"}}>aren't</strong> I? <span style={{fontSize:11,color:"#888"}}>(excepción: I am → aren't I)</span>
    </div>
    <div style={{marginTop:6,fontSize:11,color:"#888"}}>Regla: oración positiva → tag negativo (y viceversa). El tag usa el MISMO auxiliar que la oración. Sin auxiliar → usa do/does/did.</div>
  </div>
  <Trampa text="Formar preguntas es la trampa #1. En español inviertes o subes la entonación. En inglés NECESITAS do/does/did. Siempre." />
  <ExpandSection title="Preguntas indirectas (sin inversión)" color="#00695C">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #B2DFDB"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#00695C",marginBottom:8}}>Pregunta indirecta = sin inversión, orden de afirmación:</div>
      {[{direct:"Where is the bank?",indirect:"Could you tell me where the bank IS? (no 'where IS the bank')"},
        {direct:"What time does it open?",indirect:"Do you know what time it OPENS? (no 'what time DOES it open')"},
        {direct:"Who called?",indirect:"I wonder who CALLED. (igual — sujeto Wh no cambia)"},
      ].map((r,i)=>(<div key={i} style={{padding:"5px 0",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>Directa: {r.direct}</div>
        <div style={{fontSize:13,color:"#00695C",fontStyle:"italic"}}>Indirecta: {r.indirect}</div>
      </div>))}
      <div style={{marginTop:8,fontSize:11,color:"#888"}}>Se usa en preguntas educadas/formales. El orden vuelve al de la afirmación: sujeto + verbo (sin do-support).</div>
    </div>
  </ExpandSection>
</div>);}
