import { DarkBox } from '../../../components/DarkBox';

export function Guide7(){
  const particles=[
    {p:"\u02BBo",use:"Subject marker (before proper nouns/pronouns)",ex:"\u02BBO Keoni ke kumu. = John is the teacher.",color:"#0D47A1"},
    {p:"ka / ke",use:"The (singular definite article)",ex:"ka hale = the house \u00B7 ke aloha = the love",color:"#2E7D32"},
    {p:"n\u0101",use:"The (plural definite article)",ex:"n\u0101 keiki = the children",color:"#2E7D32"},
    {p:"he",use:"A/an (indefinite article)",ex:"He kumu au. = I am a teacher.",color:"#E65100"},
    {p:"i / i\u0101",use:"Object marker (i for things, i\u0101 for people)",ex:"N\u0101n\u0101 au i ka moana. = I look at the ocean.\nN\u0101n\u0101 au i\u0101 Keoni. = I look at John.",color:"#6A1B9A"},
    {p:"ma",use:"At/in/on (location)",ex:"ma ka hale = at the house",color:"#00838F"},
    {p:"no / na",use:"For/belonging to (o/a class)",ex:"no Keoni = for/of John (o-class)",color:"#C62828"},
    {p:"a me",use:"And (connects nouns)",ex:"ka makuahine a me ka makuak\u0101ne = the mother and the father",color:"#880E4F"},
  ];
  return(<div>
    <DarkBox title="Small Words, Big Jobs"><div style={{fontSize:13}}>Hawaiian particles/markers do the work that English handles with word order and prepositions.</div></DarkBox>
    {particles.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:p.color,color:"#fff",padding:"2px 10px",borderRadius:6,fontSize:14,fontWeight:800,fontStyle:"italic"}}>{p.p}</span>
        <span style={{fontSize:12,color:"#888"}}>{p.use}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{p.ex}</div>
    </div>))}
  </div>);
}
