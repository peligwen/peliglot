import { DarkBox } from '../../../components/DarkBox';
import { Insight } from '../../../components/Insight';
import { PalNote, Ar } from './_helpers';

const sunLetters=["ت","ث","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ل","ن"];

const moonLetters=["ا","ب","ج","ح","خ","ع","غ","ف","ق","ك","م","ه","و","ي"];

export function Guide3(){
  return(<div>
    <DarkBox title="What Happens to 'al-'?"><div style={{fontSize:13,lineHeight:1.6}}>
      When <Ar>الـ</Ar> (the) is added, <strong style={{color:"#FFE77A"}}>sun letters</strong> absorb the /l/ sound — the lām assimilates. <strong style={{color:"#90CAF9"}}>Moon letters</strong> keep the /l/ clearly pronounced.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #E65100"}}>
        <div style={{background:"#E65100",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>☀️ Sun Letters (14) — lām assimilates</div>
        <div style={{padding:"10px 14px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,direction:"rtl",justifyContent:"center"}}>
            {sunLetters.map(l=>(<span key={l} style={{width:32,height:32,borderRadius:6,background:"#FFF3E0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#E65100",fontWeight:700}}>{l}</span>))}
          </div>
          <div style={{marginTop:10,fontSize:12,color:"#555",textAlign:"center"}}>
            <Ar>الشَّمس</Ar> = <strong>ash-shams</strong> (not al-shams)<br/>
            The lām becomes the sun letter
          </div>
        </div>
      </div>
      <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"2px solid #1565C0"}}>
        <div style={{background:"#1565C0",padding:"10px 14px",color:"#fff",fontSize:13,fontWeight:700}}>🌙 Moon Letters (14) — lām stays</div>
        <div style={{padding:"10px 14px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,direction:"rtl",justifyContent:"center"}}>
            {moonLetters.map(l=>(<span key={l} style={{width:32,height:32,borderRadius:6,background:"#E3F2FD",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#1565C0",fontWeight:700}}>{l}</span>))}
          </div>
          <div style={{marginTop:10,fontSize:12,color:"#555",textAlign:"center"}}>
            <Ar>القَمَر</Ar> = <strong>al-qamar</strong> (lām fully pronounced)<br/>
            The lām stays as /l/
          </div>
        </div>
      </div>
    </div>
    <Insight text="Easy trick: say 'al-' then the letter. If your tongue stays behind your teeth for both the lām and the letter, it's a sun letter. If your tongue moves, it's a moon letter."/>
    <PalNote text="The assimilation happens in Palestinian Arabic too — it's universal across all dialects and MSA."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 4: CONNECTED WRITING
// ═══════════════════════════════════════════════════════════════
