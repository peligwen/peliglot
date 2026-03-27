import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide30(){return(<div>
  <DarkBox title="Same 12 notes, different grammar"><div style={{fontSize:14}}>
    Every genre uses the same 12 notes but with different <strong style={{color:"#FFE77A"}}>conventions</strong> — preferred scales, chord types, rhythmic patterns, timbres, and structures. Learning these conventions is like learning a dialect.
  </div></DarkBox>
  <Card color="#1a1a1a" title="Genre fingerprints">
    {[{genre:"Blues",chords:"Dominant 7ths everywhere (I7, IV7, V7)",scale:"Minor pentatonic + blue note",rhythm:"Shuffle feel, 12-bar form",sig:"The 'bent' note. Raw expression."},
      {genre:"Jazz",chords:"7ths, 9ths, 13ths. ii-V-I. Complex harmony.",scale:"All modes, altered scales, chromaticism",rhythm:"Swing, complex syncopation",sig:"Improvisation over changes."},
      {genre:"Rock",chords:"Power chords, I-IV-V, barre chords",scale:"Pentatonic, blues scale",rhythm:"Driving 4/4, heavy on 2 & 4",sig:"Distorted guitar, backbeat."},
      {genre:"Hip-Hop",chords:"Sampled loops, minor keys, simple progressions",scale:"Minor pentatonic, chromatic bass lines",rhythm:"Boom-bap, trap hi-hats, syncopated flows",sig:"The beat IS the instrument. Vocal rhythm = melodic."},
      {genre:"EDM",chords:"Simple triads, suspended chords, long pads",scale:"Minor scales, modal shifts",rhythm:"Four-on-the-floor kick, build-drop structure",sig:"The 'drop.' Texture and energy over harmony."},
      {genre:"Country",chords:"I-IV-V, I-vi-IV-V, simple triads",scale:"Major pentatonic, mixolydian",rhythm:"Train beat, two-step, shuffle",sig:"Steel guitar, fiddle. Storytelling lyrics."},
    ].map((g,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:15,fontWeight:800,color:"#1a1a1a"}}>{g.genre}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:4,fontSize:11}}>
        <div><span style={{color:"#C62828",fontWeight:600}}>Chords:</span> <span style={{color:"#555"}}>{g.chords}</span></div>
        <div><span style={{color:"#1565C0",fontWeight:600}}>Scales:</span> <span style={{color:"#555"}}>{g.scale}</span></div>
        <div><span style={{color:"#2E7D32",fontWeight:600}}>Rhythm:</span> <span style={{color:"#555"}}>{g.rhythm}</span></div>
        <div><span style={{color:"#6A1B9A",fontWeight:600}}>Signature:</span> <span style={{color:"#555"}}>{g.sig}</span></div>
      </div>
    </div>))}
  </Card>
  <Insight text="Genre boundaries are increasingly blurry — and that's a good thing. Understanding the 'grammar' of multiple genres lets you blend them intentionally. Most interesting modern music lives at the intersections." />
</div>);}