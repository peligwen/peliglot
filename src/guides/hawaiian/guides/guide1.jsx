import { AlphabetGrid } from '../../../components/templates/AlphabetGrid';
import { speakHawaiian } from '../../../utils/speech';
import { Insight } from './_helpers';

const hwnLetters=[
  {l:"A",sound:"/a/ — 'ah' as in father",type:"vowel",note:"Open front vowel"},
  {l:"E",sound:"/e/ — 'eh' as in bet",type:"vowel",note:"Mid front vowel"},
  {l:"I",sound:"/i/ — 'ee' as in see",type:"vowel",note:"High front vowel"},
  {l:"O",sound:"/o/ — 'oh' as in go (short)",type:"vowel",note:"Mid back vowel"},
  {l:"U",sound:"/u/ — 'oo' as in moon",type:"vowel",note:"High back vowel"},
  {l:"H",sound:"/h/ — as in English 'hat'",type:"consonant",note:"Same as English"},
  {l:"K",sound:"/k/ — softer than English 'k'",type:"consonant",note:"No aspiration (no puff of air). In the Niʻihau dialect, /k/ is realized as [t]; this is a regional dialect feature of Niʻihau, not a positional rule in standard Hawaiian."},
  {l:"L",sound:"/l/ — as in English 'let'",type:"consonant",note:"Lighter than English 'l'. Tongue touches just behind teeth"},
  {l:"M",sound:"/m/ — as in English 'mom'",type:"consonant",note:"Same as English"},
  {l:"N",sound:"/n/ — as in English 'no'",type:"consonant",note:"Same as English"},
  {l:"P",sound:"/p/ — softer than English 'p'",type:"consonant",note:"No aspiration (no puff of air — unaspirated). English 'p' in initial position is strongly aspirated [pʰ]; Hawaiian /p/ is plain [p]."},
  {l:"W",sound:"/w/ or /v/ — varies by position",type:"consonant",note:"After 'u' and 'o': /w/. After 'i' and 'e': often /v/. Word-initial: usually /w/"},
  {l:"\u02BB",sound:"/\u0294/ — glottal stop",type:"consonant",note:"A real consonant! The catch in your throat like in 'uh-oh'. Written as \u02BBokina (opening single quote)"},
];

export function Guide1(){
  return(
    <AlphabetGrid
      letters={hwnLetters}
      letterKey="l"
      nameKey="type"
      filterGroups={[
        {id:"all",label:"All 13",filterFn:()=>true},
        {id:"vowel",label:"Vowels (5)",filterFn:l=>l.type==="vowel"},
        {id:"consonant",label:"Consonants (8)",filterFn:l=>l.type==="consonant"},
      ]}
      detailFields={[
        {key:"sound"},
        {key:"note",label:"Note",bgColor:"#F5F9F5",borderColor:"#D4E8D4",textColor:"#2E7D32"},
      ]}
      primaryColor="#1B5E20"
      accentBg="#E8F5E9"
      accentFn={l=>l.type==="vowel"}
      speakFn={speakHawaiian}
      introTitle="Only 13 Letters"
      introContent={<div style={{fontSize:14,lineHeight:1.6}}>
        Hawaiian has one of the <strong style={{color:"#FFE77A"}}>shortest alphabets of any living language</strong>: 5 vowels + 8 consonants (including the ʻokina/glottal stop). Only Rotokas of Papua New Guinea uses fewer letters (12). Every syllable ends in a vowel.
      </div>}
      footerContent={<div>
        <Insight text="Hawaiian has no consonant clusters and every syllable is (C)V — an optional consonant followed by a vowel. This is why Hawaiian words flow so smoothly."/>
        <div style={{background:"#FFF8E1",borderRadius:10,padding:"10px 14px",border:"1px solid #FFE082",fontSize:12,color:"#5D4037",lineHeight:1.5,marginTop:8}}>
          🎧 <strong>Audio note:</strong> No browser currently ships a Hawaiian voice. The speak button above will produce silence or English mispronunciation. For accurate pronunciation, listen to recorded Hawaiian at <strong>oiwi.tv</strong> (ʻŌiwi TV) or consult the audio entries at <strong>wehewehe.org</strong> (Nā Puke Wehewehe ʻŌlelo Hawaiʻi). The IPA transcriptions shown here are your best guide until recordings are added.
        </div>
      </div>}
    />
  );
}
