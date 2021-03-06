import React, { useEffect, useRef } from 'react';

import styled from 'styled-components/macro';
import media from 'styled-media-query';
import { useGesture } from 'react-use-gesture';

import { CardModel } from '../deck-engine';
import FlippinCard from './FlippinCard';
import { HintableCard } from './HintableCard';
import { pipe, min, max } from 'ramda';

import { useLocalStorage } from 'react-use';
import { SunkenSectionMixin } from 'src/style/common';

const CardStackContainer = styled.div`
  ${SunkenSectionMixin};
  margin: 0.5rem;

  ${media.greaterThan('medium')`
    margin: 0.75rem;
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
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 0.25rem;

  position: sticky;
  left: 0;

  ${media.greaterThan('small')`
      margin-bottom: 0.5rem;
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
  margin: 0.5rem;

  ${media.greaterThan('medium')`
    margin: 1rem;
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
