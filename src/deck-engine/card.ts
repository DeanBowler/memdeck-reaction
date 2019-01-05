export enum CardSuit {
    Clubs = 'clubs',
    Diamonds = 'diamonds',
    Hearts = 'hearts',
    Spades = 'spades',
}

export interface CardModel {
    suit: CardSuit;
    number: number;
}

export function suiteName(suite: CardSuit) {
    return suite.toLowerCase();
}

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

export const friendlyName = (card: CardModel) =>
    `${valueName(card.number)} of ${card.suit}`;
