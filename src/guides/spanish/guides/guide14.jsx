import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const types=[
  {id:"sub",label:"Subject",color:"#0D47A1",desc:"Who does the action",
   data:[{p:"yo",en:"I",ex:"Yo hablo español."},{p:"tú",en:"you (informal)",ex:"Tú eres mi amigo."},{p:"él / ella / Ud.",en:"he / she / you (formal)",ex:"Ella trabaja aquí."},{p:"nosotros/as",en:"we",ex:"Nosotros estudiamos juntos."},{p:"ellos / ellas / Uds.",en:"they / you all",ex:"Ellos viven en Madrid."}],
   tip:"Subject pronouns are often OMITTED because the verb ending tells you who: Hablo = I speak."},
  {id:"do",label:"D.O.",color:"#2E7D32",desc:"Replaces the thing being acted on",
   data:[{p:"me",en:"me",ex:"Ella me ve. — She sees me."},{p:"te",en:"you",ex:"Te quiero. — I love you."},{p:"lo / la",en:"him-it / her-it",ex:"Lo compré. — I bought it."},{p:"nos",en:"us",ex:"Nos invitaron. — They invited us."},{p:"los / las",en:"them",ex:"Las encontré. — I found them (fem)."}],
   tip:"Lo/la must match the GENDER of the noun replaced: el libro → Lo leí. La carta → La leí."},
  {id:"io",label:"I.O.",color:"#E65100",desc:"Replaces 'to whom' / 'for whom'",
   data:[{p:"me",en:"to me",ex:"Me dijo la verdad. — He told me the truth."},{p:"te",en:"to you",ex:"Te compré un regalo. — I bought you a gift."},{p:"le",en:"to him/her/you",ex:"Le escribí una carta. — I wrote him a letter."},{p:"nos",en:"to us",ex:"Nos explicó todo. — She explained everything to us."},{p:"les",en:"to them/you all",ex:"Les mandé un mensaje. — I sent them a message."}],
   tip:"Le/les don't show gender! Add 'a él/a ella' to clarify: Le di el libro a ella."},
  {id:"ref",label:"Reflexive",color:"#6A1B9A",desc:"The action reflects back on the subject",
   data:[{p:"me",en:"myself",ex:"Me despierto a las 7. — I wake (myself) up at 7."},{p:"te",en:"yourself",ex:"Te duchas rápido. — You shower quickly."},{p:"se",en:"himself/herself",ex:"Ella se viste. — She gets dressed."},{p:"nos",en:"ourselves",ex:"Nos sentamos. — We sit down."},{p:"se",en:"themselves",ex:"Se acuestan tarde. — They go to bed late."}],
   tip:"1st & 2nd person pronouns (me, te, nos) are identical for DO, IO, and reflexive. Only 3rd person splits."},
  {id:"prep",label:"After preposition",color:"#455A64",desc:"Used after a, de, para, con, etc.",
   data:[{p:"mí / conmigo",en:"me / with me",ex:"Es para mí. — It's for me."},{p:"ti / contigo",en:"you / with you",ex:"Voy contigo. — I'll go with you."},{p:"él / ella / Ud.",en:"him / her / you",ex:"Hablé de ella. — I talked about her."},{p:"nosotros/as",en:"us",ex:"Vienen con nosotros. — They're coming with us."},{p:"ellos / ellas / Uds.",en:"them / you all",ex:"Es para ellos. — It's for them."}],
   tip:"Special forms: conmigo (with me), contigo (with you), consigo (with himself). NOT *con mí."},
];

export function Guide14(){
  const [tab,setTab]=useState("sub");
  const t=types.find(x=>x.id===tab);
  return(<div>
    <DarkBox title="Pronoun System"><div style={{fontSize:13,lineHeight:1.7}}>
      Spanish has <strong>5 pronoun types</strong>. The form changes based on the pronoun's <em>role</em> in the sentence. Select a type below to see all forms with examples.
    </div></DarkBox>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:14}}>
      {types.map(ty=>(<button key={ty.id} onClick={()=>setTab(ty.id)} style={{padding:"6px 12px",borderRadius:8,border:tab===ty.id?"2px solid #1a1a1a":"1.5px solid #ddd",background:tab===ty.id?ty.color:"#fff",color:tab===ty.id?"#fff":"#666",fontSize:11,fontWeight:700,cursor:"pointer"}}>{ty.label}</button>))}
    </div>
    <div style={{fontSize:12,color:t.color,fontWeight:600,textAlign:"center",marginBottom:10}}>{t.desc}</div>
    {t.data.map((d,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid #eee"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
        <span style={{fontSize:15,fontWeight:800,color:t.color}}>{d.p}</span>
        <span style={{fontSize:12,color:"#999"}}>{d.en}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{d.ex}</div>
    </div>))}
    <div style={{background:t.color+"10",borderRadius:10,padding:"10px 14px",marginTop:8,border:`1.5px solid ${t.color}25`,fontSize:12,color:t.color,fontWeight:600}}>{t.tip}</div>
    <Insight text="🇲🇽 Vosotros is not used in Mexico or Latin America. Use ustedes for ALL plural 'you' — both formal and informal."/>
  </div>);
}
