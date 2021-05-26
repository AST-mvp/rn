import React from 'react';
import { Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import styled from '@emotion/native';
import { GoogleSignin } from '@react-native-community/google-signin';

import Router from './router';
import { ProvideAuth } from './hooks/user';
import useTheme, { ProvideTheme, Theme } from './hooks/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId:
    '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
  iosClientId:
    '51227550156-72gpdjmbedgn18n066r6g22a1kjp2k2m.apps.googleusercontent.com',
});

const BackContainer = styled.View<Theme>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const TopBackground = styled.View<Theme>`
  position: absolute;
  width: 100%;
  height: ${`${SCREEN_HEIGHT / 2}px`};
  background-color: ${({ topColor }) => topColor};
`;

const BottomBackground = styled.View<Theme>`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: ${`${SCREEN_HEIGHT / 2}px`};
  background-color: ${({ bottomColor }) => bottomColor};
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = () => {
  const { theme } = useTheme();

  return (
    <BackContainer {...theme}>
      <TopBackground {...theme} />
      <BottomBackground {...theme} />
      <SafeAreaView>
        <Router />
      </SafeAreaView>
    </BackContainer>
  );
};

export default () => (
  <ProvideAuth>
    <ProvideTheme>
      <Container />
    </ProvideTheme>
  </ProvideAuth>
);
