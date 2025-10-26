import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Wrapper = styled.section`
  padding: clamp(3.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem);
`;

const Card = styled.div`
  max-width: 960px;
  margin: 0 auto;
  border-radius: 24px;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(18px);
  display: grid;
  gap: 1rem;
  padding: clamp(2rem, 4vw, 2.75rem);
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.6rem, 2vw + 1rem, 2.2rem);
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const ButtonRow = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 20px 36px rgba(127, 90, 240, 0.28);

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accentSoft};
    outline-offset: 4px;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-weight: 600;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

function InlineCTA({ id, title, description, primary, secondary }) {
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const handleClick = (action, intent) => {
    trackEvent({ action, category: 'cta_intermedia', label: id });
    logCtaInteraction({ location: id, variant, intent }).catch(() => {});
  };

  return (
    <Wrapper id={id}>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonRow>
          <PrimaryButton
            href={primary.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(primary.analyticsAction, primary.intent)}
          >
            {primary.label}
          </PrimaryButton>
          {secondary ? (
            <SecondaryButton
              href={secondary.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(secondary.analyticsAction, secondary.intent)}
            >
              {secondary.label}
            </SecondaryButton>
          ) : null}
        </ButtonRow>
      </Card>
    </Wrapper>
  );
}

InlineCTA.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  primary: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    analyticsAction: PropTypes.string.isRequired,
    intent: PropTypes.string.isRequired
  }).isRequired,
  secondary: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    analyticsAction: PropTypes.string.isRequired,
    intent: PropTypes.string.isRequired
  })
};

InlineCTA.defaultProps = {
  id: undefined,
  secondary: null
};

export default InlineCTA;
