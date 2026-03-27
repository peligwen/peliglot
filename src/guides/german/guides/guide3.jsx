import { useState } from 'react';
import { Insight } from '../../../components/Insight';

const consonantSounds=[
  {s:"ch (ich-Laut)",desc:"After e, i, ä, ö, ü, consonants: soft hiss from the palate. Like the 'h' in 'huge'.",ex:"ich, recht, möchte, Milch, durch",color:"#C62828"},
  {s:"ch (ach-Laut)",desc:"After a, o, u, au: rougher, from the back of the throat. Like Scottish 'loch'.",ex:"Bach, noch, Buch, auch, Nacht",color:"#1565C0"},
  {s:"R (uvular)",desc:"Produced in the throat/uvula. A soft gargle — like French R. NOT the English R.",ex:"rot, Frau, Brücke, groß",color:"#2E7D32"},
  {s:"R → /ɐ/ at word end",desc:"At the end of words/syllables, R becomes a soft 'uh' sound. Vater = 'FAH-tuh'.",ex:"Vater, Wasser, Lehrer, hier",color:"#2E7D32"},
  {s:"Final devoicing",desc:"Voiced consonants become voiceless at word/syllable end. Tag = /tak/, Hund = /hunt/.",ex:"Tag /tak/, Hund /hunt/, Rad /rat/, Grab /grap/",color:"#E65100"},
  {s:"W = /v/",desc:"German W sounds like English V. Wasser = 'vasser', Wein = 'vine'.",ex:"Wasser, Wein, warum, wissen",color:"#6A1B9A"},
  {s:"V = /f/ (usually)",desc:"German V usually sounds like English F. Vater = 'fahter'.",ex:"Vater, Vogel, voll, vier",color:"#6A1B9A"},
  {s:"Z = /ts/",desc:"Always /ts/, even at the start. Zeit = 'tsait', zehn = 'tsehn'.",ex:"Zeit, zehn, Zimmer, Zug",color:"#880E4F"},
  {s:"S = /z/ before vowels",desc:"S buzzes before vowels (the opposite of English). Sonne = 'zonneh'.",ex:"Sonne, sein, sagen, Salz",color:"#880E4F"},
  {s:"sp/st = /ʃp/, /ʃt/",desc:"At the start of a word/root, sp and st get the 'sh' treatment.",ex:"sprechen = 'shprechen', Straße = 'shtraße', Spaß, stehen",color:"#00695C"},
];

export function Guide3(){
  const [sel,setSel]=useState(null);
  return(<div>
    {consonantSounds.map((c,i)=>{const isSel=sel===i;return(
      <div key={i} onClick={()=>setSel(isSel?null:i)} style={{background:"#fff",borderRadius:12,overflow:"hidden",border:isSel?`2.5px solid ${c.color}`:"1px solid #e0dcd5",marginBottom:6,cursor:"pointer",transition:"all 0.15s"}}>
        <div style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
          <span style={{background:c.color,color:"#fff",padding:"3px 12px",borderRadius:6,fontSize:13,fontWeight:800,fontFamily:"monospace",flexShrink:0}}>{c.s}</span>
          <span style={{fontSize:12,color:"#888",flex:1}}>{c.ex}</span>
        </div>
        {isSel&&<div style={{padding:"8px 14px 12px",borderTop:"1px solid #f0eeeb",background:"#FAFAF5",fontSize:12,color:"#555",lineHeight:1.6}}>{c.desc}</div>}
      </div>
    );})}
    <Insight text="The W/V swap trips up every English speaker. Repeat this: German W = English V. German V = English F. 'Volkswagen' = 'FOLKSvagen'." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: STRESS
// ═══════════════════════════════════════════════════════════════
