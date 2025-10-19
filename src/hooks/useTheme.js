import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'neo-kodex-theme-preference';
const THEMES = ['light', 'dark', 'sepia'];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && THEMES.includes(stored)) {
    return stored;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function useTheme() {
  const [themeName, setThemeName] = useState(getInitialTheme);

  const sequence = useMemo(() => THEMES, []);

  const applyTheme = useCallback((name) => {
    const root = document.documentElement;
    sequence.forEach((value) => {
      root.classList.remove(`theme-${value}`);
    });
    root.classList.add(`theme-${name}`);
    root.setAttribute('data-theme', name);
  }, [sequence]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    applyTheme(themeName);
    window.localStorage.setItem(STORAGE_KEY, themeName);
    return undefined;
  }, [themeName, applyTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event) => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setThemeName(event.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeName((prev) => {
      const currentIndex = sequence.indexOf(prev);
      const nextIndex = (currentIndex + 1) % sequence.length;
      return sequence[nextIndex];
    });
  }, [sequence]);

  return {
    themeName,
    setThemeName,
    cycleTheme,
    themes: sequence
  };
}
