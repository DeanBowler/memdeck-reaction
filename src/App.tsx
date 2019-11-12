import './App.css';

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import './lib/preloadCardFaces';

import palette from './palette';
import AppRoutes from './AppRoutes';
import { APP_TITLE_FONT_FAMILY } from './style';

const Header = styled.header`
  padding: 1rem;

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

const ContentContainer = styled.div`
  margin: 1rem;
`;

const theme = {
  main: 'mediumseagreen',
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header>
            <HeaderTitle>Memdeck Reaction</HeaderTitle>
          </Header>
          <ContentContainer>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ContentContainer>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
