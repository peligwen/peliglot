import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const genderRules=[
  {g:"Masculine (der)",color:"#1565C0",items:["Male people/animals: der Mann, der Hund","Days/months/seasons: der Montag, der Sommer","-er agent nouns: der Lehrer, der Fahrer","-ling ending: der Frühling, der Schmetterling","Car brands: der BMW, der Mercedes"]},
  {g:"Feminine (die)",color:"#C62828",items:["-ung (always!): die Wohnung, die Zeitung","-heit/-keit: die Freiheit, die Möglichkeit","-schaft: die Freundschaft, die Wirtschaft","-tion/-sion: die Nation, die Information","-ie: die Energie, die Demokratie"]},
  {g:"Neuter (das)",color:"#2E7D32",items:["-chen/-lein diminutives (always!): das Mädchen","-ment: das Dokument, das Instrument","Ge- collectives: das Gebäude, das Gebirge","Infinitives as nouns: das Essen, das Leben","Metals: das Gold, das Silber, das Eisen"]},
];

export function Guide10(){
  const [activeG,setActiveG]=useState(0);
  const g=genderRules[activeG];
  return(<div>
    <DarkBox title="The hard truth"><div style={{fontSize:14}}>There is no perfect system. You <strong style={{color:"#EF9A9A"}}>must memorize der/die/das with every noun</strong>. But these patterns cover ~70% of cases.</div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
      {genderRules.map((gr,i)=>(<button key={i} onClick={()=>setActiveG(i)} style={{padding:"10px 6px",borderRadius:10,border:activeG===i?`2.5px solid ${gr.color}`:"1.5px solid #ddd",background:activeG===i?gr.color:"#fff",color:activeG===i?"#fff":"#555",cursor:"pointer",textAlign:"center",fontWeight:700,fontSize:13}}>{gr.g.split(" (")[0]}</button>))}
    </div>
    <Card color={g.color} title={g.g}>
      {g.items.map((item,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<g.items.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555"}}>{item}</div>))}
    </Card>
    <Insight text="Always learn nouns as: der Tisch, die Lampe, das Buch — never just 'Tisch, Lampe, Buch'. The article IS part of the word." />
  </div>);
}
