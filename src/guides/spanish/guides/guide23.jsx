import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { speakSpanish } from '../../../utils/speech';

const numbers=[
  {n:0,sp:"cero"},{n:1,sp:"uno"},{n:2,sp:"dos"},{n:3,sp:"tres"},{n:4,sp:"cuatro"},
  {n:5,sp:"cinco"},{n:6,sp:"seis"},{n:7,sp:"siete"},{n:8,sp:"ocho"},{n:9,sp:"nueve"},
  {n:10,sp:"diez"},{n:11,sp:"once"},{n:12,sp:"doce"},{n:13,sp:"trece"},{n:14,sp:"catorce"},
  {n:15,sp:"quince"},{n:16,sp:"dieciséis"},{n:20,sp:"veinte"},{n:21,sp:"veintiuno"},
  {n:30,sp:"treinta"},{n:40,sp:"cuarenta"},{n:50,sp:"cincuenta"},{n:100,sp:"cien"},
  {n:1000,sp:"mil"},{n:1000000,sp:"un millón"},
];

const timeExamples=[
  {time:"1:00",sp:"Es la una."},
  {time:"2:30",sp:"Son las dos y media."},
  {time:"3:15",sp:"Son las tres y cuarto."},
  {time:"4:45",sp:"Son las cinco menos cuarto."},
  {time:"12:00",sp:"Es mediodía. / Es medianoche."},
];

export function Guide23(){
  const [tab,setTab]=useState("nums");
  return(<div>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {[{id:"nums",label:"🔢 Numbers"},{id:"dates",label:"📅 Dates"},{id:"time",label:"🕐 Time"}].map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 16px",borderRadius:8,border:tab===t.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===t.id?"#0277BD":"#fff",color:tab===t.id?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.label}</button>))}
    </div>
    {tab==="nums"&&<div>
      <DarkBox title="Number Patterns"><div style={{fontSize:13,lineHeight:1.7}}>
        <strong>0-15:</strong> unique forms to memorize<br/>
        <strong>16-29:</strong> compound words (dieciséis, veintiuno)<br/>
        <strong>30+:</strong> tens + y + unit (treinta y cinco = 35)
      </div></DarkBox>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:12}}>
        {numbers.map(nm=>(<div key={nm.n} onClick={()=>speakSpanish&&speakSpanish(nm.sp)} style={{background:"#fff",borderRadius:8,padding:"8px 4px",border:"1px solid #eee",textAlign:"center",cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.background="#E3F2FD"}} onMouseLeave={e=>{e.currentTarget.style.background="#fff"}}>
          <div style={{fontSize:16,fontWeight:800,color:"#0277BD"}}>{nm.n.toLocaleString()}</div>
          <div style={{fontSize:9,color:"#666",fontWeight:600}}>{nm.sp}</div>
        </div>))}
      </div>
      <Insight text="Uno shortens before masculine nouns: veintiún libros. Cien becomes ciento before another number: ciento dos (102)."/>
    </div>}
    {tab==="dates"&&<Card color="#0277BD" title="Dates">
      <div style={{background:"#E3F2FD",borderRadius:10,padding:"14px",marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:11,color:"#999",marginBottom:4}}>Format</div>
        <div style={{fontSize:16,fontWeight:800,color:"#0277BD"}}>el + day + de + month + de + year</div>
        <div style={{fontSize:14,fontWeight:600,color:"#1a1a1a",marginTop:8}}>el 5 de mayo de 2024</div>
      </div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.8}}>
        Days and months are <strong>NOT capitalized</strong>: lunes, martes, enero, febrero<br/>
        "On Monday" = <strong>el lunes</strong> (not *en lunes)<br/>
        "On Mondays" = <strong>los lunes</strong> (plural article = habitual)<br/>
        First of the month = <strong>el primero</strong> de enero (ordinal), rest use cardinals
      </div>
    </Card>}
    {tab==="time"&&<div>
      <DarkBox title="Telling Time"><div style={{fontSize:13,lineHeight:1.7}}>
        <strong>¿Qué hora es?</strong> — What time is it?<br/>
        1:00 uses <strong>Es la una</strong> (singular). All others: <strong>Son las...</strong> (plural)
      </div></DarkBox>
      {timeExamples.map(t=>(<div key={t.time} onClick={()=>speakSpanish&&speakSpanish(t.sp)} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.background="#E3F2FD"}} onMouseLeave={e=>{e.currentTarget.style.background="#fff"}}>
        <span style={{fontSize:20,fontWeight:800,color:"#0277BD",fontFamily:"monospace"}}>{t.time}</span>
        <span style={{fontSize:13,fontWeight:600,color:"#1a1a1a"}}>{t.sp}</span>
      </div>))}
      <Insight text="y media = :30 · y cuarto = :15 · menos cuarto = :45. In Mexico, 12-hour format is common: Son las tres de la tarde (3 PM)."/>
    </div>}
  </div>);
}
