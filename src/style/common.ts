import { css } from 'styled-components/macro';
import media from 'styled-media-query';

import palette from './palette';

export const BoxMixin = css`
  color: ${palette.white};
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.65rem 1rem;

  ${media.greaterThan('medium')`
    padding: 1rem;
  `}
`;
