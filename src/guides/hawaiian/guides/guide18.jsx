import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide18(){
  const tams=[
    {marker:"ua",use:"Completed action (perfective)",ex:"Ua hele au. = I went/have gone.",color:"#C62828",time:"past/completed"},
    {marker:"ke ... nei",use:"Currently happening (progressive)",ex:"Ke heluhelu nei au. = I am reading.",color:"#E65100",time:"present"},
    {marker:"e ... ana",use:"Ongoing or future (imperfective)",ex:"E hele ana au. = I will go / I'm going to go.",color:"#0D47A1",time:"future/ongoing"},
    {marker:"i",use:"Past (simple past, in subordinate clauses)",ex:"I hele au i ke kula. = I went to school.",color:"#6A1B9A",time:"past"},
    {marker:"e",use:"Imperative / subjunctive",ex:"E hele! = Go! \u00B7 E ola! = Live!",color:"#2E7D32",time:"command/wish"},
    {marker:"(none)",use:"Habitual / general truth",ex:"Hele au i ke kula. = I go to school (generally).",color:"#00695C",time:"habitual"},
  ];
  return(<div>
    <DarkBox title="Verbs Don't Change \u2014 Markers Do"><div style={{fontSize:14,lineHeight:1.6}}>
      Hawaiian verbs have <strong style={{color:"#FFE77A"}}>ONE form</strong>. Tense, aspect, and mood are shown by <strong style={{color:"#FFE77A"}}>particles before (and sometimes after) the verb</strong>.
    </div></DarkBox>
    {tams.map((t,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:t.color,color:"#fff",padding:"3px 10px",borderRadius:6,fontSize:14,fontWeight:800,fontStyle:"italic",fontFamily:"'Georgia',serif"}}>{t.marker}</span>
        <span style={{fontSize:12,color:"#888"}}>{t.use}</span>
        <span style={{marginLeft:"auto",fontSize:10,color:"#aaa",background:"#f5f3ef",padding:"2px 6px",borderRadius:4}}>{t.time}</span>
      </div>
      <div style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{t.ex}</div>
    </div>))}
    <Insight text="The verb 'hele' (to go) is always just 'hele'. Ua hele = went. Ke hele nei = is going. E hele ana = will go. The markers do ALL the tense work."/>
  </div>);
}
