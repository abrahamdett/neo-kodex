import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { services } from '../data/services.js';

const Section = styled.section`
  padding: 6rem 1.5rem 8rem;
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

const FormWrapper = styled(motion.form)`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
`;

const Label = styled.label`
  display: grid;
  gap: 0.5rem;
  font-weight: 600;
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
  min-height: 160px;
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
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
`;

const SubmitButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.95rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  border: none;
  border-radius: 999px;
  font-weight: 600;
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

const SuccessMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.text};
`;

const AttachmentHint = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
`;

function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({ mode: 'onChange' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const serviceOptions = useMemo(
    () => services.map((service) => ({ id: service.id, title: service.title })),
    []
  );

  const onSubmit = (data) => {
    console.info('Formulario enviado', data);
    setIsSending(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSending(false);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  const selectedService = watch('servicio');

  return (
    <Section id="contacto" aria-labelledby="contacto-title">
      <Wrapper>
        <Info>
          <h2 id="contacto-title">Conversemos sobre tu próximo salto tecnológico</h2>
          <p>
            Diseñamos soluciones alineadas con tu visión y objetivos. Agenda una sesión de descubrimiento o escríbenos directamente a WhatsApp para recibir una asesoría personalizada.
          </p>
          <p>
            <a href="https://wa.me/5215512345678" target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
              <FaWhatsapp aria-hidden="true" /> +52 1 55 1234 5678
            </a>
          </p>
          <p>
            También puedes escribirnos a <a href="mailto:hola@neo-kodex.com">hola@neo-kodex.com</a>. Respondemos en menos de 24 horas hábiles.
          </p>
          <p style={{ fontWeight: 600 }}>¿Agendamos una llamada exploratoria esta semana?</p>
        </Info>
        <FormWrapper onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby="contacto-ayuda">
          <p id="contacto-ayuda">Campos marcados con * son obligatorios.</p>
          <Label htmlFor="nombre">Nombre completo *</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Ana Torres"
            aria-invalid={Boolean(errors.nombre)}
            {...register('nombre', { required: 'El nombre es obligatorio', minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' } })}
          />
          {errors.nombre && <ErrorMessage role="alert">{errors.nombre.message}</ErrorMessage>}

          <Label htmlFor="correo">Correo electrónico *</Label>
          <Input
            id="correo"
            type="email"
            placeholder="ana@empresa.com"
            aria-invalid={Boolean(errors.correo)}
            {...register('correo', {
              required: 'El correo es obligatorio',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un correo válido' }
            })}
          />
          {errors.correo && <ErrorMessage role="alert">{errors.correo.message}</ErrorMessage>}

          <Label htmlFor="servicio">Servicio de interés *</Label>
          <Select
            id="servicio"
            aria-invalid={Boolean(errors.servicio)}
            {...register('servicio', { required: 'Selecciona un servicio para personalizar la asesoría.' })}
          >
            <option value="">Selecciona una opción</option>
            {serviceOptions.map((option) => (
              <option key={option.id} value={option.title}>
                {option.title}
              </option>
            ))}
          </Select>
          {errors.servicio && <ErrorMessage role="alert">{errors.servicio.message}</ErrorMessage>}

          <Label htmlFor="mensaje">Mensaje *</Label>
          <TextArea
            id="mensaje"
            placeholder="Cuéntanos sobre tu proyecto..."
            aria-invalid={Boolean(errors.mensaje)}
            {...register('mensaje', { required: 'El mensaje es obligatorio', minLength: { value: 10, message: 'Comparte al menos 10 caracteres' } })}
          />
          {errors.mensaje && <ErrorMessage role="alert">{errors.mensaje.message}</ErrorMessage>}

          <Label htmlFor="archivos">Adjuntar archivos (opcional)</Label>
          <Input
            id="archivos"
            type="file"
            multiple
            aria-describedby="adjuntos-ayuda"
            {...register('archivos')}
          />
          <AttachmentHint id="adjuntos-ayuda">
            Comparte brief, mockups o requerimientos técnicos. Formatos aceptados: PDF, PNG, MP4.
          </AttachmentHint>

          {selectedService ? (
            <AttachmentHint>
              Personalizaremos la propuesta enfocándonos en «{selectedService}».
            </AttachmentHint>
          ) : null}

          <SubmitButton type="submit" disabled={!isValid || isSending} aria-live="polite">
            {isSending ? 'Enviando…' : 'Enviar mensaje'}
          </SubmitButton>
          <AnimatePresence>
            {submitted && (
              <SuccessMessage
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                ¡Gracias! Nuestro equipo se pondrá en contacto contigo muy pronto.
              </SuccessMessage>
            )}
          </AnimatePresence>
        </FormWrapper>
      </Wrapper>
    </Section>
  );
}

export default ContactSection;
