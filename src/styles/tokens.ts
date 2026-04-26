/**
 * Design tokens — single source of truth for atomic values.
 *
 * Convention:
 * - Tokenize canonical values that appear in multiple shared components.
 * - Odd one-offs (e.g. complex padding strings like '7px 28px 7px 10px',
 *   per-guide accent colors, or component-specific gradients) stay as inline
 *   literals in their files. Only migrate where a clean name exists.
 * - Guide files (.jsx/.tsx under src/guides/) are NOT migrated here;
 *   they keep their literal hex values and are migrated as touched.
 */

export const colors = {
  text: {
    primary: '#1a1a1a',
    secondary: '#6E6E6E',
    muted: '#555',
    tertiary: '#999',
    white: '#fff',
    visited: '#4CAF50',
  },
  surface: {
    white: '#fff',
    light: '#FDFBF7',
    dark: '#1a1a1a',
    dark2: '#252525',
  },
  border: {
    default: '#e0dcd5',
    subtle: '#f0eeeb',
  },
  callout: {
    tipBg: '#FFF8E7',
    tipBorder: '#F0E4C4',
    tipText: '#8B6914',
    darkLabel: '#666',
  },
} as const;

/**
 * Spacing scale (px values — applied as numbers in inline styles).
 * Canonical sizes used across shared components. Fractional/complex
 * padding strings (e.g. '10px 14px') stay as literals.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * Border-radius scale (px values).
 */
export const radii = {
  sm: 4,
  md: 6,
  base: 8,
  lg: 10,
  xl: 12,
  xxl: 14,
  xxxl: 16,
  pill: 20,
} as const;

/**
 * Typography scale.
 * Font-size values observed in shared components (2xs–xxl covers 9–24px range used).
 * Values outside this scale (32px+) appear only in guide files and stay as literals.
 */
export const typography = {
  fontSize: {
    '2xs': 9,
    xs: 10,
    sm: 11,
    md: 12,
    base: 13,
    nav: 14,
    lg: 15,
    xl: 16,
    '2xl': 17,
    '3xl': 18,
    '4xl': 20,
    '5xl': 24,
  } as const,
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  } as const,
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  } as const,
} as const;
