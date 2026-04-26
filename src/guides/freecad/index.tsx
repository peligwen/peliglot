import { GuideShell } from '../../components/GuideShell';
import { freecadTheme } from '../../styles/themes';
import { guidesMeta, categories, catColors } from './meta';
import { guideComponents } from './components';

export function Component() {
  return (
    <GuideShell
      slug="freecad"
      guidesMeta={guidesMeta}
      guideComponents={guideComponents}
      categories={categories}
      catColors={catColors}
      theme={freecadTheme}
      storageKey="peliglot-freecad"
      sidebarTitle="FreeCAD"
      sidebarSubtitle="30 Guides for Daily 3D Printing"
    />
  );
}
