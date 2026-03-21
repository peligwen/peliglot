import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════
const guidesMeta = [
  { id:1, title:"الأبجدية", subtitle:"The Arabic Alphabet", cat:"Writing", color:"#1B5E20", icon:"أ" },
  { id:2, title:"الحركات", subtitle:"Short Vowels & Diacritics", cat:"Writing", color:"#B71C1C", icon:"َ" },
  { id:3, title:"الشمسية والقمرية", subtitle:"Sun & Moon Letters", cat:"Writing", color:"#E65100", icon:"☀" },
  { id:4, title:"الكتابة المتّصلة", subtitle:"Connected Writing", cat:"Writing", color:"#4527A0", icon:"✍" },
  { id:5, title:"الأرقام والترقيم", subtitle:"Numbers & Punctuation", cat:"Writing", color:"#00695C", icon:"٣" },
  { id:6, title:"الأصوات الصعبة", subtitle:"Emphatic & Throat Sounds", cat:"Phonology", color:"#880E4F", icon:"🗣" },
  { id:7, title:"قواعد الهمزة", subtitle:"Hamza Rules", cat:"Phonology", color:"#1565C0", icon:"ء" },
  { id:8, title:"التاء المربوطة", subtitle:"Tā' Marbūṭa & Alif Maqṣūra", cat:"Phonology", color:"#2E7D32", icon:"ة" },
  { id:9, title:"أداة التعريف", subtitle:"The Definite Article al-", cat:"Nouns", color:"#C62828", icon:"ال" },
  { id:10, title:"الجنس", subtitle:"Gender", cat:"Nouns", color:"#AD1457", icon:"♂♀" },
  { id:11, title:"حالات الاسم", subtitle:"Noun States & Iḍāfa", cat:"Nouns", color:"#0D47A1", icon:"📎" },
  { id:12, title:"الجمع", subtitle:"Plurals: Sound & Broken", cat:"Nouns", color:"#6A1B9A", icon:"➕" },
  { id:13, title:"المثنّى", subtitle:"The Dual Form", cat:"Nouns", color:"#00838F", icon:"٢" },
  { id:14, title:"الإعراب", subtitle:"Case Endings", cat:"Nouns", color:"#E65100", icon:"ٌ" },
  { id:15, title:"الضمائر المنفصلة", subtitle:"Personal Pronouns", cat:"Pronouns", color:"#1B5E20", icon:"👤" },
  { id:16, title:"الضمائر المتّصلة", subtitle:"Attached Pronouns", cat:"Pronouns", color:"#B71C1C", icon:"🔗" },
  { id:17, title:"الإشارة والموصول", subtitle:"Demonstratives & Relatives", cat:"Pronouns", color:"#4527A0", icon:"👉" },
  { id:18, title:"الفعل الماضي", subtitle:"Past Tense", cat:"Verbs", color:"#C62828", icon:"⏪" },
  { id:19, title:"الفعل المضارع", subtitle:"Present Tense & Moods", cat:"Verbs", color:"#1565C0", icon:"▶" },
  { id:20, title:"فعل الأمر", subtitle:"Imperative", cat:"Verbs", color:"#E65100", icon:"❗" },
  { id:21, title:"الأوزان II–X", subtitle:"Verb Forms II–X", cat:"Verbs", color:"#6A1B9A", icon:"⚙" },
  { id:22, title:"الأفعال الشاذّة", subtitle:"Irregular Verbs", cat:"Verbs", color:"#880E4F", icon:"⚡" },
  { id:23, title:"المصدر والاسم", subtitle:"Verbal Nouns & Participles", cat:"Verbs", color:"#00695C", icon:"📝" },
  { id:24, title:"الجملة الاسمية والفعلية", subtitle:"Sentence Types", cat:"Sentences", color:"#0D47A1", icon:"📐" },
  { id:25, title:"النفي", subtitle:"Negation", cat:"Sentences", color:"#C62828", icon:"✗" },
  { id:26, title:"الاستفهام", subtitle:"Questions", cat:"Sentences", color:"#2E7D32", icon:"❓" },
  { id:27, title:"حروف الجرّ", subtitle:"Prepositions", cat:"Sentences", color:"#4527A0", icon:"↔" },
  { id:28, title:"العدد والمعدود", subtitle:"Numbers & Counting", cat:"Practical", color:"#E65100", icon:"🔢" },
  { id:29, title:"الفصحى واللهجات", subtitle:"MSA vs Dialect", cat:"Practical", color:"#1565C0", icon:"🗺" },
  { id:30, title:"نظام الجذور", subtitle:"Root System", cat:"Practical", color:"#1B5E20", icon:"🌳" },
];

const categories=["Writing","Phonology","Nouns","Pronouns","Verbs","Sentences","Practical"];
const catColors={Writing:"#1B5E20",Phonology:"#880E4F",Nouns:"#C62828",Pronouns:"#1B5E20",Verbs:"#C62828",Sentences:"#0D47A1",Practical:"#1565C0"};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Card({color,title,subtitle,children}){
  return(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #eee",marginBottom:16}}>
    <div style={{background:color,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{color:"#fff",fontSize:15,fontWeight:800}}>{title}</span>
      {subtitle&&<span style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>{subtitle}</span>}
    </div>{children}
  </div>);
}
function DarkBox({title,children}){
  return(<div style={{background:"#1a1a1a",borderRadius:14,padding:"16px 20px",marginBottom:16,color:"#fff",textAlign:"center"}}>
    {title&&<div style={{fontSize:10,color:"#666",letterSpacing:2,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>{title}</div>}{children}
  </div>);
}
function Insight({text}){return(<div style={{background:"#FFF8E7",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914",lineHeight:1.5}}>💡 {text}</div>);}
function PalNote({text}){return(<div style={{background:"#E8F5E9",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32",lineHeight:1.5}}>🇵🇸 <strong>Palestinian:</strong> {text}</div>);}
function Ar({children}){return <span style={{fontFamily:"'Noto Sans Arabic','Amiri','Scheherazade New',serif",fontSize:"1.15em",direction:"rtl",unicodeBidi:"isolate"}}>{children}</span>;}
function ArBig({children}){return <span style={{fontFamily:"'Noto Sans Arabic','Amiri','Scheherazade New',serif",fontSize:"1.6em",direction:"rtl",unicodeBidi:"isolate",fontWeight:700}}>{children}</span>;}

function SimpleGuide({items}){
  return(<div>{items.map((item,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:6}}>
    <div style={{fontSize:13,fontWeight:700,color:"#1a1a1a",marginBottom:4}}>{item.h}</div>
    <div style={{fontSize:12,color:"#666",lineHeight:1.6,whiteSpace:"pre-line"}}>{item.b}</div>
  </div>))}</div>);
}

function ExpandSection({label,color,children}){
  const [open,setOpen]=useState(false);
  return(<div style={{marginBottom:8}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",padding:"10px 16px",borderRadius:10,border:"1.5px solid #e0ddd8",background:open?color||"#1a1a1a":"#fff",color:open?"#fff":"#555",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <span>{label}</span><span style={{fontSize:16,transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}>⌄</span>
    </button>
    {open&&<div style={{marginTop:8}}>{children}</div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 1: THE ARABIC ALPHABET
// ═══════════════════════════════════════════════════════════════
const alphabet=[
  {l:"ا",n:"alif",tr:"ā/a",ipa:"/aː/, glottal stop carrier",iso:"ا",ini:"ا",med:"ـا",fin:"ـا",connect:false,cat:"throat"},
  {l:"ب",n:"bā'",tr:"b",ipa:"/b/",iso:"ب",ini:"بـ",med:"ـبـ",fin:"ـب",connect:true,cat:"normal"},
  {l:"ت",n:"tā'",tr:"t",ipa:"/t/",iso:"ت",ini:"تـ",med:"ـتـ",fin:"ـت",connect:true,cat:"normal"},
  {l:"ث",n:"thā'",tr:"th",ipa:"/θ/ (like 'think')",iso:"ث",ini:"ثـ",med:"ـثـ",fin:"ـث",connect:true,cat:"normal",pal:"Often → /t/ or /s/ in Palestinian"},
  {l:"ج",n:"jīm",tr:"j",ipa:"/dʒ/ (like 'judge')",iso:"ج",ini:"جـ",med:"ـجـ",fin:"ـج",connect:true,cat:"normal",pal:"Pronounced /ʒ/ (like 'measure') in Palestinian"},
  {l:"ح",n:"ḥā'",tr:"ḥ",ipa:"/ħ/ (deep throat h)",iso:"ح",ini:"حـ",med:"ـحـ",fin:"ـح",connect:true,cat:"throat"},
  {l:"خ",n:"khā'",tr:"kh",ipa:"/x/ (like German 'Bach')",iso:"خ",ini:"خـ",med:"ـخـ",fin:"ـخ",connect:true,cat:"throat"},
  {l:"د",n:"dāl",tr:"d",ipa:"/d/",iso:"د",ini:"د",med:"ـد",fin:"ـد",connect:false,cat:"normal"},
  {l:"ذ",n:"dhāl",tr:"dh",ipa:"/ð/ (like 'the')",iso:"ذ",ini:"ذ",med:"ـذ",fin:"ـذ",connect:false,cat:"normal",pal:"Often → /d/ or /z/ in Palestinian"},
  {l:"ر",n:"rā'",tr:"r",ipa:"/r/ (trilled)",iso:"ر",ini:"ر",med:"ـر",fin:"ـر",connect:false,cat:"normal"},
  {l:"ز",n:"zāy",tr:"z",ipa:"/z/",iso:"ز",ini:"ز",med:"ـز",fin:"ـز",connect:false,cat:"normal"},
  {l:"س",n:"sīn",tr:"s",ipa:"/s/",iso:"س",ini:"سـ",med:"ـسـ",fin:"ـس",connect:true,cat:"normal"},
  {l:"ش",n:"shīn",tr:"sh",ipa:"/ʃ/ (like 'ship')",iso:"ش",ini:"شـ",med:"ـشـ",fin:"ـش",connect:true,cat:"normal"},
  {l:"ص",n:"ṣād",tr:"ṣ",ipa:"/sˤ/ (emphatic s)",iso:"ص",ini:"صـ",med:"ـصـ",fin:"ـص",connect:true,cat:"emphatic"},
  {l:"ض",n:"ḍād",tr:"ḍ",ipa:"/dˤ/ (emphatic d)",iso:"ض",ini:"ضـ",med:"ـضـ",fin:"ـض",connect:true,cat:"emphatic"},
  {l:"ط",n:"ṭā'",tr:"ṭ",ipa:"/tˤ/ (emphatic t)",iso:"ط",ini:"طـ",med:"ـطـ",fin:"ـط",connect:true,cat:"emphatic"},
  {l:"ظ",n:"ẓā'",tr:"ẓ",ipa:"/ðˤ/ (emphatic dh)",iso:"ظ",ini:"ظـ",med:"ـظـ",fin:"ـظ",connect:true,cat:"emphatic",pal:"Often → /ḍ/ or /z/ in Palestinian"},
  {l:"ع",n:"'ayn",tr:"'",ipa:"/ʕ/ (voiced pharyngeal)",iso:"ع",ini:"عـ",med:"ـعـ",fin:"ـع",connect:true,cat:"throat"},
  {l:"غ",n:"ghayn",tr:"gh",ipa:"/ɣ/ (French/German r-like)",iso:"غ",ini:"غـ",med:"ـغـ",fin:"ـغ",connect:true,cat:"throat"},
  {l:"ف",n:"fā'",tr:"f",ipa:"/f/",iso:"ف",ini:"فـ",med:"ـفـ",fin:"ـف",connect:true,cat:"normal"},
  {l:"ق",n:"qāf",tr:"q",ipa:"/q/ (deep k)",iso:"ق",ini:"قـ",med:"ـقـ",fin:"ـق",connect:true,cat:"emphatic",pal:"Pronounced as glottal stop /ʔ/ in Palestinian — the signature dialect marker!"},
  {l:"ك",n:"kāf",tr:"k",ipa:"/k/",iso:"ك",ini:"كـ",med:"ـكـ",fin:"ـك",connect:true,cat:"normal"},
  {l:"ل",n:"lām",tr:"l",ipa:"/l/",iso:"ل",ini:"لـ",med:"ـلـ",fin:"ـل",connect:true,cat:"normal"},
  {l:"م",n:"mīm",tr:"m",ipa:"/m/",iso:"م",ini:"مـ",med:"ـمـ",fin:"ـم",connect:true,cat:"normal"},
  {l:"ن",n:"nūn",tr:"n",ipa:"/n/",iso:"ن",ini:"نـ",med:"ـنـ",fin:"ـن",connect:true,cat:"normal"},
  {l:"ه",n:"hā'",tr:"h",ipa:"/h/",iso:"ه",ini:"هـ",med:"ـهـ",fin:"ـه",connect:true,cat:"normal"},
  {l:"و",n:"wāw",tr:"w/ū",ipa:"/w/ or /uː/",iso:"و",ini:"و",med:"ـو",fin:"ـو",connect:false,cat:"normal"},
  {l:"ي",n:"yā'",tr:"y/ī",ipa:"/j/ or /iː/",iso:"ي",ini:"يـ",med:"ـيـ",fin:"ـي",connect:true,cat:"normal"},
];

const catLabels={normal:"Standard",throat:"Throat",emphatic:"Emphatic"};
const catFilterColors={normal:"#1B5E20",throat:"#880E4F",emphatic:"#E65100",all:"#333"};

function Guide1(){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  const filtered=alphabet.filter(a=>filter==="all"||a.cat===filter);
  return(<div>
    <div style={{display:"flex",gap:5,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
      {["all","normal","throat","emphatic"].map(f=>(<button key={f} onClick={()=>{setFilter(f);setSel(null)}} style={{padding:"5px 12px",borderRadius:16,border:filter===f?`2px solid ${catFilterColors[f]}`:"1.5px solid #ddd",background:filter===f?catFilterColors[f]:"#fff",color:filter===f?"#fff":"#666",fontSize:11,fontWeight:600,cursor:"pointer"}}>{f==="all"?"All":catLabels[f]}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(52px, 1fr))",gap:5,marginBottom:14,direction:"rtl"}}>
      {filtered.map(a=>{const isSel=sel?.l===a.l;return(
        <button key={a.l} onClick={()=>setSel(isSel?null:a)} style={{aspectRatio:"1",border:isSel?`2.5px solid #1B5E20`:a.cat==="emphatic"?"2px solid #E65100":a.cat==="throat"?"2px solid #880E4F":"1.5px solid #e0ddd8",borderRadius:10,background:isSel?"#1B5E20":a.connect?"#fff":"#FFF8E7",color:isSel?"#FFE77A":"#1a1a1a",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",transform:isSel?"scale(1.08)":"scale(1)",transition:"all 0.15s",fontFamily:"'Noto Sans Arabic','Amiri',serif"}}>
          <span style={{fontSize:22,fontWeight:700,lineHeight:1}}>{a.l}</span>
          <span style={{fontSize:7,color:isSel?"rgba(255,231,122,0.7)":"#aaa",marginTop:1,fontFamily:"system-ui,sans-serif"}}>{a.n}</span>
          {!a.connect&&!isSel&&<div style={{position:"absolute",top:3,right:4,width:5,height:5,borderRadius:"50%",background:"#D4A843"}}/>}
        </button>
      );})}
    </div>
    {sel&&(<div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e8e5e0",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
      <div style={{background:"#1B5E20",padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
        <div style={{fontSize:48,fontWeight:700,color:"#FFE77A",fontFamily:"'Noto Sans Arabic','Amiri',serif",lineHeight:1,minWidth:50,textAlign:"center"}}>{sel.l}</div>
        <div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>Name: <strong style={{color:"#fff"}}>{sel.n}</strong> · Transliteration: <strong style={{color:"#FFE77A"}}>{sel.tr}</strong></div>
          <div style={{color:"#FFE77A",fontSize:13,fontFamily:"monospace",marginTop:2}}>{sel.ipa}</div></div>
      </div>
      <div style={{padding:"14px 18px"}}>
        {/* 4 positional forms */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
          {[{label:"Isolated",form:sel.iso},{label:"Initial",form:sel.ini},{label:"Medial",form:sel.med},{label:"Final",form:sel.fin}].map(f=>(<div key={f.label} style={{textAlign:"center",padding:"10px 4px",background:"#FAFAF5",borderRadius:8,border:"1px solid #eee"}}>
            <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",lineHeight:1.3}}>{f.form}</div>
            <div style={{fontSize:9,color:"#999",marginTop:4}}>{f.label}</div>
          </div>))}
        </div>
        {!sel.connect&&<div style={{background:"#FFF8E7",borderRadius:8,padding:"8px 12px",border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914",marginBottom:8}}>⚠ This letter does NOT connect to the following letter</div>}
        {sel.pal&&<div style={{background:"#E8F5E9",borderRadius:8,padding:"8px 12px",border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32"}}>🇵🇸 {sel.pal}</div>}
      </div>
    </div>)}
    <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",fontSize:10,color:"#aaa"}}>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#FFF8E7",border:"1px solid #F0E4C4"}}/>Non-connecting</span>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#880E4F"}}/>Throat sound</span>
      <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#E65100"}}/>Emphatic</span>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: SHORT VOWELS & DIACRITICS
// ═══════════════════════════════════════════════════════════════
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

function Guide2(){
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
const sunLetters=["ت","ث","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ل","ن"];
const moonLetters=["ا","ب","ج","ح","خ","ع","غ","ف","ق","ك","م","ه","و","ي"];

function Guide3(){
  return(<div>
    <DarkBox title="What Happens to 'al-'?"><div style={{fontSize:13,lineHeight:1.6}}>
      When <Ar>الـ</Ar> (the) is added, <strong style={{color:"#FFE77A"}}>sun letters</strong> absorb the /l/ sound — the lām assimilates. <strong style={{color:"#90CAF9"}}>Moon letters</strong> keep the /l/ clearly pronounced.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #E65100"}}>
        <div style={{background:"#E65100",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>☀️ Sun Letters (14) — lām assimilates</div>
        <div style={{padding:"10px 14px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,direction:"rtl",justifyContent:"center"}}>
            {sunLetters.map(l=>(<span key={l} style={{width:32,height:32,borderRadius:6,background:"#FFF3E0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#E65100",fontWeight:700}}>{l}</span>))}
          </div>
          <div style={{marginTop:10,fontSize:12,color:"#555",textAlign:"center"}}>
            <Ar>الشَّمس</Ar> = <strong>ash-shams</strong> (not al-shams)<br/>
            The lām becomes the sun letter
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #1565C0"}}>
        <div style={{background:"#1565C0",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>🌙 Moon Letters (14) — lām stays</div>
        <div style={{padding:"10px 14px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,direction:"rtl",justifyContent:"center"}}>
            {moonLetters.map(l=>(<span key={l} style={{width:32,height:32,borderRadius:6,background:"#E3F2FD",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",fontWeight:700}}>{l}</span>))}
          </div>
          <div style={{marginTop:10,fontSize:12,color:"#555",textAlign:"center"}}>
            <Ar>القَمَر</Ar> = <strong>al-qamar</strong> (lām fully pronounced)<br/>
            The lām stays as /l/
          </div>
        </div>
      </div>
    </div>
    <Insight text="Easy trick: say 'al-' then the letter. If your tongue stays behind your teeth for both the lām and the letter, it's a sun letter. If your tongue moves, it's a moon letter."/>
    <PalNote text="The assimilation happens in Palestinian Arabic too — it's universal across all dialects and MSA."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: CONNECTED WRITING
// ═══════════════════════════════════════════════════════════════
const nonConnectors=["ا","د","ذ","ر","ز","و"];
const wordExamples=[
  {word:"كَتَبَ",trans:"kataba",meaning:"he wrote",letters:["كـ","ـتـ","ـبَ"],pos:["initial","medial","final"]},
  {word:"دَرَسَ",trans:"darasa",meaning:"he studied",letters:["د","ر","سَ"],pos:["isolated*","isolated*","isolated"],note:"د and ر don't connect forward"},
  {word:"كِتاب",trans:"kitāb",meaning:"book",letters:["كـ","ـتـ","ـا","ب"],pos:["initial","medial","(alif)","final"]},
  {word:"مَدرَسة",trans:"madrasa",meaning:"school",letters:["مـ","ـد","ر","سـ","ـة"],pos:["initial","(breaks)","(breaks)","initial","final tā' marbūṭa"]},
];

function Guide4(){
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
function Guide5(){
  const nums=[{w:"٠",e:"0"},{w:"١",e:"1"},{w:"٢",e:"2"},{w:"٣",e:"3"},{w:"٤",e:"4"},{w:"٥",e:"5"},{w:"٦",e:"6"},{w:"٧",e:"7"},{w:"٨",e:"8"},{w:"٩",e:"9"}];
  const punct=[{ar:"؟",en:"?",note:"Reversed question mark"},{ar:"،",en:",",note:"Inverted comma"},{ar:"؛",en:";",note:"Inverted semicolon"},{ar:"!",en:"!",note:"Same as English"},{ar:".",en:".",note:"Same as English"},{ar:"«»",en:'""',note:"Guillemets for quotation"}];
  return(<div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Eastern Arabic Numerals</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {nums.map(n=>(<div key={n.e} style={{textAlign:"center",padding:"12px 4px",background:"#fff",borderRadius:10,border:"1px solid #eee"}}>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic',serif",color:"#00695C",fontWeight:700}}>{n.w}</div>
        <div style={{fontSize:14,color:"#999",marginTop:2}}>{n.e}</div>
      </div>))}
    </div>
    <Insight text="Numbers in Arabic are written LEFT to RIGHT (like English), even though text goes right to left. So ١٢٣ is read as 123."/>
    <PalNote text="Palestinian Arabic commonly uses both Eastern Arabic numerals (٠-٩) and Western numerals (0-9) interchangeably, especially in informal contexts."/>
    <Card color="#00695C" title="Arabic Punctuation">
      {punct.map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:i<punct.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:24,fontFamily:"'Noto Sans Arabic',serif",color:"#00695C",minWidth:40,textAlign:"center"}}>{p.ar}</span>
        <span style={{fontSize:18,color:"#ccc",margin:"0 12px"}}>↔</span>
        <span style={{fontSize:18,color:"#999",minWidth:30}}>{p.en}</span>
        <span style={{fontSize:12,color:"#888",marginLeft:"auto"}}>{p.note}</span>
      </div>))}
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 6: EMPHATIC & THROAT SOUNDS
// ═══════════════════════════════════════════════════════════════
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

function Guide6(){
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
function Guide7(){
  const seats=[
    {seat:"On alif (أ / إ)",when:"At the start of a word, or when the surrounding vowel is fatḥa/no vowel",ex:[{ar:"أَخ",tr:"akh",m:"brother"},{ar:"إِسلام",tr:"islām",m:"Islam"}],color:"#1565C0"},
    {seat:"On wāw (ؤ)",when:"When the strongest surrounding vowel is ḍamma",ex:[{ar:"سُؤال",tr:"su'āl",m:"question"},{ar:"رُؤية",tr:"ru'ya",m:"vision"}],color:"#2E7D32"},
    {seat:"On yā' (ئ)",when:"When the strongest surrounding vowel is kasra",ex:[{ar:"سَئِمَ",tr:"sa'ima",m:"he got bored"},{ar:"بِئر",tr:"bi'r",m:"well (water)"}],color:"#6A1B9A"},
    {seat:"On the line (ء)",when:"After a long vowel or sukūn, or at the end of a word after a vowel",ex:[{ar:"سَماء",tr:"samā'",m:"sky"},{ar:"جُزء",tr:"juz'",m:"part"}],color:"#E65100"},
  ];
  return(<div>
    <DarkBox title="Where Does Hamza Sit?"><div style={{fontSize:13,lineHeight:1.6}}>
      Hamza <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic',serif"}}>ء</span> is a glottal stop. Its <strong style={{color:"#FFE77A"}}>"seat" (carrier)</strong> changes based on the surrounding vowels. The strongest vowel wins: kasra {'>'} ḍamma {'>'} fatḥa.
    </div></DarkBox>
    {seats.map((s,i)=>(<Card key={i} color={s.color} title={s.seat} subtitle={s.when}>
      {s.ex.map((e,j)=>(<div key={j} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:j<s.ex.length-1?"1px solid #f0eeeb":"none",gap:12}}>
        <span style={{fontSize:22,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:s.color,minWidth:60,textAlign:"center",direction:"rtl"}}>{e.ar}</span>
        <span style={{fontSize:13,color:"#555"}}>{e.tr}</span>
        <span style={{fontSize:12,color:"#999",marginLeft:"auto"}}>{e.m}</span>
      </div>))}
    </Card>))}
    <Insight text="Vowel strength hierarchy: kasra (i) > ḍamma (u) > fatḥa (a). The strongest vowel among those next to hamza determines its seat."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 8: TĀ' MARBŪṬA & ALIF MAQṢŪRA
// ═══════════════════════════════════════════════════════════════
function Guide8(){
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"2px solid #2E7D32"}}>
        <div style={{background:"#2E7D32",padding:"12px 16px",color:"#fff",textAlign:"center"}}>
          <div style={{fontSize:36,fontFamily:"'Noto Sans Arabic','Amiri',serif"}}>ة</div>
          <div style={{fontSize:13,fontWeight:700}}>Tā' Marbūṭa</div>
        </div>
        <div style={{padding:"12px 16px",fontSize:12,color:"#555",lineHeight:1.6}}>
          <p style={{margin:"0 0 8px"}}>Looks like <Ar>ه</Ar> with two dots. Marks <strong>feminine nouns</strong> and some adjectives.</p>
          <p style={{margin:"0 0 8px"}}>Pronounced <strong>/a/</strong> at end of phrase (pausing). Pronounced <strong>/at/</strong> in construct (iḍāfa) or when continuing.</p>
          <div style={{background:"#E8F5E9",borderRadius:6,padding:"6px 8px",marginTop:4}}>
            <Ar>مَدرَسة</Ar> = madrasa (school)<br/>
            <Ar>مَدرَسة كَبيرة</Ar> = madrasat kabīra
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"2px solid #E65100"}}>
        <div style={{background:"#E65100",padding:"12px 16px",color:"#fff",textAlign:"center"}}>
          <div style={{fontSize:36,fontFamily:"'Noto Sans Arabic','Amiri',serif"}}>ى</div>
          <div style={{fontSize:13,fontWeight:700}}>Alif Maqṣūra</div>
        </div>
        <div style={{padding:"12px 16px",fontSize:12,color:"#555",lineHeight:1.6}}>
          <p style={{margin:"0 0 8px"}}>Looks like <Ar>ي</Ar> without dots. Represents a final <strong>long /ā/</strong> sound.</p>
          <p style={{margin:"0 0 8px"}}>Found at the <strong>end of words only</strong>. Pronounced exactly like regular alif.</p>
          <div style={{background:"#FFF3E0",borderRadius:6,padding:"6px 8px",marginTop:4}}>
            <Ar>عَلى</Ar> = 'alā (on/upon)<br/>
            <Ar>مُوسى</Ar> = Mūsā (Moses)
          </div>
        </div>
      </div>
    </div>
    <Insight text="Quick rule: if a word ends in a feminine -a marker and you pause, say /a/. If you keep talking (iḍāfa or adjective follows), it becomes /at/."/>
    <PalNote text="In Palestinian Arabic, tā' marbūṭa in construct is always /et/ (not /at/): مدرسة كبيرة = madraset kbīre."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 9: DEFINITE ARTICLE AL-
// ═══════════════════════════════════════════════════════════════
function Guide9(){
  return(<div>
    <DarkBox title="One Article for Everything"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic has only one definite article: <ArBig>الـ</ArBig> (al-). No gender/number changes. Indefiniteness is marked by <strong style={{color:"#FFE77A"}}>tanwīn</strong> (the -n ending).
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,padding:"14px",border:"1px solid #eee",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#C62828",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Definite (the)</div>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#C62828"}}><Ar>الكِتاب</Ar></div>
        <div style={{fontSize:13,color:"#555",marginTop:4}}>al-kitāb = <strong>the</strong> book</div>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:"14px",border:"1px solid #eee",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#2E7D32",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Indefinite (a/an)</div>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#2E7D32"}}><Ar>كِتابٌ</Ar></div>
        <div style={{fontSize:13,color:"#555",marginTop:4}}>kitābun = <strong>a</strong> book</div>
      </div>
    </div>
    <SimpleGuide items={[
      {h:"With sun letters: lām assimilates",b:"الشَّمس = ash-shams (the sun) — see Guide 3"},
      {h:"With moon letters: lām stays",b:"القَمَر = al-qamar (the moon)"},
      {h:"al- makes nouns definite for adjective agreement",b:"الكتاب الكبير = al-kitāb al-kabīr (the big book)\nBoth noun AND adjective get al-"},
      {h:"No al- in iḍāfa (construct) on first noun",b:"كتاب الطالب = kitāb aṭ-ṭālib (the student's book)\nFirst noun is definite by relationship, not by al-"},
    ]}/>
    <PalNote text="In Palestinian Arabic, al- is often shortened to just 'l-' or 'il-'. الكتاب = il-ktāb."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 10: GENDER
// ═══════════════════════════════════════════════════════════════
function Guide10(){
  const mascPat=[
    {ar:"كِتاب",tr:"kitāb",m:"book"},{ar:"بَيت",tr:"bayt",m:"house"},{ar:"وَلَد",tr:"walad",m:"boy"},
    {ar:"قَلَم",tr:"qalam",m:"pen"},{ar:"باب",tr:"bāb",m:"door"},
  ];
  const femPat=[
    {ar:"مَدرَسة",tr:"madrasa",m:"school"},{ar:"سَيّارة",tr:"sayyāra",m:"car"},{ar:"غُرفة",tr:"ghurfa",m:"room"},
    {ar:"مَدينة",tr:"madīna",m:"city"},{ar:"جامِعة",tr:"jāmi'a",m:"university"},
  ];
  const femNoTM=[
    {ar:"أُمّ",tr:"umm",m:"mother"},{ar:"أُخت",tr:"ukht",m:"sister"},{ar:"شَمس",tr:"shams",m:"sun"},
    {ar:"أَرض",tr:"arḍ",m:"earth/land"},{ar:"نار",tr:"nār",m:"fire"},
  ];
  return(<div>
    <DarkBox title="Every Noun Has a Gender"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic has two genders: <strong style={{color:"#90CAF9"}}>masculine</strong> and <strong style={{color:"#EF9A9A"}}>feminine</strong>. The main marker for feminine is <ArBig>ة</ArBig> (tā' marbūṭa).
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <Card color="#1565C0" title="♂ Masculine" subtitle="No special ending">
        {mascPat.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 14px",borderBottom:i<mascPat.length-1?"1px solid #f0eeeb":"none",gap:8}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
      </Card>
      <Card color="#AD1457" title="♀ Feminine" subtitle="Usually ends in ة">
        {femPat.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 14px",borderBottom:i<femPat.length-1?"1px solid #f0eeeb":"none",gap:8}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#AD1457",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
      </Card>
    </div>
    <ExpandSection label="⚠ Feminine WITHOUT tā' marbūṭa" color="#AD1457">
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee"}}>
        {femNoTM.map((w,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"6px 0",borderBottom:i<femNoTM.length-1?"1px solid #f0eeeb":"none",gap:10}}>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#AD1457",direction:"rtl",minWidth:50,textAlign:"center"}}>{w.ar}</span>
          <span style={{fontSize:12,color:"#888"}}>{w.tr} — {w.m}</span>
        </div>))}
        <div style={{fontSize:11,color:"#888",marginTop:6}}>Body parts that come in pairs, country/city names, and some nature words are often feminine without ة.</div>
      </div>
    </ExpandSection>
    <Insight text="Key rule: non-human plurals are treated as FEMININE SINGULAR for agreement purposes. 'The books are big' = الكتب كبيرة (not كبيرون)."/>
    <PalNote text="Gender works the same in Palestinian Arabic. The tā' marbūṭa ending shifts to -e in dialect: مدرسة = madrase, سيّارة = sayyāra (stays similar)."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 11-30: PLACEHOLDER FUNCTIONS (will be built out)
// ═══════════════════════════════════════════════════════════════
function Guide11(){return(<SimpleGuide items={[
  {h:"Three noun states in Arabic",b:"1. Definite (with al-): الكتاب\n2. Indefinite (with tanwīn): كتابٌ\n3. Construct / Iḍāfa (possessed): كتابُ الطالب"},
  {h:"Iḍāfa = X of Y (possession chain)",b:"The first noun (possessed) NEVER takes al- or tanwīn.\nThe last noun determines definiteness.\nكتابُ المعلّم = the teacher's book\nكتابُ معلّمٍ = a teacher's book"},
  {h:"Multi-word iḍāfa chains",b:"بابُ بيتِ المعلّم = the door of the teacher's house\nOnly the LAST word gets al- (or tanwīn for indefinite)"},
  {h:"Adjectives go AFTER the whole iḍāfa",b:"كتابُ الطالبِ الكبير = the student's big book\nThe adjective matches the noun it describes, not the possessor"},
]}/>);}

function Guide12(){return(<div>
  <DarkBox title="Three Plural Systems"><div style={{fontSize:13,lineHeight:1.6}}>
    Arabic has <strong style={{color:"#FFE77A"}}>sound plurals</strong> (regular endings) and <strong style={{color:"#EF9A9A"}}>broken plurals</strong> (internal pattern changes). Most nouns use broken plurals.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Sound Masculine Plural: add ون/-ين",b:"معلّم → معلّمون (nom) / معلّمين (acc/gen)\nOnly for male humans (teachers, engineers, etc.)"},
    {h:"Sound Feminine Plural: add ات-",b:"معلّمة → معلّمات (female teachers)\nAlso for many loanwords and verbal nouns"},
    {h:"Broken Plurals: internal pattern change",b:"كتاب → كُتُب (books) · بيت → بُيوت (houses)\nقلم → أقلام (pens) · رجل → رجال (men)\nPatterns like أفعال، فُعول، فِعال are common"},
    {h:"Common broken plural patterns",b:"CuCuC: كتاب→كُتُب · CuCūC: بيت→بُيوت\naCCāC: ولد→أولاد · CiCāC: رجل→رِجال\nCuCaCā': وزير→وُزَراء"},
  ]}/>
  <Insight text="Non-human plurals take FEMININE SINGULAR agreement. كُتُب كبيرة (big books) — even though كتاب is masculine!"/>
  <PalNote text="Palestinian Arabic uses the same broken plurals as MSA. Sound masculine plural often becomes -īn for all cases: معلّمين (mu'allimīn)."/>
</div>);}

function Guide13(){return(<SimpleGuide items={[
  {h:"Dual = exactly two of something",b:"Arabic has a special form for pairs — not just singular/plural.\nكتاب (book) → كتابان (two books, nom) / كتابَيْن (two books, acc/gen)"},
  {h:"Feminine dual",b:"مدرسة (school) → مدرستان / مدرستَيْن\nThe tā' marbūṭa opens to regular tā' before the dual ending"},
  {h:"When to use it",b:"Always use dual for exactly 2. It's not optional like in English.\n'Two men came' = جاء رجلان (not رجلين اثنين)"},
  {h:"Dual verbs and pronouns exist too",b:"هُما = they two · أنتما = you two\nكَتَبا = they two (m) wrote · كَتَبَتا = they two (f) wrote"},
]}/>);}

function Guide14(){return(<div>
  <DarkBox title="Case Endings (I'rāb)"><div style={{fontSize:13,lineHeight:1.6}}>
    MSA has 3 cases marked by short vowels on the last letter. These are <strong style={{color:"#EF9A9A"}}>dropped in spoken Arabic</strong> but important for reading classical/formal texts.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Nominative (مرفوع) — ◌ُ / ◌ٌ",b:"Subject of a sentence, predicate of nominal sentence\nالطالبُ كتبَ = the student wrote\nIndefinite: طالبٌ = a student (nom)"},
    {h:"Accusative (منصوب) — ◌َ / ◌ً",b:"Direct object, after إنّ and sisters, adverbs of time/place\nقرأتُ كتابًا = I read a book\nIndefinite gets alif: كتابًا"},
    {h:"Genitive (مجرور) — ◌ِ / ◌ٍ",b:"After prepositions, second noun in iḍāfa\nفي البيتِ = in the house\nكتابُ الطالبِ = the student's book"},
    {h:"Diptotes (ممنوع من الصرف)",b:"Some nouns don't take tanwīn and use fatḥa for genitive:\nForeign names, broken plural patterns (مَساجِد), colors/defects"},
  ]}/>
  <PalNote text="Case endings are completely absent in Palestinian Arabic (and all dialects). Word order and context handle the job instead. You only encounter i'rāb in formal MSA, Quran, and poetry."/>
</div>);}

function Guide15(){
  const pronouns=[
    {ar:"أنا",tr:"anā",m:"I",p:"ana"},{ar:"أنتَ",tr:"anta",m:"you (m)",p:"inte/inta"},{ar:"أنتِ",tr:"anti",m:"you (f)",p:"inti"},
    {ar:"هُوَ",tr:"huwa",m:"he",p:"huwwe"},{ar:"هِيَ",tr:"hiya",m:"she",p:"hiyye"},
    {ar:"نَحنُ",tr:"naḥnu",m:"we",p:"iḥna"},{ar:"أنتُم",tr:"antum",m:"you (pl.m)",p:"intu"},
    {ar:"هُم",tr:"hum",m:"they (m)",p:"humme"},{ar:"هُنَّ",tr:"hunna",m:"they (f)",p:"humme (same)"},
  ];
  return(<div>
    <Card color="#1B5E20" title="Personal Pronouns" subtitle="الضمائر المنفصلة">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"60px 70px 80px 1fr",alignItems:"center",padding:"8px 14px",borderBottom:i<pronouns.length-1?"1px solid #f0eeeb":"none",gap:6}}>
        <span style={{fontSize:20,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",direction:"rtl",textAlign:"center"}}>{p.ar}</span>
        <span style={{fontSize:12,color:"#888"}}>{p.tr}</span>
        <span style={{fontSize:13,fontWeight:600,color:"#333"}}>{p.m}</span>
        <span style={{fontSize:11,color:"#2E7D32",fontStyle:"italic"}}>🇵🇸 {p.p}</span>
      </div>))}
    </Card>
    <Insight text="MSA has separate dual pronouns (أنتما, هما) and feminine plurals (أنتنّ, هنّ). Palestinian Arabic simplifies: أنتم/هم cover all plurals."/>
  </div>);
}

function Guide16(){return(<SimpleGuide items={[
  {h:"Attached pronouns = my/your/his/her/our/their",b:"Suffix directly onto nouns:\nكتابي kitāb-ī (my book) · كتابك kitāb-ak (your m. book)\nكتابها kitāb-hā (her book) · كتابنا kitāb-nā (our book)"},
  {h:"On verbs = object pronouns (me/you/him/her)",b:"كتبتُهُ katabtu-hu (I wrote it)\nرآني ra'ā-nī (he saw me)\nأعطيتُكَ a'ṭaytu-ka (I gave you)"},
  {h:"On prepositions",b:"منه min-hu (from him) · لها la-hā (for her)\nعندنا 'inda-nā (at our place / we have)\nمعي ma'-ī (with me)"},
  {h:"Full suffix chart",b:"ي (-ī/nī) me/my · كَ (-ka) your m. · كِ (-ki) your f.\nهُ (-hu) him/his · ها (-hā) her · نا (-nā) us/our\nكم (-kum) your pl. · هم (-hum) their"},
]}/>);}

function Guide17(){return(<SimpleGuide items={[
  {h:"This/That (Demonstratives)",b:"هذا hādhā = this (m) · هذه hādhihi = this (f)\nذلك dhālika = that (m) · تلك tilka = that (f)\nهؤلاء hā'ulā'i = these · أولئك ulā'ika = those"},
  {h:"🇵🇸 Palestinian forms",b:"هاد hād / هادا hāda = this (m) · هادي hādi = this (f)\nهداك hadāk = that (m) · هديك hadīk = that (f)\nهدول hadōl = these/those"},
  {h:"Relative pronouns (who/which/that)",b:"الذي alladhī = who/which (m.s) · التي allatī = (f.s)\nالذين alladhīna = (m.pl) · اللواتي allawātī = (f.pl)\nOnly used with DEFINITE nouns"},
  {h:"🇵🇸 Palestinian relative",b:"اللي illi = who/which/that — ONE form for everything!\nالكتاب اللي قرأته = il-ktāb illi 'arēto = the book that I read"},
]}/>);}

function Guide18(){
  const pastConj=[
    {p:"أنا",f:"كَتَبْتُ",tr:"katabtu",pal:"katabt"},{p:"أنتَ",f:"كَتَبْتَ",tr:"katabta",pal:"katabt"},
    {p:"أنتِ",f:"كَتَبْتِ",tr:"katabti",pal:"katabti"},{p:"هُوَ",f:"كَتَبَ",tr:"kataba",pal:"katab"},
    {p:"هِيَ",f:"كَتَبَتْ",tr:"katabat",pal:"katabet"},{p:"نحن",f:"كَتَبْنا",tr:"katabnā",pal:"katabna"},
    {p:"أنتم",f:"كَتَبْتُم",tr:"katabtum",pal:"katabtu"},{p:"هُم",f:"كَتَبوا",tr:"katabū",pal:"katabu"},
  ];
  return(<div>
    <DarkBox title="Root + Pattern System"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic verbs are built from <strong style={{color:"#FFE77A"}}>3-letter roots</strong>. The root <span style={{fontFamily:"'Noto Sans Arabic',serif",fontSize:16}}>ك ت ب</span> (k-t-b) carries the meaning "writing". Patterns applied to the root create different words and conjugations.
    </div></DarkBox>
    <Card color="#C62828" title="Past Tense — كَتَبَ (kataba, 'he wrote')" subtitle="Form I فَعَلَ">
      {pastConj.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"50px 70px 80px 1fr",alignItems:"center",padding:"6px 14px",borderBottom:i<pastConj.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,color:"#999"}}>{c.p}</span>
        <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#C62828",direction:"rtl"}}>{c.f}</span>
        <span style={{fontSize:12,color:"#555"}}>{c.tr}</span>
        <span style={{fontSize:11,color:"#2E7D32",fontStyle:"italic"}}>🇵🇸 {c.pal}</span>
      </div>))}
    </Card>
    <Insight text="The past tense base is the هُوَ (he) form: كَتَبَ. All other persons add suffixes to this base. The pattern فَعَلَ (fa'ala) is the template for most Form I verbs."/>
  </div>);
}

function Guide19(){
  const presConj=[
    {p:"أنا",f:"أَكتُبُ",tr:"aktubu",pal:"baktub"},{p:"أنتَ",f:"تَكتُبُ",tr:"taktubu",pal:"btiktub"},
    {p:"أنتِ",f:"تَكتُبينَ",tr:"taktubīna",pal:"btiktubi"},{p:"هُوَ",f:"يَكتُبُ",tr:"yaktubu",pal:"byiktub"},
    {p:"هِيَ",f:"تَكتُبُ",tr:"taktubu",pal:"btiktub"},{p:"نحن",f:"نَكتُبُ",tr:"naktubu",pal:"mniktub"},
    {p:"أنتم",f:"تَكتُبونَ",tr:"taktubūna",pal:"btiktibu"},{p:"هُم",f:"يَكتُبونَ",tr:"yaktubūna",pal:"byiktibu"},
  ];
  return(<div>
    <DarkBox title="Prefix + Root + Suffix"><div style={{fontSize:13}}>
      Present tense uses <strong style={{color:"#FFE77A"}}>prefixes</strong> (أ ت ي ن) to mark the person, plus suffixes for some forms.
    </div></DarkBox>
    <Card color="#1565C0" title="Present — يَكتُبُ (yaktubu, 'he writes')" subtitle="Indicative mood">
      {presConj.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"50px 70px 80px 1fr",alignItems:"center",padding:"6px 14px",borderBottom:i<presConj.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,color:"#999"}}>{c.p}</span>
        <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",direction:"rtl"}}>{c.f}</span>
        <span style={{fontSize:12,color:"#555"}}>{c.tr}</span>
        <span style={{fontSize:11,color:"#2E7D32",fontStyle:"italic"}}>🇵🇸 {c.pal}</span>
      </div>))}
    </Card>
    <SimpleGuide items={[
      {h:"Three moods of the present",b:"Indicative (مرفوع): يكتبُ — the default\nSubjunctive (منصوب): يكتبَ — after أن، لن، كي، لِ\nJussive (مجزوم): يكتبْ — after لم، لا (prohibitive)"},
    ]}/>
    <PalNote text="Palestinian adds بـ (b-) prefix for habitual present: بكتب (baktub) = I write. For progressive: عم بكتب ('am baktub) = I'm writing."/>
  </div>);
}

function Guide20(){return(<SimpleGuide items={[
  {h:"Form from the jussive (present without final vowel)",b:"يَكتُبْ → اُكتُبْ (uktub!) — write!\nDrop the prefix, add hamzat al-waṣl if needed"},
  {h:"Masculine singular",b:"اُكتُبْ uktub = write! · اِقرَأْ iqra' = read!\nاِذهَبْ idhhab = go! · اِفتَحْ iftaḥ = open!"},
  {h:"Feminine singular: add ي-",b:"اُكتُبي uktubī = write! (to a woman)"},
  {h:"Plural: add وا-",b:"اُكتُبوا uktubū = write! (to a group)"},
  {h:"Negative imperative uses لا + jussive",b:"لا تَكتُبْ lā taktub = don't write!"},
  {h:"🇵🇸 Palestinian imperatives",b:"اكتب uktub! · اقرأ i'ra! · روح rūḥ (go)!\nNegative: لا تكتب la tiktub!"},
]}/>);}

function Guide21(){
  const forms=[
    {n:"II",pat:"فَعَّلَ / يُفَعِّلُ",meaning:"Causative / intensive",ex:"عَلَّمَ = he taught (from عَلِمَ = he knew)"},
    {n:"III",pat:"فاعَلَ / يُفاعِلُ",meaning:"Mutual / doing with someone",ex:"كاتَبَ = he corresponded (with)"},
    {n:"IV",pat:"أَفعَلَ / يُفعِلُ",meaning:"Causative (formal)",ex:"أَرسَلَ = he sent"},
    {n:"V",pat:"تَفَعَّلَ / يَتَفَعَّلُ",meaning:"Reflexive of II",ex:"تَعَلَّمَ = he learned (taught himself)"},
    {n:"VI",pat:"تَفاعَلَ / يَتَفاعَلُ",meaning:"Mutual / pretending",ex:"تَبادَلَ = they exchanged"},
    {n:"VII",pat:"اِنفَعَلَ / يَنفَعِلُ",meaning:"Passive / reflexive",ex:"اِنكَسَرَ = it broke (by itself)"},
    {n:"VIII",pat:"اِفتَعَلَ / يَفتَعِلُ",meaning:"Reflexive (common)",ex:"اِجتَمَعَ = they gathered"},
    {n:"IX",pat:"اِفعَلَّ / يَفعَلُّ",meaning:"Colors & defects",ex:"اِحمَرَّ = it turned red"},
    {n:"X",pat:"اِستَفعَلَ / يَستَفعِلُ",meaning:"Seeking / considering",ex:"اِستَخدَمَ = he used (sought service)"},
  ];
  return(<div>
    <DarkBox title="9 Derived Verb Forms"><div style={{fontSize:13}}>
      Form I (فَعَلَ) is the base. Forms II–X add prefixes, double letters, or extra consonants to shift meaning systematically.
    </div></DarkBox>
    {forms.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee",marginBottom:5}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <span style={{background:"#6A1B9A",color:"#fff",padding:"2px 8px",borderRadius:5,fontSize:12,fontWeight:800}}>{f.n}</span>
        <span style={{fontSize:15,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#6A1B9A",direction:"rtl"}}>{f.pat}</span>
        <span style={{fontSize:11,color:"#888",marginLeft:"auto"}}>{f.meaning}</span>
      </div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{f.ex}</div>
    </div>))}
    <Insight text="Forms II and V are extremely common. If you know Form I, you can often guess Forms II (causative/intensive) and V (reflexive of II)."/>
  </div>);
}

function Guide22(){return(<SimpleGuide items={[
  {h:"Hollow verbs (middle root letter is و or ي)",b:"قال / يقول (qāla/yaqūlu) = to say\nنام / ينام (nāma/yanāmu) = to sleep\nزار / يزور (zāra/yazūru) = to visit\nThe middle letter appears/disappears based on conjugation"},
  {h:"Doubled verbs (2nd and 3rd root letters are the same)",b:"ردّ / يردّ (radda/yaruddu) = to reply\nحبّ / يحبّ (ḥabba/yuḥibbu) = to love\nمرّ / يمرّ (marra/yamurru) = to pass"},
  {h:"Hamzated verbs (root contains hamza)",b:"أكل / يأكل (akala/ya'kulu) = to eat\nسأل / يسأل (sa'ala/yas'alu) = to ask\nقرأ / يقرأ (qara'a/yaqra'u) = to read"},
  {h:"Weak-final verbs (last root letter is و or ي)",b:"مشى / يمشي (mashā/yamshī) = to walk\nدعا / يدعو (da'ā/yad'ū) = to call/invite\nبنى / يبني (banā/yabnī) = to build"},
]}/>);}

function Guide23(){return(<SimpleGuide items={[
  {h:"Verbal Noun (مصدر) = the act of doing",b:"Form I: varies (must memorize) — كِتابة (writing), عِلم (knowledge)\nForm II: تَفعيل — تَعليم (teaching)\nForm V: تَفَعُّل — تَعَلُّم (learning)\nForm X: اِستِفعال — اِستِخدام (usage)"},
  {h:"Active Participle (اسم الفاعل) = the doer",b:"Form I: فاعِل — كاتِب (writer), طالِب (student)\nForm II: مُفَعِّل — مُعَلِّم (teacher)\nVery common as nouns and adjectives"},
  {h:"Passive Participle (اسم المفعول) = the done-to",b:"Form I: مَفعول — مَكتوب (written), مَعروف (known)\nForm II: مُفَعَّل — مُعَلَّم (marked/taught)\nAlso very common as adjectives"},
  {h:"Pattern recognition",b:"If you see مُـ at the start → likely a participle or verbal noun of forms II-X\nIf you see ـاعِل pattern → active participle Form I\nIf you see مَفعول pattern → passive participle Form I"},
]}/>);}

function Guide24(){return(<SimpleGuide items={[
  {h:"Nominal sentence (جملة اسمية) — starts with a noun",b:"الكتابُ كبيرٌ = The book is big\nSubject (مبتدأ) + Predicate (خبر)\nNo verb 'to be' in present tense!"},
  {h:"Verbal sentence (جملة فعلية) — starts with a verb",b:"كَتَبَ الطالبُ الدرسَ = The student wrote the lesson\nVerb + Subject + Object (VSO order)"},
  {h:"Key difference: verb agreement",b:"Verbal sentence: verb is ALWAYS singular (even with plural subject)\nكَتَبَ الطلابُ = the students wrote (not كتبوا الطلاب)"},
  {h:"🇵🇸 Palestinian word order",b:"SVO is the default: الطالب كتب الدرس\nVerbal sentences (VSO) sound more formal/literary in dialect"},
]}/>);}

function Guide25(){return(<SimpleGuide items={[
  {h:"ما mā — negates past tense",b:"ما كَتَبَ = he did not write\nAlso negates present in some styles: ما يكتب"},
  {h:"لا lā — negates present tense",b:"لا أعرِفُ = I don't know\nAlso used for generic negation: لا إلهَ إلّا الله"},
  {h:"لم lam — negates past using jussive",b:"لم يَكتُبْ = he did not write (more formal than ما كتب)"},
  {h:"لن lan — negates future",b:"لن أكتُبَ = I will not write (uses subjunctive)"},
  {h:"ليس laysa — 'is not' (nominal negation)",b:"ليس كبيرًا = it is not big\nConjugates like a past-tense verb but means present"},
  {h:"🇵🇸 Palestinian negation",b:"ما...ش (mā...sh) wraps the verb: ما كتبش (ma katabsh) = he didn't write\nمش (mish) = is not: مش كبير (mish kbīr) = not big\nFuture negative: مش رح (mish raḥ) = will not"},
]}/>);}

function Guide26(){return(<SimpleGuide items={[
  {h:"Yes/No questions: هَل hal / أ a-",b:"هل تَكتُب؟ = Do you write?\nأتكتب؟ = Do you write? (more formal)"},
  {h:"Question words",b:"مَن man = who · ما / ماذا mā/mādhā = what\nأين ayna = where · متى matā = when\nكيف kayfa = how · لماذا limādhā = why\nكم kam = how many/much"},
  {h:"Word order with questions",b:"أين الكتاب؟ = Where is the book?\nماذا كتبتَ؟ = What did you write?"},
  {h:"🇵🇸 Palestinian question words",b:"مين mīn = who · شو shū = what · وين wēn = where\nإيمتى ēmta = when · كيف kīf = how · ليش lēsh = why\nقدّيش 'addēsh = how much"},
]}/>);}

function Guide27(){return(<SimpleGuide items={[
  {h:"Common prepositions + their effects",b:"في fī = in · على 'alā = on · من min = from\nإلى ilā = to · عن 'an = about · بـ bi- = with/by\nلـ li- = for/to · مع ma'a = with"},
  {h:"Prepositions take the genitive case",b:"في البيتِ = in the house (kasra on تِ)\nمن المدرسةِ = from the school"},
  {h:"With attached pronouns",b:"فيه fī-hi = in it · عليها 'alay-hā = on her\nمنّي min-nī = from me · لنا la-nā = for us\nعندي 'ind-ī = at me / I have"},
  {h:"🇵🇸 'to have' = عند + pronoun",b:"عندي 'indī = I have · عندك 'indak = you have\nما عندي = I don't have\nفي + pronoun also means 'there is': في كتاب = there's a book"},
]}/>);}

function Guide28(){return(<SimpleGuide items={[
  {h:"Numbers 1-10",b:"١ واحد · ٢ اثنان · ٣ ثلاثة · ٤ أربعة · ٥ خمسة\n٦ ستّة · ٧ سبعة · ٨ ثمانية · ٩ تسعة · ١٠ عشرة"},
  {h:"⚠ The gender REVERSAL (3-10)",b:"With masculine nouns: use FEMININE number form\nثلاثةُ كُتُبٍ = three books (كتاب is masc, so ثلاثة with ة)\nWith feminine nouns: use MASCULINE number form\nثلاثُ مُدَرِّساتٍ = three female teachers (no ة!)"},
  {h:"Numbers 11-19 & beyond",b:"11-12 agree normally. 13-19: same reverse rule + counted noun is singular accusative indefinite.\nعِشرون 20, ثلاثون 30... تِسعون 90, مِئة 100, ألف 1000"},
  {h:"🇵🇸 Palestinian numbers",b:"Often use same forms but simplified: تلاتة tlāte (3), أربعة arba'a (4)\nGender reversal is less strict in daily speech"},
]}/>);}

function Guide29(){return(<div>
  <DarkBox title="One Language, Many Voices"><div style={{fontSize:13,lineHeight:1.6}}>
    <strong style={{color:"#FFE77A"}}>MSA</strong> (Modern Standard Arabic) is the formal written/broadcast standard. <strong style={{color:"#90CAF9"}}>Dialects</strong> are what people actually speak at home.
  </div></DarkBox>
  <SimpleGuide items={[
    {h:"Major dialect families",b:"🇪🇬 Egyptian — most widely understood (media influence)\n🇵🇸🇱🇧🇸🇾🇯🇴 Levantine — Palestinian, Lebanese, Syrian, Jordanian\n🇸🇦🇦🇪🇰🇼 Gulf — Saudi, Emirati, Kuwaiti\n🇲🇦🇩🇿🇹🇳 Maghrebi — Moroccan, Algerian, Tunisian"},
    {h:"🇵🇸 Palestinian Arabic highlights",b:"قاف → glottal stop: قال → آل ('he said')\nكاف feminine → often /tsh/: كيف حالك → kīf ḥālech\nFuture: رح raḥ + verb (رح أكتب = I will write)\nNegation: ما...ش frame (ما بعرفش = I don't know)"},
    {h:"Key differences across dialects",b:"'What': MSA ماذا · Egyptian إيه · Palestinian شو · Moroccan شنو\n'Now': MSA الآن · Egyptian دلوقتي · Palestinian هلّأ · Gulf الحين\n'Want': MSA أريد · Egyptian عايز · Palestinian بدّي · Gulf أبي"},
    {h:"Strategy: learn MSA + one dialect",b:"MSA for reading, news, formal writing\nDialect for conversation, travel, connecting with people\nMost Arabs code-switch between the two fluently"},
  ]}/>
</div>);}

function Guide30(){
  const roots=[
    {root:"ك ت ب",meaning:"writing",words:[{ar:"كَتَبَ",tr:"kataba",m:"he wrote"},{ar:"كِتاب",tr:"kitāb",m:"book"},{ar:"كاتِب",tr:"kātib",m:"writer"},{ar:"مَكتوب",tr:"maktūb",m:"written/letter"},{ar:"مَكتَب",tr:"maktab",m:"office/desk"},{ar:"مَكتَبة",tr:"maktaba",m:"library"},{ar:"كِتابة",tr:"kitāba",m:"writing (act)"}]},
    {root:"د ر س",meaning:"studying",words:[{ar:"دَرَسَ",tr:"darasa",m:"he studied"},{ar:"دَرس",tr:"dars",m:"lesson"},{ar:"مُدَرِّس",tr:"mudarris",m:"teacher"},{ar:"مَدرَسة",tr:"madrasa",m:"school"},{ar:"دِراسة",tr:"dirāsa",m:"study"}]},
    {root:"ع ل م",meaning:"knowledge",words:[{ar:"عَلِمَ",tr:"'alima",m:"he knew"},{ar:"عِلم",tr:"'ilm",m:"science/knowledge"},{ar:"عالَم",tr:"'ālam",m:"world"},{ar:"عالِم",tr:"'ālim",m:"scholar"},{ar:"مُعَلِّم",tr:"mu'allim",m:"teacher"},{ar:"تَعليم",tr:"ta'līm",m:"education"},{ar:"مَعلومات",tr:"ma'lūmāt",m:"information"}]},
    {root:"ك ب ر",meaning:"bigness",words:[{ar:"كَبُرَ",tr:"kabura",m:"he grew big"},{ar:"كَبير",tr:"kabīr",m:"big"},{ar:"أَكبَر",tr:"akbar",m:"bigger/greatest"},{ar:"كِبار",tr:"kibār",m:"elders"},{ar:"تَكبير",tr:"takbīr",m:"magnification"}]},
    {root:"ح ب ب",meaning:"love",words:[{ar:"أَحَبَّ",tr:"aḥabba",m:"he loved"},{ar:"حُبّ",tr:"ḥubb",m:"love"},{ar:"حَبيب",tr:"ḥabīb",m:"beloved"},{ar:"مَحبوب",tr:"maḥbūb",m:"loved/popular"}]},
  ];
  const [selRoot,setSelRoot]=useState(0);
  const r=roots[selRoot];
  return(<div>
    <DarkBox title="The Root System — Arabic's Superpower"><div style={{fontSize:13,lineHeight:1.6}}>
      Most Arabic words derive from <strong style={{color:"#FFE77A"}}>3-consonant roots</strong>. Learn one root and you can recognize — or guess — dozens of related words.
    </div></DarkBox>
    <div style={{display:"flex",gap:5,marginBottom:14,justifyContent:"center",flexWrap:"wrap"}}>
      {roots.map((rt,i)=>(<button key={i} onClick={()=>setSelRoot(i)} style={{padding:"6px 12px",borderRadius:8,border:selRoot===i?"2.5px solid #1B5E20":"1.5px solid #ddd",background:selRoot===i?"#1B5E20":"#fff",color:selRoot===i?"#fff":"#555",cursor:"pointer",fontWeight:700,fontSize:13,fontFamily:"'Noto Sans Arabic',serif",direction:"rtl"}}>{rt.root}</button>))}
    </div>
    <Card color="#1B5E20" title={`Root: ${r.root}`} subtitle={r.meaning}>
      {r.words.map((w,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 80px 1fr",alignItems:"center",padding:"8px 14px",borderBottom:i<r.words.length-1?"1px solid #f0eeeb":"none",gap:8}}>
        <span style={{fontSize:20,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",direction:"rtl",textAlign:"center"}}>{w.ar}</span>
        <span style={{fontSize:12,color:"#888"}}>{w.tr}</span>
        <span style={{fontSize:12,color:"#555"}}>{w.m}</span>
      </div>))}
    </Card>
    <Insight text="This is why Arabic vocabulary builds exponentially. Learn the root ك-ت-ب and you instantly have hooks for book, writer, office, library, letter, writing..."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE COMPONENTS ARRAY
// ═══════════════════════════════════════════════════════════════
const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30];

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function ArabicGuide(){
  const [page,setPage]=useState(0);
  const [menuOpen,setMenuOpen]=useState(false);
  const contentRef=useRef(null);
  const meta=guidesMeta[page];
  const GuideComp=guideComponents[page];

  const goTo=(i)=>{setPage(i);setMenuOpen(false);if(contentRef.current)contentRef.current.scrollTop=0;};
  const prev=()=>{if(page>0)goTo(page-1);};
  const next=()=>{if(page<29)goTo(page+1);};

  useEffect(()=>{
    const handler=(e)=>{if(e.key==="ArrowLeft")prev();if(e.key==="ArrowRight")next();};
    window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler);
  });

  return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:"#FAF9F5",fontFamily:"'Segoe UI','Helvetica Neue',sans-serif",overflow:"hidden",position:"relative"}}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px}`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet"/>

      {/* TOP BAR */}
      <div style={{background:"#fff",borderBottom:"1px solid #eee",padding:"10px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,zIndex:10}}>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{width:36,height:36,borderRadius:10,border:"1.5px solid #e0ddd8",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#555",flexShrink:0}}>☰</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:800,color:"#1a1a1a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{meta.icon} {meta.title}</div>
          <div style={{fontSize:11,color:"#999"}}>{meta.subtitle}</div>
        </div>
        <div style={{background:meta.color,color:"#fff",padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:700,flexShrink:0}}>{page+1}/30</div>
      </div>

      {/* CONTENT */}
      <div ref={contentRef} style={{flex:1,overflow:"auto",padding:"16px",position:"relative"}}>
        <div key={page} style={{animation:"fadeIn 0.2s ease",maxWidth:700,margin:"0 auto"}}>
          <GuideComp/>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{background:"#fff",borderTop:"1px solid #eee",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <button onClick={prev} disabled={page===0} style={{padding:"8px 20px",borderRadius:10,border:"1.5px solid #e0ddd8",background:page===0?"#f5f5f5":"#fff",color:page===0?"#ccc":"#555",fontSize:13,fontWeight:700,cursor:page===0?"default":"pointer"}}>← Prev</button>
        <div style={{display:"flex",gap:2}}>
          {guidesMeta.map((_,i)=>(<div key={i} onClick={()=>goTo(i)} style={{width:i===page?14:4,height:4,borderRadius:2,background:i===page?meta.color:"#ddd",cursor:"pointer",transition:"all 0.2s"}}/>))}
        </div>
        <button onClick={next} disabled={page===29} style={{padding:"8px 20px",borderRadius:10,border:"1.5px solid #e0ddd8",background:page===29?"#f5f5f5":"#fff",color:page===29?"#ccc":"#555",fontSize:13,fontWeight:700,cursor:page===29?"default":"pointer"}}>Next →</button>
      </div>

      {/* SIDE MENU */}
      {menuOpen&&<div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:20}}/>}
      <div style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:"#fff",zIndex:30,transform:menuOpen?"translateX(0)":"translateX(-100%)",transition:"transform 0.25s ease",boxShadow:menuOpen?"4px 0 24px rgba(0,0,0,0.15)":"none",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"16px 20px",borderBottom:"1px solid #eee",flexShrink:0}}>
          <div style={{fontSize:18,fontWeight:800,color:"#1a1a1a"}}>دليل العربية</div>
          <div style={{fontSize:12,color:"#999"}}>30 Interactive Guides</div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"8px 0"}}>
          {categories.map(cat=>{
            const items=guidesMeta.filter(g=>g.cat===cat);
            return(<div key={cat}>
              <div style={{padding:"6px 20px",fontSize:10,fontWeight:700,color:catColors[cat],textTransform:"uppercase",letterSpacing:1.5,marginTop:4}}>{cat}</div>
              {items.map(g=>{const idx=g.id-1;const isActive=idx===page;return(
                <button key={g.id} onClick={()=>goTo(idx)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"8px 20px",border:"none",background:isActive?`${g.color}12`:"transparent",cursor:"pointer",textAlign:"left",borderLeft:isActive?`3px solid ${g.color}`:"3px solid transparent"}}>
                  <span style={{fontSize:14,width:22,textAlign:"center"}}>{g.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:isActive?800:600,color:isActive?g.color:"#333",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{g.subtitle}</div>
                    <div style={{fontSize:10,color:"#999",fontFamily:"'Noto Sans Arabic',serif",direction:"rtl"}}>{g.title}</div>
                  </div>
                  <span style={{fontSize:10,color:"#ccc",fontWeight:600}}>{g.id}</span>
                </button>
              );})}
            </div>);
          })}
        </div>
      </div>
    </div>
  );
}
