import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { ExpandSection } from '../../../components/ExpandSection';
import { Trampa } from './_helpers';

export function Guide9(){
  const [mode,setMode]=useState("pp");
  const ppData={ex:["I have been to Paris. (experiencia — ¿alguna vez?)","I have already eaten. (resultado que afecta el presente)","She has lived here for 5 years. (empezó y sigue)","Have you ever tried sushi? (experiencia de vida)","I haven't finished yet. (proceso relevante ahora)"],signals:["ever","never","for","since","today (todavía)","this week","already*","just*","yet*"],color:"#6A1B9A"};
  const spData={ex:["I went to Paris last year. (cuándo específico)","I ate an hour ago. (momento fijo en el pasado)","She lived here from 2010 to 2015. (terminado)","Did you eat yet? (AmE informal — con 'yet', el pasado simple es posible)"],signals:["yesterday","last week","ago","in 2020","when I was young"],color:"#C62828"};
  const d=mode==="pp"?ppData:spData;
  return(<div>
    <DarkBox title="Present Perfect ≠ Pretérito Perfecto"><div style={{fontSize:13,lineHeight:1.6}}>
      En español "he comido" puede equivaler a <strong style={{color:"#FFE77A"}}>"I have eaten"</strong> o a <strong style={{color:"#EF9A9A"}}>"I ate"</strong> según el contexto. En inglés americano, con <strong style={{color:"#FFE77A"}}>already / just / yet</strong>, se usa MÁS el pasado simple que en inglés británico — pero en los demás casos (ever/never, for/since, períodos en curso) el Present Perfect es igual de necesario.
    </div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
      {[{k:"pp",l:"Present Perfect",c:"#6A1B9A"},{k:"sp",l:"Simple Past",c:"#C62828"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:200,padding:"10px",borderRadius:10,border:mode===m.k?`2.5px solid ${m.c}`:"1.5px solid #ddd",background:mode===m.k?m.c:"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{m.l}</button>))}
    </div>
    <Card color={d.color} title={mode==="pp"?"Present Perfect":"Simple Past"} subtitle={mode==="pp"?"Experiencia / conexión con el presente":"Momento específico / terminado"}>
      {d.ex.map((e,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<d.ex.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555",fontStyle:"italic"}}>{e}</div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12,justifyContent:"center"}}>
      {d.signals.map(s=>(<span key={s} style={{padding:"4px 10px",borderRadius:14,background:`${d.color}12`,color:d.color,fontSize:11,fontWeight:600,border:`1px solid ${d.color}25`}}>{s}</span>))}
    </div>
    {mode==="pp"&&<div style={{background:"#EDE7F6",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#4527A0",marginBottom:12}}>* Con <strong>already/just/yet</strong> en AmE informal: "Did you eat yet?" y "Have you eaten yet?" son ambos aceptables. Con <strong>ever/never/for/since</strong> o períodos en curso (today, this week), el Present Perfect es siempre necesario.</div>}
    <Trampa text="❌ 'I have gone to Nashville last year.' ✅ 'I went to Nashville last year.' — Con 'last year' (momento específico), usa siempre Simple Past." />
    <ExpandSection title="Avanzado: Present Perfect Continuous" color="#4527A0">
      <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #D1C4E9"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#4527A0",marginBottom:6}}>Have been + -ing — proceso en curso, con duración</div>
        {[{en:"I've been working since 9 AM.",es:"Llevo trabajando desde las 9. (sigo trabajando)"},
          {en:"She's been studying for 3 hours.",es:"Lleva 3 horas estudiando."},
          {en:"It's been raining all day.",es:"Ha estado lloviendo todo el día."},
        ].map((r,i)=>(<div key={i} style={{padding:"5px 0",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:13,color:"#4527A0",fontStyle:"italic"}}>{r.en}</div>
          <div style={{fontSize:11,color:"#888"}}>{r.es}</div>
        </div>))}
        <div style={{marginTop:8,fontSize:11,color:"#888"}}>Énfasis en la DURACIÓN o el proceso en sí. Contraste: "I have read the book" (terminé) vs "I have been reading" (estoy en eso).</div>
      </div>
    </ExpandSection>
  </div>);
}
