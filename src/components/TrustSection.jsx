import styled from 'styled-components';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications.js';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
  display: grid;
  gap: 48px;
`;

const Header = styled.div`
  display: grid;
  gap: 14px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
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

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Card = styled(motion.article)`
  padding: 24px;
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: grid;
  gap: 12px;
  text-align: left;
  transition: all 250ms ease;

  &:hover {
    border-color: rgba(99, 210, 140, 0.2);
    background: ${({ theme }) => theme.colors.bg.cardHover};
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
    line-height: 1.6;
  }
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: invert(1) brightness(1.4);
  opacity: 0.85;
`;

const Footer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

function TrustSection() {
  return (
    <Section id="alianzas" aria-labelledby="alianzas-title">
      <Wrapper>
        <Header>
          <Eyebrow>Tecnología</Eyebrow>
          <Title id="alianzas-title">Plataformas de clase mundial</Title>
          <Subtitle>
            Trabajamos con las mejores tecnologías del mercado para garantizar
            soluciones confiables, seguras y escalables.
          </Subtitle>
        </Header>
        <Grid>
          {certifications.map((item, index) => (
            <Card
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Logo src={item.logo} alt={item.title} loading="lazy" />
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </Card>
          ))}
        </Grid>
        <Footer>
          Equipos certificados y tecnología de primer nivel al servicio de tu negocio.
        </Footer>
      </Wrapper>
    </Section>
  );
}

export default TrustSection;
