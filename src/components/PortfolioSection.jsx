import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiBookOpen, FiShield, FiShoppingBag, FiPackage,
  FiClipboard, FiUsers, FiMessageCircle, FiLayers
} from 'react-icons/fi';
import { portfolioProjects } from '../data/portfolio.js';
import { useAnalytics } from '../providers/AnalyticsProvider.jsx';
import { logCtaInteraction } from '../services/leadService.js';
import { useExperiment } from '../contexts/ExperimentContext.jsx';

const sectorIcons = {
  'Mystery shopping': FiClipboard,
  RRHH: FiUsers,
  'Automatización con IA': FiMessageCircle,
  Editorial: FiBookOpen,
  Seguridad: FiShield,
  Comercio: FiShoppingBag,
  Logística: FiPackage
};

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  position: relative;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.spacing.maxWidth};
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 600px;
  margin: 0 auto 56px;
  text-align: center;
  display: grid;
  gap: 14px;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 600;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.button)`
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  overflow: hidden;
  padding: 0;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: grid;
  grid-template-rows: auto 1fr;
  transition: all 250ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(99, 210, 140, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary};
    outline-offset: 3px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bg.secondary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease;
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 210, 140, 0.1) 0%, rgba(15, 15, 23, 0.4) 60%),
    ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 2.6rem;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
`;

const CardBody = styled.div`
  padding: 20px 24px 24px;
  display: grid;
  gap: 10px;
`;

const CardTag = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent.primary};
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
`;

const CardSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const StackChip = styled.span`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.6875rem;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SectionFooter = styled.div`
  margin-top: 56px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: grid;
  gap: 18px;
`;

const FooterActions = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  background: ${({ theme }) => theme.colors.gradient.cta};
  color: ${({ theme }) => theme.colors.bg.primary};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.gradient.ctaHover};
    box-shadow: 0 0 30px rgba(99, 210, 140, 0.3);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.spacing.buttonRadius};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 200ms ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 10, 0.72);
  backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 1100;
`;

const ModalContent = styled(motion.div)`
  max-width: 680px;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: clamp(1.6rem, 3vw, 2.5rem);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
  display: grid;
  gap: 1.25rem;
  max-height: 85vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
`;

const ModalTitle = styled.h3`
  font-size: 1.45rem;
  margin: 0 0 0.35rem;
`;

const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  transition: all 150ms ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

const ModalBlock = styled.div`
  display: grid;
  gap: 0.35rem;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const ModalLabel = styled.span`
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent.primary};
`;

const ImpactList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  li::marker {
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

const CardMeta = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.text.muted};
`;

function PortfolioSection() {
  const [activeId, setActiveId] = useState(null);
  const projectsById = useMemo(
    () => new Map(portfolioProjects.map((project) => [project.id, project])),
    []
  );
  const { trackEvent } = useAnalytics();
  const { variant } = useExperiment();

  const activeProject = activeId ? projectsById.get(activeId) : null;

  return (
    <Section id="portafolio" aria-labelledby="portafolio-title">
      <Container>
        <Header>
          <Eyebrow>Trabajo para clientes</Eyebrow>
          <Title id="portafolio-title">Proyectos que hablan por nosotros</Title>
          <Subtitle>
            Cómo hemos ayudado a empresas reales a resolver problemas concretos con software
            a la medida, apps móviles e infraestructura.
          </Subtitle>
        </Header>
        <Grid>
          {portfolioProjects.map((project) => {
            const Icon = sectorIcons[project.sector] ?? FiLayers;
            return (
              <Card
                key={project.id}
                type="button"
                onClick={() => setActiveId(project.id)}
                whileTap={{ scale: 0.99 }}
                aria-haspopup="dialog"
                aria-controls="portfolio-modal"
              >
                <ImageWrapper>
                  {project.cover ? (
                    <img src={project.cover} alt={project.title} loading="lazy" />
                  ) : (
                    <Placeholder aria-hidden="true">
                      <Icon />
                    </Placeholder>
                  )}
                </ImageWrapper>
                <CardBody>
                  <CardTag>{(project.client ?? project.sector)} · {project.year}</CardTag>
                  <CardTitle>{project.title}</CardTitle>
                  <CardSummary>{project.summary}</CardSummary>
                  {project.stack ? (
                    <StackRow>
                      {project.stack.slice(0, 4).map((tech) => (
                        <StackChip key={tech}>{tech}</StackChip>
                      ))}
                    </StackRow>
                  ) : null}
                </CardBody>
              </Card>
            );
          })}
        </Grid>
        <SectionFooter>
          ¿Quieres resultados similares para tu empresa?
          <FooterActions>
            <PrimaryButton
              href="#contacto"
              onClick={() => {
                trackEvent({ action: 'cta_cotizacion_portafolio', category: 'cta_intermedia', label: 'cta-portafolio-footer' });
                logCtaInteraction({ location: 'cta-portafolio-footer', variant, intent: 'cta_cotizacion_portafolio' }).catch(() => {});
              }}
            >
              Solicitar cotización
            </PrimaryButton>
            <SecondaryButton
              href="https://wa.me/5215621193579"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent({ action: 'cta_whatsapp_portafolio', category: 'cta_intermedia', label: 'cta-portafolio-footer' });
                logCtaInteraction({ location: 'cta-portafolio-footer', variant, intent: 'cta_whatsapp_portafolio' }).catch(() => {});
              }}
            >
              Escríbenos por WhatsApp
            </SecondaryButton>
          </FooterActions>
        </SectionFooter>
      </Container>

      <AnimatePresence>
        {activeProject && (
          <ModalOverlay
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <ModalContent
              id="portfolio-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`portfolio-${activeProject.id}-title`}
              aria-describedby={`portfolio-${activeProject.id}-description`}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ModalHeader>
                <div>
                  <ModalTitle id={`portfolio-${activeProject.id}-title`}>
                    {activeProject.title}
                  </ModalTitle>
                  <CardMeta>
                    {activeProject.client ? `${activeProject.client} · ` : ''}{activeProject.sector} · {activeProject.year}
                  </CardMeta>
                </div>
                <CloseButton type="button" onClick={() => setActiveId(null)}>
                  Cerrar
                </CloseButton>
              </ModalHeader>
              <ModalBlock>
                <ModalLabel>Reto</ModalLabel>
                <p id={`portfolio-${activeProject.id}-description`}>
                  {activeProject.challenge}
                </p>
              </ModalBlock>
              <ModalBlock>
                <ModalLabel>Solución</ModalLabel>
                <p>{activeProject.solution}</p>
              </ModalBlock>
              <ModalBlock>
                <ModalLabel>Resultado</ModalLabel>
                <p>{activeProject.result}</p>
              </ModalBlock>
              <ModalBlock>
                <ModalLabel>Impacto destacado</ModalLabel>
                <ImpactList>
                  {activeProject.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ImpactList>
              </ModalBlock>
              {activeProject.stack ? (
                <ModalBlock>
                  <ModalLabel>Stack</ModalLabel>
                  <StackRow>
                    {activeProject.stack.map((tech) => (
                      <StackChip key={tech}>{tech}</StackChip>
                    ))}
                  </StackRow>
                </ModalBlock>
              ) : null}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default PortfolioSection;
