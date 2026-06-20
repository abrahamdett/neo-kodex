import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { testimonials } from '../data/testimonials.js';

const Section = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 820px;
  margin: 0 auto;
  display: grid;
  gap: 40px;
`;

const Header = styled.div`
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
  margin: 0 auto;
  max-width: 520px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
`;

const Carousel = styled.div`
  position: relative;
  min-height: 260px;
`;

const TestimonialCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  padding: 40px 36px 32px;
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 24px;

  &::before {
    content: '"';
    font-family: ${({ theme }) => theme.typography.fontDisplay};
    font-size: 6rem;
    line-height: 1;
    color: rgba(99, 210, 140, 0.12);
    position: absolute;
    top: 12px;
    left: 24px;
    font-weight: 800;
    pointer-events: none;
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  position: relative;
  z-index: 1;
  font-size: clamp(1.05rem, 1.3vw + 1rem, 1.2rem);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 210, 140, 0.2), rgba(99, 210, 140, 0.05));
  border: 1px solid rgba(99, 210, 140, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

const AuthorMeta = styled.div`
  display: grid;
  gap: 2px;
  text-align: left;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorRole = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '24px' : '8px')};
  height: 8px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.primary : theme.colors.border.strong};
  transition: all 250ms ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary};
    outline-offset: 3px;
  }
`;

const SectionFooter = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: grid;
  gap: 16px;
`;

const FooterButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  justify-self: center;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
    transform: translateY(-1px);
  }
`;

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 60 : -60, opacity: 0 })
};

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function Testimonials() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const testimonial = testimonials[index];
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const goTo = (target) => {
    setIndex([target, target > index ? 1 : -1]);
  };

  return (
    <Section id="testimonios" aria-labelledby="testimonios-title">
      <Wrapper>
        <Header>
          <Eyebrow>Testimonios</Eyebrow>
          <Title id="testimonios-title">Lo que dicen nuestros clientes</Title>
          <Subtitle>
            Empresas reales que confiaron en nosotros y obtuvieron resultados concretos.
          </Subtitle>
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
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Quote>{testimonial.quote}</Quote>
              <AuthorRow>
                <Avatar aria-hidden="true">{getInitials(testimonial.author)}</Avatar>
                <AuthorMeta>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorRole>{testimonial.role}</AuthorRole>
                </AuthorMeta>
              </AuthorRow>
            </TestimonialCard>
          </AnimatePresence>
        </Carousel>
        <Dots role="tablist" aria-label="Seleccionar testimonio">
          {testimonials.map((item, i) => (
            <Dot
              key={item.id}
              type="button"
              $active={i === index}
              aria-label={`Ver testimonio de ${item.author}`}
              aria-selected={i === index}
              role="tab"
              onClick={() => goTo(i)}
            />
          ))}
        </Dots>
        <SectionFooter>
          ¿Quieres resultados como estos para tu empresa?
          <FooterButton
            href="#contacto"
            onClick={() => {
              trackEvent({ action: 'cta_propuesta_testimonios_footer', category: 'cta_intermedia', label: 'cta-testimonios-footer' });
              logCtaInteraction({ location: 'cta-testimonios-footer', variant, intent: 'cta_propuesta_testimonios_footer' }).catch(() => {});
            }}
          >
            Contáctanos hoy
          </FooterButton>
        </SectionFooter>
      </Wrapper>
    </Section>
  );
}

export default Testimonials;
