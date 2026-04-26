import type { ReactNode, ReactElement } from 'react';
import { colors, spacing, radii, typography } from '../styles/tokens';

export interface CardProps {
  color: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ color, title, subtitle, children }: CardProps): ReactElement {
  return (
    <div style={{ background: colors.surface.white, borderRadius: radii.xxl, overflow: 'hidden', border: `1px solid ${colors.border.default}`, marginBottom: spacing.lg }}>
      <div style={{ background: color, padding: `${spacing.md}px ${spacing.lg}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: colors.text.white, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.extrabold }}>{title}</span>
        {subtitle && <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: typography.fontSize.sm }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}
