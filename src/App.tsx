import React from 'react';
import 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-community/google-signin';

import Router from './router';
import { ProvideAuth } from './hooks/user';
import useTheme, { ProvideTheme } from './hooks/theme';
import styled from '@emotion/native';

GoogleSignin.configure({
  webClientId:
    '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
  iosClientId:
    '51227550156-72gpdjmbedgn18n066r6g22a1kjp2k2m.apps.googleusercontent.com',
});

const SafeAreaView = styled.SafeAreaView<{ color: string }>`
  flex: 1;
  background-color: ${({ color }) => color};
`;

const Container = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView color={theme.backgroundColor}>
      <Router />
    </SafeAreaView>
  );
};

export default () => (
  <ProvideAuth>
    <ProvideTheme>
      <Container />
    </ProvideTheme>
  </ProvideAuth>
);
