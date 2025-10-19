import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';

const IconWrapper = styled.div`
  display: inline-flex;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
  color: ${({ theme }) => theme.accent};
  font-size: 1.85rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
  transform: translateZ(0);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease;
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
    transform: rotate(-8deg) scale(1.07);
    filter: drop-shadow(0 12px 18px rgba(127, 90, 240, 0.3));
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
      whileHover={{ y: -8, rotate: -0.5 }}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      tabIndex={0}
      className={className}
      {...motionProps}
    >
      <IconWrapper aria-hidden="true">
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
