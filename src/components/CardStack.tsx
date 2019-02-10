import * as React from 'react';

import FlippinCard from './FlippinCard';
import styled from 'styled-components';
import { CardModel } from '../deck-engine';
import { CardProps } from './Card';
import { compose, equals } from 'ramda';
import { useEffect } from 'react';

const CardStackContainer = styled.div`
    margin: 0.75rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.2);
    overflow: auto;
    border-radius: 5px;
`;

const CardStackList = styled.div<{ wrapOverflow: boolean }>`
    display: flex;
    min-width: min-content;
    flex-wrap: ${p => (p.wrapOverflow ? 'wrap' : 'unset')};
`;

const CardStackHeader = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 0.5rem;
    position: sticky;
    left: 0;
`;

const CardStackTitle = styled.div`
    display: flex;
    align-items: baseline;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.5rem;
    line-height: 1em;
    font-weight: bold;
    flex: 1 1 auto;
`;

const CardStackActionsContainer = styled.div`
    flex: 0 1 auto;
`;

const CardStackSubtitle = styled.div`
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin-left: 0.5rem;
    font-weight: normal;
`;

const WonkyCardContainer = styled.div`
    margin: 5px;
`;

type cardAdaptor = (card: React.ComponentType<CardProps>) => any;

export interface CardStackProps {
    cards: CardModel[];
    shownCards?: CardModel[];
    title?: string;
    subtitle?: string;
    onCardClick?: (card: CardModel) => void;
    onCardMouseDown?: (card: CardModel) => void;
    onCardMouseUp?: (card: CardModel) => void;
    actions?: React.ReactChild;
    cardAdaptors?: cardAdaptor[];
    wrapOverflow?: boolean;
}

class CardStack extends React.Component<CardStackProps> {
    private scrollableRef: HTMLDivElement | null = null;

    private cardRender = FlippinCard;

    private maybeScrollRight(previousProps: CardStackProps) {
        const hasMoreCards = this.props.cards.length > previousProps.cards.length;

        if (hasMoreCards && this.scrollableRef)
            this.scrollableRef.scrollTo({
                left: this.scrollableRef.scrollWidth,
                behavior: 'smooth',
            });
    }

    componentDidUpdate(previous: CardStackProps) {
        this.maybeScrollRight(previous);
    }

    componentWillMount() {
        let cardAdaptors = this.props.cardAdaptors || [r => r];
        cardAdaptors = cardAdaptors.length > 0 ? cardAdaptors : [r => r];
        this.cardRender = (compose as any)(...cardAdaptors)(FlippinCard);
    }

    componentWillUpdate(prevProps: CardStackProps) {
        if (!equals(prevProps.cardAdaptors, this.props.cardAdaptors)) {
            console.log('wot');
            let cardAdaptors = this.props.cardAdaptors || [r => r];
            cardAdaptors = cardAdaptors.length > 0 ? cardAdaptors : [r => r];
            this.cardRender = (compose as any)(...cardAdaptors)(FlippinCard);
        }
    }

    render() {
        const {
            cards,
            shownCards,
            title,
            subtitle,
            onCardClick,
            onCardMouseDown,
            onCardMouseUp,
            actions,
            wrapOverflow,
        } = this.props;

        const Card = this.cardRender;

        return (
            <CardStackContainer ref={r => (this.scrollableRef = r)}>
                <CardStackHeader>
                    <CardStackTitle>
                        {title}
                        <CardStackSubtitle>{subtitle}</CardStackSubtitle>
                    </CardStackTitle>

                    <CardStackActionsContainer>{actions}</CardStackActionsContainer>
                </CardStackHeader>

                <CardStackList wrapOverflow={wrapOverflow || false}>
                    {cards.map(w => (
                        <WonkyCardContainer key={w.number + w.suit}>
                            <Card
                                faceUp={shownCards && shownCards.includes(w)}
                                model={w}
                                onClick={() => onCardClick && onCardClick(w)}
                                onMouseDown={() => onCardMouseDown && onCardMouseDown(w)}
                                onMouseUp={() => onCardMouseUp && onCardMouseUp(w)}
                                scale={1.2}
                            />
                        </WonkyCardContainer>
                    ))}
                </CardStackList>
            </CardStackContainer>
        );
    }
}
// const CardStack = (props: CardStackProps) => {
//     // private scrollableRef: HTMLDivElement | null = null;

//     // private cardRender = FlippinCard;

//     // componentDidUpdate(previous: CardStackProps) {
//     //     if (previous.cards.length !== this.props.cards.length && this.scrollableRef)
//     //         this.scrollableRef.scrollTo({
//     //             left: this.scrollableRef.scrollWidth,
//     //             behavior: 'smooth',
//     //         });
//     // }

//     // componentWillMount() {
//     //     let cardAdaptors = this.props.cardAdaptors || [r => r];
//     //     cardAdaptors = cardAdaptors.length > 0 ? cardAdaptors : [r => r];
//     //     this.cardRender = (compose as any)(...cardAdaptors)(FlippinCard);
//     // }

//     // componentWillUpdate(prevProps: CardStackProps) {
//     //     if (!equals(prevProps.cardAdaptors, this.props.cardAdaptors)) {
//     //         console.log('wot');
//     //         let cardAdaptors = this.props.cardAdaptors || [r => r];
//     //         cardAdaptors = cardAdaptors.length > 0 ? cardAdaptors : [r => r];
//     //         this.cardRender = (compose as any)(...cardAdaptors)(FlippinCard);
//     //     }
//     // }

//     const {
//         cards,
//         shownCards,
//         title,
//         subtitle,
//         onCardClick,
//         onCardMouseDown,
//         onCardMouseUp,
//         actions,
//         wrapOverflow,
//     } = props;

//     const [renderer, setRenderer] = React.useState<() => JSX.Element>(FlippinCard);

//     // useEffect(
//     //     () => {
//     //         let cardAdaptors = props.cardAdaptors || [r => r];
//     //         cardAdaptors = cardAdaptors.length > 0 ? cardAdaptors : [r => r];
//     //         const cardRender = (compose as any)(...cardAdaptors)(FlippinCard);
//     //         setRenderer(cardRender);
//     //     },
//     //     [props.cardAdaptors],
//     // );

//     const Card = FlippinCard;
//     return (
//         <CardStackContainer>
//             <CardStackHeader>
//                 <CardStackTitle>
//                     {title}
//                     <CardStackSubtitle>{subtitle}</CardStackSubtitle>
//                 </CardStackTitle>

//                 <CardStackActionsContainer>{actions}</CardStackActionsContainer>
//             </CardStackHeader>

//             <CardStackList wrapOverflow={wrapOverflow || false}>
//                 {cards.map(w => (
//                     <WonkyCardContainer key={w.number + w.suit}>
//                         <FlippinCard
//                             faceUp={shownCards && shownCards.includes(w)}
//                             model={w}
//                             onClick={() => onCardClick && onCardClick(w)}
//                             onMouseDown={() => onCardMouseDown && onCardMouseDown(w)}
//                             onMouseUp={() => onCardMouseUp && onCardMouseUp(w)}
//                             scale={1.2}
//                         />
//                     </WonkyCardContainer>
//                 ))}
//             </CardStackList>
//         </CardStackContainer>
//     );
// };

export default CardStack;
