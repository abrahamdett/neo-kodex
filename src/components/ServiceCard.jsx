import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Card = styled(motion.button)`
  position: relative;
  background: ${({ theme }) => theme.colors.bg.card};
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.spacing.cardRadius};
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
  text-align: left;
  cursor: pointer;
  color: inherit;
  overflow: hidden;
  transition: all 250ms ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99, 210, 140, 0.5), transparent);
    opacity: 0;
    transition: opacity 250ms ease;
  }

  &:hover,
  &:focus-visible {
    border-color: rgba(99, 210, 140, 0.2);
    background: ${({ theme }) => theme.colors.bg.cardHover};
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary};
    outline-offset: 3px;
  }
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  background: rgba(99, 210, 140, 0.1);
  border: 1px solid rgba(99, 210, 140, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: 1.2rem;
`;

const Title = styled.h3`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.65;
  margin-bottom: 20px;
`;

const CardLink = styled.span`
  margin-top: auto;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.accent.primary};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  opacity: 0.85;
  transition: opacity 150ms ease;

  ${Card}:hover &,
  ${Card}:focus-visible & {
    opacity: 1;
  }
`;

function ServiceCard({ icon: Icon, title, description, className, onSelect, ...motionProps }) {
  return (
    <Card
      type="button"
      className={className}
      onClick={onSelect}
      aria-label={`Conoce más sobre ${title}`}
      {...motionProps}
    >
      <IconBox aria-hidden="true">
        <Icon />
      </IconBox>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CardLink>
        Conoce cómo lo hacemos
        <FiArrowRight aria-hidden="true" />
      </CardLink>
    </Card>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  onSelect: PropTypes.func
};

ServiceCard.defaultProps = {
  className: undefined,
  onSelect: undefined
};

export default React.memo(ServiceCard);
