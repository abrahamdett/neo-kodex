import styled from 'styled-components';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team.js';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4.5rem);
  background: ${({ theme }) => theme.surfaceSecondary};
`;

const Header = styled.div`
  max-width: 760px;
  margin: 0 auto 3rem;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.1rem, 3vw + 1rem, 3rem);
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 2vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const SectionFooter = styled.div`
  margin-top: clamp(2.5rem, 4vw, 3.5rem);
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.glass.background};
  border-radius: 1.75rem;
  border: 1px solid ${({ theme }) => theme.glass.border};
  padding: 2rem 1.5rem 2.25rem;
  backdrop-filter: blur(22px);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  display: grid;
  gap: 1.1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const AvatarWrapper = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${Card}:hover & img,
  ${Card}:focus-visible & img {
    transform: scale(1.08);
  }
`;

const SpecialtyList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const Specialty = styled.li`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
`;

const Role = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
`;

const Bio = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

function TeamSection() {
  return (
    <Section id="equipo" aria-labelledby="equipo-title">
      <Header>
        <Title id="equipo-title">Equipo y cultura</Title>
        <p>
          Somos un equipo multidisciplinario movido por la ética, la curiosidad y la colaboración. Cada perfil muestra cómo
          conectamos talento humano con resultados sostenibles.
        </p>
      </Header>
      <Grid>
        {teamMembers.map((member, index) => (
          <Card
            key={member.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            tabIndex={0}
          >
            <AvatarWrapper>
              <img src={member.avatar} alt={`Retrato de ${member.name}`} loading="lazy" />
            </AvatarWrapper>
            <div>
              <h3 style={{ margin: '0 0 0.35rem 0' }}>{member.name}</h3>
              <Role>{member.role}</Role>
            </div>
            <Bio>{member.bio}</Bio>
            <SpecialtyList>
              {member.specialties.map((item) => (
                <Specialty key={item}>{item}</Specialty>
              ))}
            </SpecialtyList>
          </Card>
        ))}
      </Grid>
      <SectionFooter>
        ¿Con quién de nosotros te gustaría co-crear tu próxima iniciativa?
      </SectionFooter>
    </Section>
  );
}

export default TeamSection;
