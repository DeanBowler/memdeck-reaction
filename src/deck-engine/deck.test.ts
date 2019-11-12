import { pass } from './deck';
import { CardModel, CardSuit } from './card';

describe('pass', () => {
  it('should pass deck correctly as given location', () => {
    const deck: CardModel[] = [
      { number: 1, suit: CardSuit.Hearts },
      { number: 2, suit: CardSuit.Hearts },
      { number: 3, suit: CardSuit.Hearts },
      { number: 4, suit: CardSuit.Hearts },
    ];

    const passed = pass(2, deck);

    const expected = [
      { number: 3, suit: CardSuit.Hearts },
      { number: 4, suit: CardSuit.Hearts },
      { number: 1, suit: CardSuit.Hearts },
      { number: 2, suit: CardSuit.Hearts },
    ];
    expect(passed).toEqual(expected);
  });
});
