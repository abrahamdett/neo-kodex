import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';

const FloatingButton = styled.button`
  position: fixed;
  bottom: clamp(1.5rem, 3vw, 2.5rem);
  right: clamp(1.25rem, 3vw, 2.5rem);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.accentSoft});
  color: #fff;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.05);
    outline: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.7);
    outline-offset: 4px;
  }
`;

const Panel = styled(motion.section)`
  position: fixed;
  bottom: clamp(5.5rem, 8vw, 6.5rem);
  right: clamp(1.25rem, 3vw, 2.5rem);
  width: min(320px, 90vw);
  background: ${({ theme }) => theme.surface};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 20px 60px rgba(5, 10, 25, 0.3);
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  z-index: 1000;
`;

const Header = styled.header`
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.surfaceSecondary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const MessageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.25rem;
  display: grid;
  gap: 0.75rem;
  max-height: 260px;
  overflow-y: auto;
`;

const Message = styled.li`
  display: grid;
  justify-items: ${({ $fromUser }) => ($fromUser ? 'end' : 'start')};
`;

const Bubble = styled.span`
  padding: 0.65rem 0.9rem;
  border-radius: 1rem;
  background: ${({ theme, $fromUser }) => ($fromUser ? theme.accent : theme.glass.background)};
  color: ${({ $fromUser }) => ($fromUser ? '#ffffff' : 'inherit')};
  box-shadow: ${({ theme, $fromUser }) => ($fromUser ? '0 12px 24px rgba(127, 90, 240, 0.35)' : theme.glass.shadow)};
  font-size: 0.95rem;
  max-width: 240px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.1rem;
  background: ${({ theme }) => theme.surfaceSecondary};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }
`;

const Submit = styled.button`
  border: none;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    outline: none;
  }
`;

const suggestionMap = {
  onboarding:
    'Te ayudamos a organizar un workshop de descubrimiento con stakeholders y usuarios para definir objetivos medibles.',
  servicios:
    'Exploramos tus necesidades y proponemos una mezcla de desarrollo full stack, experiencias 3D y soporte estratégico.',
  demo:
    'Coordinamos una demo inmersiva en menos de 48 horas. Déjanos tus datos en el formulario y agendamos contigo.'
};

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', from: 'bot', text: '¡Hola! Soy KODEX-bot. ¿En qué podemos acompañarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => Object.keys(suggestionMap), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const timestamp = Date.now();
    const userMessage = { id: `user-${timestamp}`, from: 'user', text: input.trim() };
    const lower = input.trim().toLowerCase();
    const key = suggestions.find((option) => lower.includes(option));
    const botText = key
      ? suggestionMap[key]
      : 'Nuestro equipo responderá en minutos hábiles. Mientras tanto, explora los servicios destacados y agenda una videollamada.';

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: `bot-${timestamp}`, from: 'bot', text: botText }
    ]);
    setInput('');
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const node = listRef.current.lastElementChild;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, open]);

  return (
    <>
      <FloatingButton
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        <FaRobot aria-hidden="true" />
        <span className="sr-only">Abrir asistente virtual</span>
      </FloatingButton>
      <AnimatePresence>
        {open && (
          <Panel
            id="chatbot-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Chatbot de NEO-KODEX"
          >
            <Header>
              <FaRobot aria-hidden="true" />
              <div>
                <strong>KODEX-bot</strong>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Pregúntame sobre servicios, demos o cultura.
                </p>
              </div>
            </Header>
            <MessageList ref={listRef}>
              {messages.map((message) => (
                <Message key={message.id} $fromUser={message.from === 'user'}>
                  <Bubble $fromUser={message.from === 'user'}>{message.text}</Bubble>
                </Message>
              ))}
            </MessageList>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="chatbot-input" className="sr-only">
                Envía tu mensaje
              </label>
              <Input
                id="chatbot-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escribe tu pregunta..."
                autoComplete="off"
                ref={inputRef}
              />
              <Submit type="submit" aria-label="Enviar mensaje">
                <FaPaperPlane aria-hidden="true" />
              </Submit>
            </Form>
          </Panel>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatbotWidget;
