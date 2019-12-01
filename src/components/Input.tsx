import * as React from 'react';
import styled from 'styled-components/macro';

import { BoxMixin } from 'src/style/common';
import palette from 'src/style/palette';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  marginRight?: string;
}

const StyledInput = styled.input`
  cursor: pointer;
  padding: 0.5rem;

  ${BoxMixin}
  transition: background 100ms ease-in-out;
  font-size: 1rem;

  box-shadow: ${palette.boxShadow};

  :hover {
    background: rgba(255, 255, 255, 0.3);
  }

  :focus {
    outline: 2px solid rgba(255, 255, 255, 0.3);
  }
`;

const Input = ({ children, ...rest }: InputProps) => (
  <StyledInput {...rest}>{children}</StyledInput>
);

export default Input;
