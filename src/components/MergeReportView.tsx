/**
 * MergeReportView — renders a MergeReport as a labeled table.
 * Used by SettingsPage and ImportPage after a successful import.
 */

import type { ReactElement } from 'react';
import type { MergeReport } from '../mastery';
import { spacing, radii, typography } from '../styles/tokens';

interface PreviewRowProps {
  label: string;
  value: number;
  accent: string;
}

function PreviewRow({ label, value, accent }: PreviewRowProps): ReactElement {
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

interface MergeReportViewProps {
  report: MergeReport;
  accentColor?: string;
}

export function MergeReportView({ report, accentColor = '#33691E' }: MergeReportViewProps): ReactElement {
  return (
    <div style={{ borderRadius: radii.base }}>
      <p style={{
        margin: `0 0 ${spacing.sm}px`,
        fontSize: typography.fontSize.sm,
        color: accentColor,
        opacity: 0.8,
        lineHeight: typography.lineHeight.relaxed,
      }}>
        Local-only cards (not in this file) were untouched.
      </p>
      <PreviewRow label="Cards updated" value={report.accepted} accent={accentColor} />
      <PreviewRow label="Cards unchanged" value={report.unchanged} accent={accentColor} />
      <PreviewRow label="Cards kept (local was newer)" value={report.rejected} accent={accentColor} />
    </div>
  );
}
