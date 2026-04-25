import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { ExpandSection } from '../../../components/ExpandSection';
import { Trampa, Chatt } from './_helpers';

export function Guide13(){
  const groups=[
    {base:"get",pvs:[
      {pv:"get up",m:"levantarse",sep:true},
      {pv:"get over",m:"superar",sep:false},
      {pv:"get along",m:"llevarse bien",sep:false},
      {pv:"get by",m:"arreglárselas",sep:false},
      {pv:"get through",m:"terminar/superar",sep:false},
      {pv:"get away",m:"escaparse",sep:false},
    ]},
    {base:"take",pvs:[
      {pv:"take off",m:"despegar/quitarse",sep:true},
      {pv:"take on",m:"asumir",sep:true},
      {pv:"take out",m:"sacar/invitar",sep:true},
      {pv:"take over",m:"tomar control",sep:true},
    ]},
    {base:"look",pvs:[
      {pv:"look up",m:"buscar (info)",sep:true},
      {pv:"look after",m:"cuidar",sep:false},
      {pv:"look forward to",m:"esperar con ansias",sep:false},
      {pv:"look into",m:"investigar",sep:false},
    ]},
    {base:"turn",pvs:[
      {pv:"turn on/off",m:"encender/apagar",sep:true},
      {pv:"turn up",m:"aparecer/subir vol.",sep:true},
      {pv:"turn down",m:"rechazar/bajar vol.",sep:true},
      {pv:"turn out",m:"resultar",sep:false},
    ]},
    {base:"come",pvs:[
      {pv:"come up with",m:"inventar/idear",sep:false},
      {pv:"come across",m:"encontrar por casualidad",sep:false},
      {pv:"come back",m:"regresar",sep:false},
      {pv:"come on",m:"¡vamos!/dale",sep:false},
    ]},
  ];
  const [sel,setSel]=useState(0);const g=groups[sel];
  return(<div>
    <DarkBox title="La pesadilla (pero los necesitas)"><div style={{fontSize:13}}>Phrasal verbs = verbo + partícula con significado que <strong style={{color:"#EF9A9A"}}>NO puedes adivinar</strong> por las partes. Están en cada conversación.<br/><span style={{color:"#90CAF9",fontSize:12}}>✂ = separable · 🔒 = inseparable</span></div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
      {groups.map((pg,i)=>(<button key={i} onClick={()=>setSel(i)} style={{padding:"7px 16px",borderRadius:10,border:sel===i?"2.5px solid #4527A0":"1.5px solid #ddd",background:sel===i?"#4527A0":"#fff",color:sel===i?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:15}}>{pg.base}</button>))}
    </div>
    <Card color="#4527A0" title={`Phrasal verbs con "${g.base}"`}>
      {g.pvs.map((pv,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px",borderBottom:i<g.pvs.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:15,fontWeight:700,color:"#4527A0"}}>{pv.pv}</span>
        <span style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:"#888"}}>{pv.m}</span>
          <span title={pv.sep?"Separable":"Inseparable"} style={{fontSize:13}}>{pv.sep?"✂":"🔒"}</span>
        </span>
      </div>))}
    </Card>
    <Trampa text="PRONOMBRES con verbos separables (✂): van EN MEDIO — ❌ 'I'll take off them.' ✅ 'I'll take them off.' Con verbos inseparables (🔒), el pronombre va al final: ✅ 'I look after them.' ❌ 'I look them after.'" />
    <div style={{background:"#EDE7F6",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#4527A0",marginBottom:12}}>
      💡 Con objetos largos, el separable puede quedarse unido: "Take off your old heavy winter coat" ✓ — la partícula tiende a pegarse al verbo cuando el objeto es muy largo.
    </div>
    <Chatt text="Sureñismos: 'carry' = llevar en carro ('Carry me to the store'), 'cut on/off' = encender/apagar, 'mash' = presionar ('Mash that button')." />
    <ExpandSection title="Gerundio vs Infinitivo (-ing vs to + verbo)" color="#2E7D32">
      <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #C8E6C9"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#2E7D32",marginBottom:8}}>El verbo que sigue puede ser -ing o to — depende del verbo principal:</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div style={{background:"#E8F5E9",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#2E7D32",marginBottom:4}}>+ -ing (gerundio)</div>
            {["enjoy doing","finish doing","keep doing","avoid doing","suggest doing","mind doing"].map((v,i)=>(<div key={i} style={{fontSize:11,color:"#555"}}>{v}</div>))}
          </div>
          <div style={{background:"#E3F2FD",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#1565C0",marginBottom:4}}>+ to + verbo (infinitivo)</div>
            {["decide to do","want to do","plan to do","need to do","agree to do","hope to do"].map((v,i)=>(<div key={i} style={{fontSize:11,color:"#555"}}>{v}</div>))}
          </div>
        </div>
        <div style={{background:"#FFEBEE",borderRadius:8,padding:"8px 10px",border:"1px solid #FFCDD2",fontSize:12,color:"#C62828"}}>
          ⚠️ Significado diferente: <strong>"stop doing"</strong> = dejar de hacer algo · <strong>"stop to do"</strong> = detenerse PARA hacer algo<br/>
          <em>"I stopped smoking"</em> (dejé) vs <em>"I stopped to smoke"</em> (me paré para fumar)
        </div>
      </div>
    </ExpandSection>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍAS 14-17: SUSTANTIVOS (INTERACTIVOS)
// ═══════════════════════════════════════════════════════════════
