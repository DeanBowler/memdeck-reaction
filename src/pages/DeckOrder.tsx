import * as React from 'react';
import { symmetricDifference } from 'ramda';
import { Helmet } from 'react-helmet';

import { newTamariz, CardModel } from 'src/deck-engine';
import Button from 'src/components/Button';
import CardStack from 'src/components/CardStack';

interface DeckOrderState {
  shown: CardModel[];
}

class DeckOrder extends React.Component<{}, DeckOrderState> {
  private deck = newTamariz();

  constructor(props: {}) {
    super(props);
    this.state = {
      shown: [],
    };
  }

  private handleCardClick = (card: CardModel) =>
    this.setState(({ shown }) => ({ shown: symmetricDifference([card], shown) }));

  private revealAll = () =>
    this.setState({
      shown: this.deck,
    });

  private hideAll = () => this.setState({ shown: [] });

  render() {
    return (
      <>
        <Helmet title="Stack order" />
        <CardStack
          title="Mnemonica Stack Order"
          cards={this.deck}
          shownCards={this.state.shown}
          onCardClick={this.handleCardClick}
          wrapOverflow={true}
          center={true}
          // cardAdaptors={[withOrderDisplay]}
          actions={
            <>
              <Button onClick={this.revealAll} marginRight="5px">
                Reveal All
              </Button>
              <Button onClick={this.hideAll}>Hide All</Button>
            </>
          }
        />
      </>
    );
  }
}

export default DeckOrder;
