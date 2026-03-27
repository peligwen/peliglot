import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight as Nota } from '../../../components/Insight';

export function Guide12(){return(<div>
  <DarkBox title="Formación: be + participio pasado"><div style={{fontSize:13}}>
    <span style={{color:"#90CAF9"}}>Presente:</span> The house <strong style={{color:"#FFE77A"}}>is cleaned</strong> every week.<br/>
    <span style={{color:"#EF9A9A"}}>Pasado:</span> The house <strong style={{color:"#FFE77A"}}>was built</strong> in 1920.<br/>
    <span style={{color:"#81C784"}}>Futuro:</span> The house <strong style={{color:"#FFE77A"}}>will be sold</strong>.<br/>
    <span style={{color:"#CE93D8"}}>Perfecto:</span> The house <strong style={{color:"#FFE77A"}}>has been painted</strong>.
  </div></DarkBox>
  <Card color="#00838F" title="Pasiva con 'get' (informal)" subtitle="Muy usada en conversación">
    {[{en:"He got fired.",es:"Lo despidieron."},{en:"She got promoted.",es:"La ascendieron."},{en:"We got invited.",es:"Nos invitaron."},{en:"It got stolen.",es:"Lo robaron."}].map((e,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<3?"1px solid #f0eeeb":"none",fontSize:13}}><span style={{fontWeight:700,color:"#00838F",fontStyle:"italic"}}>{e.en}</span><span style={{color:"#888"}}>{e.es}</span></div>))}
  </Card>
  <Nota text="No abuses de la pasiva. ❌ 'The dinner was eaten by us.' ✅ 'We ate dinner.' Usa activa cuando el actor es conocido." />
</div>);}
