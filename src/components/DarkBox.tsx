import type { ReactNode, ReactElement } from 'react';
import { colors, spacing, radii, typography } from '../styles/tokens';

export interface DarkBoxProps {
  title?: string;
  children: ReactNode;
  gradient?: string;
  labelColor?: string;
}

const defaultGradient = `linear-gradient(135deg,${colors.surface.dark},${colors.surface.dark2})`;

export function DarkBox({
  title,
  children,
  gradient = defaultGradient,
  labelColor = colors.callout.darkLabel,
}: DarkBoxProps): ReactElement {
  return (
    <div style={{ background: gradient, borderRadius: radii.xxl, padding: `${spacing.lg}px ${spacing.xl}px`, marginBottom: spacing.lg, color: colors.text.white, textAlign: 'center' }}>
      {title && <div style={{ fontSize: typography.fontSize.xs, color: labelColor, letterSpacing: 2, textTransform: 'uppercase', marginBottom: spacing.sm, fontWeight: typography.fontWeight.semibold }}>{title}</div>}
      {children}
    </div>
  );
}
