import { pipe, concat } from 'ramda';

export enum CardSuit {
  Clubs = 'clubs',
  Diamonds = 'diamonds',
  Hearts = 'hearts',
  Spades = 'spades',
}

export enum CardColor {
  Red = 'red',
  Black = 'black',
}

export interface CardModel {
  suit: CardSuit;
  number: number;
  stackPosition?: number;
}

export const isCourtCard = (card: CardModel) => card.number > 10;

export const suiteName = (suite: CardSuit) => suite.toLowerCase();

export const cardColor = (card: CardModel) =>
  [CardSuit.Spades, CardSuit.Clubs].includes(card.suit) ? CardColor.Black : CardColor.Red;

export function valueName(number: number): string {
  switch (number) {
    case 1:
      return 'Ace';
    case 11:
      return 'Jack';
    case 12:
      return 'Queen';
    case 13:
      return 'King';
    default:
      return number.toString();
  }
}

export const shortValueName = (value: number) =>
  pipe(valueName, v => (v.length > 2 ? v[0] : v))(value);

export const friendlyName = (card: CardModel) =>
  `${valueName(card.number)} of ${card.suit}`;

const cardModelToSvgName = (model: CardModel) =>
  `${valueName(model.number)}_of_${suiteName(model.suit)}.svg`;

export const cardModelToPath = pipe(cardModelToSvgName, concat('/images/card-faces/'));
