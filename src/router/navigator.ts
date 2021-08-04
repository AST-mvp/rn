import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createRef } from 'react';
import { Product } from '@src/constants/types';

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
  Drops: undefined;
  Search: undefined;
  Verification: undefined;
  MyCloset: undefined;
  Profile: undefined;
};

export type DropsStackParamList = {
  DropsList: undefined;
  DropDetail: {
    product: Product;
  };
};

export const Stack = createStackNavigator<RootStackParamList>();

export const Tab = createBottomTabNavigator<MainTabParamList>();

export const DropsStack = createStackNavigator<DropsStackParamList>();

export const navigationRef = createRef<NavigationContainerRef>();

type ParamList = RootStackParamList & MainTabParamList & DropsStackParamList;

export const navigate = <K extends keyof ParamList>(
  routeName: K,
  ...[params]: ParamList[K] extends undefined ? [undefined?] : [ParamList[K]]
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

export const reset = <K extends keyof ParamList>(routeName: K) => {
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
