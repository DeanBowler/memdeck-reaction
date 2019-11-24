import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components/macro';
import media from 'styled-media-query';

import './lib/preloadCardFaces';

import palette from './palette';
import AppRoutes from './AppRoutes';
import { APP_TITLE_FONT_FAMILY } from './style';
import Helmet from 'react-helmet';

const Header = styled.header`
  padding: 1rem 2rem;

  ${media.lessThan('medium')`
    padding: 0.5rem 1rem;
  `}

  user-select: none;
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
          <HeaderTitle>Memdeck Reaction</HeaderTitle>
        </Header>
        <ContentContainer>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}
