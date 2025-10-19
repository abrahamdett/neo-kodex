import styled, { useTheme } from 'styled-components';
import { useMemo } from 'react';
import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 4vw, 4rem);
`;

const SectionHeader = styled.div`
  max-width: 840px;
  margin: 0 auto 3.5rem;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 2.8vw + 1rem, 3.2rem);
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.25rem, 2vw, 2.2rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 220px;
    grid-template-areas:
      'a a b c'
      'a a d e'
      'f g h i'
      'j k h i';
  }
`;

const BentoCard = styled(ServiceCard).withConfig({
  shouldForwardProp: (prop) => !['area', 'gradient'].includes(prop)
})`
  min-height: 100%;
  --card-gradient: ${({ gradient }) => gradient};

  @media (min-width: 1024px) {
    grid-area: ${({ area }) => area};
  }
`;

function toRgba(hex, alpha = 1) {
  if (!hex) return `rgba(127, 90, 240, ${alpha})`;
  const value = hex.replace('#', '');
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ServicesSection() {
  const theme = useTheme();
  const layoutAreas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

  const gradients = useMemo(() => {
    const accentSoft = theme?.accentSoft ?? 'rgba(127, 90, 240, 0.2)';
    const neon = theme?.name === 'sepia' ? 'rgba(255, 202, 138, 0.25)' : 'rgba(0, 209, 255, 0.22)';
    const dusk = theme?.name === 'dark' ? 'rgba(15, 30, 60, 0.45)' : 'rgba(241, 242, 255, 0.6)';

    return services.map((_, index) => {
      const angle = 110 + index * 9;
      const accentIntensity = toRgba(theme?.accent, 0.22 + (index % 4) * 0.06);
      const neonGlow = index % 2 === 0 ? neon : accentSoft;
      return `linear-gradient(${angle}deg, ${accentIntensity}, ${neonGlow}), radial-gradient(circle at top left, ${dusk}, transparent 65%)`;
    });
  }, [theme]);

  return (
    <Section id="servicios" aria-labelledby="servicios-title">
      <SectionHeader>
        <Title id="servicios-title">Servicios que impulsan tu crecimiento</Title>
        <Description>
          Un bento grid inmersivo organiza once servicios con glassmorphism y animaciones inspiradas en las tendencias 2025.
          Cada tarjeta cobra vida al interactuar para guiarte por nuestro espectro de soluciones.
        </Description>
      </SectionHeader>
      <Grid>
        {services.map((service, index) => (
          <BentoCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            area={layoutAreas[index]}
            gradient={gradients[index]}
            custom={index}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.05, ease: 'easeOut' }}
          />
        ))}
      </Grid>
    </Section>
  );
}

export default ServicesSection;
