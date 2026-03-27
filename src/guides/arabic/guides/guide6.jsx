import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { PalNote } from './_helpers';

const soundGroups=[
  {group:"Pharyngeal (deep throat)",color:"#880E4F",sounds:[
    {l:"ح",n:"ḥā'",desc:"Voiceless deep breath from throat — like fogging a mirror but deeper",approx:"Whispered 'h' from very deep"},
    {l:"ع",n:"'ayn",desc:"Voiced pharyngeal — the iconic Arabic sound. Squeeze the throat while voicing",approx:"No English equivalent. Like gagging gently while saying 'ah'"},
  ]},
  {group:"Uvular / Back",color:"#6A1B9A",sounds:[
    {l:"خ",n:"khā'",desc:"Voiceless uvular fricative — like German 'Bach' or Scottish 'loch'",approx:"German/Scottish 'ch'"},
    {l:"غ",n:"ghayn",desc:"Voiced uvular fricative — like a French 'r' or gargling",approx:"French/German gargled 'r'"},
    {l:"ق",n:"qāf",desc:"Voiceless uvular stop — like 'k' but articulated much further back",approx:"Very deep 'k' from the back of throat"},
  ]},
  {group:"Emphatic (darkened/velarized)",color:"#E65100",sounds:[
    {l:"ص",n:"ṣād",desc:"Emphatic 's' — same as /s/ but with tongue root pulled back, darkening surrounding vowels",approx:"'s' said with a full mouth"},
    {l:"ض",n:"ḍād",desc:"Emphatic 'd' — unique to Arabic (لغة الضاد). Tongue root back",approx:"'d' said with a full mouth"},
    {l:"ط",n:"ṭā'",desc:"Emphatic 't' — /t/ with tongue root retracted",approx:"'t' said with a full mouth"},
    {l:"ظ",n:"ẓā'",desc:"Emphatic 'dh' — /ð/ with tongue root retracted",approx:"'th' (as in 'the') said with a full mouth"},
  ]},
];

export function Guide6(){
  const [selSound,setSelSound]=useState(null);
  return(<div>
    <DarkBox title="Sounds English Doesn't Have"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic has <strong style={{color:"#FFE77A"}}>10 consonants</strong> with no direct English equivalent. They fall into 3 groups by where they're produced.
    </div></DarkBox>
    {soundGroups.map((g,gi)=>(<div key={gi} style={{marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:g.color,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{g.group}</div>
      {g.sounds.map((s,si)=>{const key=`${gi}-${si}`;const isSel=selSound===key;return(
        <div key={key} onClick={()=>setSelSound(isSel?null:key)} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:isSel?`2px solid ${g.color}`:"1px solid #eee",marginBottom:6,cursor:"pointer",transition:"all 0.15s"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:g.color,minWidth:36,textAlign:"center"}}>{s.l}</span>
            <div style={{flex:1}}><span style={{fontSize:14,fontWeight:700,color:"#1a1a1a"}}>{s.n}</span></div>
            <span style={{fontSize:12,color:"#ccc"}}>tap</span>
          </div>
          {isSel&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #f0eeeb"}}>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:6}}>{s.desc}</div>
            <div style={{background:`${g.color}10`,borderRadius:6,padding:"6px 10px",fontSize:12,color:g.color,fontWeight:600}}>Closest English approximation: {s.approx}</div>
          </div>}
        </div>
      );})}
    </div>))}
    <PalNote text="ق (qāf) → glottal stop /ʔ/ is the most distinctive Palestinian Arabic feature. قال (qāla, 'he said') becomes 'āl. This is shared with most urban Levantine dialects."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 7: HAMZA RULES
// ═══════════════════════════════════════════════════════════════
