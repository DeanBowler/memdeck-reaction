import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';
import media from 'styled-media-query';

import './lib/preloadCardFaces';

import palette from './palette';
import AppRoutes from './AppRoutes';
import { APP_TITLE_FONT_FAMILY } from './style';
import Helmet from 'react-helmet';
import Button from './components/Button';
import Menu from './components/Menu';
import HeaderBrand from './components/HeaderBrand';

const Header = styled.header`
  height: 3rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.lessThan('medium')`
    padding: 0.5rem 1rem;
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

const theme = {
  main: 'mediumseagreen',
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuCloseClick = () => setIsMenuOpen(false);

  console.log(isMenuOpen);

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
        <Header>
          <HeaderBrand />
          <Button onClick={handleMenuToggle}>menu</Button>
        </Header>
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
