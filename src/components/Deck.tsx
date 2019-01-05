import * as React from 'react';
import styled from 'styled-components';

import { DeckModel } from '../deck-engine';
import Card from './Card';

interface DeckProps {
    model: DeckModel;
}

const DeckHolder = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const PaddedContainer = styled.div`
    margin: 10px;
`;

const Deck: React.SFC<DeckProps> = props => (
    <DeckHolder>
        {props.model.map(c => (
            <PaddedContainer key={c.number + c.suit}>
                <Card model={c} />
            </PaddedContainer>
        ))}
    </DeckHolder>
);

export default Deck;
