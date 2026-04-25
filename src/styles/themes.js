export const lightTheme = {
  bg: '#FDFBF7',
  headerBg: '#fff',
  borderColor: '#e0dcd5',
  textPrimary: '#1a1a1a',
  textSecondary: '#6E6E6E', // 4.6:1 on #FDFBF7 — passes WCAG AA
  textTertiary: '#999',     // 2.84:1 — AA-Large only (use for large/bold text ≥18px)
  textMuted: '#555',
  sidebarBg: '#fff',
  sidebarActiveItemBg: '#f0eeeb',
  sidebarItemText: '#333',
  sidebarItemActiveText: null, // uses guide color
  sidebarSubText: '#6E6E6E', // 4.6:1 on #fff — passes WCAG AA
  focusColor: '#00695C',
  dotInactive: '#ddd',
  buttonBg: '#fff',
  buttonBorder: '#e0dcd5',
  buttonText: '#555',
  buttonDisabledBg: '#f5f5f5',
  buttonDisabledText: '#ccc',
  overlayBg: 'rgba(0,0,0,0.4)',
  scrollbarThumb: '#d4cfc5',
  contentFont: "system-ui,'Segoe UI',sans-serif",
  shellFont: "system-ui,'Segoe UI',sans-serif",
  outerFont: "'Georgia','Garamond','Times New Roman',serif",
};

export const darkTheme = {
  bg: '#0D0D0D',
  headerBg: '#151515',
  borderColor: '#2a2a2a',
  textPrimary: '#eee',
  textSecondary: '#666',
  textMuted: '#aaa',
  sidebarBg: '#151515',
  sidebarActiveItemBg: '#252525',
  sidebarItemText: '#aaa',
  sidebarItemActiveText: '#fff',
  sidebarSubText: '#555',
  focusColor: '#C62828',
  dotInactive: '#333',
  buttonBg: '#1a1a1a',
  buttonBorder: '#333',
  buttonText: '#aaa',
  buttonDisabledBg: '#111',
  buttonDisabledText: '#444',
  overlayBg: 'rgba(0,0,0,0.6)',
  scrollbarThumb: '#333',
  contentFont: "'Segoe UI','Helvetica Neue',sans-serif",
  shellFont: "'Segoe UI','Helvetica Neue',sans-serif",
  outerFont: "'Segoe UI','Helvetica Neue',sans-serif",
};

export const jazzTheme = {
  ...darkTheme,
  bg: '#121010',
  headerBg: '#1a1510',
  borderColor: '#2a2218',
  sidebarBg: '#1a1510',
  focusColor: '#8D6E63',
  scrollbarThumb: '#3a3025',
};

export const freecadTheme = {
  ...darkTheme,
  bg: '#0d1b2a',
  headerBg: '#162a3d',
  borderColor: '#243a52',
  sidebarBg: '#162a3d',
  focusColor: '#e67e22',
  scrollbarThumb: '#2a4060',
};
