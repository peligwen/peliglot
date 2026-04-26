import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, ProgressionPlayer } from './_helpers';

export function Guide19(){
  // Use explicit chord symbols so audio plays proper 7th chords (via chordToneArray).
  // The 7ths are the guide tones — the b7→M3 / b7→M7 voice-leading motion IS the
  // entire lesson. Triads would make that motion inaudible.
  const iiVI=[
    {label:"Dm7",symbol:"Dm7",octave:3},
    {label:"G7",symbol:"G7",octave:3},
    {label:"Cmaj7",symbol:"Cmaj7",octave:3},
  ];
  return(<div>
    <DarkBox title="The backbone of jazz harmony"><div style={{fontSize:14}}>
      <strong style={{color:"#FFE77A"}}>ii – V – I</strong> is to jazz what I – IV – V is to blues. It works because each chord is a fifth away from the next — the strongest resolution in music, chained together.
    </div></DarkBox>
    <ProgressionPlayer chords={iiVI} color="#E65100" />
    <Card color="#E65100" title="Why ii – V – I works">
      {[{step:"ii (Dm7)",role:"Preparation — creates mild tension and forward motion. The F and C are guide tones.",ex:"F (3rd) and C (7th) define Dm7's minor color"},
        {step:"V (G7)",role:"Maximum tension — the 7th (F) and 3rd (B) want to resolve. F moves to E. B moves to C.",ex:"F→E and B→C: the half-step voice-leading chain"},
        {step:"I (Cmaj7)",role:"Resolution — home. The tension dissolves into the warm major 7th (B).",ex:"E (3rd) and B (M7) are the new guide tones"},
      ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#E65100"}}>{s.step}</span> — <span style={{color:"#555"}}>{s.role}</span><br/>
        <span style={{fontSize:11,color:"#888"}}>{s.ex}</span>
      </div>))}
    </Card>
    <Card color="#1565C0" title="Secondary dominants — V of V, V of vi">
      {[{label:"V/V (D7 in C major)",desc:"A major chord a 5th above the V. D7 → G → C: the D7 makes the G chord feel inevitable. You hear this in nearly every ii-V-I turnaround."},
        {label:"V/vi (E7 in C major)",desc:"E7 → Am: the dominant of the relative minor. Use it to pivot into a minor section or add color to a final chord before the vi. Common in Beatles-era pop."},
        {label:"The pattern",desc:"Any diatonic chord can be 'tonicized' by placing its own V7 before it. V/ii = A7. V/IV = C7. These chromatic dominants borrow from outside the key momentarily, then resolve."},
      ].map((s,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<2?"1px solid #f0eeeb":"none"}}>
        <span style={{fontWeight:700,color:"#1565C0"}}>{s.label}</span>
        <div style={{fontSize:12,color:"#555",marginTop:2}}>{s.desc}</div>
      </div>))}
    </Card>
    <Insight text="Compare: I–IV–V is the blues/folk home cadence. ii–V–I is the jazz home cadence. The difference: ii substitutes for IV with a different bass note and, crucially, a different function — it's a pre-dominant leading into the dominant. Same destination, richer path." />
  </div>);
}
