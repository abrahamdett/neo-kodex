import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout.jsx';
import NotFound from './pages/NotFound.jsx';
import SkipToContent from './components/SkipToContent.jsx';
import AnalyticsListener from './components/AnalyticsListener.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));

function App({ onCycleTheme, themeName, availableThemes }) {
  return (
    <>
      <SkipToContent />
      <Layout onCycleTheme={onCycleTheme} themeName={themeName} availableThemes={availableThemes}>
        <AnalyticsListener />
        <Suspense fallback={<div role="status" aria-live="polite" style={{ padding: '4rem', textAlign: 'center' }}>Cargando contenido…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

App.propTypes = {
  onCycleTheme: PropTypes.func.isRequired,
  themeName: PropTypes.oneOf(['light', 'dark', 'sepia']).isRequired,
  availableThemes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
