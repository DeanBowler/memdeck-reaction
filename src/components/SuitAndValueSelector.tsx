import React, { useState, useEffect } from 'react';
import Button from './Button';
import { valueName, allNumbers, allSuits, CardSuit, CardModel } from '../deck-engine';
import styled from 'styled-components';
import { pipe } from 'ramda';

const StyledButt = styled(Button)<{ selected: boolean }>`
    font-size: 2rem;
    width: 2em;
    height: 2em;
    margin: 0.25em;
    opacity: ${p => (p.selected ? 'unset' : '0.75')};
    border-color: ${p => (p.selected ? 'unset' : 'rgba(255,255,255,0.2)')};
`;

interface CardValueButtonProps {
    value: number;
    onClick: (value: number) => void;
    selected: boolean;
}

const shortValueName = (value: number) =>
    pipe(
        valueName,
        v => (v.length > 2 ? v[0] : v),
    )(value);

const CardValueButton = ({ value, onClick, selected }: CardValueButtonProps) => (
    <StyledButt onClick={() => onClick(value)} selected={selected}>
        {shortValueName(value)}
    </StyledButt>
);

interface CardSuitButtonProps {
    suit: CardSuit;
    onClick: (suit: CardSuit) => void;
    selected: boolean;
}

const SuitImageContainer = styled.img`
    width: 1em;
`;

const suitImageSrc = (suit: CardSuit) => {
    const suitImageName = suit.slice(0, -1);
    return `/images/card-suits/${suitImageName}.svg`;
};

const SuitImage = (suit: CardSuit) => <SuitImageContainer src={suitImageSrc(suit)} />;

const CardSuitButton = ({ suit, onClick, selected }: CardSuitButtonProps) => (
    <StyledButt onClick={() => onClick(suit)} role="checkbox" selected={selected}>
        {SuitImage(suit)}
    </StyledButt>
);

const SuitAndValueSelectorContainer = styled.div`
    text-align: center;
`;

interface SuitAndValueSelectorProps {
    onSelected: (card: CardModel) => void;
}

export default ({ onSelected }: SuitAndValueSelectorProps) => {
    const [suit, setSuit] = useState<CardSuit>();
    const [value, setValue] = useState<number>();

    useEffect(() => {
        if (!(suit && value)) return;
        onSelected({ number: value, suit });
    }, [suit, value, onSelected]);

    const onSuitClick = (clickedSuit: CardSuit) =>
        setSuit(suit !== clickedSuit ? clickedSuit : undefined);

    const onValueClick = (clickedValue: number) =>
        setValue(value !== clickedValue ? clickedValue : undefined);

    return (
        <SuitAndValueSelectorContainer>
            <div>
                {allNumbers.map(n => (
                    <CardValueButton
                        value={n}
                        key={n}
                        onClick={onValueClick}
                        selected={value === n}
                    />
                ))}
            </div>
            <div>
                {allSuits.map(s => (
                    <CardSuitButton
                        suit={s}
                        key={s}
                        onClick={onSuitClick}
                        selected={suit === s}
                    />
                ))}
            </div>
        </SuitAndValueSelectorContainer>
    );
};
