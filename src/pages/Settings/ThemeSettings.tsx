import React from 'react';
import styled from 'styled-components/macro';

import { useSetting, BackgroundTheme } from 'src/contexts/SettingsContext';
import { SettingsContainer } from './Common';
import ChoiceSetting from './ChoiceSetting';

const backgrounds = [
  { name: "dealer's green", start: '#1a3a20', end: '#446f44' },
  { name: 'sunset', start: '#412956', end: '#6f4444' },
  { name: 'under the sea', start: '#294b56', end: '#4c446f' },
  { name: "dealer's black", start: '#131313', end: '#3f3f3f' },
  { name: "dealer's blood", start: '#772424', end: '#352222' },
  { name: 'fields of wheat', start: '#626c2e', end: '#355b48' },
];

const BackgroundPicker = styled.div<{ start: string; end: string }>`
  width: 5rem;
  height: 5rem;
  background: linear-gradient(${p => p.start}, ${p => p.end});

  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  outline: none;
`;

export default function ThemeSettings() {
  const [theme, setTheme] = useSetting('theme');

  const handleClick = (backgroundTheme: BackgroundTheme) =>
    setTheme({ ...theme, ...{ background: backgroundTheme } });

  return (
    <SettingsContainer>
      <h2>Background Theme</h2>
      <div>
        <ChoiceSetting
          current={theme.background}
          choices={backgrounds}
          onChoiceClick={handleClick}
          renderChoice={choice => <BackgroundPicker {...choice} />}
        />
      </div>
    </SettingsContainer>
  );
}
