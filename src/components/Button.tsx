import * as React from 'react';
import styled from 'styled-components/macro';

import { BoxMixin } from 'src/style/common';
import palette from 'src/style/palette';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  marginRight?: string;
  slim?: boolean;
}

type StyledButtonProps = { marginRight?: string; marginLeft?: string; slim?: boolean };

const StyledButton = styled.button<StyledButtonProps>`
  font-family: 'Raleway', sans-serif;
  cursor: pointer;
  opacity: 0.9;
  ${BoxMixin}
  font-size: 1rem;
  margin-right: ${props => props.marginRight};
  margin-left: ${props => props.marginLeft};

  box-shadow: ${palette.boxShadow};
  transition: all 200ms ease-in-out;

  ${p => p.slim && 'padding: 0.5rem!important'};

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
