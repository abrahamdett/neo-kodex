import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'neo-kodex-theme-preference';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function useDarkMode() {
  const [themeName, setThemeName] = useState(getInitialTheme);

  const applyTheme = useCallback((value) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', value);
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${value}`);
  }, []);

  useEffect(() => {
    applyTheme(themeName);
    window.localStorage.setItem(STORAGE_KEY, themeName);
  }, [themeName, applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme: themeName,
    themeName,
    toggleTheme
  };
}
