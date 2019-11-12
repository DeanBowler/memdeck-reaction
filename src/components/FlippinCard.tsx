import * as React from 'react';
import Card, { CardProps } from './Card';
import CardBack from './CardBack';
import styled from 'styled-components';

export interface FlippinCardProps extends CardProps {
  faceUp?: boolean;
  onClick?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

const randomRotation = () => `rotate(${Math.random() * 10 - 5}deg) scale(1.05)`;

const FlippinCardContainer = styled.div`
  display: inline-flex;
  user-select: none;
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform 300ms cubic-bezier(0.5, 1.15, 0.4, 1.2);
  :hover {
    transform: ${randomRotation()};
  }
`;

const FlippinCard = ({
  faceUp,
  onClick,
  onMouseDown,
  onMouseUp,
  ...rest
}: FlippinCardProps) => (
  <FlippinCardContainer
    {...{ onClick, onMouseDown, onMouseUp }}
    onTouchStart={onMouseDown}
    onTouchEnd={onMouseDown}
  >
    {faceUp ? <Card {...rest} /> : <CardBack {...rest} />}
  </FlippinCardContainer>
);

export default FlippinCard;
