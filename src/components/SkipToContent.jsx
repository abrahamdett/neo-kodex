import styled from 'styled-components';

const SkipLink = styled.a`
  position: absolute;
  top: -64px;
  left: 16px;
  background: ${({ theme }) => theme.accent};
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  z-index: 1000;
  transition: top 0.3s ease;
  &:focus {
    top: 16px;
  }
`;

function SkipToContent() {
  return (
    <SkipLink href="#contenido-principal">Saltar al contenido principal</SkipLink>
  );
}

export default SkipToContent;
