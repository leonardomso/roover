import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { RehawkProvider } from '../../src/';

import reset from './reset';

import { ProviderContainer, InnerContainer } from './Provider.styles';

const GlobalStyles = createGlobalStyle`${reset}`;

const Provider = ({ children }) => {
  return (
    <RehawkProvider>
      <ProviderContainer>
        <InnerContainer>
          <GlobalStyles />
          {children}
        </InnerContainer>
      </ProviderContainer>
    </RehawkProvider>
  );
};

export default Provider;