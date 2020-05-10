import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/macro';

import Header from '@/common/components/Header';
import { AutoLoginContext, IdentityContext } from '@/core/authentication/contexts';
import { identitySelectors } from '@/core/stores/identity';
import themes from '@/core/styles';
import { loginSelectors } from '@/modules/login/stores';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const { Provider: IdentityProvider } = IdentityContext;
const { Provider: AutoLoginProvider } = AutoLoginContext;

const App: React.FC<{}> = ({ children }): JSX.Element => {
  const { identityInfo } = useSelector(identitySelectors);
  const { autoLoginInfo } = useSelector(loginSelectors);
  return (
    <ThemeProvider theme={themes}>
      <IdentityProvider value={identityInfo}>
        <AutoLoginProvider value={autoLoginInfo}>
          <AppWrapper>
            <Helmet defaultTitle="Ecommerce" />
            <Header />
            <Container>{children}</Container>
          </AppWrapper>
        </AutoLoginProvider>
      </IdentityProvider>
    </ThemeProvider>
  );
};

export default App;
