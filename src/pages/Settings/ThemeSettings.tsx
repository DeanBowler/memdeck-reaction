import React from 'react';
import { useSetting, BackgroundTheme } from 'src/contexts/SettingsContext';
import { SettingsContainer } from './Common';
import styled from 'styled-components/macro';
import ChoiceSetting from './ChoiceSetting';

const backgrounds = [
  {
    start: '#1a3a20',
    end: '#446f44',
  },
  {
    start: '#412956',
    end: '#6f4444',
  },
  {
    start: '#294b56',
    end: '#4c446f',
  },
  {
    start: '#131313',
    end: '#3f3f3f',
  },
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
