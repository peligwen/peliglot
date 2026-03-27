import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide15(){
  const [ctx,setCtx]=useState(0);
  const placements=[
    {rule:"Before conjugated verb",ctx:"Conjugated",exEs:"Lo veo.",exEn:"I see him.",parts:[{t:"Lo",hi:true},{t:" "},{t:"veo",hi:false}],note:"Pronoun always goes right before the conjugated verb."},
    {rule:"Attached to infinitive",ctx:"Infinitive",exEs:"Quiero verlo.",exEn:"I want to see it.",parts:[{t:"Quiero"},{t:" "},{t:"ver",hi:false},{t:"lo",hi:true}],alt:"Lo quiero ver.",note:"Two options: attach to infinitive OR move before conjugated verb."},
    {rule:"Attached to gerund",ctx:"Gerund (-ando/-iendo)",exEs:"Estoy haciéndolo.",exEn:"I'm doing it.",parts:[{t:"Estoy"},{t:" "},{t:"haciéndo",hi:false},{t:"lo",hi:true}],alt:"Lo estoy haciendo.",note:"Two options again. Note the accent mark added to keep stress!"},
    {rule:"Attached to affirmative command",ctx:"Command (+)",exEs:"¡Dímelo!",exEn:"Tell it to me!",parts:[{t:"Dí",hi:false},{t:"me",hi:true},{t:"lo",hi:true}],note:"Must attach. Order: IO (me) before DO (lo). Accent added."},
    {rule:"Before negative command",ctx:"Command (−)",exEs:"¡No lo hagas!",exEn:"Don't do it!",parts:[{t:"¡No "},{t:"lo",hi:true},{t:" "},{t:"hagas",hi:false},{t:"!"}],note:"Negative commands put pronouns BEFORE the verb — like conjugated verbs."},
    {rule:"Double: IO + DO → SE lo",ctx:"Double pronouns",exEs:"Se lo digo.",exEn:"I tell it to him.",parts:[{t:"Se",hi:true},{t:" "},{t:"lo",hi:true},{t:" "},{t:"digo",hi:false}],note:"Le/les + lo/la → SE lo/la. 'Le lo' is NEVER correct! Mnemonic: RID (Reflexive, Indirect, Direct)."},
  ];
  const p=placements[ctx];const col="#E65100";
  return(<div>
    <DarkBox title="Where Do Pronouns Go?"><div style={{fontSize:13}}>Placement depends on the verb form. Tap each context below to see the rule.</div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:5}}>
      {placements.slice(0,3).map((pl,i)=>(<button key={i} onClick={()=>setCtx(i)} style={{padding:"8px 4px",borderRadius:8,border:ctx===i?`2.5px solid ${col}`:"1.5px solid #ddd",background:ctx===i?col:"#fff",color:ctx===i?"#fff":"#555",cursor:"pointer",fontSize:10,fontWeight:700,textAlign:"center",lineHeight:1.2}}>{pl.ctx}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:16}}>
      {placements.slice(3).map((pl,i)=>(<button key={i+3} onClick={()=>setCtx(i+3)} style={{padding:"8px 4px",borderRadius:8,border:ctx===i+3?`2.5px solid ${col}`:"1.5px solid #ddd",background:ctx===i+3?col:"#fff",color:ctx===i+3?"#fff":"#555",cursor:"pointer",fontSize:10,fontWeight:700,textAlign:"center",lineHeight:1.2}}>{pl.ctx}</button>))}
    </div>
    <div style={{background:"#FAFAF5",borderRadius:12,padding:"20px 16px",textAlign:"center",border:"1px solid #eee",marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{p.rule}</div>
      <div style={{fontSize:24,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
        {p.parts.map((part,i)=>(<span key={i} style={{color:part.hi?col:"#333",background:part.hi?`${col}15`:"transparent",padding:part.hi?"2px 5px":"0",borderRadius:4}}>{part.t}</span>))}
      </div>
      <div style={{fontSize:13,color:"#888",marginTop:6,fontStyle:"italic"}}>{p.exEn}</div>
      {p.alt&&<div style={{fontSize:13,color:"#aaa",marginTop:4}}>Also valid: <strong style={{color:"#555"}}>{p.alt}</strong></div>}
    </div>
    <div style={{background:`${col}10`,borderRadius:10,padding:"10px 14px",marginBottom:12,border:`1px solid ${col}25`,fontSize:12,color:"#555",lineHeight:1.5}}>{p.note}</div>
    <Insight text="1st & 2nd person (me, te, nos) are the same for DO, IO, and reflexive. The split only matters in 3rd person: lo/la (DO), le (IO), se (reflexive)."/>
  </div>);
}
