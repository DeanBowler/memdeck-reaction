import * as React from 'react';
import styled from 'styled-components/macro';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  marginRight?: string;
}

const StyledInput = styled.input`
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  transition: background 100ms ease-in-out;
  font-size: 1rem;

  :hover {
    box-shadow: inset 2px 2px 20px rgba(0, 0, 0, 0.4);
  }

  :focus {
    outline: none;
  }
`;

const Input = ({ children, ...rest }: InputProps) => (
  <StyledInput {...rest}>{children}</StyledInput>
);

export default Input;
