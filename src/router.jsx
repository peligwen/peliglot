import { createBrowserRouter, redirect } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const guideSlugs = [
  'spanish', 'arabic', 'english', 'german', 'hawaiian',
  'french', 'japanese', 'portuguese',
  'music', 'jazz-guitar', 'math', 'music2', 'statistics', 'programming',
];

const guideRoutes = guideSlugs.map(slug => ({
  path: `/guides/${slug}`,
  lazy: () => import(`./guides/${slug}/index.jsx`),
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
