export const themes = {
  light: {
    name: 'light',
    background: '#f0f4f0',
    backgroundGradient: `radial-gradient(circle at 15% 20%, rgba(34, 139, 34, 0.15), transparent 55%),
      radial-gradient(circle at 85% 15%, rgba(0, 180, 100, 0.12), transparent 55%),
      radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.9), transparent 65%)`,
    surface: 'rgba(255, 255, 255, 0.8)',
    surfaceSecondary: 'rgba(245, 250, 245, 0.9)',
    text: '#0a1a0a',
    textSecondary: '#3a5a3a',
    accent: '#1a8c3a',
    accentSoft: 'rgba(26, 140, 58, 0.15)',
    border: 'rgba(100, 140, 100, 0.3)',
    glass: {
      background: 'rgba(255, 255, 255, 0.55)',
      border: 'rgba(200, 230, 200, 0.5)',
      shadow: '0 24px 60px rgba(26, 140, 58, 0.12)'
    }
  },
  dark: {
    name: 'dark',
    background: '#060e08',
    backgroundGradient: `radial-gradient(circle at 20% 25%, rgba(26, 140, 58, 0.25), transparent 55%),
      radial-gradient(circle at 80% 10%, rgba(0, 200, 100, 0.18), transparent 55%),
      radial-gradient(circle at 50% 80%, rgba(10, 30, 15, 0.8), transparent 68%)`,
    surface: 'rgba(10, 22, 14, 0.92)',
    surfaceSecondary: 'rgba(12, 26, 16, 0.92)',
    text: '#e8f5e8',
    textSecondary: '#a0c8a0',
    accent: '#2ecc5a',
    accentSoft: 'rgba(46, 204, 90, 0.25)',
    border: 'rgba(60, 100, 70, 0.4)',
    glass: {
      background: 'rgba(12, 26, 16, 0.6)',
      border: 'rgba(46, 100, 60, 0.45)',
      shadow: '0 24px 60px rgba(2, 12, 6, 0.65)'
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
    accent: '#d97706',
    accentSoft: 'rgba(217, 119, 6, 0.18)',
    border: 'rgba(209, 178, 148, 0.45)',
    glass: {
      background: 'rgba(255, 245, 231, 0.6)',
      border: 'rgba(255, 224, 200, 0.4)',
      shadow: '0 24px 60px rgba(209, 178, 148, 0.35)'
    }
  }
};

export function getTheme(name) {
  return themes[name] ?? themes.dark;
}
