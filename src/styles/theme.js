// NEO-KODEX — "Precision Dark"
// Tema único oscuro profesional. Mantiene una API anidada moderna
// (colors / typography / spacing / shadows / transitions) y, además,
// expone claves "legacy" planas (background, accent, text, glass, ...)
// para que los componentes existentes adopten la nueva paleta sin romperse.

const palette = {
  bg: {
    primary: '#0A0A0F',
    secondary: '#0F0F17',
    card: '#13131E',
    cardHover: '#1A1A28',
    subtle: '#1E1E2E',
    deep: '#080810'
  },
  border: {
    default: 'rgba(255,255,255,0.08)',
    strong: 'rgba(255,255,255,0.15)',
    accent: 'rgba(99, 210, 140, 0.3)'
  },
  accent: {
    primary: '#63D28C',
    hover: '#7ADFA0',
    muted: 'rgba(99, 210, 140, 0.12)',
    glow: 'rgba(99, 210, 140, 0.15)'
  },
  text: {
    primary: '#F0F0F5',
    secondary: '#8A8A9E',
    muted: '#555568',
    accent: '#63D28C'
  },
  gradient: {
    hero: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,210,140,0.12) 0%, transparent 70%)',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
    cta: 'linear-gradient(135deg, #63D28C 0%, #4FC17A 100%)',
    ctaHover: 'linear-gradient(135deg, #7ADFA0 0%, #63D28C 100%)'
  }
};

const typography = {
  fontDisplay: "'Geist', system-ui, sans-serif",
  fontBody: "'Geist', system-ui, sans-serif",
  fontMono: "'Geist Mono', ui-monospace, monospace",
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem'
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7
  }
};

const spacing = {
  sectionY: '120px',
  containerX: '24px',
  maxWidth: '1200px',
  cardRadius: '16px',
  buttonRadius: '10px'
};

const shadows = {
  card: '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
  cardHover: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,210,140,0.2)',
  button: '0 0 20px rgba(99,210,140,0.25)',
  glow: '0 0 60px rgba(99,210,140,0.08)'
};

const transitions = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)'
};

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`
};

const precisionDark = {
  name: 'dark',

  // --- API moderna anidada ---
  colors: palette,
  typography,
  spacing,
  shadows,
  transitions,
  breakpoints,
  media,

  // --- Claves legacy (mapeadas a Precision Dark) ---
  background: palette.bg.primary,
  backgroundGradient:
    'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(99,210,140,0.07) 0%, transparent 70%)',
  surface: palette.bg.card,
  surfaceSecondary: palette.bg.secondary,
  text: palette.text.primary,
  textSecondary: palette.text.secondary,
  accent: palette.accent.primary,
  accentSoft: palette.accent.muted,
  border: palette.border.default,
  glass: {
    background: 'rgba(19, 19, 30, 0.72)',
    border: palette.border.default,
    shadow: '0 8px 32px rgba(0,0,0,0.4)'
  }
};

// Mantiene la firma de getTheme/themes: el sitio es siempre oscuro,
// así que todos los nombres resuelven al mismo tema Precision Dark.
export const themes = {
  light: precisionDark,
  dark: precisionDark,
  sepia: precisionDark
};

export function getTheme() {
  return precisionDark;
}

export default precisionDark;
