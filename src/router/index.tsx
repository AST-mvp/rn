import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from '@src/pages/Root';
import Stack, { navigationRef } from './navigator';
import Login from '@src/pages/Login';

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
