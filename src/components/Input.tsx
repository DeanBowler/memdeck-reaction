import * as React from 'react';
import styled from 'styled-components/macro';

import { BoxMixin } from 'src/style/common';
import palette from 'src/style/palette';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  marginRight?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
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

const StyledLabel = styled.label`
  font-size: 0.85rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const DEFAULT_NUMBER_PATTERN = '[0-9]*';

const Input = ({ children, label, labelStyle, pattern, type, ...rest }: InputProps) => {
  const patternProp = pattern || type === 'number' ? DEFAULT_NUMBER_PATTERN : undefined;

  return (
    <StyledLabel style={labelStyle}>
      {label}
      <StyledInput type={type} pattern={patternProp} {...rest}>
        {children}
      </StyledInput>
    </StyledLabel>
  );
};

export default Input;
