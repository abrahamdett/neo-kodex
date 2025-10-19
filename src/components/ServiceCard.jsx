import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import React from 'react';

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
`;

const IconWrapper = styled.div`
  display: inline-flex;
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  font-size: 1.75rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <Card
      whileHover={{ y: -8, rotate: -0.5 }}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      tabIndex={0}
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
  description: PropTypes.string.isRequired
};

export default React.memo(ServiceCard);
