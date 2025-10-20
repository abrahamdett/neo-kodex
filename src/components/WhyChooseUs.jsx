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
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.22), transparent 65%);
    opacity: 0.75;
    z-index: -1;
  }
`;

const IconWrapper = styled(motion.div)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -25%;
    background: conic-gradient(from 90deg, ${({ theme }) => theme.accent}, transparent 65%);
    opacity: 0.55;
    mix-blend-mode: screen;
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
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

const SparkLine = styled(motion.span)`
  position: absolute;
  top: -40%;
  right: -10%;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ theme }) => theme.accentSoft}, transparent 70%);
  opacity: 0.6;
  filter: blur(50px);
  pointer-events: none;
`;

const items = [
  {
    icon: FaShieldAlt,
    label: 'Proyectos completados',
    target: 180,
    suffix: '+',
    description: 'Experiencia comprobada acompañando a compañías que buscan transformar procesos críticos.'
  },
  {
    icon: FaUsersCog,
    label: 'Especialistas certificados',
    target: 40,
    suffix: '+',
    description: 'Equipo multidisciplinario listo para integrarse con tu cultura y acelerar entregas.'
  },
  {
    icon: FaRocket,
    label: 'Tiempo promedio de lanzamiento (días)',
    target: 45,
    suffix: '',
    description: 'Procesos ágiles y automatizados para que verifiques valor rápidamente.'
  },
  {
    icon: FaHeadset,
    label: 'Satisfacción del cliente (%)',
    target: 98,
    suffix: '%',
    description: 'Soporte continuo, comunicación transparente y evolución constante de cada producto.'
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
      <SparkLine
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.2 + index * 0.08 }}
        aria-hidden="true"
      />
      <IconWrapper
        animate={{ rotate: active ? [0, 6, -6, 0] : 0 }}
        transition={{ duration: 2.8, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        aria-hidden="true"
      >
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
          Datos animados, íconos cinéticos y visualizaciones responden al scroll para mostrar cómo combinamos innovación,
          acompañamiento estratégico y resultados medibles.
        </p>
      </Header>
      <Grid>
        {items.map((item, index) => (
          <MetricCard key={item.label} index={index} {...item} />
        ))}
      </Grid>
      <SectionFooter>
        ¿Listo para medir resultados con un equipo que se alinea contigo desde el día uno?
      </SectionFooter>
    </Section>
  );
}

export default WhyChooseUs;
