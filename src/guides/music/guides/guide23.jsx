import { Card } from '../../../components/Card';
import { Insight } from './_helpers';

export function Guide23(){return(<div>
  <Card color="#1565C0" title="Common song structures">
    {[{form:"Verse – Chorus (most pop/rock)",desc:"Verse sets up the story. Chorus delivers the emotional/lyrical hook. Repeat with variation. Often: Intro – V – V – C – V – C – Bridge – C – Outro."},
      {form:"AABA (standard/jazz)",desc:"A = main theme (repeated). B = contrasting bridge. Classic Tin Pan Alley form. 'Somewhere Over the Rainbow.'"},
      {form:"Verse – Pre-Chorus – Chorus",desc:"Pre-chorus builds tension between verse and chorus. Creates anticipation. Most modern pop."},
      {form:"Through-composed",desc:"No repeating sections. Each part is new. Rare in pop, common in art music and some progressive rock."},
    ].map((f,i)=>(<div key={i} style={{padding:"10px 14px",borderBottom:i<3?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#1565C0"}}>{f.form}</div>
      <div style={{fontSize:12,color:"#555",marginTop:2}}>{f.desc}</div>
    </div>))}
  </Card>
  <Insight text="Structure creates expectation. Listeners unconsciously predict 'the chorus should come back here.' Fulfilling or subverting that expectation is how you keep people engaged." />
</div>);}
