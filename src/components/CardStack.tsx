import * as React from 'react';

import FlippinCard from './FlippinCard';
import styled from 'styled-components/macro';
import { CardModel } from '../deck-engine';
import { CardProps } from './Card';
import media from 'styled-media-query';
import { useState, useEffect, ComponentType, useRef } from 'react';
import { HintableCard } from './HintableCard';

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
  line-height: 1em;
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

export interface CardStackProps {
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
  cardScale?: number;
  center: boolean;
}

const CardStack = ({
  cards,
  shownCards,
  title,
  subtitle,
  onCardClick,
  onCardMouseDown,
  onCardMouseUp,
  actions,
  wrapOverflow,
  cardScale,
  center,
  showHints,
}: CardStackProps) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { current: scrollableEl } = scrollableRef;

    if (!scrollableEl) return;

    scrollableEl.scrollTo({
      left: scrollableEl.scrollWidth,
      behavior: 'smooth',
    });
  }, [cards, scrollableRef]);

  const shouldRenderHeader = title || subtitle;

  const CardRender = showHints ? HintableCard : FlippinCard;

  return (
    <CardStackContainer ref={scrollableRef}>
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
};

export default CardStack;
