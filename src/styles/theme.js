export const themes = {
  light: {
    name: 'light',
    background: '#eef1ff',
    backgroundGradient: `radial-gradient(circle at 15% 20%, rgba(126, 90, 240, 0.25), transparent 55%),
      radial-gradient(circle at 85% 15%, rgba(0, 209, 255, 0.18), transparent 55%),
      radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.9), transparent 65%)`,
    surface: 'rgba(255, 255, 255, 0.7)',
    surfaceSecondary: 'rgba(243, 245, 255, 0.85)',
    text: '#0b1026',
    textSecondary: '#334155',
    accent: '#7f5af0',
    accentSoft: 'rgba(127, 90, 240, 0.2)',
    border: 'rgba(148, 163, 184, 0.35)',
    glass: {
      background: 'rgba(255, 255, 255, 0.45)',
      border: 'rgba(255, 255, 255, 0.4)',
      shadow: '0 24px 60px rgba(91, 138, 255, 0.2)'
    }
  },
  dark: {
    name: 'dark',
    background: '#050810',
    backgroundGradient: `radial-gradient(circle at 20% 25%, rgba(127, 90, 240, 0.35), transparent 55%),
      radial-gradient(circle at 80% 10%, rgba(0, 209, 255, 0.28), transparent 55%),
      radial-gradient(circle at 50% 80%, rgba(35, 18, 61, 0.8), transparent 68%)`,
    surface: 'rgba(12, 20, 34, 0.9)',
    surfaceSecondary: 'rgba(15, 23, 42, 0.9)',
    text: '#f5f7ff',
    textSecondary: '#cbd5f5',
    accent: '#7f5af0',
    accentSoft: 'rgba(127, 90, 240, 0.35)',
    border: 'rgba(100, 116, 139, 0.35)',
    glass: {
      background: 'rgba(15, 23, 42, 0.55)',
      border: 'rgba(94, 106, 136, 0.45)',
      shadow: '0 24px 60px rgba(2, 8, 23, 0.65)'
    }
  },
  sepia: {
    name: 'sepia',
    background: '#f7f0e8',
    backgroundGradient: `radial-gradient(circle at 18% 22%, rgba(244, 176, 124, 0.25), transparent 60%),
      radial-gradient(circle at 78% 18%, rgba(255, 230, 165, 0.32), transparent 60%),
      radial-gradient(circle at 40% 82%, rgba(255, 244, 230, 0.9), transparent 70%)`,
    surface: 'rgba(255, 248, 240, 0.78)',
    surfaceSecondary: 'rgba(250, 238, 220, 0.85)',
    text: '#3a2b20',
    textSecondary: '#5c4332',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.18)',
    border: 'rgba(209, 178, 148, 0.45)',
    glass: {
      background: 'rgba(255, 245, 231, 0.6)',
      border: 'rgba(255, 224, 200, 0.4)',
      shadow: '0 24px 60px rgba(209, 178, 148, 0.35)'
    }
  }
};

export function getTheme(name) {
  return themes[name] ?? themes.light;
}
