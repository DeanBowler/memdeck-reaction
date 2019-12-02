import 'src/lib/preloadCardFaces';

import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import media from 'styled-media-query';

import SettingsContextProvider from 'src/contexts/SettingsContext';
import BurgerButton from 'src/components/BurgerButton';
import HeaderBrand from 'src/components/HeaderBrand';
import Menu from 'src/components/Menu';
import AppRoutes from './AppRoutes';
import Theme from './contexts/Theme';

const Header = styled.header`
  height: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.greaterThan('medium')`
    padding: 1rem 2rem;
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
  margin: 0.25rem;

  ${media.greaterThan('small')`
    margin: 0.5rem;
  `}

  ${media.greaterThan('medium')`
    margin: 1rem 3rem
  `}
`;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuCloseClick = () => setIsMenuOpen(false);

  return (
    <SettingsContextProvider>
      <Helmet defaultTitle="Memdeck Reaction" titleTemplate="%s | Memdeck Reaction">
        <meta name="description" content="A web based trainer for memdeck recall!" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Helmet>
      <Theme>
        <AppContainer>
          <Header>
            <HeaderBrand />
            <BurgerButton isActive={isMenuOpen} onClick={handleMenuToggle} />
          </Header>
          <ContentContainer>
            <BrowserRouter>
              <AppRoutes />
              <Menu isOpen={isMenuOpen} onCloseClick={handleMenuCloseClick} />
            </BrowserRouter>
          </ContentContainer>
        </AppContainer>
      </Theme>
    </SettingsContextProvider>
  );
}
