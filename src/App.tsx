import React from 'react';
import 'react-native-gesture-handler';
import styled from '@emotion/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import Router from './router';
import { ProvideAuth } from './hooks/user';
import useTheme, { ProvideTheme, Theme } from './hooks/theme';
import { processColor, StatusBar, StatusBarStyle } from 'react-native';

GoogleSignin.configure({
  webClientId:
    '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
  iosClientId:
    '51227550156-72gpdjmbedgn18n066r6g22a1kjp2k2m.apps.googleusercontent.com',
});

dayjs.extend(duration);

const TopBackground = styled.SafeAreaView<Theme>`
  flex: 0;
  background-color: ${({ backgroundColor, topColor }) =>
    topColor ?? backgroundColor};
`;

const BottomBackground = styled.SafeAreaView<Theme>`
  flex: 1;
  background-color: ${({ backgroundColor, bottomColor }) =>
    bottomColor ?? backgroundColor};
`;

const getStatusBarColor = (theme: Theme): StatusBarStyle => {
  const color = processColor(theme.topColor ?? theme.backgroundColor) ?? 0;
  const numberColor = typeof color === 'number' ? color : 0;
  // eslint-disable-next-line no-bitwise
  return (numberColor & 0x909090) > 0 ? 'dark-content' : 'light-content';
};

const Container = () => {
  const { theme } = useTheme();

  return (
    <>
      <TopBackground {...theme} />
      <StatusBar barStyle={getStatusBarColor(theme)} />
      <BottomBackground {...theme}>
        <Router />
      </BottomBackground>
    </>
  );
};

export default () => (
  <ProvideAuth>
    <ProvideTheme>
      <Container />
    </ProvideTheme>
  </ProvideAuth>
);
