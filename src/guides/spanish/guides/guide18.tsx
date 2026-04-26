import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

const paraU=[
  {cat:"Purpose / Goal",icon:"🎯",ex:"Estudio para aprender. — I study to learn."},
  {cat:"Recipient",icon:"🎁",ex:"Es para ti. — It's for you."},
  {cat:"Destination",icon:"✈️",ex:"Salgo para México. — I'm leaving for Mexico."},
  {cat:"Deadline",icon:"📅",ex:"Es para el lunes. — It's due by Monday."},
  {cat:"Comparison",icon:"⚖️",ex:"Para ser niño, cocina bien. — For a kid, he cooks well."},
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

function shuffle<T>(arr: T[]): T[] {const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

export function Guide18(){
  const [sec,setSec]=useState("para");
  const [mode,setMode]=useState("learn");
  const [questions,setQuestions]=useState(()=>shuffle(quizItems));
  const [qIdx,setQIdx]=useState(0);
  const [chosen,setChosen]=useState<string|null>(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const resetQuiz=()=>{setQuestions(shuffle(quizItems));setQIdx(0);setChosen(null);setScore(0);setDone(false);};
  const handleAnswer=(opt: string)=>{if(chosen)return;setChosen(opt);if(opt===questions[qIdx].answer)setScore(s=>s+1);};
  const handleNext=()=>{if(qIdx+1>=questions.length){setDone(true);}else{setQIdx(i=>i+1);setChosen(null);}};
  const q=!done?questions[qIdx]:null;
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
      <Insight text="'¿Por qué?' (why?) asks for the cause → por. '¿Para qué?' (what for?) asks for the purpose → para. Both translate to 'why' in English but they're different!"/>
    </div>:<div>
      {!done?(<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"8px 14px",background:"#fff",borderRadius:10,border:"1px solid #eee",fontSize:12}}>
          <span style={{color:"#555",fontWeight:600}}>Question {qIdx+1} / {questions.length}</span>
          <span style={{color:"#2E7D32",fontWeight:800}}>✓ {score} correct</span>
        </div>
        <div style={{background:"#fff",borderRadius:14,padding:"28px 16px",marginBottom:14,border:"1px solid #eee",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#999",marginBottom:4}}>Fill in: por or para?</div>
          <div style={{fontSize:16,fontWeight:700,color:"#1a1a1a"}}>{q!.sentence}</div>
          {chosen&&<div style={{marginTop:10,padding:"6px 12px",borderRadius:8,display:"inline-block",background:chosen===q!.answer?"#E8F5E9":"#FFEBEE",border:`1px solid ${chosen===q!.answer?"#C8E6C9":"#FFCDD2"}`,fontSize:12,color:chosen===q!.answer?"#2E7D32":"#C62828",fontWeight:600}}>
            Reason: <span style={{textTransform:"capitalize"}}>{q!.why}</span>
          </div>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {["por","para"].map(opt=>{
            const isCorrect=opt===q!.answer;const isChosen=opt===chosen;
            let bg="#fff",border="1.5px solid #eee",col="#333";
            if(chosen){if(isCorrect){bg="#E8F5E9";border="2px solid #2E7D32";col="#1B5E20";}else if(isChosen){bg="#FFEBEE";border="2px solid #C62828";col="#B71C1C";}else{col="#ccc";}}
            return(<button key={opt} onClick={()=>handleAnswer(opt)} style={{padding:"18px 8px",borderRadius:10,border,background:bg,color:col,fontSize:14,fontWeight:800,cursor:chosen?"default":"pointer",transition:"all 0.15s",textAlign:"center"}}>{chosen&&isCorrect?"✓ ":chosen&&isChosen&&!isCorrect?"✗ ":""}{opt.toUpperCase()}</button>);
          })}
        </div>
        {chosen&&<button onClick={handleNext} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:"#4527A0",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>{qIdx+1>=questions.length?"See Results →":"Next →"}</button>}
      </div>):(<div>
        <DarkBox>
          <div style={{fontSize:44,marginBottom:10}}>{score>=questions.length*0.8?"🏆":score>=questions.length*0.5?"👍":"📖"}</div>
          <div style={{fontSize:26,fontWeight:800,marginBottom:6}}>{score}/{questions.length}</div>
          <div style={{fontSize:13,color:"#aaa"}}>{score>=questions.length*0.8?"¡Perfecto! Por and para are no longer confusing!":score>=questions.length*0.5?"Getting closer! Review the metaphor: para→destination, por→through.":"Review the uses tab — focus on the visual metaphor."}</div>
        </DarkBox>
        <button onClick={resetQuiz} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:"#4527A0",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔄 Try Again</button>
      </div>)}
    </div>}
  </div>);
}
