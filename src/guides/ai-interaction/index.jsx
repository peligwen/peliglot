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
      storageKey="peliglot-ai-interaction"
      sidebarTitle="AI Interaction"
      sidebarSubtitle="25 Interactive Guides"
    />
  );
}
