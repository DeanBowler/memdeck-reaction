import React, { useEffect, useCallback, useMemo } from 'react';

import words from '../lib/words';
import { drawRandomItemsWithSeed, drawItemsFromRandomPoint } from '../deck-engine/random';
import styled from 'styled-components/macro';
import palette from '../palette';
import Button from '../components/Button';
import { useLocalStorage } from 'react-use';
import Input from '../components/Input';
import useQueryParam from '../lib/hooks/useQueryParam';

import adjectives from '../lib/adjectives';
import Helmet from 'react-helmet';

let voice: SpeechSynthesisVoice | undefined = undefined;

window.speechSynthesis.onvoiceschanged = function() {
  voice = window.speechSynthesis.getVoices()[0];
};

interface WordItemProps {
  index: number;
  word: string;
}

const WordContainer = styled.div`
  user-select: none;
  color: ${palette.white};
  margin: 1rem;
  border: 2px solid ${palette.white};
  border-radius: 5px;
  display: flex;
  width: 15rem;

  transition: box-shadow 100ms ease-in-out;

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);

  :hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
  }
`;

const WordIndex = styled.div`
  padding: 1rem;
  color: ${palette.white};
  background: rgba(255, 255, 255, 0.1);
  border-right: 1px solid ${palette.white};
`;

const Word = styled.div`
  padding: 1rem;
  font-size: 1.25rem;
  text-transform: capitalize;
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

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

const NumberOfWordsInput = styled(Input)`
  width: 3rem;
`;

const DrawButton = styled(Button)`
  flex: 1 1 auto;
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

  return (
    <>
      <Helmet title="Word Recall" />
      <ActionsContainer>
        <NumberOfWordsInput
          min={0}
          type="number"
          defaultValue={numberOfWords}
          onInput={handleNumberChange}
        />
        <DrawButton onClick={handleDrawWords}>Change Words</DrawButton>
      </ActionsContainer>
      <WordSetContainer>
        {wordSet &&
          wordSet.map((word, index) => (
            <WordItem key={word + index} {...{ word, index }} />
          ))}
      </WordSetContainer>
      <ActionsContainer>
        <NumberOfWordsInput
          min={0}
          type="number"
          defaultValue={speechDelay}
          onInput={handleDelayChange}
        />
        <DrawButton onClick={handleSayIt}>Say it!</DrawButton>
        <DrawButton onClick={stopTalking}>Shh...</DrawButton>
      </ActionsContainer>
    </>
  );
};

export default WordRecall;
