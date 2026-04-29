/**
 * Settings page — /settings
 *
 * Sections: Backup (download + file-import) and Share links & QR.
 */

import { useRef, useState } from 'react';
import type { ReactElement, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from '../hooks/useRouteMeta';
import { useMastery } from '../hooks/useMastery';
import { downloadJsonFile } from '../utils/download';
import { migrate } from '../mastery/migrations';
import { ImportPreview } from '../components/ImportPreview';
import { MergeReportView } from '../components/MergeReportView';
import { ShareLinkSection } from '../components/ShareLinkSection';
import { ApiKeysSection } from '../components/ApiKeysSection';
import { CostSection } from '../components/CostSection';
import type { MasteryExport, MergeReport } from '../mastery';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Local date helper (DST-safe, same logic as useMastery — inlined to avoid
// making this private helper a shared util for just two callers)
// ---------------------------------------------------------------------------

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

function ActionButton({ onClick, disabled, children, variant = 'primary' }: ButtonProps): ReactElement {
  const bgColor = variant === 'primary'
    ? colors.surface.dark
    : variant === 'danger'
    ? '#C62828'
    : colors.surface.white;

  const textColor = variant === 'secondary' ? colors.text.primary : colors.text.white;

  const borderStyle = variant === 'secondary'
    ? `1px solid ${colors.border.default}`
    : 'none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-block',
        padding: `${spacing.sm + 2}px ${spacing.xl}px`,
        background: disabled ? '#ccc' : bgColor,
        color: disabled ? '#888' : textColor,
        border: borderStyle,
        borderRadius: radii.base,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        letterSpacing: '0.01em',
        lineHeight: typography.lineHeight.tight,
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Backup section
// ---------------------------------------------------------------------------

type ImportPhase =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'preview'; snapshot: MasteryExport }
  | { kind: 'done'; report: MergeReport };

function BackupSection(): ReactElement {
  const { exportSnapshot, importSnapshot, isHydrated } = useMastery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<ImportPhase>({ kind: 'idle' });
  const [isDownloading, setIsDownloading] = useState(false);

  // -- Download ---------------------------------------------------------------

  async function handleDownload(): Promise<void> {
    if (!isHydrated) return;
    setIsDownloading(true);
    try {
      const snapshot = await exportSnapshot();
      const dateStr = toLocalDateString(new Date());
      downloadJsonFile(`peliglot-progress-${dateStr}.json`, snapshot);
    } finally {
      setIsDownloading(false);
    }
  }

  // -- Import: file selection + parsing ---------------------------------------

  function handleImportClick(): void {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    // Reset the input so the same file can be re-selected after an error.
    e.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text !== 'string') {
        setPhase({ kind: 'error', message: 'Could not read file.' });
        return;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        setPhase({ kind: 'error', message: 'Invalid JSON — is this really a Peliglot progress file?' });
        return;
      }

      // Run through migration pipeline even though v1 is identity.
      // Future schema bumps are handled here automatically.
      const migrated = migrate(parsed);
      // Hand the parsed+migrated snapshot to ImportPreview; it owns the preview
      // computation and Apply flow from here.
      setPhase({ kind: 'preview', snapshot: migrated });
    };
    reader.onerror = () => {
      setPhase({ kind: 'error', message: 'Failed to read file.' });
    };
    reader.readAsText(file);
  }

  function handleReset(): void {
    setPhase({ kind: 'idle' });
  }

  async function handleApply(snapshot: MasteryExport): Promise<void> {
    const report = await importSnapshot(snapshot);
    setPhase({ kind: 'done', report });
  }

  // -- Render -----------------------------------------------------------------

  return (
    <section
      aria-labelledby="backup-heading"
      style={{ marginBottom: spacing.xxxl * 2 }}
    >
      <h2
        id="backup-heading"
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
        Backup
      </h2>

      <p style={{
        margin: `0 0 ${spacing.lg}px`,
        fontSize: typography.fontSize.base,
        color: colors.text.muted,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Your progress lives in this browser. Take it with you.
      </p>
      <p style={{
        margin: `0 0 ${spacing.xxl}px`,
        fontSize: typography.fontSize.base,
        color: colors.text.muted,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Download a copy. Reimport on another device. We don&apos;t have a server
        to do this for you, and that&apos;s the point.
      </p>

      {/* Download */}
      <div style={{ marginBottom: spacing.xl }}>
        <ActionButton
          onClick={() => { void handleDownload(); }}
          disabled={!isHydrated || isDownloading}
        >
          {isDownloading ? 'Preparing…' : 'Download my progress'}
        </ActionButton>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        aria-label="Import progress file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Import button — only shown when idle or after done/error */}
      {(phase.kind === 'idle' || phase.kind === 'error' || phase.kind === 'done') && (
        <div style={{ marginBottom: spacing.xl }}>
          <ActionButton
            onClick={handleImportClick}
            disabled={!isHydrated}
            variant="secondary"
          >
            Import from file
          </ActionButton>
        </div>
      )}

      {/* Error state */}
      {phase.kind === 'error' && (
        <div style={{
          background: '#FFEBEE',
          border: '1px solid #FFCDD2',
          borderRadius: radii.base,
          padding: `${spacing.md}px ${spacing.lg}px`,
          marginTop: spacing.sm,
          fontSize: typography.fontSize.base,
          color: '#C62828',
          lineHeight: typography.lineHeight.relaxed,
        }}>
          {phase.message}
        </div>
      )}

      {/* Preview state — delegate to ImportPreview */}
      {phase.kind === 'preview' && (
        <div style={{ marginTop: spacing.lg }}>
          <ImportPreview
            snapshot={phase.snapshot}
            onApply={() => handleApply(phase.snapshot)}
            onCancel={handleReset}
          />
        </div>
      )}

      {/* Done state */}
      {phase.kind === 'done' && (
        <div
          role="region"
          aria-label="Import result"
          style={{
            background: '#F1F8E9',
            border: '1px solid #DCEDC8',
            borderRadius: radii.lg,
            padding: `${spacing.xl}px ${spacing.xxl}px`,
            marginTop: spacing.lg,
          }}
        >
          <h3 style={{
            margin: `0 0 ${spacing.md}px`,
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semibold,
            color: '#33691E',
          }}>
            Import complete
          </h3>
          <MergeReportView report={phase.report} accentColor="#33691E" />
          <div style={{ marginTop: spacing.lg }}>
            <ActionButton onClick={handleReset} variant="secondary">
              Done
            </ActionButton>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------

export function SettingsPage(): ReactElement {
  useRouteMeta({
    title: 'Settings — Peliglot',
    description: 'Download your progress, import from another device, and manage your Peliglot settings.',
    canonical: '/settings',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.surface.light,
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
    }}>
      <a href="#settings-content" className="skip-link">Skip to content</a>

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
          Settings
        </h1>
        <p style={{
          margin: '0 auto',
          maxWidth: 520,
          fontSize: typography.fontSize['2xl'],
          lineHeight: typography.lineHeight.relaxed,
          color: 'rgba(255,255,255,0.8)',
        }}>
          Your data, your device. No accounts required.
        </p>
      </header>

      {/* Main content */}
      <main
        id="settings-content"
        role="main"
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: `${spacing.xxxl * 2}px ${spacing.xl}px`,
        }}
      >
        <BackupSection />
        <ApiKeysSection />
        <CostSection />
        <ShareLinkSection />
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
