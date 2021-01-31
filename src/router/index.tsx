import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from '@src/pages/Root';
import useRouter from '@src/hooks/useRouter';
import Stack from './navigator';

export default () => {
  const { setTopLevelNavigator } = useRouter();
  return (
    <NavigationContainer ref={setTopLevelNavigator}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
