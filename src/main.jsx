import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.js';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme.js';
import useDarkMode from './hooks/useDarkMode.js';

function Root() {
  const { theme, toggleTheme, themeName } = useDarkMode();

  return (
    <ThemeProvider theme={themeName === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle data-theme={themeName} />
      <BrowserRouter>
        <App onToggleTheme={toggleTheme} themeName={themeName} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
