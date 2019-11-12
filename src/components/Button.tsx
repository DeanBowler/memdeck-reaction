import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  marginRight?: string;
}

const StyledButton = styled.button<{ marginRight?: string; marginLeft?: string }>`
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  margin-right: ${props => props.marginRight};
  margin-left: ${props => props.marginLeft};

  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  transition: all 200ms ease-in-out;

  transform: scale(1);

  :hover {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
  }

  :focus {
    outline: none;
    background: rgba(255, 255, 255, 0.1);
  }

  :active {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 20px rgba(0, 0, 0, 0.4);
  }
`;

const Button = ({ children, ...rest }: ButtonProps) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Button;
