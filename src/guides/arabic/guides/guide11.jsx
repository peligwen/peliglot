import { SimpleGuide } from '../../../components/SimpleGuide';

export function Guide11(){return(<SimpleGuide items={[
  {h:"Three noun states in Arabic",b:"1. Definite (with al-): الكتاب\n2. Indefinite (with tanwīn): كتابٌ\n3. Construct / Iḍāfa (possessed): كتابُ الطالب"},
  {h:"Iḍāfa = X of Y (possession chain)",b:"The first noun (possessed) NEVER takes al- or tanwīn.\nThe last noun determines definiteness.\nكتابُ المعلّم = the teacher's book\nكتابُ معلّمٍ = a teacher's book"},
  {h:"Multi-word iḍāfa chains",b:"بابُ بيتِ المعلّم = the door of the teacher's house\nOnly the LAST word gets al- (or tanwīn for indefinite)"},
  {h:"Adjectives go AFTER the whole iḍāfa",b:"كتابُ الطالبِ الكبير = the student's big book\nThe adjective matches the noun it describes, not the possessor"},
]}/>);}
