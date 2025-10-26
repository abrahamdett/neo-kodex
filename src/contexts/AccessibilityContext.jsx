import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

const STORAGE_KEY = 'neo-kodex::reduce-motion';

const AccessibilityContext = createContext({
  reduceMotion: false,
  toggleReduceMotion: () => {}
});

export function AccessibilityProvider({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined') return prefersReducedMotion;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
    return prefersReducedMotion;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, String(reduceMotion));
    document.body.dataset.reduceMotion = reduceMotion ? 'true' : 'false';
  }, [reduceMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.dataset.reduceMotion = reduceMotion ? 'true' : 'false';
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (!prefersReducedMotion) return;
    setReduceMotion(true);
  }, [prefersReducedMotion, reduceMotion]);

  const value = useMemo(
    () => ({
      reduceMotion,
      toggleReduceMotion: () => setReduceMotion((prev) => !prev)
    }),
    [reduceMotion]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

AccessibilityProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export default AccessibilityContext;
