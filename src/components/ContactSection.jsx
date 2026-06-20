import styled from 'styled-components';
import { FaWhatsapp, FaPhone, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';
import { logCtaInteraction } from '../services/leadService.js';

const WHATSAPP_URL =
  'https://wa.me/5215621193579?text=' +
  encodeURIComponent('Hola NEO-KODEX, me interesa cotizar un proyecto.');
const PHONE_TEL = 'tel:+525621193579';
const EMAIL = 'an@neo-kodex.com';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
`;

const Wrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  display: grid;
  gap: 18px;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3vw + 1rem, 2.8rem);
  margin: 0;
`;

const Lead = styled.p`
  margin: 0 auto;
  max-width: 540px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
`;

const Actions = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-top: 8px;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 1rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 1rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ChannelCard = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 6px;
  padding: 24px;
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  text-align: left;
`;

const ChannelItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 200ms ease;
  font-size: 0.9375rem;

  svg {
    color: ${({ theme }) => theme.colors.accent.primary};
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ConfidenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 100px;
  background: rgba(99, 210, 140, 0.08);
  border: 1px solid rgba(99, 210, 140, 0.2);
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.8rem;

  svg {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

function ContactSection() {
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const track = (intent) => {
    trackEvent({ action: intent, category: 'contacto', label: 'contacto-directo' });
    logCtaInteraction({ location: 'contacto', variant, intent }).catch(() => {});
  };

  return (
    <Section id="contacto" aria-labelledby="contacto-title">
      <Wrapper>
        <Eyebrow>Contacto</Eyebrow>
        <Title id="contacto-title">¿Listo para impulsar tu negocio con tecnología?</Title>
        <Lead>
          Cuéntanos qué necesitas y te respondemos en menos de 24 horas, sin compromiso.
          La forma más rápida es por WhatsApp.
        </Lead>

        <Actions>
          <PrimaryButton
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('cta_whatsapp_contacto')}
          >
            <FaWhatsapp aria-hidden="true" />
            Escríbenos por WhatsApp
          </PrimaryButton>
          <SecondaryButton href={PHONE_TEL} onClick={() => track('cta_llamar_contacto')}>
            <FaPhone aria-hidden="true" />
            Llámanos
          </SecondaryButton>
        </Actions>

        <ChannelCard>
          <strong style={{ color: 'inherit', marginBottom: 6 }}>Contáctanos directamente</strong>
          <ChannelItem
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('cta_whatsapp_contacto')}
          >
            <FaWhatsapp aria-hidden="true" />
            WhatsApp: +52 56 2119 3579
          </ChannelItem>
          <ChannelItem href={PHONE_TEL} onClick={() => track('cta_llamar_contacto')}>
            <FaPhone aria-hidden="true" />
            Teléfono: +52 56 2119 3579
          </ChannelItem>
          <ChannelItem href={`mailto:${EMAIL}`} onClick={() => track('cta_email_contacto')}>
            <FaEnvelope aria-hidden="true" />
            {EMAIL}
            <FiArrowUpRight aria-hidden="true" style={{ marginLeft: 'auto', opacity: 0.6 }} />
          </ChannelItem>
        </ChannelCard>

        <ConfidenceRow>
          <Badge>
            <FaShieldAlt aria-hidden="true" /> Cotización sin compromiso
          </Badge>
          <Badge>
            <FaShieldAlt aria-hidden="true" /> Respuesta en menos de 24 hrs
          </Badge>
        </ConfidenceRow>
      </Wrapper>
    </Section>
  );
}

export default ContactSection;
