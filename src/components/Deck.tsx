import * as React from 'react';
import styled from 'styled-components';

import { DeckModel } from '../deck-engine';
import Card from './Card';

interface DeckProps {
    model: DeckModel;
}

const DeckHolder = styled.div``;

const PaddedContainer = styled.div`
    margin: 10px;
    display: inline-block;
`;

const Deck = (props: DeckProps) => (
    <DeckHolder>
        {props.model.map(c => (
            <PaddedContainer key={c.number + c.suit}>
                <Card model={c} />
            </PaddedContainer>
        ))}
    </DeckHolder>
);

export default Deck;
