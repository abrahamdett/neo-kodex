import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiFeather } from 'react-icons/fi';
import { useCallback } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { useAccessibility } from '../contexts/AccessibilityContext.jsx';
import { logCtaInteraction } from '../services/leadService.js';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(12px);
  background: ${({ theme }) => `${theme.background}cc`};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.04em;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  box-shadow: 0 0 18px ${({ theme }) => theme.accent};
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: flex-end;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
`;

const MenuLink = styled.a`
  position: relative;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
  &:hover {
    color: ${({ theme }) => theme.text};
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.accent};
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;

const BlogLink = styled(Link)`
  position: relative;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 12px 30px rgba(127, 90, 240, 0.2);
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const HeaderCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 16px 32px rgba(127, 90, 240, 0.25);
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    outline: 3px solid ${({ theme }) => theme.accentSoft};
    outline-offset: 4px;
  }
`;

const MotionToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  margin-left: 0.75rem;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const themeMeta = {
  light: { label: 'Claro', icon: FiSun },
  dark: { label: 'Oscuro', icon: FiMoon },
  sepia: { label: 'Sepia', icon: FiFeather }
};

function Navbar({ onCycleTheme, themeName, availableThemes }) {
  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#acerca', label: 'Acerca de' },
    { href: '#por-que', label: 'Por qué elegirnos' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' }
  ];

  const current = themeMeta[themeName] ?? themeMeta.light;
  const nextThemeIndex = (availableThemes.indexOf(themeName) + 1) % availableThemes.length;
  const nextTheme = themeMeta[availableThemes[nextThemeIndex]] ?? themeMeta.light;
  const ThemeIcon = current.icon;
  const { variant } = useExperiment();
  const { reduceMotion, toggleReduceMotion } = useAccessibility();
  const { trackEvent } = useAnalytics();

  const ctaCopy = variant === 'b' ? 'Agenda tu diagnóstico sin costo' : 'Agenda tu sesión gratuita de diagnóstico';

  const handleCtaClick = useCallback(() => {
    trackEvent({ action: 'cta_click', category: 'navbar', label: 'agenda-diagnostico' });
    logCtaInteraction({ location: 'navbar', variant, intent: 'agenda_diagnostico' }).catch(() => {
      // Evitamos romper la navegación si el registro remoto falla.
    });
  }, [trackEvent, variant]);

  return (
    <Header>
      <Nav aria-label="Principal">
        <Brand to="/">
          <Dot as={motion.span} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
          NEO-KODEX
        </Brand>
        <Menu>
          <MenuItem>
            <BlogLink to="/blog">Blog & Recursos</BlogLink>
          </MenuItem>
          {links.map((link) => (
            <MenuItem key={link.href}>
              <MenuLink href={link.href}>{link.label}</MenuLink>
            </MenuItem>
          ))}
          <MenuItem>
            <HeaderCTA href="#contacto" onClick={handleCtaClick}>
              {ctaCopy}
            </HeaderCTA>
          </MenuItem>
          <MenuItem>
            <ThemeToggle
              type="button"
              onClick={onCycleTheme}
              aria-label={`Cambiar a modo ${nextTheme.label}`}
              title={`Tema actual: ${current.label}`}
            >
              <ThemeIcon aria-hidden="true" />
              <span>{current.label}</span>
            </ThemeToggle>
          </MenuItem>
          <MenuItem>
            <MotionToggle type="button" onClick={toggleReduceMotion} aria-pressed={reduceMotion}>
              {reduceMotion ? 'Activar animaciones' : 'Reducir movimiento'}
            </MotionToggle>
          </MenuItem>
        </Menu>
      </Nav>
    </Header>
  );
}

Navbar.propTypes = {
  onCycleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark', 'sepia']).isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navbar;
