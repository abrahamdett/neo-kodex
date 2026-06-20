import { Fragment } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 140px 24px 80px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -5%, rgba(99, 210, 140, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 210, 140, 0.08);
  border: 1px solid rgba(99, 210, 140, 0.2);
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 32px;
  letter-spacing: 0.01em;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.accent.primary};
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 6px rgba(99, 210, 140, 0.8);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }
`;

const HeroHeadline = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  max-width: 820px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const GreenSpan = styled.span`
  color: ${({ theme }) => theme.colors.accent.primary};
  display: block;
`;

const HeroSub = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 560px;
  line-height: 1.65;
  margin-bottom: 40px;
`;

const HeroCTAs = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 14px 28px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3), 0 4px 16px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9375rem;
  padding: 14px 28px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  cursor: pointer;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SocialProofStrip = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatLabel = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: 3px;
`;

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: ${({ theme }) => theme.colors.border.default};
`;

const stats = [
  { number: '7+ años', label: 'Construyendo software' },
  { number: 'A la medida', label: 'Hecho para tu negocio' },
  { number: 'Trato directo', label: 'Hablas con el fundador' }
];

function Hero() {
  const { variant } = useExperiment();
  const { trackEvent } = useAnalytics();

  const handlePrimary = () => {
    trackEvent({ action: 'cta_cotizar', category: 'hero', label: 'hero-cta' });
    logCtaInteraction({ location: 'hero', variant, intent: 'cta_cotizar' }).catch(() => {});
  };

  return (
    <HeroSection id="inicio" aria-labelledby="hero-title">
      <Inner
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Badge
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BadgeDot aria-hidden="true" />
          Empresa de tecnología · CDMX
        </Badge>

        <HeroHeadline
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          Software que hace<br />
          <GreenSpan>crecer tu negocio</GreenSpan>
        </HeroHeadline>

        <HeroSub
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Desarrollamos software a la medida, apps móviles, infraestructura de red
          y soporte técnico para empresas en México.
        </HeroSub>

        <HeroCTAs
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <PrimaryButton href="#contacto" onClick={handlePrimary}>
            Solicita tu cotización gratis
            <FiArrowRight aria-hidden="true" />
          </PrimaryButton>
          <SecondaryButton href="#portafolio">Ver portafolio</SecondaryButton>
        </HeroCTAs>

        <SocialProofStrip
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && <Divider aria-hidden="true" />}
              <Stat>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </Stat>
            </Fragment>
          ))}
        </SocialProofStrip>
      </Inner>
    </HeroSection>
  );
}

export default Hero;
