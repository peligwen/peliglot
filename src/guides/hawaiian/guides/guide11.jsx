import { DarkBox } from '../../../components/DarkBox';
import { Insight, CultureNote } from './_helpers';

export function Guide11(){
  const oClass=[
    {cat:"Relationships (older/born into)",ex:"parents, siblings, spouse, ancestors"},
    {cat:"Body & body parts",ex:"limbs, head, health"},
    {cat:"Clothing & adornment",ex:"clothes, lei, shoes"},
    {cat:"Transportation",ex:"canoe, car, horse (you ride it)"},
    {cat:"Shelter & buildings you inhabit",ex:"house, room, land you live on"},
    {cat:"Feelings & innate qualities",ex:"name, voice, shadow, spirit"},
  ];
  const aClass=[
    {cat:"Things you create or acquire",ex:"food, crafts, art you make"},
    {cat:"Things you control",ex:"children (younger), students, pets"},
    {cat:"Knowledge & skills",ex:"work, ideas, mana'o (thoughts)"},
    {cat:"Plants you cultivate",ex:"garden, crops"},
    {cat:"Food & drink",ex:"anything you eat or drink"},
    {cat:"Tools & instruments",ex:"pen, computer, surfboard"},
  ];
  return(<div>
    <DarkBox title="The Most Hawaiian Grammar Feature"><div style={{fontSize:13,lineHeight:1.6}}>
      Hawaiian divides ALL possessives into two classes based on your <strong style={{color:"#FFE77A"}}>relationship</strong> to the thing possessed \u2014 not the thing itself.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #0D47A1"}}>
        <div style={{background:"#0D47A1",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>O-class: things you DON'T control</div>
        <div style={{padding:"10px 14px"}}>{oClass.map((c,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:i<oClass.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
          <strong style={{color:"#0D47A1"}}>{c.cat}</strong><br/><span style={{color:"#888"}}>{c.ex}</span>
        </div>))}</div>
      </div>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #C62828"}}>
        <div style={{background:"#C62828",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>A-class: things you DO control</div>
        <div style={{padding:"10px 14px"}}>{aClass.map((c,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:i<aClass.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
          <strong style={{color:"#C62828"}}>{c.cat}</strong><br/><span style={{color:"#888"}}>{c.ex}</span>
        </div>))}</div>
      </div>
    </div>
    <Insight text="Think of O-class as 'received/inherent' \u2014 things that came to you or are part of you. A-class is 'acquired/created' \u2014 things you went out and got or made."/>
    <CultureNote text="The O/A distinction reflects Hawaiian values about humans' relationship to the world. Your parents are O-class \u2014 you didn't choose them; they're part of who you are. Your food is A-class \u2014 you actively sought it."/>
  </div>);
}
