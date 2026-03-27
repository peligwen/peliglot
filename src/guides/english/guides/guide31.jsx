import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Chatt } from './_helpers';

export function Guide31(){
  const [mode,setMode]=useState("formal");
  const data={
    formal:{title:"Formal (entrevistas, correos)",examples:["Good morning/afternoon.","I would appreciate if you could...","Please find attached...","Sincerely, / Best regards,"],color:"#880E4F"},
    casual:{title:"Casual (amigos, textos)",examples:["Hey! What's up? / How's it going?","Wanna grab lunch? (want to)","Gonna be late (going to)","k / lol / brb / np = ok / jaja / ya vuelvo / de nada"],color:"#00695C"},
    email:{title:"Email (semi-formal)",examples:["Hi [nombre], / Hello [nombre],","Just wanted to follow up on...","Let me know if you have any questions.","Best, / Thanks, / Cheers,"],color:"#1565C0"},
  };
  const d=data[mode];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.entries(data).map(([k,v])=>(<button key={k} onClick={()=>setMode(k)} style={{flex:1,maxWidth:140,padding:"8px",borderRadius:10,border:mode===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:mode===k?v.color:"#fff",color:mode===k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:11}}>{v.title.split("(")[0]}</button>))}
    </div>
    <Card color={d.color} title={d.title}>
      {d.examples.map((e,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<d.examples.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555",fontStyle:"italic"}}>{e}</div>))}
    </Card>
    <Chatt text="Chattanooga funciona con 'sir' y 'ma'am'. No es servil — es educado. A los niños se les enseña desde pequeños. Úsalos y encajarás." />
  </div>);
}
