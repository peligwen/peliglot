import { useState } from 'react';
import { Card } from '../../components/Card';
import { DarkBox } from '../../components/DarkBox';
import { Insight } from '../../components/Insight';
import { SimpleGuide } from '../../components/SimpleGuide';
import { ExpandSection } from '../../components/ExpandSection';
import { AlphabetGrid } from '../../components/templates/AlphabetGrid';
import { speakGerman } from '../../utils/speech';

// GUIDE 1: ALPHABET — INTERACTIVE GRID
// ═══════════════════════════════════════════════════════════════
const germanLetters=[
  {l:"Ä ä",n:"A-Umlaut",ipa:"/ɛ/",approx:"Like 'e' in 'bed'",tip:"Pronounce 'a' but spread lips like 'e'. Short: Äpfel. Long: Mädchen.",type:"umlaut",color:"#C62828"},
  {l:"Ö ö",n:"O-Umlaut",ipa:"/ø/",approx:"No English equivalent",tip:"Make 'o' lips, try to say 'e'. The sound between them. Short: können. Long: schön.",type:"umlaut",color:"#C62828"},
  {l:"Ü ü",n:"U-Umlaut",ipa:"/y/",approx:"No English equivalent",tip:"Make 'oo' lips, try to say 'ee'. The sound between them. Short: müssen. Long: Tür.",type:"umlaut",color:"#C62828"},
  {l:"ß",n:"Eszett",ipa:"/s/",approx:"Always voiceless /s/",tip:"After LONG vowels/diphthongs: Straße, heißen, groß. After SHORT vowels use ss: Wasser, müssen.",type:"special",color:"#1565C0"},
  {l:"CH",n:"ich/ach-Laut",ipa:"/ç/ or /x/",approx:"Hissing (ich) or throat (ach)",tip:"After e,i,ä,ö,ü,consonants: soft /ç/ (ich, recht). After a,o,u,au: rough /x/ (Bach, noch).",type:"digraph",color:"#2E7D32"},
  {l:"SCH",n:"sch",ipa:"/ʃ/",approx:"Like English 'sh'",tip:"schön, Schule, Fisch. At word start, sp- and st- also become /ʃp/ and /ʃt/: sprechen, Straße.",type:"digraph",color:"#2E7D32"},
  {l:"R",n:"German R",ipa:"/ʁ/",approx:"Uvular — throat gargle",tip:"NOT the English R. Produced in the throat like a soft gargle. Similar to French R. At word end often becomes /ɐ/: Vater = /faːtɐ/.",type:"special",color:"#6A1B9A"},
  {l:"W",n:"German W",ipa:"/v/",approx:"Like English 'V'!",tip:"Wasser = /vasser/. German W = English V. This trips up everyone.",type:"swap",color:"#E65100"},
  {l:"V",n:"German V",ipa:"/f/ usually",approx:"Like English 'F'!",tip:"Vater = /faːtɐ/, Vogel = /foːɡəl/. In some foreign words: /v/ (Vase, Violine).",type:"swap",color:"#E65100"},
  {l:"Z",n:"German Z",ipa:"/ts/",approx:"Like 'ts' in 'cats'",tip:"Even at the start: Zeit = /tsaɪt/, zehn = /tseːn/. Never the English /z/ sound.",type:"swap",color:"#E65100"},
  {l:"S",n:"German S",ipa:"/z/ before vowels",approx:"Buzzes before vowels!",tip:"Sonne = /zɔnə/, sein = /zaɪn/. Before consonants or at end: /s/. The reverse of what you'd expect.",type:"swap",color:"#E65100"},
  {l:"EI",n:"ei/ai",ipa:"/aɪ/",approx:"Like 'eye'",tip:"mein, Wein, Mai, Kaiser. The SECOND letter tells you: EI = 'eye' sound.",type:"diphthong",color:"#880E4F"},
  {l:"IE",n:"ie",ipa:"/iː/",approx:"Like 'ee'",tip:"Bier, Liebe, Spiel. IE = 'ee' sound. EI vs IE is the #1 spelling trap.",type:"diphthong",color:"#880E4F"},
  {l:"EU/ÄU",n:"eu/äu",ipa:"/ɔɪ/",approx:"Like 'oy' in 'boy'",tip:"Freund, neu, Häuser, Bäume. EU and ÄU sound identical.",type:"diphthong",color:"#880E4F"},
  {l:"AU",n:"au",ipa:"/aʊ/",approx:"Like 'ow' in 'cow'",tip:"Haus, Frau, Baum, laut.",type:"diphthong",color:"#880E4F"},
];

function Guide1(){
  return(
    <AlphabetGrid
      letters={germanLetters}
      letterKey="l"
      nameKey="n"
      filterGroups={[
        {id:"all",label:"All",filterFn:()=>true},
        {id:"umlaut",label:"Umlauts",filterFn:l=>l.type==="umlaut"},
        {id:"special",label:"Special",filterFn:l=>l.type==="special"},
        {id:"swap",label:"W/V/Z/S Swaps",filterFn:l=>l.type==="swap"},
        {id:"digraph",label:"CH/SCH",filterFn:l=>l.type==="digraph"},
        {id:"diphthong",label:"Diphthongs",filterFn:l=>l.type==="diphthong"},
      ]}
      primaryColor="#1a1a1a"
      speakFn={speakGerman}
      gridMin="64px"
      introTitle="26 letters + 4 special characters"
      introContent={<div style={{fontSize:14,lineHeight:1.6}}>
        German uses the English alphabet plus <strong style={{color:"#FFE77A"}}>ä, ö, ü</strong> (umlauts) and <strong style={{color:"#FFE77A"}}>ß</strong> (Eszett). Several consonants also sound different than English. Tap any to explore.
      </div>}
      renderDetail={(lt)=>(
        <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${lt.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
          <div style={{background:lt.color,padding:"14px 18px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{fontSize:36,fontWeight:800,color:"#FFE77A"}}>{lt.l}</div>
            <div><div style={{color:"#FFE77A",fontSize:15,fontFamily:"monospace"}}>{lt.ipa}</div><div style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>{lt.approx}</div></div>
          </div>
          <div style={{padding:"12px 16px",fontSize:13,color:"#555",lineHeight:1.6}}>{lt.tip}</div>
        </div>
      )}
      footerContent={<Insight text="EI = 'eye' sound (mein, Wein). IE = 'ee' sound (Bier, Liebe). The SECOND letter tells you the sound. This is the #1 German spelling trap." />}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 2: VOWELS — LENGTH MATTERS
// ═══════════════════════════════════════════════════════════════
const vowelPairsDE=[
  {short:"Stadt /a/",shortM:"city",long:"Staat /aː/",longM:"state",color:"#C62828"},
  {short:"offen /ɔ/",shortM:"open",long:"Ofen /oː/",longM:"oven",color:"#1565C0"},
  {short:"Bett /ɛ/",shortM:"bed",long:"Beet /eː/",longM:"flowerbed",color:"#2E7D32"},
  {short:"Mitte /ɪ/",shortM:"middle",long:"Miete /iː/",longM:"rent",color:"#6A1B9A"},
  {short:"Mutter /ʊ/",shortM:"mother",long:"Mut /uː/",longM:"courage",color:"#E65100"},
];

function Guide2(){
  return(<div>
    <DarkBox title="Vowel length changes meaning"><div style={{fontSize:14}}>
      German vowels are either <strong style={{color:"#FFE77A"}}>short (clipped)</strong> or <strong style={{color:"#FFE77A"}}>long (held)</strong>. Rule: vowel before a <strong>single</strong> consonant = long. Before <strong>double</strong> consonants = short.
    </div></DarkBox>
    <Card color="#C62828" title="Minimal pairs: short vs long">
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>Short vowel</div><div></div><div>Long vowel</div>
      </div>
      {vowelPairsDE.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",padding:"8px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <div><div style={{fontSize:14,fontWeight:700,color:p.color}}>{p.short}</div><div style={{fontSize:11,color:"#888"}}>{p.shortM}</div></div>
        <div style={{fontSize:14,color:"#ccc",margin:"0 10px"}}>vs</div>
        <div><div style={{fontSize:14,fontWeight:700,color:p.color}}>{p.long}</div><div style={{fontSize:11,color:"#888"}}>{p.longM}</div></div>
      </div>))}
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
      {[{l:"Ä",short:"/ɛ/ Äpfel",long:"/ɛː/ Mädchen",color:"#C62828"},{l:"Ö",short:"/œ/ können",long:"/øː/ schön",color:"#1565C0"},{l:"Ü",short:"/ʏ/ müssen",long:"/yː/ Tür",color:"#2E7D32"}].map(u=>(<div key={u.l} style={{background:"#fff",borderRadius:10,padding:"10px",border:`2px solid ${u.color}30`,textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:800,color:u.color}}>{u.l}</div>
        <div style={{fontSize:10,color:"#888",marginTop:4}}>Short: {u.short}</div>
        <div style={{fontSize:10,color:"#888"}}>Long: {u.long}</div>
      </div>))}
    </div>
    <Insight text="Ö and Ü have NO English equivalent. Ö = round your lips for 'o' but try to say 'e'. Ü = round your lips for 'oo' but try to say 'ee'. Practice in the mirror." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 3: CONSONANTS — TAP TO EXPLORE
// ═══════════════════════════════════════════════════════════════
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

function Guide3(){
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
function Guide4(){
  const groups=[
    {label:"Native words: stress syllable 1",examples:[{w:"ÁR·bei·ten",m:"to work"},{w:"FRÜH·stück",m:"breakfast"},{w:"WÓH·nung",m:"apartment"},{w:"FÉN·ster",m:"window"}],color:"#1a1a1a"},
    {label:"Separable prefixes: prefix gets stress",examples:[{w:"ÁN·ru·fen",m:"to call"},{w:"ÁUF·ste·hen",m:"to get up"},{w:"MÍT·kom·men",m:"to come along"},{w:"ÉIN·kau·fen",m:"to shop"}],color:"#1565C0"},
    {label:"Inseparable prefixes: root gets stress",examples:[{w:"ver·STÉ·hen",m:"to understand"},{w:"er·ZÄ́H·len",m:"to narrate"},{w:"be·SÚ·chen",m:"to visit"},{w:"ent·SCHÚL·di·gen",m:"to excuse"}],color:"#C62828"},
    {label:"Foreign words: keep original stress",examples:[{w:"Stu·DÉNT",m:"student"},{w:"Te·le·FÓN",m:"telephone"},{w:"Re·stau·RÁNT",m:"restaurant"},{w:"U·ni·ver·si·TÄ́T",m:"university"}],color:"#2E7D32"},
  ];
  return(<div>
    {groups.map((g,gi)=>(<Card key={gi} color={g.color} title={g.label}>
      {g.examples.map((e,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<g.examples.length-1?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:16,fontWeight:700,color:g.color,fontFamily:"monospace"}}>{e.w}</span>
        <span style={{fontSize:12,color:"#888"}}>{e.m}</span>
      </div>))}
    </Card>))}
    <Insight text="If you see a separable prefix (an-, auf-, mit-, ein-), stress it. If you see be-, ver-, er-, ent-, ge-, stress the ROOT instead. This rule covers most German words." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 5-9: CASES — THE BIG ONE
// ═══════════════════════════════════════════════════════════════
const caseData={
  nom:{name:"Nominativ",role:"Subject — who does it",der:"der",die:"die",das:"das",diePl:"die",ein:"ein",eine:"eine",einN:"ein",color:"#1565C0"},
  akk:{name:"Akkusativ",role:"Direct object — whom/what",der:"den",die:"die",das:"das",diePl:"die",ein:"einen",eine:"eine",einN:"ein",color:"#C62828"},
  dat:{name:"Dativ",role:"Indirect object — to/for whom",der:"dem",die:"der",das:"dem",diePl:"den (+n)",ein:"einem",eine:"einer",einN:"einem",color:"#E65100"},
  gen:{name:"Genitiv",role:"Possession — whose",der:"des (+s)",die:"der",das:"des (+s)",diePl:"der",ein:"eines (+s)",eine:"einer",einN:"eines (+s)",color:"#00695C"},
};

function Guide5(){
  const [activeCase,setActiveCase]=useState("nom");
  const c=caseData[activeCase];
  return(<div>
    <DarkBox title="Why cases exist"><div style={{fontSize:14,lineHeight:1.6}}>
      Cases tell you <strong style={{color:"#FFE77A"}}>what role each noun plays</strong>. English uses word order. German uses <strong style={{color:"#FFE77A"}}>article changes</strong> — which means word order is much more flexible.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
      {Object.entries(caseData).map(([k,v])=>(<button key={k} onClick={()=>setActiveCase(k)} style={{padding:"10px 4px",borderRadius:10,border:activeCase===k?`2.5px solid ${v.color}`:"1.5px solid #ddd",background:activeCase===k?v.color:"#fff",color:activeCase===k?"#fff":"#555",cursor:"pointer",textAlign:"center"}}>
        <div style={{fontSize:13,fontWeight:800}}>{v.name}</div>
        <div style={{fontSize:9,opacity:.7,marginTop:2}}>{v.role.split(" — ")[0]}</div>
      </button>))}
    </div>
    <Card color={c.color} title={c.name} subtitle={c.role}>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div><div>Masc</div><div>Fem</div><div>Neut</div><div>Plural</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px",borderBottom:"1px solid #f0eeeb"}}>
        <span style={{fontSize:11,color:"#888"}}>definite</span>
        <span style={{fontWeight:700,color:c.color}}>{c.der}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.die}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.das}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.diePl}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr 1fr",padding:"8px 14px"}}>
        <span style={{fontSize:11,color:"#888"}}>indefinite</span>
        <span style={{fontWeight:700,color:c.color}}>{c.ein}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.eine}</span>
        <span style={{fontWeight:700,color:c.color}}>{c.einN}</span>
        <span style={{fontWeight:700,color:"#aaa"}}>—</span>
      </div>
    </Card>
    <Insight text="English has case remnants too: I/me/my, he/him/his, who/whom/whose. German just applies this to EVERY noun through article changes." />
  </div>);
}

function Guide6(){
  const changes=[
    {g:"Masculine",nom:"der / ein",akk:"den / einen",changed:true},
    {g:"Feminine",nom:"die / eine",akk:"die / eine",changed:false},
    {g:"Neuter",nom:"das / ein",akk:"das / ein",changed:false},
    {g:"Plural",nom:"die / —",akk:"die / —",changed:false},
  ];
  return(<div>
    <Card color="#1565C0" title="Nominativ → Akkusativ" subtitle="Only masculine changes!">
      {changes.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 30px 1fr",padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:12,fontWeight:700,color:c.changed?"#C62828":"#555"}}>{c.g}</span>
        <span style={{fontSize:14,color:"#888"}}>{c.nom}</span>
        <span style={{color:"#ccc",textAlign:"center"}}>→</span>
        <span style={{fontSize:14,fontWeight:c.changed?800:400,color:c.changed?"#C62828":"#888"}}>{c.akk}</span>
      </div>))}
    </Card>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#1565C0",marginBottom:6}}>Accusative prepositions (always accusative):</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {[{p:"für",m:"for"},{p:"gegen",m:"against"},{p:"ohne",m:"without"},{p:"um",m:"around"},{p:"durch",m:"through"},{p:"bis",m:"until"}].map(x=>(<span key={x.p} style={{padding:"4px 10px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:12,fontWeight:700,border:"1px solid #BBDEFB"}}>{x.p} <span style={{fontWeight:400,color:"#888"}}>({x.m})</span></span>))}
      </div>
      <div style={{fontSize:11,color:"#888",marginTop:6}}>Mnemonic: <strong>DOGFU</strong> — durch, ohne, gegen, für, um</div>
    </div>
    <Insight text="Good news: ONLY masculine articles change from Nominativ to Akkusativ. der→den, ein→einen. Everything else stays identical." />
  </div>);
}

function Guide7(){
  const datArts=[{g:"Masc",art:"dem / einem"},{g:"Fem",art:"der / einer"},{g:"Neut",art:"dem / einem"},{g:"Plural",art:"den (+n) / —"}];
  const datPreps=[{p:"aus",m:"from/out of"},{p:"bei",m:"at/near"},{p:"mit",m:"with"},{p:"nach",m:"after/to"},{p:"seit",m:"since"},{p:"von",m:"from/of"},{p:"zu",m:"to"}];
  const datVerbs=[{v:"helfen",m:"to help",ex:"Ich helfe dem Mann."},{v:"danken",m:"to thank",ex:"Ich danke dir."},{v:"gefallen",m:"to please",ex:"Das Buch gefällt mir."},{v:"gehören",m:"to belong to",ex:"Das gehört dem Kind."}];
  return(<div>
    <Card color="#E65100" title="Dativ articles" subtitle="Everything changes">
      {datArts.map((a,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:600,color:"#333"}}>{a.g}</span><span style={{fontWeight:700,color:"#E65100"}}>{a.art}</span>
      </div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
      {datPreps.map(x=>(<span key={x.p} style={{padding:"5px 12px",borderRadius:8,background:"#FFF3E0",color:"#E65100",fontSize:13,fontWeight:700,border:"1px solid #FFCC80"}}>{x.p} <span style={{fontWeight:400,color:"#888",fontSize:11}}>({x.m})</span></span>))}
    </div>
    <div style={{fontSize:11,color:"#888",marginBottom:12,textAlign:"center"}}>Mnemonic: <strong>Aus bei mit nach seit von zu</strong> — mit dem Dativ nur so zu!</div>
    <Card color="#E65100" title="Dative verbs" subtitle="The object MUST be dative">
      {datVerbs.map((v,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#E65100"}}>{v.v}</span> <span style={{color:"#888"}}>({v.m})</span><br/>
        <span style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{v.ex}</span>
      </div>))}
    </Card>
    <Insight text="ALL nouns add -n in dative plural (if they don't already end in -n or -s): die Kinder → mit den Kindern, die Häuser → in den Häusern." />
  </div>);
}

function Guide8(){
  const preps=["an","auf","hinter","in","neben","über","unter","vor","zwischen"];
  const [mode,setMode]=useState("akk");
  const akkEx=[{p:"in",ex:"Ich gehe in den Park.",m:"I'm going into the park."},{p:"auf",ex:"Er legt das Buch auf den Tisch.",m:"He puts the book onto the table."},{p:"an",ex:"Sie hängt das Bild an die Wand.",m:"She hangs the picture on the wall."}];
  const datEx=[{p:"in",ex:"Ich bin in dem (im) Park.",m:"I'm in the park."},{p:"auf",ex:"Das Buch liegt auf dem Tisch.",m:"The book is on the table."},{p:"an",ex:"Das Bild hängt an der Wand.",m:"The picture hangs on the wall."}];
  const examples=mode==="akk"?akkEx:datEx;
  return(<div>
    <DarkBox title="9 prepositions, 2 possible cases"><div style={{fontSize:14}}>
      <strong style={{color:"#EF9A9A"}}>Motion/direction → Akkusativ (wohin?)</strong><br/>
      <strong style={{color:"#90CAF9"}}>Location/state → Dativ (wo?)</strong>
    </div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:12,justifyContent:"center"}}>
      <button onClick={()=>setMode("akk")} style={{padding:"8px 18px",borderRadius:10,border:mode==="akk"?"2.5px solid #C62828":"1.5px solid #ddd",background:mode==="akk"?"#C62828":"#fff",color:mode==="akk"?"#fff":"#666",cursor:"pointer",fontWeight:700}}>Akkusativ (wohin? →)</button>
      <button onClick={()=>setMode("dat")} style={{padding:"8px 18px",borderRadius:10,border:mode==="dat"?"2.5px solid #1565C0":"1.5px solid #ddd",background:mode==="dat"?"#1565C0":"#fff",color:mode==="dat"?"#fff":"#666",cursor:"pointer",fontWeight:700}}>Dativ (wo? •)</button>
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:14}}>
      {preps.map(p=>(<span key={p} style={{padding:"6px 12px",borderRadius:16,background:mode==="akk"?"#FFEBEE":"#E3F2FD",color:mode==="akk"?"#C62828":"#1565C0",fontSize:14,fontWeight:700,border:"1px solid "+(mode==="akk"?"#FFCDD2":"#BBDEFB")}}>{p}</span>))}
    </div>
    <Card color={mode==="akk"?"#C62828":"#1565C0"} title={mode==="akk"?"Akkusativ = movement INTO/ONTO":"Dativ = already THERE"}>
      {examples.map((e,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <div style={{fontSize:14,fontWeight:700,color:mode==="akk"?"#C62828":"#1565C0",fontStyle:"italic"}}>{e.ex}</div>
        <div style={{fontSize:12,color:"#888"}}>{e.m}</div>
      </div>))}
    </Card>
    <Insight text="If there's a CHANGE of position (going somewhere) = accusative. If the position is STATIC (being somewhere) = dative." />
  </div>);
}

function Guide9(){return(<div>
  <Card color="#00695C" title="Genitiv articles" subtitle="Possession — 'whose'">
    {[{g:"Masculine",art:"des Mannes (+s on noun)"},{g:"Feminine",art:"der Frau"},{g:"Neuter",art:"des Kindes (+s on noun)"},{g:"Plural",art:"der Kinder"}].map((a,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <span style={{fontWeight:600}}>{a.g}</span><span style={{fontWeight:700,color:"#00695C"}}>{a.art}</span>
    </div>))}
  </Card>
  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
    {[{p:"wegen",m:"because of"},{p:"trotz",m:"despite"},{p:"während",m:"during"},{p:"statt",m:"instead of"}].map(x=>(<span key={x.p} style={{padding:"5px 12px",borderRadius:8,background:"#E0F2F1",color:"#00695C",fontSize:13,fontWeight:700,border:"1px solid #B2DFDB"}}>{x.p} <span style={{fontWeight:400,color:"#888",fontSize:11}}>({x.m})</span></span>))}
  </div>
  <DarkBox title="The spoken reality"><div style={{fontSize:13,lineHeight:1.6}}>
    Genitiv is fading in everyday speech. <strong style={{color:"#FFE77A"}}>"Des Mannes Auto"</strong> (formal) → <strong style={{color:"#EF9A9A"}}>"dem Mann sein Auto"</strong> (colloquial). <strong style={{color:"#FFE77A"}}>"Wegen des Wetters"</strong> → <strong style={{color:"#EF9A9A"}}>"Wegen dem Wetter"</strong>.
    <br/><span style={{color:"#aaa",fontSize:12}}>Know genitiv for reading. Use dative in conversation.</span>
  </div></DarkBox>
  <Insight text="'Der Dativ ist dem Genitiv sein Tod' = 'The dative is the genitive's death' — a famous book title that demonstrates the very trend it describes." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 10-14: NOUNS
// ═══════════════════════════════════════════════════════════════
const genderRules=[
  {g:"Masculine (der)",color:"#1565C0",items:["Male people/animals: der Mann, der Hund","Days/months/seasons: der Montag, der Sommer","-er agent nouns: der Lehrer, der Fahrer","-ling ending: der Frühling, der Schmetterling","Car brands: der BMW, der Mercedes"]},
  {g:"Feminine (die)",color:"#C62828",items:["-ung (always!): die Wohnung, die Zeitung","-heit/-keit: die Freiheit, die Möglichkeit","-schaft: die Freundschaft, die Wirtschaft","-tion/-sion: die Nation, die Information","-ie: die Energie, die Demokratie"]},
  {g:"Neuter (das)",color:"#2E7D32",items:["-chen/-lein diminutives (always!): das Mädchen","-ment: das Dokument, das Instrument","Ge- collectives: das Gebäude, das Gebirge","Infinitives as nouns: das Essen, das Leben","Metals: das Gold, das Silber, das Eisen"]},
];

function Guide10(){
  const [activeG,setActiveG]=useState(0);
  const g=genderRules[activeG];
  return(<div>
    <DarkBox title="The hard truth"><div style={{fontSize:14}}>There is no perfect system. You <strong style={{color:"#EF9A9A"}}>must memorize der/die/das with every noun</strong>. But these patterns cover ~70% of cases.</div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:14}}>
      {genderRules.map((gr,i)=>(<button key={i} onClick={()=>setActiveG(i)} style={{padding:"10px 6px",borderRadius:10,border:activeG===i?`2.5px solid ${gr.color}`:"1.5px solid #ddd",background:activeG===i?gr.color:"#fff",color:activeG===i?"#fff":"#555",cursor:"pointer",textAlign:"center",fontWeight:700,fontSize:13}}>{gr.g.split(" (")[0]}</button>))}
    </div>
    <Card color={g.color} title={g.g}>
      {g.items.map((item,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<g.items.length-1?"1px solid #f0eeeb":"none",fontSize:13,color:"#555"}}>{item}</div>))}
    </Card>
    <Insight text="Always learn nouns as: der Tisch, die Lampe, das Buch — never just 'Tisch, Lampe, Buch'. The article IS part of the word." />
  </div>);
}

function Guide11(){
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

function Guide12(){
  const compounds=[
    {parts:["Hand","Schuh"],word:"Handschuh",meaning:"glove",lit:"hand-shoe",gender:"der (from Schuh)"},
    {parts:["Kühl","Schrank"],word:"Kühlschrank",meaning:"refrigerator",lit:"cool-cabinet",gender:"der (from Schrank)"},
    {parts:["Staub","Sauger"],word:"Staubsauger",meaning:"vacuum cleaner",lit:"dust-sucker",gender:"der (from Sauger)"},
    {parts:["Kranken","Haus"],word:"Krankenhaus",meaning:"hospital",lit:"sick-house",gender:"das (from Haus)"},
    {parts:["Haus","Tür"],word:"Haustür",meaning:"front door",lit:"house-door",gender:"die (from Tür)"},
    {parts:["Schlaf","Zimmer"],word:"Schlafzimmer",meaning:"bedroom",lit:"sleep-room",gender:"das (from Zimmer)"},
  ];
  return(<div>
    <DarkBox title="Why German words are so long"><div style={{fontSize:14}}>
      German builds new words by <strong style={{color:"#FFE77A"}}>chaining nouns together</strong>. Read right-to-left: the last noun is the head word (determines gender and meaning category).
    </div></DarkBox>
    <Card color="#2E7D32" title="Compound examples" subtitle="Last word = gender">
      {compounds.map((c,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<compounds.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:4}}>
          {c.parts.map((p,j)=>(<><span key={j} style={{padding:"3px 8px",borderRadius:6,background:j===c.parts.length-1?"#2E7D32":"#f5f3ef",color:j===c.parts.length-1?"#fff":"#888",fontSize:13,fontWeight:700}}>{p}</span>{j<c.parts.length-1&&<span style={{color:"#ccc"}}>+</span>}</>))}
          <span style={{color:"#ccc",margin:"0 4px"}}>=</span>
          <span style={{fontSize:15,fontWeight:800,color:"#2E7D32"}}>{c.word}</span>
        </div>
        <div style={{fontSize:12,color:"#888"}}>{c.meaning} (lit: {c.lit}) — <strong>{c.gender}</strong></div>
      </div>))}
    </Card>
  </div>);
}

function Guide13(){
  const weakNouns=["der Junge (boy)","der Herr (Mr.)","der Mensch (person)","der Student","der Name","der Nachbar (neighbor)","der Kollege","der Kunde (customer)"];
  return(<div>
    <Card color="#E65100" title="N-Deklination pattern" subtitle="Add -(e)n in ALL cases except Nom. singular">
      <div style={{display:"grid",gridTemplateColumns:"100px 1fr",padding:"6px 14px",fontSize:11,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div>Case</div><div>der Student</div></div>
      {[{c:"Nominativ",f:"der Student"},{c:"Akkusativ",f:"den Studenten"},{c:"Dativ",f:"dem Studenten"},{c:"Genitiv",f:"des Studenten"},{c:"Plural",f:"die Studenten"}].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"100px 1fr",padding:"6px 14px",borderBottom:i<4?"1px solid #f0eeeb":"none"}}>
        <span style={{fontSize:12,color:"#888"}}>{r.c}</span>
        <span style={{fontSize:14,fontWeight:i===0?400:700,color:i===0?"#555":"#E65100"}}>{r.f}</span>
      </div>))}
    </Card>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
      {weakNouns.map(n=>(<span key={n} style={{padding:"4px 10px",borderRadius:8,background:"#FFF3E0",color:"#E65100",fontSize:12,fontWeight:600,border:"1px solid #FFCC80"}}>{n}</span>))}
    </div>
    <Insight text="Small group but very common words. If you see a masculine noun ending in -e (Junge, Kollege, Name), it's probably weak." />
  </div>);
}

function Guide14(){
  const [mode,setMode]=useState("def");
  const tables={
    def:{title:"After der/die/das (weak)",data:[{c:"Nom",e:["e","e","e","en"]},{c:"Akk",e:["en","e","e","en"]},{c:"Dat",e:["en","en","en","en"]},{c:"Gen",e:["en","en","en","en"]}]},
    indef:{title:"After ein/eine (mixed)",data:[{c:"Nom",e:["er","e","es","en"]},{c:"Akk",e:["en","e","es","en"]},{c:"Dat",e:["en","en","en","en"]},{c:"Gen",e:["en","en","en","en"]}]},
    none:{title:"No article (strong)",data:[{c:"Nom",e:["er","e","es","e"]},{c:"Akk",e:["en","e","es","e"]},{c:"Dat",e:["em","er","em","en"]},{c:"Gen",e:["en","er","en","er"]}]},
  };
  const t=tables[mode];
  return(<div>
    <DarkBox title="The key insight"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>Something must show the gender.</strong> If the article shows it (der, die, das), the adjective relaxes to -e or -en. If the article doesn't show it (ein, or no article), the adjective must carry the gender signal.
    </div></DarkBox>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {[{k:"def",l:"After der/die/das"},{k:"indef",l:"After ein/eine"},{k:"none",l:"No article"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{padding:"7px 14px",borderRadius:8,border:mode===m.k?"2.5px solid #6A1B9A":"1.5px solid #ddd",background:mode===m.k?"#6A1B9A":"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:12}}>{m.l}</button>))}
    </div>
    <Card color="#6A1B9A" title={t.title}>
      <div style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"6px 10px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div><div>Masc</div><div>Fem</div><div>Neut</div><div>Plur</div>
      </div>
      {t.data.map((r,i)=>{const isEn=r.e.every(e=>e==="en");return(
        <div key={i} style={{display:"grid",gridTemplateColumns:"50px 1fr 1fr 1fr 1fr",padding:"6px 10px",borderBottom:i<3?"1px solid #f0eeeb":"none",background:isEn?"#EDE7F610":"transparent"}}>
          <span style={{fontWeight:700,color:"#6A1B9A",fontSize:12}}>{r.c}</span>
          {r.e.map((e,j)=>(<span key={j} style={{textAlign:"center",fontWeight:700,fontSize:14,color:e==="en"?"#6A1B9A":"#C62828"}}>-{e}</span>))}
        </div>
      );})}
    </Card>
    <Insight text="After definite articles: it's almost always -en. The ONLY exceptions are the 5 nominative forms (all -e) and fem/neut accusative (-e, -e). That's the whole shortcut." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 15-17: PRONOUNS
// ═══════════════════════════════════════════════════════════════
function Guide15(){
  const p=[{en:"I",nom:"ich",akk:"mich",dat:"mir"},{en:"you (inf)",nom:"du",akk:"dich",dat:"dir"},{en:"he",nom:"er",akk:"ihn",dat:"ihm"},{en:"she",nom:"sie",akk:"sie",dat:"ihr"},{en:"it",nom:"es",akk:"es",dat:"ihm"},{en:"we",nom:"wir",akk:"uns",dat:"uns"},{en:"you (pl)",nom:"ihr",akk:"euch",dat:"euch"},{en:"they",nom:"sie",akk:"sie",dat:"ihnen"},{en:"you (formal)",nom:"Sie",akk:"Sie",dat:"Ihnen"}];
  const [hlCol,setHlCol]=useState(null);
  const cols=["#1565C0","#C62828","#E65100"];
  const labels=["Nominativ","Akkusativ","Dativ"];
  return(<div>
    <div style={{display:"flex",gap:4,marginBottom:12,justifyContent:"center"}}>
      {labels.map((l,i)=>(<button key={i} onClick={()=>setHlCol(hlCol===i?null:i)} style={{padding:"5px 12px",borderRadius:16,border:hlCol===i?`2px solid ${cols[i]}`:"1.5px solid #ddd",background:hlCol===i?cols[i]:"#fff",color:hlCol===i?"#fff":"#666",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l}</button>))}
    </div>
    <Card color="#C62828" title="Personal pronouns" subtitle="Tap columns to highlight">
      <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div></div>{labels.map((l,i)=>(<div key={i} style={{textAlign:"center",color:hlCol===i?cols[i]:"#999",borderBottom:hlCol===i?`3px solid ${cols[i]}`:"3px solid transparent",transition:"all 0.15s"}}>{l}</div>))}
      </div>
      {p.map((x,j)=>(<div key={j} style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr 1fr",padding:"5px 14px",borderBottom:j<p.length-1?"1px solid #f0eeeb":"none",fontSize:13}}>
        <span style={{color:"#888",fontSize:11}}>{x.en}</span>
        {[x.nom,x.akk,x.dat].map((v,i)=>(<span key={i} style={{textAlign:"center",fontWeight:hlCol===i?800:600,color:hlCol===i?cols[i]:"#333",background:hlCol===i?`${cols[i]}10`:"transparent",borderRadius:4,transition:"all 0.15s"}}>{v}</span>))}
      </div>))}
    </Card>
  </div>);
}

function Guide16(){
  const forms=[
    {form:"du",who:"One friend, child, family member, pet",verb:"du bist, du hast, du kommst",color:"#2E7D32"},
    {form:"ihr",who:"Multiple people you'd each call 'du'",verb:"ihr seid, ihr habt, ihr kommt",color:"#E65100"},
    {form:"Sie",who:"Strangers, bosses, elders, service (always capitalized!)",verb:"Sie sind, Sie haben, Sie kommen",color:"#1565C0"},
  ];
  return(<div>
    {forms.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${f.color}`,marginBottom:8}}>
      <div style={{fontSize:22,fontWeight:800,color:f.color,marginBottom:4}}>{f.form}</div>
      <div style={{fontSize:13,color:"#555",marginBottom:4}}>{f.who}</div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{f.verb}</div>
    </div>))}
    <DarkBox title="Navigating the du/Sie boundary"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
      • Wait for the other person to offer 'du' (<strong style={{color:"#FFE77A"}}>Duzen</strong>)<br/>
      • Workplaces vary — tech is mostly du, law/banking is Sie<br/>
      • When in doubt, <strong style={{color:"#FFE77A"}}>use Sie</strong>. It's never wrong to be too formal<br/>
      • Once you switch to du, you can't go back to Sie
    </div></DarkBox>
  </div>);
}

function Guide17(){return(<div>
  <Card color="#2E7D32" title="Reflexive pronouns" subtitle="Accusative and dative forms">
    <div style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div></div><div>Akkusativ</div><div>Dativ</div></div>
    {[{p:"ich",a:"mich",d:"mir"},{p:"du",a:"dich",d:"dir"},{p:"er/sie/es",a:"sich",d:"sich"},{p:"wir",a:"uns",d:"uns"},{p:"ihr",a:"euch",d:"euch"},{p:"sie/Sie",a:"sich",d:"sich"}].map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr",padding:"5px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",fontSize:13}}>
      <span style={{color:"#888",fontSize:11}}>{r.p}</span>
      <span style={{fontWeight:700,color:"#C62828"}}>{r.a}</span>
      <span style={{fontWeight:700,color:"#E65100"}}>{r.d}</span>
    </div>))}
  </Card>
  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
    {["sich freuen (be happy)","sich erinnern (remember)","sich fühlen (feel)","sich setzen (sit down)","sich vorstellen (introduce/imagine)"].map(v=>(<span key={v} style={{padding:"4px 10px",borderRadius:8,background:"#E8F5E9",color:"#2E7D32",fontSize:12,fontWeight:600,border:"1px solid #C8E6C9"}}>{v}</span>))}
  </div>
  <Insight text="Possessives (mein, dein, sein, ihr, unser, euer, Ihr) decline like ein-words. Same endings as ein/eine/ein across all cases." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 18-25: VERBS
// ═══════════════════════════════════════════════════════════════
const verbConj={machen:{stem:"mach",forms:["mache","machst","macht","machen","macht","machen"]},fahren:{stem:"fahr/fähr",forms:["fahre","fährst","fährt","fahren","fahrt","fahren"]},sprechen:{stem:"sprech/sprich",forms:["spreche","sprichst","spricht","sprechen","sprecht","sprechen"]}};
const prons6=["ich","du","er/sie/es","wir","ihr","sie/Sie"];

function Guide18(){
  const [verb,setVerb]=useState("machen");
  const v=verbConj[verb]; const colors={machen:"#1565C0",fahren:"#C62828",sprechen:"#2E7D32"};const col=colors[verb];
  return(<div>
    <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
      {Object.keys(verbConj).map(k=>(<button key={k} onClick={()=>setVerb(k)} style={{padding:"8px 18px",borderRadius:10,border:verb===k?`2.5px solid ${col}`:"1.5px solid #ddd",background:verb===k?col:"#fff",color:verb===k?"#fff":"#666",cursor:"pointer",fontWeight:800,fontSize:15}}>{k}</button>))}
    </div>
    <Card color={col} title={verb} subtitle={verb==="machen"?"regular":verb==="fahren"?"a→ä stem change":"e→i stem change"}>
      <div style={{display:"grid",gridTemplateColumns:"90px 50px 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}><div></div><div>Ending</div><div>Conjugated</div></div>
      {prons6.map((p,i)=>{const endings=["-e","-st","-t","-en","-t","-en"];const changed=verb!=="machen"&&(i===1||i===2);return(
        <div key={i} style={{display:"grid",gridTemplateColumns:"90px 50px 1fr",padding:"6px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",alignItems:"center",background:changed?`${col}08`:"transparent"}}>
          <span style={{fontSize:12,color:"#888"}}>{p}</span>
          <span style={{fontSize:12,color:col,fontWeight:700}}>{endings[i]}</span>
          <span style={{fontSize:16,fontWeight:700,color:changed?col:"#333"}}>{v.forms[i]}</span>
        </div>
      );})}
    </Card>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#555",marginBottom:6}}>Key irregulars: sein, haben, werden</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,fontSize:12}}>
        {[{v:"sein",f:"bin, bist, ist, sind, seid, sind"},{v:"haben",f:"habe, hast, hat, haben, habt, haben"},{v:"werden",f:"werde, wirst, wird, werden, werdet, werden"}].map(x=>(<div key={x.v} style={{padding:"6px 8px",borderRadius:6,background:"#f5f3ef"}}>
          <strong style={{color:"#C62828"}}>{x.v}</strong><br/><span style={{fontSize:10,color:"#888"}}>{x.f}</span>
        </div>))}
      </div>
    </div>
  </div>);
}

function Guide19(){
  const sep=[{prefix:"an-",ex:"anrufen → Ich rufe dich an.",m:"to call"},{prefix:"auf-",ex:"aufmachen → Ich mache die Tür auf.",m:"to open"},{prefix:"mit-",ex:"mitkommen → Kommst du mit?",m:"to come along"},{prefix:"ein-",ex:"einkaufen → Ich kaufe im Supermarkt ein.",m:"to shop"}];
  const insep=[{prefix:"ver-",ex:"verstehen → Ich verstehe das.",m:"to understand"},{prefix:"be-",ex:"besuchen → Ich besuche dich.",m:"to visit"},{prefix:"er-",ex:"erzählen → Er erzählt eine Geschichte.",m:"to narrate"},{prefix:"ent-",ex:"entschuldigen → Entschuldigen Sie!",m:"to excuse"}];
  return(<div>
    <DarkBox title="Prefixes transform meaning"><div style={{fontSize:14}}>
      stehen = stand · <strong style={{color:"#FFE77A"}}>ver</strong>stehen = understand · <strong style={{color:"#FFE77A"}}>auf</strong>stehen = get up · <strong style={{color:"#FFE77A"}}>be</strong>stehen = pass/exist
    </div></DarkBox>
    <Card color="#1565C0" title="Separable: prefix splits off in main clauses">
      {sep.map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{background:"#1565C0",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:12,fontWeight:700}}>{s.prefix}</span> <span style={{color:"#888",fontSize:12}}>{s.m}</span><br/>
        <span style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{s.ex}</span>
      </div>))}
    </Card>
    <Card color="#C62828" title="Inseparable: never split (no ge- in past participle!)">
      {insep.map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
        <span style={{background:"#C62828",color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:12,fontWeight:700}}>{s.prefix}</span> <span style={{color:"#888",fontSize:12}}>{s.m}</span><br/>
        <span style={{fontSize:13,color:"#555",fontStyle:"italic"}}>{s.ex}</span>
      </div>))}
    </Card>
    <Insight text="In subordinate clauses, separable prefixes rejoin: '...weil ich die Tür aufmache.' The prefix goes back to the verb." />
  </div>);
}

function Guide20(){
  const modals=[
    {m:"können",en:"can/able to",ex:"Ich kann schwimmen.",conj:"kann, kannst, kann, können, könnt, können",color:"#1565C0"},
    {m:"müssen",en:"must/have to",ex:"Du musst arbeiten.",conj:"muss, musst, muss, müssen, müsst, müssen",color:"#C62828"},
    {m:"dürfen",en:"may/allowed to",ex:"Darf ich fragen?",conj:"darf, darfst, darf, dürfen, dürft, dürfen",color:"#2E7D32"},
    {m:"sollen",en:"should/supposed to",ex:"Du sollst nicht stehlen.",conj:"soll, sollst, soll, sollen, sollt, sollen",color:"#E65100"},
    {m:"wollen",en:"want to",ex:"Ich will schlafen.",conj:"will, willst, will, wollen, wollt, wollen",color:"#6A1B9A"},
    {m:"möchten",en:"would like",ex:"Ich möchte ein Bier.",conj:"möchte, möchtest, möchte, möchten, möchtet, möchten",color:"#880E4F"},
  ];
  const [sel,setSel]=useState(null);
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:14}}>
      {modals.map((m,i)=>{const isSel=sel===i;return(
        <button key={i} onClick={()=>setSel(isSel?null:i)} style={{padding:"10px 4px",borderRadius:10,border:isSel?`2.5px solid ${m.color}`:"1.5px solid #ddd",background:isSel?m.color:"#fff",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:800}}>{m.m}</div>
          <div style={{fontSize:10,opacity:.7}}>{m.en}</div>
        </button>
      );})}
    </div>
    {sel!==null&&(()=>{const m=modals[sel];return(
      <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${m.color}`,marginBottom:16,animation:"fadeIn 0.2s ease"}}>
        <div style={{background:m.color,padding:"12px 16px",color:"#fff",display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:18,fontWeight:800}}>{m.m}</span><span style={{opacity:.7}}>{m.en}</span>
        </div>
        <div style={{padding:"10px 16px"}}>
          <div style={{fontSize:14,color:"#555",fontStyle:"italic",marginBottom:6}}>{m.ex}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:"monospace"}}>{m.conj}</div>
        </div>
      </div>
    );})()}
    <DarkBox title="The verb bracket (Satzklammer)"><div style={{fontSize:13}}>
      Modal at position 2, infinitive at the <strong style={{color:"#FFE77A"}}>END</strong>:<br/>
      Ich <strong style={{color:"#FFE77A"}}>kann</strong> heute nicht <strong style={{color:"#FFE77A"}}>kommen</strong>.<br/>
      <span style={{color:"#aaa",fontSize:11}}>Everything gets sandwiched between the two verb parts.</span>
    </div></DarkBox>
  </div>);
}

function Guide21(){return(<div>
  <DarkBox title="The past tense for conversation"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>haben/sein</strong> (conjugated, position 2) + <strong style={{color:"#FFE77A"}}>past participle</strong> (at the END)
  </div></DarkBox>
  <Card color="#6A1B9A" title="Past participle formation">
    {[{type:"Regular: ge- + stem + -t",ex:"machen → gemacht · kaufen → gekauft · spielen → gespielt",color:"#6A1B9A"},
      {type:"Irregular: ge- + stem change + -en",ex:"gehen → gegangen · schreiben → geschrieben · trinken → getrunken",color:"#C62828"},
      {type:"No ge- prefix for:",ex:"Inseparable verbs: besucht, verstanden · -ieren verbs: studiert, telefoniert",color:"#E65100"},
      {type:"Separable: ge- goes between",ex:"aufgemacht · angefangen · eingeladen · mitgebracht",color:"#1565C0"},
    ].map((r,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:r.color}}>{r.type}</div>
      <div style={{fontSize:12,color:"#888",fontStyle:"italic"}}>{r.ex}</div>
    </div>))}
  </Card>
  <Insight text="Use sein (not haben) for: movement verbs (gehen, kommen, fahren, fliegen) and change-of-state verbs (werden, sterben, aufwachen). Most other verbs use haben." />
</div>);}

function Guide22(){return(<div>
  <Card color="#00695C" title="Präteritum — the written/narrative past">
    {[{type:"Regular: stem + -te + endings",ex:"machen: machte, machtest, machte, machten, machtet, machten"},
      {type:"Irregular: stem change (no -te)",ex:"gehen→ging · kommen→kam · sehen→sah · schreiben→schrieb\nsprechen→sprach · nehmen→nahm · essen→aß · fahren→fuhr"},
    ].map((r,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i===0?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#00695C"}}>{r.type}</div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic",whiteSpace:"pre-line"}}>{r.ex}</div>
    </div>))}
  </Card>
  <DarkBox title="When to use which"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
    <strong style={{color:"#FFE77A"}}>Speaking:</strong> use Perfekt — Ich habe das gemacht.<br/>
    <strong style={{color:"#FFE77A"}}>Writing:</strong> use Präteritum — Ich machte das.<br/>
    <strong style={{color:"#EF9A9A"}}>Always Präteritum</strong> (even in speech) for: sein (war), haben (hatte), and all modals (konnte, musste, wollte...).
  </div></DarkBox>
</div>);}

function Guide23(){return(<div>
  <Card color="#880E4F" title="Konjunktiv II — the 'would' form">
    {[{form:"hätte",en:"would have",ex:"Wenn ich Zeit hätte... = If I had time..."},{form:"wäre",en:"would be",ex:"Das wäre schön. = That would be nice."},{form:"würde + inf.",en:"would + verb",ex:"Ich würde kommen. = I would come."}].map((f,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
      <span style={{fontSize:16,fontWeight:800,color:"#880E4F"}}>{f.form}</span> <span style={{color:"#888"}}>({f.en})</span><br/>
      <span style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{f.ex}</span>
    </div>))}
  </Card>
  <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
    <div style={{fontSize:13,fontWeight:700,color:"#880E4F",marginBottom:6}}>Polite requests — much softer than direct forms:</div>
    <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
      Könnten Sie mir helfen? = Could you help me?<br/>
      Ich hätte gern ein Bier. = I'd like a beer.<br/>
      Würden Sie bitte... = Would you please...
    </div>
  </div>
  <Insight text="Future tense (werden + infinitive) exists but is often replaced by present + time word: 'Ich komme morgen' = 'I'm coming tomorrow.' More natural in speech." />
</div>);}

function Guide24(){return(<div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#00838F" title="Process (werden)">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        Das Haus <strong style={{color:"#00838F"}}>wird gebaut</strong>.<br/>= The house is being built.<br/><br/>
        Das Buch <strong style={{color:"#00838F"}}>wurde geschrieben</strong>.<br/>= The book was written.<br/><br/>
        <span style={{fontSize:11,color:"#888"}}>Focus on the PROCESS.</span>
      </div>
    </Card>
    <Card color="#2E7D32" title="Result (sein)">
      <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
        Das Haus <strong style={{color:"#2E7D32"}}>ist gebaut</strong>.<br/>= The house is built (done).<br/><br/>
        Die Tür <strong style={{color:"#2E7D32"}}>ist geschlossen</strong>.<br/>= The door is closed.<br/><br/>
        <span style={{fontSize:11,color:"#888"}}>Focus on the RESULT.</span>
      </div>
    </Card>
  </div>
  <Insight text="Agent = von + dative: 'Das Buch wurde von Goethe geschrieben.' = 'The book was written by Goethe.'" />
</div>);}

function Guide25(){
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
function Guide26(){
  const examples=[
    {parts:["Ich","gehe","heute","ins Kino."],labels:["1: Subject","2: VERB","...","..."],note:"Normal: subject first"},
    {parts:["Heute","gehe","ich","ins Kino."],labels:["1: Time","2: VERB","Subject flips","..."],note:"Inversion: verb stays at 2!"},
    {parts:["Ins Kino","gehe","ich","heute."],labels:["1: Place","2: VERB","Subject flips","Time"],note:"Anything can go first"},
  ];
  return(<div>
    <DarkBox title="The V2 Rule — the #1 rule of German"><div style={{fontSize:14}}>
      In a main clause, the conjugated verb is <strong style={{color:"#FFE77A"}}>ALWAYS in position 2</strong>. Anything can go in position 1, but the verb never moves from 2.
    </div></DarkBox>
    {examples.map((ex,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:"1px solid #e0dcd5",marginBottom:6}}>
      <div style={{display:"flex",gap:4,marginBottom:4}}>
        {ex.parts.map((p,j)=>(<span key={j} style={{padding:"4px 8px",borderRadius:6,background:j===1?"#C62828":"#f5f3ef",color:j===1?"#fff":"#555",fontSize:14,fontWeight:j===1?800:600}}>{p}</span>))}
      </div>
      <div style={{display:"flex",gap:4}}>
        {ex.labels.map((l,j)=>(<span key={j} style={{fontSize:9,color:j===1?"#C62828":"#aaa",fontWeight:j===1?700:400,flex:1}}>{l}</span>))}
      </div>
    </div>))}
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>The verb bracket (Satzklammer):</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
        Ich <strong style={{color:"#C62828"}}>habe</strong> gestern ein Buch <strong style={{color:"#C62828"}}>gelesen</strong>.<br/>
        <span style={{fontSize:11,color:"#888"}}>Auxiliary at pos 2, participle at END. Everything sandwiched between.</span>
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>Time-Manner-Place (TeMaPla):</div>
      <div style={{fontSize:13,color:"#555"}}>
        Ich fahre <strong>[morgen]</strong> <strong>[mit dem Zug]</strong> <strong>[nach Berlin]</strong>.<br/>
        <span style={{fontSize:11,color:"#888"}}>= I'm going [tomorrow] [by train] [to Berlin].</span>
      </div>
    </div>
  </div>);
}

function Guide27(){
  const conjunctions=["dass (that)","weil (because)","wenn (if/when)","ob (whether)","obwohl (although)","als (when-past)","bevor (before)","nachdem (after)","bis (until)"];
  return(<div>
    <DarkBox title="Subordinate clause = verb goes to the END"><div style={{fontSize:14}}>
      Ich weiß, <strong style={{color:"#FFE77A"}}>dass er morgen kommt</strong>.<br/>
      <span style={{color:"#aaa",fontSize:12}}>= I know that he is coming tomorrow. Verb 'kommt' at the END.</span>
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:16,justifyContent:"center"}}>
      {conjunctions.map(c=>(<span key={c} style={{padding:"5px 12px",borderRadius:8,background:"#E3F2FD",color:"#1565C0",fontSize:12,fontWeight:700,border:"1px solid #BBDEFB"}}>{c}</span>))}
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#1565C0",marginBottom:6}}>The "wait for the verb" experience:</div>
      <div style={{fontSize:12,color:"#555",lineHeight:1.6,fontStyle:"italic"}}>
        ...weil ich gestern Abend mit meinem besten Freund in einem neuen Restaurant in der Stadt gegessen <strong style={{color:"#C62828"}}>HABE</strong>.<br/>
        <span style={{fontStyle:"normal",color:"#888",fontSize:11}}>You hold everything in memory until the verb arrives. This is normal German.</span>
      </div>
    </div>
    <Insight text="Relative clauses also push the verb to the end: 'Der Mann, der dort steht, ist mein Bruder.' The relative pronoun (der/die/das) declines like articles." />
  </div>);
}

function Guide28(){
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <Card color="#C62828" title="nicht" subtitle="Negates verbs/adj/adv">
        <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
          Ich komme <strong style={{color:"#C62828"}}>nicht</strong>.<br/>
          Das ist <strong style={{color:"#C62828"}}>nicht</strong> gut.<br/>
          Er arbeitet <strong style={{color:"#C62828"}}>nicht</strong> gern.<br/>
          <span style={{fontSize:11,color:"#888"}}>Goes before what it negates, or at the end for the whole idea.</span>
        </div>
      </Card>
      <Card color="#1565C0" title="kein" subtitle="Negates nouns (replaces ein)">
        <div style={{padding:"10px 14px",fontSize:13,color:"#555",lineHeight:1.6}}>
          Ich habe <strong style={{color:"#1565C0"}}>kein</strong> Geld.<br/>
          Das ist <strong style={{color:"#1565C0"}}>keine</strong> gute Idee.<br/>
          Er hat <strong style={{color:"#1565C0"}}>keinen</strong> Hund.<br/>
          <span style={{fontSize:11,color:"#888"}}>NOT 'nicht ein' — always use kein. Declines like ein.</span>
        </div>
      </Card>
    </div>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"1px solid #e0dcd5",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#2E7D32",marginBottom:6}}>Questions — just move the verb:</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        <strong>Yes/No:</strong> Kommst du morgen? · Hast du das Buch gelesen?<br/>
        <strong>W-questions:</strong> Wo wohnst du? · Was machst du? · Wann kommst du?<br/>
        <span style={{fontSize:11,color:"#888"}}>No auxiliary needed (unlike English 'do you'!)</span>
      </div>
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDES 29-33: PRACTICAL
// ═══════════════════════════════════════════════════════════════
function Guide29(){
  const nums=[{n:"1",w:"eins"},{n:"2",w:"zwei"},{n:"3",w:"drei"},{n:"4",w:"vier"},{n:"5",w:"fünf"},{n:"6",w:"sechs"},{n:"7",w:"sieben"},{n:"8",w:"acht"},{n:"9",w:"neun"},{n:"10",w:"zehn"},{n:"11",w:"elf"},{n:"12",w:"zwölf"}];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:16}}>
      {nums.map(n=>(<div key={n.n} style={{textAlign:"center",padding:"8px 4px",background:"#fff",borderRadius:8,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:20,fontWeight:800,color:"#E65100"}}>{n.n}</div>
        <div style={{fontSize:10,color:"#555"}}>{n.w}</div>
      </div>))}
    </div>
    <DarkBox title="13-99: ones BEFORE tens (backwards!)"><div style={{fontSize:14}}>
      21 = <strong style={{color:"#FFE77A"}}>ein</strong>und<strong style={{color:"#FFE77A"}}>zwanzig</strong> (one-and-twenty)<br/>
      54 = <strong style={{color:"#FFE77A"}}>vier</strong>und<strong style={{color:"#FFE77A"}}>fünfzig</strong> (four-and-fifty)<br/>
      99 = <strong style={{color:"#FFE77A"}}>neun</strong>und<strong style={{color:"#FFE77A"}}>neunzig</strong> (nine-and-ninety)
    </div></DarkBox>
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"2px solid #C62828",marginBottom:16}}>
      <div style={{fontSize:14,fontWeight:700,color:"#C62828",marginBottom:6}}>⚠ Time: halb = BEFORE the hour!</div>
      <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
        <strong style={{color:"#C62828"}}>halb drei = 2:30</strong> (NOT 3:30!)<br/>
        halb means 'half TO' the next hour.<br/>
        Viertel vor drei = 2:45 · Viertel nach zwei = 2:15
      </div>
    </div>
    <Insight text="Dates: Tag.Monat.Jahr → 15.03.2024 = March 15, 2024. Day first (opposite of American format)." />
  </div>);
}

function Guide30(){
  const combos=[
    {verb:"warten auf",case:"+ Akk",en:"to wait for",ex:"Ich warte auf den Bus.",color:"#C62828"},
    {verb:"sich freuen auf",case:"+ Akk",en:"to look forward to",ex:"Ich freue mich auf den Urlaub.",color:"#1565C0"},
    {verb:"sich freuen über",case:"+ Akk",en:"to be happy about",ex:"Ich freue mich über das Geschenk.",color:"#2E7D32"},
    {verb:"Angst haben vor",case:"+ Dat",en:"to be afraid of",ex:"Ich habe Angst vor dem Hund.",color:"#E65100"},
    {verb:"denken an",case:"+ Akk",en:"to think about",ex:"Ich denke an dich.",color:"#6A1B9A"},
    {verb:"abhängen von",case:"+ Dat",en:"to depend on",ex:"Das hängt vom Wetter ab.",color:"#880E4F"},
    {verb:"sich interessieren für",case:"+ Akk",en:"to be interested in",ex:"Ich interessiere mich für Kunst.",color:"#00695C"},
    {verb:"träumen von",case:"+ Dat",en:"to dream of",ex:"Ich träume von einer Reise.",color:"#00838F"},
  ];
  return(<div>
    <DarkBox title="Memorize as units"><div style={{fontSize:13}}>The preposition determines the case. You can't guess either one. Learn verb + preposition + case as a single item.</div></DarkBox>
    {combos.map((c,i)=>(<div key={i} style={{background:"#fff",borderRadius:10,padding:"8px 14px",border:"1px solid #e0dcd5",marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
      <span style={{background:c.color,color:"#fff",padding:"2px 8px",borderRadius:4,fontSize:12,fontWeight:700,flexShrink:0}}>{c.verb} {c.case}</span>
      <span style={{fontSize:12,color:"#555",flex:1}}>{c.ex}</span>
      <span style={{fontSize:10,color:"#aaa",flexShrink:0}}>{c.en}</span>
    </div>))}
  </div>);
}

function Guide31(){
  const particles=[
    {p:"doch",uses:["Contradicting: 'Du sprichst kein Deutsch.' → 'Doch!' (Yes I DO!)","Encouraging: Komm doch! (Come on!)","Emphasizing: Das ist doch schön! (That IS nice!)"],color:"#880E4F"},
    {p:"mal",uses:["Softening/casual: Komm mal her. (Come here — no big deal)","Hey, look: Schau mal! (Check this out!)","Passing something: Gib mir mal das Buch."],color:"#1565C0"},
    {p:"ja",uses:["Shared knowledge: Du weißt ja... (You know...)","Surprise: Das ist ja toll! (That's great — wow!)"],color:"#2E7D32"},
    {p:"halt / eben",uses:["Acceptance: Das ist halt so. (That's just how it is.)","Resignation: Er ist eben so. (He's just like that.)"],color:"#E65100"},
    {p:"eigentlich",uses:["Actually: Eigentlich wollte ich nicht kommen. (Actually, I didn't want to come.)"],color:"#6A1B9A"},
  ];
  return(<div>
    <DarkBox title="Untranslatable flavor words"><div style={{fontSize:14}}>Modal particles add <strong style={{color:"#FFE77A"}}>tone, attitude, and nuance</strong>. They're what makes you sound natural. Start with 'mal' and 'doch'.</div></DarkBox>
    {particles.map((pt,i)=>(<div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 14px",border:`2px solid ${pt.color}20`,marginBottom:8}}>
      <div style={{fontSize:18,fontWeight:800,color:pt.color,marginBottom:4}}>{pt.p}</div>
      {pt.uses.map((u,j)=>(<div key={j} style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:2}}>• {u}</div>))}
    </div>))}
  </div>);
}

function Guide32(){
  const falseF=[
    {de:"bekommen",en:"become",real:"to get/receive",correct:"become = werden",d:5},
    {de:"Gift",en:"gift",real:"poison (!)",correct:"gift = Geschenk",d:5},
    {de:"aktuell",en:"actual",real:"current/up-to-date",correct:"actual = eigentlich/tatsächlich",d:5},
    {de:"Handy",en:"handy",real:"cell phone",correct:"handy = praktisch",d:4},
    {de:"Chef",en:"chef",real:"boss",correct:"chef = Koch",d:4},
    {de:"sensibel",en:"sensible",real:"sensitive",correct:"sensible = vernünftig",d:4},
    {de:"brav",en:"brave",real:"well-behaved",correct:"brave = mutig/tapfer",d:3},
    {de:"Rat",en:"rat",real:"advice/council",correct:"rat = Ratte",d:3},
    {de:"komisch",en:"comical",real:"strange/weird",correct:"comical = lustig",d:3},
    {de:"Fabrik",en:"fabric",real:"factory",correct:"fabric = Stoff",d:3},
  ];
  const dColors={5:"#C62828",4:"#E65100",3:"#F9A825"};
  return(<div>
    <Card color="#C62828" title="Falsche Freunde — False Friends">
      {falseF.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"7px 14px",borderBottom:i<falseF.length-1?"1px solid #f0eeeb":"none",gap:8}}>
        <div style={{width:5,height:5,borderRadius:"50%",background:dColors[f.d],flexShrink:0}}/>
        <div style={{flex:1}}>
          <span style={{fontWeight:700,color:dColors[f.d]}}>{f.de}</span> <span style={{color:"#ccc"}}>≠</span> <span style={{color:"#999",textDecoration:"line-through"}}>{f.en}</span><br/>
          <span style={{fontSize:11,color:"#555"}}>= {f.real}</span> · <span style={{fontSize:11,color:"#888"}}>{f.correct}</span>
        </div>
      </div>))}
    </Card>
    <Insight text="'Gift' meaning 'poison' is the most dangerous false friend in any language. 'Ich habe ein Gift für dich' does NOT mean what you think." />
  </div>);
}

function Guide33(){return(<div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
    <Card color="#1a1a1a" title="Formal email">
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        <strong>Sehr geehrte Frau Müller,</strong><br/>
        <span style={{color:"#888"}}>(Dear Ms. Müller,)</span><br/><br/>
        ...body...<br/><br/>
        <strong>Mit freundlichen Grüßen</strong><br/>
        <span style={{color:"#888"}}>(Yours sincerely)</span>
      </div>
    </Card>
    <Card color="#2E7D32" title="Informal email">
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        <strong>Liebe Anna, / Lieber Tom,</strong><br/>
        <span style={{color:"#888"}}>(Dear Anna/Tom,)</span><br/><br/>
        Hi! / Hallo! / Hey!<br/><br/>
        <strong>Liebe Grüße / LG</strong><br/>
        <span style={{color:"#888"}}>(Warm regards)</span>
      </div>
    </Card>
  </div>
  <DarkBox title="German directness is not rudeness"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
    • Germans say <strong style={{color:"#FFE77A"}}>'Nein'</strong> without softening it<br/>
    • <strong style={{color:"#FFE77A"}}>'Das stimmt nicht'</strong> (That's not correct) is normal, not aggressive<br/>
    • Fewer 'please' and 'sorry' than English — it's <strong style={{color:"#FFE77A"}}>efficiency, not hostility</strong><br/>
    • Direct feedback = they trust you to handle it
  </div></DarkBox>
</div>);}

// ═══════════════════════════════════════════════════════════════
// COMPONENT ARRAY & MAIN APP
// ═══════════════════════════════════════════════════════════════

export const guideComponents=[Guide1,Guide2,Guide3,Guide4,Guide5,Guide6,Guide7,Guide8,Guide9,Guide10,Guide11,Guide12,Guide13,Guide14,Guide15,Guide16,Guide17,Guide18,Guide19,Guide20,Guide21,Guide22,Guide23,Guide24,Guide25,Guide26,Guide27,Guide28,Guide29,Guide30,Guide31,Guide32,Guide33];
