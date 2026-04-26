import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';
import { Insight } from './_helpers';

export function Guide21(){return(<div>
  <DarkBox title="Form, melody & storytelling"><div style={{fontSize:14}}>
    Playing over standards means <strong style={{color:"#c4a87a"}}>hearing the form</strong> while improvising. Know where the bridge is, where the turnaround lands, where the coda goes. The melody is your compass — even when you're not playing it, you should be hearing it.
  </div></DarkBox>
  <Card color="#388E3C" title="Standard form types">
    {[{form:"32-bar AABA",bars:"8+8+8+8",desc:"The most common standard form. A section establishes the tune, B (bridge) contrasts, final A resolves. 'All the Things You Are,' 'Body and Soul.'"},
      {form:"Blues (12-bar)",bars:"4+4+4",desc:"I (4 bars) → IV-I (4 bars) → V-IV-I (4 bars). The foundation of jazz. Bird blues, minor blues, jazz blues all derive from this."},
      {form:"ABAC / 32-bar through",bars:"8+8+8+8",desc:"Two different B sections instead of repeating A. 'Stella by Starlight,' 'My Funny Valentine.'"},
      {form:"Rhythm changes",bars:"AABA (32)",desc:"Based on Gershwin's 'I Got Rhythm.' The A is I-vi-ii-V with variations. The bridge is dom7 cycle. Hundreds of contrafacts."},
      {form:"Modal (vamp-based)",bars:"varies",desc:"One or two chords for extended periods. 'So What' (16 bars Dm, 8 bars Ebm, 8 bars Dm). Freedom to develop ideas without chord-to-chord pressure."},
    ].map((f,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<4?"1px solid #333":"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontWeight:700,color:"#81C784"}}>{f.form}</span>
        <span style={{fontSize:10,color:"#666",fontFamily:"monospace"}}>{f.bars}</span>
      </div>
      <span style={{fontSize:12,color:"#999"}}>{f.desc}</span>
    </div>))}
  </Card>
  <Insight text="Practice singing the melody of a standard while comping. If you can do this, you'll never lose your place in the form. The melody IS the form." />
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUIDES 22-25: TONE & TOUCH
// ═══════════════════════════════════════════════════════════════
