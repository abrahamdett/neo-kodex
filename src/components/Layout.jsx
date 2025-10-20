import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CustomCursor from './CustomCursor.jsx';
import styled from 'styled-components';
import ChatbotWidget from './ChatbotWidget.jsx';
import NeuralBackdrop from './NeuralBackdrop.jsx';

const Shell = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.6s ease, color 0.6s ease;
  overflow-x: hidden;
`;

const GradientLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: ${({ theme }) => theme.backgroundGradient};
  opacity: 0.65;
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
      <NeuralBackdrop />
      <CustomCursor />
      <Content>
        <Navbar onCycleTheme={onCycleTheme} themeName={themeName} availableThemes={availableThemes} />
        <Main id="contenido-principal">{children}</Main>
        <Footer />
      </Content>
      <ChatbotWidget />
    </Shell>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onCycleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark', 'sepia']).isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Layout;
