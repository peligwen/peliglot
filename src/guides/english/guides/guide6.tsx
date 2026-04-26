import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Trampa } from './_helpers';

const pronouns=["I","you","he/she/it","we","they"];

const presConj={work:["work","work","works","work","work"],go:["go","go","goes","go","go"],have:["have","have","has","have","have"]};

export function Guide6(){
  const [verb,setVerb]=useState("work");
  const [showDo,setShowDo]=useState(false);
  const forms=presConj[verb as keyof typeof presConj];
  const colMap: Record<string,string>={work:"#1565C0",go:"#2E7D32",have:"#C62828"};const col=colMap[verb]??"#1565C0";
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {["work","go","have"].map(v=>(<button key={v} onClick={()=>setVerb(v)} style={{padding:"8px 20px",borderRadius:10,border:verb===v?`2.5px solid ${col}`:"1.5px solid #ddd",background:verb===v?col:"#fff",color:verb===v?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:15}}>{v}</button>))}
    </div>
    <Card color={col} title={`Presente: ${verb}`} subtitle="Simple Present">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:44,borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
        <div style={{width:90,fontSize:13,color:"#999",fontWeight:500}}>{p}</div>
        <div style={{flex:1,fontSize:18,fontWeight:700,color:col}}>{forms[i]}</div>
        {i===2&&<span style={{background:"#FFF3E0",color:"#E65100",padding:"2px 8px",borderRadius:5,fontSize:10,fontWeight:700}}>¡cambia!</span>}
      </div>))}
    </Card>
    <button onClick={()=>setShowDo(!showDo)} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"1.5px solid #e0dcd5",background:showDo?"#1565C0":"#fff",color:showDo?"#fff":"#555",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span>⚠️ El auxiliar DO/DOES (¡no existe en español!)</span><span style={{transform:showDo?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}>⌄</span>
    </button>
    {showDo&&<div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        <strong style={{color:"#1565C0"}}>Preguntas:</strong> <em>Do you work? Does she speak English?</em><br/>
        <strong style={{color:"#C62828"}}>Negación:</strong> <em>I don't work. She doesn't speak.</em><br/><br/>
        ❌ NUNCA: <em>'Work you here?'</em> o <em>'She not speaks.'</em><br/>
        ✅ SIEMPRE: <em>'Do you work here?' 'She doesn't speak.'</em>
      </div>
    </div>}
    <Trampa text="El auxiliar DO/DOES es probablemente el hábito más difícil de construir. En español dices '¿Hablas inglés?' directamente. En inglés NECESITAS el auxiliar: 'Do you speak English?'" />
    <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:12}}>
      <div style={{fontSize:12,fontWeight:700,color:"#6A1B9A",marginBottom:6}}>Ortografía de la 3ª persona (-s):</div>
      {[{rule:"La mayoría: + s",ex:"work → works · play → plays · drive → drives"},
        {rule:"-ch/-sh/-s/-x/-z: + es",ex:"watch → watches · fix → fixes · pass → passes"},
        {rule:"Consonante + y → -ies",ex:"study → studies · try → tries · carry → carries"},
        {rule:"-o irregular: + es",ex:"go → goes · do → does"},
      ].map((r,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,fontWeight:700,color:"#6A1B9A"}}>{r.rule}:</span>{" "}
        <span style={{fontSize:11,color:"#888",fontStyle:"italic"}}>{r.ex}</span>
      </div>))}
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 7: PASADO — TABLA FILTRABLE DE IRREGULARES
// ═══════════════════════════════════════════════════════════════
