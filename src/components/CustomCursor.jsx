import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext.jsx';

const primarySpring = { damping: 20, stiffness: 220, mass: 0.3 };
const followerSpring = { damping: 18, stiffness: 140, mass: 0.6 };

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const { reduceMotion } = useAccessibility();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const x = useSpring(cursorX, primarySpring);
  const y = useSpring(cursorY, primarySpring);
  const followerSpringX = useSpring(followerX, followerSpring);
  const followerSpringY = useSpring(followerY, followerSpring);

  const mediaQueries = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return {
      finePointer: window.matchMedia('(pointer: fine)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    };
  }, []);

  useEffect(() => {
    if (!mediaQueries) return undefined;
    const { finePointer, reducedMotion } = mediaQueries;

    const updateState = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches && !reduceMotion);
    };

    updateState();

    finePointer.addEventListener('change', updateState);
    reducedMotion.addEventListener('change', updateState);

    return () => {
      finePointer.removeEventListener('change', updateState);
      reducedMotion.removeEventListener('change', updateState);
    };
  }, [mediaQueries, reduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerMove = (event) => {
      cursorX.set(event.clientX - 9);
      cursorY.set(event.clientY - 9);
      followerX.set(event.clientX - 32);
      followerY.set(event.clientY - 32);
      document.documentElement.style.setProperty('--cursor-x', `${(event.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--cursor-y', `${(event.clientY / window.innerHeight) * 100}%`);
    };

    const handleLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      followerX.set(-100);
      followerY.set(-100);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, cursorX, cursorY, followerX, followerY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="neo-cursor" style={{ translateX: x, translateY: y }} aria-hidden="true" />
      <motion.div className="neo-cursor neo-cursor--trailing" style={{ translateX: followerSpringX, translateY: followerSpringY }} aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
