import { VerbConjugation } from '../../../components/templates/VerbConjugation';
import { speakSpanish } from '../../../utils/speech';

export const pronouns6=["yo","tú","él/ella/Ud.","nosotros","vosotros","ellos/Uds."];
export const pronounsShort=["yo","tú","él","nos.","vos.","ellos"];

export function VerbTypeSelector({vt,setVt,cols={ar:"#D84315",er:"#00695C",ir:"#4527A0"}}){
  return(<div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
    {["ar","er","ir"].map(t=>(<button key={t} onClick={()=>setVt(t)} style={{padding:"8px 20px",borderRadius:10,border:vt===t?"2px solid #1a1a1a":"1.5px solid #ddd",background:vt===t?(cols[t]||"#1a1a1a"):"#fff",color:vt===t?"#fff":"#666",fontSize:15,fontWeight:700,cursor:"pointer"}}>-{t.toUpperCase()}</button>))}
  </div>);
}

export function ConjugationTable({stem,endings,verb,meaning,color,pronouns=pronouns6}){
  return <VerbConjugation pronouns={pronouns} stem={stem} endings={endings} verb={verb} meaning={meaning} color={color}/>;
}

export function MiniTable({title,color,stem,endings}){
  return <VerbConjugation pronouns={pronounsShort} stem={stem} endings={endings} title={title} color={color} compact/>;
}

export function TriggerChips({label,color,words}){
  return(<div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee"}}>
    <div style={{padding:"8px 12px",background:color,color:"#fff",fontSize:11,fontWeight:700}}>⚡ {label}</div>
    <div style={{padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:4}}>
      {words.map(w=>(<span key={w} style={{padding:"3px 8px",borderRadius:12,background:`${color}12`,color:color,fontSize:11,fontWeight:600,border:`1px solid ${color}25`}}>{w}</span>))}
    </div>
  </div>);
}

export function VowelBar(){
  const vs=[{l:"A",s:"ah",w:"father"},{l:"E",s:"eh",w:"bet"},{l:"I",s:"ee",w:"see"},{l:"O",s:"oh",w:"go"},{l:"U",s:"oo",w:"moon"}];
  return(<div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #e8e5e0"}}>
    <div style={{padding:"8px 14px",background:"#FFF8E7",borderBottom:"1px solid #F0E4C4",fontSize:13,fontWeight:700,color:"#8B6914"}}>5 Vowels — Your Anchor</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}>
      {vs.map((v,i)=>(<div key={v.l} onClick={()=>window.speechSynthesis&&speakSpanish(v.l.toLowerCase())} style={{padding:"12px 6px",textAlign:"center",borderRight:i<4?"1px solid #f0eeeb":"none",cursor:window.speechSynthesis?"pointer":"default",transition:"background 0.15s"}} onMouseEnter={e=>{if(window.speechSynthesis)e.currentTarget.style.background="#FFF8E7"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
        <div style={{fontSize:24,fontWeight:700,color:"#2C5F2D"}}>{v.l}</div>
        <div style={{fontSize:14,color:"#D4A843",fontWeight:700,fontFamily:"monospace"}}>{v.s}{window.speechSynthesis&&<span style={{marginLeft:4,fontSize:10,opacity:0.5}}>{"\uD83D\uDD08"}</span>}</div>
        <div style={{fontSize:10,color:"#999"}}>"{v.w}"</div>
      </div>))}
    </div>
    <div style={{padding:"8px 14px",background:"#FDFBF7",borderTop:"1px solid #f0eeeb",fontSize:11,color:"#888",textAlign:"center"}}>
      Spanish vowels are <strong style={{color:"#2C5F2D"}}>always</strong> short, pure, and consistent
    </div>
  </div>);
}
