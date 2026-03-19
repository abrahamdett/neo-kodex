import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUsersCog, FaRocket, FaHeadset } from 'react-icons/fa';
import useCountUp from '../hooks/useCountUp.js';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4.5rem);
`;

const Header = styled.div`
  max-width: 780px;
  margin: 0 auto 3rem;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 3vw + 1rem, 3.1rem);
  margin: 0;
`;

const Grid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: clamp(1.5rem, 2vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const SectionFooter = styled.div`
  margin-top: clamp(2.5rem, 4vw, 3.5rem);
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

const Card = styled(motion.article)`
  position: relative;
  padding: 2.25rem 2rem;
  border-radius: clamp(1.4rem, 2vw, 1.9rem);
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(22px);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  display: flex;
  flex-direction: column;
  gap: 1.05rem;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.15), transparent 65%);
    opacity: 0.75;
    z-index: -1;
  }
`;

const IconWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  background: ${({ theme }) => theme.accentSoft};
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
`;

const Number = styled.span`
  font-size: clamp(2.4rem, 2vw + 1.5rem, 3rem);
  font-weight: 700;
`;

const Label = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const items = [
  {
    icon: FaShieldAlt,
    label: 'Proyectos entregados',
    target: 150,
    suffix: '+',
    description: 'Software, apps, instalaciones de red y soporte técnico para empresas de todos los tamaños.'
  },
  {
    icon: FaUsersCog,
    label: 'Clientes activos',
    target: 80,
    suffix: '+',
    description: 'Empresas que confían en nosotros para su tecnología y soporte técnico continuo.'
  },
  {
    icon: FaRocket,
    label: 'Tiempo promedio de entrega',
    target: 30,
    suffix: ' días',
    description: 'Metodología ágil para que veas resultados rápidos sin sacrificar calidad.'
  },
  {
    icon: FaHeadset,
    label: 'Satisfacción del cliente',
    target: 98,
    suffix: '%',
    description: 'Atención personalizada, comunicación clara y soporte que no te deja esperando.'
  }
];

function MetricCard({ icon: Icon, label, target, description, suffix, index }) {
  const [active, setActive] = useState(false);
  const count = useCountUp({ target, isActive: active, duration: 1500 });

  return (
    <Card
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => setActive(true)}
    >
      <IconWrapper aria-hidden="true">
        <Icon />
      </IconWrapper>
      <Number aria-live="polite">{count}{suffix}</Number>
      <Label>{label}</Label>
      <Description>{description}</Description>
    </Card>
  );
}

function WhyChooseUs() {
  return (
    <Section id="por-que" aria-labelledby="por-que-title">
      <Header>
        <Title id="por-que-title">¿Por qué elegir a NEO-KODEX?</Title>
        <p>
          Porque no solo entregamos tecnología, construimos relaciones de confianza.
          Conocemos tu negocio, resolvemos tus problemas y te acompañamos en cada paso.
        </p>
      </Header>
      <Grid>
        {items.map((item, index) => (
          <MetricCard key={item.label} index={index} {...item} />
        ))}
      </Grid>
      <SectionFooter>
        ¿Listo para trabajar con un equipo que se compromete con tus resultados?
      </SectionFooter>
    </Section>
  );
}

export default WhyChooseUs;
