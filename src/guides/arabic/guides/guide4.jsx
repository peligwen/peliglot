import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';

const nonConnectors=["ا","د","ذ","ر","ز","و"];

const wordExamples=[
  {word:"كَتَبَ",trans:"kataba",meaning:"he wrote",letters:["كـ","ـتـ","ـبَ"],pos:["initial","medial","final"]},
  {word:"دَرَسَ",trans:"darasa",meaning:"he studied",letters:["د","ر","سَ"],pos:["isolated*","isolated*","isolated"],note:"د and ر don't connect forward"},
  {word:"كِتاب",trans:"kitāb",meaning:"book",letters:["كـ","ـتـ","ـا","ب"],pos:["initial","medial","(alif)","final"]},
  {word:"مَدرَسة",trans:"madrasa",meaning:"school",letters:["مـ","ـد","ر","سـ","ـة"],pos:["initial","(breaks)","(breaks)","initial","final tā' marbūṭa"]},
];

export function Guide4(){
  const [selWord,setSelWord]=useState(0);
  const w=wordExamples[selWord];
  return(<div>
    <DarkBox title="How Letters Join"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic is written right-to-left. Letters connect in a cursive flow, but <strong style={{color:"#FFE77A"}}>6 letters never connect to the left</strong> — they force a break.
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #eee",marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Non-Connecting Letters (force a break after them)</div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        {nonConnectors.map(l=>(<div key={l} style={{width:40,height:40,borderRadius:8,background:"#FFF8E7",border:"2px solid #F0E4C4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#8B6914",fontWeight:700}}>{l}</div>))}
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#888",marginTop:6}}>Remember: <strong>ا د ذ ر ز و</strong> — they connect from the right but NOT to the left</div>
    </div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Word Breakdown</div>
    <div style={{display:"flex",gap:5,marginBottom:12,justifyContent:"center",flexWrap:"wrap"}}>
      {wordExamples.map((we,i)=>(<button key={i} onClick={()=>setSelWord(i)} style={{padding:"6px 14px",borderRadius:8,border:selWord===i?"2.5px solid #4527A0":"1.5px solid #ddd",background:selWord===i?"#4527A0":"#fff",color:selWord===i?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:13}}>{we.trans}</button>))}
    </div>
    <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #eee",marginBottom:16}}>
      <div style={{background:"#4527A0",padding:"14px 18px",textAlign:"center"}}>
        <div style={{fontSize:36,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#FFE77A",direction:"rtl"}}>{w.word}</div>
        <div style={{color:"rgba(255,255,255,0.7)",fontSize:13,marginTop:4}}>{w.trans} — {w.meaning}</div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{display:"flex",gap:4,justifyContent:"center",direction:"rtl",flexWrap:"wrap"}}>
          {w.letters.map((l,i)=>(<div key={i} style={{textAlign:"center",padding:"8px 10px",background:"#EDE7F6",borderRadius:8,border:"1px solid #D1C4E9",minWidth:48}}>
            <div style={{fontSize:24,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#4527A0"}}>{l}</div>
            <div style={{fontSize:9,color:"#888",marginTop:2}}>{w.pos[i]}</div>
          </div>))}
        </div>
        {w.note&&<div style={{marginTop:8,fontSize:12,color:"#8B6914",textAlign:"center"}}>💡 {w.note}</div>}
      </div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 5: NUMBERS & PUNCTUATION
// ═══════════════════════════════════════════════════════════════
