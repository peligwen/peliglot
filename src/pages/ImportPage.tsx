/**
 * Import page — /import
 *
 * Reads a share-link snapshot from window.location.hash (#snapshot=…),
 * decodes it, and renders the ImportPreview component for user confirmation
 * before applying.
 *
 * Hard rule: NEVER auto-apply silently. Always require an explicit Apply click.
 */

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from '../hooks/useRouteMeta';
import { useMastery } from '../hooks/useMastery';
import { decodeSnapshotWithStatus, SnapshotDecodeError } from '../utils/snapshot';
import { ImportPreview } from '../components/ImportPreview';
import { MergeReportView } from '../components/MergeReportView';
import type { MasteryExport, MergeReport } from '../mastery';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Page-shell helpers (match SettingsPage)
// ---------------------------------------------------------------------------

function PageHeader(): ReactElement {
  return (
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
        Import progress
      </h1>
      <p style={{
        margin: '0 auto',
        maxWidth: 520,
        fontSize: typography.fontSize['2xl'],
        lineHeight: typography.lineHeight.relaxed,
        color: 'rgba(255,255,255,0.8)',
      }}>
        Review the changes before applying.
      </p>
    </header>
  );
}

function PageFooter(): ReactElement {
  return (
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
        <Link to="/settings" style={{ color: colors.text.tertiary, textDecoration: 'none' }}>
          ← Back to Settings
        </Link>
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page states
// ---------------------------------------------------------------------------

type PagePhase =
  | { kind: 'loading' }
  | { kind: 'missing' }
  | { kind: 'unsupported' }
  | { kind: 'future-version'; foundVersion: number }
  | { kind: 'error'; message: string }
  | { kind: 'preview'; snapshot: MasteryExport }
  | { kind: 'done'; report: MergeReport };

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function ImportPage(): ReactElement {
  useRouteMeta({
    title: 'Import progress — Peliglot',
    description: 'Import a Peliglot progress snapshot from a share link.',
    canonical: '/import',
  });

  const { importSnapshot } = useMastery();
  const [phase, setPhase] = useState<PagePhase>({ kind: 'loading' });

  useEffect(() => {
    const hash = window.location.hash;
    const prefix = '#snapshot=';
    if (!hash.startsWith(prefix)) {
      setPhase({ kind: 'missing' });
      return;
    }

    const encoded = hash.slice(prefix.length);
    if (encoded.length === 0) {
      setPhase({ kind: 'missing' });
      return;
    }

    // Browser-support guard: DecompressionStream is required to decode share
    // links. Pre-16.4 Safari and very old Chrome/Firefox lack it. Surface a
    // dedicated message rather than the generic "decompress failed" one.
    if (typeof DecompressionStream === 'undefined') {
      setPhase({ kind: 'unsupported' });
      return;
    }

    decodeSnapshotWithStatus(encoded)
      .then(result => {
        if (result.status === 'future-version') {
          setPhase({ kind: 'future-version', foundVersion: result.foundVersion });
        } else if (result.status === 'malformed') {
          setPhase({
            kind: 'error',
            message: "We couldn't read this share link's contents. It may be corrupted or from a different app.",
          });
        } else {
          setPhase({ kind: 'preview', snapshot: result.snapshot });
        }
      })
      .catch(err => {
        if (err instanceof SnapshotDecodeError) {
          setPhase({ kind: 'error', message: err.message });
        } else {
          setPhase({ kind: 'error', message: 'Something went wrong decoding the share link.' });
        }
      });
  }, []);

  async function handleApply(snapshot: MasteryExport): Promise<void> {
    const report = await importSnapshot(snapshot);
    setPhase({ kind: 'done', report });
  }

  function handleCancel(): void {
    // Reset to missing state — clean way to exit the preview
    setPhase({ kind: 'missing' });
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surface.light,
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
    }}>
      <a href="#import-content" className="skip-link">Skip to content</a>
      <PageHeader />

      <main
        id="import-content"
        role="main"
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: `${spacing.xxxl * 2}px ${spacing.xl}px`,
        }}
      >
        {phase.kind === 'loading' && (
          <div style={{
            padding: `${spacing.xl}px 0`,
            fontSize: typography.fontSize.base,
            color: colors.text.secondary,
          }}>
            Loading…
          </div>
        )}

        {phase.kind === 'missing' && (
          <div
            role="region"
            aria-label="Empty state"
            style={{
              background: colors.callout.tipBg,
              border: `1px solid ${colors.callout.tipBorder}`,
              borderRadius: radii.lg,
              padding: `${spacing.xl}px ${spacing.xxl}px`,
            }}
          >
            <h2 style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.semibold,
              color: colors.callout.tipText,
            }}>
              No share link found
            </h2>
            <p style={{
              margin: `0 0 ${spacing.lg}px`,
              fontSize: typography.fontSize.base,
              color: colors.text.muted,
              lineHeight: typography.lineHeight.relaxed,
            }}>
              This page imports a Peliglot share-link. Need one? Generate it on
              the Settings page.
            </p>
            <Link
              to="/settings"
              style={{
                color: colors.callout.tipText,
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.base,
              }}
            >
              Go to Settings →
            </Link>
          </div>
        )}

        {phase.kind === 'unsupported' && (
          <div
            role="region"
            aria-label="Browser unsupported"
            style={{
              background: '#FFF3E0',
              border: '1px solid #FFE0B2',
              borderRadius: radii.lg,
              padding: `${spacing.xl}px ${spacing.xxl}px`,
            }}
          >
            <h2 style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.semibold,
              color: '#E65100',
            }}>
              Your browser is too old
            </h2>
            <p style={{
              margin: `0 0 ${spacing.lg}px`,
              fontSize: typography.fontSize.base,
              color: '#BF360C',
              lineHeight: typography.lineHeight.relaxed,
            }}>
              Decoding share links needs the DecompressionStream API
              (Chrome 80+, Firefox 113+, Safari 16.4+). Update your browser, or
              ask the sender for a JSON file you can import on the Settings page.
            </p>
            <Link
              to="/settings"
              style={{
                color: '#E65100',
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.base,
              }}
            >
              Go to Settings →
            </Link>
          </div>
        )}

        {phase.kind === 'future-version' && (
          <div
            role="region"
            aria-label="Newer-version snapshot"
            style={{
              background: '#FFF3E0',
              border: '1px solid #FFE0B2',
              borderRadius: radii.lg,
              padding: `${spacing.xl}px ${spacing.xxl}px`,
            }}
          >
            <h2 style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.semibold,
              color: '#E65100',
            }}>
              This link is from a newer Peliglot
            </h2>
            <p style={{
              margin: `0 0 ${spacing.lg}px`,
              fontSize: typography.fontSize.base,
              color: '#BF360C',
              lineHeight: typography.lineHeight.relaxed,
            }}>
              The share link is at schema v{phase.foundVersion}, but this build only knows
              v1. Update Peliglot (refresh the page; the latest version loads automatically)
              and try the link again.
            </p>
            <Link
              to="/settings"
              style={{
                color: '#E65100',
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.base,
              }}
            >
              ← Back to Settings
            </Link>
          </div>
        )}

        {phase.kind === 'error' && (
          <div
            role="region"
            aria-label="Decode error"
            style={{
              background: '#FFEBEE',
              border: '1px solid #FFCDD2',
              borderRadius: radii.lg,
              padding: `${spacing.xl}px ${spacing.xxl}px`,
            }}
          >
            <h2 style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.semibold,
              color: '#C62828',
            }}>
              Invalid share link
            </h2>
            <p style={{
              margin: `0 0 ${spacing.lg}px`,
              fontSize: typography.fontSize.base,
              color: '#C62828',
              lineHeight: typography.lineHeight.relaxed,
            }}>
              {phase.message}
            </p>
            <Link
              to="/settings"
              style={{
                color: '#C62828',
                fontWeight: typography.fontWeight.semibold,
                fontSize: typography.fontSize.base,
              }}
            >
              ← Back to Settings
            </Link>
          </div>
        )}

        {phase.kind === 'preview' && (
          <ImportPreview
            snapshot={phase.snapshot}
            onApply={() => handleApply(phase.snapshot)}
            onCancel={handleCancel}
          />
        )}

        {phase.kind === 'done' && (
          <div
            role="region"
            aria-label="Import result"
            style={{
              background: '#F1F8E9',
              border: '1px solid #DCEDC8',
              borderRadius: radii.lg,
              padding: `${spacing.xl}px ${spacing.xxl}px`,
            }}
          >
            <h2 style={{
              margin: `0 0 ${spacing.md}px`,
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.semibold,
              color: '#33691E',
            }}>
              Import complete
            </h2>
            <MergeReportView report={phase.report} accentColor="#33691E" />
            <div style={{ marginTop: spacing.lg }}>
              <Link
                to="/guides/spanish/practice"
                style={{
                  display: 'inline-block',
                  padding: `${spacing.sm + 2}px ${spacing.xl}px`,
                  background: colors.surface.dark,
                  color: colors.text.white,
                  textDecoration: 'none',
                  borderRadius: radii.base,
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.semibold,
                  letterSpacing: '0.01em',
                  lineHeight: typography.lineHeight.tight,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                }}
              >
                Start practicing →
              </Link>
            </div>
          </div>
        )}
      </main>

      <PageFooter />
    </div>
  );
}
