import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { lazy, Suspense, useMemo, useState } from 'react';
import { FiArrowUpRight, FiClock, FiDownload } from 'react-icons/fi';
import { TbAugmentedReality } from 'react-icons/tb';
import { RiSparkling2Line } from 'react-icons/ri';
import { LuGlobe2 } from 'react-icons/lu';
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
  background: radial-gradient(120% 120% at 15% 20%, rgba(4, 7, 18, 0.9), rgba(4, 7, 18, 0.35) 50%, transparent 80%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(3, 6, 20, 0.85) 0%, rgba(3, 6, 20, 0.65) 35%, transparent 82%);
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
    background: radial-gradient(circle at top, rgba(255, 255, 255, 0.18), transparent 70%);
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
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const Title = styled(motion.h1)`
  margin: 0;
  display: grid;
  gap: clamp(0.75rem, 1.5vw, 1rem);
`;

const BrandName = styled.span`
  font-size: clamp(4rem, 7vw + 1rem, 6.5rem);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-variation-settings: 'wght' 760;
  background: ${({ $accent, $secondary }) => `linear-gradient(180deg, ${$accent}, ${$secondary})`};
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 22px 38px rgba(127, 90, 240, 0.28));
`;

const Tagline = styled.span`
  font-size: clamp(1.3rem, 1.4vw + 1rem, 1.65rem);
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.text};
  max-width: 26ch;
`;

const Subtitle = styled(motion.p)`
  margin: 0;
  color: ${({ theme }) => `${theme.textSecondary}cc`};
  font-size: clamp(0.95rem, 0.95vw + 1rem, 1.15rem);
  max-width: 34rem;
  line-height: 1.75;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
`;

const PrimaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(120deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  background-size: 220% 220%;
  background-position: 0% 50%;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: center;
  white-space: normal;
  box-shadow: 0 24px 46px rgba(127, 90, 240, 0.35);
  position: relative;
  overflow: hidden;
  transition: background-position 0.6s ease;

  &::after {
    content: '';
    position: absolute;
    inset: -20%;
    background: conic-gradient(from 90deg, rgba(255, 255, 255, 0.45), transparent 55%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 0.6;
  }

  &:hover,
  &:focus-visible {
    background-position: 100% 50%;
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
  text-align: center;
  white-space: normal;
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
  background: radial-gradient(circle at 10% 15%, rgba(255, 255, 255, 0.15), transparent 55%);
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
  background: radial-gradient(circle at center, rgba(127, 90, 240, 0.2), transparent 60%);
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const StatCard = styled(motion.li)`
  padding: 1.1rem 1.25rem;
  border-radius: 1.35rem;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const StatValue = styled.span`
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: -0.01em;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

const StatIcon = styled(motion.span)`
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  font-size: 1.35rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
`;

const StatSuffix = styled.span`
  margin-left: 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.textSecondary};
`;

const QuestionPrompt = styled(motion.p)`
  margin: 1rem 0 0;
  font-weight: 600;
  letter-spacing: 0.02em;
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
      whileHover={{ y: -6 }}
      onViewportEnter={() => setActive(true)}
    >
      <StatIcon
        initial={{ rotate: 0 }}
        animate={{ rotate: active ? [0, 8, -8, 0] : 0 }}
        transition={{ duration: 2.6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        aria-hidden="true"
      >
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
  const accent = theme?.accent ?? '#7f5af0';
  const prefersReducedMotion = usePrefersReducedMotion();
  const { reduceMotion } = useAccessibility();
  const shouldReduceMotion = reduceMotion || prefersReducedMotion;
  const { variant } = useExperiment();
  const { trackEvent } = useAnalytics();
  const secondary = useMemo(() => {
    if (theme?.name === 'sepia') return '#facc15';
    if (theme?.name === 'dark') return '#38bdf8';
    return '#00d1ff';
  }, [theme]);

  const gradientSecondary = `${secondary}cc`;

  const stats = useMemo(() => ([
    { target: 220, suffix: '+', label: 'Experiencias inmersivas lanzadas', icon: TbAugmentedReality },
    { target: 98, suffix: '%', label: 'Clientes que renuevan con nosotros', icon: RiSparkling2Line },
    { target: 18, suffix: 'países', label: 'Equipos acompañados en expansión', icon: LuGlobe2 },
    { target: 45, suffix: 'días', label: 'Promedio para activar tu MVP', icon: FiClock }
  ]), []);

  return (
    <HeroSection aria-labelledby="inicio">
      <GlowBackdrop aria-hidden="true" />
      <Grid>
        <Content>
          <Messaging initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <AccentBadge initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Confianza con IA ética
            </AccentBadge>
            <Title
              id="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <BrandName $accent={accent} $secondary={gradientSecondary}>NEO-KODEX</BrandName>
              <Tagline>Inteligencia aplicada que acelera tus metas sin perder el cuidado por las personas.</Tagline>
            </Title>
            <Subtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              Creamos productos inmersivos donde estrategia, diseño inclusivo y automatización responsable trabajan para el
              crecimiento sostenible de tu organización.
            </Subtitle>
            <CTAGroup>
              <PrimaryCTA
                href="#contacto"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.035, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                whileHover={{ scale: 1.06, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const action = variant === 'b' ? 'cta_propuesta' : 'cta_agendar_diagnostico';
                  trackEvent({ action, category: 'hero', label: 'hero-cta' });
                  logCtaInteraction({ location: 'hero', variant, intent: action }).catch(() => {});
                }}
              >
                <span>
                  {variant === 'b'
                    ? 'Solicita una propuesta personalizada'
                    : 'Agenda tu sesión gratuita de diagnóstico'}
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </PrimaryCTA>
              <SecondaryCTA
                href="#recursos"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  trackEvent({ action: 'cta_descarga_guia', category: 'hero', label: 'guia-exclusiva' });
                  logCtaInteraction({ location: 'hero', variant, intent: 'cta_descarga_guia' }).catch(() => {});
                }}
              >
                <FiDownload aria-hidden="true" />
                <span>Descarga la guía exclusiva</span>
              </SecondaryCTA>
            </CTAGroup>
          </Messaging>
          <StatsList>
            {stats.map((stat, index) => (
              <HeroStat key={stat.label} index={index} {...stat} />
            ))}
          </StatsList>
          <QuestionPrompt
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Reservamos un diagnóstico sin costo en menos de 48 horas hábiles para descubrir tu próximo hito.
          </QuestionPrompt>
        </Content>
        <CanvasWrapper
          role="presentation"
          aria-hidden={shouldReduceMotion}
          aria-describedby={shouldReduceMotion ? undefined : 'hero-3d-description'}
        >
          {shouldReduceMotion ? (
            <motion.div
              aria-hidden="true"
              style={{ width: '100%', height: '100%', background: `radial-gradient(circle at 30% 20%, ${accent}33, transparent 60%)`, filter: 'blur(0px)' }}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
            />
          ) : (
            <Suspense fallback={<motion.div style={{ padding: '2rem', color: theme?.text }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Cargando visual neuronal…</motion.div>}>
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
            <FloatingBadgeTitle>Experiencias 3D interactivas</FloatingBadgeTitle>
            <FloatingBadgeHighlight>Canvas neuronal continuo</FloatingBadgeHighlight>
            <FloatingBadgeText>
              Fondo generativo que conecta cada sección y se adapta a la accesibilidad.
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
        <span>Desliza para explorar</span>
        <motion.div
          style={{ width: '2px', height: '36px', borderRadius: '999px', background: 'currentColor' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </ScrollIndicator>
      <p className="sr-only" id="hero-3d-description">
        Visualización tridimensional de una red neuronal con nodos luminosos que responde suavemente al movimiento del cursor.
      </p>
    </HeroSection>
  );
}

export default Hero;
