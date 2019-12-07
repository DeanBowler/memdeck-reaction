import React from 'react';
import Helmet from 'react-helmet';
import CardBackSettings from './CardBackSettings';
import ThemeSettings from './ThemeSettings';
import CardFaceSettings from './CardFaceSettings';
import BorderThicknessSetting from './BorderThicknessSetting';

export default function Settings() {
  return (
    <>
      <Helmet title="Settings" />
      <div>
        <h1>Settings</h1>
        <ThemeSettings />
        <CardFaceSettings />
        <CardBackSettings />
        <BorderThicknessSetting />
      </div>
    </>
  );
}
