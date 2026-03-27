import { Insight as BaseInsight } from '../../../components/Insight';

export const playBtnStyle = {padding:"6px 12px",borderRadius:8,background:"#3a3025",color:"#c4a87a",border:"1px solid #4a4035",cursor:"pointer",fontSize:12,fontWeight:700};

// ═══════════════════════════════════════════════════════════════
// GUIDE 1: VOICE LEADING

export function Insight({text}){return <BaseInsight text={text} emoji={"\u{1F3B8}"} bg="#2a2218" border="#3a3025" color="#c4a87a" />;}

export function Ref({name, text}) {
  return(<div style={{background:"#1a1a1a",borderRadius:10,padding:"10px 14px",marginBottom:12,border:"1px solid #333",fontSize:12,color:"#999",lineHeight:1.5}}>
    🎧 <strong style={{color:"#aaa"}}>{name}:</strong> {text}
  </div>);
}

// FRETBOARD DIAGRAM

export function Fretboard({frets=5,startFret=0,dots=[],labels={},highlightColor="#c4a87a",title}){
  const strings=6;const fretW=48;const strH=18;
  return(<div style={{marginBottom:16}}>
    {title&&<div style={{fontSize:12,fontWeight:700,color:"#888",marginBottom:6,textAlign:"center"}}>{title}</div>}
    <div style={{overflowX:"auto",display:"flex",justifyContent:"center"}}>
      <svg width={frets*fretW+30} height={strings*strH+20} style={{minWidth:frets*fretW+30}}>
        {/* Frets */}
        {Array.from({length:frets+1}).map((_,f)=>(<line key={f} x1={20+f*fretW} y1={10} x2={20+f*fretW} y2={10+(strings-1)*strH} stroke={f===0&&startFret===0?"#aaa":"#444"} strokeWidth={f===0&&startFret===0?3:1}/>))}
        {/* Strings */}
        {Array.from({length:strings}).map((_,s)=>(<line key={s} x1={20} y1={10+s*strH} x2={20+frets*fretW} y2={10+s*strH} stroke="#555" strokeWidth={1}/>))}
        {/* Fret numbers */}
        {Array.from({length:frets}).map((_,f)=>(<text key={f} x={20+f*fretW+fretW/2} y={10+(strings-1)*strH+16} textAnchor="middle" fontSize={9} fill="#555">{startFret+f+1}</text>))}
        {/* Dots */}
        {dots.map((d,i)=>{const isHL=d.hl!==false;return(
          <g key={i}>
            <circle cx={20+(d.fret-startFret-0.5)*fretW} cy={10+(d.string-1)*strH} r={7} fill={isHL?highlightColor:"#444"} stroke={isHL?highlightColor:"#555"} strokeWidth={1}/>
            {d.label&&<text x={20+(d.fret-startFret-0.5)*fretW} y={10+(d.string-1)*strH+3.5} textAnchor="middle" fontSize={8} fill={isHL?"#1a1a1a":"#aaa"} fontWeight={700}>{d.label}</text>}
          </g>
        );})}
        {/* Open/muted strings */}
        {[1,2,3,4,5,6].map(s=>{const dot=dots.find(d=>d.string===s&&d.fret===0);const mute=labels["x"+s];return dot?(<text key={s} x={8} y={10+(s-1)*strH+4} textAnchor="middle" fontSize={10} fill={highlightColor} fontWeight={700}>○</text>):mute?(<text key={s} x={8} y={10+(s-1)*strH+4} textAnchor="middle" fontSize={10} fill="#555">✕</text>):null;})}
      </svg>
    </div>
  </div>);
}

// Audio functions imported from ../../utils/audio
