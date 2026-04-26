import { GuideShell } from '../../components/GuideShell';
import { darkTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={darkTheme}
      storageKey="peliglot-music"
      sidebarTitle="Music Theory"
      sidebarSubtitle="30 Interactive Guides"
    />
  );
}
