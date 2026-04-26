import { useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { colors, spacing, radii, typography } from '../styles/tokens';

export interface ExpandSectionProps {
  title: string;
  color?: string;
  children: ReactNode;
}

export function ExpandSection({ title, color = colors.surface.dark, children }: ExpandSectionProps): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: spacing.sm }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: `10px ${spacing.lg}px`, borderRadius: radii.lg,
          border: `1.5px solid ${colors.border.default}`,
          background: open ? color : colors.surface.white,
          color: open ? colors.text.white : colors.text.muted,
          fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: typography.fontSize.xl, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>{'⌄'}</span>
      </button>
      {open && <div style={{ marginTop: spacing.sm }}>{children}</div>}
    </div>
  );
}
