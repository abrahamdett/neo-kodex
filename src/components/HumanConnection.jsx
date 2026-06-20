import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
`;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
  display: grid;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CopyBlock = styled.div`
  display: grid;
  gap: 18px;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 44ch;
  line-height: 1.7;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 6px;
`;

const PrimaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: box-shadow 200ms ease;

  &:hover,
  &:focus-visible {
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9375rem;
  background: transparent;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const Steps = styled.div`
  display: grid;
  gap: 14px;
`;

const StepCard = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: start;
  padding: 22px 24px;
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const StepNumber = styled.span`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent.primary};
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(99, 210, 140, 0.1);
  border: 1px solid rgba(99, 210, 140, 0.2);
  flex-shrink: 0;
`;

const StepBody = styled.div`
  display: grid;
  gap: 4px;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

const steps = [
  {
    title: 'Entendemos tu negocio',
    description: 'Nos sentamos contigo para mapear tus procesos, objetivos y restricciones reales antes de proponer nada.'
  },
  {
    title: 'Diseñamos la solución exacta',
    description: 'Propuesta clara con alcance, tiempos y costos sobre la mesa antes de escribir la primera línea de código.'
  },
  {
    title: 'Construimos y damos soporte',
    description: 'Entregas incrementales para que veas avances, y acompañamiento continuo después del lanzamiento.'
  }
];

function HumanConnection() {
  return (
    <Section aria-labelledby="human-connection-title">
      <Wrapper>
        <CopyBlock>
          <Eyebrow>Compromiso real</Eyebrow>
          <Title id="human-connection-title">Tu proyecto es nuestra prioridad</Title>
          <Description>
            No somos una fábrica de código. Nos sentamos contigo para entender tu negocio,
            tus procesos y tus objetivos. Después diseñamos la solución tecnológica exacta
            que necesitas, con soporte continuo y comunicación directa.
          </Description>
          <CTAGroup>
            <PrimaryCTA
              href="#contacto"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Platícanos tu proyecto
            </PrimaryCTA>
            <SecondaryCTA href="#portafolio">Ver proyectos</SecondaryCTA>
          </CTAGroup>
        </CopyBlock>
        <Steps>
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StepNumber aria-hidden="true">{String(index + 1).padStart(2, '0')}</StepNumber>
              <StepBody>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepBody>
            </StepCard>
          ))}
        </Steps>
      </Wrapper>
    </Section>
  );
}

export default HumanConnection;
