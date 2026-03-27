import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { PalNote } from './_helpers';

export function Guide5(){
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
