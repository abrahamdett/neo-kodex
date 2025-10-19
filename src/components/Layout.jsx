import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CustomCursor from './CustomCursor.jsx';
import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.6s ease, color 0.6s ease;
`;

function Layout({ children, onCycleTheme, themeName, availableThemes }) {
  return (
    <div>
      <CustomCursor />
      <Navbar onCycleTheme={onCycleTheme} themeName={themeName} availableThemes={availableThemes} />
      <Main id="contenido-principal">{children}</Main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onCycleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark', 'sepia']).isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Layout;
