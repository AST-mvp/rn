import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createRef } from 'react';

export type RootStackParamList = {
  Root: undefined;
  Init: undefined;
  Main: undefined;
  Detail: {
    nfcId: string;
  };
  Trade: {
    nfcId: string;
  };
  Login: undefined;
  TestArea: undefined;
  AdminDrop: undefined;
};

export type MainTabParamList = {
  Drop: undefined;
  Search: undefined;
  Verification: undefined;
  MyCloset: undefined;
  Profile: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

export const Tab = createBottomTabNavigator<MainTabParamList>();

export const navigationRef = createRef<NavigationContainerRef>();

export const navigate = <K extends keyof RootStackParamList>(
  routeName: K,
  params?: RootStackParamList[K],
) => {
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
      routes: [{ name: routeName }],
    }),
  );
};

export const back = () => {
  if (!navigationRef.current) {
    throw new Error('navigator is not defined');
  }
  navigationRef.current.dispatch(CommonActions.goBack());
};
