import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const qWords=[
  {w:"¿Qué?",m:"What?",ex:"¿Qué quieres? — What do you want?"},
  {w:"¿Cuál(es)?",m:"Which?",ex:"¿Cuál es tu nombre? — What's your name?"},
  {w:"¿Quién(es)?",m:"Who?",ex:"¿Quién llamó? — Who called?"},
  {w:"¿Dónde?",m:"Where?",ex:"¿Dónde vives? — Where do you live?"},
  {w:"¿Cuándo?",m:"When?",ex:"¿Cuándo llegas? — When do you arrive?"},
  {w:"¿Cómo?",m:"How?",ex:"¿Cómo estás? — How are you?"},
  {w:"¿Por qué?",m:"Why?",ex:"¿Por qué estudias español? — Why do you study Spanish?"},
  {w:"¿Cuánto/a?",m:"How much/many?",ex:"¿Cuánto cuesta? — How much does it cost?"},
];

const quizItems=[
  {question:"___ quieres comer? (What do you want to eat?)",answer:"Qué"},
  {question:"___ es tu color favorito? (What is your favorite color?)",answer:"Cuál"},
  {question:"___ vive aquí? (Who lives here?)",answer:"Quién"},
  {question:"___ está el baño? (Where is the bathroom?)",answer:"Dónde"},
  {question:"___ empieza la clase? (When does class start?)",answer:"Cuándo"},
  {question:"___ se dice 'hello'? (How do you say 'hello'?)",answer:"Cómo"},
  {question:"___ no viniste? (Why didn't you come?)",answer:"Por qué"},
  {question:"___ cuesta esto? (How much does this cost?)",answer:"Cuánto"},
];

export function Guide20(){
  const [mode,setMode]=useState("learn");
  return(<div>
    <DarkBox title="Question Basics"><div style={{fontSize:13,lineHeight:1.7}}>
      <span style={{color:"#FFE77A",fontSize:18}}>¿ ... ?</span> — inverted marks at both ends<br/>
      Yes/no: just change intonation! ¿Hablas español?<br/>
      Info: interrogative + verb — ¿Dónde vives?
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
      {qWords.map((q,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
          <span style={{fontSize:15,fontWeight:800,color:"#0277BD"}}>{q.w}</span>
          <span style={{fontSize:12,color:"#999"}}>{q.m}</span>
        </div>
        <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{q.ex}</div>
      </div>))}
      <Insight text="Qué vs Cuál: Qué = definitions & before nouns (¿Qué es eso? ¿Qué libro?). Cuál = selections & specific info (¿Cuál es tu nombre? ¿Cuál prefieres?)"/>
    </div>:<QuizSection
      items={quizItems}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>Fill in the question word:</div>
        <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a"}}>{q.question}</div>
      </div>)}
      optionCount={4}
      color="#0277BD"
      resultMessages={{high:"¡Excelente! You know your question words!",mid:"Good! Review Qué vs Cuál.",low:"Study the learn tab and try again."}}
    />}
  </div>);
}
