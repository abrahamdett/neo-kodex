import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

const AnalyticsContext = createContext({
  trackEvent: () => {}
});

function loadAnalytics(measurementId) {
  if (typeof window === 'undefined' || !measurementId) return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function AnalyticsProvider({ children }) {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    loadAnalytics(measurementId);
  }, [measurementId]);

  const trackEvent = useCallback(
    ({ action, category, label, value }) => {
      if (typeof window === 'undefined' || !window.gtag) return;
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      trackEvent
    }),
    [trackEvent]
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

AnalyticsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

export default AnalyticsContext;
