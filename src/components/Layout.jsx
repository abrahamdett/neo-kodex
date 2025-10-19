import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.6s ease, color 0.6s ease;
`;

function Layout({ children, onToggleTheme, themeName }) {
  return (
    <div>
      <Navbar onToggleTheme={onToggleTheme} themeName={themeName} />
      <Main id="contenido-principal">{children}</Main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark']).isRequired
};

export default Layout;
