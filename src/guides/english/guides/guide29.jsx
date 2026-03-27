import { Card } from '../../../components/Card';
import { Trampa } from './_helpers';

export function Guide29(){return(<div>
  <Card color="#2E7D32" title="Pronombres relativos" subtitle="Quién, cuál, que, cuyo">
    {[{pron:"WHO",use:"personas (sujeto)",ex:"The woman who called is here.",color:"#2E7D32"},
      {pron:"WHICH",use:"cosas (no-definitorias, con comas)",ex:"This book, which I bought yesterday, is great.",color:"#1565C0"},
      {pron:"THAT",use:"personas o cosas (definitorias, sin comas)",ex:"The book that I read was good.",color:"#6A1B9A"},
      {pron:"WHOSE",use:"posesión",ex:"The man whose car broke down...",color:"#E65100"},
      {pron:"WHERE",use:"lugar",ex:"The restaurant where we ate...",color:"#C62828"},
      {pron:"∅ omitido",use:"cuando es OBJETO (se puede omitir)",ex:"The book (that) I read... ✅ The man (who) I met... ✅",color:"#888"},
    ].map((r,i)=>(<div key={i} style={{padding:"8px 14px",borderBottom:i<5?"1px solid #f0eeeb":"none",borderLeft:`4px solid ${r.color}`}}>
      <span style={{background:r.color,color:"#fff",padding:"1px 8px",borderRadius:4,fontSize:12,fontWeight:800}}>{r.pron}</span> <span style={{fontSize:11,color:"#888"}}>{r.use}</span><br/>
      <span style={{fontSize:12,color:"#555",fontStyle:"italic"}}>{r.ex}</span>
    </div>))}
  </Card>
  <Trampa text="Sujeto = NO se puede omitir: 'The man WHO called...' ✅ Objeto = SÍ se puede omitir: 'The book (that) I read...' ✅" />
</div>);}


// ═══════════════════════════════════════════════════════════════
// GUÍA 30: ERRORES COMUNES Y FALSOS AMIGOS
// ═══════════════════════════════════════════════════════════════
