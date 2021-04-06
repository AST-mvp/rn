import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';

import Router from './router';
import { ProvideAuth } from './hooks/user';

GoogleSignin.configure({
  webClientId:
    '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
});

export default () => (
  <SafeAreaView>
    <ProvideAuth>
      <Router />
    </ProvideAuth>
  </SafeAreaView>
);
