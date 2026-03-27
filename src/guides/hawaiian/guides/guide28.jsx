import { Card } from '../../../components/Card';

export function Guide28(){
  const phrases=[
    {hw:"Aloha",en:"Hello/goodbye/love",note:"The most important Hawaiian word \u2014 far deeper than just a greeting"},
    {hw:"Mahalo",en:"Thank you",note:"Also means gratitude, admiration, praise"},
    {hw:"\u02BBAe",en:"Yes",note:"Simple and direct"},
    {hw:"\u02BBA\u02BBole",en:"No",note:"Also used in negation patterns"},
    {hw:"E komo mai",en:"Welcome / come in",note:"Used to invite someone in"},
    {hw:"A hui hou",en:"Until we meet again",note:"Common farewell \u2014 not 'goodbye' but 'see you later'"},
    {hw:"Pehea \u02BBoe?",en:"How are you?",note:"Literally 'How (are) you?'"},
    {hw:"Maika\u02BBi au",en:"I'm good/well",note:"Response to Pehea \u02BBoe"},
    {hw:"\u02BBO wai kou inoa?",en:"What is your name?",note:"Lit. 'Who (is) your name?' \u2014 O-class for 'name'"},
    {hw:"\u02BBO [name] ko\u02BBu inoa",en:"My name is [name]",note:"O-class possessive for name"},
    {hw:"\u02BBA\u02BBohe mea",en:"You're welcome / it's nothing",note:"Response to mahalo"},
    {hw:"Kala mai ia\u02BBu",en:"Excuse me / forgive me",note:"Lit. 'forgive me'"},
    {hw:"E \u02BBolu\u02BBolu \u02BBoe",en:"Please",note:"Lit. 'be comfortable/kind (you)'"},
    {hw:"Hau\u02BBoli l\u0101 h\u0101nau",en:"Happy birthday",note:"hau\u02BBoli = happy, l\u0101 = day, h\u0101nau = birth"},
  ];
  return(<div>
    <Card color="#4527A0" title="Essential Phrases">
      {phrases.map((p,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i<phrases.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
          <span style={{fontSize:16,fontWeight:700,color:"#4527A0",fontStyle:"italic"}}>{p.hw}</span>
          <span style={{fontSize:13,color:"#555"}}>{p.en}</span>
        </div>
        <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{p.note}</div>
      </div>))}
    </Card>
  </div>);
}
