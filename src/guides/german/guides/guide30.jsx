import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';

export function Guide30(){
  const combos=[
    {verb:"warten auf",case:"+ Akk",en:"to wait for",ex:"Ich warte auf den Bus.",color:"#C62828",prep:"auf"},
    {verb:"sich freuen auf",case:"+ Akk",en:"to look forward to",ex:"Ich freue mich auf den Urlaub.",color:"#1565C0",prep:"auf"},
    {verb:"sich freuen über",case:"+ Akk",en:"to be happy about",ex:"Ich freue mich über das Geschenk.",color:"#2E7D32",prep:"über"},
    {verb:"Angst haben vor",case:"+ Dat",en:"to be afraid of",ex:"Ich habe Angst vor dem Hund.",color:"#E65100",prep:"vor"},
    {verb:"denken an",case:"+ Akk",en:"to think about",ex:"Ich denke an dich.",color:"#6A1B9A",prep:"an"},
    {verb:"abhängen von",case:"+ Dat",en:"to depend on",ex:"Das hängt vom Wetter ab.",color:"#880E4F",prep:"von"},
    {verb:"sich interessieren für",case:"+ Akk",en:"to be interested in",ex:"Ich interessiere mich für Kunst.",color:"#00695C",prep:"für"},
    {verb:"träumen von",case:"+ Dat",en:"to dream of",ex:"Ich träume von einer Reise.",color:"#00838F",prep:"von"},
  ];
  const [sortBy,setSortBy]=useState("verb");
  const sorted=sortBy==="prep"
    ?[...combos].sort((a,b)=>a.prep.localeCompare(b.prep)||a.verb.localeCompare(b.verb))
    :combos;
  return(<div>
    <DarkBox title="Memorize as units"><div style={{fontSize:13}}>The preposition determines the case. You can't guess either one. Learn verb + preposition + case as a single item.</div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:10,justifyContent:"flex-end"}}>
      <button onClick={()=>setSortBy("verb")} style={{padding:"5px 12px",borderRadius:8,border:sortBy==="verb"?"2px solid #555":"1.5px solid #ddd",background:sortBy==="verb"?"#333":"#fff",color:sortBy==="verb"?"#fff":"#555",cursor:"pointer",fontWeight:600,fontSize:11}}>By verb</button>
      <button onClick={()=>setSortBy("prep")} style={{padding:"5px 12px",borderRadius:8,border:sortBy==="prep"?"2px solid #555":"1.5px solid #ddd",background:sortBy==="prep"?"#333":"#fff",color:sortBy==="prep"?"#fff":"#555",cursor:"pointer",fontWeight:600,fontSize:11}}>By preposition</button>
    </div>
    {sorted.map((c)=>(<div key={c.verb} style={{background:"#fff",borderRadius:10,padding:"8px 14px",border:"1px solid #e0dcd5",marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
      <span style={{background:c.color,color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:12,fontWeight:700,flexShrink:0}}>{c.verb} {c.case}</span>
      <span style={{fontSize:12,color:"#555",flex:1}}>{c.ex}</span>
      <span style={{fontSize:10,color:"#aaa",flexShrink:0}}>{c.en}</span>
    </div>))}
  </div>);
}
