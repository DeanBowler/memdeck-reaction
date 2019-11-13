import * as React from 'react';
import { CardModel, cardModelToPath } from '../deck-engine';
import styled from 'styled-components/macro';
import palette from '../palette';

const DEFAULT_SIZE = { width: 125, height: 180 };

export interface CardProps {
  model: CardModel;
  scale?: number;
}

const CardContainer = styled.div`
  background: ${palette.grey5} url('/images/card-textures/card-texture_2--lighter.jpg');
  background-size: cover;
  border-radius: 8px;
  padding: 2px;
  border: 1px solid ${palette.grey90};
  height: 180px;
  box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.2);
  width: 125px;
`;

const CardImage = styled.img`
  display: block;
  height: 100%;
`;

const getScaledSize = (scale?: number) => ({
  width: DEFAULT_SIZE.width * (scale || 1),
  height: DEFAULT_SIZE.height * (scale || 1),
});

const Card = ({ scale, model }: CardProps) => (
  <CardContainer style={getScaledSize(scale)}>
    <CardImage src={cardModelToPath(model)} alt={model.suit} />
  </CardContainer>
);

Card.defaultProps = {
  scale: 1,
};

export default Card;
