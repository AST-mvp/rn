import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from '@src/pages/Root';
import Stack, { navigationRef } from './navigator';
import Login from '@src/pages/Login';
import Main from '@src/pages/Main';
import Detail from '@src/pages/Detail';
import MyCloset from '@src/pages/MyCloset';
import Verification from '@src/pages/Verification';
import Trade from '@src/pages/Trade';

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Root" headerMode="none">
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="MyCloset" component={MyCloset} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Trade" component={Trade} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
