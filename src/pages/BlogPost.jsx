import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts.js';

const ArticleWrapper = styled.article`
  padding: clamp(4.5rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem);
  max-width: 820px;
  margin: 0 auto;
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
`;

const Cover = styled.figure`
  margin: 0;
  border-radius: 1.8rem;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.glass.border};
  box-shadow: ${({ theme }) => theme.glass.shadow};

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  figcaption {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textSecondary};
    padding: 0.85rem 1.2rem;
    background: ${({ theme }) => theme.glass.background};
  }
`;

const BackLink = styled(Link)`
  justify-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
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

const TagList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.accentSoft};
  font-size: 0.75rem;
`;

const ArticleMeta = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const FooterNote = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.id === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <ArticleWrapper as={motion.article} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <BackLink to="/blog">← Volver al listado</BackLink>
      <header>
        <h1>{post.title}</h1>
        <ArticleMeta>
          {new Date(post.date).toLocaleDateString('es-MX', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}{' '}
          · {post.readingTime}
        </ArticleMeta>
        <TagList>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      </header>
      <Cover>
        <img src={post.heroImage} alt={`Portada del artículo ${post.title}`} loading="lazy" />
        <figcaption>
          Visual generado con herramientas de IA para ilustrar el enfoque tecnológico del artículo.
        </figcaption>
      </Cover>
      <section>
        {post.content.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>
      <footer>
        <FooterNote>
          ¿Quieres recibir estas ideas directamente en tu bandeja? Integra tu CMS favorito o Markdown siguiendo la nota en
          <code style={{ fontFamily: 'monospace', padding: '0 0.25rem' }}>src/data/blogPosts.js</code>.
        </FooterNote>
      </footer>
    </ArticleWrapper>
  );
}

export default BlogPost;
