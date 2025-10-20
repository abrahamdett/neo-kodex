import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts.js';

const Section = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4.5rem);
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2.1rem, 3vw + 1rem, 3rem);
`;

const LinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const SectionFooter = styled.div`
  margin-top: clamp(2rem, 3vw, 3rem);
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 600;
`;

const Card = styled(motion(Link))`
  display: grid;
  gap: 0.85rem;
  background: ${({ theme }) => theme.glass.background};
  border-radius: 1.6rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid ${({ theme }) => theme.glass.border};
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  backdrop-filter: blur(18px);
  isolation: isolate;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }
`;

const Meta = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
`;

const CardTitle = styled.h3`
  margin: 0;
`;

const CardExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

function BlogPreview() {
  const featured = blogPosts.slice(0, 3);

  return (
    <Section id="recursos" aria-labelledby="recursos-title">
      <Header>
        <div>
          <Title id="recursos-title">Recursos destacados</Title>
          <p style={{ margin: 0 }}>
            Conecta con guías prácticas y tendencias sobre experiencias inmersivas responsables. Cada artículo responde a
            preguntas frecuentes de nuestros clientes.
          </p>
        </div>
        <LinkButton to="/blog">Ver todos</LinkButton>
      </Header>
      <Grid>
        {featured.map((post, index) => (
          <Card
            key={post.id}
            to={`/blog/${post.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <Meta>
              {new Date(post.date).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: 'short'
              })}{' '}
              · {post.readingTime}
            </Meta>
            <CardTitle>{post.title}</CardTitle>
            <CardExcerpt>{post.excerpt}</CardExcerpt>
          </Card>
        ))}
      </Grid>
      <SectionFooter>¿Qué tema te gustaría que abordemos en la próxima publicación?</SectionFooter>
    </Section>
  );
}

export default BlogPreview;
