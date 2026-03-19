import styled from 'styled-components';
import { motion } from 'framer-motion';
import { certifications } from '../data/certifications.js';

const Section = styled.section`
  padding: clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
`;

const Header = styled.div`
  display: grid;
  gap: 0.75rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Card = styled(motion.article)`
  padding: 1.5rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(16px);
  display: grid;
  gap: 0.75rem;
  text-align: left;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: ${({ theme }) => (theme.name === 'dark' ? 'invert(1)' : 'none')};
`;

const Footer = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

function TrustSection() {
  return (
    <Section id="alianzas" aria-labelledby="alianzas-title">
      <Wrapper>
        <Header>
          <h2 id="alianzas-title">Tecnología de clase mundial para tu empresa</h2>
          <p style={{ margin: 0 }}>
            Trabajamos con las mejores plataformas y tecnologías del mercado para garantizar
            soluciones confiables, seguras y escalables.
          </p>
        </Header>
        <Grid>
          {certifications.map((item, index) => (
            <Card
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Logo src={item.logo} alt={item.title} loading="lazy" />
              <strong>{item.title}</strong>
              <p style={{ margin: 0 }}>{item.description}</p>
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
