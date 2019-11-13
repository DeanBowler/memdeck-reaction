import * as React from 'react';
import styled from 'styled-components/macro';
import palette from '../palette';

const CardContainer = styled.div`
  display: flex;
  background: ${palette.grey5};
  border-radius: 8px;
  padding: 2px;
  border: 1px solid ${palette.grey90};
  box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.2);
`;

const CardPattern = styled.div`
  flex: 1 1 auto;

  border-radius: 5px;
  background: ${palette.primary} url('/images/card-backs/eye--aubergine.png');
  background-size: cover;
  margin: 5px;
`;

const DEFAULT_SIZE = { width: 125, height: 180 };
export interface CardBackProps {
  scale?: number;
}

const getScaledSize = (scale?: number) => ({
  width: DEFAULT_SIZE.width * (scale || 1),
  height: DEFAULT_SIZE.height * (scale || 1),
});

const CardBack = ({ scale }: CardBackProps) => (
  <CardContainer style={getScaledSize(scale)}>
    <CardPattern />
  </CardContainer>
);

export default CardBack;
