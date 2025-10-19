import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.surfaceSecondary};
`;

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
`;

const Carousel = styled.div`
  position: relative;
`;

const TestimonialCard = styled(motion.article)`
  background: ${({ theme }) => theme.surface};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 2.5rem;
  display: grid;
  gap: 1.25rem;
  box-shadow: 0 22px 44px rgba(15, 23, 42, 0.12);
`;

const Quote = styled.blockquote`
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
`;

const Author = styled.cite`
  font-style: normal;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
  }
`;

const testimonials = [
  {
    quote: 'La capacidad de NEO-KODEX para traducir objetivos de negocio en experiencias digitales inmersivas nos permitió triplicar la retención de usuarios en tres meses.',
    author: 'Andrea Gómez',
    role: 'CMO, Finova Bank'
  },
  {
    quote: 'Su enfoque integral de DevOps y desarrollo full stack redujo nuestros tiempos de despliegue de semanas a horas, manteniendo altos estándares de calidad.',
    author: 'Luis Martínez',
    role: 'CTO, HealthCore'
  },
  {
    quote: 'El rediseño con microinteracciones accesibles mejoró nuestras conversiones un 35%. El equipo entiende cómo equilibrar estética, rendimiento y accesibilidad.',
    author: 'Valentina Rivas',
    role: 'Product Lead, RetailX'
  }
];

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 200 : -200, opacity: 0 })
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
      <Wrapper>
        <Header>
          <Title id="testimonios-title">Historias de valor real</Title>
          <p>Testimonios de aliados estratégicos que confiaron en nuestra visión “Más allá del código”.</p>
        </Header>
        <Carousel>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <TestimonialCard key={index} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5 }}>
              <Quote>“{testimonial.quote}”</Quote>
              <Author>{testimonial.author} — {testimonial.role}</Author>
            </TestimonialCard>
          </AnimatePresence>
        </Carousel>
        <Controls>
          <ControlButton type="button" onClick={() => goTo(-1)} aria-label="Testimonio anterior">
            <FaChevronLeft aria-hidden="true" />
          </ControlButton>
          <ControlButton type="button" onClick={() => goTo(1)} aria-label="Siguiente testimonio">
            <FaChevronRight aria-hidden="true" />
          </ControlButton>
        </Controls>
      </Wrapper>
    </Section>
  );
}

export default Testimonials;
