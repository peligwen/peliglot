import { DarkBox } from '../../../components/DarkBox';

export function Guide30(){
  const combos=[
    {verb:"warten auf",case:"+ Akk",en:"to wait for",ex:"Ich warte auf den Bus.",color:"#C62828"},
    {verb:"sich freuen auf",case:"+ Akk",en:"to look forward to",ex:"Ich freue mich auf den Urlaub.",color:"#1565C0"},
    {verb:"sich freuen über",case:"+ Akk",en:"to be happy about",ex:"Ich freue mich über das Geschenk.",color:"#2E7D32"},
    {verb:"Angst haben vor",case:"+ Dat",en:"to be afraid of",ex:"Ich habe Angst vor dem Hund.",color:"#E65100"},
    {verb:"denken an",case:"+ Akk",en:"to think about",ex:"Ich denke an dich.",color:"#6A1B9A"},
    {verb:"abhängen von",case:"+ Dat",en:"to depend on",ex:"Das hängt vom Wetter ab.",color:"#880E4F"},
    {verb:"sich interessieren für",case:"+ Akk",en:"to be interested in",ex:"Ich interessiere mich für Kunst.",color:"#00695C"},
    {verb:"träumen von",case:"+ Dat",en:"to dream of",ex:"Ich träume von einer Reise.",color:"#00838F"},
  ];
  return(<div>
    <DarkBox title="Memorize as units"><div style={{fontSize:13}}>The preposition determines the case. You can't guess either one. Learn verb + preposition + case as a single item.</div></DarkBox>
    {combos.map((c,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"8px 14px",border:"1px solid #e0dcd5",marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
      <span style={{background:c.color,color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:12,fontWeight:700,flexShrink:0}}>{c.verb} {c.case}</span>
      <span style={{fontSize:12,color:"#555",flex:1}}>{c.ex}</span>
      <span style={{fontSize:10,color:"#aaa",flexShrink:0}}>{c.en}</span>
    </div>))}
  </div>);
}
