import { SimpleGuide } from '../../../components/SimpleGuide';
import { CultureNote, Insight } from './_helpers';

export function Guide26(){return(<div>
  <SimpleGuide items={[
    {h:"Parents",b:"makuak\u0101ne = father \u00B7 makuahine = mother\nmakua = parent (gender-neutral plural: n\u0101 makua = parents)"},
    {h:"Siblings (relative age matters!)",b:"kaikua\u02BBana = older sibling (same gender)\nkaikaina = younger sibling (same gender)\nkaikuahine = sister (of a male)\nkaikun\u0101ne = brother (of a female)"},
    {h:"Children & grandchildren",b:"keiki = child \u00B7 kaikamahine = daughter \u00B7 keikik\u0101ne = son\nmo\u02BBopuna = grandchild"},
    {h:"Spouse & extended family",b:"k\u0101ne = husband/man \u00B7 wahine = wife/woman\nkupuna = grandparent/ancestor \u00B7 \u02BBohana = family"},
    {h:"H\u0101nai \u2014 the Hawaiian adoption tradition",b:"keiki h\u0101nai = adopted/fostered child\nA deeply valued cultural practice of raising children within the extended \u02BBohana"},
  ]}/>
  <CultureNote text="In Hawaiian culture, \u02BBohana extends far beyond the nuclear family. Aunts/uncles (\u02BBanak\u0113/\u02BBanakala) are often called 'mom' and 'dad'. All elders are treated as kupuna (grandparents). Family terms carry deep relational responsibility."/>
  <Insight text="Family terms use O-class possessives \u2014 you don't choose your family. Ko\u02BBu makuahine = my mother (O-class, not A-class)."/>
</div>);}
