import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.js';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './styles/theme.js';
import useTheme from './hooks/useTheme.js';
import { AccessibilityProvider } from './contexts/AccessibilityContext.jsx';
import { ExperimentProvider } from './contexts/ExperimentContext.jsx';
import { AnalyticsProvider } from './providers/AnalyticsProvider.jsx';

function Root() {
  const { themeName, cycleTheme, themes } = useTheme();
  const theme = getTheme(themeName);

  return (
    <ExperimentProvider>
      <AccessibilityProvider>
        <AnalyticsProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle data-theme={themeName} />
            <BrowserRouter>
              <App onCycleTheme={cycleTheme} themeName={themeName} availableThemes={themes} />
            </BrowserRouter>
          </ThemeProvider>
        </AnalyticsProvider>
      </AccessibilityProvider>
    </ExperimentProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
