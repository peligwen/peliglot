import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Chatt } from './_helpers';

export function Guide13(){
  const groups=[
    {base:"get",pvs:[{pv:"get up",m:"levantarse"},{pv:"get over",m:"superar"},{pv:"get along",m:"llevarse bien"},{pv:"get by",m:"arreglárselas"},{pv:"get through",m:"terminar/superar"},{pv:"get away",m:"escaparse"}]},
    {base:"take",pvs:[{pv:"take off",m:"despegar/quitarse"},{pv:"take on",m:"asumir"},{pv:"take out",m:"sacar/invitar"},{pv:"take over",m:"tomar control"}]},
    {base:"look",pvs:[{pv:"look up",m:"buscar (info)"},{pv:"look after",m:"cuidar"},{pv:"look forward to",m:"esperar con ansias"},{pv:"look into",m:"investigar"}]},
    {base:"turn",pvs:[{pv:"turn on/off",m:"encender/apagar"},{pv:"turn up",m:"aparecer/subir vol."},{pv:"turn down",m:"rechazar/bajar vol."},{pv:"turn out",m:"resultar"}]},
    {base:"come",pvs:[{pv:"come up with",m:"inventar/idear"},{pv:"come across",m:"encontrar por casualidad"},{pv:"come back",m:"regresar"},{pv:"come on",m:"¡vamos!/dale"}]},
  ];
  const [sel,setSel]=useState(0);const g=groups[sel];
  return(<div>
    <DarkBox title="La pesadilla (pero los necesitas)"><div style={{fontSize:13}}>Phrasal verbs = verbo + partícula con significado que <strong style={{color:"#EF9A9A"}}>NO puedes adivinar</strong> por las partes. Están en cada conversación.</div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
      {groups.map((pg,i)=>(<button key={i} onClick={()=>setSel(i)} style={{padding:"7px 16px",borderRadius:10,border:sel===i?"2.5px solid #4527A0":"1.5px solid #ddd",background:sel===i?"#4527A0":"#fff",color:sel===i?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:15}}>{pg.base}</button>))}
    </div>
    <Card color="#4527A0" title={`Phrasal verbs con "${g.base}"`}>
      {g.pvs.map((pv,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<g.pvs.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:15,fontWeight:700,color:"#4527A0"}}>{pv.pv}</span>
        <span style={{fontSize:13,color:"#888"}}>{pv.m}</span>
      </div>))}
    </Card>
    <Chatt text="Sureñismos: 'carry' = llevar en carro ('Carry me to the store'), 'cut on/off' = encender/apagar, 'mash' = presionar ('Mash that button')." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 14-17: SUSTANTIVOS (INTERACTIVOS)
// ═══════════════════════════════════════════════════════════════
