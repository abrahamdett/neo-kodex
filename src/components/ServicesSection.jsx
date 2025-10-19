import styled from 'styled-components';
import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 6rem 1.5rem;
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

const Grid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08 }
  })
};

function ServicesSection() {
  return (
    <Section id="servicios" aria-labelledby="servicios-title">
      <SectionHeader>
        <Title id="servicios-title">Servicios que impulsan tu crecimiento</Title>
        <Description>
          Exploramos tecnologías emergentes para ofrecer soluciones a medida. Cada servicio se optimiza con microinteracciones, accesibilidad y rendimiento siguiendo las tendencias de diseño web 2025.
        </Description>
      </SectionHeader>
      <Grid>
        {services.map((service, index) => (
          <motion.div key={service.id} custom={index} initial="hidden" whileInView="visible" variants={cardVariants} viewport={{ once: true, amount: 0.3 }}>
            <ServiceCard icon={service.icon} title={service.title} description={service.description} />
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
}

export default ServicesSection;
