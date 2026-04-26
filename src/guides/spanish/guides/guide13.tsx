import { useState } from 'react';
import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from '../../../components/Insight';
import { adjs, nouns, shifts } from './data13';
import type { FormKey } from './data13';

export function Guide13(){
  const [gen,setGen]=useState("m");const [num,setNum]=useState("s");
  const key=(gen+num) as FormKey;
  const col=gen==="m"?"#1565C0":"#AD1457";
  return(<div>
    <DarkBox title="Agreement Rule"><div style={{fontSize:14}}>Adjectives must match the noun in <strong style={{color:"#90CAF9"}}>gender</strong> and <strong style={{color:"#FFE77A"}}>number</strong>. Toggle below to see how they change.</div></DarkBox>
    <div style={{display:"flex",gap:8,marginBottom:10,justifyContent:"center"}}>
      {[{k:"m",l:"Masculine",c:"#1565C0"},{k:"f",l:"Feminine",c:"#AD1457"}].map(g=>(<button key={g.k} onClick={()=>setGen(g.k)} style={{flex:1,maxWidth:160,padding:"10px",borderRadius:10,border:gen===g.k?`2.5px solid ${g.c}`:"1.5px solid #ddd",background:gen===g.k?g.c:"#fff",color:gen===g.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{g.l}</button>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
      {[{k:"s",l:"Singular"},{k:"p",l:"Plural"}].map(n=>(<button key={n.k} onClick={()=>setNum(n.k)} style={{flex:1,maxWidth:160,padding:"10px",borderRadius:10,border:num===n.k?`2.5px solid ${col}`:"1.5px solid #ddd",background:num===n.k?col:"#fff",color:num===n.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{n.l}</button>))}
    </div>
    <Card color={col} title={nouns[key]} subtitle="adjective forms">
      {adjs.map((a,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"8px 16px",borderBottom:i<adjs.length-1?"1px solid #f0eeeb":"none"}}>
        <div style={{flex:1}}><span style={{fontSize:16,fontWeight:700,color:col}}>{a.forms[key]}</span></div>
        <div style={{fontSize:11,color:"#999"}}>{a.en}</div>
        <div style={{marginLeft:8,padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:700,background:a.type==="4-form"?"#E3F2FD":a.type==="2-form"?"#F3E5F5":"#FFF3E0",color:a.type==="4-form"?"#1565C0":a.type==="2-form"?"#6A1B9A":"#E65100"}}>{a.type}</div>
      </div>))}
    </Card>
    <Card color="#1a1a1a" title="Placement: Before vs After = Meaning Shift">
      {shifts.map((s,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",alignItems:"center",padding:"8px 16px",borderBottom:i<shifts.length-1?"1px solid #f0eeeb":"none",fontSize:12}}>
        <span style={{fontWeight:800,color:"#333"}}>{s.a}</span>
        <span style={{color:"#2E7D32"}}>before = {s.before}</span>
        <span style={{color:"#C62828"}}>after = {s.after}</span>
      </div>))}
    </Card>
    <Insight text="Default position is AFTER the noun: 'la casa roja'. Before the noun adds subjective or emotional emphasis: 'la hermosa vista'."/>

    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginTop:8}}>
      <div style={{padding:"10px 16px",background:"#E3F2FD",borderBottom:"1px solid #BBDEFB",fontSize:13,fontWeight:800,color:"#0D47A1"}}>Demonstratives — este / ese / aquel</div>
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        Three levels of distance. All agree in gender and number with the noun they modify.
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#E3F2FD"}}>
            <th style={{padding:"6px 12px",textAlign:"left",fontWeight:700,color:"#0D47A1"}}>Distance</th>
            <th style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>Masc.S</th>
            <th style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>Fem.S</th>
            <th style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>Masc.P</th>
            <th style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>Fem.P</th>
            <th style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>Neuter</th>
          </tr></thead>
          <tbody>
            {[{d:"This/these (here)",ms:"este",fs:"esta",mp:"estos",fp:"estas",n:"esto"},
              {d:"That/those (there)",ms:"ese",fs:"esa",mp:"esos",fp:"esas",n:"eso"},
              {d:"That/those (far away)",ms:"aquel",fs:"aquella",mp:"aquellos",fp:"aquellas",n:"aquello"}].map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f0eeeb"}}>
                <td style={{padding:"6px 12px",color:"#555"}}>{r.d}</td>
                <td style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>{r.ms}</td>
                <td style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#AD1457"}}>{r.fs}</td>
                <td style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#0D47A1"}}>{r.mp}</td>
                <td style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#AD1457"}}>{r.fp}</td>
                <td style={{padding:"6px 8px",textAlign:"center",fontWeight:700,color:"#558B2F"}}>{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{padding:"8px 14px",fontSize:11,color:"#888",borderTop:"1px solid #f0eeeb",lineHeight:1.6}}>
        Neuter forms (<em>esto, eso, aquello</em>) refer to ideas/concepts with unknown or no gender: <em>¿Qué es esto?</em> (What is this?). The three-way distance (here/there/over-there) maps roughly to yo/tú/él proximity.
      </div>
    </div>

    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee",marginTop:8}}>
      <div style={{padding:"10px 16px",background:"#FFF3E0",borderBottom:"1px solid #FFE0B2",fontSize:13,fontWeight:800,color:"#E65100"}}>Possessives — Short vs Long Form</div>
      <div style={{padding:"10px 14px",fontSize:12,color:"#555",lineHeight:1.6}}>
        <strong>Short form</strong> (before noun): mi, tu, su, nuestro/a, vuestro/a, su.<br/>
        <strong>Long form</strong> (after noun, or standalone): mío/a, tuyo/a, suyo/a, nuestro/a, vuestro/a, suyo/a.
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#FFF3E0"}}>
            <th style={{padding:"6px 12px",textAlign:"left",fontWeight:700,color:"#E65100"}}>Person</th>
            <th style={{padding:"6px 10px",textAlign:"center",fontWeight:700,color:"#E65100"}}>Short (before noun)</th>
            <th style={{padding:"6px 10px",textAlign:"center",fontWeight:700,color:"#E65100"}}>Long (after noun)</th>
          </tr></thead>
          <tbody>
            {[{p:"I",short:"mi / mis",long:"mío/a/os/as"},
              {p:"you (tú)",short:"tu / tus",long:"tuyo/a/os/as"},
              {p:"he/she/Ud.",short:"su / sus",long:"suyo/a/os/as"},
              {p:"we",short:"nuestro/a/os/as",long:"nuestro/a/os/as"},
              {p:"vosotros",short:"vuestro/a/os/as",long:"vuestro/a/os/as"},
              {p:"they/Uds.",short:"su / sus",long:"suyo/a/os/as"}].map((r,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f0eeeb"}}>
                <td style={{padding:"6px 12px",color:"#555"}}>{r.p}</td>
                <td style={{padding:"6px 10px",textAlign:"center",fontWeight:700,color:"#E65100"}}>{r.short}</td>
                <td style={{padding:"6px 10px",textAlign:"center",fontWeight:600,color:"#555"}}>{r.long}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{padding:"8px 14px",fontSize:11,color:"#888",borderTop:"1px solid #f0eeeb",lineHeight:1.6}}>
        <strong>Short form:</strong> <em>mi libro</em> (my book) — no article needed.<br/>
        <strong>Long form:</strong> <em>el libro mío</em> (the book of mine) — used after noun or as pronoun: <em>¿Es tuyo?</em> (Is it yours?)<br/>
        Long forms agree in gender + number with the noun: <em>la amiga mía</em>, <em>los libros tuyos</em>.
      </div>
    </div>
  </div>);
}
