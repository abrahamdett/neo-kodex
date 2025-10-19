import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  padding: 3rem 1.5rem 2rem;
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.textSecondary};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.accent};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 18px 36px ${({ theme }) => theme.accentSoft};
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <Column>
          <h3>NEO-KODEX</h3>
          <p>Más allá del código. Innovación, confianza y acompañamiento estratégico para tus proyectos tecnológicos.</p>
        </Column>
        <Column>
          <h4>Contacto</h4>
          <p><strong>Tel:</strong> +52 55 1234 5678</p>
          <p><strong>Email:</strong> hola@neo-kodex.com</p>
          <p><strong>Dirección:</strong> Av. Innovación 404, Ciudad Creativa, MX</p>
        </Column>
        <Column>
          <h4>Redes sociales</h4>
          <SocialLinks>
            <SocialAnchor href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" />
            </SocialAnchor>
            <SocialAnchor href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
            </SocialAnchor>
            <SocialAnchor href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
              <FaTwitter aria-hidden="true" />
            </SocialAnchor>
          </SocialLinks>
        </Column>
      </FooterGrid>
      <Copyright>© {new Date().getFullYear()} NEO-KODEX. Todos los derechos reservados.</Copyright>
    </FooterWrapper>
  );
}

export default Footer;
