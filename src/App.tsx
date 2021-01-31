import React from 'react';
import 'react-native-gesture-handler';

import { ProvideRouter } from '@src/hooks/useRouter';
import Router from './router';

export default () => (
  <ProvideRouter>
    <Router />
  </ProvideRouter>
);
