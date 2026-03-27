import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide12(){
  const compounds=[
    {parts:["Hand","Schuh"],word:"Handschuh",meaning:"glove",lit:"hand-shoe",gender:"der (from Schuh)"},
    {parts:["Kühl","Schrank"],word:"Kühlschrank",meaning:"refrigerator",lit:"cool-cabinet",gender:"der (from Schrank)"},
    {parts:["Staub","Sauger"],word:"Staubsauger",meaning:"vacuum cleaner",lit:"dust-sucker",gender:"der (from Sauger)"},
    {parts:["Kranken","Haus"],word:"Krankenhaus",meaning:"hospital",lit:"sick-house",gender:"das (from Haus)"},
    {parts:["Haus","Tür"],word:"Haustür",meaning:"front door",lit:"house-door",gender:"die (from Tür)"},
    {parts:["Schlaf","Zimmer"],word:"Schlafzimmer",meaning:"bedroom",lit:"sleep-room",gender:"das (from Zimmer)"},
  ];
  return(<div>
    <DarkBox title="Why German words are so long"><div style={{fontSize:14}}>
      German builds new words by <strong style={{color:"#FFE77A"}}>chaining nouns together</strong>. Read right-to-left: the last noun is the head word (determines gender and meaning category).
    </div></DarkBox>
    <Card color="#2E7D32" title="Compound examples" subtitle="Last word = gender">
      {compounds.map((c,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<compounds.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:4}}>
          {c.parts.map((p,j)=>(<><span key={j} style={{padding:"3px 8px",borderRadius:6,background:j===c.parts.length-1?"#2E7D32":"#f5f3ef",color:j===c.parts.length-1?"#fff":"#888",fontSize:13,fontWeight:700}}>{p}</span>{j<c.parts.length-1&&<span style={{color:"#ccc"}}>+</span>}</>))}
          <span style={{color:"#ccc",margin:"0 4px"}}>=</span>
          <span style={{fontSize:15,fontWeight:800,color:"#2E7D32"}}>{c.word}</span>
        </div>
        <div style={{fontSize:12,color:"#888"}}>{c.meaning} (lit: {c.lit}) — <strong>{c.gender}</strong></div>
      </div>))}
    </Card>
  </div>);
}
