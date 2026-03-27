import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide24(){return(<SimpleGuide items={[
  {h:"Nominal sentence (جملة اسمية) — starts with a noun",b:"الكتابُ كبيرٌ = The book is big\nSubject (مبتدأ) + Predicate (خبر)\nNo verb 'to be' in present tense!"},
  {h:"Verbal sentence (جملة فعلية) — starts with a verb",b:"كَتَبَ الطالبُ الدرسَ = The student wrote the lesson\nVerb + Subject + Object (VSO order)"},
  {h:"Key difference: verb agreement",b:"Verbal sentence: verb is ALWAYS singular (even with plural subject)\nكَتَبَ الطلابُ = the students wrote (not كتبوا الطلاب)"},
  {h:"🇵🇸 Palestinian word order",b:"SVO is the default: الطالب كتب الدرس\nVerbal sentences (VSO) sound more formal/literary in dialect"},
]}/>);}
