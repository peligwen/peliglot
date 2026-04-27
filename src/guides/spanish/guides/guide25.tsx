import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';
import { falseCogs, grammarTraps, dColors } from './data25';

const cogQuizItems=falseCogs.map(f=>({question:`What does "${f.s}" actually mean?`,hint:`It does NOT mean: ${f.l}`,answer:f.a}));
const gramQuizItems=grammarTraps.map(g=>({question:g.wrong+" — what's wrong?",hint:g.seems,answer:g.correct}));
const allQuizItems=[...cogQuizItems,...gramQuizItems];

export function Guide25(){
  const [tab,setTab]=useState("cognates");
  const [level,setLevel]=useState(0);
  const filtered=level===0?falseCogs:falseCogs.filter(f=>f.d===level);
  return(<div>
    <DarkBox title="Common Traps"><div style={{fontSize:13,lineHeight:1.7}}>
      Two types of traps for English speakers: <strong style={{color:"#EF9A9A"}}>false cognates</strong> (words that look English but aren't) and <strong style={{color:"#FFCC80"}}>grammar traps</strong> (structures that work in English but fail in Spanish).
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"cognates",label:"📖 False Cognates"},{id:"grammar",label:"📖 Grammar Traps"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 14px",borderRadius:8,border:tab===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===t.id?"#1a1a1a":"#fff",color:tab===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {tab==="cognates"&&<div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:12}}>
        {[{v:0,label:"All"},{v:5,label:"🔴 Critical"},{v:4,label:"🟠 High"},{v:3,label:"🟡 Moderate"}].map(f=>(<button key={f.v} onClick={()=>setLevel(f.v)} style={{padding:"5px 12px",borderRadius:8,border:level===f.v?"2px solid #1a1a1a":"1.5px solid #ddd",background:level===f.v?"#1a1a1a":"#fff",color:level===f.v?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>{f.label}</button>))}
      </div>
      {filtered.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:dColors[f.d],flexShrink:0}}/>
          <span style={{fontSize:15,fontWeight:800,color:dColors[f.d]}}>{f.s}</span>
          <span style={{fontSize:13,color:"#ccc"}}>≠</span>
          <span style={{fontSize:13,color:"#999",textDecoration:"line-through"}}>{f.l}</span>
          <span style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:"#2E7D32",background:"#E8F5E9",padding:"2px 8px",borderRadius:5}}>{f.a}</span>
        </div>
        <div style={{fontSize:12,color:"#555",fontStyle:"italic",background:"#FAFAFA",padding:"4px 8px",borderRadius:6}}>{f.ex}</div>
      </div>))}
      <Insight text="Not all cognates are false! Many Spanish-English cognates ARE reliable: hotel, hospital, chocolate, animal, terrible, posible. Trust -ción = -tion (nación = nation) and -mente = -ly (naturalmente = naturally)."/>
    </div>}
    {tab==="grammar"&&<div>
      {grammarTraps.map((m,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 14px",marginBottom:8,border:"1px solid #eee"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
          <span style={{fontSize:13,fontWeight:700,color:"#C62828",textDecoration:"line-through"}}>{m.wrong}</span>
          <span style={{fontSize:11,color:"#999"}}>≠ {m.seems}</span>
        </div>
        <div style={{fontSize:14,fontWeight:700,color:"#2E7D32",marginBottom:4}}>✓ {m.correct}</div>
        <div style={{fontSize:11,color:"#888",background:"#FAFAFA",padding:"4px 8px",borderRadius:6}}>{m.note}</div>
      </div>))}
      <div style={{background:"#E3F2FD",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1.5px solid #BBDEFB"}}>
        <div style={{fontSize:13,fontWeight:800,color:"#0D47A1",marginBottom:8}}>Personal 'A' — One of the most important rules</div>
        <div style={{fontSize:12,color:"#555",lineHeight:1.7,marginBottom:8}}>Spanish requires <strong>a</strong> before a direct object that is a specific person (or personified animal). English has no equivalent.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:12,marginBottom:8}}>
          <div style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #BBDEFB"}}>
            <div style={{fontWeight:700,color:"#2E7D32",marginBottom:2}}>✓ With people</div>
            <div style={{fontStyle:"italic"}}>Veo <strong>a</strong> María.</div>
            <div style={{color:"#888",fontSize:11}}>I see María.</div>
          </div>
          <div style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #BBDEFB"}}>
            <div style={{fontWeight:700,color:"#C62828",marginBottom:2}}>✗ NOT with things</div>
            <div style={{fontStyle:"italic"}}>Veo la película.</div>
            <div style={{color:"#888",fontSize:11}}>I see the movie. (no 'a')</div>
          </div>
        </div>
        <div style={{fontSize:11,color:"#555",lineHeight:1.6}}>
          <strong>Also required:</strong> after buscar, esperar, llamar, querer + person: <em>Busco <strong>a</strong> mi amigo.</em><br/>
          <strong>After nadie/alguien:</strong> <em>No conozco <strong>a</strong> nadie aquí.</em> (No one = treated as a person)<br/>
          <strong>With animals:</strong> Optional for pets: <em>Llamo <strong>a</strong> mi perro.</em>
        </div>
      </div>
      <Insight text="Most grammar traps come from translating English structure directly. Spanish has different rules for: personal 'a', articles, verb+preposition combos, and ser/estar/tener distinctions."/>
    </div>}
    {tab==="quiz"&&<QuizSection
      items={allQuizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>{q.question}</div>
        <div style={{fontSize:12,color:"#999"}}>{q.hint}</div>
      </div>)}
      optionCount={4}
      color="#C62828"
      resultMessages={{high:"¡Excelente! You won't fall for these traps!",mid:"Watch out — review the ones you missed.",low:"Review both tabs and try again."}}
    />}
  </div>);
}
