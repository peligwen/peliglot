import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide7(){
  const initialSeats=[
    {ar:"أَخ",tr:"ʾakh",m:"brother — fatḥa above alif (ʾa-)"},
    {ar:"أُستاذ",tr:"ʾustādh",m:"professor — ḍamma above alif (ʾu-)"},
    {ar:"إِسلام",tr:"ʾislām",m:"Islam — kasra below alif (ʾi-)"},
    {ar:"آدم",tr:"Ādam",m:"Adam — madda (ʾā-): hamza + long ā merge into آ"},
  ];
  const medFinalSeats=[
    {seat:"On wāw (ؤ)",when:"Strongest surrounding vowel is ḍamma",ex:[{ar:"سُؤال",tr:"suʾāl",m:"question"},{ar:"رُؤية",tr:"ruʾya",m:"vision"}],color:"#2E7D32"},
    {seat:"On yāʾ (ئ)",when:"Strongest surrounding vowel is kasra",ex:[{ar:"سَئِمَ",tr:"saʾima",m:"he got bored"},{ar:"بِئر",tr:"biʾr",m:"well (water)"}],color:"#6A1B9A"},
    {seat:"On the line (ء)",when:"After a long vowel or sukūn-bearing consonant, or at the end of a word after a long vowel",ex:[{ar:"سَماء",tr:"samāʾ",m:"sky"},{ar:"جُزء",tr:"juzʾ",m:"part"}],color:"#E65100"},
  ];
  return(<div>
    <DarkBox title="Where Does Hamza Sit?"><div style={{fontSize:13,lineHeight:1.6}}>
      Hamza <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic',serif"}}>ء</span> is a glottal stop (ʾ). Its <strong style={{color:"#FFE77A"}}>"seat" (carrier)</strong> depends on position in the word.
    </div></DarkBox>

    <Card color="#1565C0" title="Initial Position — always on alif" subtitle="Choice of form depends on the following short vowel">
      <div style={{padding:"4px 16px 8px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:10}}>
          {[{mark:"أَ",label:"fatḥa above (ʾa-)"},{mark:"إِ",label:"kasra below (ʾi-)"},{mark:"آ",label:"madda (ʾā-)"}].map(m=>(<div key={m.mark} style={{textAlign:"center",padding:"8px 4px",background:"#EEF2F9",borderRadius:8,border:"1px solid #C5D3EA"}}>
            <div style={{fontSize:26,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0"}}>{m.mark}</div>
            <div style={{fontSize:9,color:"#666",marginTop:3}}>{m.label}</div>
          </div>))}
        </div>
        {initialSeats.map((e,j)=>(<div key={j} style={{display:"flex",alignItems:"center",padding:"6px 0",borderBottom:j<initialSeats.length-1?"1px solid #f0eeeb":"none",gap:12}}>
          <span style={{fontSize:22,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",minWidth:60,textAlign:"center",direction:"rtl"}}>{e.ar}</span>
          <span style={{fontSize:13,color:"#555",flex:1}}>{e.tr} — {e.m}</span>
        </div>))}
      </div>
    </Card>

    <div style={{background:"#FFF8E7",borderRadius:8,padding:"8px 14px",border:"1px solid #F0E4C4",fontSize:12,color:"#8B6914",margin:"4px 0 8px"}}>
      ⚠ The vowel-hierarchy rule below applies to <strong>medial and final position only</strong> — not initial.
    </div>

    <Insight text="Medial/Final vowel strength hierarchy: kasra (i) > ḍamma (u) > fatḥa (a). The strongest vowel among those adjacent to medial or final hamza determines its seat."/>

    {medFinalSeats.map((s,i)=>(<Card key={i} color={s.color} title={s.seat} subtitle={s.when}>
      {s.ex.map((e,j)=>(<div key={j} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:j<s.ex.length-1?"1px solid #f0eeeb":"none",gap:12}}>
        <span style={{fontSize:22,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:s.color,minWidth:60,textAlign:"center",direction:"rtl"}}>{e.ar}</span>
        <span style={{fontSize:13,color:"#555"}}>{e.tr}</span>
        <span style={{fontSize:12,color:"#999",marginLeft:"auto"}}>{e.m}</span>
      </div>))}
    </Card>))}
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 8: TĀ' MARBŪṬA & ALIF MAQṢŪRA
// ═══════════════════════════════════════════════════════════════
