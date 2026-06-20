import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services } from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  position: relative;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  max-width: 560px;
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
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const SectionFooter = styled.div`
  margin-top: 56px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: grid;
  gap: 18px;
`;

const FooterActions = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
    transform: translateY(-1px);
  }
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 10, 0.72);
  backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 1100;
`;

const ModalContent = styled(motion.div)`
  max-width: 640px;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: clamp(1.8rem, 3vw, 2.6rem);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
  display: grid;
  gap: 1.35rem;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.4rem, 2vw + 1rem, 1.8rem);
`;

const ModalSubtitle = styled.p`
  margin: 0.4rem 0 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  transition: all 150ms ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

const BenefitList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.6rem;
`;

const BenefitItem = styled.li`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;

  &::marker {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

const ModalQuestion = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ModalCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 13px 24px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  justify-self: start;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    transform: translateY(-1px);
  }
`;

function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState(null);
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? null,
    [activeServiceId]
  );

  const closeModal = () => setActiveServiceId(null);

  return (
    <Section id="servicios" aria-labelledby="servicios-title">
      <Container>
        <SectionHeader>
          <Eyebrow>Servicios</Eyebrow>
          <Title id="servicios-title">Todo lo que tu empresa necesita</Title>
          <Description>
            Desde el desarrollo de software y aplicaciones hasta automatizaciones,
            soporte técnico, redes e infraestructura. Soluciones completas en un solo lugar.
          </Description>
        </SectionHeader>
        <Grid>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              onSelect={() => setActiveServiceId(service.id)}
            />
          ))}
        </Grid>
        <SectionFooter>
          ¿Necesitas alguno de estos servicios? Te cotizamos sin compromiso.
          <FooterActions>
            <PrimaryButton
              href="#contacto"
              onClick={() => {
                trackEvent({ action: 'cta_cotizacion_servicios_footer', category: 'cta_intermedia', label: 'cta-servicios-footer' });
                logCtaInteraction({ location: 'cta-servicios-footer', variant, intent: 'cta_cotizacion_servicios_footer' }).catch(() => {});
              }}
            >
              Solicitar cotización gratis
            </PrimaryButton>
            <SecondaryLink
              href="https://wa.me/5215621193579"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent({ action: 'cta_whatsapp_servicios_footer', category: 'cta_intermedia', label: 'cta-servicios-footer' });
                logCtaInteraction({ location: 'cta-servicios-footer', variant, intent: 'cta_whatsapp_servicios_footer' }).catch(() => {});
              }}
            >
              Escríbenos por WhatsApp
            </SecondaryLink>
          </FooterActions>
        </SectionFooter>
      </Container>

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
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
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
              <ModalCTA href="#contacto" onClick={closeModal}>Coordinar una reunión</ModalCTA>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default ServicesSection;
