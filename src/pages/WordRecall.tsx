import React, { useEffect, useCallback, useMemo } from 'react';

import Helmet from 'react-helmet';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { useLocalStorage } from 'react-use';
import { useDebouncedCallback } from 'use-debounce';

import palette from 'src/style/palette';
import words from 'src/lib/words';
import adjectives from 'src/lib/adjectives';
import useQueryParam from 'src/lib/hooks/useQueryParam';
import {
  drawRandomItemsWithSeed,
  drawItemsFromRandomPoint,
} from 'src/deck-engine/random';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { BoxMixin } from 'src/style/common';
import ActionsContainer from 'src/components/ActionsContainer';

let voice: SpeechSynthesisVoice | undefined = undefined;

window.speechSynthesis.onvoiceschanged = function() {
  voice = window.speechSynthesis.getVoices()[0];
};

interface WordItemProps {
  index: number;
  word: string;
}

const WordContainer = styled.div`
  display: flex;
  user-select: none;

  margin: 0.5rem;
  width: 10rem;
  ${BoxMixin};
  padding: 0;

  transition: box-shadow 100ms ease-in-out;

  box-shadow: ${palette.boxShadow};

  :hover {
    box-shadow: ${palette.boxShadowTaller};
  }

  ${media.greaterThan('medium')`
    padding: 0;
    margin: 1rem;
    width: 15rem;
  `}
`;

const WordIndex = styled.div`
  padding: 0.75rem;
  color: ${palette.white};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px 0 0 5px;

  ${media.greaterThan('medium')`
    padding: 1rem;
  `}
`;

const Word = styled.div`
  font-size: 1rem;
  padding: 0.75rem;

  word-break: break-all;
  text-transform: capitalize;

  ${media.greaterThan('medium')`
    padding: 1rem;
    font-size: 1.25rem;
  `}
`;

const WordItem = ({ index, word }: WordItemProps) => (
  <WordContainer>
    <WordIndex>{index + 1}</WordIndex>
    <Word>{word}</Word>
  </WordContainer>
);

const WordSetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  justify-content: center;
`;

const DrawButton = styled(Button)`
  flex: 1 0 auto;
`;

const stopTalking = () => window.speechSynthesis.cancel();

const randomSeed = () => {
  return `${drawItemsFromRandomPoint(1)(adjectives)}${drawItemsFromRandomPoint(1)(
    words,
  )}`;
};

const WordRecall = () => {
  const [speechDelay, setSpeechDelay] = useLocalStorage('word-recall:speech-delay', 2);
  const [numberOfWords, setNumberOfWords] = useLocalStorage(
    'word-recall:number-of-words',
    10,
  );

  const [seedFromQuery, setSeedFromQuery] = useQueryParam('seed');

  const wordSet = useMemo(
    () => drawRandomItemsWithSeed<string>(seedFromQuery, numberOfWords)(words),
    [seedFromQuery, numberOfWords],
  );

  useEffect(() => {
    return () => stopTalking();
  }, [seedFromQuery, speechDelay]);

  const handleSayIt = useCallback(() => {
    stopTalking();
    if (!wordSet) return;

    const text = wordSet
      .map((value, index) => `${index + 1}... ${value}. `)
      .join(`<silence msec="${speechDelay * 1000}" />`);

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.4;
    window.speechSynthesis.speak(utterance);
  }, [wordSet, speechDelay]);

  const handleDrawWords = useCallback(() => {
    setSeedFromQuery(randomSeed());
  }, [setSeedFromQuery]);

  const handleNumberChange = ({
    target: { valueAsNumber },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfWords(valueAsNumber);
  };

  const handleDelayChange = ({
    target: { valueAsNumber },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSpeechDelay(valueAsNumber);
  };

  const [handleSeedInputChange] = useDebouncedCallback(
    (value: string) => setSeedFromQuery(value),
    750,
  );

  return (
    <>
      <Helmet title="Word Recall" />
      <ActionsContainer>
        <Input
          value={seedFromQuery}
          onChange={e => handleSeedInputChange(e.target.value)}
          label="Seed"
        />
      </ActionsContainer>
      <ActionsContainer>
        <Input
          min={0}
          type="number"
          defaultValue={numberOfWords}
          onInput={handleNumberChange}
          label="No of words"
          labelStyle={{ width: '6rem', flex: '0 1 auto' }}
        />
        <DrawButton onClick={handleDrawWords}>Change Words</DrawButton>
      </ActionsContainer>
      <WordSetContainer>
        {wordSet &&
          wordSet.map((word, index) => (
            <WordItem key={`${word}-${index}`} {...{ word, index }} />
          ))}
      </WordSetContainer>
      <ActionsContainer>
        <Input
          label="Speech delay"
          min={0}
          type="number"
          defaultValue={speechDelay}
          onInput={handleDelayChange}
          labelStyle={{ width: '6rem', flex: '0 1 auto' }}
        />
        <DrawButton onClick={handleSayIt}>Say it!</DrawButton>
        <DrawButton onClick={stopTalking}>Shh...</DrawButton>
      </ActionsContainer>
    </>
  );
};

export default WordRecall;
