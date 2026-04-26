import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from './hooks/useRouteMeta';
import { colors, spacing, typography } from './styles/tokens';

export function NotFoundPage(): ReactElement {
  useRouteMeta({
    title: 'Not found — Peliglot',
    description: 'This page does not exist on Peliglot.',
    canonical: '/',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.surface.light,
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 56,
            fontWeight: typography.fontWeight.extrabold,
            color: colors.text.primary,
            letterSpacing: '-0.02em',
          }}
        >
          404
        </h1>
        <p
          style={{
            margin: `${spacing.md}px 0 ${spacing.xl}px`,
            fontSize: typography.fontSize.xl,
            color: colors.text.muted,
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          Nothing here. The page may have moved, or the URL might have a typo.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: `${spacing.md}px ${spacing.xl}px`,
            background: colors.surface.dark,
            color: colors.text.white,
            textDecoration: 'none',
            fontWeight: typography.fontWeight.semibold,
            borderRadius: 8,
          }}
        >
          Back to Peliglot
        </Link>
      </div>
    </div>
  );
}
