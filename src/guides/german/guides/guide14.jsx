import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide14(){
  const [mode,setMode]=useState("def");
  const tables={
    def:{title:"After der/die/das (weak)",data:[{c:"Nom",e:["e","e","e","en"]},{c:"Akk",e:["en","e","e","en"]},{c:"Dat",e:["en","en","en","en"]},{c:"Gen",e:["en","en","en","en"]}]},
    indef:{title:"After ein/eine (mixed)",data:[{c:"Nom",e:["er","e","es","en"]},{c:"Akk",e:["en","e","es","en"]},{c:"Dat",e:["en","en","en","en"]},{c:"Gen",e:["en","en","en","en"]}]},
    none:{title:"No article (strong)",data:[{c:"Nom",e:["er","e","es","e"]},{c:"Akk",e:["en","e","es","e"]},{c:"Dat",e:["em","er","em","en"]},{c:"Gen",e:["en","er","en","er"]}]},
  };
  const t=tables[mode];
  return(<div>
    <DarkBox title="The key insight"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Something must show the gender.</strong> If the article shows it (der, die, das), the adjective relaxes to -e or -en. If the article doesn't show it (ein, or no article), the adjective must carry the gender signal.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {[{k:"def",l:"After der/die/das"},{k:"indef",l:"After ein/eine"},{k:"none",l:"No article"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{padding:"7px 14px",borderRadius:8,border:mode===m.k?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:mode===m.k?"#6A1B9A":"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{m.l}</button>))}
    </div>
    <Card color="#6A1B9A" title={t.title}>
      <div style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"6px 10px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div><div>Masc</div><div>Fem</div><div>Neut</div><div>Plur</div>
      </div>
      {t.data.map((r,i)=>{const isEn=r.e.every(e=>e==="en");return(
        <div key={i} style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"6px 10px",borderBottom:i<3?"1px solid #f0eeeb":"none",background:isEn?"#EDE7F610":"transparent"}}>
          <span style={{fontWeight:700,color:"#6A1B9A",fontSize:12}}>{r.c}</span>
          {r.e.map((e,j)=>(<span key={j} style={{textAlign:"center",fontWeight:700,fontSize:14,color:e==="en"?"#6A1B9A":"#C62828"}}>-{e}</span>))}
        </div>
      );})}
    </Card>
    <Insight text="After definite articles: it's almost always -en. The ONLY exceptions are the 5 nominative forms (all -e) and fem/neut accusative (-e, -e). That's the whole shortcut." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 15-17: PRONOUNS
// ═══════════════════════════════════════════════════════════════
