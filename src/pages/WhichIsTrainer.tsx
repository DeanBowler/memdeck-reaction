import React, { useState, useCallback, useMemo, useEffect } from 'react';

import useEventListener from '@use-it/event-listener';
import { differenceInSeconds } from 'date-fns';
import styled from 'styled-components';

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
  totalSeconds: number;
}

const WhichIsTrainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  font-size: 1.5rem;
  color: ${palette.white};
`;

const getElapsed = (started: Date, ended = new Date()) =>
  `${differenceInSeconds(ended, started)} seconds`;

export default () => {
  const [currentQuestion, setCurrentQuestion] = useState<WhichIsQuestion>();

  const [answeredTime, setAnsweredTime] = useState<Date>();

  const [score, setScore] = useState<Score>({ correct: 0, count: 0, totalSeconds: 0 });

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
        : [],
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
      dummyCards: drawSelection(3),
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
        totalSeconds:
          score.totalSeconds + differenceInSeconds(time, currentQuestion.started),
      });

      setAnsweredTime(time);
    },
    [currentQuestion, score, answeredTime],
  );

  const shownSecondRow =
    answeredTime && currentQuestion ? [currentQuestion.answer] : secondRowCards;

  useEventListener<React.KeyboardEvent>('keypress', event => {
    console.log(event);
    if (event.which === 32) handleStart();
    if (event.which >= 49 && event.which <= 57)
      handleGuessCardClick(secondRowCards[Number.parseInt(event.key) - 1]);
  });

  const nextOrPreviousText =
    currentQuestion && `The ${currentQuestion.direction} card is:`;

  return (
    <WhichIsTrainerContainer>
      <CardStack
        shownCards={currentQuestion && [currentQuestion.clue]}
        cards={currentQuestion ? [currentQuestion.clue] : []}
        cardScale={1.2}
        center={true}
      />

      <ToolsContainer>
        <div>{timerValue}</div>
        <Button onClick={handleStart} disabled={currentQuestion && !answeredTime}>
          Start
        </Button>
        <div>
          {score.correct}/{score.count} ({score.totalSeconds}s)
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
