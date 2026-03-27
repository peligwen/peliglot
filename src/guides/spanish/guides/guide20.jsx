import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide20(){
  const qWords=[{w:"¿Qué?",m:"What?"},{w:"¿Cuál(es)?",m:"Which?"},{w:"¿Quién(es)?",m:"Who?"},{w:"¿Dónde?",m:"Where?"},{w:"¿Cuándo?",m:"When?"},{w:"¿Cómo?",m:"How?"},{w:"¿Por qué?",m:"Why?"},{w:"¿Cuánto/a?",m:"How much?"}];
  return(<div>
    <DarkBox title="Question Basics"><div style={{fontSize:13,lineHeight:1.7}}>
      <span style={{color:"#FFE77A",fontSize:18}}>¿ ... ?</span> — inverted marks at both ends<br/>
      Yes/no: just change intonation! ¿Hablas español?<br/>
      Info: interrogative + verb — ¿Dónde vives?
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,marginBottom:16}}>
      {qWords.map((q,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:15,fontWeight:800,color:"#0277BD"}}>{q.w}</span>
        <span style={{fontSize:12,color:"#999"}}>{q.m}</span>
      </div>))}
    </div>
    <Insight text="Qué vs Cuál: Qué = definitions & before nouns (¿Qué es eso? ¿Qué libro?). Cuál = selections & specific info (¿Cuál es tu nombre? ¿Cuál prefieres?)"/>
  </div>);
}
