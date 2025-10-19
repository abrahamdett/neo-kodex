import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(4deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4rem 1.5rem 6rem;
  text-align: center;
`;

const Card = styled(motion.section)`
  max-width: 560px;
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
`;

const Title = styled.h1`
  font-size: clamp(3rem, 5vw + 1rem, 5rem);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.3s ease;
  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
  }
`;

const Orb = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(127, 90, 240, 0.9), rgba(0, 209, 255, 0.4));
  animation: ${float} 6s ease-in-out infinite;
  filter: drop-shadow(0 24px 36px rgba(127, 90, 240, 0.35));
`;

function NotFound() {
  return (
    <Wrapper>
      <Card initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Orb aria-hidden="true" />
        <Title>404</Title>
        <Description>
          Parece que navegaste a otra dimensión del código. Juega con la esfera flotante y regresa para seguir creando innovaciones.
        </Description>
        <BackLink to="/">Volver al inicio</BackLink>
      </Card>
    </Wrapper>
  );
}

export default NotFound;
