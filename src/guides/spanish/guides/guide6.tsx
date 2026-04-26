import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { pronouns6 } from './_helpers';

const futEndings=["é","ás","á","emos","éis","án"];
const condEndings=["ía","ías","ía","íamos","íais","ían"];

const futUses=[
  {ex:"Mañana lloverá.",en:"It will rain tomorrow.",use:"Predictions & future events"},
  {ex:"¿Me ayudarás?",en:"Will you help me?",use:"Promises & requests"},
  {ex:"Serán las diez.",en:"It must be ten o'clock.",use:"Probability in the present"}
];
const condUses=[
  {ex:"Me gustaría viajar.",en:"I would like to travel.",use:"Wishes & polite requests"},
  {ex:"Si tuviera tiempo, iría.",en:"If I had time, I would go.",use:"Hypothetical (si + imperfect subjunctive)"},
  {ex:"Serían las diez.",en:"It was probably ten o'clock.",use:"Probability in the past"}
];

export function Guide6(){
  const [t,setT]=useState("future");const ends=t==="future"?futEndings:condEndings;
  const col=t==="future"?"#00897B":"#5E35B1";
  const uses=t==="future"?futUses:condUses;
  return(<div>
    <DarkBox title="Future vs. Conditional"><div style={{fontSize:14}}>The <strong style={{color:"#80CBC4"}}>futuro</strong> describes what <strong style={{color:"#FFE77A"}}>will</strong> happen. The <strong style={{color:"#B39DDB"}}>condicional</strong> describes what <strong style={{color:"#FFE77A"}}>would</strong> happen. Both attach endings to the full infinitive — no dropping -ar/-er/-ir!</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"future",l:"Futuro",c:"#00897B"},{k:"cond",l:"Condicional",c:"#5E35B1"}].map(x=>(<button key={x.k} onClick={()=>setT(x.k)} style={{flex:1,maxWidth:200,padding:"10px",borderRadius:10,border:t===x.k?`2.5px solid ${x.c}`:"1.5px solid #ddd",background:t===x.k?x.c:"#fff",color:t===x.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{x.l}</button>))}
    </div>
    <Card color={col} title={t==="future"?"Futuro — hablar":"Condicional — hablar"} subtitle="to speak">
      {pronouns6.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"0 16px",height:44,borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
        <div style={{width:110,fontSize:12,color:"#999"}}>{p}</div>
        <div style={{fontSize:17,fontWeight:700}}><span style={{color:"#999"}}>hablar</span><span style={{color:col,background:`${col}18`,padding:"1px 4px",borderRadius:3}}>{ends[i]}</span></div>
      </div>))}
    </Card>
    <Card color={col} title={t==="future"?"When to Use the Futuro":"When to Use the Condicional"} subtitle={t==="future"?"will / shall / probably":"would / could / probably (past)"}>
      {uses.map((u,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<uses.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:11,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{u.use}</div>
        <div style={{fontSize:16,fontWeight:700}}>{u.ex}</div>
        <div style={{fontSize:13,color:"#888"}}>{u.en}</div>
      </div>))}
    </Card>
    <Insight text={t==="future"?"The futuro also expresses probability about the present: '¿Qué hora será?' = 'What time can it be?'":"The condicional is the 'would' tense. Use it for polite requests, hypotheticals, and probability about the past."}/>
    <Insight text="Conditional endings (-ía, -ías...) are identical to the imperfect -ER/-IR endings."/>
  </div>);
}
