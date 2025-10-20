import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { lazy, Suspense, useMemo, useState } from 'react';
import { FiArrowUpRight, FiClock, FiPlay } from 'react-icons/fi';
import { TbAugmentedReality } from 'react-icons/tb';
import { RiSparkling2Line } from 'react-icons/ri';
import { LuGlobe2 } from 'react-icons/lu';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import useCountUp from '../hooks/useCountUp.js';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

const HeroSection = styled.section`
  position: relative;
  min-height: 92vh;
  padding: clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4.5rem) clamp(3rem, 6vw, 5rem);
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
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
  gap: 1.5rem;
  position: relative;
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
  font-size: clamp(3rem, 6vw + 1rem, 5.2rem);
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-variation-settings: 'wght' 720;

  span {
    display: block;
    font-variation-settings: 'wght' 350;
    letter-spacing: 0.02em;
  }
`;

const Subtitle = styled(motion.p)`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: clamp(1.05rem, 1.2vw + 1rem, 1.25rem);
  max-width: 32rem;
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
  background: linear-gradient(120deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  background-size: 220% 220%;
  background-position: 0% 50%;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;
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
  z-index: 1;
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
  const secondary = useMemo(() => {
    if (theme?.name === 'sepia') return '#facc15';
    if (theme?.name === 'dark') return '#38bdf8';
    return '#00d1ff';
  }, [theme]);

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
        <Content id="inicio">
          <AccentBadge initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Confianza con IA ética
          </AccentBadge>
          <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            NEO-KODEX
            <span>Inteligencia de diseño que transforma tu negocio y mejora la vida de las personas</span>
          </Title>
          <Subtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Diseñamos experiencias inmersivas donde la IA, el diseño inclusivo y la estrategia de negocio se alinean con
            resultados medibles, prácticas éticas y soporte humano de principio a fin.
          </Subtitle>
          <CTAGroup>
            <PrimaryCTA
              href="#contacto"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Comenzar proyecto</span>
              <FiArrowUpRight aria-hidden="true" />
            </PrimaryCTA>
            <SecondaryCTA
              href="#acerca"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiPlay aria-hidden="true" />
              <span>Ver manifiesto</span>
            </SecondaryCTA>
          </CTAGroup>
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
            ¿Listo para transformar tu próximo lanzamiento con nosotros?
          </QuestionPrompt>
        </Content>
        <CanvasWrapper
          role="presentation"
          aria-hidden={prefersReducedMotion}
          aria-describedby={prefersReducedMotion ? undefined : 'hero-3d-description'}
        >
          {prefersReducedMotion ? (
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
