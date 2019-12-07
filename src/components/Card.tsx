import * as React from 'react';
import styled from 'styled-components/macro';

import { CardModel, cardModelToPath } from 'src/deck-engine';
import palette from 'src/style/palette';
import { FaceStyles, useSetting } from 'src/contexts/SettingsContext';
import SimpleFace from './SimpleFace';

const DEFAULT_SIZE = { width: 125, height: 180 };

export interface CardProps {
  model: CardModel;
  scale?: number;
  faceStyle?: FaceStyles;
}

const CardContainer = styled.div`
  display: flex;
  background: ${palette.grey5} url('/images/card-textures/card-texture_2--lighter.jpg');
  background-size: cover;
  border-radius: 8px;
  border: 1px solid ${palette.grey90};
  height: 180px;
  box-shadow: ${palette.boxShadow};
  width: 125px;
`;

const CardImage = styled.img`
  display: block;
  height: 95%;
  margin: 2.5%;
`;

const getScaledSize = (scale?: number) => ({
  width: DEFAULT_SIZE.width * (scale || 1),
  height: DEFAULT_SIZE.height * (scale || 1),
});

const Card = ({ scale, model, faceStyle }: CardProps) => {
  const [faceStyleFromSettings] = useSetting('faceStyle');

  return (
    <CardContainer style={getScaledSize(scale)}>
      {(faceStyle || faceStyleFromSettings) === 'simple' ? (
        <SimpleFace scale={scale} model={model} />
      ) : (
        <CardImage src={cardModelToPath(model)} alt={model.suit} />
      )}
    </CardContainer>
  );
};

Card.defaultProps = {
  scale: 1,
};

export default Card;
