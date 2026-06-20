import Hero from '../components/Hero.jsx';
import HumanConnection from '../components/HumanConnection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import ProductsSection from '../components/ProductsSection.jsx';
import PortfolioSection from '../components/PortfolioSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import TeamSection from '../components/TeamSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import InlineCTA from '../components/InlineCTA.jsx';
import TrustSection from '../components/TrustSection.jsx';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

function Home() {
  usePageMeta({});
  return (
    <MainWrapper>
      <Hero />
      <HumanConnection />
      <ServicesSection />
      <InlineCTA
        id="cta-servicios"
        title="¿Necesitas una cotización personalizada?"
        description="Cuéntanos tu proyecto y en menos de 24 horas te enviamos una propuesta detallada con costos y tiempos de entrega."
        primary={{
          label: 'Solicitar cotización gratis',
          href: '#contacto',
          analyticsAction: 'cta_cotizacion_servicios',
          intent: 'cta_cotizacion_servicios'
        }}
        secondary={{
          label: 'Llamar ahora',
          href: 'tel:+525621193579',
          analyticsAction: 'cta_llamar_servicios',
          intent: 'cta_llamar_servicios'
        }}
      />
      <ProductsSection />
      <PortfolioSection />
      <AboutSection />
      <WhyChooseUs />
      <TrustSection />
      <TeamSection />
      <InlineCTA
        id="cta-testimonios"
        title="¿Listo para transformar tu empresa con tecnología?"
        description="Cuéntanos tu idea y trabajemos juntos en el software, soporte técnico e infraestructura que tu empresa necesita."
        primary={{
          label: 'Contáctanos hoy',
          href: '#contacto',
          analyticsAction: 'cta_contacto_testimonios',
          intent: 'cta_contacto_testimonios'
        }}
        secondary={{
          label: 'Escríbenos por WhatsApp',
          href: 'https://wa.me/5215621193579',
          analyticsAction: 'cta_whatsapp_testimonios',
          intent: 'cta_whatsapp_testimonios'
        }}
      />
      <ContactSection />
    </MainWrapper>
  );
}

export default Home;
