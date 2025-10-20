import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioProjects } from '../data/portfolio.js';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4.5rem);
  position: relative;
`;

const Header = styled.div`
  max-width: 820px;
  margin: 0 auto 3rem;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.2rem, 3vw + 1rem, 3.1rem);
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 2vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const Card = styled(motion.button)`
  position: relative;
  border: none;
  background: ${({ theme }) => theme.glass.background};
  border-radius: 1.8rem;
  overflow: hidden;
  padding: 0;
  text-align: left;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.glass.border};
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  isolation: isolate;
  display: grid;
  grid-template-rows: 220px 1fr;
  color: ${({ theme }) => theme.text};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const CardImage = styled.div`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.15);
    transition: transform 0.6s ease;
  }

  ${Card}:hover & img,
  ${Card}:focus-visible & img {
    transform: scale(1.08);
  }
`;

const CardBody = styled.div`
  padding: 1.8rem;
  display: grid;
  gap: 0.75rem;
`;

const CardMeta = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CardSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const ModalTitle = styled(CardTitle)`
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(12px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  z-index: 999;
`;

const ModalContent = styled(motion.div)`
  max-width: 720px;
  width: 100%;
  background: ${({ theme }) => theme.surface};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: clamp(1.5rem, 3vw, 2.5rem);
  box-shadow: 0 40px 80px rgba(5, 8, 16, 0.45);
  display: grid;
  gap: 1.25rem;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled.li`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  transition: background 0.3s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.accentSoft};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const DeliverableList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.35rem;
`;

function PortfolioSection() {
  const [activeId, setActiveId] = useState(null);
  const projectsById = useMemo(
    () => new Map(portfolioProjects.map((project) => [project.id, project])),
    []
  );

  const activeProject = activeId ? projectsById.get(activeId) : null;

  return (
    <Section id="portafolio" aria-labelledby="portafolio-title">
      <Header>
        <Title id="portafolio-title">Casos de éxito inmersivos</Title>
        <p>
          Explora proyectos que combinan IA, redes neuronales visuales y experiencias accesibles. Cada tarjeta revela un
          resumen detallado en un modal animado.
        </p>
      </Header>
      <Grid>
        {portfolioProjects.map((project) => (
          <Card
            key={project.id}
            type="button"
            onClick={() => setActiveId(project.id)}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            aria-haspopup="dialog"
            aria-controls="portfolio-modal"
          >
            <CardImage>
              <img src={project.cover} alt={project.title} loading="lazy" />
            </CardImage>
            <CardBody>
              <CardMeta>
                {project.sector} · {project.year}
              </CardMeta>
              <CardTitle>{project.title}</CardTitle>
              <CardSummary>{project.summary}</CardSummary>
            </CardBody>
          </Card>
        ))}
      </Grid>

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ModalHeader>
                <div>
                  <ModalTitle id={`portfolio-${activeProject.id}-title`}>
                    {activeProject.title}
                  </ModalTitle>
                  <CardMeta as="span">
                    {activeProject.sector} · {activeProject.year}
                  </CardMeta>
                </div>
                <CloseButton type="button" onClick={() => setActiveId(null)}>
                  Cerrar
                </CloseButton>
              </ModalHeader>
              <p id={`portfolio-${activeProject.id}-description`} style={{ margin: 0 }}>
                {activeProject.description}
              </p>
              <div>
                <strong>Entregables clave</strong>
                <DeliverableList>
                  {activeProject.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </DeliverableList>
              </div>
              <div>
                <strong>Tecnologías</strong>
                <TagList>
                  {activeProject.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </TagList>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default PortfolioSection;
