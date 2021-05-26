import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from '@src/pages/Root';
import { Stack, navigationRef } from './navigator';
import Login from '@src/pages/Login';
import Detail from '@src/pages/Detail';
import Trade from '@src/pages/Trade';
import TestArea from '@src/pages/TestArea';
import Init from '@src/pages/Init';
import Main from './Main';
import AdminDrop from '@src/pages/AdminDrop';

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
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Trade" component={Trade} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TestArea" component={TestArea} />
        <Stack.Screen name="AdminDrop" component={AdminDrop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
