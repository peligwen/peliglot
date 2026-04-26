import { SimpleGuide } from '../../../components/SimpleGuide';
import { ExpandSection } from '../../../components/ExpandSection';

export function Guide23(){return(<div>
  <SimpleGuide items={[
  {h:"Verbal Noun (مصدر) = the act of doing",b:"Form I: varies (must memorize) — كِتابة (writing), عِلم (knowledge)\nForm II: تَفعيل — تَعليم (teaching)\nForm V: تَفَعُّل — تَعَلُّم (learning)\nForm X: اِستِفعال — اِستِفسار (inquiry)"},
  {h:"Active Participle (اسم الفاعل) = the doer",b:"Form I: فاعِل — كاتِب (writer), طالِب (student)\nForm II: مُفَعِّل — مُعَلِّم (teacher)\nVery common as nouns and adjectives"},
  {h:"Passive Participle (اسم المفعول) = the done-to",b:"Form I: مَفعول — مَكتوب (written), مَعروف (known)\nForm II: مُفَعَّل — مُعَلَّم (marked/taught)\nAlso very common as adjectives"},
  {h:"Pattern recognition",b:"If you see مُـ at the start → likely a participle or verbal noun of forms II-X\nIf you see ـاعِل pattern → active participle Form I\nIf you see مَفعول pattern → passive participle Form I"},
]}/>
  <ExpandSection title="Passive Voice (المبني للمجهول)" color="#C62828">
    <div style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #eee",fontSize:12,lineHeight:1.7}}>
      <p style={{margin:"0 0 8px",color:"#555"}}>Arabic passive voice is formed by <strong>internal vowel change</strong>, not by a helper verb (no "was" or "been").</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div style={{background:"#FFEBEE",borderRadius:7,padding:"8px 10px"}}>
          <div style={{fontWeight:700,color:"#C62828",fontSize:11,marginBottom:4}}>Past passive: فُعِلَ pattern</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:14,direction:"rtl"}}>كَتَبَ → كُتِبَ</div>
          <div style={{fontSize:11,color:"#555"}}>kataba (he wrote) → kutiba (it was written)</div>
        </div>
        <div style={{background:"#FFEBEE",borderRadius:7,padding:"8px 10px"}}>
          <div style={{fontWeight:700,color:"#C62828",fontSize:11,marginBottom:4}}>Present passive: يُفعَلُ pattern</div>
          <div style={{fontFamily:"'Noto Sans Arabic','Amiri',serif",fontSize:14,direction:"rtl"}}>يَكتُبُ → يُكتَبُ</div>
          <div style={{fontSize:11,color:"#555"}}>yaktubu (he writes) → yuktabu (it is written)</div>
        </div>
      </div>
      <div style={{background:"#FFF5F5",borderRadius:7,padding:"8px 10px",marginBottom:8,fontSize:12}}>
        <div style={{fontWeight:700,color:"#C62828",marginBottom:4}}>More examples (Form I):</div>
        <div>دَرَسَ → دُرِسَ (was studied) · فَتَحَ → فُتِحَ (was opened)</div>
        <div>أَرسَلَ → أُرسِلَ (Form IV: was sent) · عَلَّمَ → عُلِّمَ (Form II: was taught)</div>
      </div>
      <div style={{fontSize:11,color:"#888"}}>⚠ The agent (by whom) is almost always omitted in Arabic passive. When stated, it uses the preposition مِن (from) — unlike English "by."<br/>Common in news Arabic and formal writing: أُعلِنَ (it was announced), أُكِّدَ (it was confirmed).</div>
    </div>
  </ExpandSection>
</div>);}
