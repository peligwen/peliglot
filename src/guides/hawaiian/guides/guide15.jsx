import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { Insight } from './_helpers';

export function Guide15(){
  const pronouns=[
    {en:"I/me",hw:"au / wau",num:"singular",note:"wau after i or e"},
    {en:"you (s)",hw:"\u02BBoe",num:"singular",note:""},
    {en:"he/she",hw:"ia",num:"singular",note:"No gender distinction!"},
    {en:"we two (incl.)",hw:"k\u0101ua",num:"dual",note:"You and me"},
    {en:"we two (excl.)",hw:"m\u0101ua",num:"dual",note:"Me and someone else (not you)"},
    {en:"you two",hw:"\u02BBlua",num:"dual",note:""},
    {en:"they two",hw:"l\u0101ua",num:"dual",note:""},
    {en:"we all (incl.)",hw:"k\u0101kou",num:"plural",note:"All of us including you"},
    {en:"we all (excl.)",hw:"m\u0101kou",num:"plural",note:"Us but not you"},
    {en:"you all",hw:"\u02BBoukou",num:"plural",note:""},
    {en:"they all",hw:"l\u0101kou",num:"plural",note:""},
  ];
  const numColors={singular:"#1B5E20",dual:"#E65100",plural:"#0D47A1"};
  return(<div>
    <DarkBox title="Singular, Dual & Plural + Inclusive vs Exclusive"><div style={{fontSize:13,lineHeight:1.6}}>
      Hawaiian distinguishes <strong style={{color:"#FFE77A"}}>exactly two</strong> from <strong style={{color:"#FFE77A"}}>three or more</strong>, and <strong style={{color:"#FFE77A"}}>inclusive 'we'</strong> (you + me) from <strong style={{color:"#FFE77A"}}>exclusive 'we'</strong> (me + others, not you).
    </div></DarkBox>
    <Card color="#1B5E20" title="All Personal Pronouns">
      {pronouns.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"90px 80px 1fr",padding:"8px 14px",borderBottom:i<pronouns.length-1?"1px solid #f0eeeb":"none",alignItems:"center",gap:8}}>
        <span style={{fontSize:12,color:"#888"}}>{p.en}</span>
        <span style={{fontSize:15,fontWeight:700,color:numColors[p.num],fontStyle:"italic"}}>{p.hw}</span>
        <span style={{fontSize:11,color:"#aaa"}}>{p.note}</span>
      </div>))}
    </Card>
    <Insight text="The inclusive/exclusive 'we' is a key feature. Saying 'k\u0101kou' (all of us together) vs 'm\u0101kou' (us but not you) carries important social meaning about inclusion."/>
  </div>);
}
