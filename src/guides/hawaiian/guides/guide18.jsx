import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from './_helpers';

export function Guide18(){
  const tams=[
    {marker:"ua",use:"Completed action (perfective)",ex:"Ua hele au. = I went/have gone.",color:"#C62828",time:"past/completed"},
    {marker:"ke ... nei",use:"Currently happening (progressive)",ex:"Ke heluhelu nei au. = I am reading.",color:"#E65100",time:"present"},
    {marker:"e ... ana",use:"Ongoing or future (imperfective)",ex:"E hele ana au. = I will go / I am going to go.",color:"#0D47A1",time:"future/ongoing"},
    {marker:"i",use:"Past (especially in subordinate/relative clauses; also in some main-clause narrative use)",ex:"I hele au i ke kula. = I went to school.",color:"#6A1B9A",time:"past"},
    {marker:"e",use:"Imperative / subjunctive",ex:"E hele! = Go! · E ola! = Live!",color:"#2E7D32",time:"command/wish"},
    {marker:"(none)",use:"Habitual / general truth",ex:"Hele au i ke kula. = I go to school (generally).",color:"#00695C",time:"habitual"},
  ];
  const heledrill=[
    {tam:"ua",form:"Ua hele au.",gloss:"I went.",color:"#C62828"},
    {tam:"ke … nei",form:"Ke hele nei au.",gloss:"I am going.",color:"#E65100"},
    {tam:"e … ana",form:"E hele ana au.",gloss:"I will go.",color:"#0D47A1"},
    {tam:"i",form:"I hele au i ke kula.",gloss:"I went to school.",color:"#6A1B9A"},
    {tam:"e",form:"E hele!",gloss:"Go!",color:"#2E7D32"},
    {tam:"(none)",form:"Hele au.",gloss:"I go (habitually).",color:"#00695C"},
  ];
  return(<div>
    <DarkBox title="Verbs Don't Change — Markers Do"><div style={{fontSize:14,lineHeight:1.6}}>
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
    <Card color="#C62828" title="hele (to go) — the verb never changes">
      <div style={{padding:"4px 12px 2px",display:"grid",gridTemplateColumns:"80px 1fr 1fr",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>TAM</div><div>Hawaiian</div><div>English</div>
      </div>
      {heledrill.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",padding:"7px 12px",borderBottom:i<heledrill.length-1?"1px solid #f5f3ef":"none",alignItems:"center"}}>
        <span style={{background:r.color,color:"#fff",padding:"2px 7px",borderRadius:5,fontSize:11,fontWeight:700,fontStyle:"italic",display:"inline-block"}}>{r.tam}</span>
        <span style={{fontSize:13,fontStyle:"italic"}}>
          {r.form.split("hele").map((part,pi,arr)=>(<span key={pi}>{part}{pi<arr.length-1&&<strong style={{color:r.color}}>hele</strong>}</span>))}
        </span>
        <span style={{fontSize:12,color:"#888"}}>{r.gloss}</span>
      </div>))}
    </Card>
    <Insight text="The verb 'hele' (to go) is always just 'hele'. Ua hele = went. Ke hele nei = is going. E hele ana = will go. The markers do ALL the tense work."/>
  </div>);
}
