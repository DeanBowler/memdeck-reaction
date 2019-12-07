import React from 'react';
import Helmet from 'react-helmet';
import CardBackSettings from './CarBackSettings';
import ThemeSettings from './ThemeSettings';
import CardFaceSettings from './CardFaceSettings';

export default function Settings() {
  return (
    <>
      <Helmet title="Settings" />
      <div>
        <h1>Settings</h1>
        <CardFaceSettings />
        <CardBackSettings />
        <ThemeSettings />
      </div>
    </>
  );
}
