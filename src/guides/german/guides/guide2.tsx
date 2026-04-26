import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

const vowelPairsDE=[
  {short:"Stadt /a/",shortM:"city",long:"Staat /aː/",longM:"state",color:"#C62828"},
  {short:"offen /ɔ/",shortM:"open",long:"Ofen /oː/",longM:"oven",color:"#1565C0"},
  {short:"Bett /ɛ/",shortM:"bed",long:"Beet /eː/",longM:"flowerbed",color:"#2E7D32"},
  {short:"Mitte /ɪ/",shortM:"middle",long:"Miete /iː/",longM:"rent",color:"#6A1B9A"},
  {short:"Mutter /ʊ/",shortM:"mother",long:"Mut /uː/",longM:"courage",color:"#E65100"},
];

export function Guide2(){
  return(<div>
    <DarkBox title="Vowel length changes meaning"><div style={{fontSize:14}}>
      German vowels are either <strong style={{color:"#FFE77A"}}>short (clipped)</strong> or <strong style={{color:"#FFE77A"}}>long (held)</strong>. Rule: vowel before a <strong>single</strong> consonant = long. Before <strong>double</strong> consonants = short.
    </div></DarkBox>
    <Card color="#C62828" title="Minimal pairs: short vs long">
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>Short vowel</div><div></div><div>Long vowel</div>
      </div>
      {vowelPairsDE.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <div><div style={{fontSize:14,fontWeight:700,color:p.color}}>{p.short}</div><div style={{fontSize:11,color:"#888"}}>{p.shortM}</div></div>
        <div style={{fontSize:14,color:"#ccc",margin:"0 10px"}}>vs</div>
        <div><div style={{fontSize:14,fontWeight:700,color:p.color}}>{p.long}</div><div style={{fontSize:11,color:"#888"}}>{p.longM}</div></div>
      </div>))}
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
      {[{l:"Ä",short:"/ɛ/ Äpfel",long:"/ɛː/ Mädchen",color:"#C62828"},{l:"Ö",short:"/œ/ können",long:"/øː/ schön",color:"#1565C0"},{l:"Ü",short:"/ʏ/ müssen",long:"/yː/ Tür",color:"#2E7D32"}].map(u=>(<div key={u.l} style={{background:"#fff",borderRadius:10,padding:"10px",border:`2px solid ${u.color}30`,textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:800,color:u.color}}>{u.l}</div>
        <div style={{fontSize:10,color:"#888",marginTop:4}}>Short: {u.short}</div>
        <div style={{fontSize:10,color:"#888"}}>Long: {u.long}</div>
      </div>))}
    </div>
    <Insight text="Ö and Ü have NO English equivalent. Ö = round your lips for 'o' but try to say 'e'. Ü = round your lips for 'oo' but try to say 'ee'. Practice in the mirror." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: CONSONANTS — TAP TO EXPLORE
// ═══════════════════════════════════════════════════════════════
