import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const groups={
  tener:{color:"#C62828",label:"Tener + noun",note:"Where English says 'to be...', Spanish says 'to have...'",items:[
    {sp:"tener hambre",en:"to be hungry",lit:"to have hunger"},
    {sp:"tener sed",en:"to be thirsty",lit:"to have thirst"},
    {sp:"tener sueño",en:"to be sleepy",lit:"to have sleep"},
    {sp:"tener calor",en:"to be hot",lit:"to have heat"},
    {sp:"tener frío",en:"to be cold",lit:"to have cold"},
    {sp:"tener miedo",en:"to be afraid",lit:"to have fear"},
    {sp:"tener razón",en:"to be right",lit:"to have reason"},
    {sp:"tener prisa",en:"to be in a hurry",lit:"to have hurry"},
    {sp:"tener suerte",en:"to be lucky",lit:"to have luck"},
    {sp:"tener ... años",en:"to be ... years old",lit:"to have ... years"},
  ]},
  dar:{color:"#0D47A1",label:"Dar + noun",note:"Dar = to give, but in many expressions it means something completely different.",items:[
    {sp:"dar un paseo",en:"to take a walk",lit:"to give a walk"},
    {sp:"dar igual",en:"to not matter",lit:"to give equal"},
    {sp:"darse cuenta de",en:"to realize",lit:"to give oneself account of"},
    {sp:"dar a luz",en:"to give birth",lit:"to give to light"},
    {sp:"dar la bienvenida",en:"to welcome",lit:"to give the welcome"},
    {sp:"dar miedo",en:"to scare",lit:"to give fear"},
  ]},
  hacer:{color:"#00695C",label:"Hacer + noun",note:"Hacer = to do/make, but appears in many fixed expressions.",items:[
    {sp:"hacer falta",en:"to be needed",lit:"to make lack"},
    {sp:"hacer caso",en:"to pay attention",lit:"to make case"},
    {sp:"hacer cola",en:"to stand in line",lit:"to make tail"},
    {sp:"hacer trampa",en:"to cheat",lit:"to make trap"},
    {sp:"hacer daño",en:"to hurt",lit:"to make damage"},
    {sp:"hacer las maletas",en:"to pack",lit:"to make the suitcases"},
  ]},
};

export function Guide32(){
  const [cat,setCat]=useState("tener");const g=groups[cat];
  return(<div>
    <DarkBox title="Idiomatic Expressions"><div style={{fontSize:13,lineHeight:1.7}}>
      Spanish uses <strong>tener</strong>, <strong>dar</strong>, and <strong>hacer</strong> where English often uses "to be" or a completely different verb. You can't translate these word-by-word!
    </div></DarkBox>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:14}}>
      {Object.entries(groups).map(([k,v])=>(<button key={k} onClick={()=>setCat(k)} style={{padding:"7px 16px",borderRadius:8,border:cat===k?"2px solid #1a1a1a":"1.5px solid #ddd",background:cat===k?v.color:"#fff",color:cat===k?"#fff":"#666",fontSize:12,fontWeight:700,cursor:"pointer"}}>{v.label}</button>))}
    </div>
    <div style={{background:`${g.color}08`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:g.color,fontWeight:600,borderLeft:`4px solid ${g.color}`}}>{g.note}</div>
    {g.items.map(i=>(<div key={i.sp} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
        <span style={{fontSize:14,fontWeight:700,color:g.color}}>{i.sp}</span>
        <span style={{fontSize:12,color:"#555"}}>{i.en}</span>
      </div>
      <div style={{fontSize:11,color:"#aaa",fontStyle:"italic"}}>lit. "{i.lit}"</div>
    </div>))}
    <Insight text="With tener expressions, use mucho/a (not muy) for emphasis: Tengo MUCHA hambre (not *muy hambre). The noun determines mucho vs mucha."/>
  </div>);
}
