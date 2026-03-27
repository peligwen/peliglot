import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { speakHawaiian } from '../../../utils/speech';
import { Insight } from './_helpers';

const hwnLetters=[
  {l:"A",sound:"/a/ — 'ah' as in father",type:"vowel",note:"Open front vowel"},
  {l:"E",sound:"/e/ — 'eh' as in bet",type:"vowel",note:"Mid front vowel"},
  {l:"I",sound:"/i/ — 'ee' as in see",type:"vowel",note:"High front vowel"},
  {l:"O",sound:"/o/ — 'oh' as in go (short)",type:"vowel",note:"Mid back vowel"},
  {l:"U",sound:"/u/ — 'oo' as in moon",type:"vowel",note:"High back vowel"},
  {l:"H",sound:"/h/ — as in English 'hat'",type:"consonant",note:"Same as English"},
  {l:"K",sound:"/k/ — softer than English 'k'",type:"consonant",note:"No aspiration (no puff of air). After 'i' sounds closer to 't' in some dialects"},
  {l:"L",sound:"/l/ — as in English 'let'",type:"consonant",note:"Lighter than English 'l'. Tongue touches just behind teeth"},
  {l:"M",sound:"/m/ — as in English 'mom'",type:"consonant",note:"Same as English"},
  {l:"N",sound:"/n/ — as in English 'no'",type:"consonant",note:"Same as English"},
  {l:"P",sound:"/p/ — softer than English 'p'",type:"consonant",note:"No aspiration. Gentle, unaspirated"},
  {l:"W",sound:"/w/ or /v/ — varies by position",type:"consonant",note:"After 'u' and 'o': /w/. After 'i' and 'e': often /v/. Word-initial: usually /w/"},
  {l:"\u02BB",sound:"/\u0294/ — glottal stop",type:"consonant",note:"A real consonant! The catch in your throat like in 'uh-oh'. Written as \u02BBokina (opening single quote)"},
];

export function Guide1(){
  const[sel,setSel]=useState(null);
  const[filter,setFilter]=useState("all");
  const filtered=hwnLetters.filter(l=>filter==="all"||l.type===filter);
  return(<div>
    <DarkBox title="Only 13 Letters"><div style={{fontSize:14,lineHeight:1.6}}>
      Hawaiian has the <strong style={{color:"#FFE77A"}}>shortest alphabet of any living language</strong>: 5 vowels + 7 consonants + the \u02BBokina (glottal stop). Every syllable ends in a vowel.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {[{id:"all",label:"All 13"},{id:"vowel",label:"Vowels (5)"},{id:"consonant",label:"Consonants (8)"}].map(f=>(
        <button key={f.id} onClick={()=>{setFilter(f.id);setSel(null)}} style={{padding:"6px 14px",borderRadius:16,border:filter===f.id?"2px solid #1B5E20":"1.5px solid #ddd",background:filter===f.id?"#1B5E20":"#fff",color:filter===f.id?"#fff":"#666",fontSize:12,fontWeight:600,cursor:"pointer"}}>{f.label}</button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(58px, 1fr))",gap:6,marginBottom:16}}>
      {filtered.map(l=>{const isSel=sel?.l===l.l;const isV=l.type==="vowel";const isOkina=l.l==="\u02BB";return(
        <button key={l.l} onClick={()=>{setSel(isSel?null:l);speakHawaiian(l.l);}} style={{aspectRatio:"1",border:isSel?"2.5px solid #1B5E20":isOkina?"2px solid #C62828":"1.5px solid #e0dcd5",borderRadius:12,background:isSel?"#1B5E20":isV?"#E8F5E9":isOkina?"#FFF3E0":"#fff",color:isSel?"#FFE77A":"#1a1a1a",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transform:isSel?"scale(1.08)":"scale(1)",transition:"all 0.15s",fontSize:isOkina?28:24,fontWeight:700,fontFamily:"'Georgia',serif"}}>
          {l.l}
          <span style={{fontSize:8,color:isSel?"rgba(255,231,122,0.7)":"#aaa",marginTop:2,fontFamily:"system-ui,sans-serif",fontWeight:400}}>{l.type}</span>
        </button>
      );})}
    </div>
    {sel&&(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e0dcd5",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
      <div style={{background:"#1B5E20",padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
        <div style={{fontSize:48,fontWeight:700,color:"#FFE77A",fontFamily:"'Georgia',serif",lineHeight:1}}>{sel.l}</div>
        <div><div style={{color:"#FFE77A",fontSize:14,fontFamily:"monospace"}}>{sel.sound}</div></div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{background:"#F5F9F5",borderRadius:8,padding:"10px 14px",border:"1px solid #D4E8D4",fontSize:13,color:"#333",lineHeight:1.5}}>{sel.note}</div>
      </div>
    </div>)}
    <Insight text="Hawaiian has no consonant clusters and every syllable is (C)V \u2014 an optional consonant followed by a vowel. This is why Hawaiian words flow so smoothly."/>
  </div>);
}
