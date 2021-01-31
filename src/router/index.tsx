import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from '@src/pages/Root';
import useRouter from '@src/hooks/useRouter';

export default () => {
  const { setNavigator } = useRouter();
  return (
    <NavigationContainer ref={(ref) => setNavigator(ref)}>
      <Root />
    </NavigationContainer>
  );
};
