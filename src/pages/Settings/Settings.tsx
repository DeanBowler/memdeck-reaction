import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components/macro';

import CardBackSettings from './CardBackSettings';
import ThemeSettings from './ThemeSettings';
import CardFaceSettings from './CardFaceSettings';
import BorderThicknessSetting from './BorderThicknessSetting';
import AppInfo from './AppInfo';

const SettingsContainer = styled.div`
  margin: 0.5rem;
`;

export default function Settings() {
  return (
    <>
      <Helmet title="Settings" />
      <SettingsContainer>
        <h1>Settings</h1>
        <ThemeSettings />
        <CardFaceSettings />
        <CardBackSettings />
        <BorderThicknessSetting />
        <AppInfo />
      </SettingsContainer>
    </>
  );
}
