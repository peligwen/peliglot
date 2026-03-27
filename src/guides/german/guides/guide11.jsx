import { Insight } from '../../../components/Insight';

export function Guide11(){
  const patterns=[
    {pat:"+ e (often + umlaut)",ex:"der Tisch → die Tische · der Stuhl → die Stühle",note:"Most masculine nouns",color:"#C62828"},
    {pat:"+ er (often + umlaut)",ex:"das Kind → die Kinder · das Buch → die Bücher",note:"Mostly neuter",color:"#1565C0"},
    {pat:"+ (e)n",ex:"die Frau → die Frauen · die Blume → die Blumen",note:"Most feminine. Also weak masculine.",color:"#2E7D32"},
    {pat:"+ s",ex:"das Auto → die Autos · das Hotel → die Hotels",note:"Foreign words. Words ending in vowels (except -e).",color:"#6A1B9A"},
    {pat:"no change (± umlaut)",ex:"der Lehrer → die Lehrer · der Vater → die Väter",note:"Masc/neut ending in -er, -el, -en. Diminutives.",color:"#E65100"},
  ];
  return(<div>
    {patterns.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:`2px solid ${p.color}20`,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:p.color,color:"#fff",padding:"2px 10px",borderRadius:6,fontSize:13,fontWeight:800}}>Pattern {i+1}</span>
        <span style={{fontSize:14,fontWeight:700,color:p.color}}>{p.pat}</span>
      </div>
      <div style={{fontSize:13,color:"#555",fontStyle:"italic",marginBottom:2}}>{p.ex}</div>
      <div style={{fontSize:11,color:"#888"}}>{p.note}</div>
    </div>))}
    <Insight text="There's no single rule. Learn the plural with the noun: der Tisch, -e / das Kind, -er / die Frau, -en. Dictionaries always list the plural form." />
  </div>);
}
