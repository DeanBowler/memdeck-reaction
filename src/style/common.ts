import { css } from 'styled-components/macro';
import media from 'styled-media-query';

import palette from './palette';

export const BoxMixin = css`
  color: ${palette.white};
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.65rem 1rem;

  ${media.greaterThan('medium')`
    padding: 1rem;
  `}
`;

export const SunkenSectionMixin = css`
  padding: 0.5rem;

  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: auto;
  border-radius: 5px;

  ${media.greaterThan('medium')`
    padding: 1rem;
  `}
`;
