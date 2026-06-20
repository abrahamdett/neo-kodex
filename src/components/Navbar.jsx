import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useCallback, useState, useEffect } from 'react';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { logCtaInteraction } from '../services/leadService.js';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    backdrop-filter ${({ theme }) => theme.transitions.normal};

  background: ${({ $scrolled }) => ($scrolled ? 'rgba(10,10,15,0.88)' : 'transparent')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(20px)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(20px)' : 'none')};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) => ($scrolled ? theme.colors.border.default : 'transparent')};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
  height: 64px;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const DesktopMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MenuLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const HeaderCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.875rem;
  transition: background ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accent.hover};
    box-shadow: 0 0 20px rgba(99, 210, 140, 0.3);
    transform: translateY(-1px);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: 1.3rem;

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  z-index: 998;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100vh;
  height: 100dvh;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border-left: 1px solid ${({ theme }) => theme.colors.border.default};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  gap: 0.25rem;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const MobileLink = styled.a`
  display: block;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const MobileActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  padding-bottom: env(safe-area-inset-bottom, 0.5rem);
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#productos', label: 'Productos' },
    { href: '#portafolio', label: 'Portafolio' },
    { href: '#acerca', label: 'Nosotros' },
    { href: '#por-que', label: 'Por qué elegirnos' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#contacto', label: 'Contacto' }
  ];

  const { variant } = useExperiment();
  const { trackEvent } = useAnalytics();

  const handleCtaClick = useCallback(() => {
    trackEvent({ action: 'cta_click', category: 'navbar', label: 'cotizacion' });
    logCtaInteraction({ location: 'navbar', variant, intent: 'cotizacion' }).catch(() => {});
  }, [trackEvent, variant]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const close = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', close);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <Header $scrolled={scrolled}>
      <Nav aria-label="Principal">
        <Brand to="/">
          <Logo src={`${import.meta.env.BASE_URL}assets/logo-neokodex.svg`} alt="NEO-KODEX" />
          NEO-KODEX
        </Brand>
        <DesktopMenu>
          {links.map((link) => (
            <li key={link.href}>
              <MenuLink href={link.href}>{link.label}</MenuLink>
            </li>
          ))}
          <li>
            <HeaderCTA href="#contacto" onClick={handleCtaClick}>
              Cotiza gratis
            </HeaderCTA>
          </li>
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
                  <Logo src={`${import.meta.env.BASE_URL}assets/logo-neokodex.svg`} alt="NEO-KODEX" />
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
                  style={{ width: '100%' }}
                >
                  Cotiza gratis
                </HeaderCTA>
              </MobileActions>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </Header>
  );
}

Navbar.propTypes = {
  onCycleTheme: PropTypes.func,
  themeName: PropTypes.string,
  availableThemes: PropTypes.arrayOf(PropTypes.string)
};

export default Navbar;
