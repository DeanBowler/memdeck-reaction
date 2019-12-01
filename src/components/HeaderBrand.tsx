import React from 'react';

import styled from 'styled-components';
import { APP_TITLE_FONT_FAMILY } from 'src/style';
import palette from 'src/style/palette';

const HeaderBrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 2rem;
  line-height: 1em;
  font-family: ${APP_TITLE_FONT_FAMILY};
  color: ${palette.white};
  opacity: 0.7;
  transition: opacity 300ms ease-in-out;

  :hover {
    opacity: 0.9;
  }
`;

const HeaderLogo = styled.img`
  opacity: 0.7;
  width: 32px;
  margin-right: 1rem;

  :hover {
    opacity: 0.9;
  }
`;

const HeaderBrand = () => (
  <HeaderBrandContainer>
    <HeaderLogo src="/images/logo--transparent.png" alt="site logo" />
    <HeaderTitle>Memdeck Reaction</HeaderTitle>
  </HeaderBrandContainer>
);

export default HeaderBrand;
