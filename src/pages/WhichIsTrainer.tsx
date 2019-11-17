import React, { useState, useCallback, useMemo, useEffect } from 'react';

import useEventListener from '@use-it/event-listener';
import { differenceInMilliseconds } from 'date-fns';
import styled from 'styled-components/macro';

import palette from '../palette';
import { newTamariz, CardModel, shuffle } from '../deck-engine';
import { drawItemsFromRandomPoint } from '../deck-engine/random';
import CardStack from '../components/CardStack';
import Button from '../components/Button';
import Input from '../components/Input';
import { useLocalStorage } from 'react-use';

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

const NumberOfDummiesInput = styled(Input)`
  width: 3em;
`;

const NumberOfFakesText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  margin-right: 1em;
`;

const anyDeck = newTamariz();

const getElapsed = (started: Date, ended = new Date()) =>
  `${Math.round(differenceInMilliseconds(ended, started) / 1000)}s`;

export default () => {
  const [currentQuestion, setCurrentQuestion] = useState<WhichIsQuestion>();

  const [answeredTime, setAnsweredTime] = useState<Date>();

  const [numberOfDummies, setNumberOfDummies] = useLocalStorage(
    'which_is:num_dummies',
    3,
  );

  const handleOnDummiesInputChange = useCallback(
    ({ target: { valueAsNumber } }: React.ChangeEvent<HTMLInputElement>) => {
      setNumberOfDummies(valueAsNumber);
    },
    [setNumberOfDummies],
  );

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
    [currentQuestion, numberOfDummies],
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
  }, [numberOfDummies]);

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
        name="which_is:question"
        shownCards={currentQuestion ? [currentQuestion.clue] : []}
        cards={currentQuestion ? [currentQuestion.clue] : [anyDeck[0]]}
        initialCardScale={1.2}
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
        name="which_is:guesses"
        title={nextOrPreviousText}
        shownCards={shownSecondRow}
        cards={secondRowCards}
        initialCardScale={1}
        onCardClick={handleGuessCardClick}
        center={true}
        wrapOverflow={true}
        actions={
          <>
            {!currentQuestion && (
              <>
                <NumberOfFakesText># fakes</NumberOfFakesText>
                <NumberOfDummiesInput
                  type="number"
                  min={1}
                  value={numberOfDummies}
                  onChange={handleOnDummiesInputChange}
                />
              </>
            )}
          </>
        }
      />
    </WhichIsTrainerContainer>
  );
};
