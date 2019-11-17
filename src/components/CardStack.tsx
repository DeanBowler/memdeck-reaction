import React, { useEffect, useRef } from 'react';

import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { useGesture } from 'react-use-gesture';

import { CardModel } from '../deck-engine';
import FlippinCard from './FlippinCard';
import { HintableCard } from './HintableCard';
import { pipe, min, max } from 'ramda';

import { useLocalStorage } from 'react-use';

const CardStackContainer = styled.div`
  margin: 0.75rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: auto;
  border-radius: 5px;

  ${media.lessThan('medium')`
    margin: 0.5rem;
    padding: 0.5rem;
  `}
`;

const CardStackList = styled.div<{ wrapOverflow: boolean; center: boolean }>`
  display: flex;

  min-width: min-content;

  justify-content: ${p => (p.center ? 'center' : 'baseline')};
  flex-wrap: ${p => (p.wrapOverflow ? 'wrap' : 'unset')};
`;

const CardStackHeader = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;

  position: sticky;
  left: 0;

  ${media.lessThan('small')`
      margin-bottom: 0.25rem;
  `}
`;

const CardStackTitle = styled.div`
  display: flex;
  align-items: baseline;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  line-height: 2em;
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
  display: flex;
  flex-direction: column;
  margin: 1rem;

  ${media.lessThan('medium')`
    margin: 0.5rem;
  `}
`;

const MAX_SCALE: number = 2;
const MIN_SCALE: number = 0.5;
const limitCardSize = pipe(min(MAX_SCALE), max(MIN_SCALE));

export interface CardStackProps {
  name?: string;
  cards: CardModel[];
  shownCards?: CardModel[];
  title?: string;
  subtitle?: string;
  onCardClick?: (card: CardModel) => void;
  onCardMouseDown?: (card: CardModel) => void;
  onCardMouseUp?: (card: CardModel) => void;
  actions?: React.ReactChild;
  showHints?: boolean;
  wrapOverflow?: boolean;
  initialCardScale: number;
  center: boolean;
}

const CardStack = ({
  name,
  cards,
  shownCards,
  title,
  subtitle,
  onCardClick,
  onCardMouseDown,
  onCardMouseUp,
  actions,
  wrapOverflow,
  initialCardScale,
  center,
  showHints,
}: CardStackProps) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const [cardScale, setCardScale] = useLocalStorage(
    `${name || 'default_stack'}:card_scale`,
    initialCardScale,
  );

  //const [cardScale, setCardScale] = useState(initialCardScale);

  useEffect(() => {
    const { current: scrollableEl } = scrollableRef;

    if (!scrollableEl) return;

    scrollableEl.scrollTo({
      left: scrollableEl.scrollWidth,
      behavior: 'smooth',
    });
  }, [cards, scrollableRef]);

  const shouldRenderHeader = title || subtitle;

  const bind = useGesture({
    onWheel: ({ shiftKey, delta: [, dy] }) => {
      if (!shiftKey) return;

      const newCardScale = limitCardSize(cardScale - dy / 1000);

      setCardScale(newCardScale);
    },
    onPinch: ({ vdva: [vd], event }) => {
      const newCardScale = limitCardSize(cardScale + vd / 4);

      setCardScale(newCardScale);
      event && event.preventDefault();
    },
  });

  const CardRender = showHints ? HintableCard : FlippinCard;

  return (
    <CardStackContainer ref={scrollableRef} {...bind()}>
      {shouldRenderHeader && (
        <CardStackHeader>
          <CardStackTitle>
            {title}
            <CardStackSubtitle>{subtitle}</CardStackSubtitle>
          </CardStackTitle>

          <CardStackActionsContainer>{actions}</CardStackActionsContainer>
        </CardStackHeader>
      )}
      <CardStackList wrapOverflow={wrapOverflow || false} center={center}>
        {cards.map(w => (
          <WonkyCardContainer key={w.number + w.suit}>
            <CardRender
              faceUp={shownCards && shownCards.includes(w)}
              model={w}
              onClick={() => onCardClick && onCardClick(w)}
              onMouseDown={() => onCardMouseDown && onCardMouseDown(w)}
              onMouseUp={() => onCardMouseUp && onCardMouseUp(w)}
              scale={cardScale || 1.2}
            />
          </WonkyCardContainer>
        ))}
      </CardStackList>
    </CardStackContainer>
  );
};

CardStack.defaultProps = {
  center: false,
  initialCardScale: 1,
};

export default CardStack;
