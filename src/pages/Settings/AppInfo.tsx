import React from 'react';
import styled from 'styled-components/macro';

const INFOS = {
  version: process.env.REACT_APP_VERSION,
};

const AppInfoContainer = styled.ul`
  margin-top: 2rem;
  list-style: none;
  padding: 0;
  font-weight: 400;
`;

const InfoItem = styled.li`
  opacity: 0.5;
  margin-top: 0.5rem;

  transition: opacity 100ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;

const InfoKey = styled.span`
  font-size: 0.875rem;
`;

const AppInfo = () => (
  <AppInfoContainer>
    {Object.entries(INFOS).map(([k, v]) => (
      <InfoItem key={k}>
        <InfoKey>{k}</InfoKey> {v}
      </InfoItem>
    ))}
  </AppInfoContainer>
);

export default AppInfo;
