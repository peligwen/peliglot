import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide27(){
  const weatherExpr=[
    {expr:"Hace calor",    eng:"It's hot",           type:"hace", icon:"🌡️", ex:"Hoy hace mucho calor.",               exE:"Today it's very hot."},
    {expr:"Hace frío",     eng:"It's cold",          type:"hace", icon:"🥶", ex:"En enero hace mucho frío.",            exE:"In January it's very cold."},
    {expr:"Hace viento",   eng:"It's windy",         type:"hace", icon:"💨", ex:"Hace mucho viento hoy.",              exE:"It's very windy today."},
    {expr:"Hace sol",      eng:"It's sunny",         type:"hace", icon:"☀️", ex:"Hace sol en verano.",                 exE:"It's sunny in summer."},
    {expr:"Hace buen tiempo", eng:"The weather is nice", type:"hace", icon:"😊", ex:"Hoy hace buen tiempo.",          exE:"The weather is nice today."},
    {expr:"Hace mal tiempo",  eng:"The weather is bad",  type:"hace", icon:"🌩️", ex:"Hace mal tiempo esta semana.",   exE:"The weather is bad this week."},
    {expr:"Está lloviendo",   eng:"It's raining",    type:"esta", icon:"🌧️", ex:"Está lloviendo mucho.",             exE:"It's raining a lot."},
    {expr:"Está nevando",     eng:"It's snowing",    type:"esta", icon:"❄️", ex:"Está nevando en las montañas.",      exE:"It's snowing in the mountains."},
    {expr:"Está nublado",     eng:"It's cloudy",     type:"esta", icon:"☁️", ex:"Está muy nublado hoy.",             exE:"It's very cloudy today."},
    {expr:"Está despejado",   eng:"It's clear",      type:"esta", icon:"🌤️", ex:"Está despejado esta mañana.",       exE:"It's clear this morning."},
    {expr:"Hay niebla",       eng:"There's fog",     type:"hay",  icon:"🌫️", ex:"Hay mucha niebla en la costa.",     exE:"There's a lot of fog on the coast."},
    {expr:"Hay tormenta",     eng:"There's a storm", type:"hay",  icon:"⛈️", ex:"Hay una tormenta esta noche.",      exE:"There's a storm tonight."},
    {expr:"Hay granizo",      eng:"There's hail",    type:"hay",  icon:"🌨️", ex:"Hay granizo en el norte.",          exE:"There's hail in the north."},
    {expr:"Hay lluvia",       eng:"There's rain",    type:"hay",  icon:"🌂", ex:"Hay lluvia toda la semana.",         exE:"There's rain all week."},
  ];
  const seasons=[
    {name:"La Primavera",eng:"Spring",icon:"🌸",color:"#C2185B",months:"marzo – mayo",   desc:"templado / mild"},
    {name:"El Verano",  eng:"Summer",icon:"☀️",color:"#E65100",months:"junio – agosto",  desc:"caluroso / hot"},
    {name:"El Otoño",   eng:"Autumn",icon:"🍂",color:"#BF360C",months:"sept. – nov.",    desc:"fresco / cool"},
    {name:"El Invierno",eng:"Winter",icon:"❄️",color:"#0D47A1",months:"dic. – febrero",  desc:"frío / cold"},
  ];
  const typeColors={hace:"#D84315",esta:"#1565C0",hay:"#2E7D32"};
  const typeLabels={hace:"HACE",esta:"ESTÁ",hay:"HAY"};

  const [view,setView]=useState("expr");
  const [filter,setFilter]=useState("all");
  const [expanded,setExpanded]=useState(null);

  const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const makeQuestions=()=>shuffle(weatherExpr).map((q,_,arr)=>{const wrong=shuffle(arr.filter(x=>x.expr!==q.expr)).slice(0,3);return{...q,options:shuffle([q.expr,...wrong.map(x=>x.expr)])}; });

  const [questions,setQuestions]=useState(()=>makeQuestions());
  const [qIdx,setQIdx]=useState(0);
  const [chosen,setChosen]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);

  const resetQuiz=()=>{setQuestions(makeQuestions());setQIdx(0);setChosen(null);setScore(0);setDone(false);};
  const handleAnswer=(opt)=>{if(chosen)return;setChosen(opt);if(opt===questions[qIdx].expr)setScore(s=>s+1);};
  const handleNext=()=>{if(qIdx+1>=questions.length){setDone(true);}else{setQIdx(i=>i+1);setChosen(null);}};

  const filtered=filter==="all"?weatherExpr:weatherExpr.filter(w=>w.type===filter);
  const q=!done?questions[qIdx]:null;

  return(<div>
    {/* ── VIEW TOGGLE ── */}
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"expr",l:"📚 EXPRESSIONS"},{k:"quiz",l:"🎯 QUIZ"}].map(v=>(
        <button key={v.k} onClick={()=>setView(v.k)} style={{flex:1,maxWidth:180,padding:"11px",borderRadius:10,border:view===v.k?"2.5px solid #0277BD":"1.5px solid #ddd",background:view===v.k?"#0277BD":"#fff",color:view===v.k?"#fff":"#666",cursor:"pointer",fontSize:13,fontWeight:800}}>{v.l}</button>
      ))}
    </div>

    {/* ── EXPRESSIONS VIEW ── */}
    {view==="expr"&&(<div>
      {/* Filter chips */}
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {[{k:"all",l:"ALL",c:"#0277BD"},...Object.keys(typeColors).map(k=>({k,l:typeLabels[k],c:typeColors[k]}))].map(f=>(
          <button key={f.k} onClick={()=>{setFilter(f.k);setExpanded(null);}} style={{padding:"6px 16px",borderRadius:20,border:filter===f.k?`2px solid ${f.c}`:"1.5px solid #ddd",background:filter===f.k?f.c:"#fff",color:filter===f.k?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{f.l}</button>
        ))}
      </div>

      {/* Weather card grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {filtered.map((w)=>{
          const c=typeColors[w.type];
          const isOpen=expanded===w.expr;
          return(
            <div key={w.expr} onClick={()=>setExpanded(isOpen?null:w.expr)} style={{background:"#fff",borderRadius:12,border:isOpen?`2px solid ${c}`:"1.5px solid #eee",cursor:"pointer",overflow:"hidden",transition:"border 0.15s"}}>
              <div style={{padding:"12px 10px",textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:4}}>{w.icon}</div>
                <div style={{fontSize:12,fontWeight:800,color:"#1a1a1a",marginBottom:2}}>{w.expr}</div>
                <div style={{fontSize:11,color:"#999"}}>{w.eng}</div>
              </div>
              {isOpen&&(<div style={{borderTop:`1px solid ${c}33`,padding:"8px 10px",background:`${c}09`}}>
                <span style={{display:"inline-block",fontSize:9,fontWeight:700,color:"#fff",background:c,borderRadius:4,padding:"2px 6px",marginBottom:6}}>{typeLabels[w.type]}</span>
                <div style={{fontSize:12,fontWeight:700,color:"#333",marginBottom:2}}>{w.ex}</div>
                <div style={{fontSize:11,color:"#777",fontStyle:"italic"}}>{w.exE}</div>
              </div>)}
            </div>
          );
        })}
      </div>

      <Insight text="Three patterns — HACE + noun (calor/frío/viento/sol), ESTÁ + adjective/gerund (nublado/lloviendo), HAY + noun (niebla/tormenta). Each has its own grammar!" />

      {/* Las Estaciones */}
      <Card color="#0277BD" title="🗓️ LAS ESTACIONES" subtitle="The Seasons">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          {seasons.map((s,i)=>(
            <div key={s.name} style={{padding:"14px",borderRight:i%2===0?"1px solid #f0eeeb":"none",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
              <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:13,fontWeight:800,color:s.color}}>{s.name}</div>
              <div style={{fontSize:11,color:"#aaa",marginBottom:2}}>{s.eng}</div>
              <div style={{fontSize:10,color:"#ccc",marginBottom:4}}>{s.months}</div>
              <div style={{display:"inline-block",fontSize:10,fontWeight:700,color:s.color,background:`${s.color}14`,borderRadius:4,padding:"2px 7px"}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>)}

    {/* ── QUIZ VIEW ── */}
    {view==="quiz"&&(<div>
      {!done?(
        <div>
          {/* Score bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"8px 14px",background:"#fff",borderRadius:10,border:"1px solid #eee",fontSize:12}}>
            <span style={{color:"#555",fontWeight:600}}>Question {qIdx+1} / {questions.length}</span>
            <span style={{color:"#2E7D32",fontWeight:800}}>✓ {score} correct</span>
          </div>

          {/* Question card */}
          <div style={{background:"#fff",borderRadius:14,padding:"28px 16px",marginBottom:14,border:"1px solid #eee",textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:10}}>{q.icon}</div>
            <div style={{fontSize:17,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>{q.eng}</div>
            <div style={{fontSize:11,color:"#bbb"}}>Choose the correct Spanish expression</div>
          </div>

          {/* Answer grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            {q.options.map(opt=>{
              const isCorrect=opt===q.expr;
              const isChosen=opt===chosen;
              let bg="#fff",border="1.5px solid #eee",col="#333";
              if(chosen){
                if(isCorrect){bg="#E8F5E9";border="2px solid #2E7D32";col="#1B5E20";}
                else if(isChosen){bg="#FFEBEE";border="2px solid #C62828";col="#B71C1C";}
                else{col="#ccc";}
              }
              return(
                <button key={opt} onClick={()=>handleAnswer(opt)} style={{padding:"14px 8px",borderRadius:10,border,background:bg,color:col,fontSize:12,fontWeight:700,cursor:chosen?"default":"pointer",transition:"all 0.15s",textAlign:"center",lineHeight:1.3}}>
                  {chosen&&isCorrect?"✓ ":chosen&&isChosen&&!isCorrect?"✗ ":""}{opt}
                </button>
              );
            })}
          </div>

          {chosen&&(<button onClick={handleNext} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:"#0277BD",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>
            {qIdx+1>=questions.length?"See Results →":"Next →"}
          </button>)}
        </div>
      ):(
        <div>
          <DarkBox>
            <div style={{fontSize:44,marginBottom:10}}>{score>=questions.length*0.8?"🏆":score>=questions.length*0.5?"👍":"📖"}</div>
            <div style={{fontSize:26,fontWeight:800,marginBottom:6}}>{score}/{questions.length}</div>
            <div style={{fontSize:13,color:"#aaa"}}>{score>=questions.length*0.8?"¡Excelente! Muy bien hecho.":score>=questions.length*0.5?"¡Bien! Keep practicing.":"¡Ánimo! Review the expressions and try again."}</div>
          </DarkBox>
          <button onClick={resetQuiz} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:"#0277BD",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔄 Try Again</button>
        </div>
      )}
    </div>)}
  </div>);
}
