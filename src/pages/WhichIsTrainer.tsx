import React, { useState, useCallback, useMemo, useEffect } from 'react';

import useEventListener from '@use-it/event-listener';
import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components/macro';

import palette from '../palette';
import { newTamariz, CardModel, shuffle } from '../deck-engine';
import { drawItemsFromRandomPoint } from '../deck-engine/random';
import CardStack from '../components/CardStack';
import Button from '../components/Button';

interface WhichIsQuestion {
  direction: 'previous' | 'next';
  clue: CardModel;
  answer: CardModel;
  dummyCards: CardModel[];
  started: Date;
}

interface Score {
  count: number;
  correct: number;
  totalMs: number;
}

const WhichIsTrainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1.5rem;
  color: ${palette.white};

  > * {
    display: flex;
    justify-content: center;
    flex: 1 1 33%;
  }
`;

const StartOrNextButton = styled(Button)`
  flex: 1 1 auto;
`;

const anyDeck = newTamariz();

const numberOfDummies = 3;

const getElapsed = (started: Date, ended = new Date()) =>
  `${Math.round(differenceInMilliseconds(ended, started) / 1000)}s`;

export default () => {
  const [currentQuestion, setCurrentQuestion] = useState<WhichIsQuestion>();

  const [answeredTime, setAnsweredTime] = useState<Date>();

  const [score, setScore] = useState<Score>({ correct: 0, count: 0, totalMs: 0 });

  const [timerValue, setTimerValue] = useState<string>();

  useEffect(() => {
    if (!currentQuestion) return;
    const interval = setInterval(() => {
      setTimerValue(getElapsed(currentQuestion.started, answeredTime));
    }, 250);
    return () => clearInterval(interval);
  }, [currentQuestion, answeredTime]);

  const secondRowCards = useMemo(
    () =>
      currentQuestion
        ? shuffle([currentQuestion.answer, ...currentQuestion.dummyCards])
        : anyDeck.slice(1, numberOfDummies + 2),
    [currentQuestion],
  );

  const handleStart = useCallback(() => {
    const newDeck = newTamariz();

    const drawSelection = (numberToDraw: number) =>
      drawItemsFromRandomPoint<CardModel>(numberToDraw, true, false)(newDeck);

    const [first, second] = drawSelection(2);

    setAnsweredTime(undefined);

    const [direction] = drawItemsFromRandomPoint<'next' | 'previous'>(1)([
      'next',
      'previous',
    ]);

    setCurrentQuestion({
      direction,
      clue: direction === 'next' ? first : second,
      answer: direction === 'next' ? second : first,
      dummyCards: drawSelection(numberOfDummies),
      started: new Date(),
    });
  }, []);

  const handleGuessCardClick = useCallback(
    (card: CardModel) => {
      if (!currentQuestion || answeredTime) return;
      const correct = currentQuestion.answer === card;

      const time = new Date();

      setScore({
        count: score.count + 1,
        correct: score.correct + (correct ? 1 : 0),
        totalMs: score.totalMs + differenceInMilliseconds(time, currentQuestion.started),
      });

      setAnsweredTime(time);
    },
    [currentQuestion, score, answeredTime],
  );

  const shownSecondRow =
    answeredTime && currentQuestion
      ? [currentQuestion.answer]
      : currentQuestion
      ? secondRowCards
      : [];

  useEventListener<React.KeyboardEvent>('keypress', event => {
    console.log(event);
    if (event.which === 32) handleStart();
    if (event.which >= 49 && event.which <= 57)
      handleGuessCardClick(secondRowCards[Number.parseInt(event.key) - 1]);
  });

  const nextOrPreviousText = currentQuestion
    ? `the ${currentQuestion.direction} card is:`
    : 'hit start!';

  return (
    <WhichIsTrainerContainer>
      <CardStack
        shownCards={currentQuestion ? [currentQuestion.clue] : []}
        cards={currentQuestion ? [currentQuestion.clue] : [anyDeck[0]]}
        cardScale={1.2}
        center={true}
      />

      <ToolsContainer>
        <div>{timerValue}</div>
        <div>
          <StartOrNextButton
            onClick={handleStart}
            disabled={currentQuestion && !answeredTime}
          >
            {!currentQuestion ? 'Start' : 'Next'}
          </StartOrNextButton>
        </div>
        <div>
          {score.count > 0 && (
            <>
              {score.correct}/{score.count} ({Math.round(score.totalMs / 1000)}s)
            </>
          )}
        </div>
      </ToolsContainer>
      <CardStack
        title={nextOrPreviousText}
        shownCards={shownSecondRow}
        cards={secondRowCards}
        cardScale={1}
        onCardClick={handleGuessCardClick}
        center={true}
      />
    </WhichIsTrainerContainer>
  );
};
