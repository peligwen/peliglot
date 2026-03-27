import { Card } from '../../../components/Card';
import { Insight } from './_helpers';

const shortV=[{l:"a",s:"ah",w:"aloha"},{l:"e",s:"eh",w:"hele"},{l:"i",s:"ee",w:"wiki"},{l:"o",s:"oh",w:"ono"},{l:"u",s:"oo",w:"puka"}];
const longV=[{l:"\u0101",s:"aah (held)",w:"k\u0101ne"},{l:"\u0113",s:"eeh (held)",w:"m\u0113le"},{l:"\u012B",s:"eee (held)",w:"k\u012B"},{l:"\u014D",s:"ooh (held)",w:"k\u014D"},{l:"\u016B",s:"ooo (held)",w:"k\u016B"}];
const diphthongs=[{d:"ai",s:"'eye'",ex:"kai (sea)"},{d:"ae",s:"'ah-eh'",ex:"mae (wilt)"},{d:"ao",s:"'ah-oh'",ex:"ao (cloud)"},{d:"au",s:"'ow'",ex:"mau (always)"},
  {d:"ei",s:"'ay'",ex:"lei"},{d:"eu",s:"'eh-oo'",ex:"heu (to strip)"},{d:"oi",s:"'oy'",ex:"poi"},{d:"ou",s:"'oh-oo'",ex:"kou (your)"}];

export function Guide2(){
  return(<div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Short Vowels</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {shortV.map(v=>(<div key={v.l} style={{textAlign:"center",padding:"12px 4px",background:"#fff",borderRadius:10,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#00695C",fontFamily:"'Georgia',serif"}}>{v.l}</div>
        <div style={{fontSize:13,color:"#C62828",fontWeight:700,fontFamily:"monospace"}}>{v.s}</div>
        <div style={{fontSize:10,color:"#999",fontStyle:"italic"}}>{v.w}</div>
      </div>))}
    </div>
    <div style={{fontSize:12,fontWeight:700,color:"#999",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Long Vowels (with kahak\u014D)</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {longV.map(v=>(<div key={v.l} style={{textAlign:"center",padding:"12px 4px",background:"#FFF8E7",borderRadius:10,border:"2px solid #F0E4C4"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#C62828",fontFamily:"'Georgia',serif"}}>{v.l}</div>
        <div style={{fontSize:13,color:"#C62828",fontWeight:700,fontFamily:"monospace"}}>{v.s}</div>
        <div style={{fontSize:10,color:"#999",fontStyle:"italic"}}>{v.w}</div>
      </div>))}
    </div>
    <Card color="#00695C" title="Common Diphthongs">
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:0}}>
        {diphthongs.map((d,i)=>(<div key={d.d} style={{padding:"8px 14px",borderBottom:i<6?"1px solid #f0eeeb":"none",borderRight:i%2===0?"1px solid #f0eeeb":"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:16,fontWeight:800,color:"#00695C",fontFamily:"'Georgia',serif"}}>{d.d}</span>
          <span style={{fontSize:12,color:"#888"}}>{d.s}</span>
          <span style={{fontSize:11,color:"#aaa",fontStyle:"italic"}}>{d.ex}</span>
        </div>))}
      </div>
    </Card>
    <Insight text="Vowel length CHANGES MEANING. Kau = to place. K\u0101u = your (a-class). K\u0101\u02BBu = yours. Always pay attention to the kahak\u014D!"/>
  </div>);
}
