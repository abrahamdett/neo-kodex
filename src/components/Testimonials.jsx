import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Section = styled.section`
  position: relative;
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4.5rem);
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 20%, ${({ theme }) => theme.accentSoft}, transparent 60%),
    radial-gradient(circle at 85% 80%, rgba(0, 209, 255, 0.16), transparent 70%);
  opacity: 0.6;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 3vw, 3.5rem);
`;

const Header = styled.div`
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 3vw + 1rem, 3.1rem);
  margin: 0;
`;

const SectionFooter = styled.div`
  text-align: center;
  margin-top: clamp(2rem, 3vw, 3rem);
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

const Carousel = styled.div`
  position: relative;
  min-height: 280px;
`;

const TestimonialCard = styled(motion.article)`
  background: ${({ theme }) => theme.glass.background};
  border-radius: clamp(1.4rem, 2vw, 1.9rem);
  border: 1px solid ${({ theme }) => theme.glass.border};
  padding: clamp(2rem, 3vw, 3rem);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(22px);
  display: grid;
  gap: 1.4rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 70%);
    z-index: -1;
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: clamp(1.05rem, 1.3vw + 1rem, 1.2rem);
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
`;

const Author = styled.cite`
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
`;

const ControlButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.glass.border};
  background: ${({ theme }) => theme.glass.background};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  backdrop-filter: blur(18px);
`;

const testimonials = [
  {
    quote:
      'La capacidad de NEO-KODEX para traducir objetivos de negocio en experiencias digitales inmersivas nos permitió triplicar la retención de usuarios en tres meses.',
    author: 'Andrea Gómez',
    role: 'CMO, Finova Bank'
  },
  {
    quote:
      'Su enfoque integral de DevOps y desarrollo full stack redujo nuestros tiempos de despliegue de semanas a horas, manteniendo altos estándares de calidad.',
    author: 'Luis Martínez',
    role: 'CTO, HealthCore'
  },
  {
    quote:
      'El rediseño con microinteracciones accesibles mejoró nuestras conversiones un 35%. El equipo entiende cómo equilibrar estética, rendimiento y accesibilidad.',
    author: 'Valentina Rivas',
    role: 'Product Lead, RetailX'
  }
];

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 220 : -220, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction < 0 ? 220 : -220, opacity: 0, scale: 0.97 })
};

function Testimonials() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const testimonial = testimonials[index];

  const goTo = (step) => {
    const newIndex = (index + step + testimonials.length) % testimonials.length;
    setIndex([newIndex, step]);
  };

  return (
    <Section id="testimonios" aria-labelledby="testimonios-title">
      <Glow aria-hidden="true" />
      <Wrapper>
        <Header>
          <Title id="testimonios-title">Historias reales que avalan nuestro compromiso</Title>
          <p>
            Escucha cómo nuestros clientes describen el acompañamiento estratégico, la transparencia y los resultados que
            construimos juntos.
          </p>
        </Header>
        <Carousel>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <TestimonialCard
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Quote>“{testimonial.quote}”</Quote>
              <Author>{testimonial.author} — {testimonial.role}</Author>
            </TestimonialCard>
          </AnimatePresence>
        </Carousel>
        <Controls>
          <ControlButton
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Testimonio anterior"
            whileHover={{ scale: 1.06, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft aria-hidden="true" />
          </ControlButton>
          <ControlButton
            type="button"
            onClick={() => goTo(1)}
            aria-label="Siguiente testimonio"
            whileHover={{ scale: 1.06, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight aria-hidden="true" />
          </ControlButton>
        </Controls>
        <SectionFooter>¿Te gustaría ser nuestro próximo caso de éxito?</SectionFooter>
      </Wrapper>
    </Section>
  );
}

export default Testimonials;
