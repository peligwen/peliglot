import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Chatt } from './_helpers';

export function Guide32(){
  const [mode,setMode]=useState("universal");
  const universal=[{en:"It's a piece of cake",es:"Es pan comido"},{en:"Break a leg",es:"¡Mucha suerte!"},{en:"Hit the nail on the head",es:"Dar en el clavo"},{en:"Cost an arm and a leg",es:"Costar un ojo de la cara"},{en:"No way!",es:"¡No puede ser!"},{en:"My bad",es:"Mi culpa"},{en:"I'm down",es:"Le entro / me apunto"},{en:"It's not my cup of tea",es:"No es lo mío"}];
  const southern=[{en:"Bless your heart",es:"Simpatía genuina O insulto suave"},{en:"I reckon",es:"Yo creo / supongo"},{en:"Over yonder",es:"Por allá"},{en:"Fixin' to",es:"A punto de"},{en:"Might could",es:"Tal vez pueda"},{en:"Carry me to the store",es:"Llévame a la tienda (en carro)"},{en:"Mash the button",es:"Presiona el botón"},{en:"Coke (= any soda)",es:"Cualquier refresco ('What kind of Coke?' 'Sprite')"}];
  const items=mode==="universal"?universal:southern;
  return(<div>
    <div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
      {[{k:"universal",l:"🇺🇸 Universales",c:"#00695C"},{k:"southern",l:"🏔 Chattanooga",c:"#E65100"}].map(m=>(<button key={m.k} onClick={()=>setMode(m.k)} style={{flex:1,maxWidth:200,padding:"10px",borderRadius:10,border:mode===m.k?`2.5px solid ${m.c}`:"1.5px solid #ddd",background:mode===m.k?m.c:"#fff",color:mode===m.k?"#fff":"#666",cursor:"pointer",fontWeight:700,fontSize:14}}>{m.l}</button>))}
    </div>
    <Card color={mode==="universal"?"#00695C":"#E65100"} title={mode==="universal"?"Modismos americanos":"Expresiones de Chattanooga"}>
      {items.map((e,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 16px",borderBottom:i<items.length-1?"1px solid #f0eeeb":"none",alignItems:"center"}}>
        <span style={{fontSize:14,fontWeight:700,color:mode==="universal"?"#00695C":"#E65100"}}>{e.en}</span>
        <span style={{fontSize:12,color:"#888",textAlign:"right",maxWidth:"50%"}}>{e.es}</span>
      </div>))}
    </Card>
    <Chatt text="'Bless your heart' — el contexto es todo. Simpatía: 'She works three jobs, bless her heart.' Juicio suave: 'He wore that to church, bless his heart.'" />
  </div>);
}
