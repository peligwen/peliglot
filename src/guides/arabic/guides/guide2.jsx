import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PalNote } from './_helpers';

const diacritics=[
  {name:"Fatḥa",ar:"بَ",mark:"َ",sound:"/a/ — short 'a'",desc:"Small diagonal stroke above the letter",ex:"بَ = ba",color:"#C62828"},
  {name:"Kasra",ar:"بِ",mark:"ِ",sound:"/i/ — short 'i'",desc:"Small diagonal stroke below the letter",ex:"بِ = bi",color:"#1565C0"},
  {name:"Ḍamma",ar:"بُ",mark:"ُ",sound:"/u/ — short 'u'",desc:"Small wāw-like mark above the letter",ex:"بُ = bu",color:"#2E7D32"},
  {name:"Sukūn",ar:"بْ",mark:"ْ",sound:"No vowel (consonant only)",desc:"Small circle above — means the letter has no vowel after it",ex:"بْ = b (no vowel)",color:"#555"},
  {name:"Shadda",ar:"بَّ",mark:"ّ",sound:"Double/geminate consonant",desc:"Small w-shape above — the letter is pronounced twice",ex:"بَّ = bb (doubled)",color:"#6A1B9A"},
  {name:"Tanwīn -an",ar:"بً",mark:"ً",sound:"/-an/",desc:"Double fatḥa — adds 'n' sound. Marks indefiniteness",ex:"كِتابًا = kitāban",color:"#E65100"},
  {name:"Tanwīn -in",ar:"بٍ",mark:"ٍ",sound:"/-in/",desc:"Double kasra — adds 'n' sound",ex:"كِتابٍ = kitābin",color:"#E65100"},
  {name:"Tanwīn -un",ar:"بٌ",mark:"ٌ",sound:"/-un/",desc:"Double ḍamma — adds 'n' sound",ex:"كِتابٌ = kitābun",color:"#E65100"},
];

export function Guide2(){
  const [sel,setSel]=useState(null);
  return(<div>
    <DarkBox title="The Unwritten Layer"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic script mainly writes <strong style={{color:"#FFE77A"}}>consonants and long vowels</strong>. Short vowels are shown with small marks (ḥarakāt) that are usually <strong style={{color:"#EF9A9A"}}>omitted in everyday text</strong>.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:6}}>
      {diacritics.slice(0,4).map((d,i)=>(<button key={i} onClick={()=>setSel(sel===i?null:i)} style={{padding:"12px 4px",borderRadius:10,border:sel===i?`2.5px solid ${d.color}`:"1.5px solid #ddd",background:sel===i?d.color:"#fff",color:sel===i?"#fff":"#333",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",lineHeight:1.2}}>{d.ar}</div>
        <div style={{fontSize:9,marginTop:4,fontWeight:600,opacity:.8}}>{d.name}</div>
      </button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:16}}>
      {diacritics.slice(4).map((d,i)=>(<button key={i+4} onClick={()=>setSel(sel===i+4?null:i+4)} style={{padding:"12px 4px",borderRadius:10,border:sel===i+4?`2.5px solid ${d.color}`:"1.5px solid #ddd",background:sel===i+4?d.color:"#fff",color:sel===i+4?"#fff":"#333",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",lineHeight:1.2}}>{d.ar}</div>
        <div style={{fontSize:9,marginTop:4,fontWeight:600,opacity:.8}}>{d.name}</div>
      </button>))}
    </div>
    {sel!==null&&(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #eee",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
      <div style={{background:diacritics[sel].color,padding:"14px 18px",color:"#fff"}}>
        <div style={{fontSize:15,fontWeight:800}}>{diacritics[sel].name}</div>
        <div style={{fontSize:12,opacity:.8,marginTop:2}}>{diacritics[sel].sound}</div>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{fontSize:13,color:"#555",marginBottom:8}}>{diacritics[sel].desc}</div>
        <div style={{background:"#FAFAF5",borderRadius:8,padding:"10px",textAlign:"center",border:"1px solid #eee"}}>
          <span style={{fontSize:32,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:diacritics[sel].color}}>{diacritics[sel].ar}</span>
          <span style={{fontSize:14,color:"#888",marginLeft:12}}>{diacritics[sel].ex}</span>
        </div>
      </div>
    </div>)}
    <PalNote text="In spoken Palestinian Arabic, short vowels shift: fatḥa often sounds like 'e' or 'i' before certain consonants. Tanwīn is rarely used in speech."/>
    <Insight text="You'll see diacritics in the Quran, children's books, and language textbooks. Newspapers and novels almost never include them — you learn to read without them through context."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: SUN & MOON LETTERS
// ═══════════════════════════════════════════════════════════════
