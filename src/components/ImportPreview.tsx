/**
 * ImportPreview — shared component for the merge-preview UI.
 *
 * Accepts a (already-parsed-and-migrated) MasteryExport snapshot, computes
 * the LWW preview counts against the local state, and renders the preview
 * table plus Apply/Cancel actions.
 *
 * The parent owns post-Apply state (success/error display). This component
 * delegates upward via `onApply()` and `onCancel()`.
 */

import { useState, useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useMastery } from '../hooks/useMastery';
import type { MasteryExport } from '../mastery';
import { colors, spacing, radii, typography } from '../styles/tokens';

// ---------------------------------------------------------------------------
// Preview computation (LWW semantics matching bulkImport exactly)
// ---------------------------------------------------------------------------

export interface PreviewCounts {
  accepted: number;   // new + remote-newer
  rejected: number;   // local-newer
  unchanged: number;  // timestamps equal
}

export function computePreview(
  incoming: MasteryExport,
  local: MasteryExport,
): PreviewCounts {
  let accepted = 0;
  let rejected = 0;
  let unchanged = 0;

  for (const [cardId, remoteState] of Object.entries(incoming.cards)) {
    const localState = local.cards[cardId];
    if (localState === undefined) {
      accepted += 1;
    } else if (remoteState.updatedAt > localState.updatedAt) {
      accepted += 1;
    } else if (remoteState.updatedAt < localState.updatedAt) {
      rejected += 1;
    } else {
      unchanged += 1;
    }
  }

  return { accepted, rejected, unchanged };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PreviewRow({ label, value, accent }: { label: string; value: number; accent: string }): ReactElement {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: `${spacing.xs}px 0`,
      borderBottom: `1px solid rgba(0,0,0,0.06)`,
      fontSize: typography.fontSize.base,
      color: accent,
    }}>
      <span>{label}</span>
      <span style={{ fontWeight: typography.fontWeight.semibold, minWidth: 32, textAlign: 'right' }}>
        {value}
      </span>
    </div>
  );
}

function PreviewTable({ preview, accentColor }: { preview: PreviewCounts; accentColor: string }): ReactElement {
  const total = preview.accepted + preview.rejected + preview.unchanged;
  return (
    <div>
      <p style={{
        margin: `0 0 ${spacing.sm}px`,
        fontSize: typography.fontSize.sm,
        color: accentColor,
        opacity: 0.85,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Local-only cards are untouched. Only cards in this file may change.
      </p>
      <PreviewRow label="Cards that would be updated" value={preview.accepted} accent={accentColor} />
      <PreviewRow label="Cards already up to date" value={preview.unchanged} accent={accentColor} />
      <PreviewRow label="Cards kept (local was newer)" value={preview.rejected} accent={accentColor} />
      <PreviewRow label="Total cards in file" value={total} accent={accentColor} />
    </div>
  );
}

function ActionButton({
  onClick,
  disabled,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}): ReactElement {
  const bgColor = variant === 'primary' ? colors.surface.dark : colors.surface.white;
  const textColor = variant === 'secondary' ? colors.text.primary : colors.text.white;
  const borderStyle = variant === 'secondary' ? `1px solid ${colors.border.default}` : 'none';

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
// Component
// ---------------------------------------------------------------------------

export interface ImportPreviewProps {
  snapshot: MasteryExport;
  onApply: () => Promise<void>;
  onCancel: () => void;
}

type ApplyPhase = 'idle' | 'applying' | 'error';

export function ImportPreview({ snapshot, onApply, onCancel }: ImportPreviewProps): ReactElement {
  const { exportSnapshot } = useMastery();
  const [preview, setPreview] = useState<PreviewCounts | null>(null);
  const [phase, setPhase] = useState<ApplyPhase>('idle');
  const [applyError, setApplyError] = useState<string | null>(null);

  // Compute preview on mount (or when snapshot changes)
  useEffect(() => {
    let cancelled = false;
    exportSnapshot().then(local => {
      if (!cancelled) {
        setPreview(computePreview(snapshot, local));
      }
    }).catch(() => {
      // If we can't read local state, treat as all-new
      if (!cancelled) {
        const total = Object.keys(snapshot.cards).length;
        setPreview({ accepted: total, rejected: 0, unchanged: 0 });
      }
    });
    return () => { cancelled = true; };
  }, [snapshot, exportSnapshot]);

  async function handleApply(): Promise<void> {
    setPhase('applying');
    setApplyError(null);
    try {
      await onApply();
      // Parent takes over after this — don't set local state here
    } catch {
      setPhase('error');
      setApplyError('Import failed. Please try again.');
    }
  }

  const accentColor = colors.callout.tipText; // '#8B6914'

  return (
    <div
      role="region"
      aria-label="Import preview"
      style={{
        background: colors.callout.tipBg,
        border: `1px solid ${colors.callout.tipBorder}`,
        borderRadius: radii.lg,
        padding: `${spacing.xl}px ${spacing.xxl}px`,
      }}
    >
      <h3 style={{
        margin: `0 0 ${spacing.md}px`,
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.semibold,
        color: colors.callout.tipText,
      }}>
        Preview — what would change
      </h3>

      {preview === null ? (
        <div style={{ fontSize: typography.fontSize.base, color: colors.text.secondary, padding: `${spacing.sm}px 0` }}>
          Computing preview…
        </div>
      ) : (
        <PreviewTable preview={preview} accentColor={accentColor} />
      )}

      {applyError !== null && (
        <div style={{
          marginTop: spacing.md,
          background: '#FFEBEE',
          border: '1px solid #FFCDD2',
          borderRadius: radii.base,
          padding: `${spacing.sm}px ${spacing.md}px`,
          fontSize: typography.fontSize.base,
          color: '#C62828',
        }}>
          {applyError}
        </div>
      )}

      <div style={{ display: 'flex', gap: spacing.md, marginTop: spacing.xl, flexWrap: 'wrap' }}>
        <ActionButton
          onClick={() => { void handleApply(); }}
          disabled={phase === 'applying' || preview === null}
        >
          {phase === 'applying' ? 'Applying…' : 'Apply'}
        </ActionButton>
        {phase !== 'applying' && (
          <ActionButton onClick={onCancel} variant="secondary">
            Cancel
          </ActionButton>
        )}
        {phase === 'error' && (
          <ActionButton
            onClick={() => { setPhase('idle'); setApplyError(null); }}
            variant="secondary"
          >
            Retry
          </ActionButton>
        )}
      </div>
    </div>
  );
}
