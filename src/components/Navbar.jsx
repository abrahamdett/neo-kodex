import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

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
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li``;

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

function Navbar({ onToggleTheme, themeName }) {
  const links = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#acerca', label: 'Acerca de' },
    { href: '#por-que', label: 'Por qué elegirnos' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#contacto', label: 'Contacto' }
  ];

  return (
    <Header>
      <Nav aria-label="Principal">
        <Brand to="/">
          <Dot as={motion.span} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
          NEO-KODEX
        </Brand>
        <Menu>
          {links.map((link) => (
            <MenuItem key={link.href}>
              <MenuLink href={link.href}>{link.label}</MenuLink>
            </MenuItem>
          ))}
          <MenuItem>
            <ThemeToggle type="button" onClick={onToggleTheme} aria-label="Cambiar modo de color">
              {themeName === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
              <span>{themeName === 'dark' ? 'Claro' : 'Oscuro'}</span>
            </ThemeToggle>
          </MenuItem>
        </Menu>
      </Nav>
    </Header>
  );
}

Navbar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark']).isRequired
};

export default Navbar;
