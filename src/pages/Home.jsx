import Hero from '../components/Hero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import PortfolioSection from '../components/PortfolioSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import TeamSection from '../components/TeamSection.jsx';
import Testimonials from '../components/Testimonials.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
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
  return (
    <MainWrapper>
      <Hero />
      <ServicesSection />
      <InlineCTA
        id="cta-servicios"
        title="Agenda una consultoría táctica"
        description="En 45 minutos identificamos quick wins, definimos métricas de éxito y te compartimos un roadmap personalizado."
        primary={{
          label: 'Reserva diagnóstico gratuito',
          href: '#contacto',
          analyticsAction: 'cta_diagnostico_servicios',
          intent: 'cta_diagnostico_servicios'
        }}
        secondary={{
          label: 'Descargar guía de descubrimiento',
          href: '#recursos',
          analyticsAction: 'cta_descarga_servicios',
          intent: 'cta_descarga_servicios'
        }}
      />
      <PortfolioSection />
      <AboutSection />
      <WhyChooseUs />
      <TrustSection />
      <TeamSection />
      <Testimonials />
      <InlineCTA
        id="cta-testimonios"
        title="¿Listo para construir tu siguiente caso de éxito?"
        description="Nuestro equipo acompaña la implementación end-to-end con métricas de retención, activación y NPS en cada sprint."
        primary={{
          label: 'Solicitar propuesta personalizada',
          href: '#contacto',
          analyticsAction: 'cta_propuesta_testimonios',
          intent: 'cta_propuesta_testimonios'
        }}
        secondary={{
          label: 'Ver más historias en el blog',
          href: '/blog',
          analyticsAction: 'cta_blog_testimonios',
          intent: 'cta_blog_testimonios'
        }}
      />
      <BlogPreview />
      <ContactSection />
    </MainWrapper>
  );
}

export default Home;
