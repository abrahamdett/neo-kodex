import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Wrapper = styled.section`
  padding: 56px 24px;
`;

const Banner = styled.div`
  max-width: 700px;
  margin: 0 auto;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(99, 210, 140, 0.08) 0%, rgba(99, 210, 140, 0.03) 100%);
  border: 1px solid rgba(99, 210, 140, 0.15);
  padding: 48px 40px;
  text-align: center;
  display: grid;
  gap: 16px;

  @media (max-width: 480px) {
    padding: 36px 24px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.5rem, 2vw + 1rem, 2rem);
`;

const Description = styled.p`
  margin: 0 auto;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 8px;
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: box-shadow 200ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
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
      <Banner>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonRow>
          <PrimaryButton
            href={primary.href}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(primary.analyticsAction, primary.intent)}
          >
            {primary.label}
          </PrimaryButton>
          {secondary ? (
            <SecondaryButton
              href={secondary.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(secondary.analyticsAction, secondary.intent)}
            >
              {secondary.label}
            </SecondaryButton>
          ) : null}
        </ButtonRow>
      </Banner>
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
