import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';

export function Guide32(){
  const falseF=[
    {de:"bekommen",en:"become",real:"to get/receive",correct:"become = werden",d:5},
    {de:"Gift",en:"gift",real:"poison (!)",correct:"gift = Geschenk",d:5},
    {de:"aktuell",en:"actual",real:"current/up-to-date",correct:"actual = eigentlich/tatsächlich",d:5},
    {de:"Handy",en:"handy",real:"cell phone",correct:"handy = praktisch",d:4},
    {de:"Chef",en:"chef",real:"boss",correct:"chef = Koch",d:4},
    {de:"sensibel",en:"sensible",real:"sensitive",correct:"sensible = vernünftig",d:4},
    {de:"brav",en:"brave",real:"well-behaved",correct:"brave = mutig/tapfer",d:3},
    {de:"Rat",en:"rat",real:"advice/council",correct:"rat = Ratte",d:3},
    {de:"komisch",en:"comical",real:"strange/weird",correct:"comical = lustig",d:3},
    {de:"Fabrik",en:"fabric",real:"factory",correct:"fabric = Stoff",d:3},
  ];
  const dColors={5:"#C62828",4:"#E65100",3:"#F9A825"};
  return(<div>
    <Card color="#C62828" title="Falsche Freunde — False Friends">
      {falseF.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"7px 14px",borderBottom:i<falseF.length-1?"1px solid #f0eeeb":"none",gap:8}}>
        <div style={{width:5,height:5,borderRadius:"50%",background:dColors[f.d],flexShrink:0}}/>
        <div style={{flex:1}}>
          <span style={{fontWeight:700,color:dColors[f.d]}}>{f.de}</span> <span style={{color:"#ccc"}}>≠</span> <span style={{color:"#999",textDecoration:"line-through"}}>{f.en}</span><br/>
          <span style={{fontSize:11,color:"#555"}}>= {f.real}</span> · <span style={{fontSize:11,color:"#888"}}>{f.correct}</span>
        </div>
      </div>))}
    </Card>
    <Insight text="'Gift' meaning 'poison' is the most dangerous false friend in any language. 'Ich habe ein Gift für dich' does NOT mean what you think." />
  </div>);
}
