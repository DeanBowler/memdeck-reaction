import * as React from 'react';
import { Helmet } from 'react-helmet';
import { symmetricDifference, last, takeLast } from 'ramda';

import { DeckModel, newTamariz, CardModel, pass, shuffle } from 'src/deck-engine';
import ActionsContainer from 'src/components/ActionsContainer';
import Button from 'src/components/Button';
import CardStack from 'src/components/CardStack';
import Input from 'src/components/Input';

export interface DrawFromFanProps {}

export interface DrawFromFanState {
  deck: DeckModel;
  withdrawn: CardModel[];
  peeking: CardModel | undefined;
  showWithdrawn: CardModel[];
  numberToDraw: number;
}

export default class DrawFromFanTrainer extends React.Component<
  DrawFromFanProps,
  DrawFromFanState
> {
  constructor(props: DrawFromFanProps) {
    super(props);

    this.state = {
      deck: newTamariz(),
      withdrawn: [],
      peeking: undefined,
      showWithdrawn: [],
      numberToDraw: 1,
    };
  }

  reset = () =>
    this.setState({
      deck: newTamariz(),
      withdrawn: [],
      peeking: undefined,
      showWithdrawn: [],
    });

  peek = () => this.setState(({ deck }) => ({ peeking: last(deck) }));
  unpeek = () => this.setState({ peeking: undefined });

  revealAll = () => this.setState(({ withdrawn }) => ({ showWithdrawn: withdrawn }));

  shuffleWithdrawn = () =>
    this.setState(({ withdrawn }) => ({ withdrawn: shuffle(withdrawn) }));

  handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberToDraw = Number.parseInt(e.target.value) || 0;
    this.setState({ numberToDraw });
  };

  handleCardClick = (card: CardModel) =>
    this.setState(s => ({
      showWithdrawn: symmetricDifference([card], s.showWithdrawn),
    }));

  drawAndPass = () => {
    const index = Math.round(Math.random() * (this.state.deck.length - 1));

    this.setState(s => {
      const drawnCards = s.deck.slice(index, index + s.numberToDraw);
      const withoutDrawn = s.deck.filter(c => !drawnCards.includes(c));
      const passed = pass(index, withoutDrawn);

      return {
        withdrawn: [...s.withdrawn, ...drawnCards],
        deck: passed,
      };
    });
  };

  render() {
    const { peeking, showWithdrawn, withdrawn, deck, numberToDraw } = this.state;

    return (
      <div>
        <Helmet title="Draw from fan" />
        <ActionsContainer>
          <Button onClick={this.reset} marginRight="1em">
            Reset
          </Button>
          <Input
            type="number"
            onChange={this.handleNumberChange}
            value={numberToDraw}
            style={{ width: '2rem' }}
          />
          <Button onClick={this.drawAndPass} marginRight="1em">
            Draw cards
          </Button>
        </ActionsContainer>

        <CardStack
          name="draw_from_fan:drawn"
          title="drawn"
          subtitle="(click to reveal)"
          cards={withdrawn}
          shownCards={showWithdrawn}
          onCardClick={this.handleCardClick}
          showHints={true}
          actions={
            <>
              <Button onClick={this.revealAll} marginRight="5px">
                Reveal All
              </Button>
              <Button onClick={this.shuffleWithdrawn}>Shuffle</Button>
            </>
          }
        />

        {
          <CardStack
            name="draw_from_fan:peek"
            title="deck"
            subtitle="(hold to peek bottom)"
            cards={takeLast(1, deck)}
            shownCards={peeking ? [peeking] : []}
            onCardMouseDown={this.peek}
            onCardMouseUp={this.unpeek}
          />
        }
      </div>
    );
  }
}
