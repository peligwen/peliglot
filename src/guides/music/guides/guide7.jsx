import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';
import { Insight, buildScale, buildChord, MAJOR_STEPS } from './_helpers';

const romanNumerals=["I","ii","iii","IV","V","vi","vii°"];

const chordQualities=["major","minor","minor","major","major","minor","dim"];

const chordIntervals=[[4,3],[3,4],[3,4],[4,3],[4,3],[3,4],[3,3]];

export function Guide7(){
  const [root,setRoot]=useState("C");
  const scale=buildScale(root,MAJOR_STEPS);
  const [selDeg,setSelDeg]=useState(null);
  return(<div>
    <DarkBox title="Every key has 7 built-in chords"><div style={{fontSize:14}}>
      Stack thirds from each note of the major scale and you get: <strong style={{color:"#FFE77A"}}>I – ii – iii – IV – V – vi – vii°</strong>. Major, minor, minor, major, major, minor, diminished. This pattern is the same in every key.
    </div></DarkBox>
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:12}}>
      {["C","D","E","F","G","A","Bb"].map(n=>(<button key={n} onClick={()=>setRoot(n)} style={{padding:"5px 12px",borderRadius:8,border:root===n?"2.5px solid #1565C0":"1.5px solid #ddd",background:root===n?"#1565C0":"#fff",color:root===n?"#fff":"#555",cursor:"pointer",fontWeight:700}}>{n}</button>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:16}}>
      {romanNumerals.map((rn,i)=>{const chordRoot=scale[i];const chord=buildChord(chordRoot,chordIntervals[i]);const isSel=selDeg===i;const isMaj=chordQualities[i]==="major";
        return(<button key={i} onClick={()=>{setSelDeg(i);playChord(chord.map(n=>n+"4"));}} style={{padding:"8px 2px",borderRadius:8,border:isSel?"2.5px solid #C62828":"1.5px solid #ddd",background:isSel?"#C62828":isMaj?"#fff":"#f5f3ef",color:isSel?"#fff":"#333",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:800}}>{rn}</div>
          <div style={{fontSize:10,color:isSel?"rgba(255,255,255,0.7)":"#888"}}>{chordRoot}{chordQualities[i]==="minor"?"m":chordQualities[i]==="dim"?"°":""}</div>
        </button>);
      })}
    </div>
    {selDeg!==null&&(()=>{const chordRoot=scale[selDeg];const chord=buildChord(chordRoot,chordIntervals[selDeg]);return(
      <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:"2px solid #C62828",marginBottom:16}}>
        <div style={{fontSize:18,fontWeight:800,color:"#C62828"}}>{romanNumerals[selDeg]} — {chordRoot}{chordQualities[selDeg]==="minor"?"m":chordQualities[selDeg]==="dim"?"°":""}</div>
        <div style={{fontSize:13,color:"#555",marginTop:4}}>Quality: {chordQualities[selDeg]} · Notes: {chord.join(" – ")}</div>
      </div>
    );})()}
    <Insight text="Uppercase Roman numerals = major chords. Lowercase = minor. The ° means diminished. In any key: I, IV, and V are always major. ii, iii, and vi are always minor. vii° is always diminished." />
  </div>);
}

// ═══════════════════════════════════════════════════════════════
// GUIDE 8: SEVENTH CHORDS
// ═══════════════════════════════════════════════════════════════
