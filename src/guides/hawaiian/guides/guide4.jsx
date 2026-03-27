import { DarkBox } from '../../../components/DarkBox';
import { Card } from '../../../components/Card';
import { CultureNote } from './_helpers';

const minPairs=[
  {w1:"pau",m1:"finished",w2:"pa'u",m2:"skirt/sarong",w3:"p\u0101'\u016B",m3:"moist, damp"},
  {w1:"kau",m1:"to place",w2:"ka'u",m2:"my (a-class)",w3:"k\u0101'\u016B",m3:"a district on Hawai\u02BBi"},
  {w1:"moa",m1:"chicken",w2:"mo'a",m2:"cooked",w3:"\u2014",m3:"\u2014"},
  {w1:"ai",m1:"to eat",w2:"'ai",m2:"food",w3:"\u2014",m3:"\u2014"},
  {w1:"ko",m1:"sugarcane",w2:"k\u014D",m2:"to drag/pull",w3:"ko'o",m3:"support"},
];

export function Guide4(){
  return(<div>
    <DarkBox title="Not Decorations \u2014 They Change Meaning"><div style={{fontSize:14,lineHeight:1.6}}>
      The <strong style={{color:"#FFE77A"}}>\u02BBokina</strong> (\u02BB) is a consonant \u2014 a glottal stop. The <strong style={{color:"#FFE77A"}}>kahak\u014D</strong> (\u0101) doubles vowel length. Both are <strong style={{color:"#EF9A9A"}}>required</strong> for correct spelling and meaning.
    </div></DarkBox>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"2px solid #C62828",textAlign:"center"}}>
        <div style={{fontSize:48,fontWeight:700,color:"#C62828",fontFamily:"'Georgia',serif"}}>\u02BB</div>
        <div style={{fontSize:14,fontWeight:700,color:"#C62828"}}>\u02BBOkina</div>
        <div style={{fontSize:12,color:"#666",marginTop:4}}>Glottal stop \u2014 the catch in "uh-oh"</div>
        <div style={{fontSize:11,color:"#999",marginTop:4}}>Looks like an opening single quote, NOT an apostrophe</div>
      </div>
      <div style={{background:"#fff",borderRadius:14,padding:"16px",border:"2px solid #0D47A1",textAlign:"center"}}>
        <div style={{fontSize:48,fontWeight:700,color:"#0D47A1",fontFamily:"'Georgia',serif"}}>\u0101</div>
        <div style={{fontSize:14,fontWeight:700,color:"#0D47A1"}}>Kahak\u014D</div>
        <div style={{fontSize:12,color:"#666",marginTop:4}}>Macron \u2014 doubles the vowel length</div>
        <div style={{fontSize:11,color:"#999",marginTop:4}}>Appears on all 5 vowels: \u0101 \u0113 \u012B \u014D \u016B</div>
      </div>
    </div>
    <Card color="#C62828" title="Minimal Pairs \u2014 Same Letters, Different Meaning">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"6px 14px",fontSize:10,fontWeight:700,color:"#999",borderBottom:"1px solid #eee"}}>
        <div>Plain</div><div>With \u02BBokina</div><div>With kahak\u014D</div>
      </div>
      {minPairs.map((p,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"8px 14px",borderBottom:i<minPairs.length-1?"1px solid #f0eeeb":"none"}}>
        <div><span style={{fontWeight:700,fontStyle:"italic"}}>{p.w1}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m1}</span></div>
        <div><span style={{fontWeight:700,fontStyle:"italic",color:"#C62828"}}>{p.w2}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m2}</span></div>
        <div><span style={{fontWeight:700,fontStyle:"italic",color:"#0D47A1"}}>{p.w3}</span><br/><span style={{fontSize:11,color:"#888"}}>{p.m3}</span></div>
      </div>))}
    </Card>
    <CultureNote text="Omitting the \u02BBokina and kahak\u014D is considered disrespectful to the language. It's 'Hawai\u02BBi' not 'Hawaii', and '\u02BB\u014Dlelo' not 'olelo'. The marks were not used historically in writing but the sounds were always there \u2014 they've been restored as part of language revitalization."/>
  </div>);
}
