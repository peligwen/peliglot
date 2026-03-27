import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { PalNote } from './_helpers';

export function Guide19(){
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
