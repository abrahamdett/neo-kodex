import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserCheck, FaPuzzlePiece, FaLayerGroup, FaBolt } from 'react-icons/fa';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 560px;
  margin: 0 auto 48px;
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
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 250ms ease;

  &:hover {
    border-color: rgba(99, 210, 140, 0.2);
    background: ${({ theme }) => theme.colors.bg.cardHover};
    transform: translateY(-2px);
  }
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(99, 210, 140, 0.1);
  border: 1px solid rgba(99, 210, 140, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 1.15rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SectionFooter = styled.div`
  margin-top: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const items = [
  {
    icon: FaUserCheck,
    title: 'Trato directo',
    description: 'Hablas siempre con quien diseña y construye tu software. Sin intermediarios ni cuentas perdidas en una cadena de mandos.'
  },
  {
    icon: FaPuzzlePiece,
    title: 'Software a la medida',
    description: 'Nada de plantillas genéricas. Analizamos tu operación y construimos exactamente lo que tu negocio necesita.'
  },
  {
    icon: FaLayerGroup,
    title: 'Stack moderno',
    description: 'Desarrollo web y móvil, bases de datos, nube e infraestructura de red con prácticas y tecnologías actuales.'
  },
  {
    icon: FaBolt,
    title: 'Respuesta ágil',
    description: 'Comunicación clara, entregas incrementales y soporte que responde. Sabes en todo momento en qué va tu proyecto.'
  }
];

function WhyChooseUs() {
  return (
    <Section id="por-que" aria-labelledby="por-que-title">
      <Container>
        <Header>
          <Eyebrow>Por qué elegirnos</Eyebrow>
          <Title id="por-que-title">Cómo trabajamos contigo</Title>
          <Subtitle>
            No solo entregamos tecnología: construimos una relación de confianza alrededor
            de tu proyecto, con foco en resultados reales.
          </Subtitle>
        </Header>
        <Grid>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <IconBox aria-hidden="true">
                  <Icon />
                </IconBox>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            );
          })}
        </Grid>
        <SectionFooter>
          ¿Listo para trabajar con alguien que se compromete con tus resultados?
        </SectionFooter>
      </Container>
    </Section>
  );
}

export default WhyChooseUs;
