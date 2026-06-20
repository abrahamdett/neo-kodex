import styled from 'styled-components';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaInstagram, FaLock } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  padding: 64px 24px 28px;
  background: ${({ theme }) => theme.colors.bg.deep};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const FooterGrid = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
  display: grid;
  gap: 40px;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 4px;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const BrandColumn = styled(Column)``;

const BrandName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-weight: 800;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BrandLogo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const Tagline = styled.p`
  max-width: 280px;
`;

const ServiceList = styled.ul`
  list-style: none;
  display: grid;
  gap: 8px;

  li {
    font-size: 0.875rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: color 200ms ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.05rem;
  transition: all 250ms ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.primary};
    border-color: rgba(99, 210, 140, 0.3);
    transform: translateY(-2px);
  }
`;

const BottomStrip = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 48px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: color 200ms ease;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const SecurityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.78rem;
`;

const MadeIn = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <BrandColumn>
          <BrandName>
            <BrandLogo src={`${import.meta.env.BASE_URL}assets/logo-neokodex.svg`} alt="NEO-KODEX" />
            NEO-KODEX
          </BrandName>
          <Tagline>
            Tu socio tecnológico para software a la medida, soporte técnico e infraestructura.
          </Tagline>
          <SocialLinks>
            <SocialAnchor href="https://wa.me/5215621193579" aria-label="WhatsApp" target="_blank" rel="noreferrer">
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
        </BrandColumn>
        <Column>
          <h4>Servicios</h4>
          <ServiceList>
            <li><a href="#servicios">Software a la medida</a></li>
            <li><a href="#servicios">Aplicaciones móviles</a></li>
            <li><a href="#servicios">Soporte técnico</a></li>
            <li><a href="#servicios">Redes y cableado</a></li>
            <li><a href="#servicios">Consultoría tecnológica</a></li>
          </ServiceList>
        </Column>
        <Column>
          <h4>Contacto</h4>
          <p><strong>Tel:</strong> +52 56 2119 3579</p>
          <p><strong>Email:</strong> an@neo-kodex.com</p>
          <p><strong>WhatsApp:</strong> +52 56 2119 3579</p>
          <p><strong>Horario:</strong> Lun-Vie 9:00 - 18:00</p>
        </Column>
        <Column>
          <h4>Empresa</h4>
          <ServiceList>
            <li><a href="#acerca">Nosotros</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#portafolio">Portafolio</a></li>
            <li><a href="#equipo">Equipo</a></li>
          </ServiceList>
        </Column>
      </FooterGrid>
      <BottomStrip>
        <BottomLinks>
          <span>© {new Date().getFullYear()} NEO-KODEX</span>
          <a href="/privacy.html">Política de privacidad</a>
          <a href="/terms.html">Términos de servicio</a>
          <SecurityBadge>
            <FaLock aria-hidden="true" /> SSL seguro
          </SecurityBadge>
        </BottomLinks>
        <MadeIn>Hecho en México 🇲🇽</MadeIn>
      </BottomStrip>
    </FooterWrapper>
  );
}

export default Footer;
