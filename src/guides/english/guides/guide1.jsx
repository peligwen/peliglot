import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakEnglish } from '../../../utils/speech';

const engLetters=[
  {l:"A",sounds:["/æ/ cat","/eɪ/ cake","/ɑː/ car","/ɔː/ call","/ə/ about"],tricky:true,type:"vowel",tip:"¡5+ sonidos diferentes! En español la 'a' siempre suena igual."},
  {l:"B",sounds:["/b/ big"],tricky:false,type:"consonant",tip:"Igual que en español, pero nunca se suaviza entre vocales."},
  {l:"C",sounds:["/k/ cat","/s/ city"],tricky:true,type:"consonant",tip:"Antes de e/i = /s/. Antes de a/o/u = /k/. Similar al español."},
  {l:"D",sounds:["/d/ dog"],tricky:false,type:"consonant",tip:"Siempre duro. Nunca se suaviza a /ð/ como en español."},
  {l:"E",sounds:["/ɛ/ bed","/iː/ be","/ə/ the","/ɪ/ pretty"],tricky:true,type:"vowel",tip:"La 'e' muda al final de palabra es MUY común: cake, make, time."},
  {l:"F",sounds:["/f/ fish"],tricky:false,type:"consonant",tip:"Igual que en español."},
  {l:"G",sounds:["/ɡ/ go","/dʒ/ gym"],tricky:true,type:"consonant",tip:"Antes de e/i a veces = /dʒ/ (como 'judge'). ¡NO es la J española!"},
  {l:"H",sounds:["/h/ hat"],tricky:true,type:"consonant",tip:"¡Se PRONUNCIA! Al contrario del español donde la H es muda."},
  {l:"I",sounds:["/ɪ/ sit","/aɪ/ time","/iː/ machine","/ə/ pencil"],tricky:true,type:"vowel",tip:"Puede ser /ɪ/ (corta), /aɪ/ (como 'ai'), o /iː/ (larga)."},
  {l:"J",sounds:["/dʒ/ judge"],tricky:true,type:"consonant",tip:"Sonido /dʒ/ — como 'ch' pero con vibración. NO es la J española."},
  {l:"K",sounds:["/k/ king"],tricky:false,type:"consonant",tip:"Muda antes de N: know, knee, knife."},
  {l:"L",sounds:["/l/ love"],tricky:false,type:"consonant",tip:"La 'dark L' al final (ball, feel) es más gruesa que en español."},
  {l:"M",sounds:["/m/ man"],tricky:false,type:"consonant",tip:"Igual que en español."},
  {l:"N",sounds:["/n/ no","/ŋ/ sing"],tricky:false,type:"consonant",tip:"El grupo -NG hace /ŋ/ (sing, ring) — un sonido nasal sin 'g' separada."},
  {l:"O",sounds:["/ɑː/ not","/oʊ/ note","/uː/ do","/ə/ from"],tricky:true,type:"vowel",tip:"La 'o' en 'note' es un diptongo /oʊ/, no una 'o' pura como en español."},
  {l:"P",sounds:["/p/ pen"],tricky:false,type:"consonant",tip:"Con aspiración (soplo de aire). La P española no tiene aspiración."},
  {l:"Q",sounds:["/kw/ queen"],tricky:false,type:"consonant",tip:"Siempre seguida de U. Suena /kw/."},
  {l:"R",sounds:["/ɹ/ red"],tricky:true,type:"consonant",tip:"La R inglesa NO vibra. La lengua se curva hacia atrás sin tocar nada."},
  {l:"S",sounds:["/s/ sun","/z/ is, has"],tricky:true,type:"consonant",tip:"Puede ser /z/ (con vibración) entre vocales y en muchas terminaciones."},
  {l:"T",sounds:["/t/ top","/ɾ/ butter"],tricky:false,type:"consonant",tip:"Con aspiración. Entre vocales puede sonar como la R española: 'butter' = 'barer'."},
  {l:"U",sounds:["/ʌ/ cup","/uː/ blue","/ʊ/ put","/juː/ use"],tricky:true,type:"vowel",tip:"4 sonidos posibles. /ʌ/ en 'cup' no existe en español."},
  {l:"V",sounds:["/v/ very"],tricky:true,type:"consonant",tip:"¡Dientes superiores tocan labio inferior! En español B y V suenan igual. En inglés son DIFERENTES."},
  {l:"W",sounds:["/w/ water"],tricky:false,type:"consonant",tip:"Muda en: write, wrong, wrist, wrap."},
  {l:"X",sounds:["/ks/ box","/ɡz/ exam"],tricky:false,type:"consonant",tip:"/ks/ al final, /ɡz/ antes de vocal acentuada."},
  {l:"Y",sounds:["/j/ yes","/aɪ/ my","/ɪ/ gym"],tricky:false,type:"consonant",tip:"Como consonante = /j/ (yes). Como vocal = /aɪ/ (my) o /ɪ/ (gym)."},
  {l:"Z",sounds:["/z/ zoo"],tricky:true,type:"consonant",tip:"Siempre con vibración /z/. NO es la Z española (/s/ o /θ/)."},
];

export function Guide1(){
  return(
    <AlphabetGrid
      letters={engLetters}
      letterKey="l"
      nameKey="type"
      filterGroups={[
        {id:"all",label:"Todas (26)",filterFn:()=>true},
        {id:"vowel",label:"Vocales (5)",filterFn:l=>l.type==="vowel"},
        {id:"consonant",label:"Consonantes (21)",filterFn:l=>l.type==="consonant"},
        {id:"tricky",label:"⚠ Problemáticas",filterFn:l=>l.tricky},
      ]}
      primaryColor="#1565C0"
      accentBg="#FFEBEE"
      accentFn={l=>l.type==="vowel"}
      badgeFn={l=>l.tricky?{color:"#E65100"}:null}
      borderFn={l=>l.tricky?"2px solid #E65100":null}
      speakFn={speakEnglish}
      gridMin="48px"
      introTitle="El problema fundamental"
      introContent={<div style={{fontSize:14,lineHeight:1.6}}>
        En español, una letra = un sonido. En inglés, la letra <strong style={{color:"#EF9A9A"}}>"A"</strong> sola hace <strong style={{color:"#FFE77A"}}>5+ sonidos diferentes</strong>. Toca cualquier letra para ver todos sus sonidos.
      </div>}
      renderDetail={(lt)=>(
        <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #e0dcd5",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:"#1565C0",padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:42,fontWeight:800,color:"#FFE77A",lineHeight:1}}>{lt.l}</div>
            <div><div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{lt.sounds.length} sonido{lt.sounds.length>1?"s":""} posible{lt.sounds.length>1?"s":""}</div></div>
          </div>
          <div style={{padding:"12px 16px"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {lt.sounds.map((s,i)=>{const word=s.replace(/^\/[^/]*\/\s*/,"");return(<span key={i} onClick={(e)=>{e.stopPropagation();speakEnglish(word)}} style={{padding:"5px 12px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:13,fontWeight:700,border:"1px solid #BBDEFB",cursor:"pointer"}}>🔊 {s}</span>);})}
            </div>
            <div style={{background:"#FFF8E7",borderRadius:8,padding:"8px 12px",border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914"}}>{lt.tip}</div>
          </div>
        </div>
      )}
      footerContent={
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",fontSize:10,color:"#aaa"}}>
          <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:10,height:10,borderRadius:3,background:"#FFEBEE",border:"1px solid #FFCDD2"}}/>Vocal</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:5,height:5,borderRadius:"50%",background:"#E65100"}}/>Problemática</span>
          <span>Toca cualquier letra para ver detalles</span>
        </div>
      }
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// GUÍA 2: SONIDOS VOCÁLICOS — EXPLORADOR INTERACTIVO
// ═══════════════════════════════════════════════════════════════
