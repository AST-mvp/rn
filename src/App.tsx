import React from 'react';
import 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-community/google-signin';

import Router from './router';

GoogleSignin.configure({
  webClientId: '51227550156-n6v9k0mei8ko0l9jm6crnt5go2r6m9pr.apps.googleusercontent.com',
});

export default () => (
  <Router />
);

