import { GuideShell } from '../../components/GuideShell';
import { jazzTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={jazzTheme}
      storageKey="peliglot-jazz-guitar"
      sidebarTitle="Jazz Guitar"
      sidebarSubtitle="30 Guides for Working Musicians"
    />
  );
}
