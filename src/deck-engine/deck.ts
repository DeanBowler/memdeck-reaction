import { range } from 'ramda';

import { CardSuit, CardModel } from './card';

export type DeckModel = CardModel[];

export const newDeck: () => DeckModel = () => {
    const allSuits = [
        CardSuit.Clubs,
        CardSuit.Diamonds,
        CardSuit.Hearts,
        CardSuit.Spades,
    ];
    const allNumbers = range(1, 14);

    return allSuits.flatMap(s => allNumbers.map(n => ({ suit: s, number: n })));
};

export const shuffle = (deck: DeckModel) => {
    const unshuffled = deck.slice(0);
    const shuffled = [];
    while (unshuffled.length) {
        const index = Math.floor(Math.random() * unshuffled.length);
        shuffled.push(...unshuffled.splice(index, 1));
    }
    return shuffled;
};

export const pass = (index: number, deck: DeckModel) => {
    const firstHalf = deck.slice(0, index);
    const secondHalf = deck.slice(index, deck.length);
    return [...secondHalf, ...firstHalf];
};

export const draw = <T>(index: number, numberToDraw: number = 1, pure = true) => (
    items: T[],
) =>
    pure ? items.slice(index, index + numberToDraw) : items.splice(index, numberToDraw);

export const drawItems = <T>(index: number) => (
    numberToDraw: number,
    carryover = true,
    pure = true,
) => (items: T[]) => {
    const drawn = draw<T>(index, numberToDraw, pure)(items);
    const remainder = carryover
        ? draw<T>(0, numberToDraw - drawn.length, pure)(items)
        : [];
    return [...drawn, ...remainder];
};
