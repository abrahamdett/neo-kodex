import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.surfaceSecondary};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
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
`;

const Title = styled.h2`
  font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
`;

const CTAQuestion = styled.p`
  font-weight: 600;
`;

const VideoWrapper = styled(motion.div)`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.2);
  transform: perspective(1200px) rotateY(-6deg);
  transition: transform 0.6s ease;
  &:hover {
    transform: perspective(1200px) rotateY(0deg);
  }
`;

function AboutSection() {
  return (
    <Section id="acerca" aria-labelledby="acerca-title">
      <Wrapper>
        <Content>
          <Highlight>Innovación y humanidad</Highlight>
          <Title id="acerca-title">Tecnología que potencia historias reales</Title>
          <Description>
            Acompañamos a las organizaciones desde la estrategia hasta la evolución continua, alineando descubrimientos de
            usuarios, prototipado inmersivo y despliegues sostenibles. Cada entrega se diseña para generar confianza y valor
            tangible.
          </Description>
          <Description>
            Documentamos decisiones, facilitamos ceremonias colaborativas y medimos impactos para que tu equipo conserve el
            aprendizaje y pueda escalarlo. El video resume cómo convertimos la innovación en resultados humanos.
          </Description>
          <CTAQuestion>¿Nos dejas acompañarte en tu próximo reto?</CTAQuestion>
        </Content>
        <VideoWrapper
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <ReactPlayer
            url="https://cdn.coverr.co/videos/coverr-working-in-the-future-technology-4709/1080p.mp4"
            playing
            muted
            loop
            width="100%"
            height="100%"
            config={{ file: { attributes: { title: 'Video resumen de NEO-KODEX' } } }}
          />
        </VideoWrapper>
      </Wrapper>
    </Section>
  );
}

export default AboutSection;
