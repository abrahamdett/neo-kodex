import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import styled from 'styled-components';

const Shell = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow-x: hidden;
`;

const GradientLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: ${({ theme }) => theme.backgroundGradient};
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
`;

function Layout({ children, onCycleTheme, themeName, availableThemes }) {
  return (
    <Shell>
      <GradientLayer aria-hidden />
      <Content>
        <Navbar onCycleTheme={onCycleTheme} themeName={themeName} availableThemes={availableThemes} />
        <Main id="contenido-principal">{children}</Main>
        <Footer />
      </Content>
    </Shell>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onCycleTheme: PropTypes.func,
  themeName: PropTypes.string,
  availableThemes: PropTypes.arrayOf(PropTypes.string)
};

Layout.defaultProps = {
  onCycleTheme: undefined,
  themeName: 'dark',
  availableThemes: ['dark']
};

export default Layout;
