import { Card } from '../../../components/Card';
import { DarkBox } from '../../../components/DarkBox';

export function Guide23(){return(<div>
  <Card color="#00695C" title="Dónde van los adverbios">
    {[{type:"Frecuencia: ANTES del verbo principal",ex:"I always wake up early. She never eats meat. He usually drives.",words:["always","usually","often","sometimes","rarely","never"],color:"#00695C"},
      {type:"Modo: DESPUÉS del verbo/objeto",ex:"She speaks English fluently. He drives carefully. They work hard.",words:["fluently","carefully","quickly","slowly","well","hard"],color:"#1565C0"},
    ].map((r,i)=>(<div key={i} style={{padding:"10px 16px",borderBottom:i===0?"1px solid #f0eeeb":"none"}}>
      <div style={{fontSize:13,fontWeight:700,color:r.color,marginBottom:4}}>{r.type}</div>
      <div style={{fontSize:12,color:"#555",fontStyle:"italic",marginBottom:6}}>{r.ex}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{r.words.map(w=>(<span key={w} style={{padding:"3px 8px",borderRadius:12,background:`${r.color}10`,color:r.color,fontSize:11,fontWeight:600,border:`1px solid ${r.color}25`}}>{w}</span>))}</div>
    </div>))}
  </Card>
  <DarkBox title="Trampas con adverbios"><div style={{fontSize:13,lineHeight:1.6,textAlign:"left"}}>
    <strong style={{color:"#EF9A9A"}}>hard ≠ hardly:</strong> She works <strong style={{color:"#FFE77A"}}>hard</strong> (mucho) vs She <strong style={{color:"#FFE77A"}}>hardly</strong> works (apenas)<br/>
    <strong style={{color:"#90CAF9"}}>-ly no siempre necesario:</strong> He drives slow / slowly (ambos OK en americano)<br/>
    <strong style={{color:"#81C784"}}>good vs well:</strong> She sings <strong style={{color:"#FFE77A"}}>well</strong> (formal) · She sings <strong style={{color:"#FFE77A"}}>good</strong> (casual americano)
  </div></DarkBox>
</div>);}

// ═══════════════════════════════════════════════════════════════
// GUÍA 24: IN/ON/AT — EXPLORADOR INTERACTIVO
// ═══════════════════════════════════════════════════════════════
