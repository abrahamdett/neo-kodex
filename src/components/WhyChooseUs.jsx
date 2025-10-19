import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUsersCog, FaRocket, FaHeadset } from 'react-icons/fa';

const Section = styled.section`
  padding: 6rem 1.5rem;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.surface};
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.accentSoft};
`;

const Number = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
`;

const items = [
  {
    icon: FaShieldAlt,
    label: 'Proyectos completados',
    target: 180,
    suffix: '+',
    description: 'Experiencia comprobada en soluciones a medida para sectores fintech, salud y retail.'
  },
  {
    icon: FaUsersCog,
    label: 'Especialistas certificados',
    target: 40,
    suffix: '+',
    description: 'Equipo multidisciplinario con certificaciones en AWS, Scrum y diseño de experiencias.'
  },
  {
    icon: FaRocket,
    label: 'Tiempo promedio de lanzamiento (días)',
    target: 45,
    suffix: '',
    description: 'Metodologías ágiles y automatización DevOps que aceleran el time-to-market.'
  },
  {
    icon: FaHeadset,
    label: 'Satisfacción del cliente (%)',
    target: 98,
    suffix: '%',
    description: 'Soporte continuo y proximidad con cada aliado estratégico.'
  }
];

function useAnimatedCounter(target, active) {
  const [value, setValue] = useState(0);
  const frame = useRef();
  const start = useRef();

  useEffect(() => {
    if (!active) return;

    const duration = 1200;

    const step = (timestamp) => {
      if (!start.current) start.current = timestamp;
      const progress = Math.min((timestamp - start.current) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame.current = window.requestAnimationFrame(step);
      }
    };

    frame.current = window.requestAnimationFrame(step);

    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      start.current = undefined;
    };
  }, [target, active]);

  return value;
}

function MetricCard({ icon: Icon, label, target, description, suffix, index }) {
  const [active, setActive] = useState(false);
  const count = useAnimatedCounter(target, active);

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => setActive(true)}
    >
      <IconWrapper aria-hidden="true">
        <Icon />
      </IconWrapper>
      <Number aria-live="polite">{count}{suffix}</Number>
      <h3>{label}</h3>
      <Description>{description}</Description>
    </Card>
  );
}

function WhyChooseUs() {
  return (
    <Section id="por-que" aria-labelledby="por-que-title">
      <h2 id="por-que-title" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 2.5vw + 1rem, 3rem)', marginBottom: '3rem' }}>
        ¿Por qué elegir a NEO-KODEX?
      </h2>
      <Wrapper>
        {items.map((item, index) => (
          <MetricCard key={item.label} index={index} {...item} />
        ))}
      </Wrapper>
    </Section>
  );
}

export default WhyChooseUs;
