import { drawItems } from './deck';
import { newTamariz } from './tamariz';
import { range } from 'ramda';

import Chance from 'chance';

export const randomIndex = (numberOfCards = 52) =>
  Math.round(Math.random() * (numberOfCards - 1));

const anyDeck = newTamariz();

export const randomCard = () => anyDeck[randomIndex()];

export const randomCards = (numberOfCards = 1) =>
  range(0, numberOfCards - 1).map(randomCard);

export const drawRandomItemsWithSeed = <T>(
  seed: string,
  numberToDraw: number,
  avoidDuplicates = true,
) => (items: T[]) => {
  const seeded = new Chance(seed);

  const used: { [key: number]: number } = {};

  const spread = Math.round(items.length / 10);
  const getItemAvoidingDuplicates = (index: number) => {
    let currIndex = used[index] ? used[index] + spread : index;
    if (used[currIndex]) {
      currIndex += spread;
    }
    if (currIndex >= items.length) currIndex = used[0] || 0;

    used[index] = currIndex;

    return items[currIndex];
  };

  const getItemMap = avoidDuplicates
    ? getItemAvoidingDuplicates
    : (index: number) => items[index];

  return range(0, numberToDraw)
    .map(() => seeded.integer({ min: 0, max: items.length - 1 }))
    .map(getItemMap);
};

export const drawItemsFromRandomPoint = <T>(
  numberToDraw: number,
  carryover = true,
  pure = true,
) => (deck: T[]) =>
  drawItems<T>(randomIndex(deck.length))(numberToDraw, carryover, pure)(deck);
