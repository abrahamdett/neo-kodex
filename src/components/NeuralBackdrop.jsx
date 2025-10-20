import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: lighten;
  opacity: 0.55;
  transition: opacity 0.6s ease;

  @media (prefers-reduced-motion: reduce) {
    opacity: 0.4;
  }
`;

function NeuralBackdrop() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const pixelRatio = window.devicePixelRatio ?? 1;
    let animationFrame;
    let width = 0;
    let height = 0;

    const nodes = Array.from({ length: prefersReducedMotion ? 60 : 120 }, (_, index) => ({
      // Los nodos se desplazan suavemente sobre el fondo para reforzar la identidad neuronal.
      x: Math.random(),
      y: Math.random(),
      angle: Math.random() * Math.PI * 2,
      speed: prefersReducedMotion ? 0 : 0.0008 + Math.random() * 0.0015,
      radius: prefersReducedMotion ? 0.6 + Math.random() * 1.2 : 0.8 + Math.random() * 1.6,
      offset: index * 12
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(pixelRatio, pixelRatio);
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);

      const accent = theme?.accent ?? '#7f5af0';
      const neon = theme?.name === 'dark' ? '#38bdf8' : '#00d1ff';
      const baseStroke = `${accent}22`;
      const activeStroke = `${neon}44`;

      nodes.forEach((node) => {
        const progress = time * node.speed + node.offset;
        const vx = Math.cos(progress) * 0.0009;
        const vy = Math.sin(progress * 0.9) * 0.0009;

        node.x += vx;
        node.y += vy;

        if (node.x < 0) node.x = 1;
        if (node.x > 1) node.x = 0;
        if (node.y < 0) node.y = 1;
        if (node.y > 1) node.y = 0;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const x = node.x * width;
        const y = node.y * height;

        context.beginPath();
        const gradient = context.createRadialGradient(x, y, 0, x, y, node.radius * 18);
        gradient.addColorStop(0, `${accent}99`);
        gradient.addColorStop(1, `${accent}00`);
        context.fillStyle = gradient;
        context.fillRect(x - 60, y - 60, 120, 120);

        if (prefersReducedMotion) continue;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = Math.abs(node.x - other.x);
          const dy = Math.abs(node.y - other.y);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 0.15) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(other.x * width, other.y * height);
            context.lineWidth = 1.1;
            context.strokeStyle = distance < 0.08 ? activeStroke : baseStroke;
            context.stroke();
          }
        }
      }
    };

    const loop = (timestamp) => {
      draw(timestamp * 0.06);
      animationFrame = requestAnimationFrame(loop);
    };

    resize();
    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(loop);
    } else {
      draw(0);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion, theme]);

  return <Canvas ref={canvasRef} aria-hidden />;
}

export default NeuralBackdrop;
