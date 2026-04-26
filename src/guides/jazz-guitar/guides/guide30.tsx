import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight, Ref } from './_helpers';

export function Guide30(){return(<div>
  <DarkBox title="The hierarchy: time > harmony > melody > vocabulary"><div style={{fontSize:14}}>
    If your time is great, you sound professional even with simple ideas. If your time is bad, the most sophisticated vocabulary won't save you. <strong style={{color:"#c4a87a"}}>Prioritize accordingly.</strong>
  </div></DarkBox>
  <Card color="#757575" title="Practice structure">
    {[{block:"Warm-up (10 min)",desc:"Scales, arpeggios, or technique — but with a musical purpose. Don't mindlessly run patterns. Focus on tone, time, and relaxation."},
      {block:"Harmony (20 min)",desc:"Voicings through a tune, voice-leading exercises, comping with a play-along. Work on smoothness between chords."},
      {block:"Melody/Vocabulary (20 min)",desc:"Transcription work, practicing licks in all keys, applying new devices over changes. This is where you build your language."},
      {block:"Repertoire (20 min)",desc:"Play through tunes. Practice the form, the melody, the head arrangement. Simulate the bandstand — play the head, comp, solo, trade, take it out."},
      {block:"Free play (10 min)",desc:"No agenda. Just play. Follow your ears. This is where everything integrates and your personal voice emerges."},
    ].map((b,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#B0BEC5"}}>{b.block}</span><br/>
      <span style={{fontSize:12,color:"#888"}}>{b.desc}</span>
    </div>))}
  </Card>
  <Insight text="The practice room develops your vocabulary. The bandstand develops your voice. You need both. Playing with real humans — even if they're better than you, ESPECIALLY if they're better — is where growth actually happens." />
  <Ref name="Final thought" text="'The problem with jazz guitar is that you spend years learning to play, and then you have to spend years learning to not play.' — Jim Hall" />
</div>);}