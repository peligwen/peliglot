import { createBrowserRouter, redirect, useRouteError } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import type { ReactElement } from 'react';
import { LandingPage } from './LandingPage';
import { SupportersPage } from './SupportersPage';
import { AnalyticsPage } from './AnalyticsPage';

const guideSlugs: string[] = [
  'spanish', 'arabic', 'english', 'german', 'hawaiian',
  'music', 'jazz-guitar', 'math', 'ai-interaction', 'freecad',
];

/** Renders the actual route error in dev, a clean message in prod. */
function RouteError(): ReactElement {
  const error = useRouteError();
  const isDev = import.meta.env.DEV;
  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
      {isDev && error != null && (
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, textAlign: 'left', fontSize: 13, overflowX: 'auto', marginBottom: 16 }}>
          {(error as Error)?.message || String(error)}
        </pre>
      )}
      {!isDev && (
        <p style={{ color: '#666', marginBottom: 16 }}>Failed to load guide.</p>
      )}
      <a href="/" style={{ color: '#2E7D32', fontWeight: 600 }}>Go home</a>
    </div>
  );
}

// Explicit lazy imports so Vite can generate per-collection chunks.
// All 10 collections are .tsx (Phase 4 complete).
type LazyImport = () => Promise<{ Component: () => ReactElement }>;
const guideImports: Record<string, LazyImport> = {
  spanish:            () => import('./guides/spanish/index.tsx'),
  arabic:             () => import('./guides/arabic/index.tsx'),
  english:            () => import('./guides/english/index.tsx'),
  german:             () => import('./guides/german/index.tsx'),
  hawaiian:           () => import('./guides/hawaiian/index.tsx'),
  music:              () => import('./guides/music/index.tsx'),
  'jazz-guitar':      () => import('./guides/jazz-guitar/index.tsx'),
  math:               () => import('./guides/math/index.tsx'),
  'ai-interaction':   () => import('./guides/ai-interaction/index.tsx'),
  freecad:            () => import('./guides/freecad/index.tsx'),
};

const guideRoutes: RouteObject[] = guideSlugs.map(slug => ({
  path: `/guides/${slug}`,
  lazy: guideImports[slug],
  errorElement: <RouteError />,
}));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteError />,
  },
  {
    path: '/support',
    element: <SupportersPage />,
    errorElement: <RouteError />,
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
    errorElement: <RouteError />,
  },
  ...guideRoutes,
  // Redirect old .html URLs
  ...guideSlugs.map((slug): RouteObject => ({
    path: `/guides/${slug}.html`,
    loader: () => redirect(`/guides/${slug}`),
  })),
]);
