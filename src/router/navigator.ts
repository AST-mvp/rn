import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createRef } from 'react';

export type RootStackParamList = {
  Root: undefined;
  Main: undefined;
  Detail: {
    nfcId: string;
  };
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = <K extends keyof RootStackParamList>(routeName: K, params?: RootStackParamList[K]) => {
  if (!navigationRef.current) {
    throw new Error('navigator is not defined');
  }
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};

export const reset = <K extends keyof RootStackParamList>(routeName: K) => {
  if (!navigationRef.current) {
    throw new Error('navigator is not defined');
  }
  navigationRef.current.dispatch(
    CommonActions.reset({
      routes: [
        { name: routeName },
      ],
    }),
  );
};

export const back = () => {
  if (!navigationRef.current) {
    throw new Error('navigator is not defined');
  }
  navigationRef.current.dispatch(CommonActions.goBack());
};

export default Stack;
