import { GuideShell } from '../../components/GuideShell';
import { networkTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={networkTheme}
      storageKey="peliglot-fiber-support"
      sidebarTitle="Fiber Support"
      sidebarSubtitle="43 Interactive Guides"
    />
  );
}
