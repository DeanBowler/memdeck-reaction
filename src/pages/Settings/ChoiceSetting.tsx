import React from 'react';
import styled from 'styled-components';

import { equals } from 'ramda';

interface ChoiceSettingProps<TSetting> {
  choices: TSetting[];
  current: TSetting;
  onChoiceClick(choice: TSetting): void;
  renderChoice(choice: TSetting): React.ReactNode;
}

const ChoicesContainer = styled.div`
  display: flex;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 5px;

  &:after {
    content: '';
    flex: 0 0 0.5rem;
  }

  & > * {
    margin-right: 1rem;
  }
`;

const ChoiceButton = styled.button<{ current: boolean }>`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  :after {
    content: '';
    width: 50%;
    height: 5px;
    bottom: -0.25rem;
    left: 25%;
    position: absolute;
    background-color: white;
    opacity: ${p => (p.current ? 1 : 0)};
    border-radius: 5px;
  }

  :hover {
    :after {
      opacity: ${p => (p.current ? 1 : 0.5)};
    }
  }
`;

export default function ChoiceSetting<TSetting>({
  current,
  onChoiceClick,
  choices,
  renderChoice,
}: ChoiceSettingProps<TSetting>) {
  return (
    <ChoicesContainer>
      {choices.map((c, i) => (
        <ChoiceButton
          key={i}
          current={equals(c, current)}
          onClick={() => onChoiceClick(c)}
        >
          {renderChoice(c)}
        </ChoiceButton>
      ))}
    </ChoicesContainer>
  );
}
