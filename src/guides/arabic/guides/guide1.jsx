import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakArabic } from '../../../utils/speech';

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

export function Guide1(){
  return(
    <AlphabetGrid
      letters={alphabet}
      letterKey="l"
      nameKey="n"
      filterGroups={[
        {id:"all",label:"All",filterFn:()=>true},
        {id:"normal",label:"Standard",filterFn:a=>a.cat==="normal"},
        {id:"throat",label:"Throat",filterFn:a=>a.cat==="throat"},
        {id:"emphatic",label:"Emphatic",filterFn:a=>a.cat==="emphatic"},
      ]}
      primaryColor="#1B5E20"
      accentBg="#FFF8E7"
      accentFn={a=>!a.connect}
      borderFn={a=>a.cat==="emphatic"?"2px solid #E65100":a.cat==="throat"?"2px solid #880E4F":null}
      badgeFn={a=>!a.connect?{color:"#D4A843"}:null}
      speakFn={speakArabic}
      gridMin="52px"
      gridProps={{direction:"rtl"}}
      renderDetail={(lt)=>(
        <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e8e5e0",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:"#1B5E20",padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
            <div onClick={()=>speakArabic(lt.l)} style={{fontSize:48,fontWeight:700,color:"#FFE77A",fontFamily:"'Noto Sans Arabic','Amiri',serif",lineHeight:1,minWidth:50,textAlign:"center",cursor:"pointer"}} title="Click to hear">{lt.l}</div>
            <div><div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>Name: <strong style={{color:"#fff"}}>{lt.n}</strong> · Transliteration: <strong style={{color:"#FFE77A"}}>{lt.tr}</strong></div>
              <div style={{color:"#FFE77A",fontSize:13,fontFamily:"monospace",marginTop:2}}>{lt.ipa}</div></div>
          </div>
          <div style={{padding:"14px 18px"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
              {[{label:"Isolated",form:lt.iso},{label:"Initial",form:lt.ini},{label:"Medial",form:lt.med},{label:"Final",form:lt.fin}].map(f=>(<div key={f.label} style={{textAlign:"center",padding:"10px 4px",background:"#FAFAF5",borderRadius:8,border:"1px solid #eee"}}>
                <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1B5E20",lineHeight:1.3}}>{f.form}</div>
                <div style={{fontSize:9,color:"#999",marginTop:4}}>{f.label}</div>
              </div>))}
            </div>
            {!lt.connect&&<div style={{background:"#FFF8E7",borderRadius:8,padding:"8px 12px",border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914",marginBottom:8}}>⚠ This letter does NOT connect to the following letter</div>}
            {lt.pal&&<div style={{background:"#E8F5E9",borderRadius:8,padding:"8px 12px",border:"1px solid #C8E6C9",fontSize:12,color:"#2E7D32"}}>🇵🇸 {lt.pal}</div>}
          </div>
        </div>
      )}
      footerContent={
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",fontSize:10,color:"#aaa"}}>
          <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#FFF8E7",border:"1px solid #F0E4C4"}}/>Non-connecting</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#880E4F"}}/>Throat sound</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#E65100"}}/>Emphatic</span>
        </div>
      }
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: SHORT VOWELS & DIACRITICS
// ═══════════════════════════════════════════════════════════════
