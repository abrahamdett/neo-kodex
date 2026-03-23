import styled from 'styled-components';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaInstagram, FaLock } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  padding: clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem) 2rem;
  background: ${({ theme }) => theme.surfaceSecondary};
  color: ${({ theme }) => theme.textSecondary};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BrandColumn = styled(Column)`
  h3 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
  }
`;

const BrandLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;

  li {
    font-size: 0.9rem;
  }

  a {
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px ${({ theme }) => theme.accentSoft};
  }
`;

const LegalRow = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
`;

const SecurityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  font-size: 0.8rem;
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <BrandColumn>
          <h3>
            <BrandLogo src={`${import.meta.env.BASE_URL}assets/logo-neokodex.svg`} alt="" />
            NEO-KODEX
          </h3>
          <p>Más allá del código. Tu socio tecnológico para software, soporte e infraestructura.</p>
        </BrandColumn>
        <Column>
          <h4>Servicios</h4>
          <ServiceList>
            <li><a href="#servicios">Software a la medida</a></li>
            <li><a href="#servicios">Aplicaciones móviles</a></li>
            <li><a href="#servicios">Soporte técnico</a></li>
            <li><a href="#servicios">Redes y cableado</a></li>
            <li><a href="#servicios">Venta de equipo</a></li>
            <li><a href="#servicios">Consultoría tecnológica</a></li>
          </ServiceList>
        </Column>
        <Column>
          <h4>Contacto</h4>
          <p><strong>Tel:</strong> +52 55 1234 5678</p>
          <p><strong>Email:</strong> hola@neo-kodex.com</p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/5215512345678">+52 1 55 1234 5678</a></p>
          <p><strong>Horario:</strong> Lun-Vie 9:00 - 18:00</p>
        </Column>
        <Column>
          <h4>Síguenos</h4>
          <SocialLinks>
            <SocialAnchor href="https://wa.me/5215512345678" aria-label="WhatsApp" target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" />
            </SocialAnchor>
            <SocialAnchor href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FaFacebook aria-hidden="true" />
            </SocialAnchor>
            <SocialAnchor href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <FaInstagram aria-hidden="true" />
            </SocialAnchor>
            <SocialAnchor href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" />
            </SocialAnchor>
          </SocialLinks>
        </Column>
      </FooterGrid>
      <LegalRow>
        <a href="/privacy.html">Política de privacidad</a>
        <a href="/terms.html">Términos de servicio</a>
        <SecurityBadge>
          <FaLock aria-hidden="true" /> Sitio seguro SSL
        </SecurityBadge>
      </LegalRow>
      <Copyright>© {new Date().getFullYear()} NEO-KODEX. Todos los derechos reservados.</Copyright>
    </FooterWrapper>
  );
}

export default Footer;
