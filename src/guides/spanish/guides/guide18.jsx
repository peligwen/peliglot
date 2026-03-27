import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const paraU=[
  {cat:"Purpose / Goal",icon:"🎯",ex:"Estudio para aprender. — I study to learn."},
  {cat:"Recipient",icon:"🎁",ex:"Es para ti. — It's for you."},
  {cat:"Destination",icon:"✈️",ex:"Salgo para México. — I'm leaving for Mexico."},
  {cat:"Deadline",icon:"📅",ex:"Es para el lunes. — It's due by Monday."},
  {cat:"Comparison",icon:"⚖️",ex:"Para niño, cocina bien. — For a kid, he cooks well."},
  {cat:"Employment",icon:"💼",ex:"Trabajo para Google. — I work for Google."},
];
const porU=[
  {cat:"Cause / Reason",icon:"🔥",ex:"Lo hizo por amor. — He did it out of love."},
  {cat:"Duration",icon:"⏱",ex:"Estudié por dos horas. — I studied for two hours."},
  {cat:"Exchange",icon:"💱",ex:"Lo compré por $50. — I bought it for $50."},
  {cat:"Through / Along",icon:"🚶",ex:"Camino por el parque. — I walk through the park."},
  {cat:"Means",icon:"📞",ex:"Hablamos por teléfono. — We talked by phone."},
  {cat:"On behalf of",icon:"🤝",ex:"Firmé por mi jefe. — I signed for my boss."},
  {cat:"Per / Rate",icon:"📊",ex:"Tres veces por semana. — Three times per week."},
];
const tricky=[
  {sp:"por favor",en:"please",note:"Fixed — always por"},
  {sp:"por supuesto",en:"of course",note:"Fixed — always por"},
  {sp:"por eso",en:"that's why / therefore",note:"Cause → por"},
  {sp:"por fin",en:"finally",note:"Fixed — always por"},
  {sp:"para siempre",en:"forever",note:"Fixed — always para"},
  {sp:"para nada",en:"not at all",note:"Fixed — always para"},
];
const quizItems=[
  {sentence:"Estudio ___ aprender.",answer:"para",why:"purpose/goal"},{sentence:"Lo hizo ___ amor.",answer:"por",why:"cause"},
  {sentence:"Es ___ ti.",answer:"para",why:"recipient"},{sentence:"Caminé ___ el parque.",answer:"por",why:"through"},
  {sentence:"Trabajo ___ Google.",answer:"para",why:"employment"},{sentence:"Lo compré ___ $50.",answer:"por",why:"exchange"},
  {sentence:"Tres veces ___ semana.",answer:"por",why:"rate"},{sentence:"Es ___ el lunes.",answer:"para",why:"deadline"},
  {sentence:"Firmé ___ mi jefe.",answer:"por",why:"on behalf of"},{sentence:"Salgo ___ México mañana.",answer:"para",why:"destination"},
];

export function Guide18(){
  const [sec,setSec]=useState("para");
  const [mode,setMode]=useState("learn");
  return(<div>
    <DarkBox title="Visual Metaphor"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{background:"#00695C",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:22}}>→ 🎯</div><div style={{fontWeight:800,marginTop:4}}>PARA</div><div style={{fontSize:11,opacity:.8}}>Toward a destination/purpose</div></div>
      <div style={{background:"#AD1457",borderRadius:10,padding:"12px",textAlign:"center"}}><div style={{fontSize:22}}>↻ 🔄</div><div style={{fontWeight:800,marginTop:4}}>POR</div><div style={{fontSize:11,opacity:.8}}>Through — cause, exchange, passage</div></div>
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
      <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
        {[{k:"para",c:"#00695C"},{k:"por",c:"#AD1457"}].map(s=>(<button key={s.k} onClick={()=>setSec(s.k)} style={{flex:1,maxWidth:200,padding:"12px",borderRadius:10,border:sec===s.k?`2.5px solid ${s.c}`:"1.5px solid #ddd",background:sec===s.k?s.c:"#fff",color:sec===s.k?"#fff":"#666",cursor:"pointer",fontSize:16,fontWeight:800}}>{s.k.toUpperCase()}</button>))}
      </div>
      <Card color={sec==="para"?"#00695C":"#AD1457"} title={sec.toUpperCase()+" Uses"}>
        {(sec==="para"?paraU:porU).map((u,i,a)=>(<div key={i} style={{padding:"8px 16px",borderBottom:i<a.length-1?"1px solid #f0eeeb":"none"}}>
          <div style={{fontSize:13,fontWeight:700,color:sec==="para"?"#00695C":"#AD1457"}}>{u.icon} {u.cat}</div>
          <div style={{fontSize:12,color:"#555",fontStyle:"italic",marginTop:2}}>{u.ex}</div>
        </div>))}
      </Card>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginTop:8}}>
        <div style={{padding:"10px 16px",background:"#FFF8E7",fontSize:13,fontWeight:700,color:"#8B6914"}}>📌 Fixed Expressions</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          {tricky.map((t,i)=>(<div key={i} style={{padding:"8px 12px",borderBottom:"1px solid #f0f0f0",borderRight:i%2===0?"1px solid #f0f0f0":"none"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1a1a1a"}}>{t.sp}</div>
            <div style={{fontSize:11,color:"#999"}}>{t.en}</div>
          </div>))}
        </div>
      </div>
      <Insight text="'¿Por qué?' (why?) asks for the cause → por. 'Para qué?' (what for?) asks for the purpose → para. Both translate to 'why' in English but they're different!"/>
    </div>:<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>Fill in: por or para?</div>
        <div style={{fontSize:16,fontWeight:700,color:"#1a1a1a"}}>{q.sentence}</div>
      </div>)}
      optionCount={2}
      color="#4527A0"
      resultMessages={{high:"¡Perfecto! Por and para are no longer confusing!",mid:"Getting closer! Review the metaphor: para→destination, por→through.",low:"Review the uses tab — focus on the visual metaphor."}}
    />}
  </div>);
}
