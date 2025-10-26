import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const STORAGE_KEY = 'neo-kodex::cta-variant';

const ExperimentContext = createContext({
  variant: 'a',
  setVariant: () => {},
  isVariant: () => false
});

function pickInitialVariant() {
  if (typeof window === 'undefined') return 'a';

  const params = new URLSearchParams(window.location.search);
  const forced = params.get('ctaVariant');
  if (forced && ['a', 'b'].includes(forced)) {
    return forced;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && ['a', 'b'].includes(stored)) {
    return stored;
  }

  return Math.random() > 0.5 ? 'a' : 'b';
}

export function ExperimentProvider({ children }) {
  const [variant, setVariantState] = useState(() => pickInitialVariant());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, variant);
  }, [variant]);

  const setVariant = useCallback((next) => {
    if (!['a', 'b'].includes(next)) return;
    setVariantState(next);
  }, []);

  const value = useMemo(
    () => ({
      variant,
      setVariant,
      isVariant: (name) => variant === name
    }),
    [variant, setVariant]
  );

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
}

ExperimentProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useExperiment() {
  return useContext(ExperimentContext);
}

export default ExperimentContext;
