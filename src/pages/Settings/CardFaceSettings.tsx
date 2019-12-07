import React from 'react';

import styled from 'styled-components/macro';

import { useSetting, FaceStyles } from 'src/contexts/SettingsContext';
import { SettingsContainer } from './Common';
import ChoiceSetting from './ChoiceSetting';
import Card from 'src/components/Card';
import { CardSuit } from 'src/deck-engine';

const CardFaceStyles: FaceStyles[] = ['normal', 'simple'];

const CardFacePreview = styled.div`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
`;

export default function CardFaceSettings() {
  const [faceStyle, setFaceStyle] = useSetting('faceStyle');

  const handlePreviewClick = (style: FaceStyles) => setFaceStyle(style);

  return (
    <SettingsContainer>
      <h2>Card face style</h2>
      <ChoiceSetting
        choices={CardFaceStyles}
        current={faceStyle}
        onChoiceClick={handlePreviewClick}
        renderChoice={cb => (
          <CardFacePreview onClick={() => handlePreviewClick(cb)}>
            <Card model={{ number: 1, suit: CardSuit.Clubs }} faceStyle={cb} />
          </CardFacePreview>
        )}
      />
    </SettingsContainer>
  );
}
