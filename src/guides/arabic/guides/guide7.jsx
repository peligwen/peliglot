import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';

export function Guide7(){
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
