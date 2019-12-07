import * as React from 'react';
import styled from 'styled-components/macro';
import palette from '../style/palette';
import { useSetting } from 'src/contexts/SettingsContext';

const CardContainer = styled.div`
  display: flex;
  background: ${palette.grey5};
  border-radius: 8px;
  border: 1px solid ${palette.grey90};
  box-shadow: ${palette.boxShadow};
`;

interface CardPatternProps {
  backImage: string;
  thickness: number;
}

const CardPattern = styled.div<CardPatternProps>`
  flex: 1 1 auto;

  border-radius: 5px;
  background: ${palette.primary} url('/images/card-backs/${p => p.backImage}.jpg');
  background-size: cover;
  margin: ${p => p.thickness}%;
`;

const DEFAULT_SIZE = { width: 125, height: 180 };
export interface CardBackProps {
  scale?: number;
  backImage?: string;
  thickness?: number;
}

const getScaledSize = (scale?: number) => ({
  minWidth: DEFAULT_SIZE.width * (scale || 1),
  height: DEFAULT_SIZE.height * (scale || 1),
});

const CardBack = ({ scale, backImage, thickness }: CardBackProps) => {
  const [backImageFromSettings] = useSetting('cardback');
  const [thicknessFromSettings] = useSetting('cardThickness');

  return (
    <CardContainer style={getScaledSize(scale)}>
      <CardPattern
        thickness={thickness !== undefined ? thickness : thicknessFromSettings}
        backImage={backImage || backImageFromSettings}
      />
    </CardContainer>
  );
};

export default CardBack;
