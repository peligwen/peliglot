import { Insight } from '../../../components/Insight';

export function Guide25(){
  const imps=[
    {form:"du",pattern:"Stem (± umlaut loss)",ex:"Komm! · Mach das! · Lies das! · Gib mir!",note:"No 'du'. Stem-vowel e→i/ie carries over: gib!, lies!",color:"#C62828"},
    {form:"ihr",pattern:"Same as present ihr",ex:"Kommt! · Macht das! · Esst!",note:"Same form, just drop 'ihr'.",color:"#1565C0"},
    {form:"Sie",pattern:"Infinitive + Sie",ex:"Kommen Sie! · Machen Sie das! · Lesen Sie!",note:"Always include 'Sie'. This is the polite form.",color:"#2E7D32"},
  ];
  return(<div>
    {imps.map((im,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${im.color}`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:im.color,color:"#fff",padding:"2px 10px",borderRadius:6,fontSize:14,fontWeight:800}}>{im.form}</span>
        <span style={{fontSize:12,color:"#888"}}>{im.pattern}</span>
      </div>
      <div style={{fontSize:14,fontWeight:700,color:im.color,fontStyle:"italic",marginBottom:2}}>{im.ex}</div>
      <div style={{fontSize:11,color:"#888"}}>{im.note}</div>
    </div>))}
    <Insight text="German imperatives sound blunt to English ears. 'Gib mir das Buch' is perfectly normal. Soften with: bitte (please) and mal (particle): 'Gib mir mal bitte das Buch.'" />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 26-28: WORD ORDER
// ═══════════════════════════════════════════════════════════════
