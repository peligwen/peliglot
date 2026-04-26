import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide25(){return(<div>
  <DarkBox title="Where words meet melody"><div style={{fontSize:14}}>
    <strong style={{color:"#FFE77A"}}>Prosody</strong> = the natural rhythm and stress of language. Good lyrics match their stressed syllables to strong beats. When prosody is wrong, lyrics feel forced even if the words are great.
  </div></DarkBox>
  <Card color="#6A1B9A" title="Lyric principles">
    {[{p:"Stress alignment",d:"Put stressed syllables on strong beats. 'a-MONG the FIELDS of BAR-ley' not 'A-mong the fields OF bar-ley.'"},
      {p:"Vowel sounds carry emotion",d:"Open vowels (ah, oh) sustain well and feel expansive. Closed vowels (ee, oo) feel intimate. Long notes need open vowels."},
      {p:"Rhyme schemes",d:"AABB (couplets) = punchy, conclusive. ABAB = flowing, narrative. ABCB = loose, conversational. Internal rhyme = sophistication."},
      {p:"The singable word",d:"Avoid consonant clusters on held notes. 'Strengths' is hard to sing on a long note. 'Love' is easy."},
    ].map((x,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <span style={{fontWeight:700,color:"#6A1B9A"}}>{x.p}</span><br/>
      <span style={{fontSize:12,color:"#555"}}>{x.d}</span>
    </div>))}
  </Card>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 26-28: SOUND
// ═══════════════════════════════════════════════════════════════
