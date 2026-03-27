import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide9(){
  const [mode,setMode]=useState("pp");
  const ppData={ex:["I have been to Paris. (experiencia — ¿alguna vez?)","I have already eaten. (resultado que afecta el presente)","She has lived here for 5 years. (empezó y sigue)"],signals:["ever","never","already","yet","just","for","since"],color:"#6A1B9A"};
  const spData={ex:["I went to Paris last year. (cuándo specifically)","I ate an hour ago. (momento específico)","She lived here from 2010 to 2015. (terminado)"],signals:["yesterday","last week","ago","in 2020","when I was young"],color:"#C62828"};
  const d=mode==="pp"?ppData:spData;
  return(<div>
    <DarkBox title="Present Perfect ≠ Pretérito Perfecto"><div style={{fontSize:13}}>En español "he comido" = pasado reciente. En inglés americano se usa el <strong style={{color:"#FFE77A"}}>pasado simple</strong>: "I ate" para eventos recientes.</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
      {[{k:"pp",l:"Present Perfect",c:"#6A1B9A"},{k:"sp",l:"Simple Past",c:"#C62828"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:200,padding:"10px",borderRadius:10,border:mode===m.k?`2.5px solid ${m.c}`:"1.5px solid #ddd",background:mode===m.k?m.c:"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{m.l}</button>))}
    </div>
    <Card color={d.color} title={mode==="pp"?"Present Perfect":"Simple Past"} subtitle={mode==="pp"?"Experiencia / resultado actual":"Momento específico"}>
      {d.ex.map((e,i)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<d.ex.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555",fontStyle:"italic"}}>{e}</div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12,justifyContent:"center"}}>
      {d.signals.map(s=>(<span key={s} style={{padding:"4px 10px",borderRadius:14,background:`${d.color}12`,color:d.color,fontSize:11,fontWeight:600,border:`1px solid ${d.color}25`}}>{s}</span>))}
    </div>
  </div>);
}
