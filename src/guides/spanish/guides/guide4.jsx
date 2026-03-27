import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { VerbTypeSelector, ConjugationTable } from './_helpers';

const presentData={
  ar:{verb:"hablar",stem:"habl",endings:["o","as","a","amos","áis","an"],meaning:"to speak"},
  er:{verb:"comer",stem:"com",endings:["o","es","e","emos","éis","en"],meaning:"to eat"},
  ir:{verb:"vivir",stem:"viv",endings:["o","es","e","imos","ís","en"],meaning:"to live"},
};

const uses=[
  {label:"Current actions",ex:"Hablo español. — I speak Spanish.",color:"#D84315"},
  {label:"Habitual / routine",ex:"Comemos a las dos. — We eat at two (every day).",color:"#00695C"},
  {label:"Near future",ex:"Mañana viajo a México. — Tomorrow I travel to Mexico.",color:"#4527A0"},
];

const irregulars=[
  {v:"ser",forms:["soy","eres","es","somos","sois","son"],m:"to be (essence)"},
  {v:"ir",forms:["voy","vas","va","vamos","vais","van"],m:"to go"},
  {v:"tener",forms:["tengo","tienes","tiene","tenemos","tenéis","tienen"],m:"to have"},
  {v:"hacer",forms:["hago","haces","hace","hacemos","hacéis","hacen"],m:"to do/make"},
];

export function Guide4(){
  const [vt,setVt]=useState("ar");
  const [showIrreg,setShowIrreg]=useState(false);
  const d=presentData[vt];const cols={ar:"#D84315",er:"#00695C",ir:"#4527A0"};
  return(<div>
    <DarkBox title="Present Tense (Presente Indicativo)"><div style={{fontSize:13,lineHeight:1.7}}>
      The most versatile tense — used for current actions, habits, and even near future. Formula: <strong>drop -ar/-er/-ir</strong> → add endings.
    </div></DarkBox>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
      {uses.map(u=>(<div key={u.label} style={{background:`${u.color}10`,border:`1px solid ${u.color}30`,borderRadius:8,padding:"6px 12px",flex:"1 1 auto",minWidth:140}}>
        <div style={{fontSize:11,fontWeight:700,color:u.color}}>{u.label}</div>
        <div style={{fontSize:11,color:"#666",fontStyle:"italic"}}>{u.ex}</div>
      </div>))}
    </div>
    <VerbTypeSelector vt={vt} setVt={setVt} cols={cols}/>
    <div style={{background:`${cols[vt]}12`,border:`2px dashed ${cols[vt]}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,textAlign:"center",fontSize:13,color:cols[vt],fontWeight:600}}>
      ✂️ {d.verb} → drop -{vt} → {d.stem}- → add endings
    </div>
    <ConjugationTable stem={d.stem} endings={d.endings} verb={d.verb} meaning={d.meaning} color={cols[vt]}/>
    <button onClick={()=>setShowIrreg(!showIrreg)} style={{width:"100%",padding:"10px",borderRadius:10,border:"1.5px solid #ddd",background:showIrreg?"#1a1a1a":"#fff",color:showIrreg?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer",marginTop:8,marginBottom:8}}>
      {showIrreg?"Hide":"Show"} Top 4 Irregulars ⚡
    </button>
    {showIrreg&&<Card color="#1a1a1a" title="Essential Irregular Verbs">
      {irregulars.map((ir,i)=>(<div key={ir.v} style={{padding:"8px 16px",borderBottom:i<irregulars.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
          <span style={{fontSize:14,fontWeight:800,color:"#1a1a1a"}}>{ir.v}</span>
          <span style={{fontSize:11,color:"#999"}}>{ir.m}</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {ir.forms.map((f,j)=>(<span key={j} style={{padding:"2px 8px",borderRadius:6,background:"#f5f5f5",fontSize:11,fontWeight:600,color:"#333"}}>{f}</span>))}
        </div>
      </div>))}
    </Card>}
    <Insight text="-ER and -IR share most endings — they only differ in nosotros (-emos vs -imos) and vosotros (-éis vs -ís). Master -AR first, then the others come easy."/>
  </div>);
}
