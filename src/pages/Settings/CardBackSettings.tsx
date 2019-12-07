import React from 'react';

import styled from 'styled-components/macro';

import { useSetting } from 'src/contexts/SettingsContext';
import CardBack from 'src/components/CardBack';
import { SettingsContainer } from './Common';
import ChoiceSetting from './ChoiceSetting';

const CARD_BACKS = [
  'eye--aubergine',
  'bicycle--blue',
  'bicycle--red',
  'bicycle-thistle--blue',
];

const CardBackPreview = styled.div`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
`;

export default function CardBackSettings() {
  const [cardback, setCardback] = useSetting('cardback');

  const handlePreviewClick = (image: string) => setCardback(image);

  return (
    <SettingsContainer>
      <h2>Card back image</h2>
      <ChoiceSetting
        choices={CARD_BACKS}
        current={cardback}
        onChoiceClick={handlePreviewClick}
        renderChoice={cb => (
          <CardBackPreview onClick={() => handlePreviewClick(cb)}>
            <CardBack backImage={cb} />
          </CardBackPreview>
        )}
      />
    </SettingsContainer>
  );
}
