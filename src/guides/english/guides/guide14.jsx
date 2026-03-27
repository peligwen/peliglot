import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Trampa } from './_helpers';

export function Guide14(){
  const [mode,setMode]=useState("a");
  const data={
    a:{title:"A / AN = indefinido",color:"#2E7D32",rules:[{r:"A antes de SONIDO consonántico",ex:"a dog, a house, a university (/juː/)"},{r:"AN antes de SONIDO vocálico",ex:"an apple, an hour (h muda), an MBA"},{r:"Para profesiones y clasificaciones",ex:"She's a teacher. It's a nice day."}]},
    the:{title:"THE = definido",color:"#1565C0",rules:[{r:"Algo específico/ya mencionado",ex:"The book on the table. The teacher said..."},{r:"Único en su tipo",ex:"the sun, the moon, the president"},{r:"Con superlativos",ex:"the biggest, the best, the most beautiful"}]},
    zero:{title:"SIN ARTÍCULO = general",color:"#C62828",rules:[{r:"Conceptos generales/abstractos",ex:"Life is beautiful. Water is important."},{r:"Idiomas, comidas, deportes",ex:"I speak Spanish. I had breakfast. I play soccer."},{r:"Con next/last, posesivos",ex:"next week, last Monday, my car"}]},
  };
  const d=data[mode];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.entries(data).map(([k,v])=>(<button key={k} onClick={()=>setMode(k)} style={{flex:1,maxWidth:140,padding:"10px",borderRadius:10,border:mode===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:mode===k?v.color:"#fff",color:mode===k?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:14}}>{k==="zero"?"∅ NADA":k.toUpperCase()}</button>))}
    </div>
    <Card color={d.color} title={d.title}>
      {d.rules.map((r,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<d.rules.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:13,fontWeight:700,color:d.color,marginBottom:3}}>{r.r}</div>
        <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{r.ex}</div>
      </div>))}
    </Card>
    <Trampa text="El error más frecuente: poner 'the' donde el español usa 'el/la' para lo general. 'Me gusta LA música' = 'I like music' (sin THE)." />
  </div>);
}


// ═══════════════════════════════════════════════════════════════
// GUÍAS 15-17: SUSTANTIVOS (ENRIQUECIDAS)
// ═══════════════════════════════════════════════════════════════
