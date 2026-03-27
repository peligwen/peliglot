import { Insight } from '../../../components/Insight';
import { PalNote, Ar } from './_helpers';

export function Guide8(){
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
