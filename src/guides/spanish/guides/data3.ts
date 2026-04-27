/**
 * Data for Guide 3: Cambios Ortográficos (Spelling Changes).
 *
 * Each pattern has an id (slug), display fields, and an examples array.
 * Each example: inf = infinitive, form = target conjugated form, t = tense/person label.
 */

export interface SpellingExample {
  inf: string;
  form: string;
  t: string;
}

export interface SpellingPattern {
  id: string;
  change: string;
  rule: string;
  color: string;
  sound: string;
  examples: SpellingExample[];
}

export const spChanges: SpellingPattern[] = [
  {id:"c-qu",change:"C → QU",rule:"Before E/I to keep /k/",color:"#C2185B",sound:"/k/",
    examples:[{inf:"buscar",form:"busqué",t:"Preterite yo"},{inf:"tocar",form:"toqué",t:"Preterite yo"},{inf:"sacar",form:"saqué",t:"Preterite yo"}]},
  {id:"g-gu",change:"G → GU",rule:"Before E/I to keep hard /g/",color:"#1565C0",sound:"/ɡ/",
    examples:[{inf:"pagar",form:"pagué",t:"Preterite yo"},{inf:"llegar",form:"llegué",t:"Preterite yo"},{inf:"jugar",form:"jugué",t:"Preterite yo"}]},
  {id:"z-c",change:"Z → C",rule:"Before E/I (spelling convention)",color:"#2E7D32",sound:"/s/",
    examples:[{inf:"empezar",form:"empecé",t:"Preterite yo"},{inf:"almorzar",form:"almorcé",t:"Preterite yo"},{inf:"cruzar",form:"crucé",t:"Preterite yo"}]},
  {id:"g-j",change:"G → J",rule:"Before A/O to keep throaty /x/",color:"#E65100",sound:"/x/",
    examples:[{inf:"coger",form:"cojo",t:"Present yo"},{inf:"proteger",form:"protejo",t:"Present yo"},{inf:"dirigir",form:"dirijo",t:"Present yo"}]},
  {id:"gu-g",change:"GU → G",rule:"Before A/O (U was just a helper)",color:"#6A1B9A",sound:"/ɡ/",
    examples:[{inf:"seguir",form:"sigo",t:"Present yo"},{inf:"distinguir",form:"distingo",t:"Present yo"}]},
  {id:"i-y",change:"I → Y",rule:"Unstressed I between vowels → Y",color:"#00838F",sound:"/ʝ/",
    examples:[{inf:"leer",form:"leyó",t:"Preterite él"},{inf:"creer",form:"creyó",t:"Preterite él"},{inf:"oír",form:"oyó",t:"Preterite él"}]},
];
