import React, { useState, useCallback } from 'react';
import { symmetricDifference } from 'ramda';
import styled from 'styled-components/macro';

import { newTamariz, CardModel } from 'src/deck-engine';
import { drawItemsFromRandomPoint } from 'src/deck-engine/random';
import ActionsContainer from 'src/components/ActionsContainer';
import Button from 'src/components/Button';
import CardStack from 'src/components/CardStack';
import Input from 'src/components/Input';

const tamarizDeck = newTamariz();

const drawCardsTamariz = (numberToDraw: number) =>
  drawItemsFromRandomPoint<CardModel>(numberToDraw)(tamarizDeck);

const OneShotTrainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const OneShotTrainer = () => {
  const [numberToDraw, setNumberToDraw] = useState(3);
  const [drawnCards, setDrawnCards] = useState(drawCardsTamariz(numberToDraw));
  const [shownCards, setShownCards] = useState<CardModel[]>([drawnCards[1]]);

  const redraw = useCallback(() => {
    const drawn = drawCardsTamariz(numberToDraw);
    setDrawnCards(drawn);
    const show = drawn[Math.floor(numberToDraw / 2)];
    setShownCards([show]);
  }, [numberToDraw]);

  const onCardClick = useCallback(
    (card: CardModel) => {
      setShownCards(symmetricDifference([card], shownCards));
    },
    [shownCards],
  );

  const onNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number.parseInt(e.target.value) || 0;
    setNumberToDraw(inputValue);
  }, []);

  return (
    <OneShotTrainerContainer>
      <ActionsContainer>
        <Input
          type="number"
          onChange={onNumberChange}
          value={numberToDraw}
          style={{ width: '2rem' }}
        />
        <Button onClick={redraw}>Redraw</Button>
      </ActionsContainer>
      <CardStack
        shownCards={shownCards}
        cards={drawnCards}
        initialCardScale={1.5}
        onCardClick={onCardClick}
      />
    </OneShotTrainerContainer>
  );
};

export default OneShotTrainer;
