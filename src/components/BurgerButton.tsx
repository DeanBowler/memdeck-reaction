import React from 'react';

import styled from 'styled-components';
import media from 'styled-media-query';

import palette from 'src/style/palette';

const StyledBurger = styled.button<{ open: boolean }>`
  position: ${({ open }) => (open ? 'fixed' : 'unset')};
  opacity: 0.6;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  ${media.greaterThan('medium')`
    right: 2rem;
  `}

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${palette.white};
    border-radius: 5px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(-20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

interface BurgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const BurgerButton = ({ isActive, ...rest }: BurgerButtonProps) => (
  <StyledBurger open={isActive} {...rest}>
    <div />
    <div />
    <div />
  </StyledBurger>
);

export default BurgerButton;
