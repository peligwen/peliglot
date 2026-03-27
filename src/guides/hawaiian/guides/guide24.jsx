import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide24(){
  const nums=[{n:"1",h:"\u02BBekahi"},{n:"2",h:"\u02BBelua"},{n:"3",h:"\u02BBekolu"},{n:"4",h:"\u02BBeh\u0101"},{n:"5",h:"\u02BBelima"},
    {n:"6",h:"\u02BBeono"},{n:"7",h:"\u02BBehiku"},{n:"8",h:"\u02BBewalu"},{n:"9",h:"\u02BBeiwa"},{n:"10",h:"\u02BBumi"}];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:16}}>
      {nums.map(n=>(<div key={n.n} style={{textAlign:"center",padding:"10px 4px",background:"#fff",borderRadius:10,border:"1px solid #e0dcd5"}}>
        <div style={{fontSize:24,fontWeight:800,color:"#C62828"}}>{n.n}</div>
        <div style={{fontSize:11,color:"#555",fontStyle:"italic",marginTop:2}}>{n.h}</div>
      </div>))}
    </div>
    <SimpleGuide items={[
      {h:"Teens and tens",b:"11: \u02BBumik\u016Bm\u0101kahi \u00B7 12: \u02BBumik\u016Bm\u0101lua \u00B7 20: iwak\u0101lua\n30: kanakolu \u00B7 40: kanah\u0101 \u00B7 50: kanalima\n100: ho\u02BBokahi haneli \u00B7 1000: ho\u02BBokahi kaukani"},
      {h:"Counting things (with classifiers)",b:"\u02BBElua puke = two books \u00B7 \u02BBEkolu keiki = three children\nNumber comes before the noun (no article needed)"},
      {h:"Traditional Hawaiian counting",b:"Hawaiian had a base-4 and base-40 system for certain counts (fish, taro). Kauna = 4, kanaha = 40, lau = 400, mano = 4000. Still referenced culturally."},
    ]}/>
  </div>);
}
