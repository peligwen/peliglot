import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

const spChanges=[
  {id:"c-qu",change:"C → QU",rule:"Before E/I to keep /k/",color:"#C2185B",sound:"/k/",
    examples:[{inf:"buscar",form:"busqué",t:"Preterite yo"},{inf:"tocar",form:"toqué",t:"Preterite yo"},{inf:"sacar",form:"saqué",t:"Preterite yo"}]},
  {id:"g-gu",change:"G → GU",rule:"Before E/I to keep hard /g/",color:"#1565C0",sound:"/ɡ/",
    examples:[{inf:"pagar",form:"pagué",t:"Preterite yo"},{inf:"llegar",form:"llegué",t:"Preterite yo"},{inf:"jugar",form:"jugué",t:"Preterite yo"}]},
  {id:"z-c",change:"Z → C",rule:"Before E/I (spelling convention)",color:"#2E7D32",sound:"/s/",
    examples:[{inf:"empezar",form:"empecé",t:"Preterite yo"},{inf:"almorzar",form:"almorcé",t:"Preterite yo"},{inf:"cruzar",form:"crucé",t:"Preterite yo"}]},
  {id:"g-j",change:"G → J",rule:"Before A/O to keep throaty /x/",color:"#E65100",sound:"/x/",
    examples:[{inf:"coger",form:"cojo",t:"Present yo"},{inf:"proteger",form:"protejo",t:"Present yo"},{inf:"dirigir",form:"dirijo",t:"Present yo"}]},
  {id:"gu-g",change:"GU → G",rule:"Before A/O (U was just a helper)",color:"#6A1B9A",sound:"/ɡ/",
    examples:[{inf:"seguir",form:"sigo",t:"Present yo"},{inf:"distinguir",form:"distingo",t:"Present yo"}]},
  {id:"i-y",change:"I → Y",rule:"Unstressed I between vowels → Y",color:"#00838F",sound:"/ʝ/",
    examples:[{inf:"leer",form:"leyó",t:"Preterite él"},{inf:"creer",form:"creyó",t:"Preterite él"},{inf:"oír",form:"oyó",t:"Preterite él"}]},
];

export function Guide3(){
  const [ac,setAc]=useState("c-qu");
  const ch=spChanges.find(c=>c.id===ac);
  return(<div>
    <DarkBox title="Core Principle">
      <div style={{fontSize:14}}>Spanish spelling changes exist to <strong style={{color:"#FFE77A"}}>keep the same sound</strong> when the following vowel changes.</div>
    </DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:5}}>
      {spChanges.slice(0,3).map(c=>(<button key={c.id} onClick={()=>setAc(c.id)} style={{padding:"8px 4px",borderRadius:8,border:ac===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:ac===c.id?c.color:"#fff",color:ac===c.id?"#fff":"#555",cursor:"pointer",fontSize:13,fontWeight:700,textAlign:"center"}}>{c.change}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:16}}>
      {spChanges.slice(3).map(c=>(<button key={c.id} onClick={()=>setAc(c.id)} style={{padding:"8px 4px",borderRadius:8,border:ac===c.id?`2.5px solid ${c.color}`:"1.5px solid #ddd",background:ac===c.id?c.color:"#fff",color:ac===c.id?"#fff":"#555",cursor:"pointer",fontSize:13,fontWeight:700,textAlign:"center"}}>{c.change}</button>))}
    </div>
    <Card color={ch.color} title={ch.change} subtitle={ch.rule}>
      {ch.examples.map((ex,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 1fr auto",alignItems:"center",padding:"10px 16px",borderBottom:i<ch.examples.length-1?"1px solid #f5f3ef":"none"}}>
        <div style={{fontSize:13,color:"#999"}}>{ex.inf}</div>
        <div style={{fontSize:17,fontWeight:700,color:ch.color}}>{ex.form}</div>
        <div style={{fontSize:11,color:"#aaa"}}>{ex.t}</div>
      </div>))}
    </Card>
  </div>);
}
