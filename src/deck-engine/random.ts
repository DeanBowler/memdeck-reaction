import { drawItems } from './deck';
import { newTamariz } from './tamariz';
import { range } from 'ramda';

export const randomIndex = (numberOfCards = 52) =>
    Math.round(Math.random() * (numberOfCards - 1));

const anyDeck = newTamariz();

export const randomCard = () => anyDeck[randomIndex()];

export const randomCards = (numberOfCards = 1) =>
    range(0, numberOfCards - 1).map(randomCard);

export const drawItemsFromRandomPoint = <T>(
    numberToDraw: number,
    carryover = true,
    pure = true,
) => (deck: T[]) =>
    drawItems<T>(randomIndex(deck.length))(numberToDraw, carryover, pure)(deck);
