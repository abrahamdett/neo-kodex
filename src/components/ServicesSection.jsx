import styled, { useTheme } from 'styled-components';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 4vw, 4rem);
`;

const SectionHeader = styled.div`
  max-width: 840px;
  margin: 0 auto 3.5rem;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 2.8vw + 1rem, 3.2rem);
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const SectionFooter = styled.div`
  margin-top: clamp(2.5rem, 4vw, 3.5rem);
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
  display: grid;
  gap: 1rem;
`;

const FooterActions = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-weight: 600;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.25rem, 2vw, 2.2rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-auto-rows: 220px;
    grid-template-areas:
      'a a b c'
      'a a d e'
      'f g h i'
      'j k h i';
  }
`;

const BentoCard = styled(ServiceCard).withConfig({
  shouldForwardProp: (prop) => !['area', 'gradient'].includes(prop)
})`
  min-height: 100%;
  --card-gradient: ${({ gradient }) => gradient};

  @media (min-width: 1024px) {
    grid-area: ${({ area }) => area};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(4, 7, 18, 0.72);
  backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  max-width: 720px;
  width: 100%;
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: clamp(1.8rem, 3vw, 2.6rem);
  box-shadow: 0 40px 80px rgba(5, 8, 16, 0.45);
  display: grid;
  gap: 1.35rem;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.4rem, 2vw + 1rem, 1.8rem);
`;

const ModalSubtitle = styled.p`
  margin: 0.4rem 0 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  transition: background 0.3s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.accentSoft};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const BenefitList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.5rem;
`;

const BenefitItem = styled.li`
  color: ${({ theme }) => theme.textSecondary};
`;

const ModalQuestion = styled.p`
  margin: 0;
  font-weight: 600;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  background: linear-gradient(120deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

function toRgba(hex, alpha = 1) {
  if (!hex) return `rgba(127, 90, 240, ${alpha})`;
  const value = hex.replace('#', '');
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ServicesSection() {
  const theme = useTheme();
  const layoutAreas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const [activeServiceId, setActiveServiceId] = useState(null);
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const gradients = useMemo(() => {
    const accentSoft = theme?.accentSoft ?? 'rgba(127, 90, 240, 0.2)';
    const neon = theme?.name === 'sepia' ? 'rgba(255, 202, 138, 0.25)' : 'rgba(0, 209, 255, 0.22)';
    const dusk = theme?.name === 'dark' ? 'rgba(15, 30, 60, 0.45)' : 'rgba(241, 242, 255, 0.6)';

    return services.map((_, index) => {
      const angle = 110 + index * 9;
      const accentIntensity = toRgba(theme?.accent, 0.22 + (index % 4) * 0.06);
      const neonGlow = index % 2 === 0 ? neon : accentSoft;
      return `linear-gradient(${angle}deg, ${accentIntensity}, ${neonGlow}), radial-gradient(circle at top left, ${dusk}, transparent 65%)`;
    });
  }, [theme]);

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? null,
    [activeServiceId]
  );

  const closeModal = () => setActiveServiceId(null);

  return (
    <Section id="servicios" aria-labelledby="servicios-title">
      <SectionHeader>
        <Title id="servicios-title">Servicios que resuelven tus retos clave</Title>
        <Description>
          Un bento grid inmersivo presenta nuestras soluciones estratégicas con glassmorphism y micro-interacciones. Explora
          cómo cada servicio ataca dolores específicos y abre nuevos resultados para tu negocio.
        </Description>
      </SectionHeader>
      <Grid>
        {services.map((service, index) => (
          <BentoCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            area={layoutAreas[index]}
            gradient={gradients[index]}
            custom={index}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: index * 0.05, ease: 'easeOut' }}
            onSelect={() => setActiveServiceId(service.id)}
          />
        ))}
      </Grid>
      <SectionFooter>
        ¿Cuál de estas soluciones desbloqueará tu siguiente hito?
        <FooterActions>
          <CTAButton
            href="#contacto"
            onClick={() => {
              trackEvent({ action: 'cta_diagnostico_servicios_footer', category: 'cta_intermedia', label: 'cta-servicios-footer' });
              logCtaInteraction({ location: 'cta-servicios-footer', variant, intent: 'cta_diagnostico_servicios_footer' }).catch(() => {});
            }}
          >
            Agenda diagnóstico estratégico
          </CTAButton>
          <SecondaryLink
            href="#recursos"
            onClick={() => {
              trackEvent({ action: 'cta_recursos_servicios_footer', category: 'cta_intermedia', label: 'cta-servicios-footer' });
              logCtaInteraction({ location: 'cta-servicios-footer', variant, intent: 'cta_recursos_servicios_footer' }).catch(() => {});
            }}
          >
            Explorar frameworks descargables
          </SecondaryLink>
        </FooterActions>
      </SectionFooter>

      <AnimatePresence>
        {activeService && (
          <ModalOverlay
            key="services-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              role="dialog"
              aria-modal="true"
              aria-labelledby={`service-${activeService.id}-title`}
              aria-describedby={`service-${activeService.id}-description`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ModalHeader>
                <div>
                  <ModalTitle id={`service-${activeService.id}-title`}>
                    {activeService.title}
                  </ModalTitle>
                  <ModalSubtitle id={`service-${activeService.id}-description`}>
                    {activeService.description}
                  </ModalSubtitle>
                </div>
                <CloseButton type="button" onClick={closeModal}>
                  Cerrar
                </CloseButton>
              </ModalHeader>
              <BenefitList>
                {activeService.benefits.map((benefit) => (
                  <BenefitItem key={benefit}>{benefit}</BenefitItem>
                ))}
              </BenefitList>
              <ModalQuestion>{activeService.question}</ModalQuestion>
              <CTAButton href="#contacto">Coordinar una reunión</CTAButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default ServicesSection;
