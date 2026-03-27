import { DarkBox } from '../../../components/DarkBox';
import { SimpleGuide } from '../../../components/SimpleGuide';
import { PalNote, Ar, ArBig } from './_helpers';

export function Guide9(){
  return(<div>
    <DarkBox title="One Article for Everything"><div style={{fontSize:13,lineHeight:1.6}}>
      Arabic has only one definite article: <ArBig>الـ</ArBig> (al-). No gender/number changes. Indefiniteness is marked by <strong style={{color:"#FFE77A"}}>tanwīn</strong> (the -n ending).
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,padding:"14px",border:"1px solid #eee",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#C62828",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Definite (the)</div>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#C62828"}}><Ar>الكِتاب</Ar></div>
        <div style={{fontSize:13,color:"#555",marginTop:4}}>al-kitāb = <strong>the</strong> book</div>
      </div>
      <div style={{background:"#fff",borderRadius:12,padding:"14px",border:"1px solid #eee",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#2E7D32",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>Indefinite (a/an)</div>
        <div style={{fontSize:28,fontFamily:"'Noto Sans Arabic','Amiri',serif",color:"#2E7D32"}}><Ar>كِتابٌ</Ar></div>
        <div style={{fontSize:13,color:"#555",marginTop:4}}>kitābun = <strong>a</strong> book</div>
      </div>
    </div>
    <SimpleGuide items={[
      {h:"With sun letters: lām assimilates",b:"الشَّمس = ash-shams (the sun) — see Guide 3"},
      {h:"With moon letters: lām stays",b:"القَمَر = al-qamar (the moon)"},
      {h:"al- makes nouns definite for adjective agreement",b:"الكتاب الكبير = al-kitāb al-kabīr (the big book)\nBoth noun AND adjective get al-"},
      {h:"No al- in iḍāfa (construct) on first noun",b:"كتاب الطالب = kitāb aṭ-ṭālib (the student's book)\nFirst noun is definite by relationship, not by al-"},
    ]}/>
    <PalNote text="In Palestinian Arabic, al- is often shortened to just 'l-' or 'il-'. الكتاب = il-ktāb."/>
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 10: GENDER
// ═══════════════════════════════════════════════════════════════
