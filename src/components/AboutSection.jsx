import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) 1.5rem;
  background: ${({ theme }) => theme.surfaceSecondary};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Highlight = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.85rem;
  align-self: flex-start;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;

  svg {
    color: ${({ theme }) => theme.accent};
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`;

const ImagePanel = styled(motion.div)`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.2);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const LogoOverlay = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(16px);

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  span {
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
  }
`;

function AboutSection() {
  return (
    <Section id="acerca" aria-labelledby="acerca-title">
      <Wrapper>
        <Content>
          <Highlight>Sobre nosotros</Highlight>
          <Title id="acerca-title">Tu socio tecnológico de confianza</Title>
          <Description>
            En NEO-KODEX nos especializamos en crear soluciones tecnológicas que resuelven problemas reales.
            Desde software a la medida hasta la instalación completa de tu infraestructura de red, somos
            el aliado que tu empresa necesita para crecer con tecnología.
          </Description>
          <Description>
            Nuestro equipo combina experiencia técnica con un compromiso genuino por entender tu negocio.
            No vendemos soluciones genéricas: analizamos tus procesos, identificamos oportunidades y
            diseñamos exactamente lo que necesitas.
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
              Venta y configuración de equipo de cómputo empresarial
            </FeatureItem>
            <FeatureItem>
              <FaCheckCircle aria-hidden="true" />
              Consultoría tecnológica para tomar las mejores decisiones
            </FeatureItem>
          </FeatureList>
        </Content>
        <ImagePanel
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
            alt="Equipo de desarrollo trabajando en soluciones tecnológicas"
            loading="lazy"
          />
          <LogoOverlay>
            <img src="/assets/logo-neokodex.svg" alt="" />
            <span>NEO-KODEX</span>
          </LogoOverlay>
        </ImagePanel>
      </Wrapper>
    </Section>
  );
}

export default AboutSection;
