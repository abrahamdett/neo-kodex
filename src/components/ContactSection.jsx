import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaWhatsapp, FaShieldAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { services } from '../data/services.js';
import { submitLead, subscribeToNewsletter } from '../services/leadService.js';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Section = styled.section`
  padding: clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4rem);
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoTitle = styled.h2`
  font-size: clamp(1.8rem, 2.5vw + 1rem, 2.6rem);
  margin: 0;
`;

const ContactCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(18px);
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.text};
  transition: color 0.2s ease;

  svg {
    color: ${({ theme }) => theme.accent};
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const FormWrapper = styled(motion.form)`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 24px;
  padding: clamp(2rem, 4vw, 2.75rem);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
  display: grid;
  gap: 1.25rem;
`;

const Label = styled.label`
  display: grid;
  gap: 0.45rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.text};
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.accentSoft};
  }
`;

const TextArea = styled.textarea`
  min-height: 140px;
  resize: vertical;
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.text};
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.accentSoft};
  }
`;

const Select = styled.select`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.text};
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.accentSoft};
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.9rem;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.95rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: ${pulse} 3s infinite;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    animation: none;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(6, 12, 30, 0.75);
  backdrop-filter: blur(16px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  max-width: 520px;
  width: 100%;
  background: ${({ theme }) => theme.surface};
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: clamp(1.75rem, 3vw, 2.5rem);
  display: grid;
  gap: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.text};
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

const ErrorBanner = styled.div`
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  font-weight: 600;
`;

const FormHint = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ConfidenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  font-size: 0.8rem;
`;

function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: '',
      servicio: '',
      newsletter: true
    }
  });
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const serviceOptions = useMemo(
    () => services.map((service) => ({ id: service.id, title: service.title })),
    []
  );

  useEffect(() => {
    if (!showModal) return undefined;
    const handler = (event) => {
      if (event.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showModal]);

  const onSubmit = async (data) => {
    setIsSending(true);
    setErrorMessage('');

    try {
      const payload = {
        nombre: data.nombre,
        email: data.correo,
        telefono: data.telefono || null,
        mensaje: data.mensaje,
        servicio: data.servicio || null,
        fuente: 'sitio-web',
        variante: variant,
        newsletter: Boolean(data.newsletter)
      };

      const result = await submitLead(payload);
      if (result.error) throw new Error(result.error);

      if (data.newsletter) {
        await subscribeToNewsletter({ email: data.correo, nombre: data.nombre }).catch(() => {});
      }

      trackEvent({ action: 'lead_enviado', category: 'formulario', label: 'contacto-principal' });
      setShowModal(true);
      reset({ nombre: '', correo: '', telefono: '', mensaje: '', servicio: '', newsletter: true });
    } catch (error) {
      setErrorMessage(error.message ?? 'Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section id="contacto" aria-labelledby="contacto-title">
      <Wrapper>
        <Info>
          <InfoTitle id="contacto-title">¿Listo para impulsar tu negocio con tecnología?</InfoTitle>
          <p>
            Cuéntanos qué necesitas y te contactamos en menos de 24 horas con una propuesta personalizada
            y sin compromiso.
          </p>
          <ContactCard>
            <strong>Contáctanos directamente:</strong>
            <ContactItem href="https://wa.me/5215512345678" target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" />
              WhatsApp: +52 1 55 1234 5678
            </ContactItem>
            <ContactItem href="tel:+525512345678">
              <FaPhone aria-hidden="true" />
              Teléfono: +52 55 1234 5678
            </ContactItem>
            <ContactItem href="mailto:hola@neo-kodex.com">
              <FaEnvelope aria-hidden="true" />
              hola@neo-kodex.com
            </ContactItem>
          </ContactCard>
          <ConfidenceRow>
            <Badge>
              <FaShieldAlt aria-hidden="true" /> Cotización sin compromiso
            </Badge>
            <Badge>
              <FaShieldAlt aria-hidden="true" /> Respuesta en menos de 24 hrs
            </Badge>
          </ConfidenceRow>
        </Info>
        <FormWrapper
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby="contacto-ayuda"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <FormHint id="contacto-ayuda">Campos marcados con * son obligatorios.</FormHint>

          {errorMessage ? <ErrorBanner role="alert">{errorMessage}</ErrorBanner> : null}

          <Label htmlFor="nombre">
            Nombre completo *
            <Input
              id="nombre"
              type="text"
              placeholder="Tu nombre"
              aria-invalid={Boolean(errors.nombre)}
              {...register('nombre', {
                required: 'El nombre es obligatorio',
                minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' }
              })}
            />
          </Label>
          {errors.nombre && <ErrorMessage role="alert">{errors.nombre.message}</ErrorMessage>}

          <Label htmlFor="correo">
            Correo electrónico *
            <Input
              id="correo"
              type="email"
              placeholder="tu@empresa.com"
              aria-invalid={Boolean(errors.correo)}
              {...register('correo', {
                required: 'El correo es obligatorio',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un correo válido' }
              })}
            />
          </Label>
          {errors.correo && <ErrorMessage role="alert">{errors.correo.message}</ErrorMessage>}

          <Label htmlFor="telefono">
            Teléfono (opcional)
            <Input
              id="telefono"
              type="tel"
              placeholder="+52 55 1234 5678"
              {...register('telefono')}
            />
          </Label>

          <Label htmlFor="servicio">
            Servicio de interés
            <Select id="servicio" {...register('servicio')}>
              <option value="">Selecciona una opción</option>
              {serviceOptions.map((option) => (
                <option key={option.id} value={option.title}>
                  {option.title}
                </option>
              ))}
            </Select>
          </Label>

          <Label htmlFor="mensaje">
            ¿Cómo podemos ayudarte? *
            <TextArea
              id="mensaje"
              placeholder="Describe brevemente lo que necesitas..."
              aria-invalid={Boolean(errors.mensaje)}
              {...register('mensaje', {
                required: 'El mensaje es obligatorio',
                minLength: { value: 10, message: 'Comparte al menos 10 caracteres' }
              })}
            />
          </Label>
          {errors.mensaje && <ErrorMessage role="alert">{errors.mensaje.message}</ErrorMessage>}

          <SubmitButton type="submit" disabled={!isValid || isSending} aria-live="polite">
            {isSending ? 'Enviando...' : 'Enviar y solicitar cotización'}
          </SubmitButton>

          <ConfidenceRow>
            <a href="/privacy.html">Política de privacidad</a>
            <span>Tus datos están protegidos</span>
          </ConfidenceRow>
        </FormWrapper>
      </Wrapper>

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            key="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <ModalContent
              role="dialog"
              aria-modal="true"
              aria-labelledby="contacto-confirmacion-title"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="contacto-confirmacion-title">¡Mensaje recibido!</h3>
              <p>
                Gracias por contactarnos. Nuestro equipo revisará tu solicitud y te contactará en
                menos de 24 horas hábiles con una propuesta personalizada.
              </p>
              <p style={{ margin: 0 }}>
                Si prefieres atención inmediata, escríbenos por WhatsApp al +52 1 55 1234 5678.
              </p>
              <ModalActions>
                <CloseButton type="button" onClick={() => setShowModal(false)}>
                  Cerrar
                </CloseButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default ContactSection;
