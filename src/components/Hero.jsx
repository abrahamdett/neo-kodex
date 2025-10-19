import styled from 'styled-components';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  position: relative;
  min-height: 85vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 6rem 1.5rem 4rem;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 760px;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 4vw + 1.2rem, 4.5rem);
  margin-bottom: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.9rem 1.75rem;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 18px 36px ${({ theme }) => theme.accentSoft};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover,
  &:focus-visible {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 22px 44px rgba(127, 90, 240, 0.35);
  }
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: clamp(220px, 30vw, 360px);
  height: clamp(220px, 30vw, 360px);
  top: 8%;
  right: 10%;
  background: radial-gradient(circle at 30% 30%, rgba(127, 90, 240, 0.45), transparent 65%);
  filter: blur(4px);
  pointer-events: none;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 10%, rgba(127, 90, 240, 0.35), transparent 65%),
    radial-gradient(circle at 15% 80%, rgba(0, 209, 255, 0.35), transparent 55%);
  z-index: 1;
`;

function Hero() {
  return (
    <HeroSection aria-labelledby="inicio">
      <BackgroundGradient />
      <FloatingOrb animate={{ y: [0, -20, 0], rotate: [0, 4, -4, 0] }} transition={{ repeat: Infinity, duration: 12 }} />
      <Parallax bgImage="/assets/hero-orb.svg" strength={120} blur={{ min: -5, max: 5 }}>
        <HeroContent id="inicio">
          <Title>NEO-KODEX</Title>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <strong>Más allá del código</strong>. Diseñamos experiencias digitales inmersivas con tecnología de punta, metodologías ágiles y un equipo experto que impulsa tu visión.
          </motion.p>
          <Subtitle>
            Creamos soluciones escalables y accesibles, alineadas con las tendencias de diseño web 2025 para que tu marca destaque con impacto visual, rendimiento y usabilidad excepcionales.
          </Subtitle>
          <CTAButton href="#contacto">Solicitar cotización</CTAButton>
        </HeroContent>
      </Parallax>
    </HeroSection>
  );
}

export default Hero;
