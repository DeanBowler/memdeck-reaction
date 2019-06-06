import React, { useState, useCallback } from 'react';
import { newTamariz, CardModel, DeckModel } from '../deck-engine';
import { symmetricDifference } from 'ramda';
import styled from 'styled-components';
import Button from '../components/Button';
import CardStack from '../components/CardStack';
import Input from '../components/Input';

const tamarizDeck = newTamariz();

const drawCards = (numberToDraw: number, carryover = true) => (deck: DeckModel) => {
    const index = Math.round(Math.random() * (deck.length - 1));
    const drawn = deck.slice(index, index + numberToDraw);

    const remainder = carryover ? deck.slice(0, numberToDraw - drawn.length) : [];

    return [...drawn, ...remainder];
};

const drawCardsTamariz = (numberToDraw: number) => drawCards(numberToDraw)(tamarizDeck);

const OneShotTrainerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 3rem;
`;

const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const OneShotTrainer = () => {
    const [numberToDraw, setNumberToDraw] = useState(2);
    const [drawnCards, setDrawnCards] = useState(drawCardsTamariz(numberToDraw));
    const [shownCards, setShownCards] = useState([] as CardModel[]);

    const redraw = useCallback(() => {
        setDrawnCards(drawCardsTamariz(numberToDraw));
        setShownCards([]);
    }, [numberToDraw]);

    const onCardClick = useCallback(
        (card: CardModel) => {
            setShownCards(symmetricDifference([card], shownCards));
        },
        [shownCards],
    );

    const onNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number.parseInt(e.target.value) || 0;
        setNumberToDraw(inputValue);
    }, []);

    return (
        <OneShotTrainerContainer>
            <ActionsContainer>
                <Input
                    type="number"
                    onChange={onNumberChange}
                    value={numberToDraw}
                    style={{ width: '2rem' }}
                />
                <Button onClick={redraw}>Redraw</Button>
            </ActionsContainer>
            <CardStack
                shownCards={shownCards}
                cards={drawnCards}
                cardScale={2}
                onCardClick={onCardClick}
            />
        </OneShotTrainerContainer>
    );
};

export default OneShotTrainer;
