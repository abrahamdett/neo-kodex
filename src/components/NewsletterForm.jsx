import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToNewsletter } from '../services/leadService.js';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const Card = styled(motion.form)`
  display: grid;
  gap: 1rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: 20px;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(16px);
`;

const Label = styled.label`
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }
`;

const Submit = styled.button`
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accentSoft};
    outline-offset: 4px;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ $error }) => ($error ? '#b91c1c' : 'inherit')};
`;

function NewsletterForm({ id, title, description, submitLabel }) {
  const { register, handleSubmit, reset, formState: { isValid } } = useForm({ mode: 'onChange' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const onSubmit = async (data) => {
    setStatus({ type: 'loading', message: '' });
    try {
      const result = await subscribeToNewsletter({ email: data.email, nombre: data.nombre ?? '', origen: id, variante: variant });
      if (result.error) throw new Error(result.error);
      trackEvent({ action: 'newsletter_registro', category: 'newsletter', label: id });
      setStatus({ type: 'success', message: '¡Listo! Revisa tu correo para descargar la guía exclusiva.' });
      reset();
    } catch (error) {
      setStatus({ type: 'error', message: error.message ?? 'Ocurrió un error, intenta nuevamente.' });
    }
  };

  return (
    <Card id={id} onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
      <div>
        {title ? <h3 style={{ margin: 0 }}>{title}</h3> : null}
        <p style={{ margin: 0 }}>{description}</p>
      </div>
      <Label htmlFor={`${id}-nombre`}>
        Nombre
        <Input id={`${id}-nombre`} type="text" placeholder="Ana" {...register('nombre')} />
      </Label>
      <Label htmlFor={`${id}-email`}>
        Correo electrónico *
        <Input id={`${id}-email`} type="email" placeholder="ana@empresa.com" required {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
      </Label>
      <Submit type="submit" disabled={!isValid || status.type === 'loading'}>
        {status.type === 'loading' ? 'Enviando…' : submitLabel}
      </Submit>
      {status.message ? (
        <Message $error={status.type === 'error'} role={status.type === 'error' ? 'alert' : 'status'}>
          {status.message}
        </Message>
      ) : null}
      <Message style={{ opacity: 0.7 }}>
        Te enviaremos recursos accionables y podrás darte de baja con un clic. Datos protegidos bajo nuestra política de privacidad.
      </Message>
    </Card>
  );
}

NewsletterForm.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  submitLabel: PropTypes.string
};

NewsletterForm.defaultProps = {
  submitLabel: 'Recibir guía exclusiva'
};

export default NewsletterForm;
