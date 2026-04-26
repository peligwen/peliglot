import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

export function Guide34(){return(<div>
  <DarkBox title="'How are you?' NO es una pregunta real"><div style={{fontSize:14,lineHeight:1.6}}>
    Es un <strong style={{color:"#FFE77A"}}>saludo</strong>, no una consulta médica.<br/>
    Respuesta correcta: <strong style={{color:"#81C784"}}>"Good, thanks! You?"</strong><br/>
    <span style={{color:"#EF9A9A"}}>NO des detalles sobre tu salud.</span>
  </div></DarkBox>
  <Card color="#4527A0" title="El small talk como pegamento social">
    {[{topic:"Clima",ex:"Beautiful day, isn't it? — Tema #1 universal.",color:"#4527A0"},
      {topic:"'Where are you from?'",ex:"Están siendo amigables, no entrometidos. Responde con calidez.",color:"#1565C0"},
      {topic:"Cumplidos a desconocidos",ex:"'I love your shoes!' — Completamente normal. Solo di 'Thank you!'",color:"#2E7D32"},
      {topic:"Despedida",ex:"'Have a good one!' = Que te vaya bien. 'Take care!' = ¡Cuídate!",color:"#E65100"},
    ].map((t,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${t.color}`}}>
      <span style={{fontSize:13,fontWeight:700,color:t.color}}>{t.topic}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{t.ex}</span>
    </div>))}
  </Card>
  <Chatt text="La gente de Chattanooga es genuinamente amigable. Si alguien te saluda desde su pórtico, saluda de vuelta. Si te detienen la puerta, di 'thank you'. Te sentirás en casa rápido." />
</div>);}
