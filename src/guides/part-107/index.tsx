import { GuideShell } from '../../components/GuideShell';
import { part107Theme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      slug="part-107"
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={part107Theme}
      storageKey="peliglot-part-107"
      sidebarTitle="FAA Part 107"
      sidebarSubtitle="34 Guides for the Drone Pilot Test"
    />
  );
}
