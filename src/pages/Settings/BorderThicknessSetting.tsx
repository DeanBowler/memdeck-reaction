import React from 'react';

import styled from 'styled-components/macro';

import { useSetting } from 'src/contexts/SettingsContext';
import CardBack from 'src/components/CardBack';
import { SettingsContainer } from './Common';
import ChoiceSetting from './ChoiceSetting';

const THICKNESSES = [0, 4, 6];

const CardBackPreview = styled.div`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
`;

export default function CardBackSettings() {
  const [thickness, setThickness] = useSetting('cardThickness');

  const handlePreviewClick = (thickness: number) => setThickness(thickness);

  return (
    <SettingsContainer>
      <h2>Border thickness</h2>
      <ChoiceSetting
        choices={THICKNESSES}
        current={thickness}
        onChoiceClick={handlePreviewClick}
        renderChoice={t => (
          <CardBackPreview onClick={() => handlePreviewClick(t)}>
            <CardBack thickness={t} />
          </CardBackPreview>
        )}
      />
    </SettingsContainer>
  );
}
