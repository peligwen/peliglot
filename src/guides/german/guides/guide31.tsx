import { DarkBox } from '../../../components/DarkBox';

export function Guide31(){
  const particles=[
    {p:"doch",uses:["Contradicting: 'Du sprichst kein Deutsch.' → 'Doch!' (Yes I DO!)","Encouraging: Komm doch! (Come on!)","Emphasizing: Das ist doch schön! (That IS nice!)"],color:"#880E4F"},
    {p:"mal",uses:["Softening/casual: Komm mal her. (Come here — no big deal)","Hey, look: Schau mal! (Check this out!)","Passing something: Gib mir mal das Buch."],color:"#1565C0"},
    {p:"ja",uses:["Shared knowledge: Du weißt ja... (You know...)","Surprise: Das ist ja toll! (That's great — wow!)"],color:"#2E7D32"},
    {p:"halt / eben",uses:["Acceptance: Das ist halt so. (That's just how it is.)","Resignation: Er ist eben so. (He's just like that.)"],color:"#E65100"},
    {p:"eigentlich",uses:["Actually/to be honest: Eigentlich wollte ich nicht kommen. (Actually, I didn't want to come.)","Correction or reconsideration: Was ist das eigentlich? (What exactly is that?)"],color:"#6A1B9A"},
    {p:"denn",uses:["Softening questions — marks real curiosity, not demand: Was machst du denn? (What are you doing, then?)","Surprise in questions: Warum denn? (Why on earth?)","Nearly obligatory in informal questions: Wie heißt du denn?"],color:"#00695C"},
    {p:"wohl",uses:["Probability/hedging: Er ist wohl krank. (He's probably sick.)","Conceding uncertainty: Das wird wohl stimmen. (That's probably right.)","Rhetorical: Du willst wohl nicht kommen? (You don't want to come, I suppose?)"],color:"#5D4037"},
    {p:"schon",uses:["Reassurance: Das schaffst du schon! (You'll manage, don't worry.)","Conceding but: Schon, aber... (Fair enough, but...)","Yes, eventually: Es wird schon klappen. (It'll work out.)"],color:"#AD1457"},
    {p:"bloß / nur",uses:["Warning/urgency — bloß is more emphatic: Bloß nicht fallen! (Whatever you do, don't fall!)","Pleading: Hör bloß auf! (Just stop it!)","nur is milder: Tu das nur nicht. (Just don't do that.)"],color:"#BF360C"},
  ];
  return(<div>
    <DarkBox title="Untranslatable flavor words"><div style={{fontSize:14}}>Modal particles add <strong style={{color:"#FFE77A"}}>tone, attitude, and nuance</strong>. They're what makes you sound natural. Start with <em>mal</em> and <em>doch</em> — they appear constantly in everyday speech.</div></DarkBox>
    {particles.map((pt,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:`2px solid ${pt.color}20`,marginBottom:8}}>
      <div style={{fontSize:18,fontWeight:800,color:pt.color,marginBottom:4}}>{pt.p}</div>
      {pt.uses.map((u,j)=>(<div key={j} style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:2}}>• {u}</div>))}
    </div>))}
  </div>);
}
