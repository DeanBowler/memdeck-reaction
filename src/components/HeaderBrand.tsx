import React from 'react';

import styled from 'styled-components/macro';
import { APP_TITLE_FONT_FAMILY } from 'src/style';
import palette from 'src/style/palette';
import { NavLink } from 'react-router-dom';

const HeaderBrandContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 300ms ease-in-out;

  text-decoration: none;

  :hover {
    opacity: 0.9;
  }
`;

const HeaderTitle = styled.div`
  font-size: 2rem;
  line-height: 1em;
  font-family: ${APP_TITLE_FONT_FAMILY};
  color: ${palette.white};
`;

const HeaderLogo = styled.img`
  width: 32px;
  margin-right: 1rem;
`;

const HeaderBrand = () => (
  <HeaderBrandContainer to="">
    <HeaderLogo src="/images/logo--transparent.png" alt="site logo" />
    <HeaderTitle>Memdeck Reaction</HeaderTitle>
  </HeaderBrandContainer>
);

export default HeaderBrand;
