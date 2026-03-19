import styled from 'styled-components';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials.js';

const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 4.5rem);
  display: grid;
  justify-items: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: min(1120px, 100%);
  display: grid;
  gap: clamp(2.5rem, 4vw, 4rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: center;
  position: relative;
  z-index: 1;
`;

const CopyBlock = styled.div`
  display: grid;
  gap: 1.4rem;
`;

const Eyebrow = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.1rem, 3vw + 1rem, 3rem);
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 38ch;
  line-height: 1.7;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PrimaryCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 18px 40px ${({ theme }) => theme.accentSoft};
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  background: ${({ theme }) => theme.surface};
`;

const QuoteGroup = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const QuoteCard = styled(motion.blockquote)`
  margin: 0;
  padding: 1.4rem 1.6rem;
  border-radius: 1.4rem;
  background: ${({ theme }) => theme.surfaceSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;

  cite {
    display: block;
    margin-top: 0.8rem;
    font-style: normal;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const Background = styled.div`
  position: absolute;
  inset: -10% -5% -40% -5%;
  background: radial-gradient(circle at top, ${({ theme }) => theme.accentSoft}, transparent 65%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
`;

function HumanConnection() {
  const featuredQuotes = testimonials.slice(0, 2);

  return (
    <Section aria-labelledby="human-connection-title">
      <Background aria-hidden="true" />
      <Wrapper>
        <CopyBlock>
          <Eyebrow>Compromiso real</Eyebrow>
          <Title id="human-connection-title">Tu proyecto es nuestra prioridad</Title>
          <Description>
            No somos una fábrica de código. Nos sentamos contigo para entender tu negocio,
            tus procesos y tus objetivos. Después diseñamos la solución tecnológica exacta
            que necesitas, con soporte continuo y un equipo que responde.
          </Description>
          <CTAGroup>
            <PrimaryCTA
              href="#contacto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Platícanos tu proyecto
            </PrimaryCTA>
            <SecondaryCTA href="#equipo">Conoce a nuestro equipo</SecondaryCTA>
          </CTAGroup>
        </CopyBlock>
        <QuoteGroup>
          {featuredQuotes.map((item, index) => (
            <QuoteCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              &ldquo;{item.quote}&rdquo;
              <cite>
                {item.author} — {item.role}
              </cite>
            </QuoteCard>
          ))}
        </QuoteGroup>
      </Wrapper>
    </Section>
  );
}

export default HumanConnection;
