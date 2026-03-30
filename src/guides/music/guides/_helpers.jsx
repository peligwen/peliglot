import { Insight as BaseInsight } from '../../../components/Insight';
import { playNote, playChord, playSequence } from '../../../utils/audio';

export const ALL_NOTES=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export const NOTE_NAMES={"C#":"Db","D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb"};

export const isBlack=n=>n.includes("#");

export const MAJOR_STEPS=[2,2,1,2,2,2,1];

export const INTERVALS=[
  {half:0,name:"Unison",short:"P1",mood:"Same note"},{half:1,name:"Minor 2nd",short:"m2",mood:"Tense, dissonant (Jaws theme)"},
  {half:2,name:"Major 2nd",short:"M2",mood:"Stepping up (Happy Birthday start)"},
  {half:3,name:"Minor 3rd",short:"m3",mood:"Sad, minor chord feel"},{half:4,name:"Major 3rd",short:"M3",mood:"Happy, major chord feel"},
  {half:5,name:"Perfect 4th",short:"P4",mood:"Open, strong (Here Comes the Bride)"},
  {half:6,name:"Tritone",short:"TT",mood:"Unstable, 'the devil's interval' (The Simpsons)"},
  {half:7,name:"Perfect 5th",short:"P5",mood:"Powerful, open (Star Wars)"},
  {half:8,name:"Minor 6th",short:"m6",mood:"Bittersweet"},{half:9,name:"Major 6th",short:"M6",mood:"Warm (My Bonnie)"},
  {half:10,name:"Minor 7th",short:"m7",mood:"Bluesy tension"},{half:11,name:"Major 7th",short:"M7",mood:"Dreamy, almost home"},
  {half:12,name:"Octave",short:"P8",mood:"Same note, higher"},
];

export function Insight({text}){return <BaseInsight text={text} emoji={"\u{1F3B5}"} />;}

// Music utilities

export function noteName(n){return NOTE_NAMES[n]?`${n}/${NOTE_NAMES[n]}`:n;}

// Piano component

export function Piano({startOctave=4,keys=12,highlighted=[],highlightColor="#C62828",labels={},onPlay}){
  const notes=[];
  for(let o=startOctave;notes.length<keys;o++){
    for(const n of ALL_NOTES){notes.push(n+o);if(notes.length>=keys)break;}
  }
  const whites=notes.filter(n=>!isBlack(n[0]+n.slice(1,-1)));
  const wW=Math.min(36,Math.floor(580/whites.length));
  return(
    <div style={{position:"relative",height:120,marginBottom:16,display:"flex",justifyContent:"center"}}>
      <div style={{position:"relative",display:"flex",height:"100%"}}>
        {notes.map((n,_i)=>{
          const base=n.slice(0,-1);const isB=isBlack(base);
          const hl=highlighted.includes(base)||highlighted.includes(n);
          const label=labels[base]||labels[n]||"";
          if(isB)return null;
          return(<div key={n} onClick={()=>{playNote(n);onPlay&&onPlay(n,base);}} style={{width:wW,height:"100%",background:hl?highlightColor:"#fff",border:"1px solid #ccc",borderRadius:"0 0 5px 5px",cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:6,position:"relative",zIndex:1,transition:"background 0.1s"}}>
            {label&&<div style={{fontSize:9,fontWeight:700,color:hl?"#fff":"#aaa"}}>{label}</div>}
            <div style={{fontSize:8,color:hl?"rgba(255,255,255,0.7)":"#ccc"}}>{base}</div>
          </div>);
        })}
        {(()=>{let wPos=0;return notes.map((n,_i)=>{
          const base=n.slice(0,-1);const isB=isBlack(base);
          if(!isB){wPos++;return null;}
          const hl=highlighted.includes(base)||highlighted.includes(n);
          const label=labels[base]||labels[n]||"";
          return(<div key={n} onClick={()=>{playNote(n);onPlay&&onPlay(n,base);}} style={{position:"absolute",left:(wPos-1)*wW+wW*0.65,width:wW*0.7,height:"62%",background:hl?highlightColor:"#333",borderRadius:"0 0 4px 4px",cursor:"pointer",zIndex:2,display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:4,transition:"background 0.1s"}}>
            {label&&<div style={{fontSize:8,fontWeight:700,color:hl?"#fff":"#888"}}>{label}</div>}
          </div>);
        });})()}
      </div>
    </div>
  );
}

export function buildScale(root,steps){
  let idx=ALL_NOTES.indexOf(root);const notes=[root];
  for(const s of steps){idx=(idx+s)%12;notes.push(ALL_NOTES[idx]);}
  return notes;
}

export function buildChord(root,intervals){
  let idx=ALL_NOTES.indexOf(root);const notes=[root];
  for(const iv of intervals){idx=(idx+iv)%12;notes.push(ALL_NOTES[idx]);}
  return notes;
}

export const CHORD_TYPES={major:[4,3],minor:[3,4],dim:[3,3],aug:[4,4],maj7:[4,3,4],min7:[3,4,3],dom7:[4,3,3],dim7:[3,3,3],hdim7:[3,3,4]};

// GUIDE 1: THE 12 NOTES
// ═══════════════════════════════════════════════════════════════

export function ProgressionPlayer({root,numerals,chordTypes,color}){
  const scale=buildScale(root,MAJOR_STEPS);
  const chords=numerals.map((num,i)=>{const idx=parseInt(num)-1;const r=scale[idx];return{root:r,type:chordTypes[i],notes:buildChord(r,CHORD_TYPES[chordTypes[i]]).map(n=>n+"4")};});
  return(
    <div style={{background:"#fff",borderRadius:12,padding:"12px 16px",border:`2px solid ${color}`,marginBottom:16}}>
      <div style={{display:"flex",gap:6,marginBottom:8,justifyContent:"center"}}>
        {chords.map((c,i)=>(<button key={i} onClick={()=>playChord(c.notes)} style={{flex:1,maxWidth:90,padding:"8px 4px",borderRadius:8,background:color,color:"#fff",cursor:"pointer",textAlign:"center",border:"none"}}>
          <div style={{fontSize:16,fontWeight:800}}>{c.root}{c.type==="minor"?"m":c.type==="dim"?"°":""}</div>
        </button>))}
      </div>
      <button onClick={()=>playSequence(chords.map(c=>c.notes),600)} style={{width:"100%",padding:"8px",borderRadius:8,background:"#1a1a1a",color:"#FFE77A",border:"none",cursor:"pointer",fontSize:13,fontWeight:700}}>▶ Play full progression</button>
    </div>
  );
}
