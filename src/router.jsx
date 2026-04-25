import { createBrowserRouter, redirect, useRouteError } from 'react-router-dom';
import { LandingPage } from './LandingPage';

const guideSlugs = [
  'spanish', 'arabic', 'english', 'german', 'hawaiian',
  'music', 'jazz-guitar', 'math', 'ai-interaction', 'freecad',
];

/** Renders the actual route error in dev, a clean message in prod. */
function RouteError() {
  const error = useRouteError();
  const isDev = import.meta.env.DEV;
  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
      {isDev && error && (
        <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, textAlign: 'left', fontSize: 13, overflowX: 'auto', marginBottom: 16 }}>
          {error?.message || String(error)}
        </pre>
      )}
      {!isDev && (
        <p style={{ color: '#666', marginBottom: 16 }}>Failed to load guide.</p>
      )}
      <a href="/" style={{ color: '#2E7D32', fontWeight: 600 }}>Go home</a>
    </div>
  );
}

const guideRoutes = guideSlugs.map(slug => ({
  path: `/guides/${slug}`,
  lazy: () => import(`./guides/${slug}/index.jsx`),
  errorElement: <RouteError />,
}));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteError />,
  },
  ...guideRoutes,
  // Redirect old .html URLs
  ...guideSlugs.map(slug => ({
    path: `/guides/${slug}.html`,
    loader: () => redirect(`/guides/${slug}`),
  })),
]);
