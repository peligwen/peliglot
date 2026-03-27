import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { QuizSection } from '../../../components/templates/QuizSection';

const falseCogs=[
  {s:"embarazada",l:"embarrassed",a:"pregnant",d:5,ex:"Está embarazada. = She's pregnant. (Use avergonzado/a for embarrassed.)"},
  {s:"constipado",l:"constipated",a:"having a cold",d:5,ex:"Estoy constipado. = I have a cold. (Use estreñido for constipated.)"},
  {s:"molestar",l:"to molest",a:"to bother/annoy",d:5,ex:"No me molestes. = Don't bother me."},
  {s:"actualmente",l:"actually",a:"currently",d:5,ex:"Actualmente vivo en Madrid. = I currently live in Madrid. (Use en realidad for actually.)"},
  {s:"éxito",l:"exit",a:"success",d:4,ex:"Fue un gran éxito. = It was a great success. (Use salida for exit.)"},
  {s:"asistir",l:"to assist",a:"to attend",d:4,ex:"Asistí a la reunión. = I attended the meeting. (Use ayudar for to assist.)"},
  {s:"librería",l:"library",a:"bookstore",d:4,ex:"Compré un libro en la librería. = I bought a book at the bookstore. (Use biblioteca for library.)"},
  {s:"sensible",l:"sensible",a:"sensitive",d:4,ex:"Es muy sensible. = He's very sensitive. (Use sensato for sensible.)"},
  {s:"realizar",l:"to realize",a:"to carry out / accomplish",d:4,ex:"Realizó su sueño. = She accomplished her dream. (Use darse cuenta for to realize.)"},
  {s:"soportar",l:"to support",a:"to tolerate / bear",d:4,ex:"No lo soporto. = I can't stand it. (Use apoyar for to support.)"},
  {s:"introducir",l:"to introduce (a person)",a:"to insert / put in",d:4,ex:"Introduzca la tarjeta. = Insert the card. (Use presentar for introducing people.)"},
  {s:"ropa",l:"rope",a:"clothing",d:3,ex:"Necesito ropa nueva. = I need new clothes. (Use cuerda for rope.)"},
  {s:"carpeta",l:"carpet",a:"folder",d:3,ex:"Pon los papeles en la carpeta. = Put the papers in the folder. (Use alfombra for carpet.)"},
  {s:"recordar",l:"to record",a:"to remember",d:3,ex:"No recuerdo su nombre. = I don't remember his name. (Use grabar for to record.)"},
];

const dColors={5:"#C62828",4:"#E65100",3:"#F9A825"};
const dLabels={5:"Critical",4:"High",3:"Moderate"};

export function Guide25(){
  const [mode,setMode]=useState("learn");
  const [level,setLevel]=useState(0);
  const filtered=level===0?falseCogs:falseCogs.filter(f=>f.d===level);
  return(<div>
    <DarkBox title="False Cognates"><div style={{fontSize:13,lineHeight:1.7}}>
      Words that <strong style={{color:"#EF9A9A"}}>look like English</strong> but mean something completely different. These are among the most embarrassing mistakes you can make!
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"learn",label:"📖 Learn"},{id:"quiz",label:"🧪 Quiz"}].map(t=>(<button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 16px",borderRadius:8,border:mode===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:mode===t.id?"#1a1a1a":"#fff",color:mode===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {mode==="learn"?<div>
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
    </div>:<QuizSection
      items={falseCogs.map(f=>({word:f.s,looksLike:f.l,answer:f.a}))}
      answerKey="answer"
      renderQuestion={(q)=>(<div>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>What does this word ACTUALLY mean?</div>
        <div style={{fontSize:24,fontWeight:800,color:"#1a1a1a"}}>{q.word}</div>
        <div style={{fontSize:12,color:"#C62828",marginTop:4}}>It does NOT mean: <s>{q.looksLike}</s></div>
      </div>)}
      optionCount={4}
      color="#C62828"
      resultMessages={{high:"¡Excelente! You won't fall for these traps!",mid:"Watch out for the critical ones!",low:"Review the learn tab — these are important!"}}
    />}
  </div>);
}
