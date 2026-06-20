import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { products } from '../data/products.js';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  position: relative;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 600px;
  margin: 0 auto 56px;
  text-align: center;
  display: grid;
  gap: 14px;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
  transition: border-color 250ms ease, transform 250ms ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.14);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $accent }) => $accent};
  box-shadow: 0 0 12px ${({ $accent }) => $accent};
`;

const Status = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 100px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
`;

const Tagline = styled.p`
  margin: -8px 0 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9375rem;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px;
`;

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    color: ${({ $accent }) => $accent};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const Badge = styled.span`
  align-self: flex-start;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 5px 12px;
  border-radius: 100px;
  color: ${({ $accent }) => $accent};
  background: ${({ $accent }) => `${$accent}1f`};
  border: 1px solid ${({ $accent }) => `${$accent}55`};
`;

const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 6px;
`;

const StackChip = styled.span`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.6875rem;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ $accent }) => $accent};
  transition: gap 150ms ease;

  &:hover {
    gap: 10px;
  }
`;

const FootNote = styled.p`
  margin: 40px 0 0;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.muted};
`;

function ProductsSection() {
  return (
    <Section id="productos" aria-labelledby="productos-title">
      <Container>
        <Header>
          <Eyebrow>Productos propios</Eyebrow>
          <Title id="productos-title">No solo desarrollamos: construimos producto</Title>
          <Subtitle>
            Plataformas creadas de punta a punta por NEO-KODEX — arquitectura, backend,
            app móvil, infraestructura e IA. La mejor prueba de lo que podemos hacer por ti.
          </Subtitle>
        </Header>
        <Grid>
          {products.map((product, index) => (
            <Card
              key={product.id}
              $accent={product.accent}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardTop>
                <NameRow>
                  <Dot $accent={product.accent} aria-hidden="true" />
                  <ProductName>{product.name}</ProductName>
                </NameRow>
                <Status>{product.status}</Status>
              </CardTop>
              <Tagline>{product.tagline}</Tagline>
              <Description>{product.description}</Description>
              {product.badge ? <Badge $accent={product.accent}>{product.badge}</Badge> : null}
              <FeatureList>
                {product.features.map((feature) => (
                  <Feature key={feature} $accent={product.accent}>
                    <FiCheck aria-hidden="true" />
                    {feature}
                  </Feature>
                ))}
              </FeatureList>
              {product.link ? (
                <ProductLink
                  $accent={product.accent}
                  href={product.link.href}
                  target={product.link.href.startsWith('http') ? '_blank' : undefined}
                  rel={product.link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {product.link.label}
                  <FiArrowUpRight aria-hidden="true" />
                </ProductLink>
              ) : null}
              <StackRow>
                {product.stack.map((tech) => (
                  <StackChip key={tech}>{tech}</StackChip>
                ))}
              </StackRow>
            </Card>
          ))}
        </Grid>
        <FootNote>
          Construidos en Ciudad de México · 2025–2026 · desarrollo end-to-end por un solo equipo.
        </FootNote>
      </Container>
    </Section>
  );
}

export default ProductsSection;
