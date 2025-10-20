import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts.js';

const Wrapper = styled.section`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem);
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
`;

const Header = styled.header`
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
  display: grid;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const ArticleCard = styled(motion(Link))`
  display: grid;
  grid-template-rows: 220px 1fr;
  background: ${({ theme }) => theme.glass.background};
  border-radius: 1.6rem;
  overflow: hidden;
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

const Cover = styled.div`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${ArticleCard}:hover & img,
  ${ArticleCard}:focus-visible & img {
    transform: scale(1.08);
  }
`;

const ArticleBody = styled.div`
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: grid;
  gap: 0.75rem;
`;

const Meta = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
`;

const TagList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.li`
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  font-size: 0.75rem;
`;

const ArticleTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const ArticleExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

function Blog() {
  return (
    <Wrapper>
      <Header>
        <h1>Blog & Recursos</h1>
        <p>
          Historias, tendencias y guías prácticas que documentan cómo NEO-KODEX fusiona IA, glassmorphism, bento grids y
          estrategias de accesibilidad. Aquí se conectará el CMS o repositorio de Markdown para publicar nuevos artículos.
        </p>
      </Header>
      <Grid>
        {blogPosts.map((post, index) => (
          <ArticleCard
            key={post.id}
            to={`/blog/${post.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <Cover>
              <img src={post.heroImage} alt={post.title} loading="lazy" />
            </Cover>
            <ArticleBody>
              <Meta>
                {new Date(post.date).toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}{' '}
                · {post.readingTime}
              </Meta>
              <ArticleTitle>{post.title}</ArticleTitle>
              <ArticleExcerpt>{post.excerpt}</ArticleExcerpt>
              <TagList>
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
            </ArticleBody>
          </ArticleCard>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Blog;
