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

export const drawRandomItemsWithSeed = <T>(seed: string, numberToDraw: number) => (
  items: T[],
) => {
  const seeded = new Chance(seed);

  return range(0, numberToDraw)
    .map(() => seeded.integer({ min: 0, max: items.length - 1 }))
    .map(i => items[i]);
};

export const drawItemsFromRandomPoint = <T>(
  numberToDraw: number,
  carryover = true,
  pure = true,
) => (deck: T[]) =>
  drawItems<T>(randomIndex(deck.length))(numberToDraw, carryover, pure)(deck);
