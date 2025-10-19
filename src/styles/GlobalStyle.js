import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ClashDisplay';
    src: local('ClashDisplay-Semibold'), local('ClashDisplay');
    font-display: swap;
  }

  :root {
    color-scheme: ${({ 'data-theme': dataTheme }) => dataTheme};
    scroll-behavior: smooth;
    --cursor-x: 50%;
    --cursor-y: 50%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    background-image: ${({ theme }) => theme.backgroundGradient};
    background-attachment: fixed;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    font-family: 'InterVariable', 'Inter', 'ClashDisplay', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
    line-height: 1.65;
    transition: background 0.8s ease, color 0.8s ease;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at var(--cursor-x) var(--cursor-y), rgba(127, 90, 240, 0.16), transparent 55%);
    mix-blend-mode: screen;
    transition: background 0.3s ease;
    z-index: 0;
  }

  ::selection {
    background: ${({ theme }) => theme.accent};
    color: #ffffff;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
  }

  @media (hover: hover) and (pointer: fine) {
    body {
      cursor: none;
    }
  }

  .neo-cursor,
  .neo-cursor--trailing {
    pointer-events: none;
    position: fixed;
    border-radius: 50%;
    z-index: 9999;
    mix-blend-mode: difference;
    will-change: transform;
  }

  .neo-cursor {
    width: 18px;
    height: 18px;
    background: ${({ theme }) => theme.accent};
    box-shadow: 0 0 24px ${({ theme }) => theme.accent};
  }

  .neo-cursor--trailing {
    width: 64px;
    height: 64px;
    border: 2px solid ${({ theme }) => theme.accent};
    opacity: 0.55;
    mix-blend-mode: screen;
    backdrop-filter: blur(12px);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default GlobalStyle;
