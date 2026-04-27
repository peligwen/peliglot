import type { Dispatch, SetStateAction, ReactElement } from 'react';
import { VerbConjugation } from '../../../components/templates/VerbConjugation';
import { speakSpanish } from '../../../utils/speech';

export const pronouns6: string[] = ["yo","tú","él/ella/Ud.","nosotros","vosotros","ellos/Uds."];
export const pronounsShort: string[] = ["yo","tú","él","nos.","vos.","ellos"];

export type VerbType = 'ar' | 'er' | 'ir';

interface VerbTypeSelectorProps {
  vt: VerbType;
  setVt: Dispatch<SetStateAction<VerbType>>;
  cols?: Record<VerbType, string>;
}

export function VerbTypeSelector({ vt, setVt, cols = { ar:"#D84315", er:"#00695C", ir:"#4527A0" } }: VerbTypeSelectorProps): ReactElement {
  return (
    <div style={{display:"flex",gap:8,marginBottom:14,justifyContent:"center"}}>
      {(["ar","er","ir"] as VerbType[]).map(t=>(
        <button key={t} onClick={()=>setVt(t)} style={{padding:"8px 20px",borderRadius:10,border:vt===t?"2px solid #1a1a1a":"1.5px solid #ddd",background:vt===t?(cols[t]||"#1a1a1a"):"#fff",color:vt===t?"#fff":"#666",fontSize:15,fontWeight:700,cursor:"pointer"}}>
          -{t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

interface ConjugationTableProps {
  stem: string;
  endings: string[];
  verb: string;
  meaning: string;
  color: string;
  pronouns?: string[];
}

export function ConjugationTable({ stem, endings, verb, meaning, color, pronouns = pronouns6 }: ConjugationTableProps): ReactElement {
  return <VerbConjugation pronouns={pronouns} stem={stem} endings={endings} verb={verb} meaning={meaning} color={color}/>;
}

interface MiniTableProps {
  title: string;
  color: string;
  stem: string;
  endings: string[];
  /**
   * Optional full pre-computed forms, indexed by pronoun position (0=yo … 5=ellos).
   * When provided, a given position renders the override instead of stem+endings[i].
   * Used by guide29 to display accented nosotros past-subjunctive forms
   * (e.g. "tuviéramos" rather than "tuvie" + "ramos").
   *
   * Past-subjunctive rule: the nosotros form (index 3) always carries a
   * written accent on the stem's final vowel — e.g. habláramos, comiéramos,
   * tuviéramos, fuéramos. The accent cannot be reconstructed by concatenating
   * stem + ending, so we store the full accented form in data29.nosotrosRa
   * and pass it here via formOverrides[3].
   */
  formOverrides?: Partial<Record<number, string>>;
}

export function MiniTable({ title, color, stem, endings, formOverrides }: MiniTableProps): ReactElement {
  if (!formOverrides) {
    return <VerbConjugation pronouns={pronounsShort} stem={stem} endings={endings} title={title} color={color} compact/>;
  }
  // Build endings array substituting overridden forms: override[i] = full form displayed with empty stem
  const resolvedEndings = endings.map((e, i) =>
    formOverrides[i] !== undefined ? formOverrides[i]! : e
  );
  const resolvedStem = stem;
  // For overridden rows the stem portion is intentionally blank to avoid double-rendering.
  // We render a custom layout rather than relying on VerbConjugation's stem+ending split.
  return (
    <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #eee" }}>
      <div style={{ background: color, padding: "8px 12px", color: "#fff", fontSize: 13, fontWeight: 700 }}>{title}</div>
      {pronounsShort.map((p, i) => {
        const isOverride = formOverrides[i] !== undefined;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 12px", height: 30, borderBottom: i < pronounsShort.length - 1 ? "1px solid #f5f3ef" : "none", fontSize: 12 }}>
            <span style={{ color: "#aaa", width: 40 }}>{p}</span>
            <span style={{ fontWeight: 700 }}>
              {isOverride ? (
                <span style={{ color }}>{resolvedEndings[i]}</span>
              ) : (
                <>
                  <span style={{ color: "#999" }}>{resolvedStem}</span>
                  <span style={{ color }}>{resolvedEndings[i]}</span>
                </>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface TriggerChipsProps {
  label: string;
  color: string;
  words: string[];
}

export function TriggerChips({ label, color, words }: TriggerChipsProps): ReactElement {
  return (
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #eee"}}>
      <div style={{padding:"8px 12px",background:color,color:"#fff",fontSize:11,fontWeight:700}}>⚡ {label}</div>
      <div style={{padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:4}}>
        {words.map(w=>(<span key={w} style={{padding:"3px 8px",borderRadius:12,background:`${color}12`,color:color,fontSize:11,fontWeight:600,border:`1px solid ${color}25`}}>{w}</span>))}
      </div>
    </div>
  );
}

export function VowelBar(): ReactElement {
  const vs=[{l:"A",s:"ah",w:"father"},{l:"E",s:"eh",w:"bet"},{l:"I",s:"ee",w:"see"},{l:"O",s:"oh",w:"go"},{l:"U",s:"oo",w:"moon"}];
  return (
    <div style={{background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #e8e5e0"}}>
      <div style={{padding:"8px 14px",background:"#FFF8E7",borderBottom:"1px solid #F0E4C4",fontSize:13,fontWeight:700,color:"#8B6914"}}>5 Vowels — Your Anchor</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)"}}>
        {vs.map((v,i)=>(<div key={v.l} onClick={()=>window.speechSynthesis&&speakSpanish(v.l.toLowerCase())} style={{padding:"12px 6px",textAlign:"center",borderRight:i<4?"1px solid #f0eeeb":"none",cursor:window.speechSynthesis?"pointer":"default",transition:"background 0.15s"}} onMouseEnter={e=>{if(window.speechSynthesis)e.currentTarget.style.background="#FFF8E7"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
          <div style={{fontSize:24,fontWeight:700,color:"#2C5F2D"}}>{v.l}</div>
          <div style={{fontSize:14,color:"#D4A843",fontWeight:700,fontFamily:"monospace"}}>{v.s}{window.speechSynthesis&&<span style={{marginLeft:4,fontSize:10,opacity:0.5}}>{"🔈"}</span>}</div>
          <div style={{fontSize:10,color:"#999"}}>"{v.w}"</div>
        </div>))}
      </div>
      <div style={{padding:"8px 14px",background:"#FDFBF7",borderTop:"1px solid #f0eeeb",fontSize:11,color:"#888",textAlign:"center"}}>
        Spanish vowels are <strong style={{color:"#2C5F2D"}}>always</strong> short, pure, and consistent
      </div>
    </div>
  );
}
