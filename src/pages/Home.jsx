import Hero from '../components/Hero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import PortfolioSection from '../components/PortfolioSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import TeamSection from '../components/TeamSection.jsx';
import Testimonials from '../components/Testimonials.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import ContactSection from '../components/ContactSection.jsx';
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
      <PortfolioSection />
      <AboutSection />
      <WhyChooseUs />
      <TeamSection />
      <Testimonials />
      <BlogPreview />
      <ContactSection />
    </MainWrapper>
  );
}

export default Home;
