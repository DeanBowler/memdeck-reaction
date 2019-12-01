import React from 'react';
import CardBack from 'src/components/CardBack';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { useSetting } from 'src/contexts/SettingsContext';

const SettingsContainer = styled.div`
  margin: 1rem 0;
`;

const CARD_BACKS = [
  'bicycle--blue',
  'bicycle--red',
  'eye--aubergine',
  'bicycle-thistle--blue',
];

const CardBacksContainer = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 5px;

  & > * {
    margin-right: 1rem;
  }
`;

const CardBackPreview = styled.button<{ current: boolean }>`
  position: relative;
  cursor: pointer;
  background: none;
  border: none;

  padding-bottom: 10px;

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

function CardBackSettings() {
  const [cardback, setCardback] = useSetting('cardback');

  const handlePreviewClick = (image: string) => setCardback(image);

  return (
    <SettingsContainer>
      <h2>Card back image</h2>
      <CardBacksContainer>
        {CARD_BACKS.map(cb => (
          <CardBackPreview
            current={cb === cardback}
            key={cb}
            onClick={() => handlePreviewClick(cb)}
          >
            <CardBack backImage={cb} />
          </CardBackPreview>
        ))}
      </CardBacksContainer>
    </SettingsContainer>
  );
}

export default function Settings() {
  return (
    <>
      <Helmet title="Settings" />
      <div>
        <h1>Settings</h1>
        <CardBackSettings />
      </div>
    </>
  );
}
