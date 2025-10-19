import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import HeroScene from './HeroScene.jsx';

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
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;
  box-shadow: 0 24px 46px rgba(127, 90, 240, 0.35);
  position: relative;
  overflow: hidden;
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
  gap: 0.25rem;
`;

const StatValue = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

function Hero() {
  const theme = useTheme();
  const accent = theme?.accent ?? '#7f5af0';
  const secondary = useMemo(() => {
    if (theme?.name === 'sepia') return '#facc15';
    if (theme?.name === 'dark') return '#38bdf8';
    return '#00d1ff';
  }, [theme]);

  const stats = useMemo(() => ([
    { value: '180+', label: 'Implementaciones inmersivas' },
    { value: '98%', label: 'Clientes fidelizados' },
    { value: '45 días', label: 'Promedio de lanzamiento' }
  ]), []);

  return (
    <HeroSection aria-labelledby="inicio">
      <GlowBackdrop aria-hidden="true" />
      <Grid>
        <Content id="inicio">
          <AccentBadge initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Más allá del código
          </AccentBadge>
          <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            NEO-KODEX
          </Title>
          <Subtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Diseñamos experiencias digitales inmersivas con tecnología 3D, micro-interacciones y accesibilidad avanzada para
            que tu marca lidere el futuro del diseño 2025.
          </Subtitle>
          <CTAGroup>
            <PrimaryCTA
              href="#contacto"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Comenzar proyecto
            </PrimaryCTA>
            <SecondaryCTA
              href="#acerca"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver manifiesto
            </SecondaryCTA>
          </CTAGroup>
          <StatsList>
            {stats.map((stat, index) => (
              <StatCard key={stat.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, delay: index * 0.08 }}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsList>
        </Content>
        <CanvasWrapper>
          <HeroScene accentColor={accent} secondaryColor={secondary} />
          <CanvasOverlay />
          <FloatingBadge initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <FloatingBadgeTitle>Experiencias 3D interactivas</FloatingBadgeTitle>
            <FloatingBadgeHighlight>Hero cinético + cursor vivo</FloatingBadgeHighlight>
            <FloatingBadgeText>Scroll y movimiento responden en tiempo real.</FloatingBadgeText>
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
    </HeroSection>
  );
}

export default Hero;
