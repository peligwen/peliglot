import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from './_helpers';

export function Guide15(){
  const pronouns=[
    {en:"I/me",hw:"au / wau",num:"singular",note:"wau after front-vowel sequences (i, e, ai, ei)"},
    {en:"you (s)",hw:"ʻoe",num:"singular",note:""},
    {en:"he/she",hw:"ia",num:"singular",note:"No gender distinction!"},
    {en:"we two (incl.)",hw:"kāua",num:"dual",note:"You and me"},
    {en:"we two (excl.)",hw:"māua",num:"dual",note:"Me and someone else (not you)"},
    {en:"you two",hw:"ʻolua",num:"dual",note:""},
    {en:"they two",hw:"lāua",num:"dual",note:""},
    {en:"we all (incl.)",hw:"kākou",num:"plural",note:"All of us including you"},
    {en:"we all (excl.)",hw:"mākou",num:"plural",note:"Us but not you"},
    {en:"you all",hw:"ʻoukou",num:"plural",note:""},
    {en:"they all",hw:"lākou",num:"plural",note:""},
  ];
  const numColors: Record<string,string>={singular:"#1B5E20",dual:"#E65100",plural:"#0D47A1"};
  return(<div>
    <DarkBox title="Singular, Dual & Plural + Inclusive vs Exclusive"><div style={{fontSize:13,lineHeight:1.6}}>
      Hawaiian distinguishes <strong style={{color:"#FFE77A"}}>exactly two</strong> from <strong style={{color:"#FFE77A"}}>three or more</strong>, and <strong style={{color:"#FFE77A"}}>inclusive 'we'</strong> (you + me) from <strong style={{color:"#FFE77A"}}>exclusive 'we'</strong> (me + others, not you).
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      <div style={{background:"#E8F5E9",borderRadius:12,padding:"12px 14px",border:"2px solid #1B5E20"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1B5E20",marginBottom:6}}>kāua / kākou — INCLUSIVE</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
          <span style={{background:"#1B5E20",color:"#fff",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>ME</span>
          <span style={{background:"#1B5E20",color:"#fff",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>YOU</span>
          <span style={{background:"#C8E6C9",color:"#1B5E20",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>others…</span>
        </div>
        <div style={{fontSize:11,color:"#2E7D32"}}>You are <strong>inside</strong> the circle. We are doing this together.</div>
      </div>
      <div style={{background:"#FFF3E0",borderRadius:12,padding:"12px 14px",border:"2px solid #E65100"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#E65100",marginBottom:6}}>māua / mākou — EXCLUSIVE</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:6}}>
          <span style={{background:"#E65100",color:"#fff",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>ME</span>
          <span style={{background:"#FFCC80",color:"#E65100",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>others</span>
          <span style={{background:"#fff",color:"#aaa",padding:"4px 10px",borderRadius:20,fontSize:12,border:"1px dashed #ccc"}}>not you</span>
        </div>
        <div style={{fontSize:11,color:"#BF360C"}}>You are <strong>outside</strong> the circle. We are doing this without you.</div>
      </div>
    </div>
    <Card color="#1B5E20" title="All Personal Pronouns">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 80px 1fr",padding:"8px 14px",borderBottom:i<pronouns.length-1?"1px solid #f0eeeb":"none",alignItems:"center",gap:8}}>
        <span style={{fontSize:12,color:"#888"}}>{p.en}</span>
        <span style={{fontSize:15,fontWeight:700,color:numColors[p.num],fontStyle:"italic"}}>{p.hw}</span>
        <span style={{fontSize:11,color:"#aaa"}}>{p.note}</span>
      </div>))}
    </Card>
    <Insight text="The inclusive/exclusive 'we' is a key feature. Saying 'kākou' (all of us together) vs 'mākou' (us but not you) carries important social meaning about inclusion."/>
  </div>);
}
