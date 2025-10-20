import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';

const IconWrapper = styled(motion.div)`
  display: inline-flex;
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08));
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 18px 28px rgba(0, 0, 0, 0.2);
  transform: translateZ(0);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 18px;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), transparent 65%);
    opacity: 0.7;
    transition: opacity 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -40%;
    background: conic-gradient(from 90deg, ${({ theme }) => theme.accent}, transparent 70%);
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  background: ${({ theme }) => theme.glass.background};
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: clamp(1.2rem, 2vw, 1.8rem);
  padding: clamp(1.5rem, 2.2vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  height: 100%;
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--card-gradient, linear-gradient(135deg, rgba(127, 90, 240, 0.25), transparent 70%));
    opacity: 0.9;
    z-index: -2;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 55%);
    z-index: -1;
  }

  &:hover ${IconWrapper},
  &:focus-visible ${IconWrapper} {
    transform: rotate(-6deg) translateY(-6px) scale(1.05);
  }

  &:hover ${IconWrapper}::after,
  &:focus-visible ${IconWrapper}::after {
    opacity: 0.65;
  }

  &:hover ${IconWrapper}::before,
  &:focus-visible ${IconWrapper}::before {
    opacity: 1;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

function ServiceCard({ icon: Icon, title, description, className, ...motionProps }) {
  return (
    <Card
      whileHover={{ y: -10, rotateX: -2, rotateY: 1.5 }}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      tabIndex={0}
      className={className}
      {...motionProps}
    >
      <IconWrapper
        aria-hidden="true"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon />
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

ServiceCard.defaultProps = {
  className: undefined
};

export default React.memo(ServiceCard);
