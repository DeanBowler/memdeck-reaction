import * as React from 'react';
import styled from 'styled-components/macro';

import { CardModel, CardSuit, shortValueName } from 'src/deck-engine';

const SimpleFaceContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  text-align: initial;
`;

const SimpleFaceNumberContainer = styled.div`
  flex: 0 1 auto;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const SimpleFaceNumber = styled.div`
  font-family: 'Arial', 'Times New Roman', Times, serif;
  color: black;
  margin-left: 10%;
  font-size: 5rem;
  line-height: 1em;
`;

const SimpleFaceSuitContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const SuitImageContainer = styled.img`
  position: absolute;
  height: 90%;
  right: 5%;
`;

const suitImageSrc = (suit: CardSuit) => {
  const suitImageName = suit.slice(0, -1);
  return `/images/card-suits/${suitImageName}.svg`;
};

const SuitImage = ({ suit }: { suit: CardSuit }) => (
  <SuitImageContainer src={suitImageSrc(suit)} />
);

const SimpleFace = ({
  model,
  scale,
}: {
  model: CardModel;
  scale: number | undefined;
}) => (
  <SimpleFaceContainer>
    <SimpleFaceNumberContainer>
      <SimpleFaceNumber style={{ fontSize: `${5 * (scale || 0)}rem` }}>
        {shortValueName(model.number)}
      </SimpleFaceNumber>
    </SimpleFaceNumberContainer>
    <SimpleFaceSuitContainer>
      <SuitImage suit={model.suit} />
    </SimpleFaceSuitContainer>
  </SimpleFaceContainer>
);

export default SimpleFace;
