import { useState } from 'react';
import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const caseData={
  nom:{name:"Nominativ",role:"Subject — who does it",der:"der",die:"die",das:"das",diePl:"die",ein:"ein",eine:"eine",einN:"ein",color:"#1565C0",noun:null},
  akk:{name:"Akkusativ",role:"Direct object — whom/what",der:"den",die:"die",das:"das",diePl:"die",ein:"einen",eine:"eine",einN:"ein",color:"#C62828",noun:null},
  dat:{name:"Dativ",role:"Indirect object — to/for whom",der:"dem",die:"der",das:"dem",diePl:"den",ein:"einem",eine:"einer",einN:"einem",color:"#E65100",noun:"plural noun adds -(e)n"},
  gen:{name:"Genitiv",role:"Possession — whose",der:"des",die:"der",das:"des",diePl:"der",ein:"eines",eine:"einer",einN:"eines",color:"#00695C",noun:"masc/neut noun adds -(e)s"},
};

const genderData={
  masc:{name:"Masc (der/ein)",color:"#1565C0",rows:[
    {case:"Nom",def:"der",indef:"ein"},
    {case:"Akk",def:"den",indef:"einen"},
    {case:"Dat",def:"dem",indef:"einem"},
    {case:"Gen",def:"des",indef:"eines"},
  ]},
  fem:{name:"Fem (die/eine)",color:"#880E4F",rows:[
    {case:"Nom",def:"die",indef:"eine"},
    {case:"Akk",def:"die",indef:"eine"},
    {case:"Dat",def:"der",indef:"einer"},
    {case:"Gen",def:"der",indef:"einer"},
  ]},
  neut:{name:"Neut (das/ein)",color:"#2E7D32",rows:[
    {case:"Nom",def:"das",indef:"ein"},
    {case:"Akk",def:"das",indef:"ein"},
    {case:"Dat",def:"dem",indef:"einem"},
    {case:"Gen",def:"des",indef:"eines"},
  ]},
  pl:{name:"Plural (die/—)",color:"#E65100",rows:[
    {case:"Nom",def:"die",indef:"—"},
    {case:"Akk",def:"die",indef:"—"},
    {case:"Dat",def:"den",indef:"—"},
    {case:"Gen",def:"der",indef:"—"},
  ]},
};

export function Guide5(){
  const [activeCase,setActiveCase]=useState("nom");
  const [viewMode,setViewMode]=useState("case"); // "case" | "gender"
  const [activeGender,setActiveGender]=useState("masc");
  const c=caseData[activeCase];
  const g=genderData[activeGender];
  return(<div>
    <DarkBox title="Why cases exist"><div style={{fontSize:14,lineHeight:1.6}}>
      Cases tell you <strong style={{color:"#FFE77A"}}>what role each noun plays</strong>. English uses word order. German uses <strong style={{color:"#FFE77A"}}>article changes</strong> — which means word order is much more flexible.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:12,justifyContent:"center"}}>
      <button onClick={()=>setViewMode("case")} style={{padding:"6px 16px",borderRadius:8,border:viewMode==="case"?"2.5px solid #555":"1.5px solid #ddd",background:viewMode==="case"?"#333":"#fff",color:viewMode==="case"?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:12}}>By case</button>
      <button onClick={()=>setViewMode("gender")} style={{padding:"6px 16px",borderRadius:8,border:viewMode==="gender"?"2.5px solid #555":"1.5px solid #ddd",background:viewMode==="gender"?"#333":"#fff",color:viewMode==="gender"?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:12}}>By gender</button>
    </div>
    {viewMode==="case"?(<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
        {Object.entries(caseData).map(([k,v])=>(<button key={k} onClick={()=>setActiveCase(k)} style={{padding:"10px 4px",borderRadius:10,border:activeCase===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:activeCase===k?v.color:"#fff",color:activeCase===k?"#fff":"#555",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:800}}>{v.name}</div>
          <div style={{fontSize:9,opacity:.7,marginTop:2}}>{v.role.split(" — ")[0]}</div>
        </button>))}
      </div>
      <Card color={c.color} title={c.name} subtitle={c.role}>
        <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
          <div></div><div>Masc</div><div>Fem</div><div>Neut</div><div>Plural</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px",borderBottom:"1px solid #f0eeeb"}}>
          <span style={{fontSize:11,color:"#888"}}>definite</span>
          <span style={{fontWeight:700,color:c.color}}>{c.der}</span>
          <span style={{fontWeight:700,color:c.color}}>{c.die}</span>
          <span style={{fontWeight:700,color:c.color}}>{c.das}</span>
          <span style={{fontWeight:700,color:c.color}}>{c.diePl}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px",borderBottom:c.noun?"1px solid #f0eeeb":"none"}}>
          <span style={{fontSize:11,color:"#888"}}>indefinite</span>
          <span style={{fontWeight:700,color:c.color}}>{c.ein}</span>
          <span style={{fontWeight:700,color:c.color}}>{c.eine}</span>
          <span style={{fontWeight:700,color:c.color}}>{c.einN}</span>
          <span style={{fontWeight:700,color:"#aaa"}}>—</span>
        </div>
        {c.noun&&(<div style={{padding:"6px 14px",background:"#f9f7f4",borderRadius:"0 0 10px 10px"}}>
          <span style={{fontSize:10,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:0.5}}>noun ending: </span>
          <span style={{fontSize:12,color:"#555"}}>{c.noun}</span>
          <span style={{fontSize:10,color:"#aaa",marginLeft:6}}>(on the noun, not the article)</span>
        </div>)}
      </Card>
    </div>):(<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
        {Object.entries(genderData).map(([k,v])=>(<button key={k} onClick={()=>setActiveGender(k)} style={{padding:"10px 4px",borderRadius:10,border:activeGender===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:activeGender===k?v.color:"#fff",color:activeGender===k?"#fff":"#555",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:12,fontWeight:800}}>{v.name}</div>
        </button>))}
      </div>
      <Card color={g.color} title={g.name} subtitle="All four cases at a glance">
        <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
          <div>Case</div><div>Definite</div><div>Indefinite</div>
        </div>
        {g.rows.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr",padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
          <span style={{fontSize:11,fontWeight:700,color:"#888"}}>{r.case}</span>
          <span style={{fontWeight:700,color:g.color,fontSize:16}}>{r.def}</span>
          <span style={{fontWeight:700,color:r.indef==="—"?"#aaa":g.color,fontSize:16}}>{r.indef}</span>
        </div>))}
      </Card>
    </div>)}
    <Insight text="English has case remnants too: I/me/my, he/him/his, who/whom/whose. German just applies this to EVERY noun through article changes." />
  </div>);
}
