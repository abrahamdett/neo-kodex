import styled from 'styled-components';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/team.js';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.sectionY} 24px;
  background: ${({ theme }) => theme.colors.bg.secondary};
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
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 320px));
  justify-content: center;
`;

const SectionFooter = styled.div`
  margin-top: 48px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.bg.card};
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  border: 1px solid rgba(255, 255, 255, 0.07);
  padding: 32px 24px;
  display: grid;
  gap: 14px;
  text-align: center;
  transition: all 250ms ease;

  &:hover {
    border-color: rgba(99, 210, 140, 0.2);
    background: ${({ theme }) => theme.colors.bg.cardHover};
    transform: translateY(-2px);
  }
`;

const AvatarInitials = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 210, 140, 0.2), rgba(99, 210, 140, 0.05));
  border: 1px solid rgba(99, 210, 140, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent.primary};
  margin: 0 auto 4px;
`;

const AvatarPhoto = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(99, 210, 140, 0.3);
  margin: 0 auto 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.05rem;
`;

const Role = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const Bio = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const SkillList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const SkillChip = styled.li`
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function TeamSection() {
  return (
    <Section id="equipo" aria-labelledby="equipo-title">
      <Container>
        <Header>
          <Eyebrow>Quién está detrás</Eyebrow>
          <Title id="equipo-title">Quién construye tu proyecto</Title>
          <Subtitle>
            NEO-KODEX lo lleva un responsable de punta a punta: hablas siempre con quien
            diseña, desarrolla y da soporte a tu software. Sin intermediarios.
          </Subtitle>
        </Header>
        <Grid>
          {teamMembers.map((member, index) => (
            <Card
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {member.avatar ? (
                <AvatarPhoto>
                  <img src={member.avatar} alt={`Retrato de ${member.name}`} loading="lazy" />
                </AvatarPhoto>
              ) : (
                <AvatarInitials aria-hidden="true">{getInitials(member.name)}</AvatarInitials>
              )}
              <div>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
              </div>
              <Bio>{member.bio}</Bio>
              <SkillList>
                {member.specialties.map((item) => (
                  <SkillChip key={item}>{item}</SkillChip>
                ))}
              </SkillList>
            </Card>
          ))}
        </Grid>
        <SectionFooter>
          ¿Listo para platicar tu proyecto directamente con quien lo va a construir?
        </SectionFooter>
      </Container>
    </Section>
  );
}

export default TeamSection;
