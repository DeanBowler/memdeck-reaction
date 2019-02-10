import * as React from 'react';
import { CardProps } from './Card';
import { FlippinCardProps } from './FlippinCard';
import styled from 'styled-components';
import { cardColor, isCourtCard, CardModel, CardSuit } from '../deck-engine';
import palette from '../palette';

export interface HintableCardProps extends CardProps, FlippinCardProps {}

export interface HintableCardState {
    suitHintShow: boolean;
    pictureOrNumberHintShow: boolean;
    colorHintShow: boolean;
}

const HintGroup = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 0.5rem;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 5px;
`;

const HintContainer = styled.div`
    display: flex;
    position: relative;
    cursor: pointer;
    user-select: none;

    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 42px;
    overflow: hidden;

    border: 2px solid ${palette.white};
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.2);

    transform: scale(1);
    transition: all 300ms cubic-bezier(0.5, 1.15, 0.4, 1.2);

    :hover {
        transform: rotate(-5deg) scale(1.1);
    }

    :active {
        transform: rotate(0deg) scale(0.9);
        box-shadow: inset 3px 4px 5px rgba(0, 0, 0, 0.3);
    }
`;

interface CardHintProps {
    visible: boolean;
    onClick?: () => void;
    model: CardModel;
}

const HintOverlay = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: bold;
    color: ${palette.grey100};
`;

const ColorHintContainer = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.5;
    transition: width 300ms ease-in-out;
`;

const ColorHint = ({ model, visible, onClick }: CardHintProps) => {
    const color = cardColor(model);

    return (
        <HintContainer onClick={onClick} role="checkbox" aria-checked={visible}>
            <ColorHintContainer
                style={{
                    backgroundColor: 'red',
                    width: visible && color !== 'red' ? '0%' : '100%',
                }}
            />
            <ColorHintContainer
                style={{
                    backgroundColor: 'black',
                    width: visible && color !== 'black' ? '0%' : '100%',
                }}
            />
            {!visible && <HintOverlay />}
        </HintContainer>
    );
};

const LetterStyleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
`;

const PictureOrNumberHint = ({ model, visible, onClick }: CardHintProps) => {
    return (
        <HintContainer onClick={onClick} role="checkbox" aria-checked={visible}>
            {visible ? (
                <LetterStyleContainer>
                    {isCourtCard(model) ? 'P' : 'N'}
                </LetterStyleContainer>
            ) : (
                <>
                    <LetterStyleContainer>P/N</LetterStyleContainer>
                    <HintOverlay />
                </>
            )}
        </HintContainer>
    );
};

const SuitsContainer = styled.div`
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
`;

interface ShapeContainerProps {
    hide: boolean;
    visible: boolean;
}

const SuitImg = styled.img<ShapeContainerProps>`
    flex-basis: 50%;
    height: ${({ hide, visible }: ShapeContainerProps) =>
        !visible ? '50%' : hide ? '0%' : '100%'};
    width: ${({ hide, visible }: ShapeContainerProps) =>
        !visible ? '50%' : hide ? '0%' : '100%'};
`;

const SuitHint = ({ model, visible, onClick }: CardHintProps) => {
    const suit = model.suit;

    return (
        <HintContainer onClick={onClick} role="checkbox" aria-checked={visible}>
            {!visible && <HintOverlay />}
            <SuitsContainer>
                <SuitImg
                    src="/images/card-suits/club.svg"
                    visible={visible}
                    hide={visible && suit !== CardSuit.Clubs}
                />
                <SuitImg
                    src="/images/card-suits/diamond.svg"
                    visible={visible}
                    hide={visible && suit !== CardSuit.Diamonds}
                />
                <SuitImg
                    src="/images/card-suits/heart.svg"
                    visible={visible}
                    hide={visible && suit !== CardSuit.Hearts}
                />
                <SuitImg
                    src="/images/card-suits/spade.svg"
                    visible={visible}
                    hide={visible && suit !== CardSuit.Spades}
                />
            </SuitsContainer>
        </HintContainer>
    );
};

export const withHints = (WrappedComponent: React.ComponentType<CardProps>) =>
    class HintableCard extends React.Component<HintableCardProps, HintableCardState> {
        constructor(props: HintableCardProps) {
            super(props);

            this.state = {
                suitHintShow: false,
                pictureOrNumberHintShow: false,
                colorHintShow: false,
            };
        }

        toggleColorHintShow = () =>
            this.setState(s => ({ colorHintShow: !s.colorHintShow }));
        toggleSuitHintShow = () =>
            this.setState(s => ({ suitHintShow: !s.suitHintShow }));
        togglePictureOrNumberHintShow = () =>
            this.setState(s => ({ pictureOrNumberHintShow: !s.pictureOrNumberHintShow }));

        render() {
            const { model } = this.props;
            const { suitHintShow, colorHintShow, pictureOrNumberHintShow } = this.state;

            return (
                <>
                    <HintGroup>
                        <PictureOrNumberHint
                            model={model}
                            visible={pictureOrNumberHintShow}
                            onClick={this.togglePictureOrNumberHintShow}
                        />
                        <SuitHint
                            model={model}
                            visible={suitHintShow}
                            onClick={this.toggleSuitHintShow}
                        />
                        <ColorHint
                            model={model}
                            visible={colorHintShow}
                            onClick={this.toggleColorHintShow}
                        />
                    </HintGroup>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
