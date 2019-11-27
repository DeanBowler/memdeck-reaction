import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';
import media from 'styled-media-query';

import './lib/preloadCardFaces';

import AppRoutes from './AppRoutes';
import Helmet from 'react-helmet';
import Menu from './components/Menu';
import HeaderBrand from './components/HeaderBrand';
import Headroom from 'react-headroom';

const Header = styled.header`
  z-index: 1;
  height: 2rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#295631de, #2d5534de),
    url(/images/backgrounds/felt--lowq.jpg);

  ${media.lessThan('medium')`
    padding: 1rem;
  `}

  user-select: none;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 1rem 3rem;

  ${media.lessThan('medium')`
    margin: 0.5rem;
  `}

  ${media.lessThan('small')`
    margin: 0.25rem;
  `}
`;

// TODO: move this into the menu component... 🤦‍♂️
const StyledBurger = styled.button<{ open: boolean }>`
  position: ${({ open }) => (open ? 'fixed' : 'unset')};
  opacity: 0.75;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  ${media.lessThan('medium')`
    right: 1rem;
  `}

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #effffa;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(-20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const theme = {
  main: 'mediumseagreen',
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuCloseClick = () => setIsMenuOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Helmet defaultTitle="Memdeck Reaction" titleTemplate="%s | Memdeck Reaction">
        <meta name="description" content="A web based trainer for memdeck recall!" />
        <meta name="theme-color" content="#375e3f" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Helmet>
      <AppContainer>
        <Headroom style={{ boxShadow: '0 5px 5px rgba(0,0,0,0.3)' }}>
          <Header>
            <HeaderBrand />
            <StyledBurger open={isMenuOpen} onClick={handleMenuToggle}>
              <div />
              <div />
              <div />
            </StyledBurger>
          </Header>
        </Headroom>
        <ContentContainer>
          <BrowserRouter>
            <AppRoutes />
            <Menu isOpen={isMenuOpen} onCloseClick={handleMenuCloseClick} />
          </BrowserRouter>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}
