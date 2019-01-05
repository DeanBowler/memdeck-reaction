import * as React from 'react';
import { CardModel, valueName, suiteName } from '../deck-engine';
import { compose, concat } from 'ramda';
import styled from 'styled-components';
import palette from '../palette';

interface CardProps {
    model: CardModel;
}

const cardModelToSvgName = (model: CardModel) =>
    `${valueName(model.number)}_of_${suiteName(model.suit)}.svg`;
const cardModelToPath = compose(
    concat('card-images/'),
    cardModelToSvgName,
);

const CardContainer = styled.div`
    background: ${palette.grey5};
    border-radius: 15px;
    border: 5px solid ${palette.grey90};
`;

const CardImage = styled.img`
    display: block;
`;

const Card: React.SFC<CardProps> = props => (
    <CardContainer>
        <CardImage src={cardModelToPath(props.model)} />
    </CardContainer>
);

export default Card;
