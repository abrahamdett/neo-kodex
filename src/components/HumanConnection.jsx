import styled from 'styled-components';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team.js';
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
  max-width: 34ch;
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
  background: linear-gradient(120deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 18px 40px rgba(127, 90, 240, 0.25);
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

const PortraitCollage = styled.div`
  position: relative;
  display: grid;
  gap: 1.1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const PortraitCard = styled(motion.figure)`
  position: relative;
  margin: 0;
  border-radius: 1.4rem;
  overflow: hidden;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  isolation: isolate;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    position: absolute;
    inset: auto 0 0 0;
    padding: 0.85rem 1.1rem;
    font-size: 0.85rem;
    background: linear-gradient(0deg, rgba(8, 11, 26, 0.72), transparent 85%);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
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
  background: radial-gradient(circle at top, rgba(8, 15, 35, 0.65), transparent 65%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
`;

function HumanConnection() {
  const portraits = teamMembers.slice(0, 3);
  const featuredQuotes = testimonials.slice(0, 2);

  return (
    <Section aria-labelledby="human-connection-title">
      <Background aria-hidden="true" />
      <Wrapper>
        <CopyBlock>
          <Eyebrow>Personas en el centro</Eyebrow>
          <Title id="human-connection-title">Acompañamos cada proyecto con rostros y responsabilidad</Title>
          <Description>
            Antes de escribir una línea de código nos sentamos contigo para entender tus procesos. Nuestro equipo combina
            estrategia, datos y empatía para construir soluciones que la gente quiere usar.
          </Description>
          <CTAGroup>
            <PrimaryCTA
              href="#contacto"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              Agenda tu sesión de bienvenida
            </PrimaryCTA>
            <SecondaryCTA href="#equipo">Conoce a quienes te acompañarán</SecondaryCTA>
          </CTAGroup>
        </CopyBlock>
        <PortraitCollage>
          {portraits.map((member, index) => (
            <PortraitCard
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <img src={member.avatar} alt={`Retrato de ${member.name}`} loading="lazy" />
              <figcaption>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </figcaption>
            </PortraitCard>
          ))}
        </PortraitCollage>
        <QuoteGroup>
          {featuredQuotes.map((item, index) => (
            <QuoteCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              “{item.quote}”
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
