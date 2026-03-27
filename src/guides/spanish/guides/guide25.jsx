import { DarkBox } from '../../../components/DarkBox';

const falseCogs=[
  {s:"embarazada",l:"embarrassed",a:"pregnant",d:5},{s:"éxito",l:"exit",a:"success",d:4},
  {s:"actualmente",l:"actually",a:"currently",d:5},{s:"asistir",l:"to assist",a:"to attend",d:4},
  {s:"librería",l:"library",a:"bookstore",d:4},{s:"constipado",l:"constipated",a:"having a cold",d:5},
  {s:"molestar",l:"to molest",a:"to bother",d:5},{s:"sensible",l:"sensible",a:"sensitive",d:4},
  {s:"realizar",l:"to realize",a:"to carry out",d:4},{s:"soportar",l:"to support",a:"to tolerate",d:4},
  {s:"ropa",l:"rope",a:"clothing",d:3},{s:"carpeta",l:"carpet",a:"folder",d:3},
  {s:"recordar",l:"to record",a:"to remember",d:3},{s:"introducir",l:"to introduce",a:"to insert",d:4},
];
const dColors={5:"#C62828",4:"#E65100",3:"#F9A825"};

export function Guide25(){
  return(<div>
    <DarkBox title="False Cognates"><div style={{fontSize:13}}>Words that look like English but mean something <strong style={{color:"#EF9A9A"}}>completely different</strong>.</div></DarkBox>
    {falseCogs.sort((a,b)=>b.d-a.d).map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:5,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:dColors[f.d],flexShrink:0}}/>
        <div><span style={{fontSize:15,fontWeight:800,color:dColors[f.d]}}>{f.s}</span><span style={{fontSize:13,color:"#ccc",margin:"0 6px"}}>≠</span><span style={{fontSize:13,color:"#999",textDecoration:"line-through"}}>{f.l}</span></div>
      </div>
      <span style={{fontSize:12,fontWeight:700,color:"#2E7D32",background:"#E8F5E9",padding:"2px 8px",borderRadius:5}}>{f.a}</span>
    </div>))}
  </div>);
}
