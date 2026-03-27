import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide19(){return(<div>
  <DarkBox title="The darker harmonic palette"><div style={{fontSize:14}}>
    <strong style={{color:"#c4a87a"}}>Dm7b5 → G7alt → Cm.</strong> The half-diminished ii and altered dominant create maximum tension before resolving to minor. The altered dominant (G7alt) = Ab melodic minor. This relationship is the key to minor jazz harmony.
  </div></DarkBox>
  <Card color="#1B5E20" title="Minor ii-V-i approaches">
    {[{approach:"Locrian #2 over iim7b5",line:"D locrian #2 (D-E-F-G-Ab-Bb-C) over Dm7b5",desc:"The natural 2 (E instead of Eb) makes the scale more melodic. Same as Bb melodic minor from the 3rd."},
      {approach:"Altered scale over V7alt",line:"G altered (Ab melodic minor: Ab-Bb-Cb-Db-Eb-F-G) over G7alt",desc:"Contains b9, #9, #11, b13 — all the altered tensions. THE sound of minor jazz dominance."},
      {approach:"Harmonic minor over V7",line:"C harmonic minor (C-D-Eb-F-G-Ab-B) over G7→Cm",desc:"The B natural creates the V7 leading tone. Works especially well on the resolution to i."},
      {approach:"Diminished scale over V7",line:"G half-whole diminished (G-Ab-Bb-B-Db-D-E-F) over G7(b9)",desc:"Gives you b9, #9, natural 3, b5(#11), 5, 13, b7. Symmetrical — moveable in minor 3rds."},
    ].map((a,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #333":"none"}}>
      <span style={{fontWeight:700,color:"#81C784"}}>{a.approach}</span><br/>
      <div style={{fontSize:12,color:"#ccc",fontFamily:"monospace",margin:"4px 0"}}>{a.line}</div>
      <span style={{fontSize:11,color:"#888"}}>{a.desc}</span>
    </div>))}
  </Card>
</div>);}
