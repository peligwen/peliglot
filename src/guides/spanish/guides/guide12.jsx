import { Card } from '../../../components/Card';

const pluralRules=[
  {l:"Vowel → +S",ex:[{s:"casa",p:"casas"},{s:"libro",p:"libros"},{s:"estudiante",p:"estudiantes"}],color:"#2E7D32"},
  {l:"Consonant → +ES",ex:[{s:"animal",p:"animales"},{s:"ciudad",p:"ciudades"},{s:"reloj",p:"relojes"}],color:"#C62828"},
  {l:"-Z → -CES",ex:[{s:"lápiz",p:"lápices"},{s:"vez",p:"veces"},{s:"luz",p:"luces"}],color:"#E65100"},
  {l:"Unchanged (-es/-is)",ex:[{s:"el lunes",p:"los lunes"},{s:"la crisis",p:"las crisis"}],color:"#455A64"},
];
export function Guide12(){return(<div>{pluralRules.map((r,i)=>(<Card key={i} color={r.color} title={r.l}>{r.ex.map((e,j)=>(<div key={j} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:j<r.ex.length-1?"1px solid #f0eeeb":"none"}}><span style={{flex:1,fontSize:15,color:"#999"}}>{e.s}</span><span style={{fontSize:18,color:"#ccc",margin:"0 12px"}}>→</span><span style={{flex:1,fontSize:15,fontWeight:700,color:r.color}}>{e.p}</span></div>))}</Card>))}</div>);}
