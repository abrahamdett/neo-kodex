import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout.jsx';
import NotFound from './pages/NotFound.jsx';
import SkipToContent from './components/SkipToContent.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));

function App({ onToggleTheme, themeName }) {
  return (
    <>
      <SkipToContent />
      <Layout onToggleTheme={onToggleTheme} themeName={themeName}>
        <Suspense fallback={<div role="status" aria-live="polite" style={{ padding: '4rem', textAlign: 'center' }}>Cargando contenido…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

App.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark']).isRequired
};

export default App;
