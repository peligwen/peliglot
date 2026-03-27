import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide29(){return(<div>
  <DarkBox title="The single most effective practice method"><div style={{fontSize:14}}>
    Every great jazz musician learned by <strong style={{color:"#c4a87a"}}>transcribing solos</strong> — listening, singing, then finding the notes on the instrument. It's how vocabulary gets into your ears and fingers simultaneously. No shortcut exists.
  </div></DarkBox>
  <Card color="#616161" title="How to transcribe">
    {[{step:"1. Choose a solo you love",desc:"Not the hardest solo — one that you want to SOUND like. Emotional connection matters more than technical challenge. Start with blues or ballad solos."},
      {step:"2. Slow it down (but not too much)",desc:"Use software (Transcribe!, Amazing Slow Downer, YouTube speed). 75% speed is usually enough. Going too slow distorts the feel."},
      {step:"3. Sing it first",desc:"If you can't sing it, you can't play it. Sing along with the recording until you have the solo memorized vocally. This is the most important step."},
      {step:"4. Find it on guitar",desc:"Sing a phrase, find it on your instrument. Don't use tabs — the searching process builds your ear. Work in small chunks (2-4 bars)."},
      {step:"5. Analyze it",desc:"Once you have the notes, ask: what's the chord? What chord tones are they targeting? What devices are they using (enclosures, arpeggios, chromaticism)?"},
      {step:"6. Absorb, don't memorize",desc:"The goal isn't to perform the solo verbatim — it's to absorb the vocabulary so it comes out naturally in YOUR playing. Transpose licks to other keys."},
    ].map((s,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<5?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#aaa"}}>{s.step}</span><br/>
      <span style={{fontSize:12,color:"#888"}}>{s.desc}</span>
    </div>))}
  </Card>
  <div style={{background:"#1e1e1e",borderRadius:10,padding:"10px 14px",border:"1px solid #333",marginBottom:12}}>
    <div style={{fontSize:12,fontWeight:700,color:"#c4a87a",marginBottom:6}}>Suggested first transcriptions (accessible, musical, influential):</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {["Wes Montgomery — 'Four on Six'","Jim Hall — 'All Across the City'","Grant Green — 'Alone Together'","Joe Pass — 'Blues for Hank'","Pat Metheny — 'Bright Size Life'"].map(s=>(<span key={s} style={{padding:"3px 8px",borderRadius:4,background:"#2a2218",color:"#c4a87a",fontSize:11,border:"1px solid #3a3025"}}>{s}</span>))}
    </div>
  </div>
</div>);}
