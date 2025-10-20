import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useCountUp({ target, start = 0, duration = 1200, decimals = 0, isActive = true }) {
  const [value, setValue] = useState(start);
  const frameRef = useRef();
  const startTimeRef = useRef();

  useEffect(() => {
    if (!isActive) {
      setValue(start);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }
      startTimeRef.current = undefined;
      return undefined;
    }

    const totalChange = target - start;

    const updateValue = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = start + totalChange * eased;
      const formatted = Number(nextValue.toFixed(decimals));
      setValue(formatted);
      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(updateValue);
      }
    };

    frameRef.current = window.requestAnimationFrame(updateValue);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }
      startTimeRef.current = undefined;
    };
  }, [duration, decimals, isActive, start, target]);

  return value;
}
