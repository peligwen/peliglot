import { DarkBox } from '../../../components/DarkBox';

export function Guide31(){
  const particles=[
    {p:"doch",uses:["Contradicting: 'Du sprichst kein Deutsch.' → 'Doch!' (Yes I DO!)","Encouraging: Komm doch! (Come on!)","Emphasizing: Das ist doch schön! (That IS nice!)"],color:"#880E4F"},
    {p:"mal",uses:["Softening/casual: Komm mal her. (Come here — no big deal)","Hey, look: Schau mal! (Check this out!)","Passing something: Gib mir mal das Buch."],color:"#1565C0"},
    {p:"ja",uses:["Shared knowledge: Du weißt ja... (You know...)","Surprise: Das ist ja toll! (That's great — wow!)"],color:"#2E7D32"},
    {p:"halt / eben",uses:["Acceptance: Das ist halt so. (That's just how it is.)","Resignation: Er ist eben so. (He's just like that.)"],color:"#E65100"},
    {p:"eigentlich",uses:["Actually: Eigentlich wollte ich nicht kommen. (Actually, I didn't want to come.)"],color:"#6A1B9A"},
  ];
  return(<div>
    <DarkBox title="Untranslatable flavor words"><div style={{fontSize:14}}>Modal particles add <strong style={{color:"#FFE77A"}}>tone, attitude, and nuance</strong>. They're what makes you sound natural. Start with 'mal' and 'doch'.</div></DarkBox>
    {particles.map((pt,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:`2px solid ${pt.color}20`,marginBottom:8}}>
      <div style={{fontSize:18,fontWeight:800,color:pt.color,marginBottom:4}}>{pt.p}</div>
      {pt.uses.map((u,j)=>(<div key={j} style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:2}}>• {u}</div>))}
    </div>))}
  </div>);
}
