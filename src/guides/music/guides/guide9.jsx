import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { playChord } from '../../../utils/audio';

export function Guide9(){
  const symbols=[
    {sym:"C",means:"C major triad",notes:"C E G"},{sym:"Cm",means:"C minor triad",notes:"C Eb G"},
    {sym:"C7",means:"C dominant 7th",notes:"C E G Bb"},{sym:"Cmaj7",means:"C major 7th",notes:"C E G B"},
    {sym:"Cm7",means:"C minor 7th",notes:"C Eb G Bb"},{sym:"Cdim",means:"C diminished",notes:"C Eb Gb"},
    {sym:"Caug",means:"C augmented",notes:"C E G#"},{sym:"Csus2",means:"C suspended 2nd",notes:"C D G"},
    {sym:"Csus4",means:"C suspended 4th",notes:"C F G"},{sym:"C/E",means:"C major, E in bass",notes:"E C G"},
    {sym:"Cadd9",means:"C major + 9th (no 7th)",notes:"C E G D"},{sym:"C5",means:"C power chord",notes:"C G"},
  ];
  return(<div>
    <DarkBox title="Decoding chord symbols"><div style={{fontSize:14}}>Chord symbols are shorthand. The letter = root note. Everything after tells you the <strong style={{color:"#FFE77A"}}>quality</strong> (what kind of chord). Tap any to hear it.</div></DarkBox>
    <Card color="#6A1B9A" title="Chord Symbol Reference" subtitle="Tap to play">
      {symbols.map((s,i)=>(<div key={i} onClick={()=>{const ns=s.notes.split(" ");playChord(ns.map(n=>n+"4"));}} style={{display:"grid",gridTemplateColumns:"70px 1fr 1fr",padding:"8px 14px",borderBottom:i<symbols.length-1?"1px solid #f0eeeb":"none",cursor:"pointer",alignItems:"center"}}>
        <span style={{fontSize:15,fontWeight:800,color:"#6A1B9A"}}>{s.sym}</span>
        <span style={{fontSize:12,color:"#555"}}>{s.means}</span>
        <span style={{fontSize:11,color:"#888",textAlign:"right"}}>{s.notes}</span>
      </div>))}
    </Card>
  </div>);
}
