import { GuideShell } from '../../components/GuideShell';
import { lightTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={lightTheme}
      storageKey="peliglot-arabic"
      sidebarTitle="العربية"
      sidebarSubtitle="30 Interactive Guides"
    />
  );
}
