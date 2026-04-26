import type { ReactElement } from 'react';
import { colors, spacing, radii, typography } from '../styles/tokens';

export interface InsightProps {
  text: string;
  emoji?: string;
  bg?: string;
  border?: string;
  color?: string;
}

export function Insight({
  text,
  emoji = '\u{1F4A1}',
  bg = colors.callout.tipBg,
  border = colors.callout.tipBorder,
  color = colors.callout.tipText,
}: InsightProps): ReactElement {
  return (
    <div style={{ background: bg, borderRadius: radii.lg, padding: '10px 14px', marginBottom: spacing.md, border: `1px solid ${border}`, fontSize: typography.fontSize.md, color, lineHeight: 1.5 }}>
      {emoji} {text}
    </div>
  );
}
