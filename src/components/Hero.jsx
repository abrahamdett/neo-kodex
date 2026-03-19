import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { lazy, Suspense, useMemo, useState } from 'react';
import { FiArrowUpRight, FiPhone } from 'react-icons/fi';
import { FaLaptopCode, FaMobileAlt, FaTools, FaNetworkWired } from 'react-icons/fa';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import useCountUp from '../hooks/useCountUp.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useAccessibility } from '../contexts/AccessibilityContext.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

const HeroSection = styled.section`
  position: relative;
  min-height: 92vh;
  padding: clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4.5rem) clamp(3rem, 6vw, 5rem);
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
  background: radial-gradient(120% 120% at 15% 20%, rgba(4, 14, 8, 0.92), rgba(4, 14, 8, 0.4) 50%, transparent 80%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(3, 10, 6, 0.88) 0%, rgba(3, 10, 6, 0.6) 35%, transparent 82%);
    z-index: 1;
    pointer-events: none;
  }
`;

const Grid = styled.div`
  width: min(1200px, 100%);
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.4rem);
  position: relative;
`;

const Messaging = styled(motion.div)`
  position: relative;
  padding: clamp(2.2rem, 4vw, 2.8rem);
  border-radius: clamp(2rem, 4vw, 2.75rem);
  background: ${({ theme }) =>
    `linear-gradient(175deg, ${theme.surface} 0%, ${theme.surfaceSecondary} 55%, ${theme.surface} 100%)`};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(22px);
  display: grid;
  gap: clamp(1rem, 2vw, 1.6rem);
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -25% -30% auto -30%;
    height: clamp(220px, 32vw, 360px);
    background: radial-gradient(circle at top, rgba(46, 204, 90, 0.12), transparent 70%);
    opacity: 0.65;
    filter: blur(0.8px);
    pointer-events: none;
  }
`;

const AccentBadge = styled(motion.span)`
  align-self: flex-start;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const Title = styled(motion.h1)`
  margin: 0;
  display: grid;
  gap: clamp(0.75rem, 1.5vw, 1rem);
`;

const BrandName = styled.span`
  font-size: clamp(3.5rem, 6vw + 1rem, 5.5rem);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-variation-settings: 'wght' 760;
  background: ${({ $accent, $secondary }) => `linear-gradient(180deg, ${$accent}, ${$secondary})`};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 18px 32px rgba(26, 140, 58, 0.25));
`;

const Tagline = styled.span`
  font-size: clamp(1.25rem, 1.4vw + 1rem, 1.6rem);
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.text};
  max-width: 28ch;
  line-height: 1.4;
`;

const Subtitle = styled(motion.p)`
  margin: 0;
  color: ${({ theme }) => `${theme.textSecondary}cc`};
  font-size: clamp(0.95rem, 0.95vw + 1rem, 1.1rem);
  max-width: 36rem;
  line-height: 1.75;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const PrimaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;
  box-shadow: 0 20px 40px ${({ theme }) => theme.accentSoft};
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
  }
`;

const SecondaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const CanvasWrapper = styled.div`
  position: relative;
  width: min(520px, 100%);
  aspect-ratio: 1 / 1;
  border-radius: clamp(1.5rem, 4vw, 2.75rem);
  overflow: hidden;
  background: ${({ theme }) => theme.surfaceSecondary};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(24px);
  isolation: isolate;
`;

const CanvasOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 10% 15%, rgba(46, 204, 90, 0.1), transparent 55%);
  mix-blend-mode: screen;
`;

const FloatingBadge = styled(motion.div)`
  position: absolute;
  bottom: clamp(1.5rem, 3vw, 2.5rem);
  left: clamp(1.5rem, 3vw, 2.5rem);
  padding: 1.15rem 1.4rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-width: 240px;
`;

const FloatingBadgeTitle = styled.span`
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const FloatingBadgeHighlight = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const FloatingBadgeText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.4;
`;

const GlowBackdrop = styled.div`
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at center, rgba(26, 140, 58, 0.15), transparent 60%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

const StatsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const StatCard = styled(motion.li)`
  padding: 1rem 1.1rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StatValue = styled.span`
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.8rem;
`;

const StatIcon = styled(motion.span)`
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  font-size: 1.2rem;
`;

const StatSuffix = styled.span`
  margin-left: 0.2rem;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.textSecondary};
`;

function HeroStat({ icon: Icon, target, suffix, label, index }) {
  const [active, setActive] = useState(false);
  const value = useCountUp({ target, isActive: active, duration: 1600 });

  return (
    <StatCard
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onViewportEnter={() => setActive(true)}
    >
      <StatIcon aria-hidden="true">
        <Icon />
      </StatIcon>
      <StatValue>
        {value}
        {suffix ? <StatSuffix>{suffix}</StatSuffix> : null}
      </StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
}

function Hero() {
  const theme = useTheme();
  const accent = theme?.accent ?? '#1a8c3a';
  const prefersReducedMotion = usePrefersReducedMotion();
  const { reduceMotion } = useAccessibility();
  const shouldReduceMotion = reduceMotion || prefersReducedMotion;
  const { variant } = useExperiment();
  const { trackEvent } = useAnalytics();
  const secondary = useMemo(() => {
    if (theme?.name === 'sepia') return '#facc15';
    if (theme?.name === 'light') return '#0ea558';
    return '#4ade80';
  }, [theme]);

  const gradientSecondary = `${secondary}cc`;

  const stats = useMemo(() => ([
    { target: 150, suffix: '+', label: 'Proyectos entregados', icon: FaLaptopCode },
    { target: 98, suffix: '%', label: 'Clientes satisfechos', icon: FaTools },
    { target: 50, suffix: '+', label: 'Apps desarrolladas', icon: FaMobileAlt },
    { target: 8, suffix: ' años', label: 'De experiencia', icon: FaNetworkWired }
  ]), []);

  return (
    <HeroSection aria-labelledby="inicio">
      <GlowBackdrop aria-hidden="true" />
      <Grid>
        <Content>
          <Messaging initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <AccentBadge initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Soluciones tecnológicas a tu medida
            </AccentBadge>
            <Title
              id="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <BrandName $accent={accent} $secondary={gradientSecondary}>NEO-KODEX</BrandName>
              <Tagline>Más allá del código. Creamos el software que tu negocio necesita.</Tagline>
            </Title>
            <Subtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              Desarrollamos software y aplicaciones a la medida, brindamos soporte técnico especializado,
              instalamos redes y equipamos tu empresa con la mejor tecnología para crecer.
            </Subtitle>
            <CTAGroup>
              <PrimaryCTA
                href="#contacto"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  trackEvent({ action: 'cta_cotizar', category: 'hero', label: 'hero-cta' });
                  logCtaInteraction({ location: 'hero', variant, intent: 'cta_cotizar' }).catch(() => {});
                }}
              >
                <span>Solicita tu cotización gratis</span>
                <FiArrowUpRight aria-hidden="true" />
              </PrimaryCTA>
              <SecondaryCTA
                href="tel:+525512345678"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiPhone aria-hidden="true" />
                <span>Llámanos ahora</span>
              </SecondaryCTA>
            </CTAGroup>
          </Messaging>
          <StatsList>
            {stats.map((stat, index) => (
              <HeroStat key={stat.label} index={index} {...stat} />
            ))}
          </StatsList>
        </Content>
        <CanvasWrapper
          role="presentation"
          aria-hidden={shouldReduceMotion}
        >
          {shouldReduceMotion ? (
            <motion.div
              aria-hidden="true"
              style={{ width: '100%', height: '100%', background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 60%)` }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
            />
          ) : (
            <Suspense fallback={<motion.div style={{ padding: '2rem', color: theme?.text }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Cargando...</motion.div>}>
              <HeroScene accentColor={accent} secondaryColor={secondary} />
            </Suspense>
          )}
          <CanvasOverlay />
          <FloatingBadge
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <FloatingBadgeTitle>Tecnología confiable</FloatingBadgeTitle>
            <FloatingBadgeHighlight>Tu socio tecnológico</FloatingBadgeHighlight>
            <FloatingBadgeText>
              Software, apps, redes, soporte técnico e instalaciones para tu empresa.
            </FloatingBadgeText>
          </FloatingBadge>
        </CanvasWrapper>
      </Grid>
      <ScrollIndicator
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span>Explora nuestros servicios</span>
        <motion.div
          style={{ width: '2px', height: '36px', borderRadius: '999px', background: 'currentColor' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero;
