import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from './hooks/useRouteMeta';
import { siteSupportPitch } from './copy/positioning';
import { supporters } from './data/supporters';
import type { Supporter } from './data/supporters';
import { colors, spacing, radii, typography } from './styles/tokens';
import { SITE_URL } from './config/site';

// ---------------------------------------------------------------------------
// Ko-fi config — VITE_KOFI_USERNAME overrides the default for staging/preview.
// ---------------------------------------------------------------------------
const kofiUsername: string =
  (import.meta.env.VITE_KOFI_USERNAME as string | undefined) ?? 'peliglot';

// ---------------------------------------------------------------------------
// Tier display config
// ---------------------------------------------------------------------------
const TIER_ORDER: Supporter['tier'][] = ['patron', 'supporter', 'friend'];

const TIER_LABELS: Record<Supporter['tier'], string> = {
  patron: 'Patrons',
  supporter: 'Supporters',
  friend: 'Friends',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SupporterEntry({ supporter }: { supporter: Supporter }): ReactElement {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,
      padding: `${spacing.md}px ${spacing.lg}px`,
      borderBottom: `1px solid ${colors.border.subtle}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.sm, flexWrap: 'wrap' }}>
        {supporter.url ? (
          <a
            href={supporter.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.lg,
              color: colors.text.primary,
              textDecoration: 'none',
              borderBottom: `1px solid ${colors.border.default}`,
            }}
          >
            {supporter.name}
          </a>
        ) : (
          <span style={{
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.lg,
            color: colors.text.primary,
          }}>
            {supporter.name}
          </span>
        )}
        <span style={{
          fontSize: typography.fontSize.sm,
          color: colors.text.tertiary,
          flexShrink: 0,
        }}>
          {supporter.date}
        </span>
      </div>
      {supporter.message && (
        <p style={{
          margin: 0,
          fontSize: typography.fontSize.base,
          color: colors.text.muted,
          lineHeight: typography.lineHeight.relaxed,
          fontStyle: 'italic',
        }}>
          {supporter.message}
        </p>
      )}
    </div>
  );
}

function TierSection({ tier, entries }: { tier: Supporter['tier']; entries: Supporter[] }): ReactElement | null {
  if (entries.length === 0) return null;
  // Sort within tier: most recent first
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section style={{ marginBottom: spacing.xxxl }}>
      <h3 style={{
        margin: `0 0 ${spacing.md}px`,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        letterSpacing: '-0.01em',
      }}>
        {TIER_LABELS[tier]}
      </h3>
      <div style={{
        borderRadius: radii.lg,
        border: `1px solid ${colors.border.default}`,
        background: colors.surface.white,
        overflow: 'hidden',
      }}>
        {sorted.map((s, i) => (
          <SupporterEntry key={`${s.name}-${s.date}-${i}`} supporter={s} />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function SupportersPage(): ReactElement {
  useRouteMeta({
    title: 'Support Peliglot — Hand-crafted interactive learning guides',
    description: siteSupportPitch,
    canonical: '/support',
    ogImage: `${SITE_URL}/og/site.png`,
  });

  const grouped = TIER_ORDER.reduce<Record<Supporter['tier'], Supporter[]>>(
    (acc, tier) => {
      acc[tier] = supporters.filter(s => s.tier === tier);
      return acc;
    },
    { patron: [], supporter: [], friend: [] },
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surface.light,
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
    }}>
      {/* Skip link — uses landing.css .skip-link for focus visibility */}
      <a href="#supporters-content" className="skip-link">Skip to content</a>

      {/* Header */}
      <header
        role="banner"
        style={{
          textAlign: 'center',
          padding: `${spacing.xxxl * 2}px ${spacing.xl}px ${spacing.xxxl}px`,
          background: colors.surface.dark,
          color: colors.text.white,
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-block',
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.text.white,
            textDecoration: 'none',
            marginBottom: spacing.xl,
            letterSpacing: '0.02em',
            opacity: 0.7,
          }}
        >
          Peliglot
        </Link>
        <h1 style={{
          margin: `0 0 ${spacing.lg}px`,
          fontSize: 36,
          fontWeight: typography.fontWeight.extrabold,
          lineHeight: typography.lineHeight.tight,
          letterSpacing: '-0.02em',
        }}>
          Support Peliglot
        </h1>
        <p style={{
          margin: `0 auto ${spacing.xxl}px`,
          maxWidth: 540,
          fontSize: typography.fontSize['2xl'],
          lineHeight: typography.lineHeight.relaxed,
          color: 'rgba(255,255,255,0.8)',
        }}>
          {siteSupportPitch}
        </p>

        {/* Donate CTA */}
        <a
          href={`https://ko-fi.com/${kofiUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: `14px 32px`,
            background: '#fff',
            color: colors.text.primary,
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize['2xl'],
            borderRadius: radii.pill,
            textDecoration: 'none',
            letterSpacing: '0.01em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          Chip in on Ko-fi
        </a>
      </header>

      {/* Main content */}
      <main
        id="supporters-content"
        role="main"
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: `${spacing.xxxl * 2}px ${spacing.xl}px`,
        }}
      >
        {/* Transparency block */}
        <div style={{
          background: colors.callout.tipBg,
          border: `1px solid ${colors.callout.tipBorder}`,
          borderRadius: radii.lg,
          padding: `${spacing.xl}px ${spacing.xxl}px`,
          marginBottom: spacing.xxxl * 2,
        }}>
          <p style={{
            margin: 0,
            fontSize: typography.fontSize.lg,
            color: colors.callout.tipText,
            lineHeight: typography.lineHeight.relaxed,
            fontWeight: typography.fontWeight.medium,
          }}>
            No ads. No paywalls. No tracking. Every guide is free and stays
            free. Donations buy time to keep writing.
          </p>
        </div>

        {/* Supporters list */}
        <h2 style={{
          margin: `0 0 ${spacing.xl}px`,
          fontSize: 28,
          fontWeight: typography.fontWeight.extrabold,
          color: colors.text.primary,
          letterSpacing: '-0.02em',
        }}>
          People who made this easier
        </h2>

        {TIER_ORDER.map(tier => (
          <TierSection key={tier} tier={tier} entries={grouped[tier]} />
        ))}
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        style={{
          textAlign: 'center',
          padding: `${spacing.xl}px ${spacing.xl}px ${spacing.xxxl * 2}px`,
          fontSize: typography.fontSize.sm,
          color: colors.text.secondary,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        <p>
          <Link to="/" style={{ color: colors.text.tertiary, textDecoration: 'none' }}>
            ← Back to Peliglot
          </Link>
        </p>
        <p style={{ marginTop: spacing.sm }}>Built with care. All content is free to use.</p>
        <p style={{ marginTop: spacing.sm }}>
          We use privacy-respecting analytics (Cloudflare Web Analytics) —{' '}
          <Link to="/analytics" style={{ color: colors.text.tertiary }}>
            details
          </Link>
        </p>
      </footer>
    </div>
  );
}
