import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide18(){
  const pastConj=[
    {p:"أنا",f:"كَتَبْتُ",tr:"katabtu",pal:"katabt"},{p:"أنتَ",f:"كَتَبْتَ",tr:"katabta",pal:"katabt"},
    {p:"أنتِ",f:"كَتَبْتِ",tr:"katabti",pal:"katabti"},{p:"هُوَ",f:"كَتَبَ",tr:"kataba",pal:"katab"},
    {p:"هِيَ",f:"كَتَبَتْ",tr:"katabat",pal:"katabet"},{p:"نحن",f:"كَتَبْنا",tr:"katabnā",pal:"katabna"},
    {p:"أنتم",f:"كَتَبْتُم",tr:"katabtum",pal:"katabtu"},{p:"هُم",f:"كَتَبوا",tr:"katabū",pal:"katabu"},
  ];
  const pastFull=[
    {p:"أنتما (2nd dual)",f:"كَتَبْتُما",tr:"katabtumā"},
    {p:"هُما (3rd dual m)",f:"كَتَبا",tr:"katabā"},
    {p:"هُما (3rd dual f)",f:"كَتَبَتا",tr:"katabatā"},
    {p:"أنتُنَّ (2nd pl.f)",f:"كَتَبْتُنَّ",tr:"katabtunna"},
    {p:"هُنَّ (3rd pl.f)",f:"كَتَبْنَ",tr:"katabna"},
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
    <ExpandSection title="Full MSA paradigm: dual + feminine-plural forms" color="#C62828">
      <div style={{background:"#fff",borderRadius:10,padding:"10px 14px",border:"1px solid #eee"}}>
        <div style={{fontSize:11,color:"#555",marginBottom:8}}>MSA has 13 forms total; the 5 below are used for duals and feminine plurals in formal writing. Palestinian Arabic does not use dual forms.</div>
        {pastFull.map((c,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 80px 80px",alignItems:"center",padding:"7px 0",borderBottom:i<pastFull.length-1?"1px solid #f0eeeb":"none",gap:8}}>
          <span style={{fontSize:12,color:"#999"}}>{c.p}</span>
          <span style={{fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#C62828",direction:"rtl"}}>{c.f}</span>
          <span style={{fontSize:12,color:"#555"}}>{c.tr}</span>
        </div>))}
      </div>
    </ExpandSection>
    <Insight text="The past tense base is the هُوَ (he) form: كَتَبَ. All other persons add suffixes. The pattern فَعَلَ (faʿala) is the template for most Form I verbs."/>
  </div>);
}
