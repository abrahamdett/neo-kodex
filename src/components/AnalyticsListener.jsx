import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';

function AnalyticsListener() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title
    });
  }, [location]);

  useEffect(() => {
    trackEvent({ action: 'page_visit', category: 'navegacion', label: location.pathname });
  }, [location, trackEvent]);

  return null;
}

export default AnalyticsListener;
