import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiFeather, FiMenu, FiX } from 'react-icons/fi';
import { useCallback, useState, useEffect } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { useAccessibility } from '../contexts/AccessibilityContext.jsx';
import { logCtaInteraction } from '../services/leadService.js';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(16px);
  background: ${({ theme }) => `${theme.background}e6`};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Logo = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const DesktopMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
`;

const MenuLink = styled.a`
  position: relative;
  font-weight: 500;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
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

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 0.85rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.accentSoft};
  }
`;

const HeaderCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  box-shadow: 0 12px 30px ${({ theme }) => theme.accentSoft};
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.3rem;

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 998;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100vh;
  background: ${({ theme }) => theme.background};
  border-left: 1px solid ${({ theme }) => theme.border};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.5rem;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const MobileLink = styled.a`
  display: block;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accentSoft};
    color: ${({ theme }) => theme.accent};
  }
`;

const MobileActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const themeMeta = {
  light: { label: 'Claro', icon: FiSun },
  dark: { label: 'Oscuro', icon: FiMoon },
  sepia: { label: 'Sepia', icon: FiFeather }
};

function Navbar({ onCycleTheme, themeName, availableThemes }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#acerca', label: 'Nosotros' },
    { href: '#por-que', label: 'Por qué elegirnos' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' }
  ];

  const current = themeMeta[themeName] ?? themeMeta.dark;
  const nextThemeIndex = (availableThemes.indexOf(themeName) + 1) % availableThemes.length;
  const nextTheme = themeMeta[availableThemes[nextThemeIndex]] ?? themeMeta.dark;
  const ThemeIcon = current.icon;
  const { variant } = useExperiment();
  const { trackEvent } = useAnalytics();

  const handleCtaClick = useCallback(() => {
    trackEvent({ action: 'cta_click', category: 'navbar', label: 'cotizacion' });
    logCtaInteraction({ location: 'navbar', variant, intent: 'cotizacion' }).catch(() => {});
  }, [trackEvent, variant]);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', close);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <Header>
      <Nav aria-label="Principal">
        <Brand to="/">
          <Logo src="/assets/logo-neokodex.svg" alt="NeoKodex logo" />
          NEO-KODEX
        </Brand>
        <DesktopMenu>
          {links.map((link) => (
            <MenuItem key={link.href}>
              <MenuLink href={link.href}>{link.label}</MenuLink>
            </MenuItem>
          ))}
          <MenuItem>
            <HeaderCTA href="#contacto" onClick={handleCtaClick}>
              Cotiza gratis
            </HeaderCTA>
          </MenuItem>
          <MenuItem>
            <ThemeToggle
              type="button"
              onClick={onCycleTheme}
              aria-label={`Cambiar a modo ${nextTheme.label}`}
              title={`Tema: ${current.label}`}
            >
              <ThemeIcon aria-hidden="true" />
            </ThemeToggle>
          </MenuItem>
        </DesktopMenu>
        <HamburgerButton
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <FiMenu />
        </HamburgerButton>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <MobileOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <MobileMenuHeader>
                <Brand to="/" onClick={() => setMobileOpen(false)}>
                  <Logo src="/assets/logo-neokodex.svg" alt="" />
                  NEO-KODEX
                </Brand>
                <HamburgerButton
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  style={{ display: 'inline-flex' }}
                >
                  <FiX />
                </HamburgerButton>
              </MobileMenuHeader>
              {links.map((link) => (
                <MobileLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </MobileLink>
              ))}
              <MobileActions>
                <HeaderCTA
                  href="#contacto"
                  onClick={() => { handleCtaClick(); setMobileOpen(false); }}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  Cotiza gratis
                </HeaderCTA>
                <ThemeToggle type="button" onClick={onCycleTheme} style={{ justifyContent: 'center' }}>
                  <ThemeIcon aria-hidden="true" />
                  <span>{current.label}</span>
                </ThemeToggle>
              </MobileActions>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </Header>
  );
}

Navbar.propTypes = {
  onCycleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark', 'sepia']).isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navbar;
