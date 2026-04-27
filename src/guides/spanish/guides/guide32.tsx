import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { groups } from './data32';

const pronouns=["yo","tú","él/ella","nosotros","vosotros","ellos/ellas"];

const conj={
  tener:["tengo","tienes","tiene","tenemos","tenéis","tienen"],
  dar:["doy","das","da","damos","dais","dan"],
  hacer:["hago","haces","hace","hacemos","hacéis","hacen"],
};

export function Guide32(){
  type GroupKey = keyof typeof groups;
  const [cat,setCat]=useState<GroupKey>("tener");
  const [pro,setPro]=useState(-1);
  const g=groups[cat];
  const forms=conj[cat];
  return(<div>
    <DarkBox title="Idiomatic Expressions"><div style={{fontSize:13,lineHeight:1.7}}>
      Spanish uses <strong>tener</strong>, <strong>dar</strong>, and <strong>hacer</strong> where English often uses "to be" or a completely different verb. You can't translate these word-by-word!
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {(Object.entries(groups) as [GroupKey, typeof groups[GroupKey]][]).map(([k,v])=>(<button key={k} onClick={()=>{setCat(k);setPro(-1);}} style={{padding:"7px 16px",borderRadius:8,border:cat===k?"2px solid #1a1a1a":"1.5px solid #ddd",background:cat===k?v.color:"#fff",color:cat===k?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{v.label}</button>))}
    </div>
    <div style={{background:`${g.color}08`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:g.color,fontWeight:600,borderLeft:`4px solid ${g.color}`}}>{g.note}</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      <button onClick={()=>setPro(-1)} style={{padding:"5px 12px",borderRadius:8,border:pro===-1?"2px solid #1a1a1a":"1.5px solid #ddd",background:pro===-1?"#1a1a1a":"#fff",color:pro===-1?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>Infinitive</button>
      {pronouns.map((p,i)=>(<button key={p} onClick={()=>setPro(i)} style={{padding:"5px 12px",borderRadius:8,border:pro===i?"2px solid #1a1a1a":"1.5px solid #ddd",background:pro===i?"#1a1a1a":"#fff",color:pro===i?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>{p}</button>))}
    </div>
    {g.items.map(i=>{
      const reflPron=["me","te","se","nos","os","se"];
      const verb=pro===-1?i.sp:('reflexive' in i && i.reflexive)?`${reflPron[pro]} ${forms[pro]} ${i.tail}`:`${forms[pro]} ${i.tail}`;
      return(<div key={i.sp} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
          <span style={{fontSize:14,fontWeight:700,color:g.color}}>
            {pro>=0&&<span style={{fontSize:11,color:"#999",fontWeight:400,marginRight:6}}>{pronouns[pro]}</span>}
            {verb}
          </span>
          <span style={{fontSize:12,color:"#555"}}>{i.en}</span>
        </div>
        <div style={{fontSize:11,color:"#aaa",fontStyle:"italic"}}>lit. "{i.lit}"</div>
      </div>);
    })}
    <Insight text="With tener expressions, use mucho/a (not muy) for emphasis: Tengo MUCHA hambre (not *muy hambre). The noun determines mucho vs mucha."/>
    <div style={{background:"#E8F5E9",borderRadius:12,padding:"14px 16px",marginTop:8,border:"1.5px solid #C8E6C9"}}>
      <div style={{fontSize:13,fontWeight:800,color:"#2E7D32",marginBottom:8}}>Tener que + infinitive — Obligation</div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.7,marginBottom:8}}>The most-used tener structure: <strong>tener que + infinitive</strong> = "to have to / must." Different from tener + noun — no noun, just the infinitive.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:12,marginBottom:8}}>
        {[{sp:"Tengo que estudiar.",en:"I have to study."},
          {sp:"Tienes que comer.",en:"You have to eat."},
          {sp:"Tiene que ir al médico.",en:"He has to go to the doctor."},
          {sp:"Tenemos que salir ya.",en:"We have to leave now."}].map((ex,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #C8E6C9"}}>
            <div style={{fontWeight:600,color:"#2E7D32",fontStyle:"italic"}}>{ex.sp}</div>
            <div style={{color:"#888",fontSize:11}}>{ex.en}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#555",lineHeight:1.6}}>Also: <strong>hay que + infinitive</strong> = "one must / it is necessary to" (impersonal, no subject): <em>Hay que estudiar más.</em> (One needs to study more.)</div>
    </div>
  </div>);
}
