import React from 'react';
import { useSetting } from './SettingsContext';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { transparentize } from 'polished';
import Helmet from 'react-helmet';

export default function Theme({ children }: { children: React.ReactNode }) {
  const [theme] = useSetting('theme');

  const GlobalStyle = createGlobalStyle`
    body {  
      background: linear-gradient(${transparentize(
        0.12,
        theme.background.start,
      )}, ${transparentize(0.12, theme.background.end)}),
      url(/images/backgrounds/felt--lowq.jpg);
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="theme-color" content={theme.background.start} />
      </Helmet>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
