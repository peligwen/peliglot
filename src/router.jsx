import { createBrowserRouter, redirect } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const guideSlugs = [
  'spanish', 'arabic', 'english', 'german', 'hawaiian',
  'music', 'jazz-guitar', 'math', 'ai-interaction', 'fiber-support',
];

const guideRoutes = guideSlugs.map(slug => ({
  path: `/guides/${slug}`,
  lazy: () => import(`./guides/${slug}/index.jsx`),
  errorElement: <ErrorBoundary><div style={{ padding: 40, textAlign: 'center' }}>Failed to load guide. <a href="/">Go home</a></div></ErrorBoundary>,
}));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorBoundary><div style={{ padding: 40, textAlign: 'center' }}>Page not found. <a href="/">Go home</a></div></ErrorBoundary>,
  },
  ...guideRoutes,
  // Redirect old .html URLs
  ...guideSlugs.map(slug => ({
    path: `/guides/${slug}.html`,
    loader: () => redirect(`/guides/${slug}`),
  })),
]);
