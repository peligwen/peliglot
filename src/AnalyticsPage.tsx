import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from './hooks/useRouteMeta';
import { colors, spacing, typography } from './styles/tokens';

// ---------------------------------------------------------------------------
// Analytics transparency page — /analytics
//
// Content mirrors docs/analytics.md. Rendered as JSX to avoid a markdown
// runtime dependency. Update both files together when the text changes.
// ---------------------------------------------------------------------------

export function AnalyticsPage(): ReactElement {
  useRouteMeta({
    title: 'Analytics — Peliglot',
    description:
      'How Peliglot measures usage: cookieless, fingerprint-free Cloudflare Web Analytics. No PII, no tracking.',
    canonical: '/analytics',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.surface.light,
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
      }}
    >
      <a href="#analytics-content" className="skip-link">Skip to content</a>

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
        <h1
          style={{
            margin: `0 0 ${spacing.lg}px`,
            fontSize: 36,
            fontWeight: typography.fontWeight.extrabold,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.02em',
          }}
        >
          Analytics at Peliglot
        </h1>
        <p
          style={{
            margin: '0 auto',
            maxWidth: 560,
            fontSize: typography.fontSize['2xl'],
            lineHeight: typography.lineHeight.relaxed,
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          Cookieless, fingerprint-free usage measurement. No PII, no tracking.
        </p>
      </header>

      {/* Main content */}
      <main
        id="analytics-content"
        role="main"
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: `${spacing.xxxl * 2}px ${spacing.xl}px`,
        }}
      >
        <Section title="What's measured">
          <p>
            When you navigate to a real route — the landing page (
            <code>/</code>), a guide collection (
            <code>/guides/&lt;slug&gt;</code>), the supporters page (
            <code>/support</code>), or this page — Cloudflare Web Analytics
            records a pageview. Each pageview includes:
          </p>
          <ul>
            <li>The URL path (no query strings, no hash fragments)</li>
            <li>Browser family and version</li>
            <li>Country and city (derived from IP; the IP itself is not stored)</li>
            <li>Referring URL (if any)</li>
          </ul>
          <p>That's it.</p>
        </Section>

        <Section title="What's NOT measured">
          <dl style={{ margin: 0 }}>
            <Term term="No cookies">
              Cloudflare Web Analytics sets no cookies, first-party or
              third-party.
            </Term>
            <Term term="No fingerprinting">
              No canvas, font, or device fingerprinting.
            </Term>
            <Term term="No PII">
              No names, email addresses, or any personally identifiable
              information.
            </Term>
            <Term term="No per-user tracking">
              Sessions are not stitched together across visits.
            </Term>
            <Term term="No ad targeting">
              The data is never used for advertising or sold to third parties.
            </Term>
            <Term term="Within-collection guide navigation">
              When you move between individual guides inside a collection (e.g.
              from Spanish Guide 1 to Guide 2), the URL hash updates via{' '}
              <code>history.replaceState</code>, which SPA analytics beacons do
              not intercept. Those navigation events are invisible to Cloudflare
              — we only see that you visited <code>/guides/spanish</code>, not
              which specific guides you opened. This is a documented, accepted
              limitation.
            </Term>
          </dl>
        </Section>

        <Section title="Fonts">
          <p>
            The site loads the Playfair Display and Source Sans 3 typefaces from{' '}
            <strong>Google Fonts</strong> (
            <code>fonts.googleapis.com</code>,{' '}
            <code>fonts.gstatic.com</code>). This is a standard CDN font fetch
            — no tracking pixels, no analytics — but it does contact Google's
            servers on every page load. Google's own privacy policy governs that
            request. If you prefer zero Google contact, blocking{' '}
            <code>fonts.googleapis.com</code> will fall back to the system
            sans-serif stack and everything will still work.
          </p>
        </Section>

        <Section title="Tool">
          <p>
            <a
              href="https://www.cloudflare.com/web-analytics/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.text.primary }}
            >
              Cloudflare Web Analytics
            </a>{' '}
            — a privacy-first, cookieless analytics product included in
            Cloudflare's free tier.
          </p>
        </Section>

        <Section title="Why">
          <p>
            We want to know which collections are actually used so we can invest
            time in the right places. That's the entire reason. We don't want to
            compromise the privacy promise ("no accounts, no tracking") to get
            that signal, so we chose the tool with the smallest footprint we
            could find.
          </p>
        </Section>

        <Section title="How to access">
          <p>
            Dashboard at{' '}
            <a
              href="https://dash.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.text.primary }}
            >
              dash.cloudflare.com
            </a>{' '}
            &rarr; Analytics &amp; Logs &rarr; Web Analytics &rarr; Peliglot.
          </p>
          <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
            Access is currently restricted to the project maintainer.
          </p>
        </Section>
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
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Local sub-components (section + definition-list term)
// ---------------------------------------------------------------------------

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps): ReactElement {
  return (
    <section
      style={{
        marginBottom: spacing.xxxl * 2,
      }}
    >
      <h2
        style={{
          margin: `0 0 ${spacing.lg}px`,
          fontSize: 22,
          fontWeight: typography.fontWeight.bold,
          color: colors.text.primary,
          letterSpacing: '-0.01em',
          paddingBottom: spacing.sm,
          borderBottom: `2px solid ${colors.border.default}`,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: typography.fontSize.base,
          color: colors.text.muted,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {children}
      </div>
    </section>
  );
}

interface TermProps {
  term: string;
  children: ReactNode;
}

function Term({ term, children }: TermProps): ReactElement {
  return (
    <>
      <dt
        style={{
          fontWeight: typography.fontWeight.semibold,
          color: colors.text.primary,
          marginTop: spacing.md,
          marginBottom: spacing.xs,
        }}
      >
        {term}
      </dt>
      <dd style={{ margin: `0 0 0 ${spacing.lg}px` }}>{children}</dd>
    </>
  );
}
