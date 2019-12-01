import * as React from 'react';
import styled from 'styled-components/macro';

import { BoxMixin } from 'src/style/common';
import palette from 'src/style/palette';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  marginRight?: string;
}

const StyledButton = styled.button<{ marginRight?: string; marginLeft?: string }>`
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
  padding: 0.5rem 1rem;
  opacity: 0.9;
  ${BoxMixin}
  font-size: 1rem;
  margin-right: ${props => props.marginRight};
  margin-left: ${props => props.marginLeft};

  box-shadow: ${palette.boxShadow};
  transition: all 200ms ease-in-out;

  transform: scale(1);

  :hover {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: ${palette.boxShadowTaller};
  }

  :focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1);
  }

  :active {
    outline: none;

    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: ${palette.boxShadow};
  }

  :disabled {
    opacity: 0.5;
  }
`;

const Button = ({ children, ...rest }: ButtonProps) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Button;
