import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  background: ${({ theme }) => theme.colors.bg.secondary};
`;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
  display: grid;
  gap: 48px;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.7;
  margin: 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  gap: 12px;
  margin-top: 6px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;
  font-size: 0.9375rem;

  svg {
    color: ${({ theme }) => theme.colors.accent.primary};
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`;

const CodePanel = styled(motion.div)`
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: ${({ theme }) => theme.colors.bg.card};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`;

const PanelBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
  }

  span:first-child {
    background: rgba(99, 210, 140, 0.5);
  }
`;

const PanelBody = styled.pre`
  margin: 0;
  padding: 24px;
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.85rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.secondary};
  overflow-x: auto;

  .key { color: ${({ theme }) => theme.colors.accent.primary}; }
  .str { color: #b9e8cd; }
  .muted { color: ${({ theme }) => theme.colors.text.muted}; }
`;

function AboutSection() {
  return (
    <Section id="acerca" aria-labelledby="acerca-title">
      <Wrapper>
        <Content>
          <Eyebrow>Sobre nosotros</Eyebrow>
          <Title id="acerca-title">Tu socio tecnológico de confianza</Title>
          <Description>
            En NEO-KODEX creamos soluciones tecnológicas que resuelven problemas reales.
            Desde software a la medida hasta la instalación completa de tu infraestructura
            de red, somos el aliado que tu empresa necesita para crecer.
          </Description>
          <Description>
            Combinamos experiencia técnica con un compromiso genuino por entender tu negocio.
            No vendemos soluciones genéricas: analizamos tus procesos, identificamos
            oportunidades y diseñamos exactamente lo que necesitas.
          </Description>
          <FeatureList>
            <FeatureItem>
              <FaCheckCircle aria-hidden="true" />
              Software y apps diseñados específicamente para tu operación
            </FeatureItem>
            <FeatureItem>
              <FaCheckCircle aria-hidden="true" />
              Soporte técnico con tiempos de respuesta garantizados
            </FeatureItem>
            <FeatureItem>
              <FaCheckCircle aria-hidden="true" />
              Instalación profesional de redes y cableado certificado
            </FeatureItem>
            <FeatureItem>
              <FaCheckCircle aria-hidden="true" />
              Consultoría tecnológica para tomar las mejores decisiones
            </FeatureItem>
          </FeatureList>
        </Content>
        <CodePanel
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <PanelBar>
            <span /><span /><span />
          </PanelBar>
          <PanelBody>
{`const `}<span className="key">neoKodex</span>{` = {
  `}<span className="key">sede</span>{`: `}<span className="str">'Ciudad de México'</span>{`,
  `}<span className="key">experiencia</span>{`: `}<span className="str">'7+ años'</span>{`,
  `}<span className="key">enfoque</span>{`: `}<span className="str">'Software a la medida'</span>{`,
  `}<span className="key">stack</span>{`: [
    `}<span className="str">'React'</span>{`, `}<span className="str">'Flutter'</span>{`,
    `}<span className="str">'Node.js'</span>{`, `}<span className="str">'NestJS'</span>{`,
  ],
  `}<span className="key">trato</span>{`: `}<span className="str">'directo, sin intermediarios'</span>{`,
};`}
          </PanelBody>
        </CodePanel>
      </Wrapper>
    </Section>
  );
}

export default AboutSection;
