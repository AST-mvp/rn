import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default Stack;
