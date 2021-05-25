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
import TestArea from '@src/pages/TestArea';
import Init from '@src/pages/Init';
import Drop from '@src/pages/Drop';

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Root"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: 'white' } }}>
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Init" component={Init} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Drop" component={Drop} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="MyCloset" component={MyCloset} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Trade" component={Trade} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TestArea" component={TestArea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
